describe('amap', function () {



    it("amap pan marker icon", function () {
        var lat = new AMap.LngLat(116.397428,39.90923);
        var map = AMap.Map("#mapDiv",{
            level:13 ,
            center: lat
        });
        var marker1=new AMap.Marker({
            icon:"http://webapi.amap.com/images/marker_sprite.png",
            position:lat
        });
        marker1.setMap(map);
        var marker=new AMap.Marker({
            icon:"http://webapi.amap.com/images/marker_sprite.png",
            position:new AMap.LngLat(116.405467,39.907761)
        });
        marker.setMap(map);
        marker.setCursor("url('http://webapi.amap.com/images/0.png'),pointer");
        console.log("icon is: "+marker.getIcon());
        console.log("icon is draggable:"+marker.getDraggable());
        marker.setDraggable(true);
        marker.setIcon(new AMap.Icon({
            image: "http://webapi.amap.com/images/custom_a_j.png",
            size: new AMap.Size(28,37),
            imageOffset:new AMap.Pixel(-28,0)
        }));
        console.log("is marker in lat? "+marker.getPosition().equals(lat));
        AMap.event.addListener(map,'click',function(){
            console.log(lat);
            if(marker.getPosition().equals(lat)){
                marker.setRotation(60);
                return;
            }else{
                marker.moveTo(lat,0.1,function(){
                    console.log(marker.getPosition());
                });

            }

        });


      //  map.panBy(50,100);
      //  map.panTo(new AMap.LngLat(110.405467,39.907761));

    });
    it("amap marker fitview",function(){
        var mapObj,Marker1,Marker2,Marker3;
        mapObj = new AMap.Map("#mapDiv1",{
            center:new AMap.LngLat(116.397428,39.90923),
            level:13
        });
        mapObj.clearMap();


        Marker1=new AMap.Marker({
            map:mapObj,
            icon:"http://webapi.amap.com/images/1.png",
            position:new AMap.LngLat(116.205467,39.907761),
            offset:new AMap.Pixel(-12,-36)
        });

        Marker2=new AMap.Marker({
            map:mapObj,
            icon:"http://webapi.amap.com/images/2.png",
            position:new AMap.LngLat(116.368904,39.913423),
            offset:new AMap.Pixel(-12,-36)
        });

        Marker3=new AMap.Marker({
            map:mapObj,
            icon:"http://webapi.amap.com/images/3.png",
            position:new AMap.LngLat(116.305467,39.807761),
            offset:new AMap.Pixel(-12,-36)
        });

        mapObj.setFitView()
    });

    it("amap lnglat2Pixel lnglat2container  bounds setZoomAndCenter",function(){
        var mapObj = new AMap.Map("#mapDiv2");
        var sw = new AMap.LngLat(109.358081,24.306427);
        var ne = new AMap.LngLat(109.471378,24.351788);
        var viewBounds = new AMap.Bounds(sw,ne);

        console.log('Bounds toString is: '+viewBounds.toString());
        console.log('Bounds contains (109.4,24.33)?: '+ viewBounds.contains(new AMap.LngLat(109.4,24.33)));
        console.log("Bounds's center's lng is: "+viewBounds.getCenter().getLng());
        mapObj.setBounds(viewBounds);
        mapObj.setZoomAndCenter(14,new AMap.LngLat(116.205467,39.907761));
        AMap.event.addListener(mapObj,'click',function(e){
            console.log("hrer"+e);
            var px = e.lnglat.getLng();
            var py = e.lnglat.getLat();
            var pixel=mapObj.lnglatToPixel(new AMap.LngLat(px,py),10);
            console.log(pixel);
            var p2 = mapObj.lnglatTocontainer(new AMap.LngLat(px,py));
            console.log(p2);
            var ll = mapObj.pixelToLngLat(new AMap.Pixel(pixel.getX(),pixel.getY()),10);
            console.log(ll);
            var ll2 = mapObj.containTolnglat(new AMap.Pixel(p2.getX(),p2.getY()));
            console.log(ll2);
        });
    });
    it("amap status getResolution getZoom getCenter",function(){
        var mapObj = new AMap.Map("#mapDiv3");
        mapObj.setStatus({
            dragEnable:true,
            keyboardEnable:false,
            doubleClickZoom:true
        });
        console.log(mapObj.getResolution());
        console.log(mapObj.getSize());
        console.log(mapObj.getBounds());
        console.log(mapObj.getStatus());
        console.log(mapObj.getScale());
        console.log(mapObj.getDefaultCursor());


        AMap.event.addListener(mapObj,'complete',function(){
            console.log("map load ok! the center of the map is:"+mapObj.getCenter());
        });
        AMap.event.addListener(mapObj,'zoomchange',function(e){
            console.log("the zoom is :"+mapObj.getZoom()) ;
        });
    });
    it("amap infowindow",function(){
        var lat = new AMap.LngLat(116.397428, 39.90923);
        var map = AMap.Map("#mapDiv4",{
            level:13 ,
            center: lat
        });
        map.zoomIn();

        console.log("lat is equals to new AMap.LngLat(116.397428, 39.90923)? "+lat.equals(new AMap.LngLat(116.397428, 39.90923)));
        var infoWindow = new AMap.InfoWindow({
            position: lat
        });
        infoWindow.setContent("<iframe src='http://www.baidu.com'></iframe><div class='sdf'>dfdfdfdf</div><a href='http://www.taobao.com' target='_self'>111111</a><a href='http://www.taobao.com'>fff</a>");
        infoWindow.open(map, lat);
        console.log("the content before:" + infoWindow.getContent());
        var info = [];
        info.push("<div><div><img style=\"float:left;\" src=\" http://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>AMap Software</b>");
        info.push("phone: 010-84107000");
        info.push("address: XXX</div></div>");

        infoWindow.setContent(info.join("<br/>"));
        infoWindow.open(map, new AMap.LngLat(116.480983, 39.989628));
        map.setCenter(new AMap.LngLat(116.480983, 39.989628));
        AMap.event.addListener(map,'complete',function(){
            console.log("infowindow size is "+infoWindow.getSize());
        });
        console.log("the content after:" + infoWindow.getContent());

        infoWindow.setSize(new AMap.Size(100,100));



      //  map.clearInfoWindow();
       // map.clearMap();
        //   map.destroy();    //??todo
    })
});
