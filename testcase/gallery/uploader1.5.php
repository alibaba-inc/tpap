<!--页头公共资源引入-->
<?php include("../common/head.php");?>

<!--
    需要测试的dom结构，注意，最外层<div class="J_TScriptedModule" data-componentid="uniqueSign"> 的class和为属性不可修改
    用户的javascript理论上只可以作用到这个dom下面，不可以"越界"
-->
<div class="J_TScriptedModule" data-componentid="uniqueSign">
<p>时间紧迫，适配了最简功能，适配了ImageUploader主题</p>
<div class="grid">
    <input type="file" class="g-u" id="J_UploaderBtn" value="上传图片" name="Filedata" accept="image/*" >
    <input type="hidden" id="J_Urls" name="urls" value="" />
    <div class="g-u">还可以上传<span id="J_UploadCount">3</span>张图片</div>
</div>
<ul id="J_UploaderQueue" class="grid">

</ul>

</div>

<!--模块初始化的包配置，都很熟悉了-->
<script type="text/javascript">

    cajaConfig={//配置下你需要引入的模块名称，最后会被use到
        modules:"openjs/kissy/1.3.0/core,openjs/kissy/gallery/uploader/1.5/index"
    }

</script>

<!--这里是将自己的js让服务端编译一下，配置下服务端的php路径和自己的js即可，注意路径-->
<?php
$jsurl="testcase/gallery/uploader1.5.js";//注意路径
$jsservice="../common/cajoled_service.php";//注意路径
include("../common/foot.php");//引入foot
?>