(function(){"use strict";function e(){this.version="1.0.0";var c="";var v={redeclare:true};c=document.currentScript?document.currentScript.src:function(){for(var e=document.scripts.length-1;e>0;e--){if(document.scripts[e].src.indexOf("/soxui/soxui.js")>0)return document.scripts[e].src}}();c=c.substring(0,c.lastIndexOf("/")+1);this.base=c;this.use=function(i,s,e){var o=this;var a=document.getElementsByTagName("head")[0];var d="var $ = soxui.$;\r\n";var u={};if(typeof window.jQuery!="undefined")this.$=window.jQuery;var f=function(n,e){var t=document.createElement("script");t.type="text/javascript";t.src=u[n].path+"?v="+o.version;if(t.addEventListener){t.addEventListener("load",function(e){r(n,t,e)},false)}else{t.attachEvent("onreadystatechange",function(e){r(n,t,e)})}a.appendChild(t)};var r=function(e,n,t){if(typeof e!="undefined"){u[e].load=true;a.removeChild(n);if(o[e].modules.length>0){for(var i in o[e].modules){if(typeof u[o[e].modules[i]]=="undefined"){d+="var "+o[e].modules[i]+" = soxui."+o[e].modules[i]+";\r\n";u[o[e].modules[i]]={path:c+"modules/"+o[e].modules[i]+".js",load:false}}else{o[e].modules[i]=""}}for(var i in o[e].modules){if(o[e].modules[i]!="")f(o[e].modules[i],c+"modules/"+o[e].modules[i]+".js")}}}for(var i in u){if(!u[i].load)return false}if(typeof s=="function"){if(v.redeclare){s=s.toString();s=s.substring(s.indexOf("{")+1,s.lastIndexOf("}"));var r=new Function(d+s);r()}else{s()}}};for(var n in i){if(i[n].indexOf(":")==-1){u[i[n]]={path:c+"modules/"+i[n]+".js",load:false}}else{u[i[n].substr(0,i[n].indexOf(":"))]={path:i[n].substr(i[n].indexOf(":")+1),load:false};i[n]=i[n].substr(0,i[n].indexOf(":"))}d+="var "+i[n]+" = soxui."+i[n]+";\r\n"}if(typeof e=="object"){for(var n in e){this[n]=e[n];d+="var "+n+" = soxui."+n+";\r\n"}}if(typeof window.jQuery!="undefined"){if(i.length>0){for(var n in u){f(n,u[n].path)}}else{r()}}else{var t=document.createElement("script");var l=function(e,n){a.removeChild(e);if(i.length>0){for(var t in u){f(t,u[t].path)}}else{r()}};t.type="text/javascript";t.src=c+"modules/jquery.js?v="+o.version;if(t.addEventListener){t.addEventListener("load",function(e){l(t,e)},false)}else{t.attachEvent("onreadystatechange",function(e){l(t,e)})}a.appendChild(t)}};this.ini=function(e){e=e||{};for(var n in e){v[n]=e[n]}};return this}window.soxui=new e})();