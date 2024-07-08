css
===========
#### CSS 加载方式有几种？
#### @import 有什么作用？如何使用？
#### CSS 选择器常见的有几种？
#### id 选择器和 class 选择器的使用场景分别是什么？
#### @charset 有什么作用？
#### 简述 src 和 href 的区别？
#### 页面导入时，使用 link 和 @import 有什么区别？
#### 伪类选择器有哪些？
#### 伪元素和伪类的区别？
#### 选择器的优先级是如何计算的？
#### 什么是 CSS 继承？哪些属性能继承，哪些不能？
#### 你有没有使用过视网膜分辨率的图形？当中使用什么技术？
#### px，em，rem，vw 有什么区别？
#### 简述字体图标的原理，动手实现使用 iconfont 实现字体图标的 demo。
#### 块级元素和行内元素分别有哪些？ 空（void）元素有那些？块级元素和行内元素有什么区别？
#### IE 盒模型和 W3C 盒模型有什么区别?
#### 在什么场景下会出现外边距合并？如何合并？如何不让相邻元素外边距合并？给个父子外边距合并的
#### line-height: 2; 和 line-height: 200%; 有什么区别?
#### 在什么场景下会出现外边距合并？如何合并？如何不让相邻元素外边距合并？给个父子外边距合并的范例。
#### 行内元素的“边框”、“边界”等“框属性”是由 font-size 还是 line-height 控制？
#### height=line-height 可以用来垂直居中单行文本？代码怎么实现？
#### inline-block 有什么特性？
#### inline-block 在实际工作中有什么作用？
#### 怎么去除两个按钮中间的缝隙问题？
#### 一个页面有一排高度不一样的产品图，这时如果我们用 inline-block ，怎样使他们“顶端对齐”？
#### 浮动元素有什么特征？对父容器、其他浮动元素、普通元素、文字分别有什么影响？
#### 清除浮动指什么？如何清除浮动？两种以上方法。
#### 让一个元素“看不见”有几种方式？有什么区别？
#### 单行文本溢出加 ... 如何实现？
#### 如何在页面上实现一个圆形的可点击区域？
#### 有几种定位方式？分别是如何实现定位的？参考点是什么？使用场景是什么？
#### z-index 有什么作用？如何使用？
#### BFC 是什么？如何生成 BFC？BFC 有什么作用？举例说明。
#### 在什么场景下会出现外边距合并？如何合并？如何不让相邻元素外边距合并？给个父子外边距合并的范例？
####  如何使用伪元素来清除浮动？
####  可以通过哪些方法优化 CSS3 animation 渲染？
####  如何让块级元素水平居中？如何让行内元素水平居中？如何让 inline-block 元素水平居中？
####  垂直上下居中的办法？
#### 响应式布局原理？
####  列举你了解的 HTML5、CSS3 新特性？
####  Canvas 和 SVG 有什么区别？
####   渐进增强和优雅降级分别是什么意思？
####   什么是 CSS hack？在哪个网站查看标签（属性）的浏览器兼容情况？
####   IE6、7 的 hack 写法是？
#####  尽可能多的列举浏览器兼容的处理范例？
#####  css reset 是什么？css 预编译器是什么？后编译器（post css）是什么？
#####  css reset 和 normalize.css 有什么区别？
#####  尽可能多的写出浏览器兼容性问题？
#####  如何让 Chrome 浏览器显示小于 12px 的文字？
#####  CSS 预处理器的比较：less、sass？
##### 常见兼容性问题？
##### 列举 CSS 编码规范？
##### 编码规范的作用是什么？列举 5 条以上编码规范。
##### 


#### _**css的定位position**_
position :relative absolute fixed  
relative:相对定位，相对于改元素在文本流中的位置进行定位，不脱离文本流    
absolute:绝对定位，相对于该元素的父级元素中带有position的元素进行定位，如果没有父级元素带有
position属性则相对于body元素进行定位，脱离文本流    
fixed:固定定位，相对于屏幕的视口进行定位，脱离文本流

#### _**inline、block和inline-block的区别**_
**行内元素**  
常见行内元素：span i a strong em label input textarea img select
行内元素在容器内横向排列直到该行排满,元素的宽度随着元素的内容而变化不能设置width height
只有横向两个方向的margin padding 属性   
_**块级元素**_  
常见块级元素 div p h1 form table dl ol ul 
块级元素在容器内竖向排列，一个块级元素自占一行，可以设置width height
具有四个方向的margin padding     
**内联块级元素**  
简单理解为inline里面包裹了一个block容器

#### _**两栏布局**_
* flex实现
```html
<style>
.main {
  display: flex;
  align-items: flex-start;
  width:500px;
  background:black;
  height:500px;
}
.main .left {
    background:red;
    width:200px;
     height:100%;
    flex: 0 0 auto;
}
.main .right {
  background:yellow;
  height:100%;
    flex: 1 1 auto;
}</style>
</head>
<body>
<div class="main">
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```
* float + margin-right
* float + BFC
* position:absolute;+margin-left
* 左侧定宽 右侧calc计算

#### _**三栏布局**_
#### _**圣杯布局、双飞翼布局**_
两种布局都是利用浮动，圣杯布局三栏都向左浮动，
双飞翼布局分别向左右浮动，然后中间栏放置在两栏之后并且不浮动，使用margin将左右区域撑开。父元素清除浮动
圣杯布局是middle+padding，
双飞翼采用子元素+margin
```html
<div id="content">
<!--双飞翼布局  注意为什么不是 main 在前面 -->
  <div class="menu">aside</div>
  <div class="aside">aside</div>
  <div class="main">content</div>
</div>
<div id="footer">footer</div>
<style>
#content:after {
  content: '';
  display: block;
  clear: both;
}
.menu {
  width: 100px;
  height: 500px;
  background: pink;
  float: left;
}
.aside {
  width: 200px;
  height: 500px;
  background: yellow;
  float: right;
}
.main {
  margin-left: 110px;
  margin-right: 210px;
  height: 400px;
  background: red;
}
#footer {
  background: #ccc;
}
</style>
```
```html
<!--圣杯布局 -->
<div class="head"></div>
<div class="content">
<div class="main"></div>
<div class="left"></div>
<div class="right"</div>
</div>
<div class="footer"></div>
<style>
.head{
    width: 100%;
	height: 30px;
	background: green;
}
.content {
	overflow: hidden;
	padding: 0 100px;
}
.right {
  position:relative;		
  width:100px;
  float:left;
  right:-100px;
  height:80px;
  margin-left: -100px;
  background: pink;
}
.left {
    position:relative;
  width: 100px;
  height: 500px;
  background: yellow;
  float: left;
  margin-left: -100%;
  left:-100px;
}
.main {
  float:left;
  height: 400px;
  background: red;
  width:100%;
}
</style>
```
#### _**弹出框**_

#### _**清除浮动**_
* 清除前面兄弟元素 clear:both;
* 闭合子元素浮动
  * 父元素 构建BFC
  * 父元素伪类 clear:both;
#### _**flex布局**_
#### _**div垂直body居中、div内的text垂直居中，div高度等于body宽度的一半**_

































