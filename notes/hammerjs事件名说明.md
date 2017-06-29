hammer.js框架

在hammer.js框架当中，为我们提供的几个方法是：

Pan   单指 触碰（可以进行轻微的摩擦）  一个手指就能够触发 阈值10
包含了panstart、panmove、panend、pancancel、panleft、panright、panup、pandown

Pinch 两个手指头  捏~ 在识别之前最小的值是0
包含了pinchstart、pinchmove、pinchend、pinchcancel、pinchin （用于缩小）、pinchout （用于放大）

Press 单指 长按 500毫秒以上才可以 运动最小距离5 只有press事件

Rotate 两只手指头 默认旋转角度0
包含了rotatestart、rotatemove、rotateend、rotatecancel

Swipe 单指 滑动 阈值10 大于0.65px/ms的速度才可以触发
包含了swipeleft、swiperight、swipeup、swipedown

Tap 两下的轻敲 两次的差异在10之内 间隔在300毫秒之内 一次按下的时间不大于250ms 才可以触发