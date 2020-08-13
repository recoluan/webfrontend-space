目录

[TOC]

# 写在前面
前面我们在讲 this 时，简单涉及来 call、apply 等函数。今天我们将深度讲解 call、apply 的原理及应用。

# call 和 apply
语法：
> fn.call(thisArg, arg1, arg2, ...)

两点需要注意：
- 第一个参数用于指定 this 值。
- 主要区别在于第二个参数，apply 传入数组或 arguments 对象，call 必须将参数逐个列出。

```js
var fn = function(arg1, arg2) {
     ...
};

fn.call(this, arg1, arg2); // 使用 call，参数列表
fn.apply(this, [arg1, arg2]) // 使用 apply，参数数组
```


# 内部原理
以 call 为例。
> fn.call(thisArg, arg1, arg2, ...)

我们一起分解一下这个执行步骤：
- fn.call：当前实例（函数 fn）通过原型链的查找机制，找到 **Function.prototype** 上的 call 方法 => function call(){[native code]}
- fn.call()：把找到的 call 方法执行
  =>**当 call 方法执行时，内部处理了一些事情**：
    + 首先把要`操作的函数（fn）中的 this`变为 `call 方法第一个传递的实参值`
    + 把 call 方法第二个以后的实参获取到，传给函数，并且把`操作的函数（fn）执行`

伪代码如下：
```js
Function.prototype.call = function (context, ...arg) {
    //=>this: fn 当前要操作的函数(Function.prototype的一个实例)
    //把 FN 中的 this 关键字修改为 PARAM1
    this = eval(this.toString().replace("this", "context"));

    //=>把fn执行
    this(...arg);
};
fn.call(obj, 10, 20);
```
call 方法的模拟实现，后面我们会单独一篇来写。


# 应用
## 使用 apply 将数组展开为参数序列
等同于 ES6 的展开运算符（...）

1. 合并两个数组
    push 方法只允许逐个列出参数，可以使用 apply 的第二个参数推入一个数组，实现数组的合并。
    > Array.prototype.push.apply(ary1, ary2)

    ```js
    var ary1 = [0, 1, 2];
    var ary2 = [3, 4, 5];
    // ES5的写法
    Array.prototype.push.apply(ary1, ary2);
    // ES6 的写法
    arr1.push(...arr2);
    ```

2. 获取数组中的最大值、最小值
    数组 ary 本身没有 max 方法，但是 Math 有呀，所以这里就是借助 apply 使用 Math.max 方法。
    > Math.max.apply(null, ary)

    怎么借用呢？
    - 我们的 apply 的第二个参数支持传入一个数组，此时 this 无用，可以用 null 来占位
    - 所有的函数都有 apply 方法，因此让 Math.max 也可调用 apply 方法

    ```js
    var ary = [5, 4 , 12 , 3 ]; 
    Math.max.apply(null, ary); // 12

    //等同于 ES6 的...
    Math.max(...ary); // 12
    ```



## 借用机制
> 借用的机制：
>- 借用者：具有`length属性、具有数字索引下标`，比如`类数组、数组、字符串`，一般可以互相借用。
>- 借用时如何传参：可以`从 call、apply 的第二个参数传入`。

常见的有以下几种情形：

### 类数组、数组、字符串互相借用
1. 类数组借用数组 slice、sort 方法
    > Array.prototype.slice.call(arguments)

    ```js
    Array.prototype.slice.call(arguments);
    [].slice.call(arguments);

    //等同于 ES6 的...
    Array.from(arguments);
    [...arguments];
    ```    

    <details><summary><b>扩展：为什么通过 Array.prototype.slice.call(arguments) 就可以把类数组对象转换成数组？</b></summary>
    <p>

    让我们基于原型自己来写一个 slice
    ```js
    Array.prototype.mySlice = function mySlice() {
        //=>this: ary
        let res = [];

        for (let i = 0; i < this.length; i++) {
            res.push(this[i]);
        }
        return res;
    }
    let ary = [12, 23, 34];

    ary.mySlice() === ary; // false
    ```
    以上代码，模拟了数组内置的 slice 方法，实现了数组的深克隆。

    当执行内置的 slice 时，**把它的 this 指向 arguments，相当于操作的是 arguments**，然后方法执行完返回一个新的数组，就可以实现把 arguments 转换为数组。
    `【原理】`
    那么，谁可以让调用内置的 slice 呢？？？
    =>基于原型，我们知道，**Array.prototype 和 Array 的任意一个实例都可以**
    还有，谁可以改变 this 指向呢？？？
    =>当然是 call、apply了

    <p>
    </details>
    
    arguments 借用数组的 sort 方法：
    ```js
    [].sort.call(arguments, function(){
         return a - b;
    })
    ```

2. 字符串借用数组的 slice、join、map 的方法
    ```js
    [].slice.call('xinhua', 2); //=>["n", "h", "u", "a"]
    Array.prototype.join.call('foo', "-"); //=> 'f-o-o'
    Array.prototype.map.call('foo', v => (v.toUpperCase() + ".")).join(""); // 'F.O.O.'
    ```


3. 数组也可以借用字符串的方法
    ```js
    String.prototype.substring.call([12, 23, 34])
    ```


### Object.prototype.toString 检测数据类型
> Object.prototype 上的 toString 方法执行，会返回`当前值的内部类型`，格式：`"[object 所属的类型]"`。

我们要检测谁，就用 call 借用 toString 方法，把 this 变为需要检测的值。
> Object.prototype.toString.call([value])

```js
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call([1, 2, 3]); // [object Array]
Object.prototype.toString.call({a: 1}); // [object Object]
```

后面原型继承部分会详细讲解哦。


# 扩展
<details><summary><b>多个 call</b></summary>
<p>

规律：
1个call执行，左边的执行
2个及2个以上的call，右边的执行

```js
Function.prototype.call = function callAA(){
    this(paramOther);
}
function fn1(){console.log(1);}
function fn2(){console.log(2);}
fn1.call(fn2); //=>fn1沿着原型链找到callAA方法，执行callAA方法：修改callAA中的this为fn2，执行fn1
fn1.call.call(fn2); //=>第一个call执行：把fn1.call看做一个整体，沿着原型链找到callAA，让callAA执行：将fn1.call中的this修改为fn2。 =>fn1.call执行，先找到callAA，让callAA执行，只不过上一步将callAA中的this改为fn2  =>fn1.call执行时并没有给它传递参数值，因此fn2中的this是undefined  =>然后执行fn2

fn1.call.call.call(fn2);//=>
Function.prototype.call(fn1);//=>Function.prototype是一个匿名函数也是一个空函数，执行没有任何的输出
Function.prototype.call.call(fn1);//=>
```


</p>
</details>



# 常见面试题

