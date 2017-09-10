;(function($){

	var defaults = {
		"udRow": 1,
		"udCol": 1,
		"lrRow": 1,
		"lrCol": 1,
		"isAnimation": false,
		"container": ".wrapper",
		"duration": 600
	};

	var toward = {up: 1, right: 2, down: 3, left: 4};
	var now = {row: 1, col: 1},
		last = {row: 0, col: 0};

	var opts = {};

	function swipe(options){
		opts = $.extend({}, defaults, options || {});
		$(opts.container)
			.swipeUp(function(){
				if(opts.isAnimation) return;
				if(now.row >= opts.udRow) return;
				last.row = now.row;
				last.col = 1;
				now.row = last.row + 1;
				now.col = 1;
				pageMove(toward.up);
			})
			.swipeDown(function(){
				if(opts.isAnimation) return;
				if(now.row <= 1) return;
				last.row = now.row;
				last.col = now.col;
				now.row = last.row - 1;
				now.col = 1;
				pageMove(toward.down);
			})
			.swipeLeft(function(){
				if(opts.isAnimation) return;
				if(now.col >= opts.lrCol) return;
				if(now.row == opts.lrRow){
					last.row = now.row;
					last.col = now.col;
					now.row = last.row;
					now.col = last.col + 1;
					pageMove(toward.left);
				}
			})
			.swipeRight(function(){
				if(opts.isAnimation) return;
				if(now.col <= 1) return;
				if(now.row == opts.lrRow){
					last.row = now.row;
					last.col = now.col;
					now.row = last.row;
					now.col = last.col - 1;
					pageMove(toward.right);
				}
			})
	};

	function pageMove(dr){
		var lastPage = ".page-" + last.row + "-" + last.col,
			nowPage = ".page-" + now.row + "-" + now.col;
		var inClass, outClass;

		switch(dr){
			case toward.up: 
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case toward.right: 
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case toward.down: 
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case toward.left: 
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
		}
		isAnimation = true;
		$(nowPage).removeClass("hide");
		$(lastPage).addClass(outClass);
		$(nowPage).addClass(inClass);

		setTimeout(function(){

			$(lastPage)
				.removeClass("page-current")
				.removeClass(outClass)
				.addClass("hide")

			$(nowPage)
				.addClass("page-current")
				.removeClass(inClass);

			isAnimation = false;

		}, opts.duration);
	}

	window.swipe = swipe;

})(Zepto);