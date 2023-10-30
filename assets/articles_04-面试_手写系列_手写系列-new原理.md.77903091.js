import{_ as s,o as n,c as a,V as l}from"./chunks/framework.b450deef.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/04-面试/手写系列/手写系列-new原理.md","filePath":"articles/04-面试/手写系列/手写系列-new原理.md"}'),o={name:"articles/04-面试/手写系列/手写系列-new原理.md"},e=l(`<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new" target="_blank" rel="noreferrer">new - mdn</a></p><p>从微观的角度看对象的生成</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 这个字面量内部也是使用了 new Object()</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// function 就是个语法糖</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 内部等同于 new Function()</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Foo</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span></code></pre></div><p>对于对象来说，其实都是通过 <code>new</code> 产生的 <code>function Foo() ==&gt; new Function()</code><code>let a = { b : 1 } ==&gt; new Object()</code></p><p>👆 我们知道了除了我们自己写<code>类或者构造函数</code>需要 <code>new</code>，其实内部的很多东西都是在 <code>new</code></p><hr><p>🤔 通过 new 的方式创建对象和通过字面量创建有什么区别？</p><p>创建一个对象，性能上更推荐使用字面量的方式创建对象 使用 <code>new Object()</code> 的方式创建对象需要通过作用域链一层层找到 <code>Object</code>，但是使用字面量的方式就没这个问题</p><hr><h2 id="new-一个函数发生了什么" tabindex="-1"><code>new</code> 一个函数发生了什么 <a class="header-anchor" href="#new-一个函数发生了什么" aria-label="Permalink to &quot;\`new\` 一个函数发生了什么&quot;">​</a></h2><blockquote><p>输入函数 输出对象</p></blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new" target="_blank" rel="noreferrer">new - mdn</a> 文档中指出在调用 <code>new</code> 的过程中会发生四件事情：</p><ol><li>创建一个空的对象（即 <code>{}</code> ）</li><li>为创建的对象添加属性 <code>__proto__</code> ，将该属性链接至构造函数的原型对象</li><li>将创建的对象作为 <code>this</code> 的上下文</li><li>如果该函数没有返回对象，则返回<code>this</code></li></ol><h2 id="实现new" tabindex="-1">实现new <a class="header-anchor" href="#实现new" aria-label="Permalink to &quot;实现new&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">myNew</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">fn</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;font-style:italic;">arg</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 1. 创建一个空对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">fn</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 2. 设置空对象的原型</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fn</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">arg</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// 3. 绑定this并执行构造函数</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">instanceof</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 4. 构造函数不返回对象则返回创建的新对象</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">test</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">name</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#82AAFF;">myNew</span><span style="color:#A6ACCD;">(test</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><h2 id="构造函数" tabindex="-1">构造函数 <a class="header-anchor" href="#构造函数" aria-label="Permalink to &quot;构造函数&quot;">​</a></h2><blockquote><p>构造函数会在<code>class类</code>时详细分析 TODO:</p><p>这里还是提一下，构造函数主要帮助我们把重复的逻辑集成起来，也就是设计模式中的工厂模式</p><p>通过在构造函数的原型链上定义公用方法，实现每个new出来的对象的原型链上都有这些公用方法</p></blockquote><p>我们常常看到有一些构造函数<strong>同时</strong>支持new和直接调用</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> obj1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Object</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> obj2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Object</span><span style="color:#A6ACCD;">()</span></span></code></pre></div><p>👆 要同时支持并且都能正常使用是需要<strong>构造函数内部自己区分处理</strong>的</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Object</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">instanceof</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 直接调用构造函数时</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Object</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 通过new 调用构造函数时</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// do somting</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p><code>this instanceof Object</code>用this是否是实例自身判断是不是在new的写法在 <a href="./手写系列-callbind.html#实现bind">手写bind</a> 的时候我们用过这种写法</p><hr><p>思考🤔: <a href="./../../02-框架/vue/重学vue-01模板语法.html#Vue构造函数">new Vue()干了什么</a></p><hr><h2 id="代码地址" tabindex="-1">代码地址 <a class="header-anchor" href="#代码地址" aria-label="Permalink to &quot;代码地址&quot;">​</a></h2><p><a href="https://codepen.io/collection/kNgywB" target="_blank" rel="noreferrer">codepen</a></p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new" target="_blank" rel="noreferrer">new - mdn</a></li><li><a href="https://juejin.cn/post/6844903704663949325" target="_blank" rel="noreferrer">面试官问：能否模拟实现JS的new操作符</a></li></ul>`,30),p=[e];function t(c,r,y,F,i,D){return n(),a("div",null,p)}const d=s(o,[["render",t]]);export{C as __pageData,d as default};
