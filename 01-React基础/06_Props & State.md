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




# 面试高频题目
1. props 和 state 的区别






