
###webpack 一般的优化就是加缓存，编译检查忽略第三方模块，还有就是做预构建
https://github.com/zhbhun/WebpackStudyDemo/tree/master/7-advanced/7.3-buil-performance

1.loader 肯定会影响构建时间的

加 babel-cache 应该可以提升很大一部分
babel-loader 加个 cache 会优化很多，eslint-loader 忽略第三方模块 做到这些应该就ok了

2.启动时间控制在30秒内一般可以接受了，修改代码时的重新构建时间最好确保在1 秒内


3.对开发辅助工具devtool的7种类型详解：
[https://segmentfault.com/a/1190000004280859](https://segmentfault.com/a/1190000004280859)