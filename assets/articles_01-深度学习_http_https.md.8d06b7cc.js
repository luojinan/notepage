import{_ as a,o as e,c as t,V as o}from"./chunks/framework.b450deef.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/01-深度学习/http/https.md","filePath":"articles/01-深度学习/http/https.md"}'),l={name:"articles/01-深度学习/http/https.md"},p=o('<p>部署不上gitee</p><blockquote><p>首先把一些概念简单提一下</p></blockquote><p>👇 我们先简单的定义网络层(不是理想模型) <img src="https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20220323210844.png" alt=""></p><p>可以看出HTTPS并不是取代HTTP的新应用层，HTTP和HTTPS的区别仅仅是中间多了一层协议，其他网络相关的东西是没有区别的</p><p>而SSL (安全套接层) 和TLS (安全传输层协议) 的区别是SSL是旧版而TLS是新版而已 本文都用TLS指代HTTPS的协议层</p><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>HTTP的数据传输是明文传输的，这里只要抓包就能被偷私密信息，如账号密码，付款密码等</p><hr><p>思考🤔: 学习TCP的时候，不是说TCP就是为了保证数据的可靠性吗？TCP保护的是什么？</p><hr><p>加密🔐数据来传输可以解决被偷明文数据的问题，那我们用常规的对称加密不就可以了吗？</p><p>加密要考虑的是被破也就是 <strong>反解密</strong> 的问题，对称加密是可以用原数据和加密后数据来反解出密钥🔑的，当然如果我们可以做到不同客户端的密钥🔑都不相同，那黑客不知道你的原数据就没办法反解出你的密钥了</p><p>但是，要做到每个客户端的密钥🔑都不相同就不可避免的要传输密钥🔑，因为服务端也不知道不同客户端的密钥🔑是什么 那就又陷入了传输数据被偷的困境</p><hr><p>思考🤔: 现在常用的密码JWT转token的加密形式用在数据传输上是不是也可以？</p><hr><h2 id="tls加密协议" tabindex="-1">TLS加密协议 <a class="header-anchor" href="#tls加密协议" aria-label="Permalink to &quot;TLS加密协议&quot;">​</a></h2><blockquote><p>如👆 SSL (安全套接层) 和TLS (安全传输层协议) 的区别是SSL是旧版而TLS是新版而已</p></blockquote><p>HTTPS依然通过 原HTTP 来传输信息 但是信息多通过 TLS 协议进行加密</p><p>在 TLS 中使用了两种加密技术，分别为：对称加密和非对称加密。</p><p>首次进行 TLS 协议传输需要两个 RTT ，接下来可以通过 Session Resumption 减少到一个 RTT。</p><h3 id="https的非对称加密🔒" tabindex="-1">HTTPS的非对称加密🔒 <a class="header-anchor" href="#https的非对称加密🔒" aria-label="Permalink to &quot;HTTPS的非对称加密🔒&quot;">​</a></h3><blockquote><p>非对称加密，使用两个不同的密钥：<code>公钥（public key）</code>和<code>私钥（private key）</code>。公钥与私钥是一对，如果用公钥对数据进行加密，只有用对应的私钥才能解密；如果用私钥对数据进行加密，那么只有用对应的公钥才能解密。</p></blockquote><p>RSA算法是非对称加密的核心TODO:</p><p>我们用对称加密的反解密思路，黑客通过自己的原数据和加密后数据反解出公钥，黑客拿着公钥去抓包，去解别人用公钥加密的数据，是解不开的😁</p><p>优点：加密和解密使用不同的钥匙，传输公钥即可，私钥不需要通过网络进行传输，安全性很高。 缺点：计算量比较大，加密和解密速度相比对称加密慢很多。</p><h3 id="结合对称加密提高性能" tabindex="-1">结合对称加密提高性能 <a class="header-anchor" href="#结合对称加密提高性能" aria-label="Permalink to &quot;结合对称加密提高性能&quot;">​</a></h3><blockquote><p>如👆说的非对称加密的缺点，耗时耗电</p></blockquote><p>那我们结合对称加密和非对称加密不就行了吗，我们用非对称加密来加密我们的对称加密密钥</p><p>本文把对称加密的密钥叫做<code>[密钥]</code>，非对称加密叫<code>[公钥]</code>和<code>[私钥]</code></p><p>方案1</p><ol><li>由服务器生成公钥、私钥、密钥</li><li>服务器用私钥对密钥加密</li><li>客户端发起请求</li><li>服务器把加密后的密钥给客户端</li><li>后续双方用加密后密钥加密数据传输</li></ol><p>👆 问题出在用了私钥加密数据，只要用公钥就能解开而公钥是作为公开的东西 只要黑客用公钥解开得出密钥就能任意获取客户端发送的数据了 并且可以用反解对称加密的形式，解开用户的数据，不需要解开加密后密钥</p><p>方案2</p><ol><li>由服务器生成公钥、私钥、密钥</li><li>服务器用公钥对密钥加密</li><li>客户端发起请求</li><li>服务器把加密后的密钥给客户端</li><li>后续双方用加密后密钥加密数据传输</li></ol><p>👆 黑客解不开加密后的密钥，但是黑客拿着加密后的密钥，可以用反解对称加密的形式，解开用户的数据 <img src="https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20220323222753.png" alt=""></p><p>上诉2种方案的问题都出在，密钥由服务器生成一个唯一的，虽然加密了但是陷入对称加密里一样的问题，所以我们要不同客户端生成不同的密钥，这个步骤交给客户端做 如👇 <img src="https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20220323214743.png" alt=""></p><p>可以看到这样不可避免的多了一些往返消耗，因为服务器要给客户端公钥，而客户端还要给服务器密钥，才能开始通信</p><h2 id="中间人黑客手段" tabindex="-1">中间人黑客手段 <a class="header-anchor" href="#中间人黑客手段" aria-label="Permalink to &quot;中间人黑客手段&quot;">​</a></h2><blockquote><p>我们现在假设黑客没办法破解出我们和服务器通信的数据了</p></blockquote><p>那作为黑客，我又想出了一个办法</p><p>黑客拦截客户端的首次请求，伪装成客户端想要访问的服务器，原本服务器要给客户端返回公钥 黑客伪装成服务器返回一个假的公钥，客户端拿着假的公钥做的操作和通信，都被黑客给自己解开了</p><p>HTTPS也要把这种黑客给防掉，而不是让服务器自己解决 这种欺骗客户端的形式，只要让客户端只认自己要请求的服务器就可以了</p><p>那服务器怎么证明自己是客户端要访问的对象呢 服务器把一些域名信息给客户端校验就可以了 但是服务器证明自己是自己的信息，也是公开的，那黑客也可以伪装这些信息呀😰</p><h2 id="ca机构" tabindex="-1">CA机构 <a class="header-anchor" href="#ca机构" aria-label="Permalink to &quot;CA机构&quot;">​</a></h2><h2 id="证书" tabindex="-1">证书 <a class="header-anchor" href="#证书" aria-label="Permalink to &quot;证书&quot;">​</a></h2><h2 id="完整流程" tabindex="-1">完整流程 <a class="header-anchor" href="#完整流程" aria-label="Permalink to &quot;完整流程&quot;">​</a></h2><h2 id="一个证书多个地方用-自签名" tabindex="-1">一个证书多个地方用？自签名？ <a class="header-anchor" href="#一个证书多个地方用-自签名" aria-label="Permalink to &quot;一个证书多个地方用？自签名？&quot;">​</a></h2><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><p><a href="https://www.bilibili.com/video/BV1KY411x7Jp" target="_blank" rel="noreferrer">HTTPS是什么？加密原理和证书。SSL/TLS握手过程-技术蛋老师视频</a><a href="https://segmentfault.com/a/1190000021494676" target="_blank" rel="noreferrer">HTTPS 详解一：附带最精美详尽的 HTTPS 原理图</a></p>',50),i=[p];function r(c,h,n,s,d,T){return e(),t("div",null,i)}const S=a(l,[["render",r]]);export{b as __pageData,S as default};
