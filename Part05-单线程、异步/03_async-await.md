目录

[TOC]

1. 背景：
Promise 的出现主要是解决 Callback Hell ，但它的 then 和 catch 的链式调用，也是基于回调函数。

而 ES7 新增的 async-await 是同步语法写异步代码，彻底消灭回调函数。

# async-await 和 Promise 的关系
async-await 和 Promise 并不互斥，两者相铺相成。
- 执行 async 函数，返回的是 Promise 对象
- await 相当于 Promise 的 then，处理 Promise 成功的情况
- 可使用 try-catch 来捕获异常，代替了 Promise 的 catch

```js
async function fn() {
  return 100 // 相当于 return Promise.resolve(100)
}
const p = fn() // p 是一个 Promise 对象，状态为 fulfilled
```

```js
!(async function () {
  const p = Promise.resolve(300)
  const data = await p; // await 相当于 Promise 的 then
  console.log(data) // 300
})()

!(async function () {
  const data = await 400; // 相当于 Promise.resolve(400)
  console.log(data) // 400
})()
```

```js
!(async function () {
  // const p = Promise.reject('err'); // rejected 状态
  // const result = await p; // await 相当于 then，因此不会执行 rejected 状态的 Promise，报错
  // console.log(result)
  const p = Promise.reject('err'); // rejected 状态
  
  try {
    const result = await p;
    console.log(result)
  } catch (err) {
    console.error(err)
  }
})()
```

# async-await 只是一个语法糖

```js
async function async1() {
  console.log('async1 start') // 2
  await async2() // async2() 返回 undefined
  // await 的下边，不管几行，都可以看作是 callback 里的内容，即异步
  console.log('async1 end') // 5
}
async function async2() {
  console.log('async2') // 3
}
console.log('script start') // 1
async1()
console.log('script end') // 4
// script start
// async1 start
// async2
// script end
// async1 end
```

# for-of
for-in、for、forEach 一般是==同步遍历==
for-of 常用于==异步遍历==
```js
function muti(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

const nums = [1, 2, 3]

// forEach：1 秒之后，1 4 9 一次性同时打印出来
nums.forEach(async (i) => { // forEach 相当于同一时间创建了3个异步，异步开始计时的时间几乎相同，所以 3 个的结果同时出来
  const res = await muti(i)
  console.log(res)
})
// for-of：每间隔 1 秒输出 1 4 9
!(async function () {
  for (let i of nums) { // for-of 会等当前遍历有结果了再遍历下一个，相当于 每次遍历只创建了一个异步，所以 3 个时间是不同的
    const res = await muti(i)
    console.log(res)
  }
})()
```

# 基本语法

ES7 新增加的堆 Promise 操作的新语法：async / await（使用await必须保证当前方法是基于async修饰的）。 



# 结束
***重学 JS 系列*** 预计 25 篇左右，这是一个旨在帮助大家，其实也是帮助我自己捋顺 JavaScript 底层知识的系列。主要包括变量和类型、执行上下文、作用域及闭包、原型和继承、单线程和异步、JS Web API、渲染和优化几个部分，将重点讲解如执行上下文、作用域、闭包、this、call、apply、bind、原型、继承、Event-loop、宏任务和微任务等比较难懂的部分。让我们一起拥抱整个 JavaScript 吧。

大家或有疑问、或指正、或鼓励、或感谢，尽管留言回复哈！非常欢迎 star 哦！

[点击返回博客主页](https://github.com/chenchen0224/webfrontend-space)