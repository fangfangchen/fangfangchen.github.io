## ESLint

### 1.规则
规则的错误等级有三种：

	"off" 或者 0：关闭规则。
	"warn" 或者 1：打开规则，并且作为一个警告（不影响exit code）。
	"error" 或者 2：打开规则，并且作为一个错误（exit code将会是1）。


模块multimatch 是 stylelint 依赖的

### 2.在webpack2下使用例子

	{
	  // ...
	  module: {
	    rules: [
	      {
	        test: /\.js$/,
	        use: [
	          {
	            loader: 'babel-loader'
	          },
	          {
	            loader: 'eslint-loader'
	          }
	        ],
	        exclude: '/node_modules/'
	      }
	    ]
	  },
	  plugins: [
	    new webpack.LoaderOptionsPlugin({
	      options: {
	        eslint: {
	          // TODO: consider separate config for production,
	          // e.g. to enable no-console and no-debugger only in production.
	          configFile: path.join(__dirname, '../.eslintrc.json')
	        }
	      }
	    })
	  ]
	}


引入 eslint-loader，并在plugins里添加规则检验的配置文件 configFile: path.join(__dirname, '../.eslintrc.json')