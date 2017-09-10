### ~ 和 ^ 的区别


一个完整的版本号组表示为： [主要版本号，次要版本号，补丁版本号]

参考链接：[http://blog.163.com/sdhhqb@126/blog/static/6370553720153147217298/](http://blog.163.com/sdhhqb@126/blog/static/6370553720153147217298/ "http://blog.163.com/sdhhqb@126/blog/static/6370553720153147217298/")

1. 用 ~ 指示范围

如果指定了次要版本，允许补丁版本升级。如果没有指定次要版本，允许次要版本升级。

	~1.2.3 >= 1.2.3 < 1.3.0
	~1.2 >= 1.2.0 < 1.3.0
	~1 >= 1.0.0 < 2.0.0
	~0.2.3 >= 0.2.3 < 0.3.0
	~0.2 >= 0.2.0 < 0.3.0
	~0 >= 0.0.0 < 1.0.0
	~1.2.3-beta.2 >=1.2.3-beta.2 < 1.3.0 (注：1.2.3版允许高于beta.2的beta版，但1.2.4-beta.2不被允许，因为是属于另一个版本号组的beta版本。)

2. 用 ^ 指定范围

允许不会改变最左边的不为零的版本号的版本提升，也就是说，^1.0.0允许次要、补丁版本升级，^0.1.0允许补丁版本升级，^0.0.x 不允许升级。

有许多开发者把 '0.x' 中的 'x' 改变作为重大改变的指示。

一个普遍的做法是，^ 适合使用在当开发者从 0.2.4 升级到 0.3.0 可能会做出不兼容的改变时。一般情况下，假定了在0.2.4 到 0.2.5 不会有不兼容改变，可以有一些新增(但不改变兼容)的改变。

	^1.2.3 >=1.2.3 < 2.0.0
	^0.2.3 >=0.2.3 < 0.3.0
	^0.0.3 >=0.0.3 < 0.0.4
	^1.2.3-beta.2 >=1.2.3-beta.2 < 2.0.0 
	允许1.2.3 版的高于beta-2 的beta版本。
	^0.0.3-beta.2 >=0.0.3-beta.2 < 0.0.4 
	只允许0.0.3 版的高于beta-2 的版本 

当解析带有^的版本范围时，补丁版本号缺少会补 0，但是会灵活的处理，即时主要、次要版本号都为 0 也可以。

	^1.2.x >= 1.2.0 < 2.0.0 
	^0.0.x >= 0.0.0 < 0.1.0
	^0.0 >= 0.0.0 < 0.1.0

当次要、补丁版本号缺少时会当作 0，但也会灵活处理，即时主版本号为 0 也可以 。

	^1.x >= 1.0.0 < 2.0.0 
	^0.x >= 0.0.0 < 1.0.0

npmjs/doc上：

A comparator is composed of an operator and a version. The set of primitive operators is:

	< Less than
	<= Less than or equal to
	> Greater than
	>= Greater than or equal to
	= Equal. If no operator is specified, then equality is assumed, so this operator is optional, but MAY be included.

参考链接：[https://docs.npmjs.com/misc/semver](https://docs.npmjs.com/misc/semver "https://docs.npmjs.com/misc/semver")