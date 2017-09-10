## 安装node-sass时的问题

webpack2使用sass-loader时需要node-sass，但是在安装过程中遇到一系列问题。

	Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 6.x

网上看到了一些解决办法都是说执行 

	nom rebuild node-sass

但是还是会报错：

	$ npm rebuild node-sass

	> node-sass@4.5.3 install D:\web-meiyou-test\nodejs-try\node_modules\node-sass
	> node scripts/install.js
	
	Downloading binary from https://github.com/sass/node-sass/releases/download/v4.5.3/win32-x64-48_binding.node
	Cannot download "https://github.com/sass/node-sass/releases/download/v4.5.3/win32-x64-48_binding.node":
	
	connect ETIMEDOUT 54.231.40.219:443
	
	Timed out whilst downloading the prebuilt binary
	
	Cannot download "https://github.com/sass/node-sass/releases/download/v3.8.0/win32-x64-46_binding.node":

关键信息：

	Cannot download "https://github.com/sass/node-sass/releases/download/v4.5.3/win32-x64-48_binding.node":

自己去下载它。下载完了之后把它注册成全局环境变量，两种方式：

第一种：直接右键我的电脑--》属性--》高级系统设置--》环境变量--》添加

第二种：set XXX=文件路经--》set SASS_BINARY_PATH=F:\lishiming\tools\node-sass\win32-x64-46_binding.node

后面又出现下面这个问题：

	Module build failed: ModuleBuildError: Module build failed: Error: %1 is not a valid Win32 application.
	\\?\D:\web-meiyou-test\nodejs-try\node_modules\node-sass\vendor\win32-x64-48\binding.node


![cnpm](http://i.imgur.com/3mhkyx7.png)



使用淘宝 NodeJS 镜像加速 Electron Node-Sass 的安装速度
http://zqlu.github.io/2016/05/10/taobao-nodejs-mirror/
