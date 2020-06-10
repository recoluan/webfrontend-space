目录

[TOC]

# React-模拟数据双向绑定
框架最重要的核心思想就是：数据操控视图（视图影响数据），告别JQ手动操作DOM的时代。
在react中，
- 基于数据驱动（修改状态数据，react会重新渲染视图）完成的组件叫做受控组件（受数据控制的组件）
- 基于ref操作DOM实现视图更新的，叫做非受控组件
=>真实项目建议使用受控组件

react：[MVC] 数据更改视图跟着更改（原本是单向数据绑定）
但是可以构建出双向的效果。
使用change事件
```javascript
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Joe'
        }
    }

    render() { return (
        <div>
            <h1>I'm {this.state.name}</h1>
            <input
                type="text"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
            />
        </div>
    )}
}
```

# 面试高频题目
1. React 是怎么模拟双向数据绑定，原理
Vue 有双向数据绑定，主要用于处理表单。
React 官方一直提倡单向数据流的思想：通过 “value” 属性实现 Model => View 的数据流，通过绑定 “ onChange” Handler 实现 View => Model 的数据流。