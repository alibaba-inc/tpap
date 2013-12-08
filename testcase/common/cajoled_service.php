<?php

$flag = false;//缓存js文件的开关

$filePath = "../../".$_GET['jsurl'];



if($flag && file_exists($filePath."caja")){
    $myFile = fopen($filePath."caja","r");
    $myFileContent = fread($myFile,filesize($filePath."caja"));

    $myFileContent = iconv('UTF-8','gb2312', $myFileContent);
    header('Content-Type:application/javascript;charset=gb2312');
    echo $myFileContent;
    echo " //fromecache";
    return;
}


$myFile = fopen($filePath,"r");
$myFileContent = fread($myFile,filesize($filePath));

$myFileContent = iconv('UTF-8','gb2312', $myFileContent);

function _xpost($url, $p)
{
    $f = '';
    $data = '';
    foreach ($p as $k => $v) {
        $data .= $f . $k . '=' . urlencode($v);
        $f = '&';
    }

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    $res = curl_exec($curl);

    if (curl_errno($curl)) {
        echo 'Curl error: ' . curl_error($curl);
    }
    curl_close($curl);
    return $res;
}


$x = _xpost("http://zxn.taobao.com/tbcajaService.htm",
    array('token' => 'TAE-SDK',
          'content' =>urlencode($myFileContent),
          'component' => 'uniqueSign'));

$start = strpos($x, "TShop");
$x = substr($x,$start);


header('Content-Type:application/javascript;charset=gb2312');
$x = str_replace('&#39;',"'",$x);
$x = str_replace('&quot;','"',$x);
$x = str_replace('&amp;','&',$x);
$x = str_replace('&lt;','<',$x);
$x = str_replace('&gt;','>',$x);
$x = str_replace("\\\\\"", "\\\"",$x);


echo $x;

$file = fopen($filePath."caja","w");
fwrite($file,$x);
fclose($file);
?>
