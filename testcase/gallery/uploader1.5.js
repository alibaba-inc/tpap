var S = KISSY;
var Uploader = KISSY.Uploader;
var uploader = new Uploader.Core('#J_UploaderBtn',{
    //处理上传的服务器端脚本路径
    action:"upload.php"
});
uploader.on('select',function(ev){
   S.log(ev);
});
uploader.on('add',function(ev){
    S.log(ev);
});
uploader.on('success',function(ev){
    S.log(ev);
});
uploader.theme(new Uploader.ImageUploader({
    queueTarget:'#J_UploaderQueue'
}));
uploader.plug(new Uploader.Auth({
        //最多上传个数
        max:3
    }))
    //url保存插件
    .plug(new Uploader.UrlsInput({target:'#J_Urls'}))
    //进度条集合
    .plug(new Uploader.ProBars())
    //拖拽上传
    .plug(new Uploader.Filedrop())
    //图片预览
    .plug(new Uploader.Preview());
S.log(uploader.get('isAllowUpload'));