# 写在前面

我们知道， JS 引擎每进入一个执行环境时，就会创建对应的**执行上下文(Execution context)**。

那么，问题来了，我们写的函数多了去了，如何管理创建的那么多执行上下文呢？

这就要用到了我们的**执行上下文栈** (**Execution context stack，ECS**) 了。

# 什么是执行上下文栈
还记得我们在[《JS深入系列 - 从堆、栈、内存机制开始》](https://github.com/cxh0224/blog/issues/1)讲过栈的三层含义吗？
- 数据结构
- 函数调用栈(call stack)
- 内存空间

这里的执行上下文栈是第二层含义：函数调用栈（call stack）。它是栈数据结构的一种实践，规定代码的执行顺序，遵循 **LIFO 规则，即后进先出（Last In, First Out）**。

Array 有对应的栈的方法：
- push：在最顶层加入数据。
- pop：返回并移除最顶层的数据。
- .....


# 模拟栈
为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：
```js
ECStack = [];
```
1. 当 JS 引擎在执行代码时，首先进入全局环境，首先就会向执行上下文栈压入一个**全局执行上下文**，我们用 globalContext 表示它。
    ```js
    ECStack = [
      globalContext,
    ];
    ```
    globalContext被压入栈底，并且，**只要不关闭页面， ECStack 最底部永远有个 globalContext**。

2. 当进入函数环境时，向执行上下文栈压入**当前正在执行函数的执行上下文**，我们用 functionContext 表示。
    ```js
    ECStack.push(functionContext);
    ```
    此时，栈底永远都是 globalContext，**栈顶则是当前正在执行函数的执行上下文**，是这样的：
    ```js
    ECStack = [
      functionContext,
      globalContext,
    ];
    ```
    当函数调用完成后，执行上下文栈弹出 functionContext，伪代码如下：
    ```js
    ECStack.pop();
    ```
    **当我们关闭页面时，退出全局环境，ECStack 会被清空。**



# 参考
- [JavaScript深入之执行上下文栈 ](https://github.com/mqyqingfeng/Blog/issues/4)
- [JavaScript. The Core.](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/)





# 结束
**重学 JS 系列** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、异步和性能四个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/cxh0224/blog)