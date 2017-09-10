Chrome资源优先级

每种资源类型（css,jacascrit,字体等）都有自己的一套规则，规定他们如何被排序。下面是网络优先级计划的不完全清单：

**HTML** —— 最高优先级（Highest）

**styles** —— 最高优先级（Highest）。使用@import引用的样式同样也是最高级，但是被排在阻塞脚本之后。

**images** —— 是唯一可以根据视口动态改变优先级的资源。所有图像以低优先级开始，但是在可见视口中渲染时将被提升为中等优先级。

**Ajax/XHR/fetch()** —— 高优先级（High）。

**Script** —— 遵循个复杂的加载优先级方案。

- 使用`<script src="name.js"></script>`加载的`script`，如果该标签出现在**图片之前**，它会被定为高优先级（High）。
- 使用`<script src="name.js"></script>`加载的`script`，如果该标签出现在**图片之后**，它会被定为中优先级（Medium）。
- 使用了`async`或`defer`属性的`script`，它会被定为低优先级（Low）。
- 使用了`type="module"`属性的`script`，它会被定为低优先级（Low）。

**Fonts** —— 是非常重要的资源，所以字体理应以最高优先级（Highest）下载。但是不幸的是，大部分@font-face标签都是包含在外链的css中（像这样加载`<link rel="stylesheet" href="file.css>`）.这就意味着字体往往会在样式加载之后才进行加载。

Web字体几乎可以被定为"绝对关键"，但是针对字体被发现并下载的方式有一些根本性问题：

- 我们只有等到CSS被加载、解析和应用，才能发现@font-face规则。
- 只有通过选择器将CSS规则匹配到DOM，才会将该字体添加到浏览器的请求队列中。
- 选择器匹配发生在样式重新计算的过程中。它不一定在样式下载之后“立刻”发生，当主线程繁忙的时候，它可能被延迟。

**预加载** （`<link rel="preload" href="font.woff" />`）让浏览器把`font.woff`放在加载队列的高优先级（Hight）中。

**注意**：font.woff应该以高优先级下载的原因是as="font"—它是一个字体，所以它遵循我们在之前“Chrome如何确立资源的优先级”一节所谈到的优先级规则。

font:
`<link rel="preload" as="font" href="" type="font/woff2" crossorigin />`
`<link rel="preload" as="font" href="" type="font/woff2" crossorigin />`

media:
`<link rel="preload" href="article-lead-sm.jpg" as="image" type="image/jpeg" media="only screen and (max-width: 48rem)">`

69%网站使用了web字体, 不幸的是，他们在大多数情况下体验并不太好。这些文字出现，然后消失，然后再次出现，改变字重并在渲染过程中使页面发生抖动。

坦率地说，这几乎在每一个层面上都很糟糕。

正如您在上面看到的，控制字体的请求顺序和优先级对渲染速度有很大的影响。显然，我们应该**在大多数情况下为Web字体请求排优先级。**

我们可以使用CSSfont-display属性进一步改进。这个属性允许我们在请求和加载Web字体过程中控制字体显示的方式。

显示方式有四个选项，但是我建议使用font-display: swap;，在Web字体加载完之前，使用后备字体进行显示--加载完成后直接替换原先的字体。

像这样定义一系列字体：

	body {
	    font-family: Calibre, Helvetica, Arial;
	}
浏览器会在Calibre字体加载完成之前，先使用Helvetica字体（或者Arial字体，如果你没有先使用Helvetica字体字体的话）进行展示。现在只有Chrome和Opera支持font-display，但这是跨越性的异步，从今天起就没有理由不使用它了。

测试网站：calibreapp.com
Calibre是一个自动化的工具，用于审核性能、可访问性和Web最佳实践，它将帮助你保持领先。

参考链接: http://www.w3cplus.com/css/the-critical-request.html © w3cplus.com