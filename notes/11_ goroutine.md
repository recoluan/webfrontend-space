Go 语言为构建并发程序的基本代码块是 协程 (goroutine) 与通道 (channel)。

# 并发与并行
## 并行
**并行**，就是**在某一时间点能够同时执行多个任务**。

想达到并行效果，最简单的方式就是借助多线程或多进程，这样才可在同一时刻执行多个任务。单线程是永远无法达到并行状态的。

举个常见的例子，一台多核电脑的任务执行就是像下面这种图显示的一样：

![parallelism](https://user-images.githubusercontent.com/22387652/69796002-2bacba80-1208-11ea-8753-0375ee629ba5.png)

可以看到，同一时刻能执行多个任务。这就是并行。


## 并发
**并发**是**在某一时间段内可以同时处理多个任务**。

我们通常会说程序是并发设计的，也就是说它允许多个任务同时执行，这个同时指的就是一段时间内。单线程中多个任务以间隔执行实现并发。

一台单核电脑可以下载、听音乐，实际上这两个任务是这样执行的，只不过这两个任务切换时间短，给人的感觉是同时执行的。

![concurrency](https://user-images.githubusercontent.com/22387652/69795736-aaedbe80-1207-11ea-94d5-1009580e0d0a.png)

可以说，多线程或多进程是并行的基础，但单线程也通过协程实现了并发。Go 通过协程实现并发，协程之间靠信道通信。


# 协程
协程（Goroutine）可以理解成轻量级的线程，但与线程相比，它的开销非常小。因此，Go 应用程序通常能并发地运行成千上万的协程。
Go 创建一个协程非常简单，只要在方法或函数调用之前加关键字 go 即可。

```go
func printHello() {
	fmt.Println("hello world goroutine")
}

func main() {
	go printHello()    // 创建了协程
	fmt.Println("main goroutine")
}
// main goroutine
```
上边代码，第 6 行使用 go 关键字创建了协程，现在有两个协程，**新创建的协程和主协程**。printHello() 函数将会独立于主协程并发地执行。

程序并没有输出 hello world goroutine，到底发生了什么？

这是因为，**当协程创建完毕之后，主函数立即返回继续执行下一行代码，printHello 协程并没有时间执行**。主协程执行完毕，程序便退出，printHello 协程随即也退出，便不会有输出。

加一行代码：
```go
    go printHello()
	time.Sleep(1 * time.Second)
    fmt.Println("main goroutine")
    // hello world goroutine
    // main goroutine
```
协程创建完成之后，main 协程先休眠 1s，预留给 printHello 协程执行的时间。程序先输出 hello world goroutine，等 1s 后输出 main goroutine。


## 创建多个协程
```go
func printNums() {
	for i := 1; i <= 5; i++ {
		time.Sleep(20 * time.Millisecond)
		fmt.Printf("%d ", i)
	}
}
func printChacter() {
	for i := 'a'; i <= 'e'; i++ {
		time.Sleep(40 * time.Millisecond)
		fmt.Printf("%c ", i)
	}
}
func main() {
	go printNums()
	go printChacter()
	time.Sleep(3 * time.Second)
	fmt.Println("main stopped")
}
// 1 a 2 3 b 4 5 c d e main stopped
// 1 2 a 3 4 b 5 c d e main stopped
```
除主协程之外，新创建了两个协程：printNum 协程和 printChacter 协程。

![multiple](https://user-images.githubusercontent.com/22387652/69802870-839dee00-1215-11ea-8660-0122a94531a9.png)

可以看到：2 和 a，4 和 b 的输出顺序是不一定的。

实际项目中，是不会用 time.Sleep() 在主协程强制休眠的。那用什么来解决这个问题呢？

Go 给我们提供了信道，当协程执行完毕，能够通知到主协程，还能够实现协程间通信。



