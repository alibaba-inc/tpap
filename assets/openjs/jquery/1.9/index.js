/**
 * @fileOverview jQuery(1.9)的安全适配器
 */
KISSY.add(function (S) {
    var $ = window.jQuery;

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
        function tameNode(node){
            //方法占位,frame对象此时没有还
        }

        /**
         * @param context 上下文
         * @param context.mod 沙箱的模块范围，所有操作必须限定到模块范围之内去执行
         * @param context.frame 单个模块的沙箱
         * @return {Object} 实际的组件对象
         */
        return function (context) {

            /*
             exclude: Internals, Deferred Object,Callbacks Object,Core
             */
            function SafejQuery(selector) {
                if(typeof selector == "string" && selector.indexOf('<')>=0){
                    selector = cajaAFTB.sanitizeHtml(selector);
                }

                this.inner = $(selector,context.mod);
                this.jquery = this.inner.jquery;
            }

            SafejQuery.prototype.length = function(){
                return this.inner.length;
            };

            /*
             Miscelluneous :
              exclude: toArray
             */
             var Miscelluneous = [
                 "get","index"
             ];
            SafejQuery.prototype.get = function(p1){
                var result = new SafejQuery();
                result.inner = this.inner.get(p1);
                return result;
            };
            SafejQuery.prototype.index = function(p1){
                if(p1 instanceof SafejQuery){
                    p1 = p1.inner;
                }
                return this.inner.index(p1);
            };



            /*
             Manipulation :
              exclude:
             */
            var ManipulationFuncs = [
                "clone","unwrap","wrap","wrapAll","wrapInner","append","appendTo","prepend","prependTo","text",
                "after","before","insertAfter","insertBefore","detach","empty","remove","replaceAll","replaceWith"
            ];

            SafejQuery.prototype.clone = function(p1,p2){
                this.inner = this.inner.clone(p1,p2);
                return this;
            };
            SafejQuery.prototype.unwrap = function(){
                if($.contains(context.mod,this.inner.parent().get(0))){
                    this.inner.unwrap();
                }
                return this;
            };
            var inserts = [
                "wrap","wrapAll","wrapInner","append","appendTo","prepend","prependTo","after","before",
                "insertAfter","insertBefore","replaceAll","replaceWith"
            ];
            S.each(inserts, function (fn) {
                SafejQuery.prototype[fn]= function(){
                    var p1 = arguments[0], p3 = p1,
                        p2 = arguments[1], p4 = p2;
                    if (typeof p1 == "string") {
                        p1 = new SafejQuery(p1);
                    }
                    if (p1 instanceof SafejQuery) {
                        p1 = p1.inner;
                    }
                    if(typeof p1 == 'function'){
                        p1 = function(){
                            var result = p3.apply(this,arguments);
                            if(result instanceof SafejQuery){
                                return result.inner;
                            }else{
                                return  (new SafejQuery(result)).inner;
                            }
                        };
                    }

                    if(p2){
                        if (typeof p2 == "string") {
                            p2 = new SafejQuery(p2);
                        }
                        if (p2 instanceof SafejQuery) {
                            p2 = p2.inner;
                        }
                        if(typeof p2 == 'function'){
                            p2 = function(){
                                var result = p4.apply(this,arguments);
                                if(result instanceof SafejQuery){
                                    return result.inner;
                                }else{
                                    return  (new SafejQuery(result)).inner;
                                }
                            };
                        }
                    }

                    if(p2){
                        this.inner[fn](p1,p2);
                    }else{
                        this.inner[fn](p1);
                    }
                    return this;
                };
            });
            SafejQuery.prototype.text = function(p1){
               if(!p1){
                   return this.inner.text();
               }
                if(typeof p1 == "string"){
                    this.inner.text(cajaAFTB.sanitizeHtml(p1));
                }
                if(typeof p1 == 'function'){
                    var tmp = p1;
                    p1 = function(){
                        return cajaAFTB.sanitizeHtml(tmp.apply(this,arguments));
                    };
                    this.inner.text(p1);
                }
                return this;
            };
            SafejQuery.prototype.detach = function(p1){
                this.inner.detach(p1);
                return this;
            };
            SafejQuery.prototype.empty = function(){
                this.inner.empty();
                return this;
            };
            SafejQuery.prototype.remove = function(p1){
                this.inner.remove(p1);
                return this;
            };


            /*
             Traversing:
             exclude:
             */
            var traversFuncs = [
                "eq","filter","first","has","is","last","map","not","slice","add","addBack","contents","end",
                "children","closest","find","next","nextAll","nextUntil","offsetParent","parent","parents",
                "parentsUntil" ,"prev","prevAll","prevUntil","siblings","each"
            ];

            SafejQuery.prototype.each = function(func){
                this.inner = this.inner.each(function(index,elem){
                    func(index,new SafejQuery(elem));
                });
                return this;
            };
            SafejQuery.prototype.eq = function(idx){
                this.inner = this.inner.eq(idx);
                return this;
            };
            SafejQuery.prototype.filter = function(param){
                if (param instanceof SafejQuery) {
                    param = param.inner;
                }
                this.inner = this.inner.filter(param);
                return this;
            };
            SafejQuery.prototype.first = function(){
                this.inner = this.inner.first();
                return this;
            };
            SafejQuery.prototype.has = function(param){
                this.inner = this.inner.has(param);
                return this;
            };
            SafejQuery.prototype.is = function(param){
                if (param instanceof SafejQuery) {
                    param = param.inner;
                }
                return this.inner.is(param);
            };
            SafejQuery.prototype.last = function(){
                this.inner = this.inner.last();
                return this;
            };
            SafejQuery.prototype.map = function(func){
                return this.inner.map(function(idx,dom){
                    return func(idx,dom);
                });
            };
            SafejQuery.prototype.not = function(param){
                if (param instanceof SafejQuery) {
                    param = param.inner;
                }
                this.inner = this.inner.not(param);
                return this;
            };
            SafejQuery.prototype.slice = function(start,end){
                this.inner = this.inner.slice(start,end);
                return this;
            };
            SafejQuery.prototype.add = function(){
                if(arguments.length == 1){
                    var param = arguments[0];
                    if(typeof param == 'string'){
                        param = new SafejQuery(param);
                    }
                    if (param instanceof SafejQuery) {
                        param = param.inner;
                    }
                    this.inner = this.inner.add(param);
                }else{
                    this.inner = this.inner.add(arguments[0],arguments[1]);
                }
                return this;
            };
            SafejQuery.prototype.addBack = function(param){
                this.inner = this.inner.addBack(param);
                return this;
            };
            SafejQuery.prototype.contents = function(){
                this.inner = this.inner.contents();
                return this;
            };
            SafejQuery.prototype.end = function(){
                this.inner = this.inner.end();
                return this;
            };
            SafejQuery.prototype.children = function(param){
                this.inner = this.inner.children(param);
                return this;
            };
            SafejQuery.prototype.closest = function(){
                if(arguments.length == 2){
                    this.inner = this.inner.closest(arguments[0],arguments[1]);
                    return;
                }
                var param = arguments[0];
                if(typeof param == 'object'){
                    if(param instanceof SafejQuery){
                        param = param.inner;
                    }
                    this.inner = this.inner.closest(param);
                }else{
                    this.inner = this.inner.closest(param,context.mod);
                }
                return this;
            };
            SafejQuery.prototype.find = function(param){
                if (param instanceof SafejQuery) {
                    param = param.inner;
                }
                this.inner = this.inner.find(param);
                return this;
            };
            // 对于可能获取到沙箱外部dom的方法，检查结果是否在沙箱内，如果有不在沙箱内的，返回原值
            var trees = ['next','nextAll','offsetParent','parent','parents','prev','prevAll','siblings'];
            S.each(trees,function(tree){
                SafejQuery.prototype[tree] = function(param){
                    var newNode = this.inner[tree](param),
                        newElem = newNode.get(),
                        flag = true;
                    for(var i = 0 ; i < newElem.length; i++){
                        if(!($.contains(context.mod,newElem[i]))){
                            flag = false;
                            break;
                        }
                    }
                    if(flag){
                        this.inner = newNode;
                    }
                    return this;
                };
            });

            var treeUntils = ['nextUntil','parentsUntil','prevUntil'];
            S.each(treeUntils,function(treeUntil){
                SafejQuery.prototype[treeUntil] = function(p1,p2){
                    if(p1){
                        if(p1 instanceof SafejQuery){
                            p1 = p1.inner;
                        }
                    }
                    var newNode = this.inner[treeUntil](p1,p2),
                        newElem = newNode.get(),
                        flag = true;
                    for(var i = 0 ; i < newElem.length; i++){
                        if(!($.contains(context.mod,newElem[i]))){
                            flag = false;
                            break;
                        }
                    }
                    if(flag){
                        this.inner = newNode;
                    }
                    return this;
                };
            });





            /*
             Properties:
             exclude: context,jquery
             */
            var propertyFuncs = [
                "jquery","length"      //SafejQuery的属性
            ];

            /*
             Ajax:
             exclude: globalAjaxEventHandlers，Low-Level Interface, load
             */
            var ajaxFuncs = [
                //   "ajaxComplete","ajaxError","ajaxSend","ajaxStart","ajaxStop","ajaxSuccess",
                "serialize","serializeArray"
            ];
            /*
             //暂时先不开放
             var globalAjaxEventHandlers = ["ajaxComplete","ajaxError","ajaxSend","ajaxStart","ajaxStop","ajaxSuccess"];

             for(var i = 0; i < globalAjaxEventHandlers.length; i++){
             SafejQuery.prototype[globalAjaxEventHandlers[i]] = function(){
             this.inner[globalAjaxEventHandlers[i]](arguments[0]);
             return this;
             };
             }
             */
            SafejQuery.prototype.serialize = function(){
                return this.inner.serialize();
            };
            SafejQuery.prototype.serializeArray = function(){
                return this.inner.serializeArray();
            };


            /*
             Effects:
             exclude: fx.off,fx.interval
             */
            var effectFuncs = [
                "hide","show","toggle","animate","delay","finish","stop","fadeIn","fadeOut","fadeTo","fadeToggle",
                "slideDown","slideUp","slideToggle"
            ];

            SafejQuery.prototype.hide = function(){
                if(arguments.length == 1){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                this.inner.hide.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.show = function(){
                if(arguments.length == 1){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                this.inner.show.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.toggle = function(){
                if(arguments.length == 1 && typeof arguments[0] != 'boolean'){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                this.inner.toggle.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.animate = function(){
                arguments[0] = cajaAFTB.untame(arguments[0]);
                if(arguments[1] && typeof arguments[1] == "object"){
                    arguments[1] = cajaAFTB.untame(arguments[1]);
                }
                this.inner.animate.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.delay = function(){
                this.inner.delay.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.finish = function(){
                this.inner.finish.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.stop = function(){
                this.inner.stop.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.fadeIn = function(){
                if(arguments.length == 1 && typeof arguments[0] == 'object'){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                this.inner.fadeIn.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.fadeOut = function(){
                if(arguments.length == 1 && typeof arguments[0] == 'object'){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                this.inner.fadeOut.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.fadeTo = function(){
                this.inner.fadeTo.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.fadeToggle = function(){
                if(arguments.length == 1 && typeof arguments[0] == 'object'){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                this.inner.fadeToggle.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.slideDown = function(){
                if(arguments.length == 1 && typeof arguments[0] == 'object'){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                this.inner.slideDown.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.slideUp = function(){
                if(arguments.length == 1 && typeof arguments[0] == 'object'){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                this.inner.slideUp.apply(this.inner,arguments);
                return this;
            };
            SafejQuery.prototype.slideToggle = function(){
                if(arguments.length == 1 && typeof arguments[0] == 'object'){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                this.inner.slideToggle.apply(this.inner,arguments);
                return this;
            };

            /*
             Event
             exclude:error,resize,load,ready,unload,die,proxy,live,toggle   (重复或者不推荐使用或者已经被废弃)
             */

            /*
             新建Event事件固定为只能函数新建，不能new Event()之后再Event.prop=XXX
             param:  arguments[0]:事件名称,arguments[1]:事件属性
             */
            function SafeEvent(){
                var self = this;
                self.type = arguments[0];
                self.pro = arguments[1]?cajaAFTB.untame(arguments[1]):{};
            }
            SafeEvent.prototype.name = function(){
                return this.type;
            };
            SafeEvent.prototype.prop = function(){
                return this.pro;
            };
            frameGroup.markCtor(SafeEvent);


            function genWrapper(param) {
                function wrapper(e) {   //eventObject对象类的属性需要做tame处理
                    if (e.target) {
                        e.target = tameNode(e.target);
                    }
                    if (e.relatedTarget) {
                        e.relatedTarget = tameNode(e.relatedTarget);
                    }
                    if (e.currentTarget) {
                        e.currentTarget = tameNode(e.currentTarget);
                    }
                    if (e.delegateTarget) {
                        e.delegateTarget = tameNode(e.delegateTarget);
                    }
                    e.preventDefault = frameGroup.tame(frameGroup.markFunction(function(){
                        Object.getPrototypeOf(e).preventDefault.call(e);
                    }));
                    e.isDefaultPrevented = frameGroup.tame(frameGroup.markFunction(function(){
                        Object.getPrototypeOf(e).isDefaultPrevented.call(e);
                    }));
                    e.isImmediatePropagationStopped = frameGroup.tame(frameGroup.markFunction(function(){
                        Object.getPrototypeOf(e).isImmediatePropagationStopped.call(e);
                    }));
                    e.isPropagationStopped = frameGroup.tame(frameGroup.markFunction(function(){
                        Object.getPrototypeOf(e).isPropagationStopped.call(e);
                    }));
                    e.stopImmediatePropagation = frameGroup.tame(frameGroup.markFunction(function(){
                        Object.getPrototypeOf(e).stopImmediatePropagation.call(e);
                    }));
                    e.stopPropagation = frameGroup.tame(frameGroup.markFunction(function(){
                        Object.getPrototypeOf(e).stopPropagation.call(e);
                    }));
                    return wrapper.handle.call(this, e);
                }
                wrapper.handle = param;
                return wrapper;
            }

            var eventFuncs = [
                "scroll","bind","delegate","off","on","one","trigger","triggerHandler","unbind","undelegate",
                "blur","change","focus","focusin","select","submit","focusout","keydown","keypress","keyup","click",
                "dblclick","hover","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"
            ];
            SafejQuery.prototype.bind = function(){
                if(arguments.length == 1){
                    this.inner.bind(cajaAFTB.untame(arguments[0]));
                }else{
                    if(arguments.length == 2){
                        if(typeof arguments[1] != 'boolean'){
                            arguments[1] = genWrapper(arguments[1]);
                        }
                        this.inner.bind(arguments[0],arguments[1]);
                    }else{
                        if(typeof arguments[2] != 'boolean'){
                            arguments[2] = genWrapper(arguments[2]);
                        }
                        this.inner.bind(arguments[0],cajaAFTB.untame(arguments[1]),arguments[2]);
                    }
                }
                return this;
            };
            SafejQuery.prototype.delegate = function(){
                if(arguments.length == 2){
                    this.inner.delegate(arguments[0],cajaAFTB.untame(arguments[1]));
                }else{
                    if(arguments.length == 3){
                        this.inner.delegate(arguments[0],arguments[1],genWrapper(arguments[2]));
                    }else{
                        this.inner.delegate(arguments[0],arguments[1],cajaAFTB.untame(arguments[2]),genWrapper(arguments[3]));
                    }
                }
                return this;
            };
            SafejQuery.prototype.off = function(){
                switch (arguments.length){
                    case(0):
                        this.inner.off();
                        break;
                    case(1):
                        this.inner.off(cajaAFTB.untame(arguments[0]));
                        break;
                    case(2):
                        if(typeof arguments[1] != 'string'){
                            arguments[1] = genWrapper(arguments[1]);
                        }
                        this.inner.off(cajaAFTB.untame(arguments[0],arguments[1])) ;
                        break;
                    case(3):
                        this.inner.off(arguments[0],arguments[1],genWrapper(arguments[2]));
                        break;
                }
                return this;
            };
            SafejQuery.prototype.on = function(){
                if(typeof arguments[0] != 'string'){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                switch(arguments.length){
                    case(1):
                        this.inner.on(arguments[0]);
                        break;
                    case(2):
                        if(typeof arguments[1] == 'object'){
                            arguments[1] = cajaAFTB.untame(arguments[1]);
                        }else if(typeof arguments[1] == 'function'){
                            arguments[1] = genWrapper(arguments[1]);
                        }
                        this.inner.on(arguments[0],arguments[1]);
                        break;
                    case(3):
                        if(typeof  arguments[1] == 'object'){
                            arguments[1] = cajaAFTB.untame(arguments[1]);
                        }
                        if(typeof arguments[2] == 'object'){
                            arguments[2] = cajaAFTB.untame(arguments[1]);
                        }else if(typeof arguments[2] == 'function'){
                            arguments[2] = genWrapper(arguments[2]);
                        }
                        this.inner.on(arguments[0],arguments[1],arguments[2]);
                        break;
                    case(4):
                        this.inner.on(arguments[0],arguments[1],arguments[2],genWrapper(arguments[3]));
                        break;
                }
                return this;
            };
            SafejQuery.prototype.one = function(){
                if(typeof arguments[0] != 'string'){
                    arguments[0] = cajaAFTB.untame(arguments[0]);
                }
                switch(arguments.length){
                    case(1):
                        this.inner.one(arguments[0]);
                        break;
                    case(2):
                        if(typeof arguments[1] == 'object'){
                            arguments[1] = cajaAFTB.untame(arguments[1]);
                        }else if(typeof arguments[1] == 'function'){
                            arguments[1] = genWrapper(arguments[1]);
                        }
                        this.inner.one(arguments[0],arguments[1]);
                        break;
                    case(3):
                        if(typeof  arguments[1] == 'object'){
                            arguments[1] = cajaAFTB.untame(arguments[1]);
                        }
                        if(typeof arguments[2] == 'object'){
                            arguments[2] = cajaAFTB.untame(arguments[1]);
                        }else if(typeof arguments[2] == 'function'){
                            arguments[2] = genWrapper(arguments[2]);
                        }
                        this.inner.one(arguments[0],arguments[1],arguments[2]);
                        break;
                    case(4):
                        this.inner.one(arguments[0],arguments[1],arguments[2],genWrapper(arguments[3]));
                        break;
                }
                return this;
            };
            SafejQuery.prototype.trigger = function(){
                if(arguments[0].name){
                    arguments[0] = $.Event(arguments[0].name(),arguments[0].prop());
                }
                if(arguments.length == 0){
                    this.inner.trigger(arguments[0]);
                }else{
                    this.inner.trigger(arguments[0],cajaAFTB.untame(arguments[1]));
                }
                return this;
            };
            SafejQuery.prototype.triggerHandler = function(){
                if(!arguments[1]){
                    arguments[1] = [];
                }
                this.inner.triggerHandler(arguments[0],arguments[1]);
                return this;
            };
            //unbind 不支持参数二为函数
            SafejQuery.prototype.unbind = function(){
                if(arguments.length ==0){
                    this.inner.unbind();
                }else{
                    if(arguments.length == 1){
                        if(typeof arguments[0] != "string"){
                            arguments[0] = cajaAFTB.untame(arguments[0]);
                        }
                        this.inner.unbind(arguments[0]);
                    }else{
                        this.inner.unbind(arguments[0],arguments[1]);
                    }
                }
                return this;
            };
            //undelegate 不支持参数3为函数
            SafejQuery.prototype.undelegate = function(){
                if(arguments.length == 0){
                    this.inner.undelegate();
                }else{
                    if(arguments.length == 1){
                        this.inner.undelegate(arguments[0]);
                    }else{
                        if(!arguments[2]){
                            if(typeof arguments[1] != "string"){
                                arguments[1] = cajaAFTB.untame(arguments[1]);
                            }
                            this.inner.undelegate(arguments[0],arguments[1]);
                        }
                    }
                }
                return this;
            };
            //focus focusin 只能注册一个事件？
            SafejQuery.prototype.focusin = function () {
                if (arguments.length == 1) {
                    this.inner.focusin(genWrapper(arguments[0]));
                } else {
                    this.inner.focusin(cajaAFTB.untame(arguments[0]), genWrapper(arguments[1]));
                }
                return this;
            };
            SafejQuery.prototype.focusout = function () {
                if (arguments.length == 1) {
                    this.inner.focusout(genWrapper(arguments[0]));
                } else {
                    this.inner.focusout(cajaAFTB.untame(arguments[0]), genWrapper(arguments[1]));
                }
                return this;
            };
            //hover 事件只能注册一个？
            SafejQuery.prototype.hover = function(){
                if(arguments.length == 1){
                    this.inner.hover(genWrapper(arguments[0]));
                }else{
                    this.inner.hover(genWrapper(arguments[0]),genWrapper(arguments[1]));
                }
                return this;
            };


            var pros = [
                "scroll","blur","change","focus","select","submit","keydown","keypress","keyup","click","dblclick",
                "mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"
            ];
            S.each(pros,function(tmp){
                SafejQuery.prototype[tmp] = function(){
                    if(arguments.length == 0){
                        this.inner[tmp]();
                    }else{
                        if(arguments.length == 1){
                            this.inner[tmp](genWrapper(arguments[0]));
                        }else{
                            this.inner[tmp](cajaAFTB.untame(arguments[0]),genWrapper(arguments[1]));
                        }
                    }
                    return this;
                };
            });

            /*
             Data:
             include: data,removeData,hasData
             exclude:   (重复或者不推荐使用或者已经被废弃)
             */
            var dataFuncs = ["data",'removeData'];
            SafejQuery.prototype.data = function () {
                if(arguments.length == 0){
                    return this.inner.data();
                }else{
                    if(arguments.length == 1){
                        if(typeof arguments[0] == 'string'){
                            return this.inner.data(arguments[0]);
                        }else{
                            this.inner.data(cajaAFTB.untame(arguments[0]));
                        }
                    }else{
                        this.inner.data(arguments[0],cajaAFTB.untame(arguments[1]));
                    }
                }
                return this;
            };
            SafejQuery.prototype.removeData = function(param){
                this.inner.removeData(param);
                return this;
            };

            /*
             Attribute:
             include: attr,html,removeAttr,val
             exclude:
             */
            var attrFuncs = ["attr","html","prop","removeAttr","removeProp","val"];
            SafejQuery.prototype.attr = function (name,value) {
                if (S.startsWith(name, 'data-')) {
                    if (undefined === value) {
                        return this.inner.attr(name);
                    } else {
                        this.inner.attr(name, value);
                        return this;
                    }
                } else {
                    S.log('data-开头的伪属性才被支持!')
                }
            };
            SafejQuery.prototype.html = function () {
                if(arguments.length == 0){
                    return this.inner.html();
                }else{
                    if(typeof arguments[0] == "string"){
                        this.inner.html(cajaAFTB.sanitizeHtml(arguments[0]));
                    }
                    if(typeof arguments[0] == "function"){
                        var tmp = arguments[0];
                        arguments[0] = function(){
                            return cajaAFTB.sanitizeHtml(tmp.apply(this,arguments));
                        };
                        this.inner.html(arguments[0]);
                    }
                    return this;
                }
            };
        /*    SafejQuery.prototype.prop = function () {
                if(arguments.length == 1){
                    if(typeof arguments[0] == 'string'){
                        return this.inner.prop(arguments[0]);
                    }
                    this.inner.prop(cajaAFTB.untame(arguments[0]));
                }else{
                    this.inner.prop(arguments[0],arguments[1]);
                }
                return this;
            };       */
            SafejQuery.prototype.removeAttr = function(name){
                if (S.startsWith(name, 'data-')) {
                    this.inner.removeAttr(name);
                    return this;
                } else {
                    S.log('data-开头的伪属性才被支持!')
                }
            };
           /* SafejQuery.prototype.removeProp = function(){
                this.inner.removeProp(arguments[0]);
                return this;
            };    */
            SafejQuery.prototype.val = function(){
                if(arguments.length == 0){
                    return this.inner.val();
                }else{
                    if(typeof arguments[0] == "string"){
                        this.inner.val(cajaAFTB.sanitizeHtml(arguments[0]));
                    }else{
                        var tmp = arguments[0];
                        arguments[0] = function(){
                            return cajaAFTB.sanitizeHtml(tmp.apply(this,arguments));
                        };
                        this.inner.val(arguments[0]);
                    }
                    return this;
                }
            };

            /*
             Utilities:
             include: clearQueue,dequeue,queue,each,grep
             exclude: boxModel,brower,contains,data,dequeue,extend(no use),globalEval,parseHTML,parseXML   (重复或者不推荐使用或者已经被废弃)
             */
            var utilFuncs = ["clearQueue","dequeue","queue"];
            SafejQuery.prototype.clearQueue = function () {
                if(arguments.length == 0){
                    this.inner.clearQueue();
                }else{
                    this.inner.clearQueue(arguments[0]);
                }
                return this;
            };
            SafejQuery.prototype.dequeue = function () {
                if(arguments.length == 0){
                    this.inner.dequeue();
                }else{
                    this.inner.dequeue(arguments[0]);
                }
                return this;
            };
            SafejQuery.prototype.queue = function () {
                if(arguments.length == 0){
                    this.inner.queue();
                }else{
                    if(arguments.length == 1){
                        this.inner.queue(arguments[0]);
                    }else{
                        this.inner.queue(arguments[0],arguments[1]);
                    }
                }
                return this;
            };

            /*
             CSS :
             include: addClass,css,hasClass,height,innerHeight,innerWidth,offset,outerHeight,outerWidth,
             position,removeClass,scrollLeft,scrollTop,toggleClass,width
             exclude: cssHooks
             */

            var cssFuncs = ["addClass","css","hasClass","height","innerHeight","innerWidth","offset","outerHeight","outerWidth",
                "position","removeClass","scrollLeft","scrollTop","toggleClass","width"];

            SafejQuery.prototype.addClass = function () {
                this.inner.addClass(arguments[0]);
                return this;
            };
            SafejQuery.prototype.css = function () {
                var me  = this;
                var param = arguments;
                if(param.length == 1){
                    if(typeof param[0] == "object"&& Object.prototype.toString.call(param[0])!='[object Array]'){
                        param[0] = cajaAFTB.untame(param[0]);
                        S.each(param[0],function(value,key){
                            var result = cajaAFTB.checkCss(me.inner.get(),key,value);
                            if(true !== result){
                                S.log('bad css :'+result);
                                return;
                            }
                        });
                    }else{
                        return this.inner.css(param[0]);
                    }
                    this.inner.css(param[0]);
                }else{
                    if(typeof param[1] == 'function'){
                        var tmp = param[1];
                        param[1] = function(){
                            var result = tmp.apply(this,arguments);
                            if(cajaAFTB.checkCss(me.inner.get(),param[0],result)){
                                 return result;
                            }else{
                                S.log('bad css :'+result);
                            }
                        };
                        this.inner.css(param[0],param[1]);
                    }else{
                        var result = cajaAFTB.checkCss(this.inner.get(),param[0],param[1]);
                        if(true === result){
                            this.inner.css(param[0],param[1]);
                        }else{
                            S.log('bad css :'+result);
                        }
                    }
                }
                return this;
            };
            SafejQuery.prototype.hasClass = function () {
                return this.inner.hasClass(arguments[0]);
            };
            SafejQuery.prototype.height = function () {
                if(arguments.length == 0){
                    return this.inner.height();
                }else{
                    this.inner.height(arguments[0]);
                    return this;
                }
            };
            SafejQuery.prototype.innerHeight = function () {
                return this.inner.innerHeight();
            };
            SafejQuery.prototype.innerWidth = function () {
                return this.inner.innerWidth();
            };
            SafejQuery.prototype.offset = function () {
                if(arguments.length == 0){
                    var curoffset = this.inner.offset();
                    return new SafeCoordinates(curoffset.left,curoffset.top);
                }else{
                    this.inner.offset(cajaAFTB.untame(arguments[0]));
                    return this;
                }
            };

            //offset Coordinates
            function SafeCoordinates() {
                var self = this;
                self.le = arguments[0];
                self.tp = arguments[1];
                this.left = function () {
                    return self.le;
                };
                this.top = function () {
                    return self.tp;
                }
            }

            var funs = ('left,top').split(',');
            frameGroup.markCtor(SafeCoordinates);

            S.each(funs, function (fn) {
                frameGroup.grantMethod(SafeCoordinates, fn);
            });

            SafejQuery.prototype.outerHeight = function () {
                if(arguments.length == 0){
                    arguments[0] = false;
                }
                return this.inner.outerHeight(arguments[0]);
            };
            SafejQuery.prototype.outerWidth = function () {
                if(arguments.length == 0){
                    arguments[0] = false;
                }
                return this.inner.outerWidth(arguments[0]);
            };
            SafejQuery.prototype.position = function () {
                var curposition = this.inner.position();
                return new SafeCoordinates(curposition.left,curposition.top);
            };
            SafejQuery.prototype.removeClass = function () {
                this.inner.removeClass(arguments[0]);
                return this;
            };
            SafejQuery.prototype.scrollLeft = function () {
                if(arguments.length == 0){
                    return this.inner.scrollLeft();
                }
                this.inner.scrollLeft(arguments[0]);
                return this;
            };
            SafejQuery.prototype.scrollTop = function () {
                if(arguments.length == 0){
                    return this.inner.scrollTop();
                }
                this.inner.scrollTop(arguments[0]);
                return this;
            };
            SafejQuery.prototype.toggleClass = function () {
                if(arguments.length == 0) {
                    this.inner.toggleClass();
                }else{
                    if(arguments.length == 1){
                        this.inner.toggleClass(arguments[0]);
                    }else{
                        this.inner.toggleClass(arguments[0],arguments[1]);
                    }
                }
                return this;
            };
            SafejQuery.prototype.width = function () {
                if(arguments.length == 0) {
                    return this.inner.width();
                }else{
                    this.inner.width(arguments[0]);
                    return this;
                }
            };

            //---- 组件是一个构造函数进行初始化的，需要markCtor标记一下，让caja容器认识
            frameGroup.markCtor(SafejQuery);

            //构造函数实例的方法，需要grantMethod ，加入白名单，没有加入白名单的不可以使用，caja容器不认识
            frameGroup.grantMethod(SafejQuery, "length");
            S.each(cssFuncs, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });
            S.each(utilFuncs, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });
            S.each(attrFuncs, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });
            S.each(dataFuncs, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });
            S.each(eventFuncs, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });
            S.each(effectFuncs, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });
            S.each(ajaxFuncs, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });
            S.each(propertyFuncs, function(elem){
                frameGroup.grantRead(SafejQuery.prototype, elem);
            });
            S.each(traversFuncs, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });
            S.each(ManipulationFuncs, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });
            S.each(Miscelluneous, function (func) {
                frameGroup.grantMethod(SafejQuery, func);
            });


            tameNode = function(n){
               return context.frame.imports.tameNode___(n, true);
            };

            var ajax = function(){
                var url,untamedcfg;
                if(typeof arguments[0] == 'string'){
                    url = arguments[0];
                    untamedcfg = cajaAFTB.untame(arguments[1]);
                } else{
                    untamedcfg = cajaAFTB.untame(arguments[0]);
                    url = untamedcfg.url;
                }
                untamedcfg.data = cajaAFTB.untame(untamedcfg.data);

                if(url.charAt(0)!=="/" && url.indexOf('./') !== 0){
                    url = cajaAFTB.rewriteURL(url, null, null, {XML_ATTR: "href"});
                }
                //这里处理下，目前只支持json或者jsonp的形式
                if (!('json' === untamedcfg.dataType || 'jsonp' === untamedcfg.dataType)) {
                    untamedcfg.dataType = "jsonp";
                }

                if (url) {
                    return $.ajax(url,untamedcfg);
                } else {
                    return function () {
                        S.log('url 不在白名单中.')
                    };
                }
            };

            //最终需要返回给
            return {
                jQuery: frameGroup.tame(frameGroup.markFunction(function () {
                    return new SafejQuery(arguments[0]);
                })),
                /*
                 没法以function object的方式保持jQuery的原来的用法，tame只能处理简单的object，markFunction只能处理function。
                 尝试过的方式：var a= frameGroup.markFunction(function(){});a.b = frameGroup.markFunction(function(){});return{jQ:frameGroup.tame(a)},失败
                 其他尝试都不奏效，所以采用新建对象代表jQuery.XXX
                 */
                $hasData: frameGroup.tame(frameGroup.markFunction(function(param){
                    return $.hasData(param.inner);
                })),
                $Event: frameGroup.tame(frameGroup.markFunction(function(){
                    return new SafeEvent(arguments[0],arguments[1]);
                })),
                $each: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.each(cajaAFTB.untame(arguments[0]),arguments[1]);
                })),
                $grep: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.grep(arguments[0],arguments[1],arguments[2]);
                })),
                $inArray: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.inArray(arguments[0],arguments[1],arguments[2]);
                })),
                $isArray: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.isArray(cajaAFTB.untame(arguments[0]));
                })),
                $isEmptyObject: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.isEmptyObject(cajaAFTB.untame(arguments[0]));
                })),
                $isFunction: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.isFunction(cajaAFTB.untame(arguments[0]));
                })),
                $isNumeric: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.isNumeric(cajaAFTB.untame(arguments[0]));
                })),
                $isPlainObject: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.isPlainObject(cajaAFTB.untame(arguments[0]));
                })),
                $makeArray: frameGroup.tame(frameGroup.markFunction(function(){
                    if(arguments[0] instanceof SafejQuery){
                        S.log(" jQuery object is not support! ");
                        return;
                    }
                    return $.makeArray(cajaAFTB.untame(arguments[0]));
                })),
                $map: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.map(cajaAFTB.untame(arguments[0]),arguments[1]);
                })),
                $merge: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.merge(arguments[0],arguments[1]);
                })),
                $noop: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.noop();
                })),
                $now: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.now();
                })),
                $parseJSON: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.parseJSON(arguments[0]);
                })),
                $support: frameGroup.tame($.support),
                $trim: frameGroup.tame(frameGroup.markFunction(function(){
                    return $.trim(arguments[0]);
                })),
                $type: frameGroup.tame(frameGroup.markFunction(function(){
                   return $.type(cajaAFTB.untame(arguments[0]));
                })),
                $param: frameGroup.tame(frameGroup.markFunction(function(){
                    if(typeof arguments[0] == "object"){
                        arguments[0] = cajaAFTB.untame(arguments[0]);
                    }
                    return $.param.apply(this,arguments);
                })),
                $ajax: frameGroup.tame(frameGroup.markFunction(ajax)) ,
                $get: frameGroup.tame(frameGroup.markFunction(function(){
                    var config =  {
                        url:arguments[0]
                    };
                    if(arguments.length == 2){
                        if(typeof arguments[1] == 'function'){
                            config.success = arguments[1]
                        }else{
                            config.data = arguments[1];
                        }
                    }else{
                        if(arguments.length == 3){
                            if(typeof arguments[1] == 'function'){
                                config.success = arguments[1];
                            }else{
                                config.data = arguments[1];
                            }

                            if(typeof arguments[2] == 'function'){
                                config.success = arguments[2] ;
                            }else{
                                config.dataType = arguments[2]
                            }
                        } else{
                            config.data = arguments[1];
                            config.success = arguments[2];
                            config.dataType = arguments[3];
                        }
                    }
                    ajax(config);
                })),
                $getJSON: frameGroup.tame(frameGroup.markFunction(function(){
                    var config = {
                        url:arguments[0],
                        dataType: 'json'
                    };
                    if(arguments.length == 2){
                        if(typeof arguments[1] == 'function'){
                            config.success = arguments[1];
                        }else{
                            config.data = arguments[1];
                        }
                    }else{
                        config.data = arguments[1];
                        config.success = arguments[2];
                    }
                    ajax(config);
                })),
                $post: frameGroup.tame(frameGroup.markFunction(function(){
                    var config =  {
                        url:arguments[0],
                        type: 'POST'
                    };
                    if(arguments.length == 2){
                        if(typeof arguments[1] == 'function'){
                            config.success = arguments[1]
                        }else{
                            config.data = arguments[1];
                        }
                    }else{
                        if(arguments.length == 3){
                            if(typeof arguments[1] == 'function'){
                                config.success = arguments[1];
                            }else{
                                config.data = arguments[1];
                            }

                            if(typeof arguments[2] == 'function'){
                                config.success = arguments[2] ;
                            }else{
                                config.dataType = arguments[2]
                            }
                        } else{
                            config.data = arguments[1];
                            config.success = arguments[2];
                            config.dataType = arguments[3];
                        }
                    }
                    ajax(config);
                }))
            }
        }

    }

    return init;

});