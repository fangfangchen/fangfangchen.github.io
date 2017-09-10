#Vue项目构建过程问题

-----
在执行： npm run dev 时报错，截图如下：

![](http://i.imgur.com/r0Ms4pK.png)
-----
关键的信息：

     @ ./src/router/index.js 103:15-47

	ERROR in

	Vue packages version mismatch:

	- vue@2.2.1
	- vue-template-compiler@2.1.8

	This may cause things to work incorrectly. Make sure to use the same version for both.
	If you are using vue-loader@>=10.0, simply update vue-template-compiler.
	If you are using vue-loader@<10.0 or vueify, re-installing vue-loader/vueify should bump vue-template-compiler to the latest.


解决方法：
	npm remove #移除某个版本依赖

逐一移除上面提示的那三个依赖再重装。
	npm remove vue-template-compiler

	npm remove vue

	npm remove vue-loader

	npm install vue@2.1.8

	npm install vue-template-compiler@2.1.8

	npm install vue-loader@10.0.2

然后再执行：

	npm run dev

就不会报错了。
