<!doctype html>
<html>
<head>
<meta charset='utf-8'/>
<title></title>
<script type="text/javascript" src="http://g.tbcdn.cn/kissy/k/1.4.0/seed.js?t=20131ddddddd1"></script>
<?php if(isset($_GET["__dev__"])) { ?>
<script type="text/javascript" src="../../../caja/ant-lib/com/google/caja/plugin/caja<?php echo isset($_GET["__mobile__"])?"-mobile":""; ?>.js"></script>
<?php } else { ?>
<script type="text/javascript" src="http://a.tbcdn.cn/apps/taesite/balcony/core/r4000/caja/caja-mobile.js"></script>
<?php } ?>
<script type="text/javascript" src="../../assets/base/caja-util.js"></script>
<script type="text/javascript" src="../../assets/base/caja-log.js"></script>
<script type="text/javascript" src="../../assets/base/balcony.js"></script>
<link rel="stylesheet" href="../../test/jasmine/jasmine.css"/>
<script src="../../test/jasmine/jasmine.js"></script>
<script src="../../test/jasmine/jasmine-html.js"></script>
<script src="../../test/jasmine-adapter.js"></script>
</head>
<body>