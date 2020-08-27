目录

[TOC]

# 一个完整的URL的组成
> URI = URL + URN
> URI：Identifier，统一资源标志符
> URN：Name，统一资源命名。即通过名字来标识资源的。
> **URL：Uniform Resource Locator，统一资源定位符**。即 URL 可以用来标识一个资源，而且还指明了如何定位这个资源。

一个完整的 URL 包含协议名称，主机名称（IP 或者域名）、端口号（没写端口号默认为 80 端口）、路径和查询字符串这5个部分。

1. 【传输协议】
常用的有
- `HTTP`：Hyper Text Transfer Protocol，超文本传输协议（除了传递普通的文本，还可以传递文件流或者进制编码等信息）（目前最常用）
- `HTTPS`：基于`SSL`（Secure Socket Layer，安全套接层）加密的HTTP传输协议，比HTTP更安全（涉及支付的网站一般是基于HTTPS完成的）
- `FTP`：File Transfer Protocol，文件传输协议，一般用来实现资源文件在服务器上的上传下载，相对于HTTP/HTTPS，FTP 传的文件大

2. 【域名】Domain Name
- 一级域名（顶级域名）www.qq.com
- 二级域名  news.qq.com
- 三级域名
.com：供商用的国际域名
.cn：供商用的中文域名
.net：用于网络供应服务商（系统类的）
.org：用于官方组织
.edu：供教育机构使用
.gov：用于政府机构
.vip

3. 【端口号】
用于区分同一台服务器上不同服务的标识（基于WEB服务管理创建服务时可以指定），不同服务之间一般不能使用相同的端口号。
- 一台服务器上的默认端口号范围：0~65535
- 默认值：HTTP 默认 80、HTTPS 默认 443、FTP 默认 21

注意以下几点：
1）默认端口管理是`浏览器行为`，当用户输入网址不写端口号时，浏览器会自动把默认的端口传递给服务器。

4. 【请求路径名称】
path
pathname
例如：/stu/index.html一般都是请求当前服务器对应的项目目录中，stu文件夹中的index.html页面。
特殊情况：当前的URL是被`伪URL重写的`（发生在前后端未分离的情况下），看到的URL请求其实不是真实的请求。

DHTML：动态页面，泛指当前页面中的内容不是写死的而是动态绑定的，例如，.jsp/.php/.aspx...这些页面中的数据都是基于Ajax或者后台编程语言处理，由服务器端渲染，最终把渲染后的结果返回给客户端呈现。

//=>例如，https://item.jd.com/4082786.html它的真实URL地址很可能是https://item.jd.com/detail.jsp?id=4082786

详情页模型：`同一个详情页，通过问号传参的方式，传入不同的产品ID，来展示不同的产品信息。`
但，像detail.jsp这种服务器渲染的动态页面不能被搜索引擎收录，不利于页面的SEO。

像：`/stu/info` 这种没有任何后缀信息，一般都不是用来请求资源文件的，而是用于`AJAX数据请求的接口地址`（如果后缀是.json类的，也是同理），但是有一种除外` /stu/info/` 这种的很可能不是接口地址，而是没有指定请求的资源名称，服务器会`请求默认的资源文件`，一般都是index.html/default.html...

5. 【问号传参及哈希值】
在HTTP事务中，问号传参是客户端把信息传递给服务器的一种方式。（也有可能是跳转到某一个页面，把参数值传递给页面用来标识的）
哈希值主要用于页面中的锚点定位和 HASH 路由切换。


# HTTP
## HTTP事务
1. 一次完整的`请求 + 响应`称之为 HTTP 事务。事务是完整的一次操作，请求和响应缺一不可。


