<? include("../common/head.php");?>

<script src="http://webapi.amap.com/maps?v=1.2" type="text/javascript"></script>


<div data-componentid="uniqueSign" class="J_TScriptedModule">
    <div id="mapDiv" style="width:800px;height:600px"></div>
    <div id="mapDiv1" style="width:800px;height:600px"></div>
    <div id="mapDiv2" style="width:800px;height:600px"></div>
    <div id="mapDiv3" style="width:800px;height:600px"></div>
    <div id="mapDiv4" style="width:800px;height:600px"></div>
</div>

<script>

    cajaConfig={//配置下你需要引入的模块名称，最后会被use到
        modules:"openjs/kissy/1.3.0/core,openjs/amap/1.0/index"
    }
</script>


    <!--这里是将自己的js让服务端编译一下，配置下服务端的php路径和自己的js即可，注意路径-->
<?
$jsurl="testcase/thirdparty/amap.js";//注意路径
$jsservice="../common/cajoled_service.php";//注意路径
include("../common/foot.php");//引入foot
?>
