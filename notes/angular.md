## 一.Angular一些知识点

### 1.directive的scope
隔离scope和父scope的交互

1. @<br />
@ 方式局部属性用来访问 directive 外部环境定义的字符串值，主要是通过 directive 所在的标签属性绑定外部字符串值。这种绑定是单向的，即父 scope 的绑定变化，directive 中的 scope 的属性会同步变化，而隔离 scope 中的绑定变化，父 scope 是不知道的。

2. =<br />
= 局部 scope 属性

= 通过 directive 的 attr 属性的值在局部 scope 的属性和父 scope 属性名之间建立双向绑定。
意思是，当你想要一个双向绑定的属性的时候，你可以使用=来引入外部属性。无论是改变父 scope 还是隔离 scope 里的属性，父 scope 和隔离 scope 都会同时更新属性值，因为它们是双向绑定的关系。

3. &<br />
 & 方式提供一种途经是 directive 能在父 scope 的上下文中执行一个表达式。此表达式可以是一个 function。
比如当你写了一个 directive，当用户点击按钮时，directive 想要通知 controller，controller 无法知道 directive 中发生了什么，也许你可以通过使用 angular 中的 event 广播来做到，但是必须要在 controller 中增加一个事件监听方法。
最好的方法就是让 directive 可以通过一个父 scope 中的 function，当 directive 中有什么动作需要更新到父 scope 中的时候，可以在父 scope 上下文中执行一段代码或者一个函数。

### 2.ngClass的写法
	ng-class="obj.special_price == 1 ? 'font-red' : ''"

	ng-class="{'font-red': obj.special_price == 1}"



### 3.Components
Components 和 Directive 的主要区别：

	1.directive 默认作用域不隔离（scope默认为false），components 默认父子组件作用域隔离；
	2.directive 设置scope为对象时，属性有三种前缀标识符可以设置：
		@ 单向绑定的前缀标识符，传字符串用
		= 双向数据绑定前缀标识符，即 父子变化互为影响
		& 绑定函数方法
	components的binding比directive的scope多了一种： 
		< 单向数据传输，即父组件改变状态会影响子组件的状态，子组件改变却不会影响父组件。
	3.directive 中有link函数，操作DOM在link中，而components没有link所以不能操作DOM。


## 二.Angular常见的一些坑

### 1. Unknown provider
	Uncaught Error: [$injector:unpr] Unknown provider: $rootscopeProvider <- $rootscope

原因是：**$rootScope**写错了，写成了 $rootscope。

### 2.路由变更监听 $stateChange*，比如：
	$rootScope.$on('$stateChangeStart', function () {
		//...
	});

遇到的问题是：监听不生效！依赖包 angular-ui-router 的版本不对的原因。

查了下，在github上Issues#2219回答了这个问题的原因：
	The $stateChange* events are deprecated. The $transitions.on* hooks are generally much more powerful. The events are not included by default, but can be re-enabled by including the stateEvents.js file and depending on the angular module ui.router.state.events (the stateEvents.js was missing in 1.0.0-alpha.1 builds; see #2655)
	在1.0之后$stateChange*被废弃了，建议使用$transitions.on*.但是如果想在^1.0使用的话，可以引入stateEvents.js，然后依赖模块ui.router.state.events就可以了。

1.使用^1.0版本的方案：

	package.json文件:
		"angular-ui-router": "^1.0.0"

	app.js文件:
	require('angular-ui-router');
	require('angular-ui-router/release/stateEvents');

	const app = angular.module('appTest', [
		'ui.component.common',
		'ui.router',
		'ui.router.state.events',
		'ui.bootstrap'
	]);
	
	// 省略一些代码...

	app.config(config);
	app.run(run);
	
	run.$inject = ['$rootScope', '$location', '$state'];
	
	function run ($rootScope, $location, $state) {
		// can do some permission or something
		console.log('angular run');
	
		$rootScope.$on('$stateChangeStart', function () {
			console.log('=======---------');
			$rootScope.currentLocation = '#' + $location.path();
			console.log($rootScope.currentLocation);
		});
	}

2.使用1.0以下版本的方案：

	package.json文件:
		"angular-ui-router": "0.3.1"

	app.js文件:
	require('angular-ui-router');

	const app = angular.module('appTest', [
		'ui.component.common',
		'ui.router',
		'ui.bootstrap'
	]);

	// 省略一些代码...

	app.config(config);
	app.run(run);
	
	run.$inject = ['$rootScope', '$location', '$state'];
	
	function run ($rootScope, $location, $state) {
		// can do some permission or something
		console.log('angular run');
	
		$rootScope.$on('$stateChangeStart', function () {
			console.log('=======---------');
			$rootScope.currentLocation = '#' + $location.path();
			console.log($rootScope.currentLocation);
		});
	}
	

## 3.Angular1.X组件之间的通讯方式