### input[type=date] 

HTML5提供了一些新的日期时间input的类型：

	<input type="data">
	<input type="time">
	<input type="datatime">
	<input type="month">
	<input type="week">
	<input type="datetime-local">

但是在具体使用input[type=date]的过程中遇到了一些问题。

	1、给它设置默认值的时候发现无效，在MDN上找到这段：
		“One thing to note is that the displayed date format differs from the actual value — the displayed date format will be chosen based on the set locale of the user's operating system, whereas the date value is always formatted yyyy-mm-dd.”
	只支持yyyy-mm-dd格式的值，也就是 <input type="date" value="2017-05-18">

	
	2、无法修改它的默认展示格式，它的格式是跟随系统的。比如在IOS下展示的是XXXX年XX月XX日，在Android下是 XXXX/XX/XX 或者 XXXX-XX-XX。 

	解决的方法：监听日期控件的变化，处理它的值之后赋给一个div，来展示想要的时间格式。
