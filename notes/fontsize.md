#font-size和前端设计稿适配不同的分辨率

##网易的做法：
![网易网页的截图](http://i.imgur.com/G7tpAIo.png)	<br />
 它的设计稿是基于iPhone4/iPhone5来设计的，所以它的横向分辨率是640px。取一个100px的font-size为参照物，那么body元素的宽度就是6.4rem，于是html元素的font-size=deviceWidth / 6.4。deviceWidth就是viewport设置中的那个。
	deviceWidth = 320, font-size = 320 / 6.4 = 50px
	deviceWidth = 375, font-size = 375 / 6.4 = 58.59375px
	deviceWidth = 414, font-size = 414 / 6.4 = 64.6875px
	deviceWidth = 500, font-size = 500 / 6.4 = 78.125px
	
	deviceWidth = document.documentElement.clientWidth
	document.documentElement.style.fontSize  = document.documentElement.clientWidth / 6.4 + 'px';

 总结网易的做法：	<br />
（1）先拿设计稿竖着的横向分辨率除以100得到body元素的宽度：	<br />
如果设计稿基于iphone6，横向分辨率为750，body的width为750 / 100 = 7.5rem	<br />
如果设计稿基于iphone4/5，横向分辨率为640，body的width为640 / 100 = 6.4rem	<br />
（2）布局时，设计图标注的尺寸除以100得到css中的尺寸，比如下图：<br />
播放器高度为210px，写样式的时候css应该这么写：height: 2.1rem。之所以取一个100作为参照，就是为了这里计算rem的方便！	<br />
（3）在dom ready以后，通过以下代码设置html的font-size:	<br />
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
6.4只是举个例子，如果是750的设计稿，应该除以7.5。 	<br />
（4）font-size可能需要额外的媒介查询，并且font-size不能使用rem，如网易的设置：	<br />
	@media screen and (max-width:321px){
		.m-navlist{font-size:15px}
	}
	@media screen and (min-width:321px) and (max-width:400px){
		.m-navlist{font-size:16px}
	}
	@media screen and (min-width:400px){
		.m-navlist{font-size:18px}
	}

 另外，需要设置：
	<meta name="viewport" content="initial-scale=1,maximum-scale=1, minimum-scale=1">


##淘宝的做法：
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
	device-width = 设备的物理分辨率/(devicePixelRatio*scale)，devicePixelRatio是设备像素比，每款设备的devicePixelRatio都是一致的且不变。
	如果scale=1，device-width = 设备的物理分辨率/devicePixelRatio

淘宝触屏版布局的前提就是viewport的scale根据devicePixelRatio动态设置。<br />

 总结淘宝的做法：	<br />
（1）动态设置viewport的scale	<br />
	var scale = 1/devicePixelRatio;
	document.querySelector('meta[name=viewport]').setAttribute('content', 'initial-scale=' + scale + ',maximun-scale=' + scale + ',user-scalable=no');
（2）动态设置html的font-size	<br />
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
（3）布局的时候，各元素的css尺寸=设计稿标注尺寸/设计稿横向分辨率/10	<br />
（4）font-size可能需要额外的媒介查询，并且font-size不使用rem，这一点跟网易是一样的。	<br />


实际过程如何协作开发：
![](http://i.imgur.com/Pjj0oSS.png)<br />
解释一下就是：<br />

第一步，视觉设计阶段，设计师按宽度750px（iPhone 6）做设计稿，除图片外所有设计元素用矢量路径来做。设计定稿后在750px的设计稿上做标注，输出标注图。同时等比放大1.5倍生成宽度1125px的设计稿，在1125px的稿子里切图。<br />

第二步，输出两个交付物给开发工程师：一个是程序用到的@3x切图资源，另一个是宽度750px的设计标注图。<br />

第三步，开发工程师拿到750px标注图和@3x切图资源，完成iPhone 6（375pt）的界面开发。此阶段不能用固定宽度的方式开发界面，得用自动布局（auto layout），方便后续适配到其它尺寸。<br />

第四步，适配调试阶段，基于iPhone 6的界面效果，分别向上向下调试iPhone 6 plus（414pt）和iPhone 5S及以下（320pt）的界面效果。由此完成大中小三屏适配。<br />

注意第三步，就要使用我们以上介绍的网易跟淘宝的适配方法了。假如公司设计稿不是基于750的怎么办，其实很简单，按上图做一些相应替换即可，但是流程和方法还是一样的。解释一下为什么要在@3x的图里切，这是因为现在市面上也有不少像魅蓝note这种超高清屏幕，devicePixelRatio已经达到3了，这个切图保证在所有设备都清晰显示。<br />