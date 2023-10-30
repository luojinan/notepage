import{_ as a,o as e,c as s,V as p}from"./chunks/framework.b450deef.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/03-架构/webpack/重学webpack-01打包工具的思考.md","filePath":"articles/03-架构/webpack/重学webpack-01打包工具的思考.md"}'),c={name:"articles/03-架构/webpack/重学webpack-01打包工具的思考.md"},l=p(`<blockquote><p>现代前端工程离不开打包工具</p></blockquote><p>打包工具的最核心功能，我认为是</p><ul><li>模块化的实现(资源合并)</li><li>代码的转译(内容转换)</li></ul><p>因此重学webpack的步骤不会从webpack源码的入口一步一步走 而是从设计一个打包工具的思路分析webpack 所以会从</p><ul><li>要实现模块化，webpack怎么做，还能怎么做</li><li>要实现代码的转译，webpack怎么做，怎么做会更好</li></ul><h2 id="webpack启动的方式" tabindex="-1">webpack启动的方式 <a class="header-anchor" href="#webpack启动的方式" aria-label="Permalink to &quot;webpack启动的方式&quot;">​</a></h2><p>可以通过安装<code>webpack-cli</code>依赖, 即可在终端运行 npx webpack xx 启动 也可以不安装cli,通过nodejs 运行webpack构造函数</p><blockquote><p><code>webpack-cli</code> 的作用是读取命令行参数合并到webpack参数中</p></blockquote><p>这里通过<code>nodejs</code> 运行<code>webpack构造函数</code>形式学习webpack原理</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> webpack </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">webpack</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#82AAFF;">webpack</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// config entry,output...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><h2 id="预习资料" tabindex="-1">预习资料 <a class="header-anchor" href="#预习资料" aria-label="Permalink to &quot;预习资料&quot;">​</a></h2><p><a href="https://juejin.cn/post/6961961165656326152" target="_blank" rel="noreferrer">做了一夜动画，让大家十分钟搞懂Webpack</a><a href="https://juejin.cn/post/6844904038543130637" target="_blank" rel="noreferrer">webpack打包原理 ? 看完这篇你就懂了 !</a></p><p><a href="https://zhuanlan.zhihu.com/p/363928061" target="_blank" rel="noreferrer">[万字总结] 一文吃透 Webpack 核心原理</a></p>`,13),n=[l];function o(t,r,i,b,k,_){return e(),s("div",null,n)}const u=a(c,[["render",o]]);export{h as __pageData,u as default};
