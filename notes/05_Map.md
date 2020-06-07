
Map 是一种`无序的键值对（key-value）的集合`，所以这个结构也称为关联数组或字典。
- map 是无序的
- map 是一种`引用类型`，长度是不固定的
- 内置的 len 函数可以获取 map 的所有键值对的数量

# 声明及初始化
## 声明：
> var identifier map[keyType]valueType

未初始化的 map 的值是 nil。
```go
var person map[string]string
if person == nil {
    fmt.Println(person)
}
// map[]
```


## 初始化：
1. map 字面值的语法
> map[keyType]valueType{ key: value, ... }

```go
ages := map[string]int{
    "alice":   31,
    "charlie": 34,
}
fmt.Println(ages)
// map[alice:31 charlie:34]
```

2. 内置的 make 函数
> make(map[keyType]valueType) 

```go
ages := make(map[string]int)
ages["alice"] = 31
ages["charlie"] = 34

fmt.Println(ages)
// map[alice:31 charlie:34]
```

是不是和 JS 中的对象好像：
```js
let ages = {
    alice: 31,
    charlie: 34, 
}
```

值可以是任意类型的，这里给出了一个使用 func() int 作为值的 map:
```go
mf := map[int]func() int{
    1: func() int { return 10 },
    2: func() int { return 20 },
    5: func() int { return 50 },
}
fmt.Println(mf)
// map[1:0x10903be0 5:0x10903ba0 2:0x10903bc0]
```

不要使用 new，永远用 make 来构造 map。
new(map[keyType]valueType) ：如果你错误的使用 new() 分配了一个引用对象，你会获得一个空引用的指针，相当于声明了一个未初始化的变量并且取了它的地址。


## 空 map 与 nil map
```go
var a = make(map[string]int) 
var b = map[string]int{}
// 输出两个：map[]
```
对于 nil 的 map 是不能存取键值对的，否则就会报错 panic: assignment to entry in nil map。
```go
var person map[string]string 
person["name"] = "chen"
fmt.Println(person)
```

## 哪些类型可以作为 key
key 可以是任意可以用 == 或者 != 操作符比较的类型，比如 string、int、float。所以`arr、slice、map、function 不能作为 key`，struct 不包含上述类型的字段也可作为 key，但是指针和接口类型可以。



# 访问、操作
Map 中的元素通过 key 来访问：如果是不存在的 key，返回对应 keyType 的零值。
```go
fmt.Println(ages["chen"])
// 0
```
这样就有一个问题：我们无法判断是存在一个值为零值的键值对，还是这个键值对就根本不存在。
`ok 模式`来验证这个问题：
```go
_, ok := ages["chen"]
fmt.Println(ok)
// false

aliceAge, ok := ages["alice"]
fmt.Println(aliceAge, ok)
// 31 true

// delete
delete(ages, "alice")
// map[charlie:34]
```

删除元素：直接 delete(map1, key1) 就可以，如果 key1 不存在，该操作不会产生错误。

# 遍历 map
```go
for k, v := range ages {
    fmt.Println(k, v)
}
// alice 31
// charlie 34
```
注意： map 是无序的，for 循环、或 for-range 遍历的结果也是无序的。

应用：
1. 将 map 的键值对调
使用 for-range，注意类型也要对调。
前提：key 唯一，如果不唯一，解决方法就是使用多值 map，比如使用 map[int][]string 类型。
```go
ages := map[string]int{
    "alice":   31,
    "charlie": 34,
}
invMap := make(map[int]string, len(ages))
for k, v := range ages {
    invMap[v] = k
}
fmt.Println(invMap)
// map[31:alice 34:charlie]
```

2. 深拷贝一个 map
```go
month := map[string]int{}
m := map[string]int{
	"January":1,
	"February":2,
	"March":3,
}
for key,value := range m{
	month[key] = value
}
delete(month,"February")
fmt.Println(m)
fmt.Println(month)
// map[January:1 February:2 March:3]
// map[January:1 March:3]
```


