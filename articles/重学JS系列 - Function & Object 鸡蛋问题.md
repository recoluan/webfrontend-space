# 写在前面
我们在控制台打印以下代码：
```js
Object instanceof Function // true
Function instanceof Object // true
```
发现都是 true！

Object 本身是构造函数，继承了 Function.prototype; Function 也是对象，继承了 Object.prototype。


到底是先有 Object，还是先有 Function，这里就有一个***鸡和蛋***的问题。

本篇将通过学习 Object.prototype、Function.prototype、Object 、Function 之间的关系，搞清楚为什么会出现鸡蛋问题。


# Object.prototype
> Object.prototype 其内部 [[Class]] 属性是 Object，其 \_\_proto_\_ 属性是 null。Object.prototype 是原型链的顶端，null 表示再往上没有原型了。

代码证明如下：
```js
Object.prototype.__proto__ === null; // true
Object.prototype.toString(Object.prototype); // [object Object]
```

如图所示：
![Object prototype](https://user-images.githubusercontent.com/22387652/62867555-1dfd2300-bd46-11e9-921d-93b444438441.png)



# Function.prototype
> Function.prototype 其内部 [[Class]] 属性是 Object，其 \_\_proto_\_ 属性是 Object.prototype。

代码证明如下：
```js
Function.prototype.__proto__ = Object.prototype; // true
Object.prototype.toString(Function.prototype); // [object Object] 
```
原型链上的关系如图所示：
![Function prototype](https://user-images.githubusercontent.com/22387652/62867570-281f2180-bd46-11e9-9882-d873e584fa8e.png)


> Function.prototype 不仅是一个对象，还是一个`匿名函数`，但执行没有任何操作。

在控制台打印：
```js
console.log(Function.prototype); //=> ƒ () { [native code] }
console.dir(Function.prototype); //=> ƒ anonymous() 
```
如图所示：
![dir](https://user-images.githubusercontent.com/22387652/62867586-2fdec600-bd46-11e9-8c67-913b935f4f59.png)




# Object
> Object 作为构造函数，其 \_\_proto_\_ 属性值指向 Function.prototype。

即：
```js
Object.__proto__ === Function.prototype; // true
```
![Object](https://user-images.githubusercontent.com/22387652/62913693-bbe10400-bdbf-11e9-9fcb-92076170e768.png)


图中还有几点要说明：
1. Object 的 prototype 属性指向 Object.prototype，Object.prototype 具有 constructor 属性，指回 Object。
```js
Object.prototype.constructor === Object; // true
```
2. 使用 new Object() 创建新对象时，这个新对象的 \_\_proto_\_  属性指向 Object.prototype。
3. 使用 任意一个声明式函数 function f(){} 创建的对象，其 \_\_proto_\_ 值是 Function.prototype。
```js
function f(){
  return 2;
}
// 原型链: f ---> Function.prototype ---> Object.prototype ---> null
```


# Function
> Function 构造函数是一个函数对象，其 [[Class]] 属性是 Function，其 \_\_proto_\_ 属性指向了 Function.prototype，其 prototype 属性指向 Function.prototype。

即：
```js
Function.__proto__ === Function.prototype; // true
```
如图所示：
![Function](https://user-images.githubusercontent.com/22387652/62913648-889e7500-bdbf-11e9-8ad4-e27320702007.png)


有两点需要注意一下：
- Function 的 prototype 属性指向 Function.prototype：这里 Function 是作为一个**构造函数**
- Function 的 __proto__ 属性指向 Function.prototype：这里 Function 是作为一个**对象**

> 这里留下一个思考问题：
> `Function 对象是 Function 的实例吗？？？`

这个有支持的，有反对的，众说纷纭，自行查阅。



# 鸡蛋问题
到这里，为什么会有 Function 和 Object 的鸡蛋问题就很清楚了：
> 主要就是由  `Function.__proto__ === Function.prototype`引起的，导致在原型链上形成了一个回路。

代码证明如下：
```js
Object.__proto__=== Function.prototype; // true
Function.__proto__.__proto__=== Object.prototype; // true
```

如图所示：
![Function_Object](https://user-images.githubusercontent.com/22387652/62913614-67d61f80-bdbf-11e9-987f-d14fe3e9fee2.png)





看了很多文章，观点一致以为：
> 先有 Object.prototype（原型链顶端），Function.prototype 继承 Object.prototype 而产生，最后，Function 和 Object 和其它构造函数继承 Function.prototype 而产生。
=> Object.prototype 是鸡，Object 和 Function 都是蛋。

那么问题又来了：
> 如果说先有 Object.prototype，那 Object 又是哪里来的呢？


其实这个问题和鸡生蛋，蛋生鸡的关系一样，说不清，道不明。哎呀！还是道行尚浅，功力不够呀。



# 参考
- [从探究Function.__proto__===Function.prototype过程中的一些收获](https://github.com/jawil/blog/issues/13)
- [【进阶5-3期】深入探究 Function & Object 鸡蛋问题](https://github.com/yygmind/blog/issues/35)



# 结束
**重学 JS 系列** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、异步和性能四个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/cxh0224/blog)










