目录

[TOC]

# 带上问题

1. 什么是JSX？大括号里放基本值、引用类型的值、表达式什么区别？
2. 讲一讲JSX渲染机制？
  - 渲染的目的
  - 涉及到的两个函数各自的作用

# JSX语法
JSX：`JavaScript + XML（HTML）`
JSX 可以创建一个 `React 元素`。每一个 JSX 只能有一个根元素。

和之前拼接的 HTML 字符串类似，都是把 HTML 结构代码和 JS 代码或者数据混合在一起，但它不是字符串。

1. `JSX中的{}`：存放JS代码，可以将数据嵌入到JSX中。
- 基本类型的值
	+ 布尔类型：什么都不显示
	+ null/undefined：也是 JSX 元素，代表的是空

- 引用类型的值：
	+ 不能直接放对象（除了给 style 赋值）
	+ 数组（数组中不能有对象，基本值或 JSX 元素可以）
	+ 函数不行（`自执行函数可以`）
```javascript
  ReactDOM.render(<div>
      <h2>{{name:'xxx'}}</h2>     NO
      <h3>{new Date()}</h3>       NO
      <h3>{[12,23,34]}</h3>       OK
      <h4>{(() => {
          return '呵呵';          OK：嵌入自执行函数的结果
      })()}</h4>
    <p>
        {(function some() {
            console.log(1);      OK：不管是否有返回值
        })()}
    </p>
  </div>, root);
```

- JS表达式：但是要求执行完有`返回的结果`
	+ 使用三元运算符解决判断操作，（if 和 switch 都不可以）	
	+ 循环数组（map 方法）创建 JSX 元素列表，设置唯一的 key 值
```javascript
  //data：数组，存放的是对象（包含name和age两个属性）
  ReactDOM.render(<ul>
      {
          data.map((item, index) => {
	          let {name, age} = item;
              return <li key={index}>
                  {name：}&nbsp;&nbsp;{age}
              </li>;
          })
      }
  </ul>, root);
```
2. 给 JSX 元素设置属性：
属性值对应大括号中`对象、函数都可以放`（也可以放JS表达式）
- style 属性值必须是对象（不能是样式字符串）
- class 用 className 代替


# JSX 渲染机制
目的：把 JSX（虚拟 DOM）变为真实的 DOM。

1. 第一步，基于 babel 中的语法解析模块（babel-preset-react）把 JSX 语法编译为 React.createElement(...)
babel 是一个强大的正则解析库。

2. 第二步，执行 **React.createElement(type, props, children)**，创建一个对象（这个对象就是虚拟 DOM）
这个对象的属性有
	+ type：标签名 或者组件（首字母大写）
	+ props：一个对象，存放的是这个标签上的属性，没有是 null
		+ id
		+ className
		+ style
		+ children：存放的是元素中的内容
	+ ref：
	+ key
	+ ...
	+ \__proto__：Object.prototype
3. 第三步，基于 render 方法，把动态生成的虚拟 DOM 元素，插入到指定的容器中
**ReactDOM.render([JSX],[container],[callback])**;
	+ JSX：`React 虚拟元素`
	+ container：容器，把元素放到页面中的那个容器中，不建议把 JSX 直接渲染到 document.body 中，一般挂载到一个 ID 为 root 的 div（根节点）中。
	+ callback：把内容放到页面中呈现触发的回调函数
```javascript
ReactDOM.render(<div>
    //...
</div>, document.getElementById('root'));
```

```js
<div class="container" style="font-size: 12px">
  <h1 class="greeting">
    Hello, world!
  </h1>
</div>

```
等同于使用 React.createElement() 创建了一个这样的对象：
```js
{
  type: 'div',
  props: {
    className: 'container',
    style: 'font-size: 12px',
    children: [
      {
        type: 'h1',
        props: {
          className: 'greeting',
          children: 'Hello, world!'
        }
      }
    ]
  }
}
```

# 常见面试题
## JSX 本质是什么