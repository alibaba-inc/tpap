/*! caja-kissy 2013-08-28 */
KISSY.add("openjs/gallery/kcharts/1.1/index",function(t,n,e,r){function i(i){function o(t){this.inner=new n(t)}function a(t){this.inner=new e(t)}function u(t){this.inner=new r(t)}return o.prototype.render=function(){this.inner.render()},o.prototype.showLine=function(){this.inner.showLine()},o.prototype.hideLine=function(){this.inner.hideLine()},o.prototype.clear=function(){this.inner.clear()},o.prototype.on=function(t,n){this.inner.on(t,i.markFunction(function(){n.call()}))},i.markCtor(o),i.grantMethod(o,"render"),i.grantMethod(o,"showLine"),i.grantMethod(o,"hideLine"),i.grantMethod(o,"clear"),i.grantMethod(o,"on"),a.prototype.render=function(){this.inner.render()},a.prototype.clear=function(){this.inner.clear()},a.prototype.on=function(t,n){this.inner.on(t,i.markFunction(function(){n.call()}))},i.markCtor(a),i.grantMethod(a,"render"),i.grantMethod(a,"clear"),i.grantMethod(a,"on"),u.prototype.render=function(){this.inner.render()},u.prototype.clear=function(){this.inner.clear()},u.prototype.on=function(t,n){this.inner.on(t,i.markFunction(function(){n.call()}))},i.markCtor(u),i.grantMethod(u,"render"),i.grantMethod(u,"clear"),i.grantMethod(u,"on"),function(n){return{KCharts:{LineChart:i.markFunction(function(){var e=t.makeArray(arguments),r=cajaAFTB.untame(e[0]);return r.renderTo=t.DOM.get(r.renderTo,n.mod),new o(r)}),BarChart:i.markFunction(function(){var e=t.makeArray(arguments),r=cajaAFTB.untame(e[0]);return r.renderTo=t.DOM.get(r.renderTo,n.mod),new a(r)}),PieChart:i.markFunction(function(){var e=t.makeArray(arguments),r=cajaAFTB.untame(e[0]);return r.renderTo=t.DOM.get(r.renderTo,n.mod),new u(r)})}}}}return t.DOM,t.Event,i},{requires:["gallery/kcharts/1.1/linechart/index","gallery/kcharts/1.1/barchart/index","gallery/kcharts/1.1/piechart/index"]});