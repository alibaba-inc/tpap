/*! caja-kissy 2013-08-28 */
KISSY.add("openjs/thirdparty/jssdk/1.0/index",function(t){function n(n){function e(){function t(n){return n=cajaAFTB.untame(n),t.handle.call(this,n)}return t}return function(){return{TOP:n.tame({api:n.markFunction(function(){var e=t.makeArray(arguments);if(e.length>3){e[2]=cajaAFTB.untame(e[2]);var r=e[3];e[3]=n.markFunction(function(t){r.call(window.TOP,t)})}else e[0]=cajaAFTB.untame(e[0]);window.TOP?window.TOP.api.apply(this,e):t.log("TOP is not included(jssdk script not loaded)")}),auth:{getLoginStatus:n.markFunction(function(){TOP.auth.getLoginStatus.apply(this,arguments)}),getSession:n.markFunction(function(){return TOP.auth.getSession()}),getUser:n.markFunction(function(){return TOP.auth.getUser()}),isAuth:n.markFunction(function(){return TOP.auth.isAuth.apply(this,arguments)}),isLogin:n.markFunction(function(){return TOP.auth.isLogin.apply(this,arguments)})},ui:n.markFunction(function(){var n=t.makeArray(arguments);if("authbtn"==n[0]){n[1]=cajaAFTB.untame(n[1]);var r=e();r.handle=n[1].callback,n[1].callback=r}return TOP.ui(n[0],n[1])})}),kissy:!1}}}return t.DOM,t.Event,n});