const div1 = document.getElementById('div1')

// 1. 原生
// div1.addEventListener('drag', function (e) {
//     console.log(e.offsetX, e.offsetY)
// })

// 2. 定时器实现的效果
// let timer = null
// div1.addEventListener('drag', function (e) {
//     if (timer) {
//         return
//     }
//     timer = setTimeout(() => {
//         console.log(e.offsetX, e.offsetY) 
//         timer = null; 
//     }, 500)
// })

// 3. 节流
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

div1.addEventListener('drag', throttle(function (e) {
    console.log(e.offsetX, e.offsetY)
}))