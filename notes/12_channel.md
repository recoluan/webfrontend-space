信道是协程之间通信的管道，从一端发送数据，另一端接收数据。

# 信道声明
两种方式：
```go
var c chan int  		// 方式一
c := make(chan int)		// 方式二
```
方式一就声明了 nil 信道。nil 信道没什么作用，既不能发送数据也不能接受数据。方式二使用 make 函数创建了可用的信道 c。

```go
c := make(chan int)
fmt.Printf("c Type is %T\n",c)
fmt.Printf("c Value is %v\n",c)
// c Type is chan int
// c Value is 0xc000060060
```
创建了信道 c，而且只允许 int 型数据传输。
信道 c 的值是一个地址。


# 信道的使用
## 读写数据
```go
c := make(chan int)
// 写数据
c <- data   

// 读数据
variable <- c   // 方式一
<- c  			// 方式二
```
- 信道在箭头的左边是写数据，在右边是从信道读数据。
- 往信道里写数据之后当前协程便阻塞，直到其他协程将数据读出。
- 一个协程被信道操作阻塞后，Go 调度器会去调用其他可用的协程，这样程序就不会一直阻塞。

还记得在协程中讲过的例子吗？
```go
func printHello(c chan bool) {
	fmt.Println("hello world goroutine")
	<- c    // 读取信道的数据
}

func main() {
	c := make(chan bool)
	go printHello(c)
	c <- true    // main 协程阻塞
	fmt.Println("main goroutine")
}
// hello world goroutine
// main goroutine
```
main 协程创建完 printHello 协程之后，第 8 行往信道 c 写数据，main 协程阻塞，Go 调度器调度可使用 printHello 协程，从信道 c 读出数据，main 协程结束阻塞继续运行。

## 死锁
前面提到过，一个协程被信道操作阻塞后，Go 调度器会去调用其他可用的协程，问题来了，如果没有可用的协程怎么办？没错，就会发生著名的**死锁**。

最简单的情况就是，只往信道写数据（只写不读）。
```go
func main() {
	c := make(chan bool)
	c <- true    // 只写不读
	fmt.Println("main goroutine")
}
```

报错：
```go
fatal error: all goroutines are asleep - deadlock!
```
同理，只读不写也会报同样的错误。


## 关闭信道与 for loop
发送数据的信道有能力选择关闭信道，数据就不能传输。数据接收的时候可以返回一个状态判断该信道是否关闭：

```go
val, ok := <- channel
```
val 是接收的值，ok 标识信道是否关闭。
- 为 true 的话，该信道还可以进行读写操作；
- 为 false 则标识信道关闭，数据不能传输。从关闭的信道读出来的值是对应类型的零值。
使用内置函数 close() 关闭信道。


上一节的例子：
```go
func printNums() {
	for i := 1; i <= 5; i++ {
		time.Sleep(1 * time.Second)
		fmt.Printf("%d ", i)
	}
}

func main() {
	go printNums()
	time.Sleep(3 * time.Second)
	fmt.Println("main stopped")
}
// 1 2 3 main stopped
```

```go
func printNums(ch chan int) {
	for i := 1; i <= 5; i++ {
		ch <- i
	}
	close(ch)
}

func main() {
	ch := make(chan int)
	go printNums(ch)
	for {
		v, ok := <-ch
		if ok == false { // 通过 ok 判断信道是否关闭
			fmt.Println(v, ok)
			break
		}
		fmt.Println(v, ok)
	}
	fmt.Println("main stopped")
}
// 1 true
// 2 true
// 3 true
// 4 true
// 5 true
// 0 false
// main stopped
```

还可以使用 for-range 读取信道吧，信道关闭，for range 自动退出。
```go
func main() {
	ch := make(chan int)
	go printNums(ch)

	for v := range ch {
		fmt.Println(v)
	}
	fmt.Println("main stopped")
}
// 1
// 2
// 3
// 4
// 5
// main stopped
```


## 缓冲信道
之前创建的信道都是无缓冲的，读写信道会立马阻塞当前协程。**对于缓冲信道，写不会阻塞当前信道直到信道满了，同理，读操作也不会阻塞当前信道除非信道无数据。**

创建带缓冲的信道：
```go
ch := make(chan type, capacity)  
```
capacity 是缓冲大小（信道容量），必须大于 0。 内置函数 len()、cap() 可以计算信道的长度和容量。

