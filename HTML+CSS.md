目录

[TOC]

# HTML 常见面试题
## HTML 语义化
概念：根据页面的内容结构选择合适的标签，便于搜索引擎更好的解析（SEO），增加代码可读性。

为了在没有CSS的情况下，页面也能呈现出很好地内容结构、代码结构

## DOCTYPE声明
DOCTYPE，或者称为 Document Type Declaration（`文档类型声明，`缩写 DTD）。通常情况下，DOCTYPE 一般在 HTML 文档的最前面，位于根元素HTML的起始标签之前。这样一来，在浏览器解析 HTML 文档之前就可以`确定当前文档的类型`，以决定其需要`采用的渲染模式`（不同的渲染模式会影响到浏览器对于 CSS 代码甚至 JavaScript 脚本的解析）。

XHTML和HTML4.0.1有三种DTD可选择：Transition（过度的）、Scrict（严格的）、Frameset（框架）
HTML5的DTD声明就很简单，只有`<!DOCTYPE html>`



引申问题：标准模式(strict mode)和怪异模式(quirks mode)的区别
标准模式：浏览器按照W3C标准对文档进行解析和渲染；
怪异模式：浏览器为了兼容很早之前针对旧版本浏览器设计，并未严格遵循W3C标准的一种页面渲染模式。所以称之为怪异模式。
区别：
两种模式的两个常见的不同点：
盒模型：在怪异模式下，盒模型为IE盒模型，在标准模式下，盒模型为W3C标准盒模型。
行内元素的垂直对齐：标准模式下，基于Gecko的浏览器将会对齐至基线，而在quirks模式下它们会对齐至底部。


## 块级元素 & 内联元素
1. 常用的块级元素和内联元素有哪些
- 块级元素：dispaly: block/table;

常用的有：
div、p、h1-h6
ul、ol、li、dl、dt、dd
table、form
CSS3：footer、header、nav

- 内联元素（行内元素）：display: inline/inline-block;

常用的有：
a、span
input、select、label、textarea
i、em、strong
CSS3：date、time

- 空元素：
常见的有：br、hr、img

2. 区别
- block 元素：独占一行。默认情况下, block元素宽度自动填满其父元素宽度
- inline 和 inline-block 元素：不会独占一行, 多个相邻的行内元素会排列在同一行里

## \<meta charset="UTF-8">的作用
规定 HTML 文档的字符编码。不设置页面有中文会出现乱码。

## 针对移动浏览器端开发页面，不期望用户放大屏幕，且要求“视口（viewport）”宽度等于屏幕宽度，视口高度等于设备高度，如何设置？

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0">
```

## src 和 href 的区别
- src：source 的缩写，src的内容是页面必不可少的一部分，是引入。src指向的内容会嵌入到文档中当前标签所在的位置。常用的有：img、script、iframe。
- href：Hypertext Reference 的缩写，表示超文本引用。用来建立当前元素和文档之间的链接。常用的有：link、a。

=》区别：***引入和引用***。src 用于替换当前元素，href 用于在当前文档和引用资源之间确立联系。




# CSS 常见面试题
考察：布局、定位、图文样式、响应式、CSS3

## CSS 布局
### CSS盒模型：谈谈对盒模型的认识
1. 考点1：基本概念：标准盒模型 + IE盒模型

概念：在CSS中，文档中的每个HTML元素可以被看作一个盒子，这个模型描述了一个元素所占用的空间。它包括：content（内容）、padding（填充，内容到边框的距离）、border（边框）、margin（外边距）几个部分。

![盒子模型](https://user-images.githubusercontent.com/22387652/91927931-58e54680-ed0d-11ea-8d6a-24ded99e162e.png)

2. 考点2：盒子模型分为两类

**W3C标准盒子模型** 和 **IE盒子模型**，两者的区别：
+ 标准模型的 width 和 height，指的是 **content 的宽度和高度**，不包含padding、border、margin
+ IE模型的 width 和 height，指的是 **content + padding + border的宽度和高度**

3. 考点3：CSS 如何设置这两种模型？（一个元素默认的模型是什么？如何设置为另一种？）

CSS3 的一个 **box-sizing 属性**：
语法：**box-sizing：content-box | border-box | inherit**
- content-box 是标准模型，浏览器默认的模型。
- border-box 是IE模型。

box-sizing 属性的作用：
在IE8及以下的浏览器中只支持IE盒模型，在IE8+及其他主流浏览器中，通过CSS3新增的box-sizing属性可以设置浏览器的盒模型。使用box-sizing属性能够统一IE和非IE浏览器之间的差异。


4. 考点4：JS 如何获取元素对象的样式？
- `[元素].style.xxx`
弊端：只能获取写在行内上的样式，真实项目很少写在行内上

- 只要当前元素在页面中渲染出来了，就可获取当前元素所有经过浏览器计算过的样式
不管写在行内样式，还是样式表中，即使没有设置，浏览器会给元素设置一些默认样式。
  + 标准浏览器中（IE9+）：
	`window.getComputedStyle( [元素], [伪类，一般写null])`，返回一个`对象`，这个对象包含所有被浏览器计算过的样式属性可以通过点表示法和方括号语法来获取。
	+ IE6~8
	`[元素].currentStyle.xxx`，也返回一个`对象`。

5. 场景题
```html
<!-- 如下代码，div1 的 offsetWidth 是多大？ -->
<style>
  #div1 {
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
  }
