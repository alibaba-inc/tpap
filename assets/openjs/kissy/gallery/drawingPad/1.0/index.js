/**
 * @fileOverview drawingPad组件的安全适配器
 */
KISSY.add(function(S, DrawingPad) {

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

        /**
         * 因为KISSY的组件构造函数只有一个，后面可能会对构造函数本身做修改
         * 所以这里可以写一个SafeConstruector，相当于继承KISSY的组件，并且显示的声明要开放哪些api
         */

        function SafeDrawingPad(cfg) {
            this.inner = new DrawingPad(cfg);
        }

        S.augment(SafeDrawingPad,{
            addLayer:function(cfg){
                return this.inner.addLayer(cfg);
            },
            activeInteract:function(index){
                this.inner.activeInteract(index);
            },
            deactiveInteract:function(){
                this.inner.deactiveInteract();
            },
            getMergedData:function(callback,delay){
                return this.inner.getMergedData( frameGroup.markFunction(function(data){
                    callback.call(null,data);
                }),delay);
            },
            getLayerInfo:function(layerIndex){
                return this.inner.getLayerInfo(layerIndex);
            },
            setLayerPara:function(layerIndex,paraName,paraValue){
                this.inner.setLayerPara(layerIndex,paraName,paraValue);             
            }
        });

        frameGroup.markCtor(SafeDrawingPad);
        S.each(['addLayer','activeInteract','deactiveInteract','getMergedData','getLayerInfo','setLayerPara'], function(fn) {
            frameGroup.grantMethod(SafeDrawingPad, fn);
        });

        /**
         * @param context 上下文
         * @param context.mod 沙箱的模块范围，所有操作必须限定到模块范围之内去执行
         * @param context.frame 单个模块的沙箱
         * @return {Object} 实际的组件对象
         */
        return function(context) {

            return {
                DrawingPad: frameGroup.markFunction(function() {
                    var config     = S.makeArray(arguments)[0]; 
                    config.wrapper = S.get(config.wrapper, context.mod); //限制wrapper范围
                    return new SafeDrawingPad(config);
                }),
                kissy: true
            }

        }

    }
    return init;
}, {
    requires: ['gallery/drawingPad/1.0/index']
});