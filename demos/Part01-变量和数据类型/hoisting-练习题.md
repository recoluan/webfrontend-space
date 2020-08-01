# 编译及变量提升练习题
1.
```js
console.log(a);
a = 12;
function fn() {
    console.log(a);
     a = 13;
}
fn();
console.log(a);
```
<details><summary><b>Answer</b></summary>
<p>
在第一行报错Uncaught ReferenceError: a is not defined
</p>
</details>

2. 
```js
console.log(a);
if ('a' in window) {
    var a = 12;
}
console.log(a);
```
<details><summary><b>Answer</b></summary>
<p>
undefined
12
</p>
</details>

3. 
```js
var foo;
function foo() {
    console.log(1);
}
foo = function foo() {
    console.log(2);
};
foo();
```
<details><summary><b>Answer</b></summary>
<p>
2
</p>
</details>

4.
```js
fn();
function fn() {
    console.log(1);
}
fn();
function fn() {
    console.log(2);
}
fn();
var fn = 100;
fn();
function fn() {
    console.log(3);
}
fn();
```
<details><summary><b>Answer</b></summary>
<p>
3
3
3
Uncaught TypeError: fn is not a function
</p>
</details>

5.
```js
f = function() {
    return true;
};
g = function() {
    return false;
};
~ function() {
	console.log(g);
    if (g() && [] == ![]) {
    	console.log(g());
        f = function() {
            return false;
        };
        function g() {
            return true;
        }
    }
}();
console.log(f());
console.log(g());
```
<details><summary><b>Answer</b></summary>
<p>
undefined
Uncaught TypeError: g is not a function
</p>
</details>


6. 
```js
let a = 10,
    b = 12;
let fn = function() {
    console.log(a, b);
    let a = b = 20;
    console.log(a, b);
}
fn();
console.log(a, b);
```
<details><summary><b>Answer</b></summary>
<p>
执行到console.log(a, b)报错Uncaught ReferenceError: a is not defined，后边的不执行
如果注销掉函数体中的console.log(a, b)，输出：
20 20
10 20

我们稍微变一下，将函数体内的let改为var，结果会怎样呢？
undefined 12
20 20
10 20
</p>
</details>

7.
```js
b = 12;
console.log(b); //输出 12
a = 12; //在这报错 Uncaught ReferenceError: a is not defined 因为有let 声明了同名的变量，不能给 window 添加该属性
let a = 13;
console.log(a);
```


8.
```js
foo();
var a = true;
if (a) {
    function foo() { console.log("a"); }
} else {
    function foo() { console.log("b"); }
}
```

<details><summary><b>Answer</b></summary>
<p>
执行 foo() 时，报错 Uncaught TypeError: foo is not a function
</p>
</details>
