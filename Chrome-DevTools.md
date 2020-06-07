# Chrome-DevTools

## 快捷键及通用技巧
1. Ctrl + Shift + D：切换DevTools窗口的布局（下右）

2. 切换DevTools选项卡
- Ctrl + [ 或 ]： 向左和向右
- Ctrl + 1 到 9：DevTools>Settings>Preferences>*Appearance*中打开

3. 上下箭头递增/递减    -> 调试样式
- Alt + 上下箭头 0.1
- 上下箭头 1
- Shift + 上下箭头 10
- Crtl + 上下箭头 100

4. Ctrl + F: 查找

5. CMD + - 或 =: 可缩放鼠标对应区域

## Command菜单
1. Ctrl + Shift + P: 打开Command菜单
2. 截图：在Command菜单中输入screen，可选择节点截图、全屏截图等，图片会直接下载到本地
3. 输入timestamps，开启log时间戳

## Snippets代码块
1. Sources面板New snippet(新建一个代码块):  复用这些JavaScript代码块

2. 右击run运行

## console
### console 中的 '$'
1. $_: 是对上次表达式的引用
2. $i('lodash'):  可将npm包引入console进行测试（需要安装Console Importer插件）

### 条件断点
再也不用在源码里添加console.log了
1.  Add conditional breakpoint...(添加条件断点)
2. 输入console.log()或值为true/false的条件表达式
3. 不用时在Breakpoints右键remove all

### 骚操作
1. console.log({ var1, var2 }): 用{}包起来，标记哪个是哪个

2. console.table(): 适用于数组、类数组、对象

3. console.dir(): 查看DOM关联到的真实对象
li = $('li'): 可以创建一个DOM元素

4. console.time() — 开启一个计时器
console.timeEnd() — 结束计时并且将结果在 console 中打印出来
可以传入一个标签值

5. "眼睛" 符号, 定义任何JavaScript表达式

## Network
1. Overview:  不需要看时间轴信息时隐藏

2. 过滤器: 可以输入字符串或正则表达式，过滤请求，Ctrl + Space显示所有可能的关键字

3. 请求表：
在表头上右键可以添加列（我经常添加Method）
- initiator列: 显示调用堆栈信息，显示哪个脚本的哪一行触发了请求。
- Response Headers: 控制响应头的显示

## Elements
1. H: 隐藏／显示元素
2. Ctrl + Shift + Z: 撤销所有修改
   CMD + Z: 撤销上次修改
3. Shadow editor 阴影编辑器: box-shadow或text-shadow属性的阴影方形符号
4. Timing function editor 定时函数编辑器: trasition、animation属性

CSS perspective属性: 一是开关，通过它来打开和关闭3D透视效果，二是设置透视的距离。

5. 展开所有的子节点: expand recursively命令


## Drawer:
1. ESC: 打开／隐藏