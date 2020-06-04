目录

[TOC]

# useContext
语法：
```js
const value = useContext(MyContext);
```
- 接收一个 context 对象（React.createContext 的返回值）
- 返回该 context 的当前值，由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定


使用：
1. useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。
2. useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。


# useReducer
语法：
```js
const [state, dispatch] = useReducer(reducer, initialState, init);
```
- 第一个参数：接收一个形如 (state, action) => newState 的 reducer
- 第二个参数：指定初始 state。不使用 state = initialState Redux 的参数约定
- 第三个参数：init(initialState) 函数，惰性地创建初始 state

并返回当前的 state 以及与其配套的 dispatch 方法。

适用于：state 逻辑较复杂且包含多个子值

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

# useCallback
语法：
```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
将 内联回调函数及依赖项数组 作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数**仅在某个依赖项改变时才会更新**。

> useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

[online-demo](https://codesandbox.io/s/hook-base-7cc8j?file=/src/UseCallbackExample.js)