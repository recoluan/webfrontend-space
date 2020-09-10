目录

[TOC]

题目 -》 考点、知识点 -》 题目
- JS 基础知识：规定语法（ECMA 262标准）
- JS Web API：网页操作的 API（W3C标准）



# Part01-变量和类型
1. 声明变量的几种方式？=>var 和 let、const的区别（重要）
2. 数据类型：有哪些类型，值类型与引用类型的区别
3. 何时使用 === ，何时使用 ==
4. 列举强制类型转换和隐式类型转换
5. 数组中用过哪些方法？
- push、pop、unshift、shift 的区别
- splice 和 slice 的区别
- filter、map、find、forEach 的区别
- for-in、for-of、for、forEach 的区别
- split 和 join 的区别（反转）
6. 数组去重
7. 手写 flatern（数组拍平）（重要，快手！！！支持根据深度去拍平）
8. 知道 concat 吗？手写一个
9. map 网红题
```js
[10, 20, 30].map(parseInt) // [10, NaN, NaN]
```
10. 知道 reduce 吗？用 reduce 实现一个数组求和
11. 求 a、b、c 三个数组的交集、并集、差集（京东、跟随学用 Set 实现）
```js
const a = [1, 2, 3, 4, 5, 7, 9],
    b = [1, 3, 5, 7, 9],
    c = [1, 2, 4, 6, 8];
// 求 a∩b∩c => [1]   a∪b∪c => [1-9]   a≠b≠c => [6,8]
```
12. 随机打乱一个数组
13. 实现一个 merge 方法将两个有序数组合并成一个有序数组（头条、快手）
```js
// 用 for、while，不要用数组方法
let arr1 = [1, 2]
let arr2 = [-1, 2, 8, 9]
merge(arr1,arr2) // 返回 [-1, 1, 2, 2, 8, 9]
``` 
14.  字符串用过哪些方法？slice、substring、substr 的区别
15.  将 url 参数解析为 JS 对象
16.  写一个函数，判断字符串是否回文（好未来）（重要）
17.  什么是深拷贝、浅拷贝？手写深拷贝（重要）
18.  手写深度比较，模拟 lodash 的 isEqual

# Part02-执行上下文、作用域、闭包
1. 什么是作用域？分为？全局作用域、函数作用域、块级作用域（ES6 新增）
2. 作用域场景题（重要）
3. 闭包在实际开发中的应用场景，举例说明
4. 场景题：创建 10 个 \<a>标签，点击的时候弹出来对应的序号

# Part03-全面解析this
1. this 的不同应用场景，如何取值？（重要）
   => call 调用一个箭头函数？
   => new 调用一个箭头函数？
   => this 指向场景题（重要）
2. call、apply 与 bind 的区别（重要）
3. 手写 call、apply
4. 手写 bind 函数
5. 手写数组的函数，比如 slice


# Part04-原型和继承
1. 检测类型的几种方式（重要！！！）
2. 实现一个 instanceof(a, b) （重要，头条）
3. 如何判断一个变量是不是数组？
4. 手写一个简易的 jQuery，考虑插件和扩展性
5. class 的原型本质，怎么理解？

# Part05-单线程、异步
1. 什么是异步？同步和异步的区别是什么？
2. 前端使用异步的场景有哪些？
3. 请描述 Event Loop（事件循环／事件轮询）的机制，可画图（重要！！！）
4. 场景题：setTimeout 笔试题（重要）
5. 手写用 Promise 加载一张图片
6. Promise 有哪几种状态，如何变化？
7. 手写 Promise
8. 场景题：Promise 语法（重要）
9. 场景题：async/await 语法（重要）
10. Promise 和 async-await 的区别（重要）
11. 什么是宏任务、微任务，两者区别？（重要）
12. 场景题：Promise、setTimeout 和  async/await 的执行顺序（重要）


# Part06-JS Web API（BOM、DOM、AJAX、事件）
1. 如何捕获 JS 中的异常？
2. 什么是 JSON？常用的 API？
3. DOM 是哪种数据结构？
4. DOM 操作常用的 API
5. attribute 和 property 的区别
6. 一次性插入多个 DOM 节点，考虑性能
7. 手写一个简易的 AJAX（重要）
   => XMLHttpRequest 对象的工作流程
8. axios 和 fetch、与 AJAX 的区别（重要）
9. 什么是跨域？跨域的常见实现方式
10. JSONP 的原理
11. 描述事件冒泡的流程，如何阻止事件冒泡和事件的默认行为？
12. 描述事件委托的原理
13. 编写一个通用的事件监听函数
14. 场景题：无限下拉的图片列表（例如，瀑布流），如何监听每个图片的点击？
15. 请描述一下 cookies，sessionStorage 和 localStorage 的区别



# Part07-页面渲染与性能优化
1. 从输入一个 URL 到渲染出页面的整个过程（重要）
2. window.onload 和 DOMContentLoaded 的区别？
3. 常见的性能优化方案（重要）
4. 手写防抖 debounce、节流 throttle（快手）  
5. 常见的 web 前端攻击方式有哪些


# ES6+
1. Generator 与 async-await（重要！！！）
2. 装饰器的原理（重要）


