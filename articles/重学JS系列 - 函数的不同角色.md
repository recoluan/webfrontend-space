对于一个函数来说，会存在多种角色：
- 角色一：普通函数
    + 普通调用
    + 构造函数
        + 通过 new 来调用，创建一个对象实例
        + 它的 prototype 属性指向原型
- 角色二：普通对象
    + 函数也是一个对象


# JS 内置函数
我们先从 JS 内置函数开始吧。

比如，Number、Array 等等，哪些是作为普通对象拥有的键值对属性（`普通对象.`调用），哪些是作为一个普通函数，在它们的原型上找到的共享属性和方法（`实例调用`）。

在控制台打印 Array，红色框里的是作为一个对象具有的，绿色框里的是 Array.prototype 上共享的，如图所示：
![Array](https://user-images.githubusercontent.com/22387652/62934461-35481900-bdf7-11e9-8d69-05cae8367c31.png)




# 类库：jQ
jQuery 这个类库提供了很多的方法，其中有一部分是写在原型上的，有一部分是当做普通对象来设置的。
```js
~function () {
    function jQuery() {
        //...
        return [JQ实例]
    }
    jQuery.prototype.animate=function(){}
    //...
    jQuery.ajax=function(){}
    //....
    window.jQuery = window.$ = jQuery;
}();
// $().ajax() //=> TypeError
$().anaimte() //=>这样可以调取
$.ajax() //=>直接的对象键值对操作
// $.animate() //=> TypeError
```


# 栗子
```js
function Fn() {
    var n = 10;
    this.m = 100;
}

Fn.prototype.aa = function () {
    console.log('aa');
};
Fn.bb = function () {
    console.log('bb');
};
//=>普通函数
Fn();

//=>构造函数执行
var f = new Fn();
console.log(f.n);
console.log(f.m);
f.aa();
console.log(f.bb);
```
我们一起来分析下：
1. 执行 Fn(); 把 Fn 当作一个普通的函数来执行：
    - var n = 10; 声明一个变量 var n = 10;
    - 执行 this.m = 100，this 是 window，给 window 添加了一个属性 m，并赋值 100.

2. 执行 var f = new Fn()，把 Fn 当作一个构造函数来执行，返回一个对象，赋给 f：
    ```js
    f = {
        m: 100
    }
    ```
    注意：new Fn() 仅仅将 `this.xxx = xxx` 属性添加到了返回到对象中，var n = 10，并不会被添加。
    另外：
    ```js
    f.__proto__ === Fn.prototype; // true
    ```
    因此，Fn.prototype 上的方法是被 Fn 的实例共享的。

3. bb 这个函数，是 Fn 作为一个对象的属性，必须通过 Fn.bb 来调用
    => 所以，答案是：
    ```js
    undefined
    100
    'aa'
    undefined
    ```


# 必刷题

相信大家都见过这道面试题：
```js
// Part 1
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}

// Part 2
Foo.getName();
getName();
Foo().getName();
getName();
console.log(Foo.getName);

// Part 3
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```
<details><summary><b>答案</b></summary>
<p>

```js
// Part 2
2
4 
1 
1 
ƒ () {
    console.log(2);
}
// Part 3
2 
3
3
```


</p>
</details>

为了便于分析，我们将代码拆为 3 段：Part 1 ～ Part 3。

### Part 1
JS 引擎会将这段代码理解为：
```js
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
function getName() {
    console.log(5);
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
getName = function () {
    console.log(4);
};

```
1. 首先进入全局环境，变量、函数的声明都会提升，声明了两个函数 Foo（= 地址）、getName（= 地址）。
    这里要注意的是：
    function getName 和 var getName 的声明是重复的声明，var getName 的声明会被忽略。这个在[重学 JS 系列 - 提升](https://github.com/cxh0224/blog/issues/9)有讲哦。
2. 自上而下执行代码：跳过 Foo 和 getName 的函数声明
    - 执行 Foo.getName ------------------> 这里是将 Foo 当作一个对象，给这个对象添加了一个函数：f -> 2
    - 执行 Foo.prototype.getName --------> 是在 Foo 的原型上加了一个共享的函数： f -> 3
    - 执行 getName = f -> 4 --------------> 修改的是全局的 getName 函数

Part 1 部分代码的执行过程，如图所示：
![step1](https://user-images.githubusercontent.com/22387652/62930066-417ba880-bdee-11e9-8045-8692303827d6.png)


### Part 2
1. 自上而下执行代码：
    - 执行 Foo.getName() -----------------> 执行的是 Foo 对象上的 getName 函数，输出 2
    - 执行 getName() ---------------------> 执行的是 全局的 getName 函数，输出 4
    - 执行 Foo().getName();
        + 执行 Foo() ----------------------> 修改全局的 getName 函数，指向一个新的函数： f -> 1，this = window，将 window 返回。
        + 执行 window.getName() ---------> 全局的 getName 函数已被修改，输出 1
    - 执行 getName() ---------------------> 输出 1
    - 执行 console.log(Foo.getName) -----> 打印的是 Foo 对象上的 getName 函数

Part 2 部分代码执行过程如图所示：
![step2](https://user-images.githubusercontent.com/22387652/62929681-85ba7900-bded-11e9-8dc8-1acf834b0031.png)


### Part 3
1. 执行 new Foo.getName();
    - 这里 将 Foo.getName 看作一个整体，它是一个函数，然后用 new 来调用。输出 2
    
    执行过程如图所示：
    ![new_Foo.getName](https://user-images.githubusercontent.com/22387652/62934390-07fb6b00-bdf7-11e9-8792-b3e8990bb56b.png)

2. 执行 new Foo().getName();
    - 首先执行 new Foo(), 返回 Foo 的一个对象实例 f，
    ```js
    f = {
        // 空对象
    }
    ```
    - 然后执行 f.getName()，实例上并没有 getName 属性，沿着 __proto__ 线找到 Foo.prototype.getName 并执行，输出 3
3. 执行 new new Foo().getName()，这里可以看成 new [Foo的实例].getName()
    - 首先执行 new Foo()，返回 Foo 的一个对象实例 f，
    ```js
    f = {
        // 空对象
    }
    ```
    - 然后执行 new f.getName(), ***f.getName 我们沿着原型链找到 Foo.prototype.getName: f -> 3，实际上，就是基于 f -> 3 这样一个函数来 new 调用***，执行过程类似于 new Foo().getName()，最终输出 3。



# 结束
***重学 JS 系列*** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、异步和性能四个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/cxh0224/blog)

