## 提高webpack构建效率方法

## 1.针对webpack1

### 一.通用方法
1.module.noParse 忽略已知文件的解析

参考链接：[http://code.oneapm.com/javascript/2015/07/07/webpack_performance_1/](http://code.oneapm.com/javascript/2015/07/07/webpack_performance_1/ "http://code.oneapm.com/javascript/2015/07/07/webpack_performance_1/")


2.babel-loader/eslint-loader


3.cache

	webpack.cache
	babel-loader.cacheDirectory

4.CommonsChunkPlugin


### 二.开发环境优化

1.devtool 多种sourceMap

2.external 外部扩展，使用公共CDN

3.DLLReferencePlugin


### 三.生产环境优化

1.UglifyJsPlugin


## 1.针对webpack2

### 一.通用方法

1.多进程构建 HappyPack


### 二.开发环境优化

1.分离第三方依赖 DLLPlugin


### 三.生产环境优化

1.提取公共的依赖模块 CommonsChunkPlugin

2.文件分离 CDN && ExtractTextPlugin

3.资源混淆和压缩 webpack-parallel-uglify-plugin

4.Gzip压缩 compression-webpack-plugin



###webpack 一般的优化就是加缓存，编译检查忽略第三方模块，还有就是做预构建
https://github.com/zhbhun/WebpackStudyDemo/tree/master/7-advanced/7.3-buil-performance

1.loader 肯定会影响构建时间的

加 babel-cache 应该可以提升很大一部分
babel-loader 加个 cache 会优化很多，eslint-loader 忽略第三方模块 做到这些应该就ok了

2.启动时间控制在30秒内一般可以接受了，修改代码时的重新构建时间最好确保在1 秒内


3.对开发辅助工具devtool的7种类型详解：
[https://segmentfault.com/a/1190000004280859](https://segmentfault.com/a/1190000004280859)

4.详解Webpack中的sourcemap
[https://segmentfault.com/a/1190000008315937](https://segmentfault.com/a/1190000008315937)

	看似配置项很多， 其实只是五个关键字eval，source-map，cheap，module，inline的任意组合。这五个关键字每一项都代表一个特性， 这四种特性可以任意组合。它们分别代表以下五种特性（单独看特性说明有点不明所以，别急，往下看）：

	eval： 使用eval包裹模块代码
	source-map： 产生.map文件
	cheap： 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap
	module： 包含loader的sourcemap（比如jsx to js ，babel的sourcemap）
	inline： 将.map作为DataURI嵌入，不单独生成.map文件（这个配置项比较少见）

问：试用中心的在开发的时候，需要跑watch和serve。虽然要跑两次，但是一个是重构建的过程，一个是请求接口的情况，这样子挺直观的，还需要再改造么？

答：一般开发用server跑构建，
1. 性能会更好
2. 支持更多webpack 的开发特性，例如热加载
3. 可以和express集成

最后我觉得我们可以用之前财务的那套工具处理我们所有的前端项目，经过更多项目的实验，会变得更加完善，这个工具也算我们前端构建经验的沉淀

1.试用中心改用 webpack-dev-server，开启样式热加载

	因为extract-text-webpack-plugin关闭了HMR，官方建议在开发环境下关闭。
	new ExtractTextPlugin({disable: true})

2.试用 webpack 处理前端所有文件的依赖关系

3.然后就是封装下 webpack 的配置，简化下 webpack 的使用！


