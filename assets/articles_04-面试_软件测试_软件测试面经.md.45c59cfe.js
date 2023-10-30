import{_ as p,o as e,c as i,V as l}from"./chunks/framework.b450deef.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/04-面试/软件测试/软件测试面经.md","filePath":"articles/04-面试/软件测试/软件测试面经.md"}'),t={name:"articles/04-面试/软件测试/软件测试面经.md"},s=l("<ol><li><p>项目过程中遇到印象深刻的问题？</p></li><li><p>项目过程中怎么定位问题</p></li><li><p>查询实时日志用什么命令 1） 查询实时日志 tail -f /aaa/bb/cc.log tailf /aaa/bb/cc.log tail -n2 -f 查看最后两行日志 less + F /aaa/aa/aa.log 2）实时监控多个日志文件 multitail /aaa/aa/aa.log /bbb/bb/bb.log lnav /aaa/aa/aa.log /bbb/bb/bb.log</p></li><li><p>服务器查询目前线程的状态的命令 1）ps -T -p pid 查询进程号为pid的进程创建的所有线程 2）ps -ef|grep pid 3）top -H 实时显示各个线程情况 4）top -H -p pid 输出某个特定线程pid并检查该线程内运行的线程状况 5）du -sh 查询文件内容</p></li><li><p>有一个查询客户的列表功能，右上角新增一个下载按钮，支持下载查询到的客户列表，这个功能要怎么测</p></li><li><p>能够根据客户的姓名、员工号字段去查询客户列表的接口，其中有一个偏移量和count是int类型，并且是必传的，这个接口要怎么测</p></li><li><p>自动化框架</p><ul><li>介绍业务背景 基金的一些主流程交易做了UI自动化，比如基金的购买、定投、赎回、撤单、查询类交易都做了UI自动化实现，</li><li>介绍自动化目的 回归测试 进行一轮冒烟测试 开发修改底层代码，评估不到范围，可以用自动化进行覆盖 上游接口改造，没有通知是自动化可以及时发现问题、</li><li>取得了什么收益，发现了哪些问题 回归需要几天，现在回归只需要3小时 回归发现了交易规则查询的功能，前端展示的购买确认和到账确认日与实际接口返回不一致，上游接口做了改造</li><li>接口自动化框架描述 Requests 发起接口请求 Unnitest用例管理（test fixture初始化方法setup和teardown、test case测试用例、test suite测试套件、test runner测试的运行、test loader加载测试） ddt 数据驱动 openpyxl 读取excel logging 用来打印执行日志 htmltestrunner 生成测试报告 pymysql 操作数据库 jenkins 持续集成，自动定时构建 1、给你一个功能你怎么设计用例？ 首先我会从功能角度、用户体验、兼容性、安全性以及性能角度着手设计 性能主要考虑单用户响应时间（小于3秒），高并发下响应时间小于5秒 单用户时后台请求是否过多，高并发下服务器监控指标是否正常，大量客户登入登出时会不会内存外泄</li></ul></li></ol><p>2、公司的测试流程 产品、开发、测试和分析师一起会参加需求评审会议，产品会详细讲述业务功能的流程和细节，开发测试有问题可以直接提问，如果评估需求有问题或者文档描述不清晰可以要求修改文档，直到会议无问题后，测试经理分配测试人员及测试时间，什么时候提测，冒烟，定版，测试人员准备思维导图和测试用例，约开发、产品，分析师参加用例评审会议，补充和完善测试用例，待开发提测后开始冒烟测试，冒烟完成执行测试用例，有bug就提缺陷，执行完后分析测试结果，出具测试报告，回归周回归主流程案例，投产上线后进行生产验证，进行生产运维</p><p>3、介绍你的项目，在项目中主要做什么内容</p><p>4、项目的迭代次数，迭代周期？以及开发人员根据和开发测试比？最近项目的迭代更新了哪些内容？你设计了多少用例和脚本</p><p>5、如果出现bug，bug要这么定位，如何判断前后端bug 先判断出问题的是什么功能，这个功能都涉及到什么接口，定位出是哪一个接口报的错，在opc或者日志易查看接口请求和响应报文，具体分析如果是请求上送错参数或者页面展示错误，就是前端的问题，如果是请求没问题但返回的字段值有问题就是后端的问题，</p><p>6、你最深刻的bug是什么，测试过程中你是怎么解决的，怎么去处理的？</p><p>7、web和app测试有什么区别？小程序和web、app测试的时候又有什么区别？</p><p>8、在工作中常用的linux命令？ 查看日志用tail-f、less 显示线程的情况top-h，ps -ef查看进程 查看文件内存du -sh</p><p>9、数据库的在增删改查你常用的sql命令有哪些？</p><p>10、接口测试怎么做？jmeter怎么去做接口测试 首先根据接口文档梳理接口的请求地址、请求参数、请求方式和响应内容，根据业务逻辑做一个正常、异常（参数异常和数据异常）或者非空的验证 其次检查数据库的，比如基金购买，入参的数据是否跟数据库记录的数据保持一致 然后是看日志，检查系统前后端的接口日志的上送和返回的报文和后段跟下游系统的交互的接口信息是否是一致的，进行一个联调测试， 最后是看页面效果是否跟接口返回的数据一致</p><p>11、接口的关联性怎么在jmeter中做处理？</p><p>12、get和post请求区别是什么</p><p>13、如何抓取app端的网络请求？以及web端的网络请求？</p><p>14、自动化怎么做，自动化的流程是什么？ 1筛选稳定的项目或者稳定的项目模块 2根据项目的特点选择合适的自动化（接口或者ui） 3筛选手工案例需转为自动化测试的案例 4编码维护自动化案例 5用持续集成工具集成自动化测试做到自动执行 6对整体的自动化过程持续改进，进行脚本优化</p><p>15、元素定位你常用什么方式，不同的元素定位方式有什么区别？</p><p>16、你的职业规划是什么？</p><p>17、你的优缺点，你有什么优势可以胜任这份工作</p><p>18、你离职的原因是什么？</p><p>19、还有什么问题要问我的吗？ 公司目前在做什么项目 测试人员分配比例 公司目前在做哪方面的测试</p><p>20、selenium底层原理是什么？ 发起网络接口去访问浏览器驱动，浏览器驱动再访问浏览器</p><p>21、如何保证测试脚本执行结果的正确性？ 每一个步骤都要留痕，项目中提供日志和截图可做回溯检查</p><p>答不上来的： 1、python的列表和元组区别 列表是可变的，元组是不可变的 相同点是都是序列，可以存储任何数据类型，也可以通过索引访问，在python中主要将低开销较大的块分给元组，列表就分配小内存块，与列表相比，元组的内存更小</p><p>2、UI自动化下拉列表 通过select工具类提供的方法可以去选择下拉列表，根据值选择selectbyvalue，根据索引、文本</p><p>3、sql的连接查询 七种连接，左连接、右连接、内连接、全连接、左表独有、右表独有、左右表独有</p><p>4、sql倒序查询表中后三条数据 select * from table order by table.id desc limit 2,1</p><p>5、自动化框架</p><p>答上的： 1、养老金项目的流程，你都做了什么</p><p>2、充值话费的功能怎么测</p><p>3、你的优势和缺点是什么</p><p>4、自动化测试的流程</p><p>5、ui自动化元素定位 id、name、classname、classselector、linktext、partial_linktext、tagname、xpath</p><p>面试真题 1、业务类型 i.如何判断BUG是前端的还是后端的？</p><p>ii.如何基于某一个业务场景进行用例的设计？</p><p>2、编程类型 i.元祖与列表的区别</p><p>ii.数据类型的常用操作行为实现（list添加元素，str分割字符串，集合数据去重）</p><p>3、UI自动化 POM和关键字驱动的区别和各自的优势分别是什么？</p><ul><li>做UI自动化框架都是基于这两种其中一种框架完成的。</li><li>关键字驱动一般封装元素的操作行为，比如click、sendkey、get、close、switchTo，也可以封装业务逻辑，</li><li>POM是针对单个系统量身定制的自动化框架设计模式，一个POM框架只能对应一个系统，这种模式可以更加精准、更加完整的实现业务覆盖，极大提升单系统的测试工作效率，而且在维护和管理代码、测试数据都很方便，可维护性更高，</li><li>而关键字驱动是可以对应不同的业务、不同的系统以一对多的形式实现的自动化框架设计模式，可以兼容多个项目的自动化实施</li></ul><p>4、接口自动化 i.接口关联如何处理？</p><ul><li>核心就是数据提取，关键数据的参数化。</li><li>http协议本身是个无状态的网络协议，解决这个无状态特性主要是几种方式，cookie+session、cooki+token、cooki+session+token，将sessionid或者token存进cookie中，在接口请求时带上这些关联数据，实现接口的业务链的关联</li><li>将sessionid、token以及业务中关联的一些id，wxcode等等这种特定的字符串数据获取出来，通过两种方式处理，第一个是定义全局变量，把获取出来的数据保存在全局变量中，后续需要调用的时候通过调用对应的全局变量来处理，这种方式是对于简单的业务链或者数据相对较少的时候用，但是如果数据量较大，请求和返回的结果需要关联的数据变多了之后就不能再用全局变量的方式了。第二个是可以通过文件的写入，把获取的数据写入到文件中，后续调用就可以去文件里读取写入到文件里对应的值</li></ul><p>ii.接口测试如何开展？</p><ul><li>工作流和介入时间</li></ul><p>5、测试框架 pytest参数化管理？</p><p>Allure测试报告内容优化？</p><p>框架的结构与实现的介绍讲解？</p><p>自动化如何关联持续集成</p><p>6、数据库 多表查询</p>",46),a=[s];function o(n,c,r,u,_,d){return e(),i("div",null,a)}const m=p(t,[["render",o]]);export{g as __pageData,m as default};