2. 一个页面完全加载完，需要向服务器发起很多次 HTTP 事务操作。
	+ 一般来说，首先把HTML源代码拿回来，加载HTML时，遇到`link` / `script` / `img[src]` / `frame` / `video`和`audio（没有设置preload='none'）`...都会重新和服务器端建立HTTP事务交互。
	+ 特殊情况：如果做了资源缓存处理（304），而且即将加载的资源在之前已经加载过了，这样的操作和传统的HTTP事务不一样，它们是从服务器和浏览器的缓存中读取数据。




## HTTP 报文
在客户端向服务器发送请求，以及服务器把内容响应给客户端时，中间相互传递了很多内容（客户端把一些内容传递给服务器，服务器把一些内容响应给客户端），我们把传递的内容统称为“HTTP 报文”。

1. 起始行：
- 请求起始行：method  HTTP 协议
- 响应起始行：HTTP 协议 status statusText
2. 首部（头）：
- 通用头（General Headers）
```js
Request URL: https://www.baidu.com/
Request Method: GET
Status Code: 200 OK
Remote Address: 61.135.169.121:443 //=>主机地址（服务器外网IP地址）
Referrer Policy: no-referrer-when-downgrade //=>指定请求是从哪个页面跳转来的，分析用户来源
```
- 响应头（Response Headers）
```javascript
HTTP/1.1 200 OK //=>响应起始行，304表示是从上次缓存直接拿的，if-Modified-Since是记录上一次缓存时间
Bdpagetype: 2
Bdqid: 0xdf36fb1600050d34
cache-control: private
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html;charset=utf-8
Date: Sun, 27 May 2018 01:13:00 GMT //=>服务器端时间，GMT是格林尼治时间
//...
```
- 请求头（Request Headers）
```javascript
GET / HTTP/1.1 //=>请求起始行
Host: www.baidu.com
Connection: keep-alive
//...
```

3. 主体：
- 请求主体（`Request Payload / Form Data`）
客户端传递给服务器的内容
- 响应主体（Response）


## HTTP 请求方式
所有的请求都可以给服务器端传递内容，也都可以从服务器端获取内容
1. GET 系列
  - `get`：从服务器端获取数据（给的少拿的多）
  - `delete`：删除服务器端的数据
  - `head`：只想获取服务器返回的响应头信息，不要响应主体中的内容
  类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头。
  - `options`：一般向服务器发送一个探测性请求，如果服务器端返回信息了，说明当前客户端和服务器端建立了连接，可以继续执行其它请求了（trace更适合）
  但是`axios`这个Ajax类库在基于cross domain进行跨域请求时，就是先发送options请求进行探测尝试，如果能联通服务器，才会继续发送其它请求。
  - `trace`：主要用于测试和诊断
  - `connect`

2. POST 系列
  - `post`：向服务器端提交数据（新建数据）
  - `put/patch`：更新数据


## HTTP 网络状态码（status）
1. 分类：1-指示（服务器收到请求）  2-成功  3-重定向  4-客户端错误   5-服务器错误
2. 常见的 HTTP 状态码：
  - `200` - 请求成功（只能证明成功返回了，但是信息不一定是业务需要的）
  - `301` - 资源被永久转移到其它URL（**永久重定向**）
    =>域名更改，访问原始域名，配合 Location 重定向到新的域名，**以后都直接访问新的地址**
  - `302` - 资源在本次请求被临时转移到其它URL（**临时重定向**）如果返回的状态码是 302，并配合 Location，浏览器会自动跳转到 Location 这个地址，**下次请求还是会先访问老地址**
    =>`307`：网站有的是基于HTTPS协议运作的，如果访问的是HTTP协议，会基于307重定向到HTTPS协议上
    =>302 一般用作服务器的负载均衡，当一台服务器达到最大并发数（同时处理用户的能力）时，会把后续访问的用户临时转移到其它的服务器机组上处理。例如，项目中会把所有图品放到单独的“图片处理服务器”上
  - `304` - 该资源在上次请求之后没有任何修改，可直接使用浏览器中的缓存版本
    对于不经常更新的资源文件，例如：css、js、HTML、img等，服务器会结合客户端设置304缓存，第一次加载过这些资源就缓存到客户端，下次再获取时，是从缓存中获取；如果资源更新，服务器端会通过最后修改时间来强制让客户端从服务器重新拉取；基于Ctrl+F5强制刷新页面，304缓存就没用了。
  - `400` - Bad Request 请求参数错误
  - `401` - Unauthorized 无权限访问
  - `404` - Not Found 请求的资源不存在（地址不对）
  - `403` - 请求的资源访问被禁止
  - `413` - Request Entity Too large 和服务器交互的内容资源超过服务器最大限制
  - `500` - Internal Server Error 未知服务器错误
  - `503` - Service Unavailable 服务器超负荷
  - `504` - 网关超时


