目录

[TOC]

DOM： Document Object Model 文档对象模型

# DOM 本质
1. XML 与 HTML：树型结构
XML：可扩展的（可以描述任何结构的数据）标记性语言（可自定义标签，任意扩展）
HTML：是一种特定的 XML，规定了一些标签的名称，比如，head、body

2. DOM 本质是 一棵树

HTML 本质是文件或一段代码，DOM 是从 HTML 中解析出来的一棵树
DOM 树：当浏览器加载 HTML 页面的时，首先就是 DOM 结构的计算，计算出来的 DOM 结构就是 DOM 树

# node（节点）
## 概念
在 HTML 文档中出现的所有内容都是节点
- 元素节点（HTML标签） 
- 文本节点（文字内容）
在标准浏览器中会把空格/换行等都当做文本节点处理
- 注释节点（注释内容）
- 文档节点（document）

每一个节点都有一些内置属性来区分自己的类型和特征，常见的有：
- nodeType：节点类型
- nodeName：节点名称
- nodeValue：节点值


|  节点类型  | nodeType |nodeName|nodeValue|
| :--------: |  :--------: |:--------:| :--: |
| 元素节点 |     1     | 大写标签名 |  null  |
| 文本节点 | 3        | ’#text'  | 文本内容  |
| 注释节点 | 8        | ’#comment' |  注释内容 |
| 文档节点 | 9        | ’#document' |  null |

## 描述节点之间关系的属性
### parentNode / childNodes / children
- parentNode：获取当前节点的`唯一父亲节点`
- childNodes：获取当前节点的`所有子节点（包含元素或文本等）`（NodeList对象）
- children：获取当前元素的`所有元素子节点`（HTMLCollection）

```js
document.parentNode=>null
document.parentnode=>undefined
```

### previousSibling / nextSibling
- previousSibling：上一个哥哥节点（可能是元素或文本等）
previousElementSibling：上一个哥哥元素节点
不兼容IE6-8
- nextSibling：下一个弟弟节点
nextElementSibling：下一个弟弟元素节点
不兼容IE6-8

### firstChild / lastChild
- firstChild：第一个子节点（可能是元素或文本等）
firstElementChild
- lastChild：最后一个子节点
lastElementChild

```js
someNode.firstChild === someNode.childNodes[0];
someNode.lastChild === someNode.childNodes[someNode.childNodes.length - 1];
```

# DOM 元素的属性 
## 内置的属性
获取到的DOM元素，是一个`对象类型的值`。
包含很多内置的属性：
- id：当前元素的ID值，string
- className：当前元素的类名，string
- style：存储当前元素的所有“行内样式”值，`只能操作行内样式`
- innerHTML：存储当前元素包含的所有内容（包含 HTML标签），`string`
- innerText：存储当前元素包含的所有文本内容（没有HTML标签），`string`
- onclick：元素的一个事件属性，用于给元素绑定点击事件
- onmouseover：鼠标滑过事件
- onmouseout：鼠标离开事件



特殊：a标签的属性
比如：
```
<a href="http://www.baidu.cn/stu/?lx=1&name=AA&sex=man#teacher" id="link"></a>
```
a 标签除了具有以上普通属性，还有自己特有的属性：
- host: 服务器名称和端口号
- hostname: 服务器名称
- port：端口号
- hash: hash值 "#teacher"
- search: 查询字符串 "?lx=1&name=AA&sex=man"
- pathname："/stu/"
- protocol: "http:"


## 自定义属性

三种方法来设置元素对象的==自定义属性==：

1. 第一种：**Property** 基于对象的键值对操作方式，修改元素对象的堆内存空间来完成
```js
//=>把元素对象当做一个普通的对象，在堆内存中新增一个自定义属性
oBox.className = 'red';
oBox.style.width = '100px';
// <div id="oBox" class="red" style="width: 100px"></div>
delete oBox.myColor
```

2. 第二种：**Attribute** 是直接修改页面中 HTML 标签的结构来完成（可以在结构上呈现出来）
```js
oBox.setAttribute('myColor','red'); //设置
oBox.setAttribute('style','font-size: 50px'); //设置
// <div id="oBox" myColor="red" style="font-size: 50px"></div>
oBox.getAttribute('myColor'); //获取
oBox.removeAttribute('myColor'); //移除
```
**Property 是修改 JS 对象，不会体现到 HTML 结构中，Attribute 是直接修改 HTML 结构，操作 DOM**。两种方法是两个系统，互不影响，**都会引起DOM 重新渲染**。推荐使用 Property，操作 DOM 很消耗性能


