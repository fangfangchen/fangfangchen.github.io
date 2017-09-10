## git 提交规范 —— 自定义

提交的基本形式： `<type>(<scope>):<subject><BLANK LINE><body><BLANK LINE><footer>`

type：
	
	feat: 一个新功能；
	docs: 仅文档更改；
	fix: 修复错误；
	refactor: （重构）代码更改，既不修复错误也不添加功能；
	perf: 改进性能的代码更改；
	style: 不影响代码含义的变化（空白，格式化，缺少分号等）；
	test: 添加缺失测试或更正现有测试；

scope：

	用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

subject：

	subject是 commit 目的的简短描述，不超过50个字符。
	
		1.以动词开头，使用第一人称现在时，比如change，而不是changed或changes
	
		2.第一个字母小写
	
		3.结尾不加句号（.）


BLANK LINE：

	空行。

body:

	body是对本次 commit 的详细描述，可以分成多行。

	有两个注意点。

	（1）使用第一人称现在时，比如使用change而不是changed或changes。

	（2）应该说明代码变动的动机，以及与以前行为的对比。


Footer:

	只用于两种情况。
	
	（1）不兼容变动
	
	如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。

	（2）关闭 Issue

	如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。



![示例](http://i.imgur.com/xUchF9P.png)