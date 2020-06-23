目录

[TOC]



react-redux是把redux进一步封装，适配react项目。
在组件调取使用时，可以优化一些步骤：

# Provider：根组件
当前整个项目都在 Provider 组件下，作用就是把创建的 store 可以供内部任何后代组件使用。（基于上下文完成的）

- Provider 只有一个子元素
- 只需要把创建的 store，基于属性传递给 Provider（后代就都可以使用这个 store 了）

```js
ReactDOM.render(<Provider store={this.props.store}>
	//=>只允许出现一个子元素
</Provider>, root);
```

# connect：高阶组件
connect：高阶组件，将 dispatch 作为 props 注入到 组件中

- 导出的不再是创建的组件了，而是基于connect构造后的高阶组件。（删掉组件前面的export default）
语法：`export default connect([mapStateToProps], [mapDispatchToProps])([自己创建的组件])`

```javascript
//...=>自己创建的类
//=>把redux容器中的状态信息遍历，赋值给当前组件的属性（state）
let mapStateToProps = state => {
	//=>state：就是redux中的状态信息
	//=>返回的是啥，就把啥挂载到当前组件的属性上
	return {
		...state.todo
	};
}
//=>遍历redux中的dispatch派发行为，也赋值给组件的属性（ActionCreator）
let mapDispatchToProps = dispatch => {
	//=>dispatch：store中存储的dispatch方法
	return {
		add(payLoad) {
            dispatch(action.todo.add(payLoad));
        }
		//...
	};
}
export default connect(mapStateToProps, mapDispatchToProps)([自己创建的组件])
```
可以进一步简化代码：
```JavaScript
//...=>自己创建的类
export default connect(state =>({...state.todo}), action.todo)([自己创建的组件]);//=>为什么这么写可以：react-redux把ActionCreator中编写的方法（返回action对象的方法），自动构建成dispatch派发任务的方法，也就是mapDispatchToProps这种格式
```
- 基于subscribe向事件池追加方法，一达到容器状态信息改变，执行我们追加的方法，重新渲染组件的目的，但是现在不用了，react-redux帮我们做了这件事：所有用到redux容器状态信息的组件，都会向事件池中追加一个方法，当状态信息改变，通知方法执行，把最新的状态信息作为属性传递给组件，组件值重新改变了，组件就会重新渲染了。

这样配置之后，所有基于connect挂载到当前组件中的属性，只需要`this.props.[属性名]`来获取使用就可以了。





# 面试高频题目


