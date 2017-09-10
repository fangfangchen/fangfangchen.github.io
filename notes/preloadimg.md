#图片预加载

###简单版本的实现：
	function preloadImg (arr) {
		var newImages = [];
		var arr = (typeof arr != 'object') ? [arr] : arr;
		for (var i = 0, len = arr.length; i < len; i++) {
			newImages[i] = new Image();
			newImages[i].src = arr[i];
		}
	}

###加上图片是否加载成功与否的回调：
	function preloadImg (arr) {
		var newImages = [];
		var imglen = 0; 
		var arr = (typeof arr != 'object') ? [arr] : arr;
		function imageloadpost () {
			imglen++;
			if (imglen >= arr.length) {
				console.log('图片已加载完成');
			}
		}
		for (var i = 0, len = arr.length; i < len; i++) {
			newImages[i] = new Image();
			newImages[i].src = arr[i];
			newImages[i].onload = imageloadpost;
			newImages[i].onerror = imageloadpost;
		}
	}

###返回一个对象，可以执行回调
	function preloadImg (arr) {
		var newImages = [];
		var imglen = 0;
		var postaction = function () {};
		var arr = (typeof arr != 'object') ? [arr] : arr;
		function imageloadpost () {
			imglen++;
			if (imglen >= arr.length) {
				console.log('图片已加载完成');
				postaction(newImages);
			}
		}
		for (var i = 0, len = arr.length; i < len; i++) {
			newImages[i] = new Image();
			newImages[i].src = arr[i];
			newImages[i].onload = imageloadpost;
			newImages[i].onerror = imageloadpost;
		}
		return {
			done: function (arg) {
				postaction = arg || postaction;
			}
		}
	}
	var load = preloadImg(['logo1.png', 'source.png', '是.png']);
	load.done(function (images) {
		console.log(images);
	});
