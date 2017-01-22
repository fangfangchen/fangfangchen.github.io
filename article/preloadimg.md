#图片预加载
`
	function preloadImg (arr) {
		var newImages = [];
		var arr = (typeof arr != 'object') ? [arr] : arr;
		for (var i = 0, len = arr.length; i < len; i++) {
			newImages[i] = new Image();
			newImages[i].src = arr[i];
		}
	}
`


`
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
`

`
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
`