</style> 
<div id="div1"></div>
<!-- offsetWidth = content + padding + border -->
<!-- 100 + 10 * 2 + 1 * 2 = 122px -->
```
=> 如果让 offsetWidth = 100px，该如何做？box-sizing: border-box;


### BFC
BFC：块级格式化上下文（Block Formatting Context），指的是一个独立的块级渲染区域，该区域拥有一套渲染规则来约束块级盒子及其子元素的布局, 且与区域外部互不影响。

1. 如何创建一个 BFC？
1）body 根元素
2）overflow 的值不为 visible，hidden/auto/scroll 都可以
3）float 的值不为 none
4）position 的值不为 static
5）display 属性为 flex、inline-block、table 相关

2. BFC 的原理（渲染规则）
1）BFC元素在页面上是一块独立的渲染区域，BFC内部元素的渲染与外面的元素互不影响
2）同一个BFC下的子元素在垂直方向上会发生边距重叠
3）BFC的元素区域不会被浮动元素的box遮盖
4）计算BFC高度的时，浮动元素也会参与计算


3. BFC 在布局当中的应用
1）清除浮动
在通常情况下父元素的高度会被子元素撑开。但如果其子元素为浮动元素，我们知道浮动元素是脱离文档流的，其高度并不会计算到包裹div的高度里，则会产生高度塌陷问题。
怎么解决这个问题呢，就是给包裹父 div 创建一个 BFC。

2）解决元素被浮动元素遮盖的问题
这是典型的浮动兄弟元素的遮盖问题：左边元素浮动，右边元素未浮动也不是BFC，左右两侧不在同一层内会发生遮挡问题。
![BFC-none](https://user-images.githubusercontent.com/22387652/91928685-423fef00-ed0f-11ea-9f00-283e0ae771c6.png)

我们可以看到，右侧元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖)， 可以将右侧元素设置为BFC元素（overflow: hidden）来解决这个问题。

![BFC](https://user-images.githubusercontent.com/22387652/91928692-45d37600-ed0f-11ea-8e6f-b6e0ecb6ad73.png)


IFC（内联元素格式化上下文）


### 浮动的原理及如何清除浮动
原理：浮动会让元素脱离标准文档流，相当于浮动起来一样，浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。

浮动带来的问题就是：高度坍塌
![](http://upload-images.jianshu.io/upload_images/8059334-96a314f032389591.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


考点：如何清除浮动
方法一：设置 **clear: both** 属性，适用于紧邻其后的兄弟元素。
方法二：设置 **overflow：hidden** 适用于受浮动影响的父元素。（只要在浮动元素的父容器设置即可，爷爷辈容器不用设置）
方法三：使用伪元素：after
```javascript
.clearfix:after {
    display: block;
    height: 0;
    content: "";
    clear: both
}
```
### margin 纵向重叠、负值的问题
1. margin 纵向重叠
   - 相邻元素的 margin-top 和 margin-bottom 会发生重叠，按照 margin 重叠计算规则，间距取最大值 
   - 空内容的 p 标签也会重叠 =》会被忽略
  
```html
<!-- 如下代码，AAA 和 BBB 之间的距离是多少？ -->
<style>
  p {
    line-height: 1;
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 16px;
  }