3. 第三种：自定义属性 data-xxx
	+ 设置：在某一个元素上，添加属性data-xxx=[值]，会在`结构上显示出来`。
	+ 获取：
        方法1：`[元素对象].dataset.xxx`
        方法2：`[元素对象].getAttribute('data-xxx')`
```js
// HTML 
<div id="myId" data-myColor="red"></div>  //设置
// JS
var myColor = document.getElementById("myId").dataset.myColor;// 获取
// 也可以：[元素对象].getAttribute("data-myColor");
```

# DOM 节点操作
## 获取 DOM 元素
通过“上下文[context]”来限定获取元素的范围，可以自己指定。可以在文档对象document下直接获取。


### document.documentElement
html元素还可以用以下方式来获取：
document.firstChild
document.childNodes[0]
### document.body
获取body元素
需求：获取浏览器一屏的宽度和高度（兼容所有的浏览器）
```
document.documentElement.clientWidth || documnet.body.clientWidth
document.documentElement.clientHeight || documnet.body.clientHeight
```


### document.head
获取head元素对象


### document.getElementById()
通过ID来获取该元素
返回一个`对象类型的值`（包含很多内置的属性）。

```
var oBox = document.getElementById('box');
console.log(typeof oBox);//"object"
```
注意：
1）`getElementById()的上下文只能是document`，因为一个页面中的ID是不能重复的，浏览器规定在整个文档中可以获取这个唯一的ID
2）如果`页面中的ID重复`了，浏览器并不会报错，getElementById()只能获取到`第一个元素`，后面获取不到。
3）`IE6/7`低版本浏览器会把`表单元素（input...）的name属性当做ID来用`。建议使用表单元素时，不要让name和ID的值有冲突。



### [context].querySelector()
基于CSS选择器（'#box'）来获取到指定的元素对象，`即时选择器匹配了多个，我们只获取一个`。

注意：选择器可以这样写 ‘.box' 或 '.box>div'


## 获取元素集合
>类数组对象（HTMLCollection）：
返回的是一个`元素集合`，结构和数组非常相似（数字作为索引，lengh代表长度），我们称之为`类数组对象（HTMLCollection）`。
这里需要注意的是：
- 类数组对象[index]，可以通过索引来获取集合中的某一个元素
- 类数组对象.length，获取集合长度
- `集合中的每一项都是一个元素对象`（包含很多内置属性，比如className）
- `不能直接使用数组中的方法`


```js
var oBox = document.getElementById('box');
var oList = oBox.getElementsByTagName('li');
console.log(oList);
```



### [context].getElementsByTagName()
通过元素的标签名来获取，返回的是一个（`HTMLCollection对象`）
- `document.getElementByTagName('*')`可以通过通配符来`获取页面中的所有元素`
- 会把当前上下文中的`子子孙孙（所有后代）`层级的标签都获取到


### [context].getElementsByClassName()
基于元素的样式类名（class='xxx'）来获取，返回的是一个（`HTMLCollection对象`）
- 空格拼接的类名也会获取到
- 在IE6-8下不兼容

==解决兼容性==：
```js
Node.prototype.queryElementsByClassName = function queryElementsByClassName() {
    if (arguments.length === 0) return [];
    var strClass = arguments[0],
        nodeList = utils.toArray(this.getElementsByTagName('*'));
    strClass = strClass.replace(/^ +| +$/g, '').split(/ +/);
    for (var i = 0; i < strClass.length; i++) {
        var reg = new RegExp('(^| +)' + strClass[i] + '( +|$)');
        for (var k = 0; k < nodeList.length; k++) {
            if (!reg.test(nodeList[k].className)) {
                nodeList.splice(k, 1);
                k--;
            }
        }
    }
    return nodeList;
};
```



