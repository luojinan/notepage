import{_ as l,o as t,c as a,V as i}from"./chunks/framework.b450deef.js";const s=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/01-深度学习/http/http3.md","filePath":"articles/01-深度学习/http/http3.md"}'),e={name:"articles/01-深度学习/http/http3.md"},o=i('<blockquote><p>2022年6月6日，<code>IETF QUIC</code> 和 <code>HTTP</code> 工作组成员 <code>Robin Marx</code> 宣布，经过 5 年的努力，HTTP/3 被标准化为 RFC 9114，这是 HTTP 超文本传输协议的第三个主要版本。同时，HTTP/2 也更新为 RFC 9113标准，HTTP/1.1 和通用 HTTP 语义和缓存概念在 RFC 9110-9112 中也得到了加强。</p></blockquote><h2 id="http协议的终极问题" tabindex="-1">http协议的终极问题 <a class="header-anchor" href="#http协议的终极问题" aria-label="Permalink to &quot;http协议的终极问题&quot;">​</a></h2><p>我们知道http协议的2个特性，就是导致后续我们各种优化和改动的主要原因</p><ul><li>无连接(每进行一次HTTP通信，都要断开一次TCP连接)</li><li>无状态</li></ul><p>为了解决TCP的多次连接问题，HTTP/1.1提出了持久连接的方法 为了解决无状态导致的冗余重复内容传输，提出的强/协商缓存策略、cookie</p><p>可以看出http协议作为网络传输的通道，终极问题都是更快的请求和响应</p><p><img src="https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20220702203235.png" alt="HTTP/2协议分层"></p><p>👆 http协议的分层，分层的概念会另外讲解TODO: 基础分层为</p><ul><li>物理层</li><li>IP层</li><li>TCP层</li><li>HTTP层</li></ul><h2 id="概述http-2" tabindex="-1">概述HTTP/2 <a class="header-anchor" href="#概述http-2" aria-label="Permalink to &quot;概述HTTP/2&quot;">​</a></h2><blockquote><p>在开始HTTP/3之前，我们先简单总结一下HTTP/2带来的提升和没能解决的问题</p></blockquote><p>从👆【http协议的终极问题】的分层图，可以看出HTTP/2 在HTTP/1.1 的基础上，只是多了一层 <code>Stream</code> 和 <code>HPack</code> 层，用于实现数据用流的形式传输而不是HTTP/1.1的字符数据传输</p><ul><li>多路复用 <ul><li>基于stream流分帧，实现只建立一个TCP连接，并且并发请求传输不用排队按顺序返回</li></ul></li><li>头部压缩 <ul><li>基于Hpack算法，类似字典短字符实现头部字段压缩</li></ul></li></ul><p>HTTP/2还是沿用HTTP/1.1的基座，属于拓展式的优化</p><p>所以优化未能解决的问题，也正是整个HTTP的基座的问题— —TCP协议</p><ul><li>丢包(弱网)场景，单个TCP连接会怎样？</li><li>即使只有单个TCP连接，一次连接消耗的请求响应来回有4次(慢启动)</li></ul><h2 id="不使用tcp协议" tabindex="-1">不使用TCP协议？ <a class="header-anchor" href="#不使用tcp协议" aria-label="Permalink to &quot;不使用TCP协议？&quot;">​</a></h2><blockquote><p>在我们以往的学习知识里，因为IP层不可靠而需要可靠的TCP层，那我们其实可以不使用TCP层做网络传输吗？</p></blockquote><h3 id="tcp层的作用" tabindex="-1">TCP层的作用 <a class="header-anchor" href="#tcp层的作用" aria-label="Permalink to &quot;TCP层的作用&quot;">​</a></h3><blockquote><p>TCP 协议1.为了更容易传送大数据会数据分割；2.三次握手（three-way handshaking）策略能够确认数据最终是否送达到对方。</p></blockquote><p><img src="https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20220703133834.png" alt=""></p><p><img src="https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20220703133639.png" alt=""></p><h2 id="替代tcp层的quic协议" tabindex="-1">替代TCP层的QUIC协议 <a class="header-anchor" href="#替代tcp层的quic协议" aria-label="Permalink to &quot;替代TCP层的QUIC协议&quot;">​</a></h2><h2 id="新的udp" tabindex="-1">新的UDP？ <a class="header-anchor" href="#新的udp" aria-label="Permalink to &quot;新的UDP？&quot;">​</a></h2><p>和原TCP层一样处于传输层</p><blockquote><p>udp 怎么保证 TCP 的安全性 udp不是面向链接的，而且udp传输的时候，不携带源端IP和源端口号，无法重试 需要添加源IP和端口号，并且增加序列，保证内容完整性。</p></blockquote><h3 id="udp-与-tcp-的区别" tabindex="-1">UDP 与 TCP 的区别 <a class="header-anchor" href="#udp-与-tcp-的区别" aria-label="Permalink to &quot;UDP 与 TCP 的区别&quot;">​</a></h3><ul><li>UDP 协议是面向无连接的，不需要在正式传递数据之前先连接起双方 <ul><li>TCP 在发送数据前要进行三次握手建立连接</li><li>不可靠: 通信都不需要建立连接，想发就发</li></ul></li><li>UDP 协议不会对数据报文进行任何拆分和拼接操作，不保证有序且不丢失的传递到对端 <ul><li>在发送端，应用层将数据传递给传输层的 UDP 协议，UDP 只会给数据增加一个 UDP 头标识下是 UDP 协议，然后就传递给网络层</li><li>在接收端，网络层将数据传递给传输层，UDP 只去除 IP 报文头就传递给应用层，不会任何拼接操作</li><li>不可靠: 收到什么数据就传递什么数据,不关心对方是否已经正确接收到数据</li></ul></li><li>UDP 协议也没有任何控制流量的算法</li><li>TCP 保证数据不丢失且有序到达，有一系列逻辑负担</li><li>UDP 的头部开销小，只有八字节，相比 TCP 的至少二十字节要少得多，在传输数据报文时是很高效的。 <ul><li>两个十六位的端口号，分别为源端口（可选字段）和目标端口</li><li>整个数据报文的长度</li><li>整个数据报文的检验和（IPv4 可选 字段），该字段用于发现头部信息和数据中的错误</li></ul></li><li>UDP 不止支持一对一的传输方式，同样支持一对多，多对多，多对一的方式，也就是说 UDP 提供了单播，多播，广播的功能</li><li>总的来说 UDP 相较于 TCP 更加的轻便</li></ul><p>👆 UDP 因为没有拥塞控制，一直会以恒定的速度发送数据。即使网络条件不好，也不会对发送速率进行调整。这样实现的弊端就是在网络条件不好的情况下可能会导致丢包，但是优点也很明显，在某些实时性要求高的场景（比如电话会议）就需要使用 UDP 而不是 TCP。</p><p>直播、游戏：TCP 会严格控制传输的正确性，一旦有某一个数据对端没有收到，就会停止下来直到对端收到这个数据。这种问题在网络条件不错的情况下可能并不会发生什么事情，但是在网络情况差的时候就会变成画面卡住，然后再继续播放下一帧的情况</p><p>UDP 相比 TCP 简单的多，不需要建立连接，不需要验证数据报文，不需要流量控制，只会把想发的数据报文一股脑的丢给对端 虽然 UDP 并没有 TCP 传输来的准确，但是也能在很多实时性要求高的地方有所作为</p>',31),p=[o];function P(c,T,h,u,r,n){return t(),a("div",null,p)}const C=l(e,[["render",P]]);export{s as __pageData,C as default};
