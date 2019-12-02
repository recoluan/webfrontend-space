今天我们将深度讲解 bind 的原理及应用。

# bind
语法：
> fn.bind(thisArg[, arg1[, arg2[, ...]]])

bind 与 call、apply 的唯一的区别在于：
- 前者`返回一个新函数，并且这个新函数没有立即执行`
- 后两者`直接执行了原函数`

```js
var obj = {
    value: 1
};

function fn() {
    console.log(this.value);
}

// call
fn.call(obj); // 1

// bind
var bindFn = fn.bind(obj); 

bindFn(); // 1
```


# 内部原理
> fn.bind(thisArg[, arg1[, arg2[, ...]]])

我们一起分解一下执行步骤：
- fn.bind：当前实例（函数 fn）通过原型链的查找机制，找到 Function.prototype 上的 bind 方法
- 把找到的 bind 方法执行，返回一个匿名函数（`每一次返回的函数是不一样的`，对应不同的堆内存）
=> **当匿名函数执行时，内部处理了一些事情**：
	+ 首先把要`操作的函数（fn）中的 this` 变为`bind 方法第一个实参值`
	+ 把要`操作的函数（fn）执行`，并且把匿名函数传递的参数和 bind 第二个以后传递的实参传给函数

伪代码如下：
```js
let fn = function fn(x, y) {
    console.log(this, x, y);
};
let obj = {name: 'haha'};
Function.prototype.myBind = function myBind(context, ...arg) {
    //=>context：执行的上下文
    //=>arg：需要传递给fn的实参
    let self = this;//=>只是为了保证匿名函数中的this是fn

    return function anonymous(...innerArg) {
        //=>innerArg：可能有值，可能没有值
        //=>最终的目的是：让 Fn 执行，把 this 改成 obj，把参数传递给 fn 即可
        self.apply(context, arg.concat(innerArg));
    }
};

let bindFn = fn.myBind(obj, 10);

//执行一次 bind，形成一个闭包，返回一个新的匿名函数
bindFn('anony');
```



# 应用
## 柯里化（curry）
思想：
- 执行一个方法，传递一些参数进去，首先形成一个闭包，把传递的这些值存储起来（没有立即使用，属于预先存储一下）
- `返回一个小函数`给外面
- 当执行返回的小函数时，把之前存储的信息拿过来使用
```js
function fn() {
    return function () {

    }
}
var f = fn();
```

我们知道，使用 bind() 会返回一个新的函数，那么如何让这个新的函数携带上层函数传过来的参数呢？就是将 bind() 的第一个参数设置为 null，其余参数传给这个新的函数，这种技术我们称之为柯里化。
```js
function foo(a, b) {
    console.log(a, b);
}
var func = foo.bind(null, 3)
func(4);// 3 4
```


# 结束
**重学 JS 系列** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、异步和性能四个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/cxh0224/blog)
