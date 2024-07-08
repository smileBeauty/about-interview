1.前端监控实现原理
监听浏览器中的错误事件
window.addEventListener('error', this.handleError.bind(this));  
window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));  
利用performance采集性能数据

页面加载时间
首次内容渲染时间（First Contentful Paint, FCP）
首次有效渲染时间（First Meaningful Paint, FMP）
可交互时间（Time to Interactive, TTI）
资源加载时间
JavaScript执行时间
PV（Page View）：页面的浏览数量，每打开页面一次就会统计一次。
UV（User View）：不同用户访问的次数，在PV的基础上根据User信息的不同做了去重操作。
用户在每个页面停留的时间：即从用户打开该页面到用户离开该页面的时间差，用于表示该页面对用户的留存程度。
用户的来处：即从什么入口或什么渠道来到了当前页面，通常会在URL中添加查询参数来做区分统计。
用户的页面操作行为：即用户在该页面点击了哪些按钮，或者从什么链接去到了某些页面等，用于分析用户的去向。


网络协议
OSI（Open Systems Interconnection，开放系统互连）模型是一个开放性的通信系统互连参考模型，它定义了网络通信的七层结构。这七层从上到下分别是：
应用层：这是网络协议的最高层，直接为用户提供应用服务。它定义了应用程序之间的通信服务，如HTTP、FTP、SMTP等协议都工作在这一层。
表示层：这一层的主要功能是定义数据格式及加密，确保数据在传输过程中的正确性和安全性。
会话层：负责在网络中的两个节点之间建立、管理和终止会话。
传输层：提供端到端的通信服务，确保数据包的可靠传输。常见的传输层协议有TCP和UDP。
网络层：负责数据包的路由选择，即选择最佳路径将数据包从源节点传输到目的节点。IP协议是这一层的核心协议。
数据链路层：定义了在单个链路上如何传输数据，包括数据的封装、帧的同步、差错控制等功能。
物理层：负责物理信号的传输，包括信号的编码、解码、调制、解调等功能。物理层常用多个规范完成对所有细节的定义，如Rj45、802.3等。

在网络通信中，特别是在使用TCP（传输控制协议）进行数据传输时，为了确保数据的可靠传输，TCP采用了三次握手（Three-way Handshake）来建立连接，以及四次挥手（Four-way Handshake）来断开连接。这两种机制都是TCP协议的核心部分，用于管理TCP连接的建立和终止。

三次握手（Three-way Handshake）
三次握手是TCP建立连接的过程，它确保了通信双方都能够接收和发送数据。具体步骤如下：
SYN请求：客户端向服务器发送一个SYN（同步序列编号）报文段。这个报文段不包含应用层数据，但它包含一个初始序列号（ISN，Initial Sequence Number），用于后续的TCP报文段中数据的顺序编号。此时，客户端进入SYN-SENT（同步已发送）状态。
SYN+ACK应答：服务器收到客户端的SYN报文段后，向客户端发送一个SYN+ACK（同步确认）报文段作为应答。这个报文段中包含了服务器的初始序列号，同时确认号为客户端的初始序列号加1，表示服务器已经收到了客户端的SYN报文段。此时，服务器进入SYN-RCVD（同步收到）状态。
ACK确认：客户端收到服务器的SYN+ACK报文段后，向服务器发送一个ACK（确认）报文段。这个报文段的确认号为服务器的初始序列号加1，表示客户端已经收到了服务器的SYN报文段。此时，连接建立，客户端和服务器都进入ESTABLISHED（已建立）状态。

四次挥手（Four-way Handshake）
四次挥手是TCP断开连接的过程，它允许通信双方优雅地关闭连接。具体步骤如下：

