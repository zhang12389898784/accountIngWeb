1.get post
    请求参数的位置get会附加在url之后，post在请求体中
    请求长度的限制因为url有长度限制而post没有（请求长度和响应长度是两个东西）
    安全性 get请求会将参数暴露在url中因此不能用于传递敏感信息 post放在body中相对安全 其实安全不安全最终还是要看加密的
    幂等性 get请求是幂等的，即多次执行同一get请求服务器将返回相同结果。post请求则不是，因为每次提交都会创建新的资源 ？？？
    缓存 get请求可以被浏览器缓存，而post不会，除非在响应头中包含适当的Cache-Control或Expires字段
    后退刷新操作的影响：get会重复执行，post则不会 ？？？
2.http2相对于http1.x有什么优势和特点
    二进制分帧层Http2不在使用文本格式来传输数据，而是将所有数据分割成更小的消息和帧，并以二进制格式进行编码。这有助于更高效的解析http消息
        维度	    文本格式	                    二进制格式
        解析速度	需逐字符解析，效率较低	        直接按字节解析，效率高
        数据体积	冗余字符多，体积较大	        无冗余，体积更小
        传输速度	较慢（需传输更多字节）	        更快（字节更少，适合高吞吐场景）
        可读性	    高（人类可直接阅读）	        低（需工具解析，如十六进制查看器
    多路复用，http2中允许单个tcp连接中并行处理多个请求和响应。消除了http1的队头阻塞问题极大提高了网路性能和资源利用率
        补充：http1中在同一个tcp连接中，请求必须按顺序依次处理，问题根源基于文本的协议设计，没有请求/响应标识符，无法区分响应归属必须依赖顺序维护响应关系HTTP/1.1 的应对方案浏览器开启多个 TCP 连接（通常 6-8 个）
    头部压缩，http2使用了头部压缩技术，通过共享头部信息，可以显著的减少传输的数据量这有助于减少延迟和网络带宽的消耗特别是在传输量大，少请求的时候
        补充：
            1.HTTP/1.x 痛点头部数据重复传输对小文件请求（如图标）头部可能比实际数据更大
            2.HPACK 核心技术 静态表 动态表
    服务器推送，http2允许服务器主动向客户端推送资源，而无需等待客户端的请求。这有助于减少往返时间，提高网页加载速度
3.HTTPS是怎么保证安全的
    加密传输ssl/TLS协议对http报文进行加密，这种过程结合了对称加密和非对称加密
    身份验证https通过数字安全证书进行身份验证。在建立https连接时服务器会提供数字证书来证明自己的身份。这是为了防止被恶意伪装的服务器攻击
    数据完整性保护 在传输数据前https会对数据进行加密，并使用消息摘要（hash)算法生成一个摘要值在数据到达接收端后，他也进行摘要计算并进行比较
    补充：
        TLS 第一步就怎么加密浏览器和服务器达成一致 第二步服务器证明身份 第三步浏览器和服务器共同生成对称加密的密钥
        1.浏览器会向服务器发送一个消息，其中包含浏览器支持的 TLS 版本、加密算法集以及一个随机数。
        2.接着，服务器会回应一个Server Hello消息，其中包含双方共同支持的 TLS 版本、加密算法集和另一个随机数。这个消息是服务器对浏览器请求的响应，表示双方已就加密参数达成一致。
        3.然后，服务器会发送一个Certificate消息，其中附加了服务器的证书。这个证书用于证明服务器的身份，确保浏览器连接的是真实的、可信任的服务器。浏览器在接收到证书后，会对其进行验证，以确保其有效性。
        4.在证书验证通过后，浏览器会使用证书中附带的公钥生成一个pre-master secret，并将其作为Client Key Exchange消息体发送给服务器。这个pre-master secret是后续生成加密密钥的重要基础。
        5.服务器在收到pre-master secret后，会使用自己的私钥进行解密，得到原始的pre-master secret。然后，服务器和浏览器会使用这个pre-master secret和之前收到的对方的随机数，共同生成一个相同的master key。这个master key将用于加密和解密后续所有的通信数据
        6.浏览器会发送一个Change Cipher Spec消息，告知服务器已准备好使用新的加密密钥进行通信。紧接着，浏览器会发送一个使用master key加密的Finished消息，以验证加密密钥的正确性。
        7.服务器在接收到这些消息后，也会进行相应的验证和处理。一旦验证通过，服务器会同样发送一个Change Cipher Spec消息和一个使用master key加密的Finished消息给浏览器，表示握手过程已完成，双方已建立起安全的通信通道。