客户端和服务器端信息交互的方式
【客户端传递给服务器】
- 问号传参
请求的URL地址末尾通过问号传参方式，把一些信息传递给服务器，例如，/info?limit=10&page=1
- 设置请求头
客户端把需要传递给服务器的内容设置到请求头信息中（自定义请求头），服务器可以通过接收请求头信息把内容得到
- 设置请求主体
xhr.send([请求主体内容]);
Ajax的send中传递的内容，就是客户端设置的请求主体内容，服务器端可以接收到这些信息的。
注意：请求头信息会优先请求主体优先达到服务器，但设置请求头的方法并不常用。

【服务器返回给客户端】
- 设置响应头信息
例如，把服务时间通过响应头返回给客户端，客户端通过获取响应头信息得到这个时间（响应头返回的速度是优先于响应主体的）
- 设置响应主体
主要的返回信息都在响应主体中

# HTTP 的缓存机制
## 关于缓存的介绍
什么是缓存？
第一次访问一个新的网站，服务端必须全部返回所有数据。
第二次访问可以直接拿缓存

为什么要缓存？
1）为了优化性能，尽量减少 HTTP 请求次数和数据体积，加快页面加载速度
2）网络请求是不稳定的

哪些资源可以被缓存？
1）静态资源（js css img）
webpack 打包上线后会为静态资源（js css img）加一个hash值后缀，不会变更 
html、业务数据：一般不可缓存


## 缓存策略
完整的流程图：自己会画一遍

<img width="756" alt="http缓存综述" src="https://user-images.githubusercontent.com/22387652/90789019-f8cbc900-e338-11ea-9977-72bf62fa2190.png">

### 强制缓存
1. 强制缓存的流程
<img width="444" alt="强制缓存" src="https://user-images.githubusercontent.com/22387652/90702833-d4330b00-e2be-11ea-90df-3cbe880d52d1.png">

在**初次请求**时，服务器端除了返回请求的资源，如果是可以被缓存的资源（css、js、HTML、img），还会在 Response Headers 中返回一个 cache-control，用于**控制强制缓存的逻辑**。

例如 cache-control: public, max-age=15552000（单位是秒）

如果客户端**再次请求**，距离上次请求的时间还在 cache-control 规定的时间范围内，就会去本地缓存寻找资源，然后返回资源。（不经过网络）。

如果**缓存过期了**（超过 cache-control 规定的时间范围），服务端会重新请求，重新返回 cache-control。

2. cache-control 的值
- `max-age`： 设置缓存最大过期时间
- `no-cache`：不用本地缓存，正常到服务端去请求
- no-store：不用本地缓存，也不用服务端做缓存处理，让服务端简单粗暴的直接返回
- private：允许最终用户做缓存
- public：允许中间代理做缓存

3. 关于 Expires（已经被 cache-control 代替）


### 协商缓存
又叫对比缓存。**服务端缓存策略**。不是缓存在服务端。

服务端来判断本地资源和服务端资源是否一样（上次请求之后是否有修改），一致就告诉客户端用本地缓存。

怎么告诉呢？**返回 304，否则返回 200 和最新的资源。**

