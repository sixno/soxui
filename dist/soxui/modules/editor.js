(function(){"use strict";function N(){this.version="1.0.0";this.modules=["tpl","pop","colorpicker"];if(typeof soxui!="undefined"&&soxui.$){var f=soxui.$}else{if(typeof jQuery=="undefined"){typeof console=="object"&&console.error("soxpop error: sorry, jQuery is required, you must load it before this script.");return false}if(typeof soxui=="undefined")window["soxui"]={};for(var t in this.modules){if(typeof window["sox"+this.modules[t]]=="undefined"){typeof console=="object"&&console.error("soxpop error: sorry, sox"+this.modules[t]+" is required, you must load it before this script.");return false}window["soxui"][this.modules[t]]=window["sox"+this.modules[t]]}}var e="";var r="";var o="";var s={};var d=this.version;e=document.currentScript?document.currentScript.src:function(){if(soxui.base){return soxui.base+"modules/editor.js"}else{for(var t=document.scripts.length-1;t>0;t--){if(document.scripts[t].src.indexOf("/soxui/modules/editor.js")>0)return document.scripts[t].src}}}();r=e.substring(0,e.lastIndexOf("/")-7)+"images/face/";o=e.substring(0,e.lastIndexOf("/")-7)+"templates/editor/";var l=function(e,i){f.ajax({async:true,type:"GET",url:o+e+".html?v="+d+"."+(new Date).getTime(),success:function(t){s[e]=soxui.tpl.create(t);if(typeof i=="function")i()},error:function(){typeof console=="object"&&console.error("soxeditor error: can`t find the template.")},dataType:"html"})};var c={ie:function(){var t=navigator.userAgent.toLowerCase();return!!window.ActiveXObject||"ActiveXObject"in window?(t.match(/msie\s(\d+)/)||[])[1]||"11":false}()},i="editor",n="soxui-this",u="soxui-show",x="soxui-disabled";this.index=0;this.config={tool:["strong","italic","underline","del","hr","fontFomat","fontSize","|","left","center","right","|","link","unlink","face","image","table","|","colorpicker","fontBackColor"],hideTool:[],height:280};this.set=function(t){var e=this;f.extend(true,e.config,t);return e};var p;this.build=function(t,e){e=e||{};var d=this,i=d.config,o="soxui-editor",n=f(typeof t=="string"?"#"+t:t),r="soxui_editor_"+ ++d.index,s=n.next("."+o),l=f.extend({},i,e),a=function(){var i=[],o={};f.each(l.hideTool,function(t,e){o[e]=true});f.each(l.tool,function(t,e){if(E(e,d.index)&&!o[e]){i.push(E(e,d.index))}});return i.join("")}();p=f(['<div class="'+o+'">','<div class="soxui-unselect soxui-editor-tool">'+a+"</div>",'<div class="soxui-editor-iframe">','<iframe id="'+r+'" name="'+r+'" textarea="'+t+'" frameborder="0"></iframe>',"</div>","</div>"].join(""));if(c.ie&&c.ie<8){return n.removeClass("soxui-hide").addClass(u)}s[0]&&s.remove();h.call(d,p,n[0],l);n.addClass("soxui-hide").after(p);soxui.colorpicker.render({elem:"#soxui-editor-font-color-"+d.index,predefine:true,colors:["#cc0000","#999999","#ff8c00","#ffb800","#ff7800","#1e90ff","#009688","#5fb878","#ffffff","#000000"],size:"ed",color:"#000",done:function(t){var e=m(d.index);e[0].document.execCommand("forecolor",false,t);setTimeout(function(){e[0].document.body.focus()},10)}});soxui.colorpicker.render({elem:"#soxui-editor-font-background-"+d.index,predefine:true,colors:["#cc0000","#999999","#ff8c00","#ffb800","#ff7800","#1e90ff","#009688","#5fb878","#ffffff","#000000"],size:"ed",done:function(t){var e=m(d.index);if(c.ie){e[0].document.execCommand("backColor",false,t)}else{e[0].document.execCommand("hiliteColor",false,t)}setTimeout(function(){e[0].document.body.focus()},10)}});return d.index};this.getContent=function(t){var e=m(t);if(!e[0])return;return a(e[0].document.body.innerHTML)};this.getText=function(t){var e=m(t);if(!e[0])return;return f(e[0].document.body).text()};this.setContent=function(t,e,i){var o=m(t);if(!o[0])return;if(i){f(o[0].document.body).append(e)}else{f(o[0].document.body).html(e)}N.sync(t)};this.sync=function(t){var e=m(t);if(!e[0])return;var i=f("#"+e[1].attr("textarea"));i.val(a(e[0].document.body.innerHTML))};this.getSelection=function(t){var e=m(t);if(!e[0])return;var i=b(e[0].document);return document.selection?i.text:i.toString()};var h=function(n,r,s){var l=this,a=n.find("iframe");a.css({height:s.height}).on("load",function(){var t=a.contents(),e=a.prop("contentWindow"),i=t.find("head"),o=f(["<style>","*{margin: 0; padding: 0;}","body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}","hr{border: none;border-top: #ddd solid 1px;}","h1,h2,h3,h4,h5,h6{margin-bottom: 10px;}","a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}","p{margin-bottom: 10px;}","td{border: 1px solid #DDD;min-width:80px;padding:5px;}","table{border-collapse: collapse;}","img{display: inline-block; border: none; vertical-align: middle;}","pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}","</style>"].join("")),d=t.find("body");i.append(o);d.attr("contenteditable","true").css({"min-height":s.height}).html(r.value||"");v.apply(l,[e,a,r,s]);w.call(l,e,n,s)})},m=function(t){var e=f("#soxui_editor_"+t),i=e.prop("contentWindow");return[i,e]},a=function(t){if(c.ie==8){t=t.replace(/<.+>/g,function(t){return t.toLowerCase()})}return t},v=function(e,t,i,o){var n=e.document,d=f(n.body);d.on("keydown",function(t){var e=t.keyCode;if(e===13){var i=b(n);var o=y(i),d=o.parentNode;if(d.tagName.toLowerCase()==="pre"){if(t.shiftKey)return;soxui.pop.msg("请暂时用shift+enter");return false}switch(d.tagName.toLowerCase()){case"h1":p.find(".soxui-editor-tool .editor-tool-h1").removeClass("editor-tool-active");break;case"h2":p.find(".soxui-editor-tool .editor-tool-h2").removeClass("editor-tool-active");break;default:n.execCommand("formatBlock",false,"<p>");break}}});f(i).parents("form").on("submit",function(){var t=d.html();if(c.ie==8){t=t.replace(/<.+>/g,function(t){return t.toLowerCase()})}i.value=t});d.on("paste",function(t){n.execCommand("formatBlock",false,"<p>");setTimeout(function(){g.call(e,d);i.value=d.html()},100)})},g=function(t){var e=this,i=e.document;t.find("*[style]").each(function(){var t=this.style.textAlign;this.removeAttribute("style");f(this).css({"text-align":t||""})});t.find("script,link").remove()},b=function(t){return t.selection?t.selection.createRange():t.getSelection().getRangeAt(0)},y=function(t){return t.endContainer||t.parentElement().childNodes[0]},k=function(t,e,i){var o=this.document,d=document.createElement(t);for(var n in e){d.setAttribute(n,e[n])}d.removeAttribute("text");if(o.selection){var r=i.text||e.text;if(t==="a"&&!r)return;if(r){d.innerHTML=r}i.pasteHTML(f(d).prop("outerHTML"));i.select()}else{var r=i.toString()||e.text;if(t==="a"&&!r)return;if(r){d.innerHTML=r}i.deleteContents();i.insertNode(d)}},C=function(e,t){var i=this.document,o="editor-tool-active",d=y(b(i)),n=function(t){return e.find(".editor-tool-"+t)};if(t){t[t.hasClass(o)?"removeClass":"addClass"](o)}e.find(">i").removeClass(o);n("unlink").addClass(x);f(d).parents().each(function(){var t=this.tagName.toLowerCase(),e=this.style.textAlign;switch(t){case"b":case"strong":n("b").addClass(o);break;case"i":case"em":n("i").addClass(o);break;case"u":n("u").addClass(o);break;case"strike":n("d").addClass(o);break;case"h1":case"h2":n(t).addClass(o);case"p":if(e==="center"){n("center").addClass(o)}else if(e==="right"){n("right").addClass(o)}else{n("left").addClass(o)}break;case"a":n("link").addClass(o);n("unlink").removeClass(x);break}})},w=function(l,t,a){var c=l.document,u=f(c.body),r={hr:function(t){k.call(l,"hr",{},t)},table:function(d){T.call(this,{},function(t){var e="<tr>";for(var i=0;i<t.cells;i++){e+="<td></td>"}e+="</tr>";var o=e;for(var i=0;i<t.rows;i++){e+=o}k.call(l,"table",{text:e},d)})},fontFomat:function(t){var e=a.fontFomat||{code:["p","h1","h2","h3","h4","h5","h6","div"],text:["正文(p)","一级标题(h1)","二级标题(h2)","三级标题(h3)","四级标题(h4)","五级标题(h5)","六级标题(h6)","块级元素(div)"]},i={},o={};var d=e.code;var n=e.text;var r=function(){f.each(d,function(t,e){i[t]=e});return i}();var s=function(){f.each(n,function(t,e){o[t]=e});return o}();_.call(this,{fonts:r,texts:s},function(t){c.execCommand("formatBlock",false,"<"+t+">");setTimeout(function(){u.focus()},10)})},fontSize:function(e){var t=a.fontSize||{code:["font-size:10px","font-size:12px","font-size:14px","font-size:16px","font-size:18px","font-size:20px","font-size:24px","font-size:26px","font-size:28px","font-size:30px","font-size:32px"],text:["10px","12px","14px","16px","18px","20px","24px","26px","28px","30px","32px"]},i={},o={};var d=t.code;var n=t.text;var r=function(){f.each(d,function(t,e){i[t]=e});return i}();var s=function(){f.each(n,function(t,e){o[t]=e});return o}();z.call(this,{fonts:r,texts:s},function(t){k.call(l,"span",{style:t,text:"&nbsp;"},e);setTimeout(function(){u.focus()},10)})},link:function(i){var t=y(i),o=f(t).parent();A.call(u,{text:document.selection?i.text:i.toString(),href:o.attr("href")||"",target:o.attr("target")||""},function(t){var e=o[0];if(e.tagName==="A"){e.href=t.href}else{if(t.text==="")t.text=t.href;k.call(l,"a",t,i)}})},unlink:function(t){c.execCommand("unlink")},face:function(e){j.call(this,function(t){k.call(l,"img",{src:t.src,alt:t.alt},e)})},image:function(r){var t=f(f(this).find("input")[0]);t.unbind("change");t.change(function(t){if(!a.uploadImage){this.value="";soxui.pop.msg("未设置上传参数");return}if(this.files.length>0){var i=soxui.pop.load(2);var o=a.uploadImage;var e={".jpg":1,".jpeg":1,".png":1,".gif":1,".bmp":1};var d=this.value.substr(this.value.lastIndexOf(".")).toLowerCase();if(!e[d]){soxui.pop.msg("非图片文件");return}if(o.size&&this.files[0].size>o.size*1024){soxui.pop.msg("文件大小超过"+o.size+"KB");return}var n=new FormData;n.append(o.file||"file",this.files[0]);this.value="";f.ajax({url:o.url,type:"POST",crossDomain:true,xhrFields:{withCredentials:true},data:n,cache:false,contentType:false,processData:false,success:function(t){soxui.pop.close(i);var e=o.data(t);if(e){k.call(l,"img",e,r)}else{soxui.pop.msg("图片上传失败")}},error:function(){soxui.pop.close(i);soxui.pop.msg("图片上传失败")},dataType:"json"})}else{soxui.pop.msg("未选中文件");this.value=""}})},code:function(e){L.call(u,function(t){k.call(l,"pre",{text:t.code,"lay-lang":t.lang},e)})},help:function(){soxui.pop.open({type:2,title:"帮助",area:["600px","380px"],shadeClose:true,shade:.1,skin:"soxui-layer-msg",content:"http://www.soxui.com/#bW9kdWxlL2VkaXRvcnx8"})}},s=t.find(".soxui-editor-tool"),i=function(){var t=f(this),e=t.attr("editor-event"),i=t.attr("lay-command");if(t.hasClass(x))return;u.focus();var o=b(c),d=o.commonAncestorContainer;if(i){switch(i){case"heading":if(t.hasClass("editor-tool-active")){c.execCommand("formatBlock",false,"<p>")}else{c.execCommand("formatBlock",false,"<"+e+">")}break;default:c.execCommand(i);break}if(/justifyLeft|justifyCenter|justifyRight/.test(i)){var n=d.parentNode.tagName.toLowerCase();switch(n){case"h1":case"h2":c.execCommand("formatBlock",false,"<"+n+">");break;default:c.execCommand("formatBlock",false,"<p>");break}}setTimeout(function(){u.focus()},10)}else{r[e]&&r[e].call(this,o)}C.call(l,s,t)},o=/image/;s.find(">i").on("mousedown",function(){var t=f(this),e=t.attr("editor-event");if(o.test(e))return;i.call(this)}).on("click",function(){var t=f(this),e=t.attr("editor-event");if(!o.test(e))return;i.call(this)});u.on("click",function(){C.call(l,s);soxui.pop.close(j.index);soxui.pop.close(_.index);soxui.pop.close(z.index);soxui.pop.close(T.index)})},T=function(t,o){T.hide=T.hide||function(t){if(f(t.target).attr("editor-event")!=="table"){soxui.pop.close(T.index)}};if(!/mobile/i.test(navigator.userAgent)){return T.index=soxui.pop.tips(function(){return'<div style="padding: 5px;border: 1px solid #e6e6e6;background: #fff;color: #000;"><span id="laytable_label" class="soxui-label">0列 x 0行</span>'+'<table class="soxui-table" lay-size="sm">'+"<tbody>"+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+"</tbody>"+"</table></div>"}(),this,{tips:[3,"#fff"],time:0,skin:"soxui-box soxui-util-face",maxWidth:500,success:function(i,t){i.css({marginTop:-4,marginLeft:-10});i.find("td").on("mouseover",function(){i.find("#laytable_label")[0].innerText=this.cellIndex+1+"列X"+(this.parentElement.rowIndex+1)+"行";i.find("td").removeAttr("style");f(this).attr("style","background-color:linen;");f(this).prevAll().attr("style","background-color:linen;");for(var t=0;t<f(this.parentElement).prevAll().length;t++){for(var e=0;e<f(this.parentElement).prevAll()[t].childNodes.length;e++){if(e<=this.cellIndex){f(this.parentElement).prevAll()[t].children[e].style="background-color:linen;"}}}});i.find("td").on("click",function(){o&&o({cells:this.cellIndex+1,rows:this.parentElement.rowIndex});soxui.pop.close(t)});f(document).off("click",T.hide).on("click",T.hide)}})}else{return T.index=soxui.pop.open({type:1,title:false,closeBtn:0,shade:.05,shadeClose:true,content:function(){return'<div style="padding: 5px;border: 1px solid #e6e6e6;background: #fff;color: #000;"><span id="laytable_label" class="soxui-label">0列 x 0行</span>'+'<table class="soxui-table" lay-size="sm">'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+"</table></div>"}(),area:["85%"],skin:"soxui-box soxui-util-face",success:function(d,i){d.css({marginTop:-4,marginLeft:-10});d.find("td").on("touchmove",function(t){var e=getTouchElement(t);if(e!=null&&e.tagName.toUpperCase()==="TD"){d.find("#laytable_label")[0].innerText=e.cellIndex+1+"列X"+(e.parentElement.rowIndex+1)+"行";d.find("td").removeAttr("style");f(e).attr("style","background-color:linen;");f(e).prevAll().attr("style","background-color:linen;");for(var i=0;i<f(e.parentElement).prevAll().length;i++){for(var o=0;o<f(e.parentElement).prevAll()[i].childNodes.length;o++){if(o<=e.cellIndex){f(e.parentElement).prevAll()[i].children[o].style="background-color:linen;"}}}}});d.find("td").on("touchend",function(t){var e=getTouchElement(t);if(e!=null&&e.tagName.toUpperCase()==="TD"){o&&o({cells:e.cellIndex+1,rows:e.parentElement.rowIndex});soxui.pop.close(i)}})}})}},_=function(o,i){_.index=soxui.pop.tips(function(){var i=[];f.each(o.fonts,function(t,e){i.push('<li title="'+o.fonts[t]+'" style="float: initial;width:100%;height:auto;line-height:100%;"><'+o.fonts[t]+' style="padding:5px 0;margin:0;">'+o.texts[t]+"</"+o.fonts[t]+"></li>")});return'<ul class="soxui-clear" style="color:#000;width:256px;">'+i.join("")+"</ul>"}(),this,{tips:[3,"#fff"],time:0,skin:"soxui-box soxui-util-face",success:function(t,e){t.css({marginTop:-4,marginLeft:-10}).find(".soxui-clear>li").on("click",function(){i&&i(this.title,o.fonts);soxui.pop.close(e)})}})},z=function(o,i){z.index=soxui.pop.tips(function(){var i=[];f.each(o.fonts,function(t,e){i.push('<li title="'+o.fonts[t]+'" style="float: initial;width:100%;color:#000;height:auto;line-height:100%;padding:5px 0;'+o.fonts[t]+'">'+o.texts[t]+"</li>")});return'<ul class="soxui-clear" style="width: 128px;">'+i.join("")+"</ul>"}(),this,{tips:[3,"#fff"],time:0,skin:"soxui-box soxui-util-face",success:function(t,e){t.css({marginTop:-4,marginLeft:-10}).find(".soxui-clear>li").on("click",function(){i&&i(this.title,o.fonts);soxui.pop.close(e)})}})},A=function(t,n){var e=this;var i={type:[3,"#fff"],id:"soxui_editor_link",area:"350px",shade:.05,shadeClose:true,moveType:1,title:"超链接",skin:"soxui-layer-msg",content:"",success:function(t,d){t.find(".btn").on("click",function(){var t=f(this);if(t.attr("sox-filter")=="editor-ok"){var e=f("#"+t.attr("sox-editor")).serializeArray();var i={};for(var o in e){i[e[o].name]=e[o].value}n&&n(i)}soxui.pop.close(d)})}};if(s["editor_tool_link"]){i.content=soxui.tpl.render(s["editor_tool_link"],t);A.index=soxui.pop.open(i)}else{l("editor_tool_link",function(){i.content=soxui.tpl.render(s["editor_tool_link"],t);A.index=soxui.pop.open(i)})}},j=function(i){var t=this;var e=r;var o=["[微笑]","[嘻嘻]","[哈哈]","[可爱]","[可怜]","[挖鼻]","[吃惊]","[害羞]","[挤眼]","[闭嘴]","[鄙视]","[爱你]","[泪]","[偷笑]","[亲亲]","[生病]","[太开心]","[白眼]","[右哼哼]","[左哼哼]","[嘘]","[衰]","[委屈]","[吐]","[哈欠]","[抱抱]","[怒]","[疑问]","[馋嘴]","[拜拜]","[思考]","[汗]","[困]","[睡]","[钱]","[失望]","[酷]","[色]","[哼]","[鼓掌]","[晕]","[悲伤]","[抓狂]","[黑线]","[阴险]","[怒骂]","[互粉]","[心]","[伤心]","[猪头]","[熊猫]","[兔子]","[ok]","[耶]","[good]","[NO]","[赞]","[来]","[弱]","[草泥马]","[神马]","[囧]","[浮云]","[给力]","[围观]","[威武]","[奥特曼]","[礼物]","[钟]","[话筒]","[蜡烛]","[蛋糕]"];var d="";var n={tips:[3,"#fff"],time:0,skin:"soxui-box soxui-util-face",nomc:true,maxWidth:500,success:function(t,e){t.css({marginTop:-4,marginLeft:-10}).find(".soxui-clear>li").on("click",function(){var t=f(this).find("img");i&&i({src:t.attr("src"),alt:t.attr("alt")});soxui.pop.close(e)})}};if(s["editor_tool_face"]){d=soxui.tpl.render(s["editor_tool_face"],{path:e,alts:o});j.index=soxui.pop.tips(d,t,n)}else{l("editor_tool_face",function(){d=soxui.tpl.render(s["editor_tool_face"],{path:e,alts:o});j.index=soxui.pop.tips(d,t,n)})}},L=function(n){var t=this;var e={type:1,id:"soxui_editor_code",area:"550px",shade:.05,shadeClose:true,moveType:1,title:"插入代码",skin:"soxui-layer-msg",content:"",success:function(t,d){t.find(".btn").on("click",function(){var t=f(this);if(t.attr("sox-filter")=="editor-ok"){var e=f("#"+t.attr("sox-editor")).serializeArray();var i={};for(var o in e){i[e[o].name]=e[o].value}n&&n(i)}soxui.pop.close(d)})}};if(s["editor_tool_code"]){e.content=soxui.tpl.render(s["editor_tool_code"]);L.index=soxui.pop.open(e)}else{l("editor_tool_code",function(){e.content=soxui.tpl.render(s["editor_tool_code"]);L.index=soxui.pop.open(e)})}},E=function(t,e){var i={html:'<i class="soxui-icon editor-tool-html" title="HTML源代码" lay-command="html" editor-event="html">&#xe64b;</i>',strong:'<i class="soxui-icon editor-tool-b" title="加粗" lay-command="Bold" editor-event="b">&#xe62b;</i>',italic:'<i class="soxui-icon editor-tool-i" title="斜体" lay-command="italic" editor-event="i">&#xe644;</i>',underline:'<i class="soxui-icon editor-tool-u" title="下划线" lay-command="underline" editor-event="u">&#xe646;</i>',del:'<i class="soxui-icon editor-tool-d" title="删除线" lay-command="strikeThrough" editor-event="d">&#xe64f;</i>',hr:'<i class="soxui-icon editor-tool-hr" title="水平线" editor-event="hr"><b>Hr</b></i>',fontFomat:'<i class="soxui-icon" title="段落格式" editor-event="fontFomat" style="font-size:18px;font-weight:bold;">P</i>',fontSize:'<i class="soxui-icon" title="字体大小" editor-event="fontSize" style="font-size:18px;font-weight:bold;">A</i>',"|":'<span class="editor-tool-mid"></span>',left:'<i class="soxui-icon editor-tool-left" title="左对齐" lay-command="justifyLeft" editor-event="left">&#xe649;</i>',center:'<i class="soxui-icon editor-tool-center" title="居中对齐" lay-command="justifyCenter" editor-event="center">&#xe647;</i>',right:'<i class="soxui-icon editor-tool-right" title="右对齐" lay-command="justifyRight" editor-event="right">&#xe648;</i>',link:'<i class="soxui-icon editor-tool-link" title="插入链接" editor-event="link">&#xe64c;</i>',unlink:'<i class="soxui-icon editor-tool-unlink soxui-disabled" title="清除链接" lay-command="unlink" editor-event="unlink">&#xe64d;</i>',face:'<i class="soxui-icon editor-tool-face" title="表情" editor-event="face"">&#xe650;</i>',image:'<i class="soxui-icon editor-tool-image" title="图片" editor-event="image">&#xe64a;<input type="file" name="file"></i>',code:'<i class="soxui-icon editor-tool-code" title="插入代码" editor-event="code">&#xe64e;</i>',colorpicker:'<i class="soxui-icon" title="字体颜色选择" id="soxui-editor-font-color-'+(e||0)+'"></i>',fontBackColor:'<i class="soxui-icon" title="字体背景色选择" id="soxui-editor-font-background-'+(e||0)+'"></i>',table:'<i class="soxui-icon" title="插入表格" editor-event="table" style="font-size:24px">&#xe62d;</i>',help:'<i class="soxui-icon editor-tool-help" title="帮助" editor-event="help">&#xe607;</i>'};return i[t]?i[t]:false}}if(typeof soxui!="undefined"){soxui.editor=new N}else{window.soxeditor=new N}})();