```go
func main() {
	ch := make(chan int,3)

	ch <- 7
	ch <- 8
	ch <- 9
	//ch <- 10    
	// 注释打开的话，协程阻塞，发生死锁
	会发生死锁：信道已满且没有其他可用信道读取数据

	fmt.Println("main stopped")
}
// main stopped
```
创建了缓冲为 3 的信道，写入 3 个数据时信道不会阻塞。如果再写入第 4 个的话，此时信道已满，协程阻塞，又没有其他可用协程读数据，便发生死锁。

```go
func printNums(ch chan int) {

	ch <- 7
	ch <- 8
	ch <- 9
	fmt.Printf("channel len:%d,capacity:%d\n",len(ch),cap(ch))
	fmt.Println("blocking...")
	ch <- 10   // 阻塞
	close(ch)
}

func main() {
	ch := make(chan int,3)
	go printNums(ch)

	for v := range ch {
		fmt.Println(v)
	}

	fmt.Println("main stopped")
}
// channel len:2,capacity:3
// blocking...
// 7
// 8
// 9
// 10
// main stopped
```

如果缓冲信道是关闭状态但有数据，仍然可以读取数据：
```go
func main() {
	ch := make(chan int,3)
	
	ch <- 7
	ch <- 8
	//ch <- 9
	close(ch)

	for v := range ch {
		fmt.Println(v)
	}

	fmt.Println("main stopped")
}
// 7
// 8
// main stopped
```


## 单向信道
之前创建的都是双向信道，既能发送数据也能接收数据。我们还可以创建单向信道，只发送或者只接收数据。 语法：
```go
sch := make(chan<- int) // 只发送
rch := make(<-chan int) // 只接收
```
主要用在信道作为参数传递的时候，Go 提供了自动转化，双向转单向。

```go
func printNums(ch chan<- int) {
	for i := 1; i <= 5; i++ {
		ch <- i
	}
	close(ch)
}

func main() {
	ch := make(chan int)
	go printNums(ch)

	for v := range ch {
		fmt.Println(v)
	}
}
```
main 协程中 ch 是一个双向信道，printNums() 在接收参数的时候将 ch 自动转成了单向信道，只发不收。但在 main 协程中，ch 仍然可以接收数据。


## 信道数据类型


# select
select 的用法类似 switch 语句，但 select 只用于信道操作。

select 用于从多个发送或接收信道操作中进行选择，语句会阻塞当前协程，直到其中有信道可以操作。
- 如果有多个信道可以操作，会随机选择其中一个 case 执行。
- 如果其他信道操作都不可操作，将会直接执行 default 分支。
```go
select {
case u:= <- ch1:
        ...
case v:= <- ch2:
        ...
        ...
default: // no value ready to be received
        ...
}
```

```go
func service1(ch chan string) {
	time.Sleep(2 * time.Second)
	ch <- "from service1"
}
func service2(ch chan string) {
	time.Sleep(1 * time.Second)
	ch <- "from service2"
}

func main() {
	ch1 := make(chan string)
	ch2 := make(chan string)
	go service1(ch1)
	go service2(ch2)
	
	select {       // main 协程发生阻塞
	case s1 := <-ch1:
		fmt.Println(s1)
	case s2 := <-ch2:
		fmt.Println(s2)
    default:
		fmt.Println("no case ok")
	}
}
// from service2
```
执行到 select 语句时，main 协程发生阻塞，等待一个case 操作可执行。很明显是 ch2 先准备好读取的数据（休眠 1s），所以输出 from service2。

去掉 service1、service2 的延时去掉，由于信道 ch1、ch2 都没准备好，直接执行 default 语句。

# nil channel

不希望立即执行 default 语句，而是希望等待一段时间，若这个时间段内还没有可操作的信道，则执行规定的语句。可以在 case 语句后面设置超时时间。

```go
func main() {
	ch1 := make(chan string)
	ch2 := make(chan string)
	go service1(ch1)
	go service2(ch2)
	
	select {       // main 协程发生阻塞
	case s1 := <-ch1:
		fmt.Println(s1)
	case s2 := <-ch2:
		fmt.Println(s2)
    case <-time.After(2*time.Second):     // 等待 2s
		fmt.Println("no case ok")
	}
}
```