怎么判断本地资源和服务端资源是否一样？
**资源标识**，有两种：
- **资源的最后修改时间**
  + Response Headers 中 的 Last-Modified
  + 对应 Request Headers 中的 If-Modified-Sincess，值一样 
- **资源的唯一标识（一个字符串，类似于指纹）**
  + Response Headers 中 的 Etag
  + 对应 Request Headers 中的 If-None-Match



1. 协商缓存的流程
<img width="492" alt="协商缓存" src="https://user-images.githubusercontent.com/22387652/90787750-a4741980-e337-11ea-84bc-33f8b8e877c8.png">


1）**初次请求**，如果是可以被缓存的资源（css、js、HTML、img），服务端会返回资源和资源标识（`Last-Modified`），同时把资源也缓存下来。
2）**再次请求**时，Request Headers 中会携带资源标识（`If-Modified-Sincess`），服务器拿到资源标识，判断本地资源是不是服务端最新的资源。
=> 如果是最新的，返回 304，如果不是最新的，返回 最新的资源 和 新的资源标识（`Last-Modified`）。
    + 根据最后修改时间判断：服务端资源的最后修改时间是否和 带来的 If-Modified-Sincess 是否一致，一致，说明服务端资源没有被修改过。
    + 根据 Etag：服务端判断生成的标识字符串是不是一样的
    
2. Last-Modified 和 Etag
可以共存，会优先使用 Etag
Last-Modified 只能精准到秒级，如果资源被重复生成而内容不变，Etag 更精确。


## 刷新操作对缓存的影响（了解）
三种刷新操作：
1）正常操作：输入URL 刷新、跳转链接、前进后退 =》强制缓存、协商缓存有效
2）手动刷新：cmd + R，点击刷新按钮 =》强制缓存失效、协商缓存有效
3）强制刷新：shift + cmd + 2 =》都失效





# 常见面试题
## HTTP的基础知识
### 常见的状态码（重要）
### 报文组成
### 常见的 header（重要）
1. 通用头（General Headers）
  - URL
  - Method
  - Status Code
  - Remote Address: 61.135.169.121:443 //=>主机地址（服务器外网IP地址）
  - Referrer Policy: no-referrer-when-downgrade //=>指定请求是从哪个页面跳转来的，分析用户来源


2. 请求头（Request Headers）
  - `Accept`：浏览器可接收的数据格式，比如 text/html
  - `Accept-Encoding`：浏览器可接收的压缩算法，如 gzip（服务器端将资源压缩变小，浏览器可解压）
  - Accept-Languange：浏览器可接收的语言，如 zh-CN
  - `Connection`：keep-alive 一次 TCP 连接可重复使用
  - `Cookie`：（同域）服务器发送到浏览器并保存在本地的数据，浏览器再次发送请求时会携带上
  - Host：请求的域名
  - `User-Agent`（简称 UA）：标识浏览器信息（哪个浏览器）
  - `Content-type`：发送数据的格式（请求为 POST／PATCH 时会出现），如 application/json
  - `cache-control`

3. 响应头（Response Headers）
  - `Accept-Encoding`：返回数据的压缩算法，如 gzip
  - `Set-Cookie`：服务端返回的用于修改本地的 Cookie
  - `Content-type`：返回数据的格式，如 application/json、image/png
  - `Content-length`：返回数据的大小，多少字节
  - `Date`: Sun, 27 May 2018 01:13:00 GMT //=>服务器端响应内容的时间，和客户端拿到响应内容的真实时间有误差，因为返回到客户端需要时间。GMT 是格林尼治时间
  - `cache-control`

4. 缓存相关的 headers
  - cache-control Expires
  - Last-Modified If-Modified-Sincess
  - Etag If-None-Match

5. 自定义 header（简单的权限验证）

### 请求方式


## GET 与 POST 的区别（重要）
- 第一，传递给服务器信息的方式不一样
GET 基于`URL地址问号传参`、POST 基于`请求主体`
```javascript
//=>GET
xhr.open("GET","/temp/接口?xxx=xx&xx=xx")
//=>POST
xhr.send("xxx=xx&xx=xx");
```

