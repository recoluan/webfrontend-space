目录

[TOC]

# 异步 action
![async-action](https://user-images.githubusercontent.com/22387652/85961201-67e10d00-b9db-11ea-8bb7-83e94ae68e6f.png)



同步 action 一般返回 action 对象，异步 action 通过使用 Redux Thunk middleware，支持返回函数，这个函数会被 middleware 执行。

这个函数，并不需要保持纯净：
- 可以带有副作用，包括执行异步 API 请求
- 可以 dispatch action




# redux 中间件

默认情况下，createStore() 所创建的 Redux store 没有使用 middleware，所以只支持 同步数据流。
异步 action 创建函数 **使用前提**：在 dispatch 机制中引入  middleware。
```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// 可以使用 applyMiddleware() 来增强 createStore()
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // 多个中间件会按顺序执行
)
```


常用中间件：
- **redux-thunk**：支持 dispatch function
- **redux-promise**：支持 dispatch 一个异步的 Promise action，并且在 Promise resolve 后可以 dispatch 一个普通的 action。注意：action 传递的参数`只能是 payload`
- **redux-saga**：
- **redux-logger**：能够在控制台清晰的展示出，当前 redux 操作的流程和信息。（原有状态、派发信息、修改后的状态信息）


# Middleware 原理
> Middleware 提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。

![middleware](https://user-images.githubusercontent.com/22387652/85962710-b7780680-b9e4-11ea-96c0-88fc2d09798c.png)

如图所示，**Middleware 对 dispatch 做了改造**，每一个 middleware 会继续传递 actions 给下一个 middleware。

**当 middleware 链中的最后一个 middleware 开始 dispatch action 时，这个 action 必须是一个普通对象。** 也就是 任意多异步的 middleware 之后，要使用普通对象作为最后一个被 dispatch 的 action 来回归同步。

```js
// 自己修改 dispatch，增加 logger
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    next(action);
    console.log('next state', store.getState());
}
```

# 面试高频题目
1. 异步 action *
2. 中间件 *
3. 实现一个 redux-thunk、redux-promise