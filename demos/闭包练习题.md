# 闭包练习题

1.
```js
var n = 10;

function fn() {
    var n = 20;
    function f() {
        n++;
        console.log(n);
    }

    f();
    return f;
}

var x = fn();
x();
x();
console.log(n);
```
<details><summary><b>Answer</b></summary>
<p>
21
22
23
10
</p>
</details>

2.
```js
var i = 1;
function fn(i) {
    return function (n) {
        console.log(n + (++i));
    }
}
var f = fn(2);
f(3);
fn(5)(6);
f(4);
```
<details><summary><b>Answer</b></summary>
<p>
6
12
8
</p>
</details>

3.
```js
var i = 2;
function fn() {
    i += 2;
    return function (n) {
        console.log(n + (--i));
    }
}
var f=fn();
f(2);
f(3);
fn()(2);
fn()(3);
f(4);
```
<details><summary><b>Answer</b></summary>
<p>
5
5
5
7
7
</p>
</details>


4.
```js
let test = (function (i) {
    return function () {
        alert(i *= 2);
    }
})(2);
test(5); 
```
<details><summary><b>Answer</b></summary>
<p>
"4"
</p>
</details>

5.
```js
var firstClosure;
var secondClosure;
 
function foo() {
 
  var x = 1;
 
  firstClosure = function () { return ++x; };
  secondClosure = function () { return --x; };
 
  x = 2;
 
  console.log(firstClosure());
}
 
foo();
 
console.log(firstClosure());
console.log(secondClosure());
```
<details><summary><b>Answer</b></summary>
<p>
3
4
3
</p>
</details>