### document.getElementsByName()
基于元素的name属性来获取一组`节点集合（NodeList）`。
这里需要注意的是
1）getElementsByName()的`上下文只能是document`
2）在IE9及以下版本浏览器中，只对表单元素的name属性起作用（一般项目中只会给表单元素设置name，非表单元素一般不设置name属性）
name在表单中主要是给表单元素分组的。



### [context].querySelectorAll()
在querySelector()基础上，选择器匹配到的所有元素，返回一个`节点集合（NodeList对象）`。
1）不兼容IE6-8
2）不考虑兼容的情况下，我们可以用ById或其他方法，尽量不使用这两个方法，因为性能消耗较大。

==获取页面中所有ID为"HAHA"（兼容所有浏览器）==
//->不能使用querySelectorAll()
1.获取页面中所有的HTML元素，
2.遍历这些元素，筛选ID为"HAHA"
```js
function queryAllById(id){
	let nodelist = document.getElementByTagName('*'),
		ary=[];
	for (let i = 0; i < nodeList.length; i++) {
	    let item = nodeList[i];
	    item.id === id ? ary.push(item) : null;
	}
	return ary;
}
```
>console.log(HAHA);//=>`在JS中，可以直接把ID拿过来当变量来用`，如果ID重复，获取的结果就是一个集合，包含所有ID项，如果不重复就是一个元素对象（类似于ById的结果）




## 增删改
### document.createElement
创建一个元素节点（元素对象）
语法：document.createElement([标签名])
注意：只是创建了，还需要插入到页面中

### appendChild / insertBefore
把创建的元素插入到页面中，主要有两种方法：
+ appendChild
把一个元素对象插入到指定容器中的末尾
语法：[container].appendChild.([newEle])


+ insertBefore
把一个元素对象插入到指定容器中某一个元素标签之前
语法：[container].insertBefore.([newEle], [oldEle])

注意：[container].appendChild.([已有节点]) 是将已有节点移动到 当前容器， 移动 ！！！

### replaceChild / removeChild
- replaceChild
在指定容器中用一个新节点替换某一个元素
语法：[container].replaceChild.([newEle], [someEle])

- removeChild
在指定容器中删除某一个元素
语法：[container].removeChild.([curEle])
返回：被删除的节点
注意：removeChild 删除的节点不在DOM树中，但仍在内存中
彻底删除对象，可给返回值赋null

以上四个方法，首先需要获取一个父节点，然后基于这个父容器来操作它的子节点。

### set / get / removeAttribute
设置、获取、删除 当前元素的某一个自定义属性


### cloneNode
把某一个节点进行克隆
[curEle].cloneNode()：==浅克隆==，只克隆当前的标签
[curEle].cloneNode( true )：==深克隆==，当前的标签和里边的内容都克隆



# DOM 性能
避免频繁的 DOM 操作，操作 DOM 是非常消耗性能的
- 对 DOM 做查询缓存
- 将频繁操作改为一次性操作（打包一次性插入）

## DOM 做查询缓存
```js
// 不缓存 DOM 查询结果
for (let i = 0; i < document.getElementsByTagName('p'); i++) {
    // 每次循环都会计算 length，频繁进行 DOM 查询
}

// 缓存 DOM 查询结果
const pList = document.getElementsByTagName('p');
const length = pList.length;
for (let i = 0; i < length; i++) {
    // 缓存 length，只进行一次 DOM 查询
}
```

## 将频繁操作改为一次性操作
当`需要动态向页面追加元素`时，基于文档碎片或者把需要增加的所有元素拼接成字符串
- 基于`文档碎片`
文档碎片是在虚拟内存中开辟的一个容器。每当创建一个li，我们首先把它放到文档碎片中，（千万不要放到页面中，避免回流），当我们需要的元素都创建完，把文档碎片一次性打包到页面中。
```js
const listNode = document.getElementById('list');
const frag = document.createDocumentFragment();//=>1.创建文档碎片容器，此时还没有插入到 DOM 树中
for (let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  
  li.innerHTML = `List item + ${i}`;
	frag.appendChild(li);//=>2.每一次把创建的 li 先插入到文档碎片中
}
listNode.appendChild(frag);//=>把文档中的碎片统一插入到 DOM 树中
frag = null;//=>清空 frag
```

# 结束
***重学 JS 系列*** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、单线程和异步、JS Web API、渲染和优化几个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/chenchen0224/webfrontend-space)

