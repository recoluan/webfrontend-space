目录

[TOC]

# 带上问题

1. 什么是JSX？大括号里放基本值、引用类型的值、表达式什么区别？
2. 讲一讲JSX渲染机制？
  - 渲染的目的
  - 涉及到的两个函数各自的作用

# JSX语法
JSX：`JavaScript + XML（HTML）`
JSX可以创建一个 `React 元素`。每一个JSX只能有一个根元素。

和之前拼接的HTML字符串类似，都是把HTML结构代码和JS代码或者数据混合在一起，但它不是字符串。

1. `JSX中的{}`：存放JS代码，可以将数据嵌入到JSX中。
- 基本类型的值
	+ 布尔类型：什么都不显示
	+ null / undefined：也是JSX元素，代表的是空

- 引用类型的值：
	+ 不能直接放对象（除了给style赋值）
	+ 数组（数组中不能有对象，基本值或JSX元素可以）
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
	+ 使用三元运算符解决判断操作，（if和switch都不可以）	
	+ 循环数组创建JSX元素（一般都是基于数组的map方法完成迭代），需要给创建的元素设置唯一的key值（当前本次循环内唯一即可）
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
2. 给JSX元素设置属性：
属性值对应大括号中`对象、函数都可以放`（也可以放JS表达式）
style属性值必须是对象（不能是样式字符串）
class用className代替


# 渲染
目的：把JSX（虚拟DOM）变为真实的DOM。
JSX渲染机制：
1. 第一步，基于babel中的语法解析模块（babel-preset-react）把JSX语法编译为React.createElement(...)
babel是一个强大的正则解析库。

2. 第二步，执行 React.createElement(type, props, children)，创建一个对象（这个对象就是虚拟DOM）
这个对象的属性有
	+ type：标签名
	+ props：一个对象，存放的是这个标签上的属性
		+ id
		+ className
		+ style
		+ children：存放的是元素中的内容
	+ ref：
	+ key
	+ ...
	+ \__proto__：Object.prototype
3. 第三步，基于render方法，把动态生成的虚拟DOM元素，插入到指定的容器中
ReactDOM.render([JSX],[container],[callback]);
	+ JSX：`React虚拟元素`
	+ container：容器，把元素放到页面中的那个容器中，不建议把JSX直接渲染到document.body中，一般挂载到一个ID为root的div中（根节点）。可以基于document.getElementById('root')获取，也可以直接写root。
	+ callback：把内容放到页面中呈现触发的回调函数
```javascript
ReactDOM.render(<div>
    //...
</div>, document.getElementById('root'));
```


# 面试高频题目(本节无)