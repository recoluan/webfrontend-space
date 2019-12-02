在讲提升之前，我们先来看一下 JavaScript 中的作用域，是什么样子的。

# 什么是作用域
首先，作用域是什么？

作用域是一个抽象的概念，《你不知道的 JavaScript》中，有这样一句话：
>作用域是一套规则，用于确定在何处以及如何查找变量。

其实，作用域就好像是一个**范围**，一个**区域**。在这个范围之内可以查找到的变量属于局部变量，在范围之外无法访问。

我们来看一个栗子：
```js
function init(){
  var a = 12;
}
a; //=>ReferenceError
```
上面代码中 foo 函数中声明的变量 a，只存在于 foo 函数的作用域中，在 init 函数外部访问变量 a，会抛出 ReferenceError 错误（变量未声明）。


# JavaScript只有词法作用域
《你不知道的 JavaScript》认为，作用域主要有两种工作模型：
>- 词法作用域
  是由***书写代码时函数声明的位置***决定的，是静态的。
>- 动态作用域
  在***运行***时确定的，是动态的。只关注函数***在哪里调用***。（***this 也是！！！***）

事实上，***JavaScript 只有词法作用域***，并不具有动态作用域，而 this 机制也是关注函数在哪里调用的，很像动态作用域，俩人应该是表亲关系啦。

我们看一段代码：
```js
var a = 12;

function foo() {
  console.log(a);
}

function bar() {
  var a = 13;
  foo();
}

bar();

// 结果是 ???
```
输出了 12，而不是 13！为什么？
当 foo 函数执行时，先从 foo 函数内部查找是否有局部变量 a，并没有找到。接着向上级作用域查找。

1. 假设 JavaScript 采用静态作用域：
    根据书写的位置，查找上面一层的代码，找到全局的 a = 12，输出 12。

2. 假设 JavaScript 采用动态作用域：
    从foo函数被调用的位置开始，也就是 bar 函数内部查找，找到 a = 13，输出 13。

结果是 12，这也就验证了我们的观点。

# 扩展
词法作用域、动态作用域是从理论模型的角度区分的。常见的还有从不同的代码块来定义。
<details><summary><b>作用域的类型</b></summary>
<p>


ES6之前，JavaScript 只有全局作用域和函数作用域。

ES6在with、try/catch、let、const中引入了块作用域，将变量和函数的作用域限制在{ }内部。

## 全局作用域
全局作用域是最顶层的作用域。特点：
- 在web浏览器中，所有的全局变量和函数都是作为 **window 对象的属性和方法**创建的。
- 全局作用域直到程序退出，例如关闭浏览器或网页时才被销毁。

## 函数作用域
每声明一个函数就会为其自身创建一个局部作用域，我们称之为函数作用域。

在函数作用域中，只有两种情况是局部变量：
  - `声明过的变量（带var和function））`
  - `形参`
  =>剩下的都不是，都要基于作用域链的机制向上查找


栗子：
```js
var a = 1;
function foo() {
  var b = 2;
  console.log(b);//=>2
}
console.log(b); //=>ReferenceError
```
在上栗中，变量 a 是一个全局变量，而变量b是一个局部变量，只存在与 foo 函数的作用域中，在 foo 函数的外部访问会抛 ReferenceError（变量未声明）错误。



## ES6引入了块作用域
1. try/catch
    catch 分句会创建块作用域，声明的变量仅在 catch 的{ }中有效。

    ```js
    try {
      undefined(); //=>执行一个非法操作来强制一个异常
    } catch (err) {
      err = 2
      console.log(err); //2
    }
    console.log(err); //=>ReferenceError
    ```

2. let、const
    ES6 引入了 let、const 来声明变量，声明的变量会被偷偷的劫持在所在的最里层的作用域。

    栗子：
    ```js
    function foo() {
      if (true) {
          let b = 2;
          const c = 3;
          var d = 4;
      }
      console.log(d); //=>4
      console.log(b); //=>ReferenceError
      console.log(c); //=>ReferenceError
    }
    ```

 
# 立即执行函数表达式
ES6 之前，JavaScript 虽然没有块作用域的概念，但却用立即执行函数表达式模仿了块作用域。

1. 语法
    ```js
    (function() {
        // 这里是块级作用域
    })();
    ```
    将一个函数的值括起来，外面再加一个()立即调用，这样就模仿了一个块作用域。

    也可以写成 (function() { .. }())，将调用()移进里边。

    两种写法都可以，个人比较稀罕第一种辣。

2. 原理
    我们都知道变量只不过是值的一种形式，可以用实际的值来替换变量，比如
    ```js
    var num = 5;
    output(num);
    //等同于
    output(5);
    ```
    而函数在使用函数表达式进行定义时，是将一个匿名函数赋值给一个变量，然后再用函数名来调用，那我们是不是也可以用函数的值直接替换函数名呢？当然可以

3. 应用
    - 传递参数
    由于函数参数是按值进行传递的，所以就会将外部作用域中的变量传递给函数的参数，函数的参数可以任意命名。
    ```js
    var a = 0;
    (function (obj) {
      var a = 2;
      console.log(a); //=>2
      console.log(obj.a); //=>0
    })(window);
    ```
    在上边的栗子中，将 window 对象的引用的一个副本复制给了参数 obj，因此 obj.a 访问的是全局作用域中的 a。


</p>
</details>





# 参考
- [JavaScript深入之词法作用域和动态作用域](https://github.com/mqyqingfeng/Blog/issues/3)
- [《你不知道的JavaScript》]()





# 结束
**重学 JS 系列** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、异步和性能四个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/cxh0224/blog)