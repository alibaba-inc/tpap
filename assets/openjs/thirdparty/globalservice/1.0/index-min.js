/*! caja-kissy 2013-08-27 */
KISSY.add("openjs/thirdparty/globalservice/1.0/index",function(t){function n(n){var r={};return r.addListener=function(t,n){r.addListener.Fncs[t]||(r.addListener.Fncs[t]=[]),r.addListener.Fncs[t].push(n)},r.addListener.Fncs=[],function(){o.on(window,"scroll",function(){var e={scrollTop:t.DOM.scrollTop(window)};n.markReadOnlyRecord(e);var o=n.tame(e);if(r.addListener.Fncs.windowScroll)for(var a=0;r.addListener.Fncs.windowScroll.length>a;a++)r.addListener.Fncs.windowScroll[a](o)})}(),function(){function t(t,n){var o=e.create("<iframe id=''"+a+"' name='"+a+"'></iframe>");e.css(o,"display","none");var r=e.create('<form action="'+t+'" target="'+a+'" method="post"  enctype="multipart/form-data"></form>');e.css(o,"display","none");var i=e.create('<input type="hidden" name="token" value="'+n+'"/>');return r.appendChild(i),{form:r,iframe:o}}var a="tempCajaIframe";o.delegate(document,"change","input.J_TCajaUploadImg",function(a){var i=a.target,c=t(e.attr(i,"data-url"),1);e.append(i,c.form),document.body.appendChild(c.iframe),document.body.appendChild(c.form),c.form.submit();var u=function(t){if(r.addListener.Fncs.cajaupload)for(var n=0;r.addListener.Fncs.cajaupload.length>n;n++)r.addListener.Fncs.cajaupload[n](t)};o.on(window,"cajaupload",function(t){t={content:t.content},n.markReadOnlyRecord(t);var r=n.tame(t);u(r),o.remove(window,"cajaupload"),e.remove(c.iframe),e.remove(c.form)})})}(),function(){return r=n.markReadOnlyRecord(r),n.markFunction(r.addListener),{GS:n.tame(r),kissy:!1}}}var e=t.DOM,o=t.Event;return n});