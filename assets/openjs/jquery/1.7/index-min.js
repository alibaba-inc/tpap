/*! caja-kissy  */
KISSY.add("openjs/jquery/1.7/index",function(){function t(t){function n(){}function o(t){this.inner=e(t)}return o.prototype.add=function(){return arguments[0],this.inner.add(arguments),this},o.prototype.addClass=function(){return this.inner.addClass(arguments[0]),this},o.prototype.removeClass=function(){return this.inner.removeClass(arguments[0]),this},o.prototype.each=function(){var e=arguments[0];return this.inner.each(t.markFunction(function(t,o){e(t,n(o))})),this},t.markCtor(o),t.grantMethod(o,"addClass"),t.grantMethod(o,"removeClass"),t.grantMethod(o,"each"),function(e){return n=function(t){return e.frame.imports.tameNode___(t,!0)},{jQuery:t.tame(t.markFunction(function(){return new o(arguments[0])}))}}}var e=window.jQuery;return t});