<!--页头公共资源引入-->
<? include("../common/head.php");?>

<!--
    需要测试的dom结构，注意，最外层<div class="J_TScriptedModule" data-componentid="uniqueSign"> 的class和为属性不可修改
    用户的javascript理论上只可以作用到这个dom下面，不可以"越界"
-->
<div class="J_TScriptedModule" data-componentid="uniqueSign">
<style type="text/css" media="screen">
    h1, p {
    margin: 0;
    padding: 0;
}

body {
    background-color: #fafafa;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.content {
    width: 990px;
    margin: 50px auto;
    position: relative;
}

.tip {
    color: red;
    font-size: 13px;
    width: 200px;
    margin: 0 auto;
}

.promot h2 {
    text-align: center;
}

.arrow-down {
    display: inline-block;
    width: 10px;
    height: 17px;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
    margin-left: 10px;
}

.arrow-down .stick {
    position: absolute;
    width: 4px;
    height: 10px;
    left: 3px;
    top: 0;
    background: #f50;
}

.arrow-down .arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #f50 transparent transparent transparent;
    top: 10px;
    left: 0;
}

.config-title {
    font-weight: normal;
    font-size: 13px;
}

.section,
.footer {
    font-size: 50px;
    line-height: 400px;
    height: 400px;
    text-align: center;
    background: #fff;
}

.section:nth-child(2n+1) {
    height: 500px;
    line-height: 500px;
    background: #eee;
}

.footer {
    height: 1000px;
    line-height: 1000px;
}


.side-nav-wrapper {
    position: absolute;
    right: -50px;
    top: 0;
    width: 0;
    height: 0;
}

.side-nav {
    position: fixed;
    top: 150px;
    width: 80px;
    overflow: hidden;
    display: none;
    text-align: center;
    _position: absolute;
    _bottom: auto;
    _top: expression(documentElement.scrollTop + documentElement.clientHeight - this.offsetHeight - 150);
}

.side-nav a {
    color: #fff !important;
}

.side-nav-bg {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 1px;
    width: 100%;
    height: 100%;
    background: #f50;
    border-radius: 40px 40px 5px 5px;
}

.nav-hd {
    float: left;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-bottom: 10px;
    font-size: 13px;
    line-height: 78px;
    font-family: "microsoft yahei";
    letter-spacing: 2px;
    text-shadow: 0 0 10px #fff;
    background: #333;
    background: -webkit-radial-gradient(#000, #333);

    margin-bottom: 0\9;
    *margin-bottom: 0\9;
    _margin-bottom: 0\9;
}

.nav-item {
    float: left;
    width: 100%;
    height: 32px;
    color: #fff;
    line-height: 30px;
    margin-top: 5px;
    border-top: 1px solid #f70;
    border-bottom: 1px solid #f70;
    margin-top: -1px;
    _background: #f50;
    transition: background .3s;
}

.back-top {
    float: left;
    height: 40px;
    width: 100%;
    line-height: 40px;
    _background: #f50;
}

.cur-nav {
    background: #333;
}
</style>
<div class="content">
<p>向下滚动鼠标！</p>
 <div class="section section-1">
        section-1
    </div>
    <div class="section section-2">
        section-2
    </div>
    <div class="section section-3">
        section-3
    </div>
    <div class="section section-4">
        section-4
    </div>
    <div class="section section-5">
        section-5
    </div>
    <div class="footer">
        footer
    </div>

    <div class="side-nav-wrapper">
        <div class="side-nav" id="J_SideNav">
            <div class="side-nav-bg"></div>
            <a href="http://star.taobao.com" target="_blank" class="nav-hd">sideNav</a>
            <a href="javascript:void(0)" target="_blank" class="nav-item-1 nav-item">nav-1</a>
            <a href="javascript:void(0)" target="_blank" class="nav-item-2 nav-item">nav-2</a>
            <a href="javascript:void(0)" target="_blank" class="nav-item-3 nav-item">nav-3</a>
            <a href="javascript:void(0)" target="_blank" class="nav-item-4 nav-item">nav-4</a>
            <a href="javascript:void(0)" target="_blank" class="nav-item-5 nav-item">nav-5</a>
            <a href="javascript:void(0)" target="_blank" class="back-top">返回顶部</a>
        </div>
    </div>
</div>
</div>

<!--模块初始化的包配置，都很熟悉了-->
<script type="text/javascript">

    cajaConfig={//配置下你需要引入的模块名称，最后会被use到
        modules:"openjs/kissy/1.3.0/core,openjs/kissy/gallery/sidenav/1.0/index"
    }

</script>

<!--这里是将自己的js让服务端编译一下，配置下服务端的php路径和自己的js即可，注意路径-->
<?
$jsurl="testcase/gallery/sidenav1.0.js";//注意路径
$jsservice="../common/cajoled_service.php";//注意路径
include("../common/foot.php");//引入foot
?>