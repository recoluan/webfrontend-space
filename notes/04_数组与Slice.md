# 数组
特点：
- 唯一类型 
- 已编号且长度固定
需要注意的是：`数组长度也是数组类型的一部分`，所以 [5]int 和 [10]int 是不同类型的。


## 声明语法
1. 声明
> var identifier [len]type

```go
var a [3]int
fmt.Println(a)
// [0 0 0]
```

2. 初始化：数组字面值语法
> var identifier [len]T = [len]T{ 值1, 值2, ... }
```go
var a [3]int = [3]int{1, 2, 3}
fmt.Println(a)
// [1 2 3]


var a [3]int = [3]int{1, 2}
fmt.Println(a)
// [1 2 0]
```

3. 可以简化为：
> identifier := [...]T{ 值1, 值2, ... }  // 数组的长度是根据初始化值的个数来计算。

```go
a := [...]int{1, 2, 3}
fmt.Println(a)
// [1 2 3]
```

`数组的长度是固定的，在编译阶段就确定了，不允许修改。`
```go
a := [3]int{1, 2, 3}
a = [4]int{1, 2, 3, 4}
fmt.Println(a)
// cannot use [4]int literal (type [4]int) as type [3]int in assignment
```

4. 也可以指定一个索引和对应值列表的方式初始化
```go
package main

import "fmt"

type Currency int

const (
	USD Currency = iota // 美元
	GBP                 // 英镑
	RMB                 // 人民币
)

func main() {
	symbol := [...]string{USD: "$", GBP: "￡", RMB: "￥"}

	fmt.Println(RMB, symbol[RMB])
}
// "2 ￥"
```
这种方式初始化，可以只指定用到元素的索引和对应值，没用到的可以省略
```go
a := [...]int{5: -1}
fmt.Println(a)
// [0 0 0 0 0 -1]
```


## 数组的比较
不仅比较`类型(基础类型，长度)`，还比较数组的所有元素。
```go
a := [2]int{1, 2}
b := [...]int{1, 2}
c := [2]int{1, 3}
fmt.Println(a == b, a == c, b == c) 
// "true false false"

d := [3]int{1, 2}
fmt.Println(a == d) // invalid operation: a == d (mismatched types [2]int and [3]int)
```



## 数组是值类型
Go 语言中的数组是一种`值类型`，而不是引用类型。这意味着当它们被分配给一个新变量时，将把原始数组的`值的副本`分配给新变量。如果对新变量进行了更改，则不会在原始数组中反映。
```go
var arr1 [5]int

arr2 := arr1
arr2[2] = 100

fmt.Println(arr1, arr2)
// [0 0 0 0 0] [0 0 100 0 0]

arr3 := &arr1
arr3[2] = 200

fmt.Println(arr1, arr3)
// [0 0 200 0 0] &[0 0 200 0 0]
```

*new([len]T) 其实就是就将这个指针对应的数组拿出来
```go
var arr1 = new([5]int)

arr2 := *arr1
// fmt.Println(arr1 == arr2)  invalid operation: arr1 == arr2 (mismatched types *[5]int and [5]int)
arr2[2] = 100

fmt.Println(arr1, arr2)
// &[0 0 0 0 0] [0 0 100 0 0]
```


## 将数组传递给函数
在给函数传参时，JS 中传递的是指向这个数组的指针，而 GO 中传递的是 这个数组的值的副本，所以不会修改原始数组。
如果想修改原数组，可以：
- 通过 & 操作符以引用方式传递
- 传递 数组的切片。

传递指针的方式在 Go 中并不常用，通常使用切片。



# Slice
数组的长度是固定的，这就决定了僵化的一种数据类型，而 Slice(`可变数组`), 长度是不固定的，可以追加元素，增加容量。

切片是一个长度可变的数组，是对数组一个连续片段的引用（`引用类型`）。


一个 slice 是一个轻量级的数据结构，由三个部分构成：指针、长度和容量。
- 指针：指向 slice 的开始索引对应的底层数组元素的地址。
- 长度：对应 slice 中元素的数目；长度不能超过容量。len 函数获取
- 容量：最大长度，也就是 slice 开始位置到数组的最后位置的长度。cap 函数获取


