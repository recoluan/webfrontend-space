目录

[TOC]


# 组件之间通信
## 父子组件

父 通过 Props 传给 子，子 通过调用 父 传来的函数 修改父组件的数据，相当于向 父 传递。
特点：典型的单向数据流，只能父传子，不能子传父


## 兄弟组件（平行组件）
平行组件：兄弟组件或毫无关系的两个组件。

让两个兄弟组件有一个共同的父组件，一个兄弟组件把 父 传过来的函数执行，修改 父 中的数据，这样另一个 兄弟组件的数据也就改变了。


## 跨层级组件（传给所有后代）
Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树
```js
// 1. 使用 React.createContext(defaultValue)，创建一个 Context 对象。
const MyContext = React.createContext();

class App extends React.Component {
  render() {
    // 2. 使用 Provider 的 value 属性 来将当前的值 传递下去。
    // 无论多深，任何组件都能读取这个值。
    const user = {};

    return (
      <MyContext.Provider value={user}>
        <AppLayout />
      </MyContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递了。
function AppLayout() {
  return (
    <div>
      <Page />
    </div>
  );
}

class Page extends React.Component {
  // 使用：1. 指定 contextType 读取当前的 Context 对象
  // static contextType = MyContext;
  // render() {
  //   return <XXXComponent user={this.context} />;
  // }

  // // 使用：2. Context.Consumer
  // render () {
  //   return (
  //     <MyContext.Consumer>
  //       {value => /* 基于 context 值进行渲染*/}
  //     </MyContext.Consumer>
  //   );
  // }

  // 使用：3. useContext
  const user = useContext(MyContext);
  
  render() {
    return <XXXComponent user={user} />;
  }
}
```

特点：一旦父组件设置了上下文信息，它的后代组件都可以直接拿来用，不需要一层层传递。

## 任意组件
基于 redux 进行状态管理（常用），可以解决上述所有的通信情况。


# 面试高频题目
1. 组件之间通信方式 *
2. Context 是什么，有何用途？