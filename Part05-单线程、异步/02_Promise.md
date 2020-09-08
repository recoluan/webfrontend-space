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
=> **fufilled 状态**的 Promise **触发后续的 then 回调**
=> **rejected 状态**的 Promise **触发后续的 catch 回调**

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
console.log(p2) 

// Promise {<fulfilled>: 100}
// Promise {<rejected>: "err"}
// then 100
// Uncaught (in promise) err
```

then 和 catch 对状态的影响：
- then/catch 执行时 **只要没有报错** 都返回的是 fulfilled 状态的 Promise，有报错返回 rejected 状态的 Promise


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

const p4 = Prommise.reject('my error').catch(err => {
  throw new Error('catch error')
})
// console.log(p4); // 最终 rejected 
```



## Promise.prototype 原型对象上的 API
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
 .then() 中的第二个参数 等同于 .catch()  

返回值：一个新的 Promise 实例（不是原来那个）=> 因此可以链式调用


///////////////// 待梳理
如果上一个 then 中返回一个`具体的值`（`不写 return 返回 undefined`也是具体值），而且执行中没有错误异常，才会**`立即执行`**下一个then中的方法。
如果 return 的是一个`新的 Promise 实例`，只能等新 Promise 执行完成，把异步操作成功的结果当做具体的值返回，才能进入下一个 then 的执行。
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
// 等待 1 秒，输出 1，再等待 1秒，输出 2
// 不写 return，等待 1 秒，输出 1，紧接着输出 2
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


## Promise 构造函数的 API

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
- 参数：数组，可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例

p的状态由p1、p2、p3决定，分成两种情况：
- 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled
  =》p1、p2、p3的返回值组成一个数组，传递给p的回调函数
- 要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected
  =》第一个被 reject 的实例的返回值，会传递给p的回调函数


### Promise.race()
Promise.race()：
```js
const p = Promise.race([p1, p2, p3]);
```
只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。









# 常见面试题
1. 手写用 Promise 加载一张图片
```js
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');

    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      const err = new Error(`图片加载失败 ${src}`)

      reject(err)
    }
    img.src = src
  })
}

// test
const url = 'https://user-images.githubusercontent.com/22387652/90473917-a9c63e00-e156-11ea-9363-842eb5fd54f3.png'

// 1. promise 的写法
loadImg(url).then(img => {
  console.log(img.width)
    
  return img // 这里 return 什么，下个 then 的参数就是什么
}).then(img => {
  console.log(img.height)
}).catch(err => console.error(err))

// 2. async-await 的写法
!(async function () {
   const img = await loadImg(url)
   console.log(img.width, img.height)
})()
```
2. Promise 有哪几种状态，如何变化？
3. 手写 Promise
4. 场景题：Promise 语法（重要）
```js
// 第一题
Promise.resolve().then(() => {
  console.log(1)
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})
// 1 3
```

```js
// 第二题
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('error')
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})
// 1 2 3
```

```js
// 第三题
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('error')
}).catch(() => {
  console.log(2)
}).catch(() => {
  console.log(3)
})
// 1 2
```