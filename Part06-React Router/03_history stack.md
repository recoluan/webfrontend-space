目录

[TOC]

# history stack
受路由管控组件的特点：
- 只有当前页面的哈希地址和路由指定的地址匹配，才会把对应的组件渲染。
withRouter 比较特殊：如果没有地址匹配，会被模拟为受路由管控的
- 路由切换的原理：凡是匹配的路由，都会把对应的组件内容重新添加到页面中，相反，不匹配的都会在页面中移除掉，下一次重新匹配上，组件需要重新渲染到页面中：每一次路由切换时（页面的哈希路由地址改变），都会从一级路由开始重新校验一遍。
- 所有受路由管控的组件，在组件的属性上，都默认添加了3个属性：		
	+ history：
		- go()：跳转到指定的地址（数字：0-当前，-1-上一个，-2上两个）
		- push()：向池子中追加一条新的信息，达到切换到指定的路由地址的目的。
		- goBack()：相当于go(-1)，回退到上一个地址
		- goForward()：相当于go(1)，向前走一步
	+ location：获取当前哈希路由渲染组件的一些信息 
		- pathname：当前哈希路由地址
		- search：当前页面的问号传参值
		- state：基于Redirect/Link/NavLink中的to，传递的是一个对象，对象中编写的state，就可以在location.state中获取到
	+ match：获取的是当前路由匹配的结果
		- params：获取的是当前路由匹配的是`地址路径参数`，则这里可以获取传递参数的值
		- path：当前路由路径
		- url：当前路由路径
方法：this.popps.history.push('/plan')

history stack：历史信息栈（池子）
每一次路由的切换，不是替换现有的地址，就是新增一条地址。

`基于render返回的组件是不受路由管控的组件`，没有这三个属性。

# [列表详情模型]
在SPA路由管控的项目当中，从列表跳转到详情，需要传递一些信息给详情组件，以此来展示不同的信息，传递给详情页信息的方式有：
[不推荐的]
- 本地存储
- redux存储
=>点击列表中某一项时，把信息存储到本地或redux中，跳转到详情页面，把信息从本地或redux中获取即可

[推荐]
- `问号传参`（随便刷新）
```
    //list页
    <Link to={{
        pathname: '/custom/detail',
        search:`?id=${id}`
    }}>
        //...
    </Link>
    //detail页
    let search = this.props.location.search,//'?id=1'
        curID = qs.parse(search.substr(1)).id || 0;
    curID = parseFloat(curID);
```
- `基于state传值`（弊端：一旦页面刷新，上一次传递的state值就没有了）
适合支付页面。
```js
    //list页
    <Link to={{
        pathname: '/custom/detail',
        state:`${id}`
    }}>
        //...
    </Link>
    //detail页
    let state = this.props.location.state,//'1'
        curID = state || 0;
    curID = parseFloat(curID);
```
- `URL地址参数`：（把参数当做地址的一部分）
path = 'custom/detail/:id'
第一步：在路由中配置动态路径参数
```js
	//custom页
	<Route path='/custom/detail/:id' component={Detail}/>
```
第二步：
```js
	//list页
    <Link to={{
        //pathname: '/custom/detail',
        pathname: `/custom/detail/${id}`,//3.URL地址参数
    }}>
        //...
    </Link>
```
第三步：this.props.match.params.id 或者 useParams 来获取
```js
  import { useParams } from 'react-router-dom';
	// detail页
	const params = this.props.match.params, // { id: "34"}
  
  // const { id } = useParams();
```

# 案例
1. 真实项目，数据请求一般在dispatch的ActionCreator中完成，目的是把获取到的信息存储到reducer中
`redux的作用`：
- 多个平行组件的信息共享
- 临时存储从服务器获取的数据，保证在路由切换组件重新渲染组件，防止频繁向服务器发送请求。


2. 从服务器获取信息
- 方案一：
当前组件第一次渲染，返回''，什么也没有，然后在DidMount中发送一个ajax请求（异步），当请求任务完成，通过修改当前组件的内部状态信息，重新渲染组件
 弊端：只要组件重新渲染，就会向服务器发送请求，而我们很多时候都要基于路由进行切换，每一次切换路由，当前组件就会重新被渲染，组件的内容并没有更新，性能不好

- 方案二：
在redux容器中，设定一个初始值baseInfo，初始化为null，用于存储个人信息。
每一次加载组件，验证baseInfo的值。
-> 如果没有信息，基于dispatch派发一个任务（获取服务器端的数据，发送给reducer，并且修改容器中的reducer，组件重新渲染）
-> 如果有信息，直接渲染组件，而不需要重新派发任务，也就是不再重新发送ajax请求。

# 面试高频题目