FIN请求关闭：客户端（或服务器）想要关闭连接时，会发送一个FIN（结束）报文段给对方，表示自己没有数据要发送了。此时，发送FIN报文段的一方进入FIN-WAIT-1（结束等待1）状态。
ACK确认：接收到FIN报文段的另一方会发送一个ACK报文段作为应答，表示已经收到了对方的FIN报文段。此时，如果它是客户端，则进入CLOSE-WAIT（关闭等待）状态；如果它是服务器，则进入LAST-ACK（最后确认）状态。
FIN请求关闭：一段时间后，如果原先发送FIN报文段的一方收到了对方的所有数据，会再次发送一个FIN报文段给对方，表示自己已经准备好关闭连接了。此时，该方进入TIME-WAIT（时间等待）状态。
ACK确认：接收到第二个FIN报文段的另一方会发送一个ACK报文段作为应答，表示已经收到了对方的FIN报文段，随后双方进入CLOSED（已关闭）状态，连接断开。
注意，在TIME-WAIT状态期间，TCP连接会保持一段时间（通常是2MSL，即两倍的报文段最大生存时间），以确保所有在网络中传输的报文段都已经过期，从而避免新的连接因为旧的报文段而被错误地建立。

dns缓存
1. 浏览器缓存
描述：浏览器会缓存DNS解析结果，以加快后续访问同一网站的速度。浏览器缓存的DNS记录与DNS服务器的TTL（Time to Live，生存时间）无直接关系，而是由浏览器自己设定的缓存时间来决定。例如，Chrome浏览器的DNS缓存时间通常为1分钟。
2. 本地系统缓存
描述：操作系统也会缓存DNS解析结果。Windows系统的DNS缓存通常保存在C:\Windows\System32\drivers\etc\hosts文件中，但更多临时的缓存信息则存储在操作系统的内存中。这些缓存信息可以加速对同一域名的后续解析请求。
3. 路由器缓存
描述：在家庭或企业网络中，路由器也可能缓存DNS解析结果。这有助于减轻网络负担并提高访问速度。路由器缓存的DNS记录也会根据TTL值来更新。
4. 本地DNS服务器缓存
描述：本地DNS服务器（也称为递归DNS服务器）会缓存它解析过的DNS记录。当客户端（如计算机或手机）向本地DNS服务器发起DNS解析请求时，如果请求的域名已经存在于本地DNS服务器的缓存中，那么服务器将直接返回缓存中的结果，而无需再向其他DNS服务器发起查询。这可以显著提高DNS解析的速度和效率。
5. 权威DNS服务器缓存
描述：权威DNS服务器是负责解析特定域名的DNS服务器。这些服务器也会缓存DNS记录，但通常它们的缓存策略更加复杂，因为它们需要确保缓存的DNS记录是最新的，并且能够反映域名的当前状态。
总结
DNS缓存一般发生在浏览器、本地系统、路由器、本地DNS服务器以及权威DNS服务器等多个环节。这些缓存机制共同构成了DNS解析的缓存体系，旨在提高DNS解析的速度和效率，减轻网络负担，并提升用户体验。在日常使用中，用户通常不需要手动干预这些缓存机制，因为它们会自动根据TTL值或其他策略来更新缓存中的DNS记录。然而，在某些特殊情况下（如DNS缓存污染或域名DNS服务器地址变更），用户可能需要手动清除缓存以获取最新的DNS解析结果。

XSS（跨站脚本攻击）
定义：
XSS（Cross Site Scripting）是跨站脚本攻击，攻击者利用网站对用户输入的数据没有进行足够的过滤的漏洞，将恶意脚本注入到用户浏览的页面中，当其他用户浏览该页面时，嵌入其中的恶意脚本就会被执行，从而达到攻击的目的。

类型：
XSS攻击主要分为以下几种类型：
反射型XSS：通过URL的参数传递恶意脚本，当受害者点击这些链接时，恶意脚本就会在受害者的浏览器中执行。
存储型XSS：攻击者将恶意脚本注入到网站的数据库中，当其他用户访问这些包含恶意脚本的页面时，恶意脚本就会被执行。
DOM型XSS：基于DOM（文档对象模型）的漏洞，攻击者通过修改页面的DOM结构来执行恶意脚本。
防范措施：
对所有用户输入的数据进行严格的过滤和转义处理。
设置XSS过滤器，定制过滤策略。
使用HTTP Only Cookie，禁止JavaScript读取Cookie值。
对输出进行编码，避免输出未经过滤的内容。


