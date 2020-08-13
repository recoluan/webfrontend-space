目录

[TOC]

# 服务器端渲染模型 && 客户端渲染模型
1. **服务器端渲染模型（不基于AJAX）**
服务器端把数据和源代码进行拼接，客户端只负责展示
=> **非前后端分离的项目**：
A：有利于 SEO 优化（页面源代码可以看到绑定的内容，有利于引擎收录）
B：只能实现全局刷新（**页面整体刷新**）
C：请求页面的后缀名一般不是.html，而是.php/.jsp/.asp


![1527050492575](https://user-images.githubusercontent.com/22387652/90104383-c5a49b00-dd76-11ea-978b-1c07be10f803.png)


<img width="444" alt="1" src="https://user-images.githubusercontent.com/22387652/90107042-d820d380-dd7a-11ea-9f72-90c497db573e.png">

如图，用户输入完用户名，需要发送一个请求验证该用户是否存在，服务器端收到请求后，将提示是否存在的结果重新拼接返回给客户端，客户端需要重新渲染最新的内容。
但页面要更新，只能重新刷新页面，重新请求


2. **客户端渲染模型（基于AJAX）**
服务器端只负责将数据返回，客户端自己将数据进行字符串拼接
=> **前后端分离项目**：
A：不利于SEO优化（源代码中看不到动态增加的数据）
B：实现**局部刷新**

![1527052346528](https://user-images.githubusercontent.com/22387652/90104394-ca694f00-dd76-11ea-892a-bd95a71e3ac9.png)


很多大网站（例如，淘宝，京东）的首屏数据是基于服务器端渲染的，客户端获取数据后直接呈现，增加页面第一次打开速度，其它屏是基于AJAX获取数据，在客户端进行数据拼接渲染的。
这种是**半分离项目**。


# 原生 AJAX
## 什么是 AJAX
`Asynchronous JavaScript and XML`
- Asynchronous
这里的异步不是我们理解的同步异步编程，而是泛指`局部刷新`
- XML
XML是一种可扩展的标记语言（可以把HTML理解为XML的一种）。
可扩展的，就是可自己扩展一些语义标签。

## 如何创建 AJAX 实例
原生 JS 实现 AJAX，主要考察 XMLHttpRequest 对象的工作流程：

1. 第一步：创建一个 xhr 对象
IE5、IE6 用的是 ActiveXObject 对象

2. 第二步：启动一个请求以备发送
`open([Http Method], [URL], [Async] , [user-name], [user-pass])`
  + Http Method：请求方式
  + URL 向服务器发送请求的 API 接口地址
  + Async 设置是否异步，true 为异步，false 为同步

3. 第三步：添加 onreadystatechange 事件监听（`AJAX状态改变`事件）
	+ AJAX 状态（xhr.readyState）：
  `0`：`unsent` =>刚开始创建xhr，还没有发送
  `1`：`opened` =>已经执行了open这个操作
  `2`：`headers_received` =>已经发送AJAX请求（AJAX任务开始），响应头信息已经被客户端接收了（响应头中包含了：服务器的时间、返回的HTTP状态码...）
  `3`：`loading` =>响应主体内容正在返回
  `4`：`done` =>响应主体内容已经被客户端全部接收，可以在浏览器端使用。

4. 第四步：发送请求。
从这步开始，`当前AJAX任务开始`，如果 AJAX 是同步的，后续代码不会执行，要等到 AJAX 状态成功后再执行，反之异步不会。
  `xhr.send([请求主体内容]);`
  + 没有请求主体，为 null；
  + 有请求主体，一般是字符串，可能是 JSON 格式、XML 格式、普通字符串格式的。
  =>项目中常用的是`URL-encode格式`的字符串（"id=1000&lx=2000"）

栗子：
```javascript
const xhr = new XMLHttpRequest();//=>0
xhr.open('GET','/temp/list', true);//=>1
xhr.onreadystatechange = () =>{ //=>DOM事件绑定是异步的
   if(xhr.readyState===2){console.log(1);}
   if(xhr.readyState===4){console.log(2);}
};
xhr.send(); //=>当前AJAX任务开始，异步
console.log(3);
//=>3 1 2
```


## xhr 的属性和方法
[属性]
- xhr.response：响应主体内容
- xhr.responseText：响应主体的内容是`字符串`（JSON或XML格式字符串）
- xhr.responseXML：响应主体的内容是XML文档

- xhr.status：返回的HTTP状态码
- xhr.statusText：状态码的描述

- xhr.timeout：设置请求超时的时间
- xhr.withCredentials：是否允许跨域（false）

```javascript
//open
//xhr.timeout = 1000;//=>请求超时会自动中断
//xhr.ontimeout = () => {
//	console.log('请求超时');
//}
xhr.onabort = () => {
	console.log('请求被强制中断');
}
//onreadystatechange
setTimeout(()=>{
	xhr.abort();
},1000);
```

[方法]
- xhr.open()：打开URL请求
- xhr.send()：发送AJAX请求
- xhr.abort()：强制中断AJAX请求（当前建立连接的HTTP连接通道到干掉了）
- xhr.setRequestHeader([key], [value])：设置请求头
（不能出现中文，必须在`open之后`才可以设置成功）
编码：`encodeURIComponent`
解码：`decodeURIComponent`
- xhr.getAllResponseHeaders()：获取所有的响应头信息
- xhr.getResponseHeader([key]) ：获取key对应的响应头信息
- xhr.overrideMimeType()：重写MIME类型

```javascript
    xhr.onreadystatechange = () => {
        if (!/^(2|3)\d{2}$/.test(xhr.status)) return; //=>证明服务器已经返回内容了（HTTP请求成功）
        if (xhr.readyState === 2) {
            //=>响应头信息已经回来了
            let time = xhr.getResponseHeader('date');
            console.log(time, new Date(time));
        }
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    };
```
- `xhr.getResponseHeader('date')` ：获取响应头中的服务器时间。
`AJAX状态为2`时获取，获取的是格林尼治时间（`字符串`，中国标准时间比它多8小时）。
- new Date()：获取当前客户端时间（`对象`）
new Data(时间字符串)：把指定的时间字符串格式化为标准的北京时间（Data类的实例）
时间字符串的格式：常用的有，"xxxx-xx-xx xx:xx:xx"或"xxxx/xx/xx"  

从服务器端获取时间会产生一个问题：服务器返回数据需要时间，所以客户端拿到返回的服务器时间和真实的时间是有误差的。
//=>那么如何减小时间误差？
1）在 AJAX 为2，就从响应头中获取时间，而不是等到状态变为 4  =>请求方式设置为 head，只获取响应头，不需要响应主体内容


## AJAX 中的同步异步
1. 异步
```javascript
const xhr=new XMLHttpRequest(); //=>0
xhr.open('GET','/temp/list', true); //=>1
xhr.send(); //=>当前 AJAX 任务开始，异步
xhr.onreadystatechange = () => { //=>DOM事件绑定是异步的
   if(xhr.readyState===2){console.log(1);}
   if(xhr.readyState===4){console.log(2);}
};
console.log(3);
//=>3 1 2
```

2. 同步
AJAX 同步的弊端：
1）阻塞下边同步代码的执行
2）阻碍自己状态的监听。只有在状态变为 4 时，才触发 onreadystatechange 事件绑定的方法。
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET','/temp/list', false);
xhr.onreadystatechange = () => {
   if(xhr.readyState===2){console.log(1);}//=>监听到了状态改变为 2，但主任务队列 AJAX 任务没有完成，被占着，没有执行
   if(xhr.readyState===4){console.log(2);}
};
xhr.send();//=>任务开始（同步：只要当前 AJAX 任务完成(readyState 变为 4)，才可以继续做别的事情）
console.log(3);
//=>2 3
```

==AJAX 任务执行的一个特殊性：==
当 AJAX 任务是同步任务时，AJAX 完成会`优先执行自己的 readystatechange 事件（虽然这个事件在等待任务队列）`，然后才执行后边的同步代码。例如，上边的栗子输出的是 2 3，而不是 3 2。


```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET','/temp/list', false);
xhr.send(); //=>当前 AJAX 任务开始，同步（当 readyState 变为 4 时，还没有绑定状态的监听事件）
xhr.onreadystatechange = () => {
   if(xhr.readyState===2){console.log(1);}
   if(xhr.readyState===4){console.log(2);}
};
console.log(3);
//=>3
```

# axios 的 AJAX
axios 是一个基于 Promise 管理的 AJAX 库。
axios 只是一个`普通的函数`，在这个`函数上`（而不是它的原型上）定义了很多方法，准确的来说，axios 并不是一个类。

## 提供了请求对应的方法
提供了对应请求方式的方法（例如：get/post/head/delete/put/options...）
1. `axios.get([url], [config]);`
get 请求中，会把`params中的键值对`拼接成 URLEncode 格式字符串，然后以问号传参的方式，传递给服务器，类似于 JQ-AJAX 中的 data
    ```js
    axios.get('url', {
        params: {
            name: 'chen',
            age: 9
        }
    });
    ```

2. `axios.post([url], [data], [config]);`
post 请求中，配置项传递的内容都相当于基于请求主体传递给服务器，内容格式是`RAW`（`JSON 格式的字符串`），不是 URLEncode 格式
    ```js
    axios.post('url', {
        name: 'chen',
        age: 9
    });
    ```

## 返回的结果都是 Promise 实例
基于 get 或 post 发请求，返回的结果都是 **Promise实例**
1. 第一个 then 接收到的参数是一个`对象`，包含以下属性：
    + `data`：响应主体内容
    + `config`：配置项
    + `headers`：响应头信息
    content-type:"application/json; charset=utf-8"
    + `request`：创建的 AJAX 实例
    + status：状态码
    + statusText：状态码的描述

    ```javascript
    axios.get('url', {
        params: {
            lx: 12
        }
    }).then(result => {
        //console.log(result);//=>获取的结果是一个对象
        const { data } = result;
    }).catch(msg => {
        console.log(msg);//=>请求失败的原因
    });
    ```
2. 基于 axios 解决回调地狱：
先请求A，A完成做什么，然后请求B，B完成做什么。
    ```javascript
    axios.get('urlA', {
        params: {
            lx: 12
        }
    }).then(result => {
        const { data } = result;
        //...
        return axios.post('urlB');
    }).then(result => {
        const { data } = result;//=>result 是 B 成功后的结果
        
        console.log(data);
    });
    ```



3. 一次并发多个请求：`axios.all([ary])`
适用于多个请求都完成后做什么。
执行 then 方法，接收到的参数是一个`数组`，分别存放每一个请求返回的结果。
```javascript
    const sendAry = [
        axios.get('urlA'),
        axios.get('urlB'),
        axios.post('urlC')
    ];
    //=>三个请求都完成才做一些事情（可以基于ALL实现）
    axios.all(sendAry).then(result => {
        console.log(result);//=>是一个数组，分别存储每一个请求的结果
        const [resA, resB, resC] = result;
        //axios.spread((resA, resB, resC) => {}
    });
```
`axios.spread()`：请求都完成触发这个函数
原理是JS中的柯理化函数思想
```javascript
    module.exports = function spread(callback) {
        return function wrap(arr) {
            return callback.apply(null, arr);
        };
    };
    axios.all(sendAry).then(axios.spread((resA, resB, resC) => {
        //=>RES-A/-B/-C分别代表三次请求的结果
    }));
```

## 初始化常用的一些配置项
全局配置：
1. 基础URL：`后台服务器URL的统一前缀统一提取`
```js
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5b041/temp';
```

2. 设置拦截器
响应拦截器：分别在响应成功和失败的时候做一些拦截处理
```javascript
axios.interceptors.response.use(
  (result) => {
    //=>成功之前拦截
    return result.data;//=>传给下边 then 方法的 result
  }, 
  (error) => {
    //=>失败之前拦截
    return Promise.reject(error);
  }
);
//=>使用
axios.get('/list', {
    params: {
        lx: 12
    }
}).then(result => {//=>拦截这个方法的执行
    console.log(result);
});
``` 
请求拦截器：
```js
axios.interceptors.request.use(
  (config) => {
    if (config.risk) {
      // 处理 config.url
    }

    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);
```

3. axios.defaults.withCredentials = true;

4. 定义哪些状态码是成功
```js
axios.defaults.validateStatus = (status) => {
    //=>自定义成功失败规则：RESOLVE / REJECT（默认规则：状态码以2开头算作成功）
    return /^(2|3)\d{2}$/.test(status);
};
```
5. 定义`请求头`
注意：结果result中的headers是响应头的信息。
6. 定义请求主体
7. 定义请求超时时间 
```js
//=>一般不定义为公共的
axios.defaults.timeout = 3000;
axios.defaults.headers={
    name:'chen'
};
axios.defaults.params={};//=>GET传参
axios.defaults.data={};//=>POST传参
``` 

使用： 一般全局配置常用基础URL、拦截器、请求主体、状态码这几个。
注意：`在请求中的配置要高于全局默认配置的`。   
```js
//=>使用
axios.get('/list', {
    params: {
        lx: 12
    },
    headers: {xxx: 'xxx'}//=>作为请求头传递进去
}).then(result => {
    console.log(result);
    //=>result.headers：服务器返回的响应头信息
});

//=>POST：三个参数 axios.post(url[,data][,config])
axios.post('/add', {
    lx: 12,
    sex: 1
}, {
    headers: {xxx: 'xxx'}//=>作为请求头传递进去
}).then(result => {
    console.log(result);
});
```

# JQ中的AJAX
1. 两种写法：\$.ajax([URL],[options]) 或 $.ajax([options])
在options中有一个url字段代表请求的URL地址
`$.get` /`$.post` / `$.getJSON` / `$.getScript` 这些方法都是基于\$.ajax构建出来的快捷方法，项目中最常使用的还是\$.ajax

2. options的配置项：
- `url`：请求的API接口地址
- `method`：请求的方式     
- `data`：传递给服务器的数据
GET请求是基于问号传参传递过去的，POST请求是基于请求主体传递过去的 。
data的值可以是对象也可以是字符串：中文会自动编码
		+ 对象类型（用的最多）：JQ会把`对象转换`为 xxx=xxx&xxx=xxx 的模式（`application/x-www-form-urlencoded`）
		+ 查询字符串：写什么就传递什么
     
- `dataType`：预设置获取结果的数据格式
支持的格式：json、jsonp、xml、html、script、text
（服务器返回给客户端的响应主体中的内容一般都是字符串[JSON格式居多]）
注意：设置返回结果为json格式 ，`并不会影响服务器返回的结果`，只是JQ内部对返回的结果进行了`二次处理`，最终转为JSON格式的对象给我们。 
     
- `async`：设置同步或者异步（默认true异步）
- `cache`：设置get请求下是否建立缓存，（默认true->建立缓存，false不建立缓存）。
当设置为false时，并且设置当前请求是get请求，JQ会在请求的URL地址末尾追加随机数（`时间戳`：`+( new Date() )`）。

- `success`：回调函数，当AJAX请求成功执行的回调函数，会把响应主体中的内容（可能二次处理了）传递给回调函数。
回调函数的参数：
           result：服务器获取的结果
           textStatus：状态描述
           jqXHR：JQ封装的XHR，和原生的不太一样
      
- `error`：请求失败后执行的回调函数

3. 局限性
无法解决回调地狱的问题。如果发多次AJAX请求，只能在success的回调中再次发请求，这样嵌套，可维护性很差。用的很少，现在大部分项目都是基于Promise对AJAX进行管控。






# 常见面试题
## AJAX 的工作流程
手写 原生 AJAX
