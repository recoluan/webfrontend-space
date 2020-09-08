目录

[TOC]


CSS 考察：布局、定位、图文样式、响应式、CSS3

# CSS 布局
## CSS盒模型：谈谈对盒模型的认识
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


## BFC
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
1）**清除浮动**
在通常情况下父元素的高度会被子元素撑开。但如果其子元素为浮动元素，我们知道浮动元素是脱离文档流的，其高度并不会计算到包裹div的高度里，则会产生高度塌陷问题。
怎么解决这个问题呢，就是给包裹父 div 创建一个 BFC。

2）解决元素被浮动元素遮盖的问题
这是典型的浮动兄弟元素的遮盖问题：左边元素浮动，右边元素未浮动也不是BFC，左右两侧不在同一层内会发生遮挡问题。
![BFC-none](https://user-images.githubusercontent.com/22387652/91928685-423fef00-ed0f-11ea-9f00-283e0ae771c6.png)

我们可以看到，右侧元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖)， 可以将右侧元素设置为BFC元素（overflow: hidden）来解决这个问题。

![BFC](https://user-images.githubusercontent.com/22387652/91928692-45d37600-ed0f-11ea-8e6f-b6e0ecb6ad73.png)


IFC（内联元素格式化上下文）


## margin 纵向重叠、负值的问题
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



## float 布局
如何实现圣杯布局和双飞翼布局（PC 端常见）
- 两侧宽度固定，中间宽度自适应的三栏布局
- 中间部分在 DOM 结构上优先加载和渲染
- 允许三列中的任意一列成为最高列
- 只需要使用一个额外的\<div>标签

实现：
- 使用 float 布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，圣杯用 padding，双飞翼用 margin



## 浮动的原理及如何清除浮动
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

## flex 布局（重要）
父容器的属性：
- flex-direction：规定主轴方向（水平 row 或垂直 column）
- justify-content：主轴如何对齐。flex-start | flex-end | center | space-between | space-around;
- align-items：交叉轴如何对齐。flex-start | flex-end | center | baseline | stretch;
- flex-wrap：如何换行。nowrap | wrap | wrap-reverse;

项目的属性：
- align-self：单独设置某个项目的对齐方式 auto | flex-start | flex-end | center | baseline | stretch
  
画色子



# CSS 定位
## position 的几个属性，区别（重要）
absolute：依据最近一层的定位容器元素
relative：依据自身定位
fixed: 相对于浏览器窗口定位

定位元素：
- absolute、relative、fixed
- body

## 水平和垂直居中（重要）
### 水平居中
- inline 元素：给父元素设置 text-align: center
- 定宽 block 元素：margin: 0 auto
- absolute 元素：left: 50% + margin-left 负值
 


- 不定宽块状元素：
1）通过display:inline显示设置为行内元素，再使用text-align:center来实现居中
2）设置display:table;margin:0 auto;
3）利用相对定位的方式，设置position:relative和left: 50%

### 垂直居中

- 父元素高度确定的单行的 inline 元素：设置父元素的 height = line-height
- absolute 元素：
  + top: 50% + margin-top负值
  + top: 50% + transform: translate(0, -50%)

- 父元素高度确定的多行的 inline 元素：display:table-cell 和 vertical-align:middle
缺点：注意IE6、7并不支持这个样式，兼容性比较差。
- 通过盒子模型计算 margin、padding 值
  
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
    justify-content: center; // 主轴上如何对齐
    align-items: center; // 交叉轴上如何对齐
}
```


# CSS 样式属性
## display: none 与 visibility: hidden 的区别
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


## CSS 隐藏一个元素（重要）
- opcity: 0
- display: none
- visibility: hidden
- height: 0; overflow: hidden;


## CSS 选择器的级别
!important > style属性行内样式 > ID 选择器 > class 选择器 > 标签 > 通配符(*) > 继承的样式 > 浏览器默认属性


计算权值：!important最高 > id = 100 > class = 10 > 标签 = 1 > 继承 = 0.1

## block、 inline 和 inline-block 的区别
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

## line-height 的继承问题
- 写具体数值，如 30px，则继承该值
- 写比例，如 2，或者 1.5，则继承该比例
- 写百分比，如 200%，则继承计算出来的值（根据写 line-height 的元素的 font-size 来计算）（考点）
```html
<!-- p 标签的行高是多少？ -->
<style type="text/css">
    body {
        font-size: 20px;
        line-height: 200%;
        /*  继承出来是 200% * 20 = 40px */
        /* line-height: 1.5;  */
        /*  继承出来是 1.5 * 16 = 24px */
    }
    p {
        background-color: #ccc;
        font-size: 16px;
    }
</style>
<body>
    <p>这是一行文字</p>
</body>
<!-- 40px -->
```


# CSS响应式
## rem 是什么？和 em、px 的区别
rem 是一个长度单位：
- px：绝对长度单位，最常用
- em：相对长度单位，相对于父元素，不常用
- rem：相对长度单位，相对于根元素（当前页面根元素 HTML），常用

HTML 的 font-size 设置为多少，相当于 1 个 rem 等于多少像素。一般给 HTML 的字体大小是 100px（1rem = 100px），后边写的样式都用rem 设定。
- 如果 HTML 的 font-size 不变，用 rem 和 px 一样
- 如果字体大小改变，也就是改变了 rem 和 px 的换算比例，整个页面用rem 写的都会跟着缩放。




## 响应式布局常见方案？
media-query，根据不同的屏幕宽度设置 html 根元素 font-size
rem，基于根元素的相对单位

```javascript
//=>根据当前设备的宽度，动态计算出 rem 的换算比例，实现页面中元素的等比缩放
~function anonymous(window) {
    let computedREM = function () {
        let winW = document.documentElement.clientWidth,
            desW = 640;
        if (winW >= 640) {
            document.documentElement.style.fontSize = '100px';
            return;
        }
        document.documentElement.style.fontSize = winW / desW * 100 + 'px';
        // winW/desW = ?/100
    };
    computedREM();
    window.addEventListener('resize', computedREM);
}(window);
```
项目常用的尺寸有：
- 640*1136
- 750*1334
- 640*960
把所有的px都除以100变为rem，所有的单位都基于rem来设置



## vw/vh
网页视口尺寸
- window.screen.height：屏幕高度
- window.innerHeight：网页视口高度（去掉头尾）
- document.body.clientHeight：body 高度

vh：网页视口高度的 1/100
vW：网页视口宽度的 1/100
vmax 取两者最大值，vmin 取两者最小值



CSS 预处理语言，赋予了 CSS 如变量、继承、运算、函数等动态语言的特性。
均具有“变量”、“混合”、“嵌套”、“继承”、“颜色混合”五大基本特性。

reset.css 作用：能够重置浏览器的默认 CSS 样式。


## CSS3 动画（重要）
+ transition：过度动画
+ animation：帧动画
transform是变形不是动画（经常依托某一种动画让元素在一定时间内实现变形效果）
能用CSS3的就不用JS，因为CSS3动画性能好。
+ keyFrame


# 常考面试题
```html
<!-- 元素 p 内的文字最终什么颜色 -->
<style>
   .classA { color: blue; }
   .classB { color: red;}
</style>
<p class="classB classA">hello</p>
<!-- red：与 style 中样式定义的先后顺序有关，与 class 的先后无关 -->
```