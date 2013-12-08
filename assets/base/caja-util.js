/**
 * @fileOverview 提供untame和rewriteURL功能
 * @author shiba<shiba@taobao.com>
 */
;
(function (caja, KISSY) {

    /**
     * caja adapter for taobao
     * inlucding Kissy apis exposed to third-party modules
     *           rewriteURL for taobao
     * @type {Object}
     */
    var cajaAFTB = window.cajaAFTB || {}, S = KISSY;

    cajaAFTB.untame = function (obj) {
        if (S.isObject(obj) || S.isArray(obj)) {
            //untamedcfg = caja.untame(cfg);
            var untamedObj = S.isObject(obj) ? {} : [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var n = '' + p;
                    if (n == 'TAMED_TWIN___') {
                    } else {
                        untamedObj[p] = cajaAFTB.untame(obj[p]);
                    }
                }
            }
            return untamedObj;
        } else {
            return obj;
        }
    }

    /**
     * Rewrite uri according to the combination of whitelist and blacklist
     * @param {String} uri the uri to be rewritten
     * @param {Number} uriEffect the effect that allowing a URI to load
     * @param {Number} loaderType type of loader that would load the URI or the rewritten version
     * @param {Object} hints record that describes the context in which the URI appears.  If a hint is not present it should not be relied upon.
     *
     * @returns {String} rewrited uri
     */
    cajaAFTB.rewriteURL = function (uri, uriEffect, loaderType, hints) {
        /**
         * @constant whitelist and blacklist of the uri rewrite rule
         */
        var URI_RULE = window.cajaConfig && cajaConfig.uri || {
            white_list: [
                ".taobao.com"
                , ".taobao.net"
                , ".alipay.com"
                , ".alibaba.com"
                , ".alimama.com"
                , ".koubei.com"
                , ".alisoft.com"
                , ".taobaocdn.com"
                , ".taobaocdn.net"
                , ".tbcdn.cn"
                , ".tmall.com"
                , ".hitao.com"
                , "service.weibo.com/share/share.php"
                , "/test/csv/"
                , "/css/main/xxx.css"
            ], black_list: [
                "s.click.alimama.com"
                , "gouwu.alimama.com"
                , "cam.taoke.alimama.com"
                , "tms.taoke.alimama.com"
                , "search8.taobao.com"
                , "p.alimama.com"
                , "z.alimama.com"
                , "t.alimama.com"
                , "s.click.taobao.com"
                , "huoban.taobao.com"
                , "login.taobao.com"
                , "member1.taobao.com"
                , "oauth.taobao.com"
                , "container.api.taoabo.com"
                , "to.taobao.com"
            ]
        };

        if (!hints) {
            return;
        }
        uri = S.trim(uri);

        //shop img src maybe other site
        if ("src" === hints.XML_ATTR) {
            return uri;
        }

        //same to img.src
        if( undefined !== hints.CSS_PROP){
            return uri;
        }

        var protocolRex = /^http[s]?:\/\//;
        //not start with http or https protocol
        if(uri.substring(0,1) != '/'){
            if (0 === uri.length || !(protocolRex.test(uri))) {
                return;
            }
        }

        if ("href" === hints.XML_ATTR) {
            //check whether the uri is in blacklist
            for (var i = 0, l = URI_RULE.black_list.length; i < l; i++) {
                if (-1 !== uri.indexOf(URI_RULE.black_list[i])) { //in blacklist then return directly
                    return;
                }
            }


            //find the hostname
            if(uri.substring(0,1)!='/'){

                var tUri = uri.replace(protocolRex, "")+'/',
                    lastSlashPos = tUri.lastIndexOf("/"),
                    hostname = (-1 === lastSlashPos) ? tUri : tUri.substring(0, lastSlashPos),
                    _hostname=hostname.match(/(.*?[.]){2}/)[0].length,
                    _Mhostname=hostname.substring(hostname.indexOf('.'),_hostname);

                for (var i = 0, l = URI_RULE.white_list.length; i < l; i++) {
                
                    //check whether the uri is in main url
                    if (-1 !== URI_RULE.white_list[i].indexOf(_Mhostname)) { //not in main url
                    
                        //check whether the uri is in whitelist
                        for (var i = 0, l = URI_RULE.white_list.length; i < l; i++) {
                            //not in whitelist
                            if (-1 !== hostname.indexOf(URI_RULE.white_list[i])) { 
                                return uri;
                            }
                        }
                    }
                }

            }
            else{
                //check whether the uri is in whitelist
                for (var i = 0, l = URI_RULE.white_list.length; i < l; i++) {
                    //not in whitelist
                    if (-1 !== uri.indexOf(URI_RULE.white_list[i])) {
                        return uri;
                    }
                }                
            }

            return;
        }
    };

    //init in balcony.js
    cajaAFTB.tameNode = null;

    /**
     * sanitizeHtml
     * @param need santized html
     * @parem frame env
     * @return safety html
     */
    cajaAFTB.sanitizeHtml = null;

    /**
     * checkCss
     * @param HTMLElement/Selector
     * @parem stylePropertyName
     * @param styleProperty value
     * @return true/errormessage
     */
    cajaAFTB.checkCss = null;

    window.cajaAFTB = cajaAFTB;

})(caja, KISSY);