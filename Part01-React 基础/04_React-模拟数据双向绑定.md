目录

[TOC]

# React-模拟数据双向绑定
Vue 底层使用 Object.defineProperty 来实现双向数据绑定。
React 不是，但可以 change 事件来模拟实现
React 单向数据流，但可以 通过 onChange 事件来模拟数据双向绑定。

- 通过 value 属性，实现 Model => View 的数据流的更新
- 通过绑定 onChange Handler，实现 View => Model 的数据流的更新
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

# 常见面试题
## React 是怎么模拟双向数据绑定，原理