4.http状态码
    1.信息状态码
        100 Continue 客户端应继续其请求
        101 切换协议
    2.成功状态码
        200 OK请求成功
        201 Created 请求已经被实现，并因此创建了一个新资源
        204 No Content 服务器处理了请求但没有返回任何内容
    3.重定向状态码
        301 Moved Permanently 永久重定向
        302 Found 临时重定向
        304 not Modified 客户端已经执行了get请求但文件并未发生变化
    4.客户端错误状态码
        400 Bad Request 服务器无法理解请求
        401 Unauthorized 请求要求进行身份验证
        403 Forbidden 无权限
        404 Not Found 找不到资源
        405 Method Not Allowed 请求中的方法不支持
    5.服务器错误状态码
        500 未知错误
        501 服务器不支持
        503 服务器过载
5.post请求为什么会多次发送option请求
    1.安全性：post发送的请求是http的一种特性称为预检请求。主要发生在跨域请求中会发生在导致资源创建修改删除的请求前，用于询问服务器是否允许这样的操作
    2.自定义头部 用来询问服务器是否接受这些头部
    3.在服务器响应options请求时可以通过Access-Control-Allow-Methods,Access-Control-Allow-Headers等头部来告诉浏览器它允许哪些方法和头部如果包含了这些头部浏览器才会实际发送请求
    更正：   PTIONS预检请求是由浏览器发起的，而不是由服务器控制的。
            当浏览器检测到当前请求是跨域请求，并且满足以下条件之一时，会自动发送OPTIONS预检请求：
            请求方法不是GET、HEAD或POST（或者虽然是POST但Content-Type不是application/x-www-form-urlencoded、multipart/form-data或text/plain）。
            请求中包含自定义的HTTP头部
6.http的请求和响应报文分别是什么样子的
    请求报文主要由请求行请求头部，空行和请求正文组成。
        请求行包含了http方法，请求的url 已经http版本号
        请求头部则包含了诺干与请求相关的信息如Accept-Charset浏览器可接受的字符集，Accept-language浏览器所希望的语言种类
        空行用于分隔请求头部和请求正文
        请求正文是要发送给服务器的信息
    响应报文主要由状态行，响应头部，响应正文组成。
        状态行包含了http版本，状态码以及状态码的描述，用于描述请求的处理结果
        响应头包含了与响应相关的元信息如Content-Type响应的媒体类型 Content-Length响应体的长度
        响应正文则包含了服务器返回给客户端的数据
7.http的keep-alive
    也叫http的长连接，是一种通过重用TCP连接和接收多个http请求的机制
    主要作用
        减少连接建立开销
        降低网络负载
        提高性能和响应时间
        支持http管道化
