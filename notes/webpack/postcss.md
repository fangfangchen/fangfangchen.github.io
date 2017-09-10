### postcss-loader加载器问题
-------------------------------

问题描述：

	Module build failed: Error: No PostCSS Config found in: C:\Users\Administrat...


代码：

	// app.css 
	.top-nav {
		display: flex;
	}

	// webpack.js
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader']
			},
			{
				test: /\.(sass|scss)$/,
				// use: ['css-loader', 'sass-loader']
				loader: ExtractTextPlugin.extract({
					loader: 'sass-loader'
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					loader: ['css-loader', 'postcss-loader']
				})
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({
			filename: 'app.css'
		}),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: './index.html'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
			  postcss: [
			  	autoprefixer({
						browsers: ['last 2 versions']
					})
			  ]
			}
		})
	]


### 问题解决方案1
--------------------------

 修改为：
	
	// webpack.js

	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader']
			},
			{
				test: /\.(sass|scss)$/,
				// use: ['css-loader', 'sass-loader']
				loader: ExtractTextPlugin.extract({
					loader: 'sass-loader'
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					loader: ['css-loader', 'postcss-loader']
				})
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({
			filename: 'app.css'
		}),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: './index.html'
		}),
	]

并新增 postcss.config.js 文件：
	
	// postcss.config.js

	module.exports = {
	  plugins: [
	      require('autoprefixer')
	  ]
	};

效果：	
	
	// app.css

	.top-nav {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}


### 问题解决方案2
--------------------------
	//webpack.js

	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader']
			},
			{
				test: /\.(sass|scss)$/,
				// use: ['css-loader', 'sass-loader']
				loader: ExtractTextPlugin.extract({
					loader: 'sass-loader'
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					// loader: ['css-loader', 'postcss-loader']
					use: [
						{
							loader: 'css-loader'
						}, {
							loader: 'postcss-loader',
							options: {
								plugins() {
									return [
										require('autoprefixer')({
											browsers: [
												'>1%',
												'last 2 versions',
												'Firefox ESR',
												'not ie < 9'
											]
										})
									]
								}
							}
						}
					]
				})
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			}
		]
	},