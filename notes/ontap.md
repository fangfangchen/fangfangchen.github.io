
### 自定义tap事件

	$.fn.ontap = function (callback) {
		var hasMove = false;
		var timeStamp = 0;
	
		$(this)
			.on('touchstart', function () {
				hasMove = false;
				timeStamp = +new Date();
			})
			.on('touchmove', function () {
				hasMove = true;
			})
			.on('touchend', function (e) {
				if ((+new Date() - timeStamp) < 200) {
					callback.call(this, e);
				}
			});
	};
	
	$('*[ontap]').each(function () {
		$(this).ontap(function () {
			eval($(this).attr('ontap'));
		});
	});