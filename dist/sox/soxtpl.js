!function(){"use strict";function a(a){var b,c;return a=a||"",b={tag_open:"{{",tag_shut:"}}"},c={exp:function(a){return new RegExp(a,"g")},query:function(a,c,d){var e=["#([\\s\\S])+?","([^{#}])*?"][a||0];return this.exp((c||"")+b.tag_open+e+b.tag_shut+(d||""))},escape:function(a){return String(a||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},error:function(a,b){var c="soxtpl Error：";return"object"==typeof console&&console.error(c+a+"\n"+(b||"")),c+a}},this.parse=function(a,d){var e=this,f=c.exp("^"+b.tag_open+"#",""),g=c.exp(b.tag_shut+"$","");a=a.replace(/\s+|\r|\t|\n/g," ").replace(c.exp(b.tag_open+"#"),b.tag_open+"# ").replace(c.exp(b.tag_shut+"}"),"} "+b.tag_shut).replace(/\\/g,"\\\\").replace(/(?="|')/g,"\\").replace(c.query(),function(a){return a=a.replace(f,"").replace(g,""),'";'+a.replace(/\\/g,"")+';view+="'}).replace(c.query(1),function(a){var d='"+(';return a.replace(/\s/g,"")===b.tag_open+b.tag_shut?"":(a=a.replace(c.exp(b.tag_open+"|"+b.tag_shut),""),/^=/.test(a)&&(a=a.replace(/^=/,""),d='"+_escape_('),d+a.replace(/\\/g,"")+')+"')}),a='"use strict";var view = "'+a+'";return view;';try{return e.cache=a=new Function("d, _escape_",a),a(d,c.escape)}catch(h){return delete e.cache,c.error(h,a)}},this.render=function(b,d){var e=this;return b||(b={}),a=e.cache?e.cache(b,c.escape):e.parse(a,b),d?(d(a),void 0):a},this.config=function(a){a=a||{};for(var c in a)b[c]=a[c]},this.version="1.0",this}"undefined"!=typeof soxui?soxui.tpl=a:window.soxtpl=a}();