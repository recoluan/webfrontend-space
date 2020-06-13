目录

[TOC]


# 属性（props）
>props 的`[只读性]`:
组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。

1. defaultProps
我们无法修改Props的值，但是可以设置默认值或者设置一些校验规则
```js
static defaultProps = {
    name: 'haha'
};
```

2. PropTypes
安装 prop-types 库：进行类型检查（设置的规则不会影响组件渲染，但会在控制台抛出警告错误）。
```js
static propTypes = {
    name: PropTypes.string.isRequired,
};
```


# 状态（state）
> state 的`[可读写性]`
state 是组件的`内部状态数据`，在 constructor 中初始化，可以通过 this.state.xxx 来获取，通过 this.setState() 修改。

```javascript
    constructor() {
        super();
        this.state = {
            //...
        };
    }
```

# 区别
- props 是父组件传递过来的，state 是私有的，并且完全受控于当前组件
- props 是只读的，state 可以通过 this.setState 修改


# 不可变值

遇到数组、对象，使用**不可变值**：**一旦创建不可修改，任何修改、添加、删除操作都应该返回一个新的数组或对象**。这是函数式编程的概念。

为什么一定要使用不可变值呢？

因为数组、对象是一个引用，**React 执行 diff 算法时比较的是引用的地址，而不是两个对象**。所以直接修改原对象，引用值不发生改变的话，React 不会重新渲染。

>数组：
一般不使用 push()、pop() 直接操作原数组
可以使用 slice() 深克隆一个新数组，或者 concat()、filter()、map() 返回一个新数组。 
```js
onAddTask = () => {
  const { tasks, onChange } = this.props;

  const originTasks = tasks.slice();

  originTasks.push({
    id: Math.max(...originTasks.map(option => option.id)) + 1,
  });

  onChange(originTasks);
}
onChangeIndex = (id, index) => {
  const { tasks, onChange } = this.props;

  const originTasks = tasks.slice();

  originTasks.forEach(option => {
    if (option.id === id) {
      option = {
        ...option,
        index,
      };
    }
  });

  onChange(originTasks);
}
// 追加
// tasks.concat(100)
// [tasks, 100] 
```

>对象：
一般使用扩展运算符（...），或者 Object.assign()
```js
this.setState({
    obj1: Object.assign({}, this.state.obj1, {
      a: 100,
    }),
    obj2: {
      ...this.state.obj2,
      a: 100,
    }
})
```

# 面试高频题目
1. props 和 state 的区别






