import{_ as l,o as s,c as p,V as a}from"./chunks/framework.b450deef.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/03-架构/设计/前端基础建设与架构30讲.md","filePath":"articles/03-架构/设计/前端基础建设与架构30讲.md"}'),e={name:"articles/03-架构/设计/前端基础建设与架构30讲.md"},n=a(`<p>常见造火箭面试题</p><ol><li><p>Vue源码</p></li><li><p>AST抽象语法树</p></li><li><p>Babe作用与原理</p></li><li><p>Vue完整版和运行时runtime版本的区别？</p></li></ol><ul><li>运行时版不包含模版编译器 Vue在模版编译环节具体做了什么</li></ul><ol start="2"><li>手写匹配有效括号算法--AST</li><li>设计C端polifill方案--babel，preset env usebuild ten设计背景</li></ol><p>锻炼架构能力最好的办法，也是大部分开发无法接触到的办法是从0搭建一个好的项目</p><ul><li><p>打造应用基础建设</p></li><li><p>制定应用过程化方案</p></li><li><p>实现应用构建和发布流程</p></li><li><p>设计公共方法和底层架构</p></li><li><p>Vue完整版和运行时版区别</p><ul><li>vue runtimejs运行时版本不包含模版编译器，才能说清vue在编译环节具体做了什么</li></ul></li><li><p>手写匹配有效括号算法</p><ul><li>leetcode上easy难度编译原理算法题</li><li>AST</li></ul></li><li><p>设计C端polyfill方案</p><ul><li>babel，preset</li></ul></li></ul><hr><p><strong>从0到1打造项目基础建设</strong></p><ul><li>指定项目的工程化方案</li><li>构建和发布流程</li><li>设计公共方法和底层架构</li></ul><hr><p><strong>目录</strong></p><ul><li>前端工程化管理工具 <ul><li>npm和yarn</li><li>webpack和vite</li></ul></li><li>前端开发生态圈 <ul><li>webpack</li><li>babel</li></ul></li><li>常用库核心代码设计 <ul><li>axios</li><li>koa</li></ul></li><li>架构实战搭建</li><li>利用nodejs <ul><li>网关、代理</li></ul></li></ul><p>小技巧 自定义npm init</p><p>npm init本质就是调用shell脚本输出一个package.json文件</p><blockquote><p>create vue脚手架的npm init还是依赖了npm的指令,被npm识别成 npx createxxxx,这里的自定义npm init是让npm指令执行我们定义的内容(shell)</p></blockquote><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">set</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init-module</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~</span><span style="color:#A6ACCD;">\\x</span><span style="color:#C3E88D;">xxx.js</span></span></code></pre></div><p>该js自己编写问答来初始化package.json</p><h2 id="本地调试包" tabindex="-1">本地调试包 <a class="header-anchor" href="#本地调试包" aria-label="Permalink to &quot;本地调试包&quot;">​</a></h2><p>一般是开发依赖包的人自己写个demo测试一下 但是更希望直接在别人的业务包里测试，但是不能直接发布测试包 也不想让人来手动复制包到业务代码里挑事</p><p>就可以用npm link TODO: 没懂 是指把项目中的依赖指向全局依赖？然后再取消指向 这不还是要发布测试包吗</p><p>npx使用eslint</p><p>npx eslint --init npx eslint xxx.js</p><p>npm自动识别用什么源 给项目npm添加脚本 npm run preinstall</p><p>preinstall: &quot;node ./bin/preinstall.js&quot;</p><p>在执行npm i之前先执行npm run preinstall</p><p>npm3的时候不是彻底的扁平化，当有子级包时，且后续迭代更新依赖开始什混乱，可以使用npm dedupe</p><h3 id="pnpm" tabindex="-1">pnpm <a class="header-anchor" href="#pnpm" aria-label="Permalink to &quot;pnpm&quot;">​</a></h3><h2 id="yarn" tabindex="-1">yarn <a class="header-anchor" href="#yarn" aria-label="Permalink to &quot;yarn&quot;">​</a></h2><p>CI环境 npm ci 替换 npm i</p><hr><p>打包工具的几大考量点</p><ul><li>代码分割：导出公共代码，避免重复打包，运行时有合理的按需加载(不同模块的上下文分开，单入口多入口都支持重复模块的打包，依赖的值变化，所有引用方都变)</li><li>打包后资源的hash：最大化的利用缓存，文件不变的话hash不变 <ul><li>区分webpack的hash、chunkhash、contenthash</li></ul></li><li>依赖收集兼容代码编写的模块化方式：Commonjs、esm支持</li><li>输出资源的模块化方式：可配置esm、commonjs</li><li>非js资源打包：html、css、图片、视频</li><li>编译：压缩、treeshacking</li></ul><p>tooling.report官方平台打包工具打分</p><blockquote><p>tooling.report怎么实现打分的？</p></blockquote><hr><h2 id="vite" tabindex="-1">vite <a class="header-anchor" href="#vite" aria-label="Permalink to &quot;vite&quot;">​</a></h2><p>webpack的不足 以下是vite dev时的编译情况</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 浏览器最终执行的js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/@modules/vue.js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> index </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/src/index.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/src/index.css?import</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 开发过程的js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue.js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> index </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./index.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./index.css</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><p>由上看出，虽然浏览器直接支持模块化，但是第三方资源还是需要打包工具处理，只处理路径，dev阶段不打包第三方资源，由浏览器识别到是/@modules路径时读取node_module中的资源</p><p>moduleRewritePlugin来改写路径输出</p><p>koa中间件获取请求资源的内容(用koa干嘛？起本地服务？，类似webpack的dev-server) es-module-lexer解析收集资源AST,拿到import的内容 判断是第三方资源则处理拼接公共代码路径 /@modules/xxx 判断到相对路径处理成 /src/xx</p><p>dev打包后的vue文件跟开发过程的vue文件大不一样 vite dev的时候，serverPluginVue 通过parseSFC方法解析单文件组件？通过compileSFCMain方法将template、js、css拆分</p><p>dev阶段，浏览器访问的资源是koa服务器的资源，koa在访问服务器资源时才如上编译，实现按需编译。 vite server = webpack dev-server koa基本都依赖中间件实现，拦截资源请求</p><ul><li>处理依赖，改写路径(第三方资源、相对路径)</li><li>按需编译.ts .vue</li><li>预编译：sass、lass</li><li>开启socket连接，实现HMR(在首次加载html模版时注入/vite/client文件注册监听web socket)</li></ul><p>vite build打包则基本使用rollup</p><h2 id="core-js" tabindex="-1">core.js <a class="header-anchor" href="#core-js" aria-label="Permalink to &quot;core.js&quot;">​</a></h2><p>垫片 polyfill</p><hr><p>nodejs</p><p>BFF、SSR、G...QL</p><p>现代前端工程</p><p>SSR同构技术、心智负担最小化？、虚拟DOM</p><p>状态仓库管理职责单一 minimal necessary为目标</p><p>CSR、SSR切换</p><p>前端渲染架构</p><ul><li>CSR</li></ul><p>- 浏览器端渲染（普遍）</p><p>- 前端服务器send html给浏览器，浏览器down jsh和请求数据来渲染页面</p><p>- 实现了前后端分离</p><p>- 优化了跳转的不需要重复加载的性能，缺点首屏加载慢</p><ul><li>SSR</li></ul><p>- 服务器端渲染（同构技术</p><p>- 服务端加载好html和js，或是把数据也处理好，返回给浏览器直接渲染页面</p><p>- 优化了首屏加载，缺点需要考虑把服务端处理的东西同构给前端初始化项目才能接手后续交互</p><ul><li>NSR</li></ul><p>- Native端渲染</p><p>- Native渲染生成html后缓存下来</p><ul><li>ESR</li></ul><p>- 边缘渲染：边缘计算（CDN）</p><p>SSR的 <code>hydration</code> 注水</p><p>脱水：SSR服务端请求数据(存入store)并带在html上(script标签里window全局变量)，给浏览器端</p><p>注水：从html上的全局变量取数据</p><p>流式SSR</p><p>服务端向浏览器通过sream发送html（原本是字符串</p><p>渐进式SSR</p><p>hydration 部分注水完成就渲染，不需要等所有hydration 注水完成 才渲染</p>`,77),o=[n];function t(i,r,c,u,y,D){return s(),p("div",null,o)}const h=l(e,[["render",t]]);export{d as __pageData,h as default};
