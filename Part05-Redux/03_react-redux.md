目录

[TOC]



react-redux 是对 redux 的进一步封装，适配 react 项目。


# Provider store
## API 使用
> **将根组件嵌套在 \<Provider> 中**，后代组件就可以获得 Redux store，使用 connect() 方法。（基于**上下文**完成的）

属性：
- store (Redux Store): 应用程序中唯一的 Redux store 对象
- children (ReactElement) 组件层级的根组件。
```js

ReactDOM.render(
  <Provider store={store}>
    //=>只允许出现一个根元素
  </Provider>,
  rootEl
)
```
配合 React Router 一起使用：
```js
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App}>
          <Route path="foo" component={Foo} />
          <Route path="bar" component={Bar} />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
```

## Provider 原理
```js
import React from 'react';
import PropsTypes from 'prop-types';

/*
* Provider：当前项目的根组件
*  1.接收通过属性传递过来的 store，把 store 挂载到上下文当中=>当前项目中的任何组件，都可以通过上下文获取 redux 中的 store
*  2.在组件的 render 中，把传递给 provider 的子元素渲染
* */
class Provider extends React.Component {
    //=>设置上下文信息的类型
    static childContextTypes = {
      store: PropsTypes.object
    };

    //=>设置上下文信息值
    get ChildContext() {
      return {
        store: this.props.store
      };
    }

    constructor(props, context) {
      super(props, context);
    }

    render() {
      return this.props.children;
    }
}
```

# connect
## API 使用
connect: 连接 React 组件与 Redux store。把 store 中的数据挂载到当前组件中。


语法：
> connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])([自己创建的组件])

- 返回一个注入了 state 和 action creator 的 React 高阶组件。

1. mapStateToProps
- 监听 Redux store 的变化。只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。

2. mapDispatchToProps
```js
const mapStateToProps = state => ({
  ...state.todo
})

/**
* 函数将接收一个 dispatch 函数
* 返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起
*/
const mapDispatchToProps = dispatch => ({
	add(params) {
    dispatch(action.todo.add(params));
  }
})

//...

export default connect(mapStateToProps, mapDispatchToProps)([自己创建的组件])
```

基于 subscribe 向事件池追加方法，一达到容器状态信息改变，执行我们追加的方法，重新渲染组件的目的，但是现在不用了，react-redux 帮我们做了这件事：所有用到 redux 容器状态信息的组件，都会向事件池中追加一个方法，当状态信息改变，通知方法执行，把最新的状态信息作为属性传递给组件，组件值重新改变了，组件就会重新渲染了



## connect 原理
> connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)

**connect 是一个返回高阶组件的高阶函数！高阶函数执行返回已经连接 Redux store 的组件。**

```js
/*
* 1. connect(mapStateToProps, mapDispatchToProps)
*   @params：mapStateToPropsmapDispatchToProps
*   @return：返回一个新的函数 connectHOT
*
* 2. connectHOT(WrappedComponent) 执行
*   @params：传递进来要操作的组件 WrappedComponent，需要把指定的属性和方法都挂载到当前组件的属性上
*   @return：返回一个新的组件 Proxy（代理组件），在代理组件中，我们要获取 Provider 在上下文中存储的 store，紧接着获取 store 中的 state 和dispatch，把 mapStateToProps 和 mapDispatchToProps 回调函数执行，接收返回的结果，再把这些结果挂载到 Component 这个要操作组件的属性上
*
* */
function connect(mapStateToProps, mapDispatchToProps) {
    return function connectHOT(Component) {
        return class Proxy extends React.Component {
            //=>获取上下文中的 store
            static contextTypes = {
                store: PropsTypes.object
            };

            //=>获取 store 中的 state/dispatch，把传递的回调函数执行，接收返回的结果
            constructor(props, context) {
                super(props, context);
                this.state = this.queryMountProps();
            }

            //=>基于 redux 中的 subscribe 向事件池中追加一个方法，当容器中的状态改变，我们需要重新获取最新的状态信息，并且重新把 Component 渲染，把最新的状态信息通过属性传递给 Component
            componentDidMount() {
                this.context.store.subscribe(() => {
                    this.setState(this.queryMountProps());
                });
            }

            //=>渲染 component 组件，并且把获取的信息（状态、方法）挂载到组件的属性上
            render() {
                return <Component {...this.state} {...this.props} />
            }

            //=>从 redux 中获取最新的信息，基于回调函数筛选，返回的是需要挂载到组件属性上的信息
            queryMountProps = () => {
                const { store } = this.context,
                    state = store.getState();

                const propsState = typeof mapStateToProps === 'function' ? mapStateToProps(state) : {};

                const propsDispatch = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(store.dispatch) : {};

                return {
                    ...propsState,
                    ...propsDispatch
                };
            }
        }
    }
}

```

# 常见面试题
1. connect 原理 *


