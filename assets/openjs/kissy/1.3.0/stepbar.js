/**
 * @fileOverview 步骤条组件的安全适配器
 */
KISSY.add(function (S, Stepbar) {
    var DOM = S.DOM,
        Event = S.Event;

    /**
     * 提供一个init方法，名字任取，最后模块return即可。 用来初始化适配器的
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
        function SafeStepbar(el, config) {
            this.inner = new Stepbar(el, config);
        }

        //为我们‘继承'的构造函数添加需要开放给外部使用的原型方法
        SafeStepbar.prototype.on = function () {
            var params = S.makeArray(arguments);
            var self = this;
            this.inner.on(params[0], function(e){
                //这里因为用户肯定不需要用到e.halt这些函数，所以简单的将event封装一下（frameGroup.tame）即可
                var event = {
                    attrName: e.attrName && e.attrName.toString(),
                    newVal: e.newVal && e.newVal.toString(),
                    prevVal: e.prevVal && e.prevVal.toString(),
                    newVal: e.newVal && e.newVal.toString()
                };
                params[1].call(self, frameGroup.tame(event));
            });
        };

        SafeStepbar.prototype.render = function () {
            this.inner.render();
        };

        SafeStepbar.prototype.allowColor = function () {
            return this.inner.allowColor();
        };

        SafeStepbar.prototype.set = function (cls,num) {

            this.inner.set(cls,num);
        };

        SafeStepbar.prototype.reset = function () {
            this.inner.reset();
        };

        //---- 组件是一个构造函数进行初始化的，需要markCtor标记一下，让caja容器认识
        frameGroup.markCtor(SafeStepbar);

        //构造函数实例的方法，需要grantMethod ，加入白名单，没有加入白名单的不可以使用，caja容器不认识
        frameGroup.grantMethod(SafeStepbar, "render");
        frameGroup.grantMethod(SafeStepbar, "set");
        frameGroup.grantMethod(SafeStepbar, "allowColor");
        frameGroup.grantMethod(SafeStepbar, "on");
        frameGroup.grantMethod(SafeStepbar, "reset");

        /**
         * @param context 上下文
         * @param context.mod 沙箱的模块范围，所有操作必须限定到模块范围之内去执行
         * @param context.frame 单个模块的沙箱
         * @return {Object} 实际的组件对象
         */
        return function (context) {

            //最终需要返回给
            return {
                Stepbar: frameGroup.markFunction(function () {          
                    arg=cajaAFTB.untame(arguments[0]);
                    arg.tameNode = S.all(arg, context.mod);
                    return new SafeStepbar(arg, cajaAFTB.untame(arguments[1]));
                }),
                kissy:true
            }
        }

    }

    return init;

}, {
    requires: ['gallery/stepbar/1.1/index', 'gallery/stepbar/1.1/stepbar.css']
});