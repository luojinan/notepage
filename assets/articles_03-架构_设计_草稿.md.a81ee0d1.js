import{_ as s,o as a,c as l,V as e}from"./chunks/framework.b450deef.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/03-架构/设计/草稿.md","filePath":"articles/03-架构/设计/草稿.md"}'),o={name:"articles/03-架构/设计/草稿.md"},n=e(`<h2 id="react-官网为什么那么快" tabindex="-1">React 官网为什么那么快？ <a class="header-anchor" href="#react-官网为什么那么快" aria-label="Permalink to &quot;React 官网为什么那么快？&quot;">​</a></h2><h3 id="静态站点生成ssg" tabindex="-1">静态站点生成SSG <a class="header-anchor" href="#静态站点生成ssg" aria-label="Permalink to &quot;静态站点生成SSG&quot;">​</a></h3><p>🤔思考: 和服务端渲染SSR的区别</p><p>都是服务端渲染html(🤔️ ？SSG是纯静态页面吧？不是服务端渲染HTML)，不需要js运行时插入及渲染dom</p><ul><li>SSG是在构建时生成html内容 <ul><li>适用于不同权限的人进入会是不同内容的html</li></ul></li><li>SSR是在静态资源请求时，静态资源服务器运行时生成html内容 <ul><li>仅适用于博客、官网、文档等静态页面</li><li>那为什么不用solidjs？？？</li></ul></li></ul><h3 id="link标签preload" tabindex="-1">link标签preload <a class="header-anchor" href="#link标签preload" aria-label="Permalink to &quot;link标签preload&quot;">​</a></h3><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">as</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">script</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">preload</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/webpack-runtime-732352b70a6d0733ac95.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>可以加载一些必备的cdn资源 vue这种框架资源就不是preload的东西 比如qrcode是常用功能，则可以preload这个资源 或是图片、音视频等</p><h3 id="prefetch" tabindex="-1">prefetch <a class="header-anchor" href="#prefetch" aria-label="Permalink to &quot;prefetch&quot;">​</a></h3><p>思考🤔: preload和prefetch的区别 一个是数据一个是资源吧</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prefetch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/page-data/docs/getting-started.html/page-data.json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">crossorigin</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">anonymous</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">as</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">fetch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>监听dom进入视图或是监听鼠标hover时preload/prefetch</p><h3 id="preconnect" tabindex="-1">preconnect <a class="header-anchor" href="#preconnect" aria-label="Permalink to &quot;preconnect&quot;">​</a></h3><p>在后面的js代码中可能会去请求这个域名下对应的资源，你可以先去把网络连接建立好，到时候发送对应请求时也就更加快速</p><blockquote><p>元素属性的关键字preconnect是提示浏览器用户可能需要来自目标域名的资源，因此浏览器可以通过抢先启动与该域名的连接来改善用户体验 —— MDN</p></blockquote><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">preconnect</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://www.google-analytics.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h3 id="dns-prefetch" tabindex="-1">dns-prefetch <a class="header-anchor" href="#dns-prefetch" aria-label="Permalink to &quot;dns-prefetch&quot;">​</a></h3><blockquote><p>DNS-prefetch (DNS 预获取) 是尝试在请求资源之前解析域名。这可能是后面要加载的文件，也可能是用户尝试打开的链接目标 —— MDN</p></blockquote><p>多域名后端场景可以提前连接，减少DNS查询耗时</p><p>dns-prefetch 的作用就是告诉浏览器在给第三方服务器发送请求之前去把指定域名的解析工作给做了，这个优化方法一般会和上面的preconnect一起使用，这些都是性能优化的一些手段，我们也可以在自己项目中合适的地方来使用</p><p>思考🤔: dns-prefetch和preconnet的区别</p><p>Gatsby 在打包的时候就生成了所有页面对应的 HTML文件以及数据文件等，这样当你访问某个页面时，服务端可以直接返回HTML ，另外一方面当页面中有使用 Link 时，会提前加载这个页面所对应的数据，这样点击跳转后页面加载速度就会很快</p><p>研究这个打包脚本的做法</p><h2 id="astro" tabindex="-1">Astro <a class="header-anchor" href="#astro" aria-label="Permalink to &quot;Astro&quot;">​</a></h2><p>​ Astro 仓库的工程搭建相关(changesets 自动发包)</p><p>content-focused 应用开发框架，就是重内容、轻交互场景下的上层研发框架，比如大多数电商网站、文档站、博客站、证券网站等等</p><p>这种用不含虚拟DOM的solidjs框架(SSG)，性能已经可以优化到很好了吧</p><p>Astro能带来什么</p><ul><li>Islands 架构，解决传统 SSR/SSG 框架的全量 hydration 注水 问题？，做到尽可能少的 Client 端 JS 的开销，甚至是 0 JS。</li><li>使用灵活。对于页面的开发，你既可以使用官方的.astro 语法，也同样可以使用 .md、.vue、.jsx 语法，也就是说，你可以自由选择其它前端框架的语法来开发，甚至可以在一个项目中同时写 Vue 组件和 React 组件！</li><li>构建迅速。底层构建体系基于 Vite 以及 Esbuild 实现，项目启动速度非常快。</li></ul><h2 id="islands架构模型" tabindex="-1">Islands架构模型 <a class="header-anchor" href="#islands架构模型" aria-label="Permalink to &quot;Islands架构模型&quot;">​</a></h2><p>主要用于 SSR (也包括 SSG) 应用 在传统的 SSR 应用中，服务端会给浏览器响应完整的 HTML 内容，并在 HTML 中注入一段完整的 JS 脚本用于完成事件的绑定，也就是完成 hydration (注水) 的过程 当注水的过程完成之后，页面也才能真正地能够进行交互</p><p>那么当应用的体积逐渐增大时，需要在客户端执行的 JS 脚本也会越来越多，这也意味着 TTI(可交互时间) 指标越来越高 🤔 应用体积增大，服务端计算组装html和js耗时长，注入的js和html体积大而已吧，为什么说客户端执行的JS越来越多？js是注入挂载而已吧，并不会执行</p><p>🤔 注水发生在服务端吗？</p><p>Islands模型，是指SSR/SSG 渲染出一个页面，把页面内容分为可交互组件和静态组件(前提是组件之间是独立的) 静态组件，可以不参与 hydration (注水) 直接复用服务端下发的 HTML 内容？ 🤔 传统SSR/SSG 是全量注水？注水到底是怎么样的过程 🤔 这不是跟vue3 优化虚拟DOM的diff算法一个思路吗？标记静态DOM和动态DOM</p><p>这样一个页面的可交互组件，就像是孤岛一样，并不是整个页面都是可交互组件，因此取名 Islands</p><p>简单的说 Islands 架构实现局部注水 hydration 功能,从而与哦话Js的体积，减少网络传输的成本，和js运行时的开销？</p><p>🤔 注水的js运行时到底是什么？</p><p>👇 astro 手动标记 可交互组件</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// index.astro</span></span>
<span class="line"><span style="color:#89DDFF;">---</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> MyReactComponent </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../components/MyReactComponent.jsx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">---</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyReactComponent</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">client</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">load</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><p>如此一来，Astro 会给浏览器传输一部分 JS 代码供这个组件完成 hydration，以便后续的交互。</p><p>各框架的SSR/SSG方案应该都有优化为按需注水的功能 如 React18 的 <code>Selection Hydration</code>，从最终效果来看确实是同一个东西</p><p>但是Astro的优势在于</p><ul><li>框架无关</li><li>不需要全量加载和执行JS</li><li>不依赖流式渲染 <code>transfer-encodeing: chunked</code> 响应头?🤔 啥？</li></ul><h2 id="snowpack" tabindex="-1">Snowpack <a class="header-anchor" href="#snowpack" aria-label="Permalink to &quot;Snowpack&quot;">​</a></h2><p>利用esm实现的bundless的 Snowpack 后不再维护转向vite vite也是参考了Snowpack 因此可以学习一下原理和vite对比的缺点</p><h2 id="skypack" tabindex="-1">Skypack <a class="header-anchor" href="#skypack" aria-label="Permalink to &quot;Skypack&quot;">​</a></h2><p>利用esm的CDN服务 Skypack 后也有点不维护了 竞品是 esm.sh</p><h2 id="bundless" tabindex="-1">Bundless <a class="header-anchor" href="#bundless" aria-label="Permalink to &quot;Bundless&quot;">​</a></h2><p>no bundle 构建</p><ul><li>build阶段 弱化业务代码打包的概念，不为了减少http请求而把资源集成打到1个包里(基于http2、3的发展,多路复用和好的http缓存策略)</li><li>dev阶段 按需编译，减少热更新的开销等</li><li>build阶段 依赖打包，改为 <ul><li>预打包+模块化缓存（vite 基于Esbuild 的预打包器）🤔 就是先打一个不会变的公共静态包</li><li>基于ESM的CDN服务（Skypack、esm.sh、jspm</li></ul></li></ul><p>vite</p><p>dev阶段的按需构建 基于Esbuild 入口js为<code>&lt;script type=&quot;module&quot;&gt;</code> ,入口js 来通过本地node服务 import 进各种资源，再深度引入</p><p>这样实现按需编译，而不需要预bundle后运行的时间，这样缩短了启动项目的编译时间，但是运行项目的按需编译会相对较长</p><ul><li>但仍然需要进行单文件的编译(如 TS、JSX、Less、Sass)，编译的时长仍然可能会比较长(某些业务项目编译要 20 s 左右)。</li><li>Vite 在二次请求时会采用 Etag 标识返回协商缓存的内容，可以跳过编译消耗的时间，但服务重启后仍然需要进行全量的编译，体验不太好。 <ul><li>解决方法是在服务退出时将 ModuleGraph 的内容缓存到本地，然后重启的时候激活缓存(hydrate)，那么二次启动时仍然会使用协商缓存，达到比较快的首屏加载效果。</li><li>本地缓存在 Vite 中暂时还没有被完全实现，但也是未来的一个优化方向。<a href="https://github.com/vitejs/vite/issues/1309" target="_blank" rel="noreferrer">https://github.com/vitejs/vite/issues/1309</a></li></ul></li></ul><p>除了本地缓存也可以利用 serviceworker</p><p>build阶段 使用Rollup打包</p><p>2者的差距，通过node服务 mock Rollup 的各种loader plugin 来磨平</p><h2 id="esbuild" tabindex="-1">Esbuild <a class="header-anchor" href="#esbuild" aria-label="Permalink to &quot;Esbuild&quot;">​</a></h2>`,58),t=[n];function p(r,c,i,d,D,h){return a(),l("div",null,t)}const F=s(o,[["render",p]]);export{y as __pageData,F as default};
