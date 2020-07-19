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
import logger from 'redux-logger'
import rootReducer from './reducers'

// 可以使用 applyMiddleware() 来增强 createStore()
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger) // 多个中间件会按倒叙执行，先执行 logger，再执行 thunk
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



# applyMiddleware 原理
我们先来看 compose 聚合函数的实现原理：
> compose(f, g, h) 等同于 (...args) => f(g(h(...args)))
```js
const fn1 = (x) => x + 'a';
const fn2 = (y) => y * 2;

console.log(compose(fn1, fn2)(1, 55)); // 输出什么？ 2a
```
compose 的简单模拟：
```js
function compose(...funcs) {
    return funcs.reduce((pre, cur) => { 
      return (...args) => { 
        return pre(cur(...args))        
    }    
})}
```
ES6 语法简化一下：
```js
function compose(...funcs) {
  return funcs.reduce((pre, cur) => (...args) => pre(cur(...args)))
}
```

```js
// 调用 applyMiddlewareapplyMiddleware(thunk, logger)

function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args);

        let dispatch = () => {
            throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.')
        };

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (...args) => {
                return dispatch(...args),
            },
        };
        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);

        return {
          ...store,
          dispatch,
        };
    }
}
```
可以看到 **dispatch = compose(...chain)(store.dispatch)** 这行关键代码，Redux为了支持中间件，**内部重写了原来的 dispatch 方法**，同时最后传入原来的 store.dispatch 方法，也就是将原来的 disptach 方法也当做中间件处理了 ==???==
分析到这里，我们可以知道传入的中间件被 compose 函数聚合后改写 dispatch 方法，所以我们也可以理解成**中间件是对 dispatch 方法的增强**，比如说：增强 dispatch 函数对 action 函数、Promise 的处理


# redux-thunk 的实现
一个Redux中间件的**基本形式（结构）**如下：==???==
```js
// 中间件逻辑代码需要经过三次柯里化
store => next => action => {
  // 中间件逻辑代码
}
```
根据这个中间件结构，我们来分析redux-thunk中间件的源码：
```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {  
    // 如果是函数 thunk来处理   
    if (typeof action === 'function') {      
      return action(dispatch, getState, extraArgument);    
    }    
    // 其它处理不了，交给下一个中间件处理   
    return next(action); 
  };
}
  
const thunk = createThunkMiddleware();
```

# redux-promise 的实现
```js
const testRes = () => {      
  return new Promise((res, rej) => {         
    res({              
      type: 'TEST_RESOLVE'          
    })      
  });  
}  
store.dispatch(testRes());

// redux-promise简易版源码
const vanillaPromise = store => next => action => {  
  // 判断不是 Promise对象，交给下个中间件处理 
  if (typeof action.then !== 'function') {  
    return next(action) 
  } 
  // action为 Promise 对象，promise 中间件能做处理
  // 最后异步执行完触发执行 store.dispatch ---> (...args) =>  dispatch(...args)
  return Promise.resolve(action).then(store.dispatch);
}
```

# redux-logger 的实现
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
1. redux 如何进行异步请求？
  - 异步 action *
  - redux-thunk
2. 中间件 *
3. 实现一个 redux-thunk、redux-promise