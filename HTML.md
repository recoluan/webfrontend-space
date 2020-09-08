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


