##品牌号一些问题
-----------
1、jquery的ajax在IOS7下部分属性不支持，如下图：
在较早版本下，不支持responseType为json格式（not supporting json as responseType）。
![caniuse-ajax-IOS7](http://i.imgur.com/qkIo4f3.png)

	使用$.ajax发起请求，发现没执行。
    service.getVoteDetail(newsId)
	    .then(function (result) {
	      alert(result.code);
	      if (result.code == 0) {
	        var data = result.data;
	        renderNewOptions(data);
	        isFocus = data && data.publisher && data.publisher.is_followed;
	        // 好友关系 [0:未关注 1:我关注对方 2:对方关注我 3:我拉黑对方 4:相互关注 5:对方拉黑我]
	        if (isFocus == 0 || isFocus == 2) {
	          $focus.html('<div class="focus-btn" id="focusBefore" data-userid="' + userId + '">关注</div>');
	        } else {
	          $focus.html('<div class="focused" id="focuseAfter" data-userid="' + userId + '"><img src="../images/focus.png">已关注</div>');
	        }
	      } else {
	        _toast.show(result.message);
	      }
	    }, function (error) {
	      _toast.show(error);
	    });

	改为原生的XMLHttpRequest。
    var xhr = new XMLHttpRequest();
	var apiUrl = service.dataApi['voteDetail'] + '?' + qs + '&imycache_off';
	xhr.onreadystatechange = function () {
	    if (xhr.readyState == 4 && xhr.status >= 200) {
	      var result = JSON.parse(xhr.responseText);
	      if (result.code == 0) {
	        var data = result.data;
	        renderNewOptions(data);
	        isFocus = data && data.publisher && data.publisher.is_followed;
	        // 好友关系 [0:未关注 1:我关注对方 2:对方关注我 3:我拉黑对方 4:相互关注 5:对方拉黑我]
	        if (isFocus == 0 || isFocus == 2) {
	          $focus.html('<div class="focus-btn" id="focusBefore" data-userid="' + userId + '">关注</div>');
	        } else {
	          $focus.html('<div class="focused" id="focuseAfter" data-userid="' + userId + '"><img src="../images/focus.png">已关注</div>');
	        }
	      } else {
	        _toast.show(result.message);
	      }
	    }
	};
	xhr.open('GET', apiUrl);
	xhr.setRequestHeader('content-type', 'text/plain');
	xhr.send();


2.设置块级元素为内联块级元素时，会出现元素之间有间隙。test


