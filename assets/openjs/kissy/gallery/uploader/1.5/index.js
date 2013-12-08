/**
 * @fileOverview Uploader组件的安全适配器
 */
KISSY.add(function(S, Uploader,Auth,Filedrop,ImageZoom,Imgcrop,Preview,ProBars,TagConfig,UrlsInput,ImageUploader) {

    function init(frameGroup) {

        function grantMethod(Cls,methods){
            S.each(methods, function(fn) {
                frameGroup.grantMethod(Cls, fn);
            });
        }

        function SafeUploader(target,cfg) {
            this.inner = new Uploader(target,cfg);
        }
        S.augment(SafeUploader,{
            on:function(type, fnc) {
                var eventObject = {};
                this.inner.on(type, frameGroup.markFunction(function(ev){
                    if(type == 'select'){
                        eventObject = {
                            files: ev.files
                        };
                    }
                    else if(type == 'success' || type == 'error' || type == 'complete' || type == 'add'){
                        eventObject = {index:ev.index, file:ev.file, result:ev.result || {}};
                    }
                    fnc.call(this, eventObject);
                }));
            },
            upload:function(index){
                return  this.inner.upload(index);
            },
            plug:function(plugin){
                this.inner.plug(plugin);
                return this;
            },
            theme:function(theme){
                return  this.inner.theme(theme);
            },
            set:function(key,value){
                return  this.inner.set(key,value);
            },
            get:function(key){
                return this.inner.get(key);
            },
            uploadFiles:function(status){
                this.inner.uploadFiles(status);
            },
            restore:function(target){
                this.inner.restore(target);
            },
            stop:function(){
                return  this.inner.stop();
            },
            cancel:function(index){
                return  this.inner.cancel(index);
            }
        });


        frameGroup.markCtor(SafeUploader);
        grantMethod(SafeUploader,["on","get","set","upload","plug","theme","restore","uploadFiles","stop","cancel"]);

        function SafeImageUploader(config) {
            this.inner = new ImageUploader(config);
        }

        S.augment(SafeImageUploader,{
            render:function(){
                return  this.inner.render();
            },
            set:function(key,value){
                return this.inner.set(key,value);
            },
            get:function(key){
                return this.inner.get(key);
            }
        });

        frameGroup.markCtor(SafeImageUploader);
        grantMethod(SafeUploader,["get","set"]);

        function SafeAuth(config) {
            this.inner = new Auth(config);
        }
        S.augment(SafeAuth,{
            pluginInitializer:function(uploader){
                return this.inner.pluginInitializer(uploader);
            }
        });
        frameGroup.markCtor(SafeAuth);
        grantMethod(SafeAuth,["pluginInitializer"]);

        function SafePreview(config){
            this.inner = new Preview(config);
        }
        S.augment(SafePreview,{
            pluginInitializer:function(uploader){
                return this.inner.pluginInitializer(uploader);
            }
        });
        frameGroup.markCtor(SafePreview);
        grantMethod(SafePreview,["pluginInitializer"]);

        function SafeFiledrop(config){
            this.inner = new Filedrop(config);
        }
        S.augment(SafeFiledrop,{
            pluginInitializer:function(uploader){
                return this.inner.pluginInitializer(uploader);
            }
        });
        frameGroup.markCtor(SafeFiledrop);
        grantMethod(SafeFiledrop,["pluginInitializer"]);


        function SafeProBars(config){
            this.inner = new ProBars(config);
        }
        S.augment(SafeProBars,{
            pluginInitializer:function(uploader){
                return this.inner.pluginInitializer(uploader);
            }
        });
        frameGroup.markCtor(SafeProBars);
        grantMethod(SafeProBars,["pluginInitializer"]);

        function SafeTagConfig(config){
            this.inner = new TagConfig(config);
        }
        S.augment(SafeTagConfig,{
            pluginInitializer:function(uploader){
                return this.inner.pluginInitializer(uploader);
            }
        });
        frameGroup.markCtor(SafeTagConfig);
        grantMethod(SafeTagConfig,["pluginInitializer"]);

        function SafeUrlsInput(config){
            this.inner = new UrlsInput(config);
        }
        S.augment(SafeUrlsInput,{
            pluginInitializer:function(uploader){
                debugger;
                return this.inner.pluginInitializer(uploader);
            }
        });
        frameGroup.markCtor(SafeUrlsInput);
        grantMethod(SafeUrlsInput,["pluginInitializer"]);

        /**
         * @param context 上下文
         * @param context.mod 沙箱的模块范围，所有操作必须限定到模块范围之内去执行
         * @param context.frame 单个模块的沙箱
         * @return {Object} 实际的组件对象
         */
        return function(context) {

            //最终需要返回给
            return {
                Uploader: {
                    Core:frameGroup.markFunction(function() {
                        var args = S.makeArray(arguments);
                        var target = args[0];
                        var cfg = cajaAFTB.untame(args[1], context.mod);
                        return new SafeUploader(target,cfg);
                    }),
                    Auth:frameGroup.markFunction(function(){
                        var config = S.makeArray(arguments)[0];
                        config = cajaAFTB.untame(config);
                        return new SafeAuth(config);
                    }),
                    Filedrop:frameGroup.markFunction(function(){
                        var config = S.makeArray(arguments)[0];
                        config = cajaAFTB.untame(config);
                        return new SafeFiledrop(config);
                    }),
                    Preview:frameGroup.markFunction(function(){
                        var config = S.makeArray(arguments)[0];
                        config = cajaAFTB.untame(config);
                        return new SafePreview(config);
                    }),
                    ProBars:frameGroup.markFunction(function(){
                        var config = S.makeArray(arguments)[0];
                        config = cajaAFTB.untame(config);
                        return new SafeProBars(config);
                    }),
                    TagConfig:frameGroup.markFunction(function(){
                        var config = S.makeArray(arguments)[0];
                        config = cajaAFTB.untame(config);
                        return new SafeTagConfig(config);
                    }),
                    UrlsInput:frameGroup.markFunction(function(){
                        var config = S.makeArray(arguments)[0];
                        config = cajaAFTB.untame(config);
                        return new SafeUrlsInput(config);
                    }),
                    ImageUploader:frameGroup.markFunction(function(){
                        var config = S.makeArray(arguments)[0];
                        config = cajaAFTB.untame(config);
                        return new SafeImageUploader(config);
                    })
                },
                kissy: true
            }

        }

    }
    return init;
}, {
    requires: ['gallery/uploader/1.5/','gallery/uploader/1.5/plugins/auth/auth','gallery/uploader/1.5/plugins/filedrop/filedrop','gallery/uploader/1.5/plugins/imageZoom/imageZoom','gallery/uploader/1.5/plugins/imgcrop/imgcrop','gallery/uploader/1.5/plugins/preview/preview','gallery/uploader/1.5/plugins/proBars/proBars','gallery/uploader/1.5/plugins/tagConfig/tagConfig','gallery/uploader/1.5/plugins/urlsInput/urlsInput','gallery/uploader/1.5/themes/imageUploader/','gallery/uploader/1.5/themes/imageUploader/style.css']
});