# 写在开篇
在前边的章节中，我们讲解了堆、栈、执行上下文、变量对象、作用域链等概念。如果对这些概念不是很清楚，建议先阅读一下。

这一篇，我们结合以上所有内容，来讲讲一个个函数到底是怎样执行的。


# 函数的生命周期
一个函数的生命周期包括：函数的创建、函数执行。

## 函数创建
每创建一个函数，就会开辟一个`堆内存空间`，将函数体中的代码当做`字符串`存入堆内存中，把堆内存的地址传递给变量，保存在栈内存中。

## 函数执行
进入函数环境，首先进行预编译，然后开始执行代码，具体分为以下步骤：

1. 创建一个`函数执行上下文`，这个上下文会被压入执行上下文栈

2. 函数执行上下文初始化（三件事情）：
    - 创建活动对象(Activation Object，AO)
        + 初始化 arguments、 形参赋值
        + 变量、函数的声明
    - 确定作用域链(Scope chain)
    - 确定 this 指向

3. 将函数体字符串拿过来，`变为 JS 表达式`自上而下执行
4. 函数执行完毕，对应的函数执行上下文被执行栈被弹出

注意：函数每一次执行都会形成一个全新的执行上下文，和上次创建的上下文毫无关系。



# 具体执行分析
文字太多。。。不如代码 + 图：
```js
var a = 1;
function foo(o) {  
    var b = o + 1;
    console.log(b); //=>2
}
foo(a);
```
执行过程如下：
1. 首先进入全局环境，创建全局执行上下文 globalContext，globalContext 被压入执行上下文栈
    ```js
    ECStack = [
        globalContext
    ];
    ```

2. 全局执行上下文 globalContext 初始化：
    ```js
    globalContext = {
        VO: [global],
        Scope: [globalContext.VO],
        this: globalContext.VO,
    }
    ```
    全局上下文的变量对象就是全局对象呐!

    globalContext 初始化的过程中，完成了变量和函数的声明：
    - a = undefined
    - foo函数被创建，开辟了一块堆内存存储函数体字符串，伪代码如下：
    ```js
    globalContext.VO === global = {
        a: undefined,
        foo: <reference to function foo(){}>,
    }
    ```
    foo 函数的内置属性 [[scope]] 保存了它所在的词法链：
    ```js
    foo.[[scope]] = [
      globalContext.VO
    ];
    ```

3. 从上到下执行全局代码，执行a = 1，其实是修改的全局对象的属性a的值
    ```js
    global = {
        a: 1,
        foo: reference to function foo(){},
    }
    ```
4. 执行foo()时，创建foo函数执行上下文，fooContext被压入执行上下文栈
    ```js
    ECStack = [
        fooContext,
        globalContext
    ];
    ```
5. foo 函数执行上下文初始化：
    - 第一步：复制函数 foo 的 [[scope]]属性创建作用域链
    ```js
    fooContext = {
        Scope: foo.[[scope]], // 等于 [ globalContext.VO ]
    }

    ```
    - 第二步：用 arguments 初始化活动对象，形参赋值、变量和函数的声明
    ```js
    fooContext.AO = {
        arguments: {
            0: 1,
            length: 1
        },
        o: 1,
        b: undefined,
    }，
    ```
    - 第三步：将活动对象压入 foo 作用域链顶端
    ```js
    fooContext.Scope = AO + foo.[[scope]], // 等同于 [ fooContext.AO, globalContext.VO ]
    ```

    综上，这时的 fooContext 为：
    ```js
    fooContext = {
        AO: {
            arguments: {
                0: 1,
                length: 1
            },
            o: 1,
            b: undefined,
        },
        Scope: [AO, globalContext.VO],
        this: undefined
    }
    ```
7. foo 函数执行，执行 b = o + 1，其实是修改 fooContext.AO 中 b 的值，b = 2，最终输出2
8. foo 函数执行完成，fooContext 函数执行上下文从执行上下文栈中弹出
9. 当我们关闭页面时，弹出 globalContext



看了上边的步骤，是不是有点眩晕。。。我们来一个华丽丽的分割线。。。


# 简化分析

我们抛开作用域、执行上下文、变量对象等等一系列复杂的概念，来简化一下执行过程：

1. 进入全局环境，首先进行变量和函数的声明（hoisting）：
    - 变量：声明，值为undefined
    - 函数：提升声明式函数的声明，值为一个引用地址，指向堆内存中的函数对象

2. 自上而下执行代码
    - 执行 a = 1
    - 执行 foo()

3. 进入一个局部环境（函数）
    - 首先进行形参赋值：o = 1
    - 然后变量和函数声明：var b = undefined

4. 函数从上而下开始执行
    - 执行b = o + 1
    - 执行console.log(b)，输出2

简化后的执行过程，如图所示：

<img width="476" alt="函数的运行机制" src="https://user-images.githubusercontent.com/22387652/58477712-cf001280-8186-11e9-941d-41f78a30b696.png">


# 结束
**重学 JS 系列** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、异步和性能四个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/cxh0224/blog)
