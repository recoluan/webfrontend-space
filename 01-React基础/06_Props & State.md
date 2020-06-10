目录

[TOC]


# 属性（props）
>props 的`[只读性]`:
组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。

1. defaultProps
我们无法修改Props的值，但是可以设置默认值或者设置一些校验规则
```js
static defaultProps = {
    name: 'haha'
};
```

2. PropTypes
安装 prop-types 库：进行类型检查（设置的规则不会影响组件渲染，但会在控制台抛出警告错误）。
```js
static propTypes = {
    name: PropTypes.string.isRequired,
};
```


# 状态（state）
> state 的`[可读写性]`
state 是组件的`内部状态数据`，在 constructor 中初始化，可以通过 this.state.xxx 来获取，通过 this.setState() 修改。

```javascript
    constructor() {
        super();
        this.state = {
            //...
        };
    }
```

# 区别
- props 是父组件传递过来的，state 是私有的，并且完全受控于当前组件
- props 是只读的，state 可以通过 this.setState 修改


# setState()
## 基本语法
> Component.prototype.setState(updater/partialState[, callback])

- 【第一个参数】：可以是一个函数，也可以是一个对象：
  + `updater（函数）`： (state, props) => partialState
  + `partialState（对象）`
- 【第二个参数】：可选的`回调函数`：
  + callback：将在 setState 完成合并并重新渲染组件后执行。建议使用 componentDidUpdate() 来代替。

注意：
- updater 函数接收的 state 和 props 保证为`最新`。
- 不管是直接传入的 partialState，还是 updater 的返回值，都会与 state 进行`浅合并`，修改部分状态。

## 了解三件事
### 不要直接修改 State
```js
// Wrong
this.state.name = 'Hello';
```

### State 的更新可能是异步的
基于性能考量，`React 并不会保证 state 的变更会立即生效`，也就是说会有一个`延迟`。

```js
handle() {
  // 初始化 `count` 为 0
  console.log(this.state.count) // -> 0
  this.setState({ count: this.state.count + 1 })
  console.log(this.state.count) // -> 0
}
```
两次的打印都为 0，似乎说明 setState 的调用是异步的，并不会立即执行。

真的是这样吗？注意官方用词：**可能**

**重点来啦！！！**
>setState 只在`合成事件和钩子函数`中表现为：“异步”，在`原生事件和 setTimeout` 中表现为：同步。

其实，setState 本身的执行过程和代码都是同步的。这里的“异步”，并不是说内部代码是异步实现，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”。


### State 的更新可能被合并
setState() 是异步的，在同一周期内会对多个 setState 进行批处理。

在一个周期的批量执行过程中，React 内部会创建一个 updateQueue，当 setState() 第一个参数为一个`对象`时，`并不是依次执行`队列中的 setState() 调用，而是`先将对象浅合并（shallow merge）`，再执行更新。

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

三次调用等同于如下代码：
```js
Object.assign(
  previousState,
  {count: state.count + 1},
  {count: state.count + 1},
  ...
)
```
后调用的 setState 将覆盖同一周期内先调用 setState 的值（同名参数覆盖）。所以，count 的值仅增加了 1，而不是 3！

如果想要实现三次调用 使得 count 增加 3，可以使用 updater 函数的形式：
```js
add() {
  console.log(this.state.count); // -> 0
  this.setState(prevState => ({ count: prevState.count + 1 }));
  this.setState(prevState => ({ count: prevState.count + 1 }));
  this.setState(prevState => ({ count: prevState.count + 1 }));
  console.log(this.state.count); // -> 0
}
```
第一个参数是 `updater 函数`的调用，会按照调用顺序加入队列，然后`依次执行更新`。

我们再修改一下：
```js
add = () => {
  setTimeout(_ => {
    console.log(this.state.count); // -> 0
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // -> 3
  }, 0);
};
```
注意：合并更新是`建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新`。


# 参考文档
- [你真的理解setState吗？](https://juejin.im/post/5b45c57c51882519790c7441)

# 面试高频题目
1. props 和 state 的区别

2. setState() 的合并更新 *

3. setState 是同步还是异步？*





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
