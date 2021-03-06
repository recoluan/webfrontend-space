目录

[TOC]

# Callback Hell 和 Promise
Callback Hell：回调地狱。回调函数中嵌套回调函数。
可能存在性能上的消耗，形成一层层不销毁的栈内存。 => 解决方案：Promise
```js
const url1 = '/data1.json'
const url2 = '/data2.json'
const url3 = '/data3.json'

getData(url1).tnen(data1 => {
  console.log(data1)

  return getData(url2)
}).then(data2 => {
  console.log(data2)

  return getData(url3)
}).then(data3 => {
  console.log(data3)
}).catch(err => console.log(err))

function getData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success(data) {
        resolve(data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}
```

# Promise
## 创建一个 Promise 实例
Promise 是 ES6 中新增加的`内置类`。

new Promise(executor)：创建一个 Promise 实例
1. 执行器（executor）函数
- 管控异步操作
  + 两个参数：
	  + resolve：异步操作成功后要做的事情（代指成功后的事件队列）
	  + reject：异步操作失败后要做的事情（代指失败后的事件队列）

注意：new Promise 时就创建了两个队列，然后第二步立即把回调函数执行。


**Promise 实例一经创建，executor 函数立即执行**。
```js
cosnt promise = new Promise((resolve, reject) => {
  console.log('Promise');
  resolve();
});

promise.then(() => {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

2. 三种状态：
- pending 进行中
- fulfilled 成功
- rejected 失败

如何变化？pending 变为 fulfilled/rejected

executor 对状态的影响：
=> resolve 的作用：将 Promise 的状态从 pending 变为 fulfilled
=> reject 的作用：将 Promise 的状态从 pending 变为 rejected

```javascript
new Promise((resolve, reject)=>{ // pending
    if (...) {
      resolve(data) // fulfilled
    } else {
      reject(error) // rejected
    }
})
```
注意：
- 状态变化不可逆
- pending 状态，不会触发 then 和 catch

```js
const p = new Promise((resolve, reject) => {
  resolve('ok');
  throw new Error('test');
});
p.then((value) => {
    console.log(value)
}).catch((error) => {
    console.log(error)
});
// ok
```
上面代码中，Promise 在 resolve 语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。


```js
const p1 = Promise.resolve(100)
console.log(p1)

p1.then((data) => {
  console.log('then', data)
}).catch((err) => {
  console.log('catch', err)
})

const p2 = Promise.reject('err')
console.log(p2) // 

// Promise {<fulfilled>: 100}
// Promise {<rejected>: "err"}
// then 100
// Uncaught (in promise) err
```

then 和 catch 对状态的影响：
- then/catch 执行时只要没有报错都返回的是 fulfilled 状态的 Promise，有报错返回 rejected 状态的 Promise

=> **fufilled 状态**的 Promise **触发后续的 then 回调**
=> **rejected 状态**的 Promise **触发后续的 catch 回调**

```js
const p1 = Promise.resolve().then(() => {
  return 100
})
// console.log(p1); // 打印时是 pending 的，最终 fulfilled（因为异步）

// fulfilled => 触发后续的 then 回调
p1.then(() => {
  console.log('p1-then')
})

const p2 = Promise.resolve().then(() => {
  throw new Error('then error')
})
// console.log(p2); // 最终 rejected 

// rejected => 触发后续的 catch 回调
p2.then(() => {
  console.log('p2-then')
})

// 只输出了 p1-then


const p3 = Prommise.reject('my error').catch(err => {
  console.error(err)
})
// console.log(p3); // 最终 fulfilled 

const p3 = Prommise.reject('my error').catch(err => {
  throw new Error('catch error')
})
// console.log(p3); // 最终 rejected 
```



## Promise.prototype 的 API
传统 JS 中的异常捕获：（目的：把抛出异常的错误捕获到，不让其阻断浏览器的继续执行）
```js
try {
    //=>正常执行的JS代码(可能会报错)
    1();
} catch (e) {
    //=>TRY中的代码报错了会执行 CATCH
    console.log(e.message);
} finally {
    //=>不管TRY中的代码成功还是失败都会执行
}
```

### Promise.prototype.then()
Promise.prototype.then()：指定 Promise 的状态变为 resolved（第一个参数） 和 rejected（第二个参数） 的回调函数
返回值：一个新的Promise实例（不是原来那个）=> 因此可以链式调用

／／／／／／／／／
then方法
基于promise.prototype.then方法（catch / finally）向成功队列和失败队列中依次加入需要处理的事情。（这个操作是`同步的`）
.then的链式调用：
异步操作成功或者失败，先把第一个then中的方法执行。每执行一个then会形成一个`新的promise实例`，这个实例管控的是`上一个then方法`执行的成功还是失败。

例如，第一个then执行的是失败的方法，第二个then管控第一个then，执行的是成功的方法，和我们想象的有出入。

建议不要使用then中的第二个参数。

如果上一个then中的方法返回一个`具体的值`（哪怕`不写return返回undefined`也是具体值），而且执行中没有错误异常，才会**`立即执行`**下一个then中的方法。
如果return返回的是一个`新的Promise实例`（并且管控了一个异步操作），只能等新Promise执行完成，把异步操作成功的结果当做具体的值返回，才能进入下一个then的执行。
```js
let A = function A() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};

let B = function B() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};

let promise = A();
promise.then(() => {
    console.log(1);
    return B();//=>B()，不写return，结果有什么不一样？
}).then(() => {
    console.log(2);
});
```

### Promise.prototype.catch()
Promise.prototype.catch()：等同于 .then(null, rejection)或 .then(undefined, rejection)
返回值：一个新的 Promise 实例（不是原来那个）=> 因此后边还可以接着调用 then 

```js
Promise.resolve()
.catch((error) => {
  console.log('oh no', error);
})
.then(function() {
  throw new Error('test')
});
// Uncaught (in promise) Error: test
```
上边的代码，then 中抛出了错误，只会被 then 后边的 catch 捕获。



### Promise.prototype.finally()
Promise.prototype.finally(): 指定 不管 Promise 最后的状态是什么都会调用的回调函数。
```js
promise
.finally(() => {
  // ...
});

// 等同于
promise
.then(
  result => {
    // ...
    return result;
  },
  error => {
    // ...
    throw error;
  }
);

```


## Promise 的 API

### Promise.resolve()

Promise.resolve()：将 JS 对象转换为 Promise 对象。等价于：
```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

参数：可以无参数，也可以传入 基本值 或者对象。都**返回一个新的 Promise 对象，状态为 resolved**。
如果是具有 then 方法的对象。除了将这个对象转为 Promise 对象，还会立即执行它的 then 方法

```js
// 基本值
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello

// thenable对象
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

### Promise.reject()

Promise.reject()：**返回一个新的 Promise 实例，状态为 rejected**。
```js
Promise.reject('出错了')
// 等价于
new Promise((resolve, reject) => reject('出错了'))
```


### Promise.all()
Promise.all()：用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```
- 参数：数组，或者 具有 Iterator 接口并且每个成员都返回 Promise 实例
状态变化：
- 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled
- 要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected


### Promise.race()
Promise.race()：
```js
const p = Promise.race([p1, p2, p3]);
```
只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。













# 结束
***重学 JS 系列*** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、单线程和异步、JS Web API、渲染和优化几个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/chenchen0224/webfrontend-space)