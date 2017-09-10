## webpack
###webpack配置
1. entry: js入口源文件
2. output: 生成文件
3. module: 进行字符串的处理
4. resolve: 文件路径的指向
5. plugins: 插件比loader更强大，能使用更多webpack的api

###常用loaders介绍
1. 处理样式，转成css：如 less-loader, sass-loader
2. 图片处理，如 url-loader, file-loader。两个都必须用上，否则超过大小限制的图片无法生成到目标文件夹中。
3. 处理js，将es6或更高级的代码转为es5的代码，如 babel-loader, babel-preset-es2015, babel-preset-react。
4. 将js模块暴露到全局，如 expose-loader。


###常用Plugins介绍
1. 代码热替换，HotModuleReplacementPlugin
2. 生成HTML文件，HtmlWebpackPlugin
3. 将css生成文件，而非内联，ExtractTextPlugin
4. 报错但不退出webpack进程，NoErrorsPlugin
5. 代码丑化，UglifyJsPlugin。开发过程不建议打开
6. 多个HTML共用一个js文件（chunk），可用CommonsChunkPlugin
7. 清理文件夹，Clean
8. 调用模块的别名，ProvidePlugin。如想在js中使用$，如果通过webpack加载，需要将$与jQuery对应起来。

## **HtmlWebpackPlugin** webpack插件
	pageArr.forEach((page) => {
	  const htmlPlugin = new HtmlWebpackPlugin({
	    filename: `${page}/page.html`,
	    template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
	    chunks: [page, 'commons'],
	    hash: true, // 为静态资源生成hash值
	    minify: true,
	    xhtml: true,
	  });
	  configPlugins.push(htmlPlugin);
	});

配置详解：<br />
1. filename: 生成的网页HTML文件的文件名。注意可以**利用/来控制文件目录结构，其最终生成的路径，是基于webpack配置中的output.path的**。<br />
2. template: 指定一个基于(某个路径下的)某种模板引擎语法的模板文件，默认支持ejs格式的模板文件。如果想使用其他格式的模板文件，需要配置好相应的loader，比如 handlebars-loader、html-loader等。<br />
如果你做的是简单的SPA应用，那么这个参数不指定也行，但对于多页应用来说，我们就依赖模板引擎给我们拼装页面了，所以这个参数非常重要。<br />
3. inject: 指示把加载 js 文件用`<script>`插入到哪里，默认是插到`<body>`的末端。如果设为'head'，则把`<script>`插到<head>里。<br />
可取的值： `false | true | 'body' | 'head'`<br />
4. minify: 生成压缩后的HTML代码。<br />
5. hash: 在由html-webpack-plugin负责加载的js/css文件的网址末尾加个URL参数，此URL参数的值是代表本次编译的一个hash值，每次编译后该hash值都会变化，属于缓存解决方案。<br />
	.app {
		text-size-adjust: none;
		font-family: helvetica, arial, sans-serif;
		line-height: 200%;
		padding: 6px 20px 30px;
	}
	/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWluLmNzcyIsInNvdXJjZVJvb3QiOiIifQ==*/
6. chunks: 以数组的形式指定由html-webpack-plugin负责加载的chunk文件（打包后生成的js文件），不指定的话就会加载所有的chunk。<br />


**webpack-dev-middleware**

webpack-dev-middleware是一个处理静态资源的middleware。前面说的webpack-dev-server，实际上是一个小型Express服务器，它也是用webpack-dev-middleware来处理webpack编译后的输出。

**webpack-hot-middleware**

webpack-hot-middleware是一个结合webpack-dev-middleware使用的middleware，它可以实现浏览器的无刷新更新（hot reload）。这也是webpack文档里常说的HMR（Hot Module Replacement）。HMR和热加载的区别是：热加载是刷新整个页面。

**cross-env**

cross-env 也是一个npm组件，可以处理windows和其他Unix系统在设置环境变量的写法上不一致的问题。