## 切片的声明
> var 变量名字 []类型

未初始化之前默认为 nil，长度为 0

```go
var s []int

fmt.Println(len(s), cap(s), s)
if s == nil {
    fmt.Printf("切片是空的")
}
// 0 0 []
// 切片是空的
```
因为字符串是纯粹不可变的字节数组，它们也可以被切分成 切片。


## 切片的初始化
初始化的几种方式：
- 字面量的方式：[]类型{ 值1, 值2, ..., 值n } 不需要指明长度，就创建了一个长度为 n 的数组并且创建了一个切片。切片长度和容量都为 n
- 引用一个数组 arr：arr[i:j]
    + 不包含 j，半开半闭区间
    + arr[:] 等于完整的 arr 数组
    + 容量 = len(arr) - i，长度 = j - i
- 使用 make 函数创建空切片：make([]T, length[, capacity])
```go
func main() {
	var a []int
	b := make([]int, 3, 5)

	printSlice(a)
	printSlice(b)
}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n", len(x), cap(x), x)
}
// len=0 cap=0 slice=[]
// len=3 cap=5 slice=[0 0 0]
```
slice 与 arr 的关系：不同的 slice 是对 arr 的一个 view，会看到底层数组的不同部分，它们共享一个底层数组。


## nil切片与空切片
```go
// nil 切片：声明未初始化
var s []int
fmt.Println(s == nil, s)

// 1、使用 make 创建空切片
s1 := make([]int, 0)
fmt.Println(s1 == nil, s1)

// 2、使用切片字面量创建空切片
s2 := []int{}
fmt.Println(s2 == nil, s2)
// true []
// false []
// false []
```

## 切片是引用类型
传递的是指针。
```go
s1 := []int{1, 2, 3, 4, 5}
s2 := s1

s2[0] = 100
fmt.Println(s1, s2)
fmt.Printf("%p\n%p\n", &s1, &s2)
// 0x40a0e0
// 0x40a0f0
// [100 2 3 4 5] [100 2 3 4 5]
```
> 对比：
>- JS 中的 slice() 也会返回一个新的数组，不包含 endIndex，但是对原数组的一个`深拷贝`，开辟新的内存，原数组不会被改变。
>- Go 中的 引用一个数组初始化的 slice，是`浅拷贝`。
>	=》修改切片的值，其实是修改切片指向的`底层数组`。导致所有指向该数组的切片的数据，都会改变。

```go
arr := [7]int{0, 1, 2, 3, 4, 5, 6}

s1 := arr[:5]
fmt.Println(s1, len(s1), cap(s1))
// [0 1 2 3 4] 5 7
s2 := arr[2:4]
fmt.Println(s2, len(s2), cap(s2))
// [2 3] 2 5

s1[3] = 100
fmt.Println(arr)
fmt.Println(s1)
fmt.Println(s2)
// [0 1 2 100 4 5 6]
// [0 1 2 100 4]
// [2 100]
```

## reslice（切片重组）
对于每一个切片（包括 string），以下状态总是成立的：
```go
s == s[:i] + s[i:] // i是一个整数且: 0 <= i <= len(s)
len(s) <= cap(s)
```

改变切片长度的过程称之为切片重组 reslicing.

```go
arr1 := [6]int{0, 1, 2, 3, 4, 5}
s1 := arr1[:5] 
fmt.Println(s1)
// [0 1 2 3 4]

s1 = s1[2:]
fmt.Println(s1)
// [2 3 4]
```

## grow the slice（向后扩展）
slice 可以向后扩展，不可以超越底层数组的 cap(s)。

```go
arr1 := [6]int{0, 1, 2, 3, 4, 5}
s1 := arr1[2:5] 

fmt.Println(len(s1), cap(s1), s1)
// 3 4 [2 3 4]

// grow the slice
s1 = s1[0:4]
fmt.Println(len(s1), cap(s1), s1)
// 4 4 [2 3 4 5]

// grow the slice beyond capacity
// s1 = s1[0:5]
// panic: runtime error: slice bounds out of range [:5] with capacity 4
```


