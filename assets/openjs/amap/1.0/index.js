/**
 * @fileOverview 高德地图的安全适配器
 * @depends 依赖于页面中正确的引入了jssdk的库文件
 */
KISSY.add(function (S,DOM) {

    /**
     * 提供一个init方法，名字任取，最后模块return即可。 用来初始化适配器
     * 初始化方法需要返回一个函数，用来为每个沙箱环境提供适配对象。
     * ps: 页面中可能会有多个安全沙箱环境。init方法内执行的可以理解为所有沙箱共享的一些内容对象，主要提供最原始的安全适配对象和方法。(执行一次,所有沙箱共享)
     *     init返回的函数可以理解是为每个沙箱提供的安全适配对象。(执行多次，每个沙箱对对象的操作不影响其他沙箱)
     *     总结：可以理解为KISSY在frameGroup初始化的时候是一个对象，然后会copy多份，分别放到不同的沙箱环境中去执行。每个copy相互之间不影响
     * @param frameGroup 页面中的沙箱环境，frame即为沙箱，frameGroup为沙箱组。沙箱的公共环境
     * @returns {Function} 工厂获取实际的适配对象
     */
    function init(frameGroup) {

        function SafeAliPoint(){
            this.obj = new AMap.Pixel(arguments[0],arguments[1]);

            this.getX = function(){
                return this.obj.getX();
            };
            this.getY = function(){
                return this.obj.getY();
            };
            this.equals = function(o){
                return this.obj.equals(new AMap.Pixel(o.getX(), o.getY()));
            };
            this.toString = function(){
                return this.obj.toString();
            };
        }

        funs = ('getX,getY,equals,toString').split(',');
        frameGroup.markCtor(SafeAliPoint);

        S.each(funs, function (fn) {
            frameGroup.grantMethod(SafeAliPoint, fn);
        });

        //--------------------------------------

        function SafeAliSize(){
            this.obj = new AMap.Size(arguments[0],arguments[1]);

            this.getWidth = function(){
                return this.obj.getWidth();
            };
            this.getHeight = function(){
                return this.obj.getHeight();
            };
            this.toString = function(){
                return this.obj.toString();
            };
        }

        funs = ('getWidth,getHeight,toString').split(',');
        frameGroup.markCtor(SafeAliSize);

        S.each(funs, function (fn) {
            frameGroup.grantMethod(SafeAliSize, fn);
        });

        //--------------------------------------

        function SafeAliLatLng() {
            this.obj = new AMap.LngLat(arguments[0], arguments[1]);

            this.getLng = function () {
                return this.obj.getLng();
            };
            this.equals = function (o) {
                return this.obj.equals(new AMap.LngLat(o.getLng(), o.getLat()));
            };
            this.getLat = function () {
                return this.obj.getLat();
            };
            this.offset = function(){
                var o = this.obj.offset(arguments[0],arguments[1]);
                return  new SafeAliLatLng(o.getLng(), o.getLat());
            };
            this.distance = function(o){
                return this.obj.distance(new AMap.LngLat(o.getLng(), o.getLat()));
            };
            this.toString = function(){
                return this.obj.toString();
            }
        }

        funs = ('getLng,equals,getLat,offset,distance,toString').split(',');
        frameGroup.markCtor(SafeAliLatLng);

        S.each(funs, function (fn) {
            frameGroup.grantMethod(SafeAliLatLng, fn);
        });

        //--------------------------------------

        function SafeAliBounds() {
            var p1 = arguments[0],
                p2 = arguments[1];
            this.obj = new AMap.Bounds(new AMap.LngLat(p1.getLng(),p1.getLat()),new AMap.LngLat(p2.getLng(),p2.getLat()));

            this.contains = function (o) {
                return this.obj.contains(new AMap.LngLat(o.getLng(),o.getLat()));
            };
            this.getCenter = function () {
                var o = this.obj.getCenter();
                return new SafeAliLatLng(o.getLng(), o.getLat());
            };
            this.getSouthWest = function () {
                var o = this.obj.getSouthWest();
                return new SafeAliLatLng(o.getLng(), o.getLat());
            };
            this.getNorthEast = function(){
                var o = this.obj.getNorthEast();
                return new SafeAliLatLng(o.getLng(), o.getLat());
            };
            this.toString = function(){
                return this.obj.toString();
            }
        }

        funs = ('contains,getCenter,getSouthWest,getNorthEast,toString').split(',');
        frameGroup.markCtor(SafeAliBounds);

        S.each(funs, function (fn) {
            frameGroup.grantMethod(SafeAliBounds, fn);
        });

        //--------------------------------------

        function SafeAliMap() {
            var config = arguments[1]||{};
            if(config.center){
                config.center = new AMap.LngLat(config.center.getLng(),config.center.getLat());
            }
            this.obj = new AMap.Map(arguments[0],config);
        }
        //exclude: setFitView ,setDefaultLayer
        var funs = ("getCenter,setCenter,getZoom,setZoom,getSize,getBounds,getStatus,getResolution,getScale," +
            "getDefaultCursor,zoomIn,zoomOut,setZoomAndCenter,setBounds,setStatus,panTo,panBy,clearMap,destroy," +
            "pixelToLngLat,lnglatToPixel,clearInfoWindow,containTolnglat,lnglatTocontainer,setFitView," +
            "plugin").split(",");
        frameGroup.markCtor(SafeAliMap);
        SafeAliMap.prototype.plugin = function(p1,p2){
            this.obj.plugin(p1,p2);
        };
        SafeAliMap.prototype.getCenter = function () {
            var newP = this.obj.getCenter();
            return new SafeAliLatLng(newP.getLng(),newP.getLat());
        };
        SafeAliMap.prototype.setCenter = function (o) {
            this.obj.setCenter(new AMap.LngLat(o.getLng(), o.getLat()));
        };
        SafeAliMap.prototype.getZoom = function () {
            return this.obj.getZoom();
        };
        SafeAliMap.prototype.setZoom = function (o) {
            this.obj.setZoom(o);
        };
        SafeAliMap.prototype.getSize = function () {
            var o = this.obj.getSize();
            return new SafeAliSize(o.getWidth(), o.getHeight());
        };
        SafeAliMap.prototype.getBounds = function () {
            var o = this.obj.getBounds();
            return new SafeAliBounds(o.getSouthWest(), o.getNorthEast());
        };
        SafeAliMap.prototype.getStatus = function () {
            return this.obj.getStatus();
        };
        SafeAliMap.prototype.getResolution = function (o) {
            if(o){
                return this.obj.getResolution(new AMap.LngLat(o.getLng(), o.getLat()));
            }else{
                return this.obj.getResolution();
            }
        };
        SafeAliMap.prototype.getScale = function (o) {
            return this.obj.getScale(o);
        };
        SafeAliMap.prototype.getDefaultCursor = function () {
            return this.obj.getDefaultCursor();
        };
        SafeAliMap.prototype.zoomIn = function () {
            this.obj.zoomIn();
        };
        SafeAliMap.prototype.zoomOut = function () {
            this.obj.zoomOut();
        };
        SafeAliMap.prototype.setZoomAndCenter = function (y, x) {
            this.obj.setZoomAndCenter(y, new AMap.LngLat(x.getLng(), x.getLat()));
        };
        SafeAliMap.prototype.setBounds = function (x) {
            var ll1 = x.getSouthWest(),
                ll2 = x.getNorthEast();
            ll1 = new AMap.LngLat(ll1.getLng(),ll1.getLat());
            ll2 = new AMap.LngLat(ll2.getLng(),ll2.getLat());
            this.obj.setBounds(new AMap.Bounds(ll1, ll2));
        };
        SafeAliMap.prototype.setStatus = function (x) {
            this.obj.setStatus(cajaAFTB.untame(x));
        };
        SafeAliMap.prototype.panTo = function (x) {
            this.obj.panTo(new AMap.LngLat(x.getLng(), x.getLat()));
        };
        SafeAliMap.prototype.panBy = function (x,y) {
            this.obj.panBy(x,y);
        };
        SafeAliMap.prototype.clearMap = function () {
            this.obj.clearMap();
        };
        SafeAliMap.prototype.destroy = function () {
            this.obj.destroy();
        };
        SafeAliMap.prototype.pixelToLngLat = function (x,y) {
            var o = this.obj.pixelToLngLat(new AMap.Pixel(x.getX(), x.getY()),y);
            return new SafeAliLatLng(o.getLng(), o.getLat());
        };
        SafeAliMap.prototype.lnglatToPixel = function (x,y) {
            var o = this.obj.lnglatToPixel(new AMap.LngLat(x.getLng(), x.getLat()),y);
            return new SafeAliPoint(o.getX(), o.getY());
        };
        SafeAliMap.prototype.clearInfoWindow = function () {
            this.obj.clearInfoWindow();
        };
        SafeAliMap.prototype.containTolnglat = function (x,y) {
            var o = this.obj.containTolnglat(new AMap.Pixel(x.getX(), x.getY()),y);
            return new SafeAliLatLng(o.getLng(), o.getLat());
        };
        SafeAliMap.prototype.lnglatTocontainer = function (x,y) {
            var o = this.obj.lnglatTocontainer(new AMap.LngLat(x.getLng(), x.getLat()),y);
            return new SafeAliPoint(o.getX(), o.getY());
        };
        SafeAliMap.prototype.setFitView = function (arr) {
            this.obj.setFitView(arr);
        };



        S.each(funs, function (fn) {
            frameGroup.grantMethod(SafeAliMap, fn);
        });

        //--------------------------------------

        function SafeAliIcon() {
            var self = this;
            var o = arguments[0],
                p = {};
            if(o.size){
                p.size = new AMap.Size(o.size.getWidth(), o.size.getHeight());
            }
            if(o.imageOffset){
                p.imageOffset = new AMap.Pixel(o.imageOffset.getX(), o.imageOffset.getY());
            }
            if(o.image){
                p.image = cajaAFTB.rewriteURL(o.image, null, null, {XML_ATTR: "src"});
            }
            self.obj = new AMap.Icon(p);
        }

        frameGroup.markCtor(SafeAliIcon);

        //--------------------------------------
        //exclude: moveAlong

        function SafeAliMarker() {
            var config = arguments[0];
            if(config.map){
                config.map = config.map.obj;
            }
            if(config.position){
                config.position = new AMap.LngLat(config.position.getLng(),config.position.getLat());
            }
            if(config.offset){
                config.offset = new AMap.Pixel(config.offset.getX(),config.offset.getY());
            }
            if(config.icon){
                if(config.icon.obj){
                    config.icon = config.icon.obj;
                }else{
                    config.icon = cajaAFTB.rewriteURL(config.icon, null, null, {XML_ATTR: "src"});
                }
            }
            if(config.content){
                if(typeof config.content == 'string'){
                    config.content = caja.sanitizeHtml(config.content);
                }else{
                    config.content = config.content.obj;
                }
            }

            this.obj = new AMap.Marker(config);
        }

        funs = ('getPosition,setPosition,setzIndex,setIcon,getIcon,setDraggable,getDraggable,hide,show,setCursor,' +
            'setContent,getContent,moveTo,stopMove,setMap,setRotation').split(',');
        frameGroup.markCtor(SafeAliMarker);

        SafeAliMarker.prototype.getPosition = function () {
            var o = this.obj.getPosition();
            return new SafeAliLatLng(o.getLng(), o.getLat());
        };
        SafeAliMarker.prototype.setPosition = function (o) {
            this.obj.setPosition(new AMap.LngLat(o.getLng(), o.getLat()));
        };
        SafeAliMarker.prototype.setzIndex = function (o) {
            this.obj.setzIndex(o);
        };
        SafeAliMarker.prototype.setIcon = function (o) {
            if(o.obj){
                this.obj.setIcon(o.obj);
            }else{
                this.obj.setIcon(cajaAFTB.rewriteURL(o, null, null, {XML_ATTR: "src"}))
            }
        };
        SafeAliMarker.prototype.getIcon = function () {
            return this.obj.getIcon();
        };
        SafeAliMarker.prototype.setDraggable = function (flag) {
            this.obj.setDraggable(flag);
        };
        SafeAliMarker.prototype.getDraggable = function () {
            return this.obj.getDraggable();
        };
        SafeAliMarker.prototype.hide = function () {
            this.obj.hide();
        };
        SafeAliMarker.prototype.show = function () {
            this.obj.show();
        };
        SafeAliMarker.prototype.setCursor = function (o) {
            this.obj.setCursor(o)
        };
        SafeAliMarker.prototype.setContent = function (o) {
            if(typeof o == 'string'){
                o = cajaAFTB.sanitizeHtml(o);
            }else{
                o = o.obj;
            }
            this.obj.setContent(o)
        };
        SafeAliMarker.prototype.getContent = function () {
            return this.obj.getContent()
        };
        SafeAliMarker.prototype.moveTo = function (x,y,z) {
            this.obj.moveTo(new AMap.LngLat(x.getLng(), x.getLat()),y,z);
        };
        SafeAliMarker.prototype.stopMove = function () {
            this.obj.stopMove();
        };
        SafeAliMarker.prototype.setMap = function (o) {
            this.obj.setMap(o.obj);
        };
        SafeAliMarker.prototype.setRotation = function (o) {
            this.obj.setRotation(o);
        };

        S.each(funs, function (fn) {
            frameGroup.grantMethod(SafeAliMarker, fn);
        });

        //--------------------------------------

        function SafeAliInfoWindow(a) {
            var config = a;
            if(config.content){
                if(typeof config.content == 'string'){
                    config.content = cajaAFTB.sanitizeHtml(config.content);
                }else{
                    config.content = config.content.obj;
                }
            }
            if(config.size){
                config.size = new AMap.Size(config.size.getWidth(),config.size.getHeight());
            }
            if(config.offset){
                config.offset = new AMap.Pixel(config.offset.getX(),config.offset.getY());
            }
            if(config.position){
                config.position = new AMap.LngLat(config.position.getLng(),config.position.getLat());
            }
            this.obj = new AMap.InfoWindow(config);
        }

        funs = ('close,open,getIsOpen,setContent,getContent,setPosition,getPosition,setSize,getSize').split(',');
        frameGroup.markCtor(SafeAliInfoWindow);

        SafeAliInfoWindow.prototype.close = function () {
            this.obj.close();
        };
        SafeAliInfoWindow.prototype.open = function (x,y) {
            this.obj.open(x.obj, new AMap.LngLat(y.getLng(), y.getLat()));
        };
        SafeAliInfoWindow.prototype.getIsOpen = function () {
            return this.obj.getIsOpen();
        };
        SafeAliInfoWindow.prototype.setContent = function () {
            if(typeof arguments[0] == 'string'){
                arguments[0] = cajaAFTB.sanitizeHtml(arguments[0]);
            }else{
                arguments[0] = arguments[0].obj;
            }
            return this.obj.setContent(arguments[0]);

        };
        SafeAliInfoWindow.prototype.getContent = function () {
            return this.obj.getContent();
        };
        SafeAliInfoWindow.prototype.setPosition = function (y) {
            this.obj.setPosition(new AMap.LngLat(y.getLng(), y.getLat()));
        };
        SafeAliInfoWindow.prototype.getPosition = function () {
            var o = this.obj.getPosition();
            if(o){
                return new SafeAliLatLng(o.getLng(), o.getLat());
            }else{
                return o;
            }
        };
        SafeAliInfoWindow.prototype.setSize = function (y) {
            this.obj.setSize(new AMap.Size(y.getWidth(), y.getHeight()));
        };
        SafeAliInfoWindow.prototype.getSize = function () {
            var o = this.obj.getSize();
            if(o){
                return new SafeAliSize(o.getWidth(), o.getHeight());
            }else{
                return o;
            }
        };
        S.each(funs, function (fn) {
            frameGroup.grantMethod(SafeAliInfoWindow, fn);
        });


        function SafeGeocoder(config){
            this.obj = new AMap.Geocoder(cajaAFTB.untame(config));
        }

        funs = ('getLocation,getAddress,setCity').split(',');
        frameGroup.markCtor(SafeGeocoder);

        SafeGeocoder.prototype.getLocation = function(data){
            return this.obj.getLocation(data);
        };
        SafeGeocoder.prototype.getAddress = function(data){
            return this.obj.getAddress(new AMap.LngLat(data.getLng(), data.getLat()));
        };
        SafeGeocoder.prototype.setCity = function(city){
            return this.obj.setCity(city);
        };
        S.each(funs, function (fn) {
            frameGroup.grantMethod(SafeGeocoder, fn);
        });


        /**
         * @param context 上下文
         * @param context.mod 沙箱的模块范围，所有操作必须限定到模块范围之内去执行
         * @param context.frame 单个模块的沙箱
         * @return {Object} 实际的组件对象
         */
        return function (context) {

            var obj = {
                Size: frameGroup.tame(frameGroup.markFunction(function (x,y) {
                    return new SafeAliSize(x,y);
                })),
                Bounds: frameGroup.tame(frameGroup.markFunction(function (x,y) {
                    return new SafeAliBounds(x,y);
                })),
                Map: frameGroup.tame(frameGroup.markFunction(function (a,opt) {
                    return new SafeAliMap(DOM.get(a,context.mod),opt);
                })),
                Pixel: frameGroup.tame(frameGroup.markFunction(function (a,b) {
                    return new SafeAliPoint(a,b)
                })),
                Icon: frameGroup.tame(frameGroup.markFunction(function (opt) {
                    return new SafeAliIcon(opt)
                })),
                Marker: frameGroup.tame(frameGroup.markFunction(function (opt) {
                    return new SafeAliMarker(opt);
                })),
                InfoWindow: frameGroup.tame(frameGroup.markFunction(function (opt) {
                    return new SafeAliInfoWindow(opt);
                })),
                LngLat: frameGroup.tame(frameGroup.markFunction(function (x, y) {
                    return new SafeAliLatLng(x, y)
                })),
                event: frameGroup.tame({
                    addListener:frameGroup.markFunction(function () {
                        var param = arguments;
                        AMap.event.addListener(param[0].obj,param[1], frameGroup.markFunction(function(e){
                            var tmp = e;
                            if(tmp.lnglat){
                                tmp.lnglat = new SafeAliLatLng(e.lnglat.getLng(), e.lnglat.getLat());
                            }
                            if(tmp.pixel){
                                tmp.pixel = new SafeAliPoint(e.pixel.getX(), e.pixel.getY());
                            }
                            if(tmp.geocodes){
                                for(var i = 0; i< tmp.geocodes.length; i++){
                                    var curloc = tmp.geocodes[i].location;
                                    if(curloc){
                                        tmp.geocodes[i].location = new SafeAliLatLng(curloc.getLng(),curloc.getLat());
                                    }
                                }
                            }
                            if(tmp.regeocode){
                                for (var i = 0; i < tmp.regeocode.roads.length; i++) {
                                    var curroad = tmp.regeocode.roads[i].location;
                                    if (curroad) {
                                        tmp.regeocode.roads[i].location = new SafeAliLatLng(curroad.getLng(), curroad.getLat());
                                    }
                                }
                                for (var i = 0; i < tmp.regeocode.crosses.length; i++) {
                                    var curcross = tmp.regeocode.crosses[i].location;
                                    if (curcross) {
                                        tmp.regeocode.crosses[i].location = new SafeAliLatLng(curcross.getLng(), curcross.getLat());
                                    }
                                }
                                for (var i = 0; i < tmp.regeocode.pois.length; i++) {
                                    var curpoi = tmp.regeocode.pois[i].location;
                                    if (curpoi) {
                                        tmp.regeocode.pois[i].location = new SafeAliLatLng(curpoi.getLng(), curpoi.getLat());
                                    }
                                }
                            }
                            param[2].call(this,tmp);
                        }));
                    })
                }),
                Geocoder: frameGroup.tame(frameGroup.markFunction(function(opt){
                    return new SafeGeocoder(opt);
                }))
            };

            //最终需要返回给
            return {
                AMap: frameGroup.tame(obj)
            }
        }
    }

    return init;

},{requires:['dom']});