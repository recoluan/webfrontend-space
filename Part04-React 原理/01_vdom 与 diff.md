目录

[TOC]


# vdom
vdom 是 Virtual DOM 的简写。

引入 vdom 背景：
1）DOM 操作非常耗费性能
2）jQuery 可以手动控制 DOM 操作优化性能
3）Vue 和 React 是数据驱动视图，增加了业务复杂度，如何在框架内部有效控制 DOM 操作优化性能？

解决方案：将计算次数、视图更新次数转移为 JS 计算，因为 JS 执行速度非常快。

vdom：用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM。

## JS 模拟 DOM 结构
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


# diff
React 的 render() 方法，会创建一棵由 React 元素组成的树。在下一次 state 或 props 更新时，相同的 render() 方法会返回一棵不同的树。


diff 即对比，对比两颗树，是一个广泛的概念，并不是 vdom 独有的，比如 git diff。
DOM 通过 JS 进行模拟、进行计算、进行对比，找出最小的更新范围，这个对比的过程就是 diff 算法。

diff 算法是 vdom 中最核心、最关键的部分。

## 传统 diff 算法
传统 diff 算法 通过循环递归对节点进行依次对比，算法时间复杂度达到 **O(n^3)**：
第一，遍历 tree1；第二，遍历 tree2，第三，排序。

O(n^3) 的含义：3 次循环，1000 个节点，要计算 1000^3 即 1亿次，数据量大，算法不可用，冒泡排序最多到 O(n^2)
O(n) 的含义： 1000 个节点，计算 1000 次

## react diff
React 通过定制大胆的 diff 策略，将 O(n^3) 复杂度 转化为 O(n) 复杂度：
- DOM 节点跨层级的移动操作少，可以忽略不计

### tree diff
优化时间复杂度到 **O(n)**：
> **只比较同一层级，不跨级比较**
> - **tag 不相同**，则直接删掉重建，不再深度比较
> - **tag 和 key ，两者都相同**，则认为是相同节点，不再深度比较

同一层级的节点比较，就是对相同颜色方框内的 DOM 节点进行比较，如图：
![同一层级的diff](https://user-images.githubusercontent.com/22387652/87111323-a90ad400-c29b-11ea-8770-f3541558af9e.png)

如果遇到 tag 不相同：
![tag不同的diff](https://user-images.githubusercontent.com/22387652/87111366-c63fa280-c29b-11ea-9c8f-0fa8253bb872.png)

则会直接删掉 D 节点，创建 G 节点，不会再比较下一层级的 E、F 节点。


可能都存在这样的**疑问**：***如果出现了 DOM 节点跨层级的移动操作***，React diff 会有怎样的表现呢？

如图所示：
![跨层级的diff](https://user-images.githubusercontent.com/22387652/87259752-245cc780-c4e0-11ea-9154-1fc0ac50b908.png)

React 对于不同层级的节点，只有创建和删除操作。当根节点发现子节点中 A 消失了，就会直接销毁 A；当 D 发现多了一个子节点 A，则会创建新的 A（包括子节点）。
此时，React diff 的执行情况：create A -> create B -> create C -> delete A。

这是一种影响 React 性能的操作，因此 React 官方建议不要进行 DOM 节点跨层级的操作。

### 列表 & key
我们使用 JS 中的 map() 方法来遍历数组，在 JSX 内构建一个**元素集合**。

```js
const NumberList = (props) => {
  const letters = ['A', 'B', 'C', 'D'];
  const listItems = letters.map((letter) =>
    <li key={letter}>{letter}</li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```

![old-element-diff](https://user-images.githubusercontent.com/22387652/87259945-64707a00-c4e1-11ea-9599-2f65546ef1ce.png)

如上图，老集合中包含节点：A、B、C、D，更新后的新集合中包含节点：B、A、D、C，此时新老集合进行 diff 差异化对比，发现 B != A，则创建并插入 B 至新集合，删除老集合中的 A；以此类推，创建并插入 A、D 和 C，删除 B、C 和 D。

我们发现，相同的节点 A、B、C、D，只是在位置上进行了简单的移动，然而却重新进行了删除和创建操作，如何来优化呢？？？

添加 key 区分同一节点，如图所示：

![new-element-diff](https://user-images.githubusercontent.com/22387652/87259950-6afef180-c4e1-11ea-9920-ad2216fd9134.png)

在 React Diff 算法中，会**借助元素的 key 值来判断该元素是新创建的还是被移动而来的元素**，从而减少不必要的元素重新渲染。

tag 和 key 相同，即为同一节点，因此， diff 结果为：B、D 不做任何操作，A、C 进行移动操作。

要保证元素的 key 在同一层级的元素中具有唯一性。
**注意：不要用索引、随机数当 key 值，一般使用 列表数据中的唯一的 id 值。**

如果使用索引，在第一项或者中间项插入一项，后边所有的 key 都会发生变化，都会重新渲染。






# 核心概念
h 函数
vnode 数据结构
patch 函数



# 参考文档
- [React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)


# 常见面试题
## 说一下 React diff 算法 （重要！！！）
## 列表渲染为何使用 key？key 为什么不能使用 index 和 random？（重要）
diff 算法中通过 tag 和 key 来判断，是不是 sameNode