## append() 和 copy() 函数
### append
append 函数向切片 s 追加 具有相同类型 T 的元素序列 或 另一个切片
> func append(slice []Type, elems ...Type) []Type
> func append(slice []Type, anotherS...) []Type

- append 函数会改变 slice 所引用的底层数组，从而影响到引用同一数组的其它 slice。
 
```go
var s1 []int
s2 := []int{1, 2, 3}
s1 = append(s1, s2...)
fmt.Println(s1)   // 输出：[1 2 3]
```


append 追加时，需要注意：
- 如果`没有超过容量`，直接添加，并且会影响引用同一数组的所有切片。
- 如果`超过容量`，当前追加的切片自动扩容，会`当前切片会指向的一个新的数组`，这时和其他的切片已经不是指向一个数组了。

```go
arr := [7]int{0, 1, 2, 3, 4, 5, 6}

s1 := arr[:5]
fmt.Printf("s1 %v, len = %d，cap = %d\n", s1, len(s1), cap(s1))
s2 := arr[2:4]
fmt.Printf("s2 %v, len = %d，cap = %d\n", s2, len(s2), cap(s2))
// s1 [0 1 2 3 4], len = 5，cap = 7
// s2 [2 3], len = 2，cap = 5

// s1 追加数据
s1 = append(s1, 1, 1)
fmt.Println(arr, s1, s2)
// [0 1 2 3 4 1 1] [0 1 2 3 4 1 1] [2 3]

// s2 追加数据，涉及到扩容，更改 s2 指向的底层数组
s2= append(s2, 2, 2, 2, 2)
fmt.Printf("s2 %v, len = %d，cap = %d\n", s2, len(s2), cap(s2))
// s2 [2 3 2 2 2 2], len = 6，cap = 12   为什么是 12？

fmt.Println(arr, s1, s2)
// [0 1 2 3 4 1 1] [0 1 2 3 4 1 1] [2 3 2 2 2 2]
```

使用 append 从 slice 中删除元素：
```go
s := []int{0, 1, 2, 3, 4, 5, 6}
// 删掉 2
// s1 := append(s[:2], s[3:]...) 
// printSlice(s1)
// len=6 cap=7 slice=[0 1 3 4 5 6]

// push / pop / shift / unshift
// shift：从开头删掉一项
s2 := s[1:]
printSlice(s2)
// len=6 cap=6 slice=[1 2 3 4 5 6]

// pop：从结尾删掉一项
s3 := s[:len(s) - 1]
printSlice(s3)
// len=6 cap=7 slice=[0 1 2 3 4 5]

// push
s4 := append([]int{0}, s...)
printSlice(s4)
// len=8 cap=8 slice=[0 0 1 2 3 4 5 6]
```
一般我们在创建新切片的时候，最好要让新切片的长度和容量一样，这样我们在追加操作的时候就会生成新的底层数组，和原有数组分离。


### copy
> func copy(dst, src []Type) int
	
源切片 src，目标切片 dst，将源切片拷贝到目标切片，覆盖 dst 的对应元素，返回拷贝的元素个数。
- 目标切片会被改变，源切片不变。
- 拷贝的长度为两个 slice 中长度最小值。

```go
// copy
sl_from := []int{1, 2, 3}
sl_to := make([]int, 10)

n := copy(sl_to, sl_from)
fmt.Println(sl_to)
fmt.Printf("Copied %d elements\n", n)
// [1 2 3 0 0 0 0 0 0 0]
// Copied 3 elements

var s1 []int
s2 := []int{1, 2, 3}
n1 := copy(s1, s2)
fmt.Printf("n1=%d, s1=%v, s2=%v\n", n1, s1, s2)
fmt.Println("s1 == nil", s1 == nil)
// n1=0, s1=[], s2=[1 2 3]
// s1 == nil true
```

## new([]T) 与 make([]T, len, cap)的区别
- new([]T)： 分配内存， 返回一个指向类型为 T，值为 0 的指针
- make([]T, len, cap)：返回一个类型为 T 的初始值，它只适用于3种内建的引用类型：切片、map 和 channel，切片 已经被初始化，但是指向一个空的数组。