- 第二，GET 不安全，POST 相对安全
GET 基于问号传参把信息传递给服务器的，容易被骇客进行 URL 劫持，POST是基于请求主体传递的，相对来说不好被劫持。
=>所以登录、注册等涉及安全性的交互操作，一般用 POST 请求。

- 第三，GET 通过 URL 传递参数有长度限制，POST 没有限制。
`浏览器对于URL的长度有最大限制`（谷歌8KB、火狐7KB、IE2KB...），GET 请求基于问号传参，拼接URL不要过长，超出部分会被浏览器截断，POST 请求基于主体传递，没有限制。
=> 向服务器发送数据较大用 POST

- 第四，GET 会产生不可控制的缓存，POST 不会
GET请求产生缓存是因为连续多次向相同的地址（并且传递的参数信息也是相同的）发送请求，浏览器会把之前获取的数据从缓存中拿到返回，导致无法获取服务器最新的数据（POST不会）
=>解决：控制缓存的产生，而不是产生了再干掉
```javascript
xhr.open('GET',`/temp/list?lx=1000&_=${Math.random()}`);//=>每一次请求的末尾追加一个随机数，保证每一次请求的地址不完全一致（使用_作为属性名是不想和其它的属性名冲突）
```

- 第五，GET 后退/前进不会重复提交，POST 会重复提交。

## 什么是 Restful API？
一种 API 设计方法：把每个 URL 当作一个唯一的资源（传统的 API 设计：将每个 URL 当作一个功能）

如何设计成一个资源？
- 尽量不用 URL 问号查询参数
```js
// 传统 API 设计：/api/list?pageIndex=2
// Restful API 设计：/api/list/2 （2: 第二页资源的标识）
//=>去掉 URL 参数，写一个完整的 URL，做一个唯一资源的唯一标识
```
- 用 method 表示操作类型
```js
// 传统 API 设计：
  // POST 请求：/api/create-blog
  // PATCH 请求：/api/update-blog?id=100
  // GET 请求：/api/get-blog?id=100
// Restful API 设计：
  // POST 请求：/api/blog
  // PATCH 请求：/api/blog/100
  // GET 请求：/api/blog/100
```


## 描述以下 HTTP 的缓存机制（重要）


## HTTP 协议的主要特点
HTTP 协议基于客户端/服务端（C/S）的架构模型。浏览器作为 HTTP 客户端通过 URL 向 HTTP 服务端即WEB服务器发送所有请求。主要特点有：
- 简单快速
HTTP使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。
每一个URI都是固定的，即统一资源符。要访问这个资源只要输入一个URI。
- 灵活
通过一个 HTTP 协议可以完成不同数据类型的传输。
- `无连接`
限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。
- `无状态`
指协议对于事务处理没有记忆能力。就是对于每次连接并不会保存状态。

## Keep-Alive模式（持久连接）
前提：HTTP1.1版本支持，1.0不支持。
HTTP协议采用“请求-应答”模式。
当我们使用普通模式时，HTTP协议为无连接协议。每一次的请求-应答客户端和服务器都要新建一个连接。服务器处理完客户的请求，并收到客户的应答后，即断开连接。
当我们使用Keep-Alive模式，Keep-Alive使得客户端到服务器端的连接持续有效，当再次对服务器发送请求时，Keep-Alive避免了重新建立连接。

## 管线化
![](http://upload-images.jianshu.io/upload_images/8059334-505ab02364c90cf4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
工作原理：
前提是：在持久连接的情况下完成
持久连接一般是请求一次响应一次，整个连接不中断。管线化是把现在的所有请求打包一次传输过去，服务器也打包一次性的响应回来。

特点：说出前3点就可以
![](http://upload-images.jianshu.io/upload_images/8059334-79298364963ff9fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