XSS（跨站脚本攻击）概述
XSS（Cross-Site Scripting，跨站脚本攻击）是一种代码注入攻击，攻击者通过在网站中注入恶意脚本，使之在用户的浏览器中执行。根据攻击方式和脚本存储位置的不同，XSS攻击可以分为三种类型：反射型XSS、存储型XSS和DOM型XSS。

1. 反射型XSS
反射型XSS通常发生在攻击者通过URL参数注入恶意脚本，被服务器接收并反射回用户浏览器执行。这类攻击通常不会将恶意脚本存储在服务器上。

Demo（反射型XSS）:

假设有一个简单的网页，该网页显示用户通过URL传递的参数：

html
<!-- vulnerable.html -->  
<!DOCTYPE html>  
<html>  
<head>  
    <title>反射型XSS Demo</title>  
</head>  
<body>  
    <h1>Welcome, <?php echo $_GET['name']; ?>!</h1>  
</body>  
</html>
攻击者可以通过构造URL http://example.com/vulnerable.html?name=<script>alert('XSS');</script> 来触发XSS攻击。

2. 存储型XSS
存储型XSS与反射型XSS的不同之处在于，恶意脚本被永久存储在服务器上（例如，在数据库、消息论坛、评论系统等），每当受害者访问包含该脚本的页面时，恶意脚本就会被执行。

Demo（存储型XSS）（简化版，通常涉及后端数据库存储）:

html
<!-- comment.html -->  
<!DOCTYPE html>  
<html>  
<head>  
    <title>存储型XSS Demo</title>  
</head>  
<body>  
    <h1>Comments:</h1>  
    <?php  
        // 假设这是从数据库读取的评论  
        $comment = "<script>alert('XSS');</script> This is a comment.";  
        echo $comment;  
    ?>  
</body>  
</html>
在这个例子中，恶意脚本已经“存储”在了一个假设的数据库中，并且被直接嵌入到了页面中。

3. DOM型XSS
DOM型XSS与上述两种类型不同，它不直接依赖于服务器端的代码或数据，而是基于DOM（文档对象模型）的修改。攻击者通过修改页面上的DOM元素来执行脚本。

Demo（DOM型XSS）:

html
<!DOCTYPE html>  
<html>  
<head>  
    <title>DOM型XSS Demo</title>  
</head>  
<body>  
    <h1>DOM XSS Example</h1>  
    <script>  
        // 假设这是从URL参数中获取的  
        var userInput = location.search.substring(1);  
        document.body.innerHTML += '<p>Hello, ' + userInput + '!</p>';  
    </script>  
</body>  
</html>
攻击者可以通过构造URL http://example.com/domxss.html?name=<img%20src=x%20onerror=alert('XSS')> 来执行DOM型XSS攻击。

防范措施
对输入进行验证和清理：确保所有用户输入在存储或显示之前都被正确验证和清理。
使用HTTP头：设置合适的Content-Type和X-Content-Type-Options等HTTP头来防止MIME类型混淆攻击。
输出编码：对输出进行编码，确保HTML、JavaScript、CSS等代码不会被浏览器误解释为可执行代码。
使用内容安全策略（CSP）：CSP可以减少XSS攻击的风险，通过指定哪些外部资源可以加载到页面上。

CSRF（跨站请求伪造）
定义：
CSRF（Cross-Site Request Forgery）是跨站请求伪造，也被称为One Click Attack或者Session Riding，攻击者利用用户在已登录的Web应用程序上执行非本意的操作。
攻击原理：
用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A。
在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功。
用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B（内含恶意代码）。
网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A。
浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。
网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。
防范措施：
将Cookie设置为HttpOnly。
验证HTTP Referer字段，确保请求来自合法的来源。
在请求地址中添加Token并验证，确保请求的有效性。
在HTTP头中自定义属性并验证，增加额外的验证机制。


