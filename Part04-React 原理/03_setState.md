目录

[TOC]

# setState() 基本语法
> Component.prototype.setState(updater/partialState[, callback])

- 【第一个参数】：可以是一个函数，也可以是一个对象：
  + `updater（函数）`： (state, props) => partialState
  + `partialState（对象）`
- 【第二个参数】：可选的`回调函数`：
  + callback：将在 setState 完成合并并重新渲染组件后执行。建议使用 componentDidUpdate() 来代替。

注意：
- updater 函数接收的 state 和 props 保证为`最新`
- callback 中可以拿到最新的 state
- 不管是直接传入的 partialState，还是 updater 的返回值，都会与 state 进行`浅合并`，修改部分状态

```js
add = () => {
  // 初始化 `count` 为 0
  this.setState({
    count: this.state.count + 1,
  }, () => {
    // Vue $nextTick - DOM
    console.log('count by callback', this.state.count) // -> 1
  })
  console.log(this.state.count) // -> 0
}
// 0
// count by callback 1
```

# 了解三件事
## 不要直接修改 State
```js
// Wrong
this.state.name = 'Hello';
```


## State 的更新可能是异步的
基于性能考量，`React 并不会保证 state 的变更会立即生效`，也就是说会有一个`延迟`。

```js
add = () => {
  // 初始化 `count` 为 0
  console.log(this.state.count) // -> 0
  this.setState({
    count: this.state.count + 1,
  })
  console.log(this.state.count) // -> 0
}
```
两次的打印都为 0，似乎说明 setState 的调用是异步的，并不会立即执行。

真的是这样吗？注意官方用词：**可能**

**重点来啦！！！**
>setState 只在 **合成事件和钩子函数**  中表现为：“异步”，在**原生事件和 setTimeout** 中表现为：同步。

其实，setState 本身的执行过程和代码都是同步的。这里的“异步”，并不是说内部代码是异步实现，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”。

### 合成事件中的 setState
React 自己封装了一套事件机制，代理了原生的事件，像在 jsx 中常见的 onClick、onChange 这些都是合成事件。


### 原生事件中的 setState
原生事件是指非 React 合成事件，原生自带的事件监听 addEventListener ，或者也可以用原生 js、jq 直接 document.querySelector().onclick 这种绑定事件的形式都属于原生事件。

```js
componentDidMount() {
    // 自己定义的 DOM 事件，setState 是同步的
    document.body.addEventListener('click', this.bodyClickHandler)
}
componentWillUnmount() {
    // 及时销毁自定义 DOM 事件
    document.body.removeEventListener('click', this.bodyClickHandler)
    // clearTimeout
}
bodyClickHandler = () => {
    this.setState({
        count: this.state.count + 1
    })
    console.log('count in body event', this.state.count) // => 1
}
```

### setTimeout 中的 setState
```js
add = () => {
  setTimeout(() => {
      this.setState({
          count: this.state.count + 1
      })
      console.log('count in setTimeout', this.state.count)
  }, 0)
  console.log(this.state.count) // -> 0
}
// 0
// count in setTimeout 1
```


## State 的更新可能被合并

> 合并更新是**建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新**


### 异步更新存在合并更新
在“异步更新”的过程中，React 会批处理同一周期内的多个 setState，将它们 加入一个 updateQueue 队列。

 
>1. 当 setState() **第一个参数为一个 对象** 时，**并不是依次执行** 队列中的 setState() 调用，而是**先将对象浅合并（shallow merge）（同名参数覆盖）**，再执行更新。

[online-demo](https://codesandbox.io/s/react-setstate-riyhk?file=/src/index.js)
例如，如果在同一周期内一次调用了多个 setState：
```js
add() {
  // 初始化 `count` 为 0
  console.log(this.state.count) // -> 0
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
  console.log(this.state.count) // -> 0
}
```
虽然调用了三次 setState，但多次调用会合并为一次。
所以，count 的值仅增加了 1，而不是 3！

三次调用等同于如下代码：
```js
Object.assign(
  previousState,
  {count: state.count + 1},
  {count: state.count + 1},
  ...
)
```

> 2. 当**第一个参数是 updater 函数**的调用时，会按照调用顺序加入队列，然后 **依次执行更新**。

```js
add() {
  console.log(this.state.count); // -> 0
  this.setState(prevState => ({ count: prevState.count + 1 }));
  this.setState(prevState => ({ count: prevState.count + 1 }));
  this.setState(prevState => ({ count: prevState.count + 1 }));
  console.log(this.state.count); // -> 0
}
```
updater 函数的形式，实现了三次调用 使得 count 增加 3

### 同步更新不存在合并更新

我们再修改一下：
```js
add = () => {
  setTimeout(_ => {
    console.log(this.state.count); // -> 0
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // -> 1
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // -> 3
  }, 0);
};
```
可见，在同步更新的过程中，更新不会被合并。

# 经典面试题
```js
class App extends React.Component {
  state = { val: 0 }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)

    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)

    setTimeout(_ => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val);

      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val)
    }, 0)
  }

  render() {
    return <div>{this.state.val}</div>
  }
}
// 0 0 2 3
```

# 参考文档
- [你真的理解setState吗？](https://juejin.im/post/5b45c57c51882519790c7441)

# 常见面试题
## setState 的合并更新（重要！！！）

## setState 是同步还是异步（重要！！！）



*****************
如果直接 setState 修改数据，状态数据改变后，执行 render 和 DidMount（`最新的state值`）。有一个小坑：`this.setState 本身就是异步的，会通知执行 render，WillMount 中 this.state 的值还是原来的`。
如果将 this.setState 放在一个异步操作中（定时器和异步AJAX获取数据）完成，先执行 render 和 DidMount，然后才异步更改状态数据，因为==异步任务都要等第一次 tick 后（DidMount 执行完）才会执行==。


注意：this.state.n++
```javascript
this.setState({
	n: this.state.n++
});
```
注意：this.state.n++是先执行this.state.n（异步），然后再++（同步），假如n初始值为0，同步++先执行，变为1，主栈空闲时执行异步代码，又变为0。
*****************
