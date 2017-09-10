;(function(){

	var now = { row: 1, col: 1 }, last = { row: 0, col: 0};
	const towards = { up: 1, right: 2, down: 3, left: 4 };
	var isAnimating = false; // 动画是否进行

	document.addEventListener('touchmove',function(event){
		event.preventDefault();
	}, false);

	$(document)
		.swipeUp(function(){
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if(last.row < 5) {
				now.row = last.row + 1;
				now.col = 1;
				pageMove(towards.up);
			}else{
				now.row = 1;
				now.col = 1;
				last.row = 5;
				last.col = 1;
				pageMove(towards.up);
			}
		})
		.swipeDown(function(){
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if(last.row != 1) {
				now.row = last.row - 1;
				now.col = 1;
				pageMove(towards.down);
			}
		})
		/*.swipeLeft(function(){
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if(last.row  == 4) {
				if(last.col < 5){
					now.row = last.row;
					now.col = last.col + 1;
					pageMove(towards.left);
				}else{
					now = { row: 4, col: 1 };
					last = { row: 4, col: 5 };
					pageMove(towards.left);
				}
			}
		})
		.swipeRight(function(){
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if(last.row == 4 && last.col != 1) {
				now.row = last.row;
				now.col = last.col - 1;
				pageMove(towards.right);
			}
		})*/

	$(".project-content")
		.swipeLeft(function(){
			if (isAnimating) return;
			var lastId = parseInt($(this).attr("id").slice(1));
			var newId;
			newId = lastId == 5 ?  1 : lastId + 1;
			swipeLR(towards.left, lastId, newId);
		})
		.swipeRight(function(){
			if (isAnimating) return;
			var lastId = parseInt($(this).attr("id").slice(1));
			var newId;
			newId = lastId == 1 ?  5 : lastId - 1;
			swipeLR(towards.right, lastId, newId);
		});

	function pageMove(tw){
		var lastPage = ".page-" + last.row + "-" + last.col,
			nowPage = ".page-" + now.row + "-" + now.col;
		
		switch(tw) {
			case towards.up:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case towards.down:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
		}
		isAnimating = true;
		$(nowPage).removeClass("hide");	
		$(lastPage).addClass(outClass);
		$(nowPage).addClass(inClass);

		setTimeout(function(){
			$(lastPage).removeClass('page-current');
			$(lastPage).removeClass(outClass);
			$(lastPage).addClass("hide");
			$(lastPage).find("img").addClass("hide");
			
			$(nowPage).addClass('page-current');
			$(nowPage).removeClass(inClass);
			$(nowPage).find("img").removeClass("hide");
			
			isAnimating = false;
		}, 600);
	}

	function swipeLR(dr, lastId, newId){
		var lastPage = "#p" + lastId,
			nowPage = '#p' + newId;
		
		switch(dr) {
			case towards.right:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case towards.left:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
		}
		isAnimating = true;
		$(nowPage).addClass(inClass);
		$(".nav-point li").removeClass("active");
		$("[data-id=p" + newId + "]").addClass("active");
		$(lastPage).addClass(outClass);
		
		setTimeout(function(){
			$(lastPage)
				.removeClass("active")
				.removeClass(outClass);
			
			$(nowPage)
				.addClass('active')
				.removeClass(inClass);
			
			isAnimating = false;
		}, 600);
	}

	$(".toggle").on("click", function(){
		$(".description").removeClass("active");
		$(this).parents("li").children(".description").addClass("active");
	});
	$(".block").on("click", function(){
		var id = $(this).attr("id");
		switch(id){
			case "html":
				$(".css-outer, .css-pie, .js-outer")
					.css({
						"-webkit-transform": "rotate(+=10deg)",
						"transform": "rotate(+=10deg)"
					})
					.addClass("html-active");
				$(".html-back").addClass("back-active");
				break;
			case "css":
				$(".html-outer, .html-pie, .js-outer")
					.css({
						"-webkit-transform": "rotate(+=10deg)",
						"transform": "rotate(+=10deg)"
					})
					.addClass("css-active");
				$(".css-back").addClass("back-active");
				break;
			case "js":
				$(".html-outer, .html-pie, .css-outer, .css-pie")
					.css({
						"-webkit-transform": "rotate(+=10deg)",
						"transform": "rotate(+=10deg)"
					})
					.addClass("js-active");
				$(".js-back").addClass("back-active");
				break;
		}
	});
	$(".backimg").on("click", function(){
		if (isAnimating) return;
		isAnimating = true;
		var id = $(this).attr("id");
		switch(id){
			case "htmlimg":
				$(".css-outer, .css-pie, .js-outer").removeClass("html-active");
				$("#htmlimg").addClass("pt-page-flipOut");
				setTimeout(function(){
					$("#htmlimg").removeClass("back-active pt-page-flipOut");
					isAnimating = false;
				}, 500);
				break;
			case "cssimg":
				$(".html-outer, .html-pie, .js-outer").removeClass("css-active");
				$("#cssimg").addClass("pt-page-flipOut");
				setTimeout(function(){
					$("#cssimg").removeClass("back-active pt-page-flipOut");
					isAnimating = false;
				}, 500);
				break;
			case "jsimg":
				$(".html-outer, .html-pie, .css-outer, .css-pie").removeClass("js-active");
				$("#jsimg").addClass("pt-page-flipOut");
				setTimeout(function(){
					$("#jsimg").removeClass("back-active pt-page-flipOut");
					isAnimating = false;
				}, 500);
				break;
		}
	});

})();