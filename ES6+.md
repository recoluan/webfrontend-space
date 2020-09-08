


# 迭代器 iterator
在 ES6 中，所有的集合对象 **Array、Set、Map 和 String** 都是可迭代对象，这些对象都具有 **Symbol.iterator** 属性，通过这个属性指定的方法能够返回一个迭代器。

也就是说，ES6 默认为这些内建类型提供了默认的迭代器。

iterator 是一个对象，每一次调用 next 方法，都会返回一个对象：
- value 属性是当前成员的值
- done 属性是一个布尔值，表示遍历是否结束。
```js
let arr = [1, 2, 3];
let iterator = arr[Symbol.iterator]();

console.log(iterator.next()); //"{value:1,done:false}"
console.log(iterator.next()); //"{value:2,done:false}"
console.log(iterator.next()); //"{value:3,done:false}"
console.log(iterator.next()); //"{value:undefined,done:true}"
```

- 任意可迭代对象（Array、Set、Map 和 String）或类数组对象（NodeList、arguments）都可以通过 Array.from() 或 ... 转换为数组，比如，Array.from(map) 或 [...map]




# Generator


# 装饰器 @



# 常见面试题
## ES6 用过哪些新的特性？
## 用过 Generator 吗？
## 装饰器的原理



