目录

[TOC]

# 写在前面

在[《重学 JS 系列 - 理解执行上下文》](https://github.com/cxh0224/blog/issues/12)中讲到：

对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

this 的指向，也就是在函数被调用时，它被绑定了哪个对象上？这是我们今天要探讨的。==???==

# 定义

this 是执行上下文的一个属性，它的值是一个对象。

```js
activeExecutionContext = {
  VO: {...},
  this: thisValue
};
```

<!-- this 的值（指向哪个对象）在上下文**创建阶段**就确定了，并且**在代码执行阶段不能被改变**。 -->

# 全局环境中的 this

> 全局环境中的 this 始终是 Global 全局对象自身。

```js
var a = 10;
console.log(this.a); // 10
console.log(window.a); // 10  this.a === global.window.a === global.a
```

# 函数环境中的 this

函数环境中的 this，复杂的多。

this 是由激活上下文代码的调用者（caller）决定的，即调用函数的父级上下文。

> this 机制只关注函数在哪里调用。它指向谁是在函数运行时确定的，而不是代码书写时确定的！！！

接下来，我们根据函数的调用分五种情况来解析 this。

## 作为普通函数被调用

作为普通函数被调用，也就是不带任何修饰参数进行调用，那么
**_this 就默认指向 window_**。

我们来看一个栗子。

```js
var a = 'global';
function foo() {
  console.log(this.a);
}
foo(); // "global"
```

> 在严格模式下，this 会默认绑定到 undefined。

```js
function foo() {
  'use strict';
  console.log(this.a);
}
var a = 2;
foo(); // TypeError: this is undefined
```

## 作为对象的方法被调用

### this 指向当前对象

函数作为对象的一个属性，并且 **_以对象的属性形式被调用时，this 就指向当前对象_**。

```js
var a = 'global';
var obj = {
  a: 2,
  foo: function () {
    console.log(this.a);
  },
};
obj.foo(); // 2
```

在上边的这个栗子中，函数 foo() 被调用时前面加上了对 obj 的引用，将 this 绑定到了 obj。

### 例外情况

我们知道，函数名不加()只是一个指向该函数的指针，是存储在栈内存中的一个值。

1. 如果将一个函数指针**以值的形式**进行传递，会发生什么呢？
   > this 会丢失绑定的对象 ，默认指向 window 或 undefined。

我们来看一个栗子。

```js
var a = 'global';
var obj = {
  a: 2,
  foo: function () {
    console.log(this.a);
  },
};
var bar = obj.foo; //函数别名
bar(); // "global"
```

以上代码将 obj.foo 赋给 bar，bar 保存的是一个对 foo 函数本身的引用，此时，调用 bar() 函数其实就是在全局作用域中调用的 foo，因此，this 指向 window。

看到这，你是不是觉得 this 很简单？那你就大错特错了，this 这么有魔力的对象，其实是很复杂的，，，

栗子再进阶。Let's go !!!

2. 如果将 **obj.foo 作为一个函数的参数** 被传入到了另一个函数中执行，也就是 **作为回调函数** 被传递，又会发生什么?
   > 回调函数会丢失 this 的绑定。

```js
var a = 'global';
var obj = {
  a: 2,
  foo: function () {
    console.log(this.a);
  },
};
function test(fn) {
  var a = 3;
  fn();
}
test(obj.foo); // "global"
```

我们知道，**函数传参是按值进行传递的**，将 obj.foo 作为一个参数传入 test 函数，其实传递的是 foo 函数的一个引用。fn 是在 test 函数中被调用的，但是谁调用了它呢？？？并没有一个确定的对象调用 fn。

3. 如果将 obj.foo 传入 JavaScript 内置的函数呢？

```js
var a = 'global';
var obj = {
  a: 2,
  foo: function () {
    console.log(this.a);
  },
};
setTimeout(obj.foo, 100); // "global"
```

上面的 setTimeout() 函数其实类似于下面的伪代码：

```js
function setTimeout(fn, delay) {
  // 等待delay毫秒
  fn();
}
```

setTimeout 函数的内部运行机制其实和上面的 test 函数是一样的。

## 作为构造函数被调用

如果一个函数作为构造函数被调用，**_this 就代表它 new 出来的对象_**。但构造函数作为普通函数调用例外。

```js
var a = 'global';
function Foo(a) {
  this.a = a;
}
var bar = new Foo(2);
bar.a; // 2
```

以上代码，用 new 关键字调用了普通函数 Foo()，创建了一个对象实例 bar，函数 Foo()内部的 this 会被绑定到 bar。

此部分的内容会在原型和继承中详细讲解，这里不再啰嗦。

## 使用 call、apply、bind 来调用

这三个方法都可以 **_直接指定 this 的绑定对象_**，我们称之为 **_显式绑定_**。

- call、apply + 第一个参数都会传入一个对象，是给 this 准备的，当函数在调用时就会将这个对象绑定到 this。 + 主要区别在于第二个参数，apply 传入数组或 arguments 对象，call 必须将其余参数逐个列出。

```js
var a = 'global';
var obj = {
  a: 2,
};
function foo() {
  console.log(this.a);
}
foo.call(window); // "global"
foo.call(obj); // 2
```

- bind
  bind 方法的第一个参数，用于设置 this 的值，会返回一个新函数。

```js
var a = 'global';
var obj = {
  a: 2,
};
function foo() {
  console.log(this.a);
}
var func = foo.bind(obj);
func(); // 2
```

- JS 许多内置 API 等同于显示绑定的情形
  Array 许多内置的高阶函数，比如 filter、forEach、map 等等，提供的第二个参数来指定 this 的值。

举例来说：

```js
var obj = {
  a: 'i am a',
};
function foo(el) {
  console.log(el, this.a);
}
[1, 2].forEach(foo, obj);

// 1 "i am a"
// 2 "i am a"
```

本栗调用 foo 时，就把 this 值绑定到了 obj。如果在 forEach 函数中传入箭头函数，就会忽略 obj，因为箭头函数会在词法上绑定 this，这个稍后会讲哦。。。

## ES6 引入了箭头函数

讲箭头函数之前，我们先来看一个非常常见的情形：

### self = this 机制

我们先来看一段代码：

```js
function foo() {
  setTimeout(function () {
    console.log(this.a);
  }, 100);
}
var obj = {
  a: 2,
};

foo.call(obj); // undefined
```

以上代码，foo.call(obj)，强制将 foo 中的 this 绑定到了 obj。

setTimeout 里的函数访问 this.a，结果返回 undefined，为什么没有访问到 obj.a 呢？

这是因为 **_this 只存在与创建它的那个函数内部，永远不能访问外部函数中的 this。_**

_那么，我们是不是可以将外部作用域中的 this 保存在一个闭包能够访问到的变量里呢？_

```js
function foo() {
  var self = this;
  setTimeout(function () {
    console.log(self.a);
  }, 100);
}
var obj = {
  a: 2,
};

foo.call(obj); // 2
```

将外部作用域中的 this 保存在 self 变量里，基于词法作用域查找 self 就可以修正回调函数中的 this 绑定。

我们来归纳一下：

> self = this 机制使用了非常熟悉的：**词法作用域**。将我们要使用的外部环境中的 this 保存在一个能够访问到的变量 self 里，基于词法作用域查找 self，也就继承了外部环境的 this。

### 箭头函数

dalingling，胖箭头来了。

> 箭头函数将 this 与词法作用域关联起来。也就是说，**_箭头函数中的 this 会“继承”外层函数调用的 this 绑定_**。

```js
function foo() {
  setTimeout(() => {
    console.log(this.a);
  }, 100);
}
var obj = {
  a: 2,
};

foo.call(obj); // 2
```

> self = this 机制，或者箭头函数是解决回调函数丢失 this 绑定常用的办法。

# 被忽略的 this

> 当显示绑定 call、apply、bind 方法的第一个参数传入 null 或 undefined 时，
>
> - 在非严格模式下，函数内部的 this 会被忽略，指向 window。
> - 在严格模式下，this 指向 undefined。

那么什么情况下会传入 null 呢？？？

## 使用 apply 把数组展开成参数

```js
function foo(a, b) {
  console.log(a, b);
}
foo.apply(null, [1, 2]); // 1 2
```

ES6 引入了扩展运算符...，可以代替 apply 来展开数组。以上代码等同于：

```js
foo.apply(...[1, 2]); // 1 2
```

## 使用 bind 对参数进行柯里化

我们知道，使用 bind 会返回一个新的函数，那么如何让这个新的函数携带上层函数传过来的参数呢？

就是将 bind 的第一个参数设置为 null，其余参数传给这个新的函数，这种技术我们称之为 **_柯里化_**。

```js
function foo(a, b) {
  console.log(this, a, b);
}
var func = foo.bind(null, 3);
func(4); // window 3 4
```

以上代码，foo 调用 bind 返回一个 func 函数，foo 作为 func 的上层函数，将参数 3 传给了 func 函数，对应第一个参数 a = 3。

# 参考资料

- [你不知道的 JavaScript 上](https://github.com/cxh0224/blog)


# 必刷题

1.

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

var bar = function () {
  foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2

bar.call(window); // 2
// bar.call 修改的是 bar 内部的 this，foo.call 修改的是 foo 内部的 this，foo 内部的 this 还是指向 obj 的
```

2.

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2,
};

var bar = function () {
  return foo.apply(obj, arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5
```

3.

```js
function foo() {
  console.log(this.a);
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
(p.foo)(); // 4
```

这块大概有个规律：括号表达式，this 会变为 window，如果只是(obj.fn)()this 还是 obj。

# 常见面试题
```js
const obj = {
    name: 'zhangsan',
    sayHi() {
        console.log(this)
        setTimeout(function() {
            console.log(this)
        })
    }
}
obj.sayHi();
// obj
// window
```
