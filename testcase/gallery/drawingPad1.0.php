<!--页头公共资源引入-->
<? include("../common/head.php");?>

<!--
    需要测试的dom结构，注意，最外层<div class="J_TScriptedModule" data-componentid="uniqueSign">
的class和为属性不可修改
    用户的javascript理论上只可以作用到这个dom下面，不可以"越界"
-->
<style type="text/css">
    .demos{margin:0 auto;width: 600px;}
    .demo1{border: 1px solid green;margin-top: 5px;}
    .gap{height: 50px;background-color: red}
    .mod{height: 410px;margin:5px;border: 1px solid red;}
</style>
<div class="J_TScriptedModule" data-componentid="uniqueSign">
    <div class="myPad">
        这里的内容会被清除，载入canvas.
    </div>

    <!-- <input type="file" id="J_selectFile" /> -->
    <div class="log"></div>

    <div class="right">
        <h4>图层管理</h4>
        <table>
            <tr>
                <td class="thumbImg">1</td>
                <td class="action act-active"><a class="frameAct" href="#">激活</a></td>
            </tr>

            <tr>
                <td class="thumbImg">2</td>
                <td class="action act-active"><a class="item1Act" href="#">激活</a></td>
            </tr>

            <tr>
                <td class="thumbImg">3</td>
                <td class="action act-active"><a class="item2Act" href="#">激活</a></td>
            </tr>

            <tr>
                <td class="thumbImg"></td>
                <td class="action act-active"><a class="all_cancel" href="#">退出交互</a></td>
                <td class="action act-cancel"><a class="getData" href="#">获取数据</a></td>
                <td class="action act-cancel"><a class="getLayerInfo" href="#">获取图层数据</a></td>
                <td class="action act-cancel"><a class="setPara" href="#">设置旋转和缩放</a></td>
            </tr>
        </table>
    </div>
</div>
</div>
<!--模块初始化的包配置，都很熟悉了-->
<script type="text/javascript">

    cajaConfig={//配置下你需要引入的模块名称，最后会被use到
        modules:"openjs/kissy/1.3.0/core,openjs/kissy/gallery/drawingPad/1.0/index"
    }

</script>

<!--这里是将自己的js让服务端编译一下，配置下服务端的php路径和自己的js即可，注意路径-->
<?
$jsurl="testcase/gallery/drawingPad1.0.js";//注意路径
$jsservice="../common/cajoled_service.php";//注意路径
include("../common/foot.php");//引入foot
?>