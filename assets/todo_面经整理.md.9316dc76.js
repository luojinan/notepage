import{_ as e,o as s,c as n,V as a}from"./chunks/framework.b450deef.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"todo/面经整理.md","filePath":"todo/面经整理.md"}'),o={name:"todo/面经整理.md"},l=a(`<p>消息弹框文字过多会造成什么问题，解决办法是什么， 长页面如何使用懒加载的效果，如何实现下拉刷新和上拉加载， 开屏页面的优化有哪些方法，</p><p>如何清除浮动， 如何开启bfc， H5 C3有哪些新特性， flex布局都有哪些属性，flex属性值有哪些 深浅拷贝 （着重问了手写深拷贝）</p><p>document.onload()和document.ready()有什么区别</p><p>5、for in和for of的区别，为什么for of可以遍历的底层原理（迭代器）</p><p>7、instanceof底层的实现原理</p><p>判断一个整数是否为另一个数平方数。</p><p>斐波那契数列变种，返回所有的结果（第一项返回[1]，第二项返回[2][1,1]，第三项返回[1,1,1][1,2][2,1]）</p><p>发布订阅</p><p>简单实现promise</p><p>项目中遇到的难点如何解决</p><p>二叉树中序遍历</p><p>diff算法</p><p>数组反转</p><p>promise和async await的区别</p><p>怎么判断一个对象是空对象(只有Reflect.ownkeys可以)</p><p>LRU缓存</p><p>iPhone8和iPhone7plus的分辨率是多少 (不知道) 现在我告诉你iPhone8的分辨率是xxx*xxx 那么10px在iPhone8上表现为多少(不知道) 为什么1px在移动端会有问题(不知道)</p><p>vuex的实现原理</p><p>实现反转链表</p><p>场景题目：假如一个网站一部分页面需要登录一部分页面不需要，vue-router怎么处理 5.场景题目：假如有很多注释的*里面有一些内容，在webpack哪个位置对这些注释进行处理，详细说说。</p><p>webpack打包处理common.js与ES6 Module的区别</p><p>object.defineProperty()与proxy的区别与优缺点</p><p>url解析对象</p><ul><li>闭包(说说作用域执行结果)</li><li>原型</li><li>promise(实现promise.all)</li><li><a href="https://forrany.github.io/2018/08/28/2018-08-28-How-generator-works/" target="_blank" rel="noreferrer">Generator</a></li><li><a href="https://juejin.cn/post/6844903891021086734" target="_blank" rel="noreferrer">Async/Await原理</a></li><li><a href="https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20" target="_blank" rel="noreferrer">继承</a></li><li>手写深拷贝，深度优先 广度优先</li><li><a href="https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/8" target="_blank" rel="noreferrer">算法-将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组 #8</a></li><li>发布订阅和观察者</li><li><a href="https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/39" target="_blank" rel="noreferrer">请把俩个数组 <code>[A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]</code></a></li><li><a href="https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/54" target="_blank" rel="noreferrer">使用迭代的方式实现 flatten 函数</a></li><li><a href="https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/59" target="_blank" rel="noreferrer">介绍下 BFC 及其应用</a></li><li><a href="https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/87" target="_blank" rel="noreferrer">发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片</a></li><li><a href="https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/88" target="_blank" rel="noreferrer">实现 (5).add(3).minus(2) 功能</a></li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> (</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">++</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 9 9 9 9 9 9 9 </span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p><a href="https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/43#issuecomment-471960211" target="_blank" rel="noreferrer">闭包解决</a></p><p>前端面试之道-闭包#题: for循环一个var异步函数</p><p>还是要背手写题</p>`,28),p=[l];function t(r,i,c,y,d,F){return s(),n("div",null,p)}const u=e(o,[["render",t]]);export{f as __pageData,u as default};
