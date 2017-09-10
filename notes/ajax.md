$.ajax()

参数说明：

**1.contentType**

(默认: "application/x-www-form-urlencoded") 发送信息至服务器时内容编码类型。默认值适合大多数情况。如果你明确地传递了一个content-type给 $.ajax() 那么他必定会发送给服务器（即使没有数据要发送）。

Http Header里的Content-Type一般有这三种：

 - application/x-www-form-urlencoded：数据被编码为名称/值对。这是标准的编码格式。
 - multipart/form-data： 数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
 - text/plain： 数据以纯文本形式(text/json/xml/html)进行编码，其中不含任何控件或格式字符。postman软件里标的是RAW。


**2.dataType**

预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如XML MIME类型就被识别为XML。在1.4中，JSON就会生成一个JavaScript对象，而script则会执行这个脚本。随后服务器端返回的数据会根据这个值解析后，传递给回调函数。

可用值:

 - **"xml"**: 返回 XML 文档，可用 jQuery 处理。
 - **"html"**: 返回纯文本 HTML 信息；包含的script标签会在插入dom时执行。
 - **"script"**: 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了"cache"参数。'''注意：'''在远程请求时(不在同一个域下)，所有POST请求都将转为GET请求。(因为将使用DOM的script标签来加载)
 - **"json"**: 返回 JSON 数据 。
 - **"jsonp"**: JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
 - **"text"**: 返回纯文本字符串