import{_ as s,o as a,c as n,V as l}from"./chunks/framework.b450deef.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/04-面试/前端面试之道/前端面试之道-跨域.md","filePath":"articles/04-面试/前端面试之道/前端面试之道-跨域.md"}'),o={name:"articles/04-面试/前端面试之道/前端面试之道-跨域.md"},p=l(`<blockquote><p>什么是跨域？为什么浏览器要使用同源策略？你有几种方式可以解决跨域问题？了解预检请求嘛？</p></blockquote><h2 id="跨域背景" tabindex="-1">跨域背景 <a class="header-anchor" href="#跨域背景" aria-label="Permalink to &quot;跨域背景&quot;">​</a></h2><p>浏览器出于安全考虑，有同源策略</p><ul><li>协议</li><li>域名</li><li>端口</li></ul><p>👆 有一个不同就是跨域</p><p>安全考虑指的是 防止 CSRF 攻击(利用用户的登录态发起恶意请求)</p><p>假设没有同源策略</p><p>A 网站可以被任意其他来源的 Ajax 访问到内容</p><p>如果当前 A 网站还存在登录态</p><p>就可以通过 Ajax 获得登录态任何信息 当然跨域并不能完全阻止 CSRF</p><h2 id="🤔-浏览器报错请求跨域了-那么请求到底发出去没有" tabindex="-1">🤔 浏览器报错请求跨域了，那么请求到底发出去没有？ <a class="header-anchor" href="#🤔-浏览器报错请求跨域了-那么请求到底发出去没有" aria-label="Permalink to &quot;🤔 浏览器报错请求跨域了，那么请求到底发出去没有？&quot;">​</a></h2><p>请求必然是发出去了，但是浏览器拦截了响应(没有拦截请求)</p><p>为什么表单的方式可以发起跨域请求，Ajax 就不行</p><p>因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应</p><p>但是表单并不会获取新的内容，所以可以发起跨域请求</p><p>同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了</p><blockquote><p>注意❕ 前端的跨域，除了前端与后端通信会跨域被拦截，前端和前端通信也会跨域被拦截( <code>iframe</code> 嵌套时数据共享通信会被拦截)</p></blockquote><h2 id="解决跨域-jsonp与后端通信" tabindex="-1">解决跨域-JSONP与后端通信 <a class="header-anchor" href="#解决跨域-jsonp与后端通信" aria-label="Permalink to &quot;解决跨域-JSONP与后端通信&quot;">​</a></h2><p>利用 <code>&lt;script&gt;</code> 标签没有跨域限制的漏洞</p><p>指向一个需要访问的地址并提供一个回调函数来接收数据</p><p>👇 js请求立即执行全局作用域下名为的 <code>jsonp</code> 的 回调函数 <code>callback</code></p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://domain/api?param1=a&amp;param2=b&amp;callback=jsonp</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// js get请求 把数据放到这个函数的参数里</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">jsonp</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  	</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><ul><li>使用简单</li><li>兼容性不错</li><li>只限 get 请求</li></ul><p>在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的</p><p>👇 因此封装一个 JSONP 🔧 函数</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">jsonp</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">url</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">jsonpCallbackName</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">callbackFn</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{})</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 1. 动态创建 js标签</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">script</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">script</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">script</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">url</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">script</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">async</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">script</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">text/javascript</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 创建一个script标签</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 2. 创建回调函数挂在全局作用域</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">window</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">jsonpCallbackName</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">callbackFn</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">appendChild</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">script</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 使用方式</span></span>
<span class="line"><span style="color:#82AAFF;">jsonp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://xxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">callback</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>👆 不直接在 <code>HTML</code> 中写 <code>js标签</code> 请求，而是 <code>工具函数</code> 动态创建 <code>js标签</code> 并设置 <code>回调函数</code></p><h2 id="解决跨域-cors通信与后端通信" tabindex="-1">解决跨域-CORS通信与后端通信 <a class="header-anchor" href="#解决跨域-cors通信与后端通信" aria-label="Permalink to &quot;解决跨域-CORS通信与后端通信&quot;">​</a></h2><p>CORS通信 需要浏览器和服务端同时支持</p><ul><li>现代浏览器自动进行 CORS 通信？(IE 8 和 9 通过 XDomainRequest 来实现)</li><li>服务端设置 <code>Access-Control-Allow-Origin</code> 就可以开启 CORS。 设置通配符则表示所有网站都可以访问资源，或者白名单域名</li></ul><p>CORS通信的请求会分为 <code>简单请求、复杂请求</code></p><h3 id="简单请求" tabindex="-1">简单请求 <a class="header-anchor" href="#简单请求" aria-label="Permalink to &quot;简单请求&quot;">​</a></h3><p>当满足以下条件时，会触发简单请求</p><ul><li>请求方法 <code>METHOD</code><ul><li><code>GET</code></li><li><code>HEAD</code></li><li><code>POST</code></li></ul></li><li><code>Content-Type</code><ul><li><code>text/plain</code></li><li><code>multipart/form-data</code></li><li><code>application/x-www-form-urlencoded</code></li></ul></li></ul><p>满足👆的 <code>请求方法</code> 和 <code>Content-Type</code></p><p>请求中的任意 <code>XMLHttpRequestUpload</code> 对象均没有注册任何事件监听器 XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。</p><p>👆 TODO: 什么意思</p><h3 id="复杂请求" tabindex="-1">复杂请求 <a class="header-anchor" href="#复杂请求" aria-label="Permalink to &quot;复杂请求&quot;">​</a></h3><p>不符合以上条件的请求就是复杂请求</p><p>此时会发起一个预检请求，该请求是 <code>option</code> 方法</p><p>通过该请求来知道服务端是否允许跨域请求</p><p>使用过 <code>Node</code> 来设置 <code>CORS</code> 的话，可能会遇到过这么一个坑。 👇 <code>express</code> 案例</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">req</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">next</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">header</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Access-Control-Allow-Origin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">*</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">header</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Access-Control-Allow-Methods</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">PUT, GET, POST, DELETE, OPTIONS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">header</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Access-Control-Allow-Headers</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">  )</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">next</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>该请求要实现验证 <code>Authorization</code> 字段，没有就报错提醒</p><p>此时发现前端发起了复杂请求后，<code>nodejs</code> 服务返回结果永远是报错的</p><p>因为预检请求也会进入服务端请求会触发 <code>next</code> 方法</p><p>而预检请求并不包含 <code>Authorization</code> 字段，所以服务端会报错</p><p>解决办法在 <code>nodejs服务端</code> 中过滤 <code>option</code> 方法</p><p>👇 <code>option</code> 请求返回 <code>204</code> 给浏览器</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">statusCode </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">204</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 204 No content，表示请求成功，但响应报文不含实体的主体部分</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Length</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">0</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">end</span><span style="color:#A6ACCD;">()</span></span></code></pre></div><h2 id="解决跨域-document-domain与后端通信" tabindex="-1">解决跨域-document.domain与后端通信？ <a class="header-anchor" href="#解决跨域-document-domain与后端通信" aria-label="Permalink to &quot;解决跨域-document.domain与后端通信？&quot;">​</a></h2><p>二级域名相同时，比如 <code>a.test.com</code> 和 <code>b.test.com</code></p><p>给页面添加</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">domain </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test.com</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><p>表示二级域名都相同就可以实现跨域</p><p>TODO: 具体怎么设置</p><h2 id="解决跨域-postmessage与前端通信" tabindex="-1">解决跨域-postMessage与前端通信 <a class="header-anchor" href="#解决跨域-postmessage与前端通信" aria-label="Permalink to &quot;解决跨域-postMessage与前端通信&quot;">​</a></h2><p>前端跨域通信场景，不是前端和后端通信</p><p>用于获取嵌入页面中的第三方页面数据 一个页面发送消息，另一个页面判断来源并接收消息</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 发送消息端</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">parent</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">postMessage</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://test.com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接收消息端</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> mc </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MessageChannel</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">mc</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">event</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">origin</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">origin</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">originalEvent</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">origin</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">origin</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://test.com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">验证通过</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><h2 id="todo-其他解决跨域被拦截方法" tabindex="-1">TODO: 其他解决跨域被拦截方法 <a class="header-anchor" href="#todo-其他解决跨域被拦截方法" aria-label="Permalink to &quot;TODO: 其他解决跨域被拦截方法&quot;">​</a></h2>`,61),e=[p];function t(c,r,y,D,F,i){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{C as __pageData,d as default};
