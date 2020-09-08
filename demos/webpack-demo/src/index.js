console.log('index.js')

// 箭头函数
const sum = (a, b) => a + b
const result = sum(10, 20)
console.log(result)


// 导入
import { fn, name } from './fn'
fn()
console.log('name is ', name)