8.浏览器缓存的优先级
    service worker->memory cache->http cache(其中包含强缓存，协商缓存)->disk cache(磁盘缓存)->push cache(推送缓存)
    1.service worker 他是运行在浏览器背后的独立线程一般可以用来实现缓存功能，因其中涉及到了请求拦截所以必须使用https协议来保障安全（解决方法自动支持 HTTPS：类似于 localhost，127.0.0.1 也被视为安全的上下文，可以用于开发和测试。简单说可以在本地玩一玩）
    2.Memory Cache 是浏览器缓存机制中的一种，用于存储最近访问的资源，以便快速响应后续请求。
        存储位置 
            内存中：Memory Cache 存储在浏览器的内存中，这意味着访问速度非常快，因为内存访问比磁盘访问快得多
            临时性：由于存储在内存中，Memory Cache 的数据在浏览器会话结束时（例如关闭标签页或浏览器）会被清除。
        缓存策略 
            LRU（Least Recently Used）：Memory Cache 通常使用最近最少使用算法来管理缓存。当缓存达到容量限制时，最近最少使用的资源会被移除。
            大小限制：Memory Cache 的大小通常有限制，具体大小取决于浏览器的实现和可用内存。
        缓存内容
            静态资源：如 HTML、CSS、JavaScript 文件、图像等。
            动态资源：某些动态生成的资源也可能被缓存，具体取决于服务器的响应头设置。
        缓存控制
            务器可以通过设置响应头来控制资源的缓存行为
                例如：
                Cache-Control: max-age=3600：指示资源在 3600 秒内有效。
                Cache-Control: no-cache：指示每次请求都必须验证资源的有效性。
                Cache-Control: no-store：指示资源不应被缓存。
                ETag 和 Last-Modified：这些头部字段用于验证资源是否已更改，从而决定是否从缓存中提供资源。
    3.HTTP Cache 
        HTTP Cache 是浏览器缓存机制中的一种，用于存储从服务器获取的资源（如 HTML、CSS、JavaScript 文件、图像等），以便在后续请求中快速提供这些资源，减少网络请求次数，提高页面加载速度和性能。
            强缓存是指浏览器在缓存期内直接使用缓存资源无需向服务器发送请求
                cache-control:max-age=<seconds> 资源在多少秒内有效
                expires 指定一个资源过期时间
            协商缓存是指浏览器在缓存过期后向服务器发送请求验证资源是否更新，如果没有更新服务器返回304状态码已更新返回新资源
                ETag:资源的唯一标识符
                    客户端发送带有if-none-match头部的请求
                    服务器根据ETag判断资源是否更新
                    如果未更新，返回304 
                    已更新 返回新资源，并包含新的ETag
                Last-Modified:资源最后修改时间
                     客户端发送带有if-Modified-Since头部的请求
                     服务器根据Last-Modified判断资源是否更新
                    如果未更新，返回304 
                    已更新 返回新资源，并包含新的Last-Modified
            工作流程
                1.首次请求
                    浏览器发送请求到服务器。
                    服务器返回资源，并包含缓存控制头部（如 Cache-Control 或 Expires）。
                    资源被存储在浏览器的缓存中。
                2.后续请求：
                    强缓存：如果资源在 max-age 或 Expires 时间内，浏览器直接从缓存中获取资源，无需发送请求。
                    协商缓存:如果资源在 max-age 或 Expires 时间外，浏览器发送带有 If-None-Match 或 If-Modified-Since 头部的请求到服务器。
                        服务器根据头部信息判断资源是否已更新：
                        如果未更新，返回 304 Not Modified，浏览器使用缓存资源。
                        如果已更新，返回新的资源，并更新缓存
                3.缓存更新：
                        如果服务器返回 Cache-Control: no-cache 或 Cache-Control: no-store，浏览器会直接从服务器获取最新资源，并更新缓存。
                        使用 ETag 和 Last-Modified 进行协商缓存时，浏览器会根据服务器的响应更新缓存。
    4.Disk Cache
        Disk Cache（磁盘缓存）是浏览器缓存机制的一种，用于将资源持久化存储在硬盘中，以便在后续请求中快速加载资源。它主要用于存储较大或不频繁变化的资源（如图片、视频、字体文件等），以提高页面加载速度并减少网络请求。
        1.核心特性
            存储位置：硬盘中，数据在浏览器关闭后仍保留。
            容量：较大（取决于硬盘空间），适合存储体积较大的资源
            访问速度：较慢（相比内存缓存），但比网络请求快
            持久性：数据长期保留，可跨浏览器会话使用。
            适用资源：静态大文件（如 CSS、JS、图片、视频）、低频更新的资源。
        2.缓存控制机制
            Cache-Control :max-age<second>资源在指定时间内有效|public 允许代理服务器缓存|no-store禁止缓存资源到磁盘|no-cache需向服务器验证资源有效性
            Expires,ETag,last-Modified同http缓存
    5.推送缓存
        服务器可以在客户端请求某个资源（如 HTML）时，主动推送相关资源（如 CSS、JS）到客户端，减少往返时间（RTT）。
9.为什么存在跨域
    跨域因浏览器的同源策略限制，其旨在防止一个域的脚本与另一个域的内容交互以使用户免受xxs,csrf
    同源：相同的协议，主机（域名或ip地址），端口号
    1.jsonp
    2.cors
    3.代理服务器
    4.window.postMessage
10.浏览器的渲染机制
    补充：js阻塞dom树解析，css不阻塞dom,但阻塞cssom树的生成从而阻塞渲染树的生成，还有渲染树生成之后会进行布局树在此样式计算
    已会，过了
11.重绘回流
    重绘：改动的样式不影响布局
    回流：改动的样式影响布局
    减少重绘和回流的方法
    1.避免频繁操作样式：尽量一次性修改多个样式属性而不是逐一修改
    2.利用css3动画：Css3的动画和过渡不会触发回流，因为他们是通过GPU进行渲染的，这可以大大提高性能
    3.避免使用table布局
    3.批量修改dom如果需要添加删除或修改多个Dom节点可以考虑使用DocumentFragment或离线节点（就是新创建没挂载的dom节点），这样可以在一次回流中完成所有操作
        因为js的事件循环机制所以大部分时候在同一函数中修改多次dom会自动合并成一个但是如果在 DOM 操作后立即访问某些布局属性（如 offsetWidth、clientHeight、getComputedStyle() 等），浏览器会强制立即计算最新布局，导致渲染队列提前刷新。此时后续的 DOM 操作会触发新的重排，造成性能损耗。
    4.使用绝对定位 绝对定位的元素不会触发其父元素及后续元素的回流，因为他们已经脱离了正常的文档流
    5.避免使用内联样式？？？没理解
    6.优化图片加载？？？没理解
    7.利用浏览器的缓存机制？？？没理解