(function(){"use strict";function e(){this.version="1.0.0";this.modules=[];if(typeof p5=="undefined"){typeof console=="object"&&console.error("soxfilm error: sorry, film.js is required, you must load it before this script.");return false}this.play=function(i,n,f){var e=this;var o={};var s=function(s){if(typeof i=="string"){o.eid=i}else{o=i}var t=document.getElementById(o.eid);if(!o.width){o.width=t.offsetWidth}if(!o.height){o.height=t.offsetHeight}o.fps=o.fps||24;if(o.pre){s.preload=function(){o.pre(s,o)}}s.setup=function(){var e=s.createCanvas(o.width,o.height);e.canvas.id=o.eid+"-canvas";e.canvas.style.display="block";s.frameRate(o.fps);if(o.set){o.set(s,o)}if(o.css){for(var i in o.css){e.canvas.style[i]=o.css[i]}}t.appendChild(e.canvas)};s.draw=function(){n(s,o)};if(f){for(var e in f){s[e]=function(){f[e](s,o)}}}};return new p5(s)}}if(typeof soxui!="undefined"){soxui.film=new e}else{window.soxfilm=new e}})();