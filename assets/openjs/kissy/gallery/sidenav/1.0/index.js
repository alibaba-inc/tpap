/**
* @fileOverview SafeSideNav组件的安全适配器
*/
KISSY.add(function (S, SideNav) {
    var DOM = S.DOM,
		Event = S.Event;


    //适配代码在这
    function init(frameGroup) {

        function SafeSideNav(config, mod) {

            this.mod = mod;
            var cfg = cajaAFTB.untame(config);

            cfg.node = S.get(cfg.node, mod);
            cfg.top.node = S.get(cfg.top.node, mod);
            cfg.when.node = S.get(cfg.top.node, mod);

            var array = [];
            for (var rules in cfg.map.rule) {
                //console.log(rules);
                array.push(rules);
            }

            for (var i in array) {
                cfg.map[array[i]] = S.get(cfg.map.rule[array[i]], mod);
            }

            this.inner = new SideNav(cfg);
        }



        /**
        * @param context 上下文
        * @param context.mod 沙箱的模块范围，所有操作必须限定到模块范围之内去执行
        * @param context.frame 单个模块的沙箱
        * @return {Object} 实际的组件对象
        */
        return function (context) {

            //最终需要返回给
            return {
                SideNav: frameGroup.markFunction(function () {
                    var config = S.makeArray(arguments)[0];
                    return new SafeSideNav(config, context.mod);
                }),
                kissy: true
            }
        }

    }
    return init;
}, {
    requires: ['gallery/sideNav/1.0/index']
});