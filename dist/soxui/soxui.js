(function(){"use strict";function e(){var r="";var d={redeclare:true};r=document.currentScript?document.currentScript.src:function(){for(var e=document.scripts.length-1;e>0;e--){if(document.scripts[e].substr(document.scripts[e].lastIndexOf("/")+1)==="soxui.js")return document.scripts[e]}}();r=r.substring(0,r.lastIndexOf("/")+1);this.use=function(e,s,t){var a=document.getElementsByTagName("head")[0];var o="";var u={};var n=function(t,e,n){var r=document.createElement("script");r.type="text/javascript";r.src=u[f].path+"?v="+n;if(r.addEventListener){r.addEventListener("load",function(e){i(t,r,e)},false)}else{r.attachEvent("onreadystatechange",function(e){i(t,r,e)})}a.appendChild(r)};var i=function(e,t,n){if(typeof e!="undefined"){u[e].load=true;a.removeChild(t);for(var r in u){if(!u[r].load)return false}}if(typeof s=="function"){if(d.redeclare){s=s.toString();s=s.substring(s.indexOf("{")+1,s.lastIndexOf("}"));var i=new Function(o+s);i()}else{s()}}};if(typeof window.jQuery!="undefined"){this.$=window.jQuery}else{u.jquery={path:r+"modules/jquery.js",load:false}}for(var f in e){if(e[f].indexOf(":")==-1){u[e[f]]={path:r+"modules/"+e[f]+".js",load:false}}else{u[e[f].substr(0,e[f].indexOf(":"))]={path:e[f].substr(e[f].indexOf(":")+1),load:false};e[f]=e[f].substr(0,e[f].indexOf(":"))}o+="var "+e[f]+" = soxui."+e[f]+";\r\n"}if(typeof t=="object"){for(var f in t){this[f]=t[f];o+="var "+f+" = soxui."+f+";\r\n"}}for(var f in u){n(f,u[f].path,this.version)}if(typeof window.jQuery!="undefined"&&e.length==0){i()}};this.ini=function(e){e=e||{};for(var t in e){d[t]=e[t]}};this.version="1.0.0";return this}window.soxui=new e})();