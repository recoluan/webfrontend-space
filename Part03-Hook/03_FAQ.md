目录

[TOC]


- [4个问题带你进阶React Hooks](https://segmentfault.com/a/1190000022163955#item-4-7)
- [React Hooks 你真的用对了吗？](https://zhuanlan.zhihu.com/p/85969406)

# Hook 规则
1. 只在函数最顶层使用 Hook。不要在循环，条件或嵌套函数中调用
  -》可以将条件判断放置在 effect 中
  -》Hook 的调用顺序，需要在多次渲染之间保持一致
2. 只在 React 函数组件、自定义的 Hook 中调用 Hook。不要在普通的 JS 函数中调用

为什么 Hooks 不要在循环，条件或嵌套函数中调用==？？？==
Hooks 的串联不是一个数组，但是是一个链式的数据结构。从根节点 workInProjessHook 向下通过 next 进行串联。

这是因为 React 需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或条件分支语句中调用 Hook，就容易导致调用顺序的不一致性，从而产生难以预料到的后果。



# 常见面试题
## 说一下 React Hooks 在平时开发中需要注意的问题和原因？
1. 只在函数最顶层使用 Hook。不要在循环，条件或嵌套函数中调用
2. useState 设置状态的时候，只有第一次生效，后期需要更新状态，必须通过 useEffect

在调用 TableDeail 的父组件里面，我们通过 set 改变 columns 的值，每次传递给 TableDeail 的 columns 都是最新的值。但是，实际 tabColumn 只在 TableDeail 第一次渲染时拿到了最新的值，后续不会随着 columns 的更新而更新。
```js
const TableDeail = ({
    columns,
}:TableData) => {
    const [tabColumn, setTabColumn] = useState(columns) 
    // 正确的做法是通过 useEffect 改变这个值
    useEffect(() =>{setTabColumn(columns)},[columns])
}
```