SSRF（服务端请求伪造）
定义：
SSRF（Server-Side Request Forgery）是服务端请求伪造，攻击者构造请求，由服务端发起请求的一种安全漏洞。它将一个可以发起网络请求的服务当作跳板来攻击其他内部服务。
攻击方式：
攻击者利用Web应用中存在的从其他服务器应用获取数据的功能，但没有对目标地址做过滤和限制。
攻击者可以构造恶意请求，使服务端向不受信任的地址发起请求，从而获取敏感信息或对内网服务进行攻击。
防范措施：
限制请求的端口只能为Web端口，只允许访问HTTP和HTTPS请求。
限制不能访问内网IP，防止对内网进行攻击。
屏蔽或者过滤返回的详细信息，避免敏感信息泄露。
对请求地址设置白名单，只允许请求白名单内的地址。


Webpack中的Loader和Plugin在底层原理上的不同主要体现在它们的作用范围、工作方式以及与Webpack构建过程的交互方式上。

Loader的底层原理
作用范围：
Loader主要关注于模块级别的转换。它们被设计用来处理单个文件的转换过程，将文件内容从一种格式转换成Webpack能够理解的模块格式（通常是JavaScript）。
工作方式：
Loader作为Webpack的模块转换器，它们在Webpack的构建过程中被调用，接收文件内容作为输入，并输出转换后的模块内容。
Loader可以链式调用，即一个文件的转换过程可以经过多个Loader，每个Loader负责完成转换过程的一部分。
Loader的执行顺序是固定的，通常是按照配置文件中指定的顺序从右到左（或从下到上）执行。
与Webpack构建过程的交互：
Loader通过Webpack的配置文件（通常是webpack.config.js）与Webpack构建过程进行交互。
Loader的配置信息（如匹配规则、使用的Loader等）被Webpack读取并用于指导Loader的执行。
Loader的执行结果（即转换后的模块内容）被Webpack进一步处理，并最终包含在打包文件中。
Plugin的底层原理
作用范围：
Plugin则更加灵活和强大，它们可以扩展Webpack的功能，并参与到Webpack构建过程的多个阶段。
Plugin可以监听Webpack构建过程中的各种事件，并在这些事件发生时执行自定义的操作。
工作方式：
Plugin通常是一个类，它们通过实现Webpack提供的钩子（Hooks）机制来与Webpack构建过程进行交互。
在Webpack的编译过程中，当特定的事件被触发时，注册的Plugin会被调用，并执行相应的操作。
Plugin可以访问Webpack的编译对象（Compiler和Compilation），从而能够读取和修改构建过程中的各种数据。
与Webpack构建过程的交互：
Plugin的注册和配置也是通过Webpack的配置文件（webpack.config.js）完成的。
Plugin通过实现apply方法来注册自己到Webpack编译器上，并在编译器的相应事件触发时执行自定义的操作。
Plugin的执行结果可以影响Webpack构建过程的输出，如优化打包结果、生成额外的文件等。
综上所述，Loader和Plugin在底层原理上的主要区别在于它们的作用范围、工作方式以及与Webpack构建过程的交互方式。Loader专注于模块级别的转换，而Plugin则提供了更广泛和灵活的扩展能力，能够参与到Webpack构建过程的多个阶段并执行自定义操作。

Webpack的工作流程是一个复杂但有序的过程，它涉及从初始化参数到最终输出资源文件的多个步骤。在这个过程中，Loader和Plugin分别扮演着重要的角色，它们分别在不同的节点上工作，共同完成了Webpack的打包任务。

