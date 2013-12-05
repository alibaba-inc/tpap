<!--页头公共资源引入-->
<? include("../common/head.php");?>

<!--
    需要测试的dom结构，注意，最外层<div class="J_TScriptedModule" data-componentid="uniqueSign"> 的class和为属性不可修改
    用户的javascript理论上只可以作用到这个dom下面，不可以"越界"
-->

<div class="J_TScriptedModule" data-componentid="uniqueSign">
	<ol id="steps-demo-1">
    	<li>1. 加入购物车</li>
    	<li>2. 确认订单信息</li>
    	<li>3. 付款到支付宝</li>
    	<li>4. 确认收货</li>
    	<li>5. 评价</li>
	</ol>

    <p><input type="button" value="激活第三个步骤" id="demo-5-btn1" />&nbsp;&nbsp;<input type="button" value="改变颜色为红色" id="demo-5-btn2" />&nbsp;&nbsp;<input type="button" value="重新设置激活步骤和颜色" id="demo-5-btn3" /></p>

    <p>留意只触发了一次，因为监听的是change事件，属性值没有改变，就不会执行setter方法。当执行的是reset的方法时，也会触发change事件！当reset多个属性时，后监听的事件越前触发，比如这里的颜色改变事件触发优先于激活改变事件。</p>
</div>

<!--模块初始化的包配置，都很熟悉了-->
<script type="text/javascript">

     cajaConfig={//配置下你需要引入的模块名称，最后会被use到
         modules:"openjs/kissy/1.3.0/core,openjs/kissy/1.3.0/stepbar"
     }

</script>

<!--这里是将自己的js让服务端编译一下，配置下服务端的php路径和自己的js即可，注意路径-->
<?
    $jsurl="testcase/test/stepbar.js";//注意路径
    $jsservice="../common/cajoled_service.php";//注意路径
    include("../common/foot.php");//引入foot
?>