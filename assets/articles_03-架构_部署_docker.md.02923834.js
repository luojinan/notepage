import{_ as e,o as r,c as o,V as a}from"./chunks/framework.b450deef.js";const m=JSON.parse('{"title":"docker","description":"","frontmatter":{},"headers":[],"relativePath":"articles/03-架构/部署/docker.md","filePath":"articles/03-架构/部署/docker.md"}'),c={name:"articles/03-架构/部署/docker.md"},d=a('<h1 id="docker" tabindex="-1">docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;docker&quot;">​</a></h1><p><a href="https://www.bilibili.com/video/BV1MR4y1Q738" target="_blank" rel="noreferrer">蛋老师 docker示例</a></p><h2 id="虚拟机" tabindex="-1">虚拟机 <a class="header-anchor" href="#虚拟机" aria-label="Permalink to &quot;虚拟机&quot;">​</a></h2><p>虚拟机、容器都是把1台服务器分割成多台服务器</p><ul><li>虚拟机：粗暴的把一台服务器应该有的操作系统内核等都创建出来</li><li>容器：则复用相同的操作系统等，通过docker引擎调度真实服务器操作系统内核</li></ul><p>个人开发网站买过服务器来部署： 🚀</p><ul><li><code>Nodejs</code> 后端服务，服务器直接拉取仓库代码进行安装依赖和运行(不用构建)</li><li><code>前端静态资源</code> ，文件传输，丢到服务器目录，<code>nginx</code> 配置，就是启动了</li></ul><p>👆 因为项目不多，所以没什么问题</p><p>假如个人开发有很多个项目时，前端因为只是静态资源，<code>nginx</code> 配置好多目录就行了，很好管理</p><p>但是假如要接入持续集成或多人团队打包产物的话，不应该由个人本地打包再文件传输到服务器，此时的情况是：</p><ul><li><code>Nodejs</code> 后端服务，服务器直接拉取仓库代码进行安装依赖和运行(不用构建)</li><li><code>前端静态资源</code>，服务器拉取仓库代码，安装依赖，打包构建产物，产物输出到 <code>nginx</code> 配置目录</li></ul><p>👆 正常来说，每个项目步骤再多也没关系，脚本管理好项目即可</p><p>但是涉及操作系统冲突的东西就麻烦了 😖，如：</p><ul><li>前端项目的 <code>nodejs版本</code>、<code>npm版本</code>，不过有切换工具 <code>nvm</code> 可以使用，脚本处理也不是什么问题</li><li>前端依赖的 <code>python</code> 环境，多项目可能不一致，而 <code>python</code> 在操作系统中不能多版本</li></ul><p>此时多申请服务器解救问题： 1.增加成本 2.重新配置麻烦</p><p>因此有了 <code>虚拟机</code> ✨来节省多服务器成本，但是因为完全独立，依然有重新配置的麻烦</p><p>而且粗暴分割的虚拟机，有很多可以复用的东西，是没必要每个虚拟机一份的</p><h2 id="docker-1" tabindex="-1">docker <a class="header-anchor" href="#docker-1" aria-label="Permalink to &quot;docker&quot;">​</a></h2><p><img src="https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20230402235344.png" alt=""></p><p>根据配置文件 build 出未运行的镜像(各种服务器资源的集成) run 出服务器容器</p><p>复用配置文件提升不了多少效率</p><p>同主机多容器复用镜像(资源)，甚至跨主机复用镜像</p><h3 id="配置文件-dockerfiler" tabindex="-1">配置文件 Dockerfiler <a class="header-anchor" href="#配置文件-dockerfiler" aria-label="Permalink to &quot;配置文件 Dockerfiler&quot;">​</a></h3><h3 id="镜像-image" tabindex="-1">镜像 Image <a class="header-anchor" href="#镜像-image" aria-label="Permalink to &quot;镜像 Image&quot;">​</a></h3><p>Docker 镜像可以看作是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。</p><p>电脑装系统的时候，需要一张盘，我们称其为镜像，镜像是一个固定的文件，这次读盘和下次读盘内容是一样的。</p><p>但有些开发者会把这个镜像安装到电脑上，再在这个电脑上删删改改，再重新打包一个镜像刻盘，固化出一个镜像来，这就是镜像打包。</p><p>如国内以前泛滥的盗版XP系统，从微软官方镜像出发，添加小工具，系统设置修改优化，加主题，造出番茄花园，雨林木风，深度之类的盗版安装碟。</p><p>镜像装到电脑后，这个电脑就是个容器，里面包含使用者的数据和设置。从玩盗版系统到玩 Docker，区别只是电脑从实体变成虚拟机罢了。</p><p>Docker 上虚拟机被设计得很廉价，一台物理机上可以开很多虚拟机。廉价到可以为每一个软件专开一个虚拟机，像银行的ATM机器，虽是Windows系统的电脑，但终其一生只跑一个程序只显示一个界面。</p><p>虚拟机的廉价，加上镜像里又打包好了所需的软件，导致了大家想装某个软件的时候，可以直接开个新虚拟机，然后找这个软件的 Docker 镜像，啪一下装上去跑起来。</p><p>比起把软件往一个现成系统上装，要省事千倍，尤其是装那些需要编译，系统内核兼容，各种库依赖，缺少帮助文档的开源软件。</p><h3 id="容器-container" tabindex="-1">容器 Container <a class="header-anchor" href="#容器-container" aria-label="Permalink to &quot;容器 Container&quot;">​</a></h3><h2 id="serverless" tabindex="-1">Serverless <a class="header-anchor" href="#serverless" aria-label="Permalink to &quot;Serverless&quot;">​</a></h2><p>拿容器和 <code>Serverless</code> 对比是不正确的</p><p>容器依然是目前主流 <code>Serverless</code> 的函数执行载体</p><p><a href="https://www.docker.com/blog/building-serverless-apps-with-docker/#:~:text=But%20serverless%20doesn%E2%80%99t%20mean%20there%20is%20no%20Docker,is%20the%20perfect%20platform%20for%20building%20them%20on." target="_blank" rel="noreferrer">Building serverless apps with Docker</a></p><p>应该拿Serverless和PaaS平台（比如K8S、Swarm这些）比较</p>',38),i=[d];function l(t,s,p,n,h,k){return r(),o("div",null,i)}const _=e(c,[["render",l]]);export{m as __pageData,_ as default};
