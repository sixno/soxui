(function(){"use strict";function e(){this.version="1.0.0";var c="";var v={redeclare:true};c=document.currentScript?document.currentScript.src:function(){for(var e=document.scripts.length-1;e>0;e--){if(document.scripts[e].readyState==="interactive")return document.scripts[e].src}return document.scripts[0].src}();c=c.substring(0,c.lastIndexOf("/")+1);this.use=function(r,s,e){var o=this;var a=document.getElementsByTagName("head")[0];var d="var $ = soxui.$;\r\n";var u={};if(typeof window.jQuery!="undefined")this.$=window.jQuery;var f=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.src=u[t].path+"?v="+o.version;if(n.addEventListener){n.addEventListener("load",function(e){i(t,n,e)},false)}else{n.attachEvent("onreadystatechange",function(e){i(t,n,e)})}a.appendChild(n)};var i=function(e,t,n){if(typeof e!="undefined"){u[e].load=true;a.removeChild(t);if(o[e].modules.length>0){for(var r in o[e].modules){if(typeof u[o[e].modules[r]]=="undefined"){d+="var "+o[e].modules[r]+" = soxui."+o[e].modules[r]+";\r\n";u[o[e].modules[r]]={path:c+"modules/"+o[e].modules[r]+".js",load:false}}else{o[e].modules[r]=""}}for(var r in o[e].modules){if(o[e].modules[r]!="")f(o[e].modules[r],c+"modules/"+o[e].modules[r]+".js")}}}for(var r in u){if(!u[r].load)return false}if(typeof s=="function"){if(v.redeclare){s=s.toString();s=s.substring(s.indexOf("{")+1,s.lastIndexOf("}"));var i=new Function(d+s);i()}else{s()}}};for(var t in r){if(r[t].indexOf(":")==-1){u[r[t]]={path:c+"modules/"+r[t]+".js",load:false}}else{u[r[t].substr(0,r[t].indexOf(":"))]={path:r[t].substr(r[t].indexOf(":")+1),load:false};r[t]=r[t].substr(0,r[t].indexOf(":"))}d+="var "+r[t]+" = soxui."+r[t]+";\r\n"}if(typeof e=="object"){for(var t in e){this[t]=e[t];d+="var "+t+" = soxui."+t+";\r\n"}}if(typeof window.jQuery!="undefined"){if(r.length>0){for(var t in u){f(t,u[t].path)}}else{i()}}else{var n=document.createElement("script");var l=function(e,t){a.removeChild(e);if(r.length>0){for(var n in u){f(n,u[n].path)}}else{i()}};n.type="text/javascript";n.src=c+"modules/jquery.js?v="+o.version;if(n.addEventListener){n.addEventListener("load",function(e){l(n,e)},false)}else{n.attachEvent("onreadystatechange",function(e){l(n,e)})}a.appendChild(n)}};this.ini=function(e){e=e||{};for(var t in e){v[t]=e[t]}};return this}window.soxui=new e})();