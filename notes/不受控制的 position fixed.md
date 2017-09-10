
`position:fixed;`失效的情况：

**fixed的作用：**

position:fixed 的元素将相对于屏幕视口（viewport）的位置来指定其位置。并且元素的位置在屏幕滚动时不会改变。


****堆叠上下文（Stacking Context）**

堆叠上下文是 HTML 元素的三维概念，这些 HTML 元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的 z 轴上延伸，HTML 元素依据其自身属性按照优先级顺序占用层叠上下文的空间。


**创建堆叠上下文的方式**

为此，首先要找到所有能够使元素生成堆叠上下文的方法。

So，如何触发一个元素形成 堆叠上下文 ？方法如下（参考自 MDN）：

根元素 (HTML),
z-index 值不为 “auto”的 绝对/相对定位，
一个 z-index 值不为 “auto”的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex，
opacity 属性值小于 1 的元素（参考 the specification for opacity），
transform 属性值不为 “none”的元素，
mix-blend-mode 属性值不为 “normal”的元素，
filter值不为“none”的元素，
perspective值不为“none”的元素，
isolation 属性被设置为 “isolate”的元素，
position: fixed
在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值
-webkit-overflow-scrolling 属性被设置 “touch”的元素

**层叠上下文对 fixed 定位的影响（不同内核下表现可能不一致）。**