</style> 
<p>AAA</p>
<p></p>
<p></p>
<p>BBB</p>
<!-- 答案：15px -->
```




2. 对 margin 的 top、left、right、bottom 设置 margin 负值
- margin-top 和 margin-left 设置负值，元素向上、向左移动
- margin-right 设置负值，右侧元素左移，自身不受影响
- margin-bottom 设置负值，下方元素上移，自身不受影响


### float 布局
如何实现圣杯布局和双飞翼布局（PC 端常见）



### flex 布局
画色子


## CSS 定位
### position 的几个属性，区别
absolute
relative

### 水平和垂直居中
#### 水平居中
- 行内元素：给父元素设置 text-align:center
- 定宽块状元素：左右margin值为auto
- 不定宽块状元素：
1）通过display:inline显示设置为行内元素，再使用text-align:center来实现居中
2）设置display:table;margin:0 auto;
3）利用相对定位的方式，设置position:relative和left:50%

#### 垂直居中
- 父元素高度确定的单行的行内元素：设置父元素的 height = line-height
- 父元素高度确定的多行的行内元素：display:table-cell 和 vertical-align:middle
缺点：注意IE6、7并不支持这个样式，兼容性比较差。
- 通过盒子模型计算margin、padding值
- 使用绝对定位和transform
```css
    .wrapper {
        position: relative;
    }
    .child {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
    }
```
- 使用 flex 布局
```css
.wrapper {
    display: flex;
}
.child {
    margin: auto;
}
```
或者这样写：
```css
.wrapper {
    display: flex;
    justify-content: center;//主轴上如何对齐
    align-items: center;//交叉轴上如何对齐
}
```


## CSS 样式属性
### display: none 与 visibility: hidden 的区别
联系：都是让元素不可见的
区别：
1. 是否在 render tree 占据空间
  + display:none：会从 render tree 中消失，不占据任何空间
  + visibility: hidden：在 render tree 中没有消失，继续占据空间，只是内容不可见

2. 是否是继承属性
  + display: none：非继承属性，子孙节点消失由于元素从 render tree 消失造成，通过修改子孙节点属性无法显示；
  + visibility: hidden：继承属性，子孙节点消失由于继承了hidden，可以通过设置visibility: visible 让子孙节点显示
3. 修改常规流中元素的 display 通常会造成文档重排。修改 visibility 属性只会
造成本元素的重绘
4. 读屏器不会读取display: none元素内容；会读取visibility: hidden元素内
容


### CSS 选择器的级别
!important > style属性行内样式 > ID 选择器 > class 选择器 > 标签 > 通配符(*) > 继承的样式 > 浏览器默认属性


计算权值：!important最高 > id = 100 > class = 10 > 标签 = 1 > 继承 = 0.1

### block、 inline 和 inline-block 的区别
- 起新行
  + block 元素：独占一行。默认情况下, block元素宽度自动填满其父元素宽度
  + inline 和 inline-block 元素：不会独占一行, 多个相邻的行内元素会排列在同一行里
- 设置宽高
  + block 元素和 inline-block 元素：可设置宽高
  + inline 元素设置无效
- 内外边距
  + block 元素和 inline-block 元素：可以设置 margin 和 padding
  + inline 元素直客设置水平方向的 margin 和 padding，垂直方向无效
- 包含
  + block 可以包含 inline 和 block 元素，而 inline 元只能包含 inline 元素

### line-height 的继承问题



## CSS响应式
### rem 是什么？和 em、px 的区别

### 如何实现响应式？


CSS 预处理语言，赋予了 CSS 如变量、继承、运算、函数等动态语言的特性。
均具有“变量”、“混合”、“嵌套”、“继承”、“颜色混合”五大基本特性。

reset.css 作用：能够重置浏览器的默认CSS样式。