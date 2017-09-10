### click点击失效
	
	// HTML代码：
	<div class="report-item-block review-report" data-id="7179" data-tid="33761934">
	    <div class="item-block-profile">
	      <div class="profile-img">
	        
	          <img src="/avatar.png">
	        
	      </div>
	      <div class="profile-name">大文文啊</div>
	    </div>
	    <div class="item-block-content">
	      <p>昨天下午快递小哥送来的，申通快递，挺高兴的，<昨天下午快递小哥送来的，申通快递，挺高兴的，昨天下午快递小哥送来的，申通快递，挺高兴的，昨天下午快递小哥送来的，申通快递，挺高兴的，昨天下午快递小哥送来的，申通快递，挺高兴的，昨天下午快递小哥送来的，申通快递，挺高兴的。/p>
	    </div>
	    <div class="item-block-time">2016-12-06</div>
	  </div>

	// js代码：
	function onReviewReport(e) {
	  // e.preventDefault();
	  var $target = $(e.currentTarget);
	  var tid = $target.data('tid');
	  var id = $target.data('id');
	
	  if (tid && tid != '0') {
	    jsbridge.openTopic(tid);
	  } else {
	    Turbolinks.visit('/lists-review-report?id=' + id + '&' + window.moduleMeta.qs);
	  }
	}

	$('body').on('click', '.review-report', onReviewReport);


问题原因：

解决方案（以下验证都是可行的）：

1.直接把click事件绑定在触发对象上

	$('.review-report').on('click', onReviewReport);

2.改click事件为touch事件

	touch事件过程：
		touchstart -> touchend：触发某些事件函数
		touchstart -> touchmove -> touchend：不触发某些事件函数

	var ismove = false;
	$('body')
		.on('touchmove', '.review-report', () => {
		  ismove = true;
		})
		.on('touchstart', '.review-report', () => {
		  ismove = false;
		})
		.on('touchend', '.review-report', (e) => {
		  if (!ismove) {
		    onReviewReport(e);
		  }
		});

	“用click事件的时候发现在ios下没有效果，在网上找资料时候发现原来这是ios下的一个瑕疵，在文字上触发click事件无效，只需要把click事件替换成touchend事件即可，所以在移动端项目还是都尽量使用touch事件来，click事件估计坑还是比较多。”

参考链接：[http://www.jianshu.com/p/0c92a92e1910](http://www.jianshu.com/p/0c92a92e1910 "http://www.jianshu.com/p/0c92a92e1910")

3.改目标对象为cursor: pointer;
	
因为click的事件是绑定在div上，在IOS上会有失效的情况，但是在Android和各种模拟器中一切正常。

在网上找到一个说法：

	“后来经过查找资料才知道，苹果有这么个设置： 
	对于点击的对象，拥有cursor:pointer这个样式的设置，也就是说，鼠标放上去，能够出现“手”型的图标才被认作可以使用点击事件，于是果断增加了样式cursor: pointer;”

参考链接：[http://blog.csdn.net/yuexiage1/article/details/51612496](http://blog.csdn.net/yuexiage1/article/details/51612496)



额外的知识点：

1.on的原理

如果传递了selector参数，那么on()函数并不是为当前jQuery对象匹配的元素绑定事件处理函数，而是为它们的后代元素中符合选择器selector参数的元素绑定事件处理函数。on()函数并不是直接为这些后代元素挨个绑定事件，而是委托给当前jQuery对象的匹配元素来处理。由于**DOM 2级的事件流机制**，当后代元素selector触发事件时，该事件会在事件冒泡中传递给其所有的祖辈元素，当事件流传递到当前匹配元素时，jQuery会判断是哪个后代元素触发了事件，如果该元素符合选择器selector，jQuery就会捕获该事件，从而执行绑定的事件处理函数。

**注意**："focus"、"blur"等部分事件不支持冒泡，使用事件委托机制将无效。不过，他们一般也有对应的支持冒泡的事件。例如与"focus"对应的"focusin"，与"blur"对应的"focusout"。此外，我们也可以使用event.stopPropagation()方法，让当前触发的事件停止冒泡。