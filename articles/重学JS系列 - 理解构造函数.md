# 什么是构造函数
> 所谓构造函数，其实就是**以构造对象的形式（new）**来调用的一个函数，它是一个**普通的**函数。

语法上的特点：
- 首字母大写
- new 来调用

栗子：
```js
function Person() {
  // ...
}
var person = new Person();
```

# 执行机制
还记得在[《重学 JS 系列 - 函数是如何运行的》](https://github.com/cxh0224/blog/issues/16)中讲过，普通函数是如何执行的吗？
- 创建一个函数执行上下文，被压入执行上下文栈
- 函数执行上下文初始化（三件事情）：
    + 创建活动对象 AO（初始化 arguments、形参赋值、变量和函数声明）
    + 确定作用域链（Scope chain）
- 确定 this 指向
- 将函数体字符串拿过来，变为 JS 表达式自上而下执行
- 函数执行完毕，上下文被执行栈被弹出

**【构造函数独有执行步骤】**
- 它会创建一个`空对象`，让 函数体中的 `this 指向 这个新的对象`。
- 然后开始执行函数体代码：遇到`this.xxx=xxx`相当于`给这个对象实例创建“实例属性”`
- 当构造函数执行完毕时，默认将这个对象返回。


我们来看一段代码：
```js
function Fn(name, age){
    var n = 10;
    this.name = name;
    this age = age + n;
}
var f1 = new Fn('aaa', 20);

console.log(f1.name);
console.log(f1.age);
console.log(f1.n);
```

1. 当 new Fn('aaa',20) 执行时，首先进行 FnContext 的初始化：
    ```js
    FnContext = {
        AO: {
            arguments: {
                0: 'aaa',
                1: 20,
                length: 2
            },
            name: 'aaa',
            age: 20,
            n: undefined,
        },
        Scope: [AO, globalContext.VO],
        this: <reference to {}>,
    }
    ```

2. 自上而下执行函数体代码：
    - 执行 n = 10 修改的是  FnContext.AO 中的值
    - 执行 this.name = name; this age = age + n ，修改的是 FnContext.this 指向的堆内存中对象的值。
    ```js
    FnContext = {
        AO: {
            arguments: {
                0: 'aaa',
                1: 20,
                length: 2
            },
            name: 'aaa',
            age: 20,
            n: 10,
        },
        Scope: [AO, globalContext.VO],
        this: <reference to { name: 'aaa', age: 30 }>,
    }
    ```

3. new Fn('aaa', 20) 执行结束，将 this 返回给 f1
    ```js
    f1 = {
        name: 'aaa',
        age: 30
    }
    ```
    
    所以，最终结果是：'aaa'、30、undefined。

整个执行过程如图所示：

![new](https://user-images.githubusercontent.com/22387652/62944552-8237e980-be0f-11e9-9d1d-ce4f79a98bc9.png)

# return 的问题
不写 return，浏览器默认返回创建的实例，但是写了 return
- return 是一个`基本值`，返回的结果依然是类的实例，没有受到影响
- 如果return 返回的是`引用类型值`，则`会把默认的实例覆盖`，此时接收到的结果就是这个引用值
- return; 是结束代码执行的作用，不会覆盖返回的实例

栗子：
```js
function Foo() {
    this.name = 'a';
    getName = function () {
        console.log(1);
    };

    return this;
}
```
1. 如果普通调用，执行 Foo()，this 是谁呢？
    我们在[《重学 JS 系列 - this》](https://github.com/cxh0224/blog/issues/15)讲过，***当不带任何修饰参数调用一个普通函数时，this 默认指向 window***。因此，这里 return 返回的是 window 对象。

2. 如果用 new 来调用，this 是 谁呢？
    执行 new Foo()，分为以下步骤：
    - 首先 this 指向一个空对象 { }
    - 执行 this.name = 'a'，给这个对象添加一个属性 name，值是 'a'
    - 将 { name: 'a' } 这个对象返回，因此 返回 this 就是返回这个对象啦

    


# 结束
***重学 JS 系列*** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、异步和性能四个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/cxh0224/blog)

