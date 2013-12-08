var S = KISSY;
var DrawingPad = KISSY.DrawingPad;

//定义资源链接，必须是jpg/png/gif
var frameEl = "http://gtms01.alicdn.com/tps/i1/T14GxoXy8jXXaMrwve-700-430.png";
var itemEl1 = "http://gtms01.alicdn.com/tps/i1/T1oVxmXqVhXXb4HOvo-600-375.jpg";
var itemEl2 = "http://gtms01.alicdn.com/tps/i1/T1WuhmXD8hXXaeHbsb-100-100.png";


//准备素材，目前只能使用同域素材，否则无法输出结果
// var frameEl = "http://localhost/playground/frame.png"; // document.getElementById("frame").src;
// var itemEl1 = "http://localhost/playground/dog.jpg";   // document.getElementById("item1").src;
// var itemEl2 = "http://localhost/playground/item2.png"; // document.getElementById("item2").src;


// console.log(S.get(".J_TScriptedModule"));
var drawingPad = new DrawingPad({
    height      : 430,
    width       : 700,
    wrapper     : ".myPad"
    // proxyPrefix : "" //可以将proxyPrefix置空，越过代理服务,若不设置，则使用默认代理服务(domain:www.tmall.com)
});

//添加图层，添加顺序即是覆盖顺序
var itemLayer = drawingPad.addLayer({
    img      : itemEl1, //图层的图形素材，必须指定 
    centerX  : 200,     //图片的中心x，可选，默认0
    centerY  : 200,     //图片的中心y，可选，默认0
    rotate   : 10,      //旋转角度,可选，默认0
    scale    : 1,       //缩放比例，可选，默认0
    cusClass : "myClass" //自定义样式
}); //.render();

//添加图层，添加顺序即是覆盖顺序
var frameLayer = drawingPad.addLayer({
    img   : frameEl
}); //.render();

//添加图层，添加顺序即是覆盖顺序
var itemLayer2 = drawingPad.addLayer({
    img : itemEl2
}); //.render();


S.all(".item1Act").on("click",function(){
    drawingPad.activeInteract(itemLayer); //激活交互模式
});

S.all(".item2Act").on("click",function(){
    drawingPad.activeInteract(itemLayer2);
});

S.all(".frameAct").on("click",function(){
    drawingPad.activeInteract(frameLayer);
});

S.all(".all_cancel").on("click",function(){
    drawingPad.deactiveInteract();  //退出所有图层的交互模式
});

S.all(".getLayerInfo").on("click",function(){
    S.log(drawingPad.getLayerInfo(itemLayer2));
    S.log(drawingPad.getLayerInfo());
});

S.all(".setPara").on("click",function(){
    drawingPad.setLayerPara(itemLayer2,"rotate",180); //[-180,180]
    drawingPad.setLayerPara(itemLayer2,"scale",7); //大于0
});

//获取合并后的数据，并在新窗口中打开预览
S.all(".getData").on("click",function(){

    var data = drawingPad.getMergedData(function(a){
        // KISSY.all(".log").html(a);
        update(a);
        // console.log(a);
    },10000);
    // alert(data);
    // window.open(data,"_blank");
});

function update(a){
    S.log(a);
}
