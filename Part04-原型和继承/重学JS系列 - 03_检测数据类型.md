# 写在前面
日常开发中，我们经常会遇到判断数据类型的需求，简单的有判断数字还是字符串，进阶一点的有判断数组还是对象等等。

JS 用来检测数据类型的方式有：
- typeof
- instanceof
- constructor
- Object.prototype.toString.call()


# typeof
>- 语法：typeof [value] 
>- 返回值：使用 typeof 检测出来的结果是一个`字符串`，比如："number"/"string"/"boolean"/"undefined"/"object"/"function"，`小写`

typeof 的 BUG：
```js
typeof null =>"object"
```
局限性：
typeof 检测数组/正则/对象，最后返回的都是 "object"，也就是基于这种方式`无法细分对象的类型`。

面试题：
```js
typeof typeof typeof [] 
//=>typeof "object"
//=>"string"
```


# instanceof
检测某一个`对象实例是否隶属于这个类`，这个类的原型对象只要出现在它的 __proto__ 线上就返回 true。
>语法：obj instanceof constructor

原理：基于原型链进行检测，只要在实例的原型链上有这个类，就返回 true。

```js
1 instanceof Number  //=>false
[] instanceof Array  //=>true
Array instanceof Function //=>true
[] instanceof Function //=>false，[]和Function属于两条不同的原型链上
```
局限性：
无法检测基本类型值
```js
let num1 = 12,
    num2 = new Number(12);
typeof num1;//=>'number'
typeof num2;//=>'object'
num1 instanceof Number;//=>false
num2 instanceof Number;//=>true
```

# constructor
所有对象都会从它的原型上继承一个 constructor 属性
```js
{}.constructor === Object  //=>true
[].constructor === Array  //=>true
```
局限性：原型对象必须是默认的，一旦被重写就没有 constructor 属性了


# Object.prototype.toString.call([value])
> Object.prototype 上的 toString 方法执行，会返回`当前值的内部类型`，格式：`"[object 所属的类型]"`。

我们要检测谁，就用 call 借用 Object.prototype.toString 方法，把 this 变为需要检测的值。返回一个由 "[object " 和 class 和 "]" 组成的字符串，而 [[class]] 是要判断的值的内部属性。


可以识别至少12种：
```js
// 以下是11种：基本数据类型和引用数据类型
Object.prototype.toString.call(undefined);// [object Undefined]
Object.prototype.toString.call(null);// [object Null]
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

//内置的对象
Object.prototype.toString.call(Math); // [object Math]
Object.prototype.toString.call(JSON); // [object JSON]
Object.prototype.toString.call(arguments); // [object Arguments]
//DOM
Object.prototype.toString.call(document); // [object HTMLDocument]

```




# 参考
- 《JavaScript高级程序设计（第3版）》
- 《你不知道的JavaScript（上卷）》



# 结束
***重学 JS 系列*** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、异步和性能四个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/cxh0224/blog)

