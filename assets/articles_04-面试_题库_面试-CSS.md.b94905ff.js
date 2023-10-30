import{_ as i,o as l,c as e,V as o}from"./chunks/framework.b450deef.js";const S=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/04-面试/题库/面试-CSS.md","filePath":"articles/04-面试/题库/面试-CSS.md"}'),a={name:"articles/04-面试/题库/面试-CSS.md"},t=o('<p><a href="https://segmentfault.com/a/1190000013325778" target="_blank" rel="noreferrer">50道CSS基础面试题（附答案）</a></p><h2 id="css-继承" tabindex="-1">CSS 继承 <a class="header-anchor" href="#css-继承" aria-label="Permalink to &quot;CSS 继承&quot;">​</a></h2><p>字体样式相关</p><h2 id="line-height-单位" tabindex="-1">line-height 单位 <a class="header-anchor" href="#line-height-单位" aria-label="Permalink to &quot;line-height 单位&quot;">​</a></h2><ul><li><code>line-height: 200px</code></li><li><code>line-height: 1.5</code> - 根据自身元素字体大小计算</li><li><code>line-height: 200%</code> - 根据父级元素字体大小计算</li></ul><h2 id="css-选择器及优先级" tabindex="-1">CSS 选择器及优先级 <a class="header-anchor" href="#css-选择器及优先级" aria-label="Permalink to &quot;CSS 选择器及优先级&quot;">​</a></h2><p><strong>选择器</strong></p><ul><li>id选择器(#myid)</li><li>类选择器(.myclass)</li><li>属性选择器(<code>a[rel=&quot;external&quot;]</code>)</li><li>伪类选择器(a:hover, li:nth-child)</li><li>标签选择器(div, h1,p)</li><li>相邻选择器（h1 + p）</li><li>子选择器(ul &gt; li)</li><li>后代选择器(li a)</li><li>通配符选择器(*)</li></ul><p><strong>优先级：</strong></p><ul><li><code>!important</code></li><li>内联样式（1000）</li><li>ID选择器（0100）</li><li>类选择器/属性选择器/伪类选择器（0010）</li><li>元素选择器/伪元素选择器（0001）</li><li>关系选择器/通配符选择器（0000）</li></ul><p>带 <code>!important</code> 标记的样式属性优先级最高； 样式表的来源相同时： <code>!important &gt; 行内样式&gt;ID选择器 &gt; 类选择器 &gt; 标签 &gt; 通配符 &gt; 继承 &gt; 浏览器默认属性</code></p><p><code>CSS权重</code> 体现在多个样式选择器组合写样式时不生效, 原因是其他地方设置的样式 <code>权重高</code> 或是 <code>相等且处在后面</code></p><h2 id="rem-计算出375的屏幕-1rem-单位出现小数怎么处理" tabindex="-1">rem, 计算出375的屏幕，1rem,单位出现小数怎么处理 <a class="header-anchor" href="#rem-计算出375的屏幕-1rem-单位出现小数怎么处理" aria-label="Permalink to &quot;rem, 计算出375的屏幕，1rem,单位出现小数怎么处理&quot;">​</a></h2><h2 id="rem和vw的使用场景" tabindex="-1">rem和vw的使用场景 <a class="header-anchor" href="#rem和vw的使用场景" aria-label="Permalink to &quot;rem和vw的使用场景&quot;">​</a></h2><p><strong>rem</strong></p><p>改变了一个元素在不同设备上占据的css像素的个数 rem适配的优缺点</p><ul><li>优点：没有破坏完美视口</li><li>缺点：px值转换rem太过于复杂(下面我们使用less来解决这个问题)</li></ul><p><strong>viewport适配的原理</strong></p><p>viewport适配方案中，每一个元素在不同设备上占据的css像素的个数是一样的。但是css像素和物理像素的比例是不一样的，等比的</p><p>viewport适配的优缺点</p><ul><li>在我们设计图上所量取的大小即为我们可以设置的像素大小，即所量即所设</li><li>缺点破坏完美视口</li></ul><p><a href="./../../03-架构/设计/移动端响应式开发单位设计.html">移动端响应式开发单位设计</a></p><h2 id="display-的常见属性" tabindex="-1">Display 的常见属性 <a class="header-anchor" href="#display-的常见属性" aria-label="Permalink to &quot;Display 的常见属性&quot;">​</a></h2><h2 id="css的link标签和-import的区别" tabindex="-1">css的link标签和@import的区别 <a class="header-anchor" href="#css的link标签和-import的区别" aria-label="Permalink to &quot;css的link标签和@import的区别&quot;">​</a></h2><ol><li>概念</li></ol><ul><li>link标签属于HTML的标签，不仅仅可以加载样式还可以定义一些属性ref</li><li>@import属于CSS的语法，只能加载外部样式</li></ul><ol start="2"><li>加载顺序</li></ol><ul><li>link标签，加载页面时同时加载样式</li><li>@import，页面加载完成，才开始加载外部样式(如果把主页面样式写成@import会导致页面加载出来有一段时间样式缺失)</li></ul><ol start="3"><li>DOM操作区别</li></ol><ul><li>link是个标签，可以通过js新增删除样式</li><li>@import是css语法，无法通过js操作</li></ul><p>总结：</p><ul><li>性质不同，link是xhtml标签，无兼容性问题，可用于加载CSS文件的同时还可以进行RSS信息聚合等事务，而@import属于CSS范畴，在CSS2时提出，低版本浏览器不支持，只能用于加载CSS文件</li><li>加载时间不同，link引用CSS随页面载入时同时加载，@import需要在页面加载完毕后被需要时才会加载</li><li>写法不同，link是写在head标签中，而@import在html中只能写在style标签中</li><li>样式权重不同，link引用的样式权重高于@import</li></ul><h2 id="display-none、visibility-hidden、opacity-0的区别" tabindex="-1">display:none、visibility:hidden、opacity:0的区别 <a class="header-anchor" href="#display-none、visibility-hidden、opacity-0的区别" aria-label="Permalink to &quot;display:none、visibility:hidden、opacity:0的区别&quot;">​</a></h2><ul><li>opacity通过透明度隐藏dom，还有占位和可以点击（依然要渲染，消耗性能）</li><li>visibility控制可视性隐藏dom，还有占位和不可点击（不渲染，保留空间，消耗一丢丢性能）</li><li>display盒模型彻底隐藏（不渲染，不保留空间）</li></ul><p>性能： 浏览器GUI渲染线程、浏览器JS引擎线程 css渲染过程：布局(排列、重排、回流)-&gt;绘制(重绘)</p><p>开关<code>opacity</code>和开关<code>visibility</code>都会触发重绘</p><h2 id="scss样式穿透原因及原生原理" tabindex="-1">scss样式穿透原因及原生原理 <a class="header-anchor" href="#scss样式穿透原因及原生原理" aria-label="Permalink to &quot;scss样式穿透原因及原生原理&quot;">​</a></h2><p>内部写样式不生效，改为全局样式后生效的原因 在vue中用了scope组件样式，去改第三方组件之类的样式不生效的原因是第三方组件的样式是全局的，内部组件scope不会给第三方组件加data码，这样组件选择器会选不中它 scss提供给组件父级下的选择器加deep，让这部分样式编译成全局样式，不带data码</p><p>如果是原生css会不会遇到样式穿透的问题，如何解决</p><h2 id="css盒模型" tabindex="-1">CSS盒模型 <a class="header-anchor" href="#css盒模型" aria-label="Permalink to &quot;CSS盒模型&quot;">​</a></h2><p>css 盒子模型分为两种：<code>IE 怪异盒模型</code>，<code>标准盒模型</code></p><p>实际应用中表现为，默认情况(标准盒模型)设置了 宽高，<code>padding</code> 是往里缩的,即 <code>内容宽高</code> 小于盒子宽高</p><p>当需要 设置的盒模型 <code>宽高</code> 就是 <code>内容宽高</code>， 且 <code>padding</code> 往外扩 则设置为 <code>怪异盒模型</code></p><ol><li>盒模型</li></ol><ul><li>内容(<code>content</code>)</li><li>内边距(<code>padding</code>)</li><li>边框(<code>border</code>)</li><li>外边距(<code>margin</code>)</li></ul><ol start="2"><li>宽高区别</li></ol><ul><li><code>W3C</code> 标准盒子的 <code>width/height</code> 直接为 <code>content</code></li><li><code>IE</code> 盒子的 <code>width/height</code> 为 <code>content + padding + border</code></li></ul><ol start="3"><li><code>box-sizing</code> 可以转换盒子模型</li></ol><ul><li><code>border-box(IE)</code></li><li><code>content-box(W3C,默认)</code></li></ul><h2 id="bfc" tabindex="-1">BFC <a class="header-anchor" href="#bfc" aria-label="Permalink to &quot;BFC&quot;">​</a></h2><p><code>block formatting context</code> 块级格式上下文</p><p><code>BFC</code> 是一个独立的空间，里面子元素的渲染不影响外面的布局</p><p>作用👇：</p><ul><li>解决 margin 塌陷 <ul><li>默认情况下 2个盒模型相连处的 margin 会取最大值而不是相加</li><li>把盒模型变为 <code>BFC</code> 空间，即可不互相影响 margin 而是相加</li></ul></li><li>清除浮动 <ul><li>父元素内的浮动子元素，会让父元素不占文档流</li><li>把父元素变为 <code>BFC</code> 空间, 即可让父元素知道子元素的宽高, 并占相应的文档流</li></ul></li></ul><p>如何触发 <code>BFC</code> 👇：</p><ul><li><code>overflow: hidden</code></li><li><code>display: flex / inline-block / table-cell </code></li><li><code>position: absolute / fixed</code></li></ul>',56),d=[t];function c(r,s,n,p,h,u){return l(),e("div",null,d)}const b=i(a,[["render",c]]);export{S as __pageData,b as default};