Webpack的工作流程
Webpack的工作流程大致可以分为以下几个步骤：
初始化参数：从配置文件（如webpack.config.js）和Shell语句中读取并合并参数，得出最终的配置对象。
创建Compiler对象：用上一步得到的参数初始化Compiler对象，并加载所有配置的插件。
开始编译：执行Compiler对象的run方法开始执行编译。
确定入口：根据配置中的entry找出所有的入口文件。
编译模块：从入口文件出发，调用所有配置的Loader对模块进行编译，再找出该模块依赖的模块，递归执行此步骤直到所有入口依赖的文件都经过了处理。
完成模块编译：经过Loader翻译完所有模块后，得到每个模块被翻译后的最终内容以及它们之间的依赖关系。
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk，再把每个Chunk转换成一个单独的文件加入到输出列表。
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
Loader和Plugin的节点
Loader的节点：
Loader主要负责模块的编译和转换工作。
在Webpack的编译过程中，每当Webpack处理一个模块时，它都会根据配置文件中module.rules的规则，找到对应的Loader来处理该模块。
Loader的工作发生在模块编译阶段，即上述工作流程中的“编译模块”步骤。Loader会递归地处理所有入口文件及其依赖的模块，将它们转换成Webpack能够理解的格式（通常是JavaScript）。
Plugin的节点：
Plugin是Webpack的支柱功能之一，它为Webpack提供了强大的扩展能力。
Plugin可以监听Webpack生命周期中的多个事件，并在这些事件发生时执行自定义的逻辑。
Plugin的工作节点遍布Webpack的整个工作流程，包括但不限于初始化参数、创建Compiler对象、编译模块、输出资源等各个阶段。
例如，在“输出资源”阶段，可能会有一些Plugin用于优化输出的资源文件（如压缩、添加版本号等）；在“输出完成”阶段，可能会有Plugin用于清理旧的输出文件或执行其他清理工作。
总结
Webpack的工作流程是一个有序且复杂的过程，它涉及多个步骤和组件的协同工作。Loader和Plugin作为Webpack的重要组成部分，分别在不同的节点上发挥着关键作用。Loader主要负责模块的编译和转换工作，而Plugin则提供了强大的扩展能力，允许开发者在Webpack的多个生命周期事件中插入自定义逻辑。


在Webpack中，Compiler和Compilation是两个非常重要的概念，它们在Webpack的打包过程中扮演着不同的角色。以下是它们之间的主要区别：

Compiler
定义与功能：
Compiler是Webpack的主要引擎，它控制了整个Webpack的编译流程。它是Webpack的全局单例，代表了整个Webpack从启动到关闭的生命周期。
Compiler负责读取配置、创建Compilation实例、管理插件等。它提供了丰富的钩子（hooks），允许插件在Webpack的不同阶段插入自定义逻辑。
生命周期：
Compiler的生命周期从Webpack启动开始，到Webpack关闭结束。它管理了Webpack的整个构建过程。
与插件的关系：
插件通过compiler.hooks来监听Webpack事件，从而在不同阶段插入自定义逻辑。例如，在Webpack启动前、编译前、编译后等阶段，插件都可以执行特定的任务。
Compilation
定义与功能：
Compilation代表了一次资源的构建过程。每当Webpack开始一次新的编译时，都会创建一个新的Compilation实例来管理这次编译的资源、模块、依赖等信息。
Compilation负责处理模块、生成资源、优化代码等具体的编译工作。它同样提供了丰富的钩子，允许插件在编译的不同阶段进行操作。
生命周期：
Compilation的生命周期相对较短，它只存在于一次编译过程中。每当Webpack检测到文件变化并触发新的编译时，都会创建一个新的Compilation实例。
与插件的关系：
插件可以通过监听Compilation的钩子来在编译的不同阶段执行自定义逻辑。例如，在模块构建前、构建后、优化阶段等，插件都可以对编译过程进行干预。
总结
全局与局部：Compiler是全局的，代表了Webpack的整个生命周期；而Compilation是局部的，代表了Webpack的一次编译过程。
功能与职责：Compiler负责管理和控制整个编译流程，包括读取配置、创建Compilation实例、管理插件等；而Compilation则负责具体的编译工作，如处理模块、生成资源、优化代码等。
与插件的交互：插件既可以通过监听Compiler的钩子来在Webpack的不同阶段执行自定义逻辑，也可以通过监听Compilation的钩子来在编译的不同阶段进行干预。但它们的关注点不同，Compiler的钩子更侧重于全局性的操作和设置，而Compilation的钩子则更侧重于编译过程中的具体操作和优化。
综上所述，Compiler和Compilation在Webpack中扮演着不同的角色，它们共同协作完成了Webpack的打包任务。


算法