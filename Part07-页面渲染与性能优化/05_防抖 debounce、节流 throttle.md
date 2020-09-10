目录

[TOC]

# debounce

防抖：用户输入结束或暂停时，才会触发操作。

例子：监听输入框，文字变化后触发 change 事件，如果用户用 keyup 事件，则会频繁触发 change 事件。

```js
function debounce(fn, delay = 500) {
    // timer 是闭包中的，不对外暴露
    let timer = null

    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            // this：input1
            // arguments：e，思考为什么？
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}

// test
const input1 = document.getElementById('input1')

input1.addEventListener('keyup', debounce(function (e) {
    console.log(e.target)
    console.log(input1.value)
}, 600))
```

# throttle
节流：频繁操作，保持一定的频率连续触发。

例子：拖拽一个元素时，要随时拿到该元素被拖拽的位置。如果直接用 drag 事件，则会频繁触发，很容易卡顿。节流要实现的效果是：无论拖拽速度多快，都会每隔 100ms 触发一次

```js
function throttle(fn, delay = 100) {
    let timer = null

    return function () {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}

// test
const div1 = document.getElementById('div1')

div1.addEventListener('drag', throttle(function (e) {
    console.log(e.offsetX, e.offsetY)
}))
```


# 常见面试题
1. 手写防抖 debounce、节流 throttle