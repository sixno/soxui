(function(){"use strict";function N(){this.version="1.0.0";this.modules=["tpl","pop","colorpicker"];if(typeof soxui!="undefined"&&soxui.$){var f=soxui.$}else{if(typeof jQuery=="undefined"){typeof console=="object"&&console.error("soxpop error: sorry, jQuery is required, you must load it before this script.");return false}if(typeof soxui=="undefined")window["soxui"]={};for(var t in this.modules){if(typeof window["sox"+this.modules[t]]=="undefined"){typeof console=="object"&&console.error("soxpop error: sorry, sox"+this.modules[t]+" is required, you must load it before this script.");return false}window["soxui"][this.modules[t]]=window["sox"+this.modules[t]]}}var e="";var s="";var o="";var r={};var n=this.version;e=document.currentScript?document.currentScript.src:function(){if(soxui.base){return soxui.base+"modules/editor.js"}else{for(var t=document.scripts.length-1;t>0;t--){if(document.scripts[t].src.indexOf("/soxui/modules/editor.js")>0)return document.scripts[t].src}}}();s=e.substring(0,e.lastIndexOf("/")-7)+"images/face/";o=e.substring(0,e.lastIndexOf("/")-7)+"templates/editor/";var a=function(e,i){f.ajax({async:true,type:"GET",url:o+e+".html?v="+n+"."+(new Date).getTime(),success:function(t){r[e]=soxui.tpl.create(t);if(typeof i=="function")i()},error:function(){typeof console=="object"&&console.error("soxeditor error: can`t find the template.")},dataType:"html"})};var c={ie:function(){var t=navigator.userAgent.toLowerCase();return!!window.ActiveXObject||"ActiveXObject"in window?(t.match(/msie\s(\d+)/)||[])[1]||"11":false}()},i="editor",d="soxui-this",u="soxui-show",p="soxui-disabled";this.index=0;this.config={tool:["strong","italic","underline","del","hr","fontFomat","fontSize","|","left","center","right","|","link","unlink","face","image","file","table","|","colorpicker","fontBackColor","|","help"],hideTool:[],height:280};this.set=function(t){var e=this;f.extend(true,e.config,t);return e};var x;this.build=function(t,e){e=e||{};var n=this,i=n.config,o="soxui-editor",d=f(typeof t=="string"?"#"+t:t),s="soxui_editor_"+ ++n.index,r=d.next("."+o),a=f.extend({},i,e),l=function(){var i=[],o={};f.each(a.hideTool,function(t,e){o[e]=true});f.each(a.tool,function(t,e){if(E(e,n.index)&&!o[e]){i.push(E(e,n.index))}});return i.join("")}();x=f(['<div class="'+o+'">','<div class="soxui-unselect soxui-editor-tool">'+l+"</div>",'<div class="soxui-editor-iframe">','<iframe id="'+s+'" name="'+s+'" textarea="'+t+'" frameborder="0"></iframe>',"</div>","</div>"].join(""));if(c.ie&&c.ie<8){return d.removeClass("soxui-hide").addClass(u)}r[0]&&r.remove();h.call(n,x,d[0],a);d.addClass("soxui-hide").after(x);soxui.colorpicker.render({elem:"#soxui-editor-font-color-"+n.index,predefine:true,colors:["#cc0000","#999999","#ff8c00","#ffb800","#ff7800","#1e90ff","#009688","#5fb878","#ffffff","#000000"],size:"ed",color:"#000",done:function(t){var e=m(n.index);e[0].document.execCommand("forecolor",false,t);setTimeout(function(){e[0].document.body.focus()},10)}});soxui.colorpicker.render({elem:"#soxui-editor-font-background-"+n.index,predefine:true,colors:["#cc0000","#999999","#ff8c00","#ffb800","#ff7800","#1e90ff","#009688","#5fb878","#ffffff","#000000"],size:"ed",done:function(t){var e=m(n.index);if(c.ie){e[0].document.execCommand("backColor",false,t)}else{e[0].document.execCommand("hiliteColor",false,t)}setTimeout(function(){e[0].document.body.focus()},10)}});return n.index};this.getContent=function(t){var e=m(t);if(!e[0])return;return l(e[0].document.body.innerHTML)};this.getText=function(t){var e=m(t);if(!e[0])return;return f(e[0].document.body).text()};this.setContent=function(t,e,i){var o=m(t);if(!o[0])return;if(i){f(o[0].document.body).append(e)}else{f(o[0].document.body).html(e)}N.sync(t)};this.sync=function(t){var e=m(t);if(!e[0])return;var i=f("#"+e[1].attr("textarea"));i.val(l(e[0].document.body.innerHTML))};this.getSelection=function(t){var e=m(t);if(!e[0])return;var i=b(e[0].document);return document.selection?i.text:i.toString()};var h=function(d,s,r){var a=this,l=d.find("iframe");l.css({height:r.height}).on("load",function(){var t=l.contents(),e=l.prop("contentWindow"),i=t.find("head"),o=f(["<style>","*{margin: 0; padding: 0;}","body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}","hr{border: none;border-top: #ddd solid 1px;}","h1,h2,h3,h4,h5,h6{margin-bottom: 10px;}","a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}","p{margin-bottom: 10px;}","td{border: 1px solid #DDD;min-width:80px;padding:5px;}","table{border-collapse: collapse;}","td table{width:100%;height:100%;}","img{display: inline-block; border: none; vertical-align: middle;}","pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}","</style>"].join("")),n=t.find("body");i.append(o);n.attr("contenteditable","true").css({"min-height":r.height}).html(s.value||"");v.apply(a,[e,l,s,r]);w.call(a,e,d,r)})},m=function(t){var e=f("#soxui_editor_"+t),i=e.prop("contentWindow");return[i,e]},l=function(t){if(c.ie==8){t=t.replace(/<.+>/g,function(t){return t.toLowerCase()})}return t},v=function(e,t,i,o){var d=e.document,n=f(d.body);n.on("keydown",function(t){var e=t.keyCode;if(e===13){var i=b(d),o=y(i),n=o.parentNode;switch(n.tagName.toLowerCase()){case"pre":if(t.shiftKey)return;soxui.pop.msg("请暂时用shift+enter");return false;break;case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":case"td":case"div":break;default:d.execCommand("formatBlock",false,"<p>");break}}});f(i).parents("form").on("submit",function(){var t=n.html();if(c.ie==8){t=t.replace(/<.+>/g,function(t){return t.toLowerCase()})}i.value=t});n.on("paste",function(t){d.execCommand("formatBlock",false,"<p>");setTimeout(function(){g.call(e,n);i.value=n.html()},100)})},g=function(t){var e=this,i=e.document;t.find("*[style]").each(function(){var t=this.style.textAlign;this.removeAttribute("style");f(this).css({"text-align":t||""})});t.find("script,link").remove()},b=function(t){return t.selection?t.selection.createRange():t.getSelection().getRangeAt(0)},y=function(t){return t.endContainer||t.parentElement().childNodes[0]},k=function(t,e,i){var o=this.document,n=document.createElement(t);for(var d in e){n.setAttribute(d,e[d])}n.removeAttribute("text");if(o.selection){var s=i.text||e.text;if(t==="a"&&!s)return;if(s){n.innerHTML=s}i.pasteHTML(f(n).prop("outerHTML"));i.select()}else{var s=i.toString()||e.text;if(t==="a"&&!s)return;if(s){n.innerHTML=s}i.deleteContents();i.insertNode(n)}},C=function(e,t){var i=this.document,o="editor-tool-active",n=f(y(b(i))),d=function(t){return e.find(".editor-tool-"+t)};if(t){t[t.hasClass(o)?"removeClass":"addClass"](o)}e.find(">i").removeClass(o);d("unlink").addClass(p);n.parents().each(function(){var t=this.tagName.toLowerCase(),e=this.style.textAlign;switch(t){case"b":case"strong":d("b").addClass(o);break;case"i":case"em":d("i").addClass(o);break;case"u":d("u").addClass(o);break;case"strike":d("d").addClass(o);break;case"body":case"p":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":case"div":if(e==="center"){d("center").addClass(o)}else if(e==="right"){d("right").addClass(o)}else{d("left").addClass(o)}break;case"a":d("link").addClass(o);d("unlink").removeClass(p);break}});if(d("left").length>0){d("left").removeClass(o);if(n.attr("style")=="text-align: center;"||n.attr("align")=="center"){d("center").addClass(o)}else if(n.attr("style")=="text-align: right;"||n.attr("align")=="right"){d("right").addClass(o)}else{if(!d("center").hasClass(o)&&!d("right").hasClass(o))d("left").addClass(o)}}},w=function(a,t,l){var c=a.document,u=f(c.body),d={hr:function(t){k.call(a,"hr",{},t)},table:function(d){T.call(this,{},function(t){var e="<tr>";for(var i=0;i<t.cells;i++){e+="<td></td>"}e+="</tr>";var o=e;for(var i=0;i<t.rows;i++){e+=o}var n={text:e};if(t.align=="center")n.style="margin: auto;";k.call(a,"table",n,d)})},fontFomat:function(t){var e=l.fontFomat||{code:["p","h1","h2","h3","h4","h5","h6","div"],text:["正文(p)","一级标题(h1)","二级标题(h2)","三级标题(h3)","四级标题(h4)","五级标题(h5)","六级标题(h6)","块级元素(div)"]},i={},o={};var n=e.code;var d=e.text;var s=function(){f.each(n,function(t,e){i[t]=e});return i}();var r=function(){f.each(d,function(t,e){o[t]=e});return o}();z.call(this,{fonts:s,texts:r},function(t){c.execCommand("formatBlock",false,"<"+t+">");setTimeout(function(){u.focus()},10)})},fontSize:function(e){var t=l.fontSize||{code:["font-size:10px","font-size:12px","font-size:14px","font-size:16px","font-size:18px","font-size:20px","font-size:24px","font-size:26px","font-size:28px","font-size:30px","font-size:32px"],text:["10px","12px","14px","16px","18px","20px","24px","26px","28px","30px","32px"]},i={},o={};var n=t.code;var d=t.text;var s=function(){f.each(n,function(t,e){i[t]=e});return i}();var r=function(){f.each(d,function(t,e){o[t]=e});return o}();_.call(this,{fonts:s,texts:r},function(t){k.call(a,"span",{style:t,text:"&nbsp;"},e);setTimeout(function(){u.focus()},10)})},link:function(i){var t=y(i),o=f(t).parent();A.call(u,{text:document.selection?i.text:i.toString(),href:o.attr("href")||"",target:o.attr("target")||""},function(t){var e=o[0];if(e.tagName==="A"){e.href=t.href}else{if(t.text==="")t.text=t.href;k.call(a,"a",t,i)}})},unlink:function(t){c.execCommand("unlink")},face:function(e){j.call(this,function(t){k.call(a,"img",{src:t.src,alt:t.alt},e)})},image:function(s){var t=f(f(this).find("input")[0]);t.unbind("change");t.change(function(t){if(!l.uploadImage){this.value="";soxui.pop.msg("未设置上传参数");return}if(this.files.length>0){var n=soxui.pop.load(2);var d=l.uploadImage;var e={".jpg":1,".jpeg":1,".png":1,".gif":1,".bmp":1};var i=this.value.substr(this.value.lastIndexOf(".")).toLowerCase();if(!e[i]){soxui.pop.msg("非图片文件");return}if(d.size&&this.files[0].size>d.size*1024){soxui.pop.msg("文件大小超过"+d.size+"KB");return}var o=new FormData;o.append(d.file||"file",this.files[0]);this.value="";f.ajax({url:d.url,type:"POST",data:o,cache:false,contentType:false,processData:false,success:function(t,e,i){soxui.pop.close(n);var o=d.data(t,e,i);if(o){k.call(a,"img",o,s)}else{soxui.pop.msg("图片上传失败")}},error:function(){soxui.pop.close(n);soxui.pop.msg("图片上传失败")},dataType:"json"})}else{soxui.pop.msg("未选中图片");this.value=""}})},file:function(s){var t=f(f(this).find("input")[0]);t.unbind("change");t.change(function(t){if(!l.uploadFile){this.value="";soxui.pop.msg("未设置上传参数");return}if(this.files.length>0){var n=soxui.pop.load(2);var d=l.uploadFile;if(d.size&&this.files[0].size>d.size*1024){soxui.pop.msg("文件大小超过"+d.size+"KB");return}var e=new FormData;e.append(d.file||"file",this.files[0]);this.value="";f.ajax({url:d.url,type:"POST",data:e,cache:false,contentType:false,processData:false,success:function(t,e,i){soxui.pop.close(n);var o=d.data(t,e,i);if(o){k.call(a,"a",o,s)}else{soxui.pop.msg("文件上传失败")}},error:function(){soxui.pop.close(n);soxui.pop.msg("文件上传失败")},dataType:"json"})}else{soxui.pop.msg("未选中文件");this.value=""}})},code:function(e){L.call(u,function(t){k.call(a,"pre",{text:t.code,"lay-lang":t.lang},e)})},help:function(){soxui.pop.open({type:2,title:"帮助",area:["560px","640px"],shadeClose:true,shade:.1,skin:"soxui-layer-msg",content:"https://www.soxui.com/#bW9kdWxlL2VkaXRvcnx8ZWRpdG9yLmpzb24="})}},s=t.find(".soxui-editor-tool"),i=function(){var t=f(this),e=t.attr("editor-event"),i=t.attr("editor-command");if(t.hasClass(p))return;u.focus();var o=b(c),n=o.commonAncestorContainer;if(i){switch(i){case"heading":if(t.hasClass("editor-tool-active")){c.execCommand("formatBlock",false,"<p>")}else{c.execCommand("formatBlock",false,"<"+e+">")}break;default:c.execCommand(i);break}if(/justifyLeft|justifyCenter|justifyRight/.test(i)){if(n.parentNode){c.execCommand("formatBlock",false,"<"+n.parentNode.tagName.toLowerCase()+">")}else{c.execCommand("formatBlock",false,"<p>")}}setTimeout(function(){u.focus()},10)}else{d[e]&&d[e].call(this,o)}C.call(a,s,t)},o=/image/;s.find(">i").off("mousedown").on("mousedown",function(){var t=f(this),e=t.attr("editor-event");if(o.test(e))return;i.call(this)}).off("click").on("click",function(){var t=f(this),e=t.attr("editor-event");if(!o.test(e))return;i.call(this)});u.off("click").on("click",function(){C.call(a,s);soxui.pop.close(j.index);soxui.pop.close(z.index);soxui.pop.close(_.index);soxui.pop.close(T.index)})},T=function(t,d){T.hide=T.hide||function(t){if(f(t.target).attr("editor-event")!=="table"){soxui.pop.close(T.index)}};if(!/mobile/i.test(navigator.userAgent)){return T.index=soxui.pop.tips(function(){return'<div style="padding: 5px;border: 1px solid #e6e6e6;background: #fff;color: #000;"><span id="laytable_label" class="soxui-label">0列 x 0行</span>'+'<span style="float:right;"><input type="checkbox" style="position: relative;top: 2px;">居中</span>'+'<table class="soxui-table" lay-size="sm">'+"<tbody>"+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+"</tbody>"+"</table></div>"}(),this,{tips:[3,"#fff"],time:0,skin:"soxui-box soxui-util-face",maxWidth:500,success:function(i,t){var e="";i.css({marginTop:-4,marginLeft:-10});i.find("td").on("mouseover",function(){i.find("#laytable_label")[0].innerText=this.cellIndex+1+"列 x "+(this.parentElement.rowIndex+1)+"行";i.find("td").removeAttr("style");f(this).attr("style","background-color:linen;");f(this).prevAll().attr("style","background-color:linen;");for(var t=0;t<f(this.parentElement).prevAll().length;t++){for(var e=0;e<f(this.parentElement).prevAll()[t].childNodes.length;e++){if(e<=this.cellIndex){f(this.parentElement).prevAll()[t].children[e].style="background-color:linen;"}}}});i.find("input").on("click",function(){e=e=="center"?"":"center"});i.find("td").on("click",function(){d&&d({cells:this.cellIndex+1,rows:this.parentElement.rowIndex,align:e});soxui.pop.close(t)})}})}else{return T.index=soxui.pop.open({type:1,title:false,closeBtn:0,shade:.05,shadeClose:true,content:function(){return'<div style="padding: 5px;border: 1px solid #e6e6e6;background: #fff;color: #000;"><span id="laytable_label" class="soxui-label">0列 x 0行</span>'+'<span style="float:right;"><input type="checkbox" style="position: relative;top: 2px;">居中</span>'+'<table class="soxui-table" lay-size="sm">'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+'<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+"</table></div>"}(),area:["85%"],skin:"soxui-box soxui-util-face",success:function(n,i){var o="";n.css({marginTop:-4,marginLeft:-10});n.find("td").on("touchmove",function(t){var e=getTouchElement(t);if(e!=null&&e.tagName.toUpperCase()==="TD"){n.find("#laytable_label")[0].innerText=e.cellIndex+1+"列 x "+(e.parentElement.rowIndex+1)+"行";n.find("td").removeAttr("style");f(e).attr("style","background-color:linen;");f(e).prevAll().attr("style","background-color:linen;");for(var i=0;i<f(e.parentElement).prevAll().length;i++){for(var o=0;o<f(e.parentElement).prevAll()[i].childNodes.length;o++){if(o<=e.cellIndex){f(e.parentElement).prevAll()[i].children[o].style="background-color:linen;"}}}}});n.find("input").on("touchend",function(){o=o=="center"?"":"center"});n.find("td").on("touchend",function(t){var e=getTouchElement(t);if(e!=null&&e.tagName.toUpperCase()==="TD"){d&&d({cells:e.cellIndex+1,rows:e.parentElement.rowIndex,align:o});soxui.pop.close(i)}})}})}},z=function(o,i){z.index=soxui.pop.tips(function(){var i=[];f.each(o.fonts,function(t,e){i.push('<li title="'+o.fonts[t]+'" style="float: initial;width:100%;height:auto;line-height:100%;"><'+o.fonts[t]+' style="padding:5px 0;margin:0;">'+o.texts[t]+"</"+o.fonts[t]+"></li>")});return'<ul class="soxui-clear" style="color:#000;width:256px;">'+i.join("")+"</ul>"}(),this,{tips:[3,"#fff"],time:0,skin:"soxui-box soxui-util-face",success:function(t,e){t.css({marginTop:-4,marginLeft:-10}).find(".soxui-clear>li").on("click",function(){i&&i(this.title,o.fonts);soxui.pop.close(e)})}})},_=function(o,i){_.index=soxui.pop.tips(function(){var i=[];f.each(o.fonts,function(t,e){i.push('<li title="'+o.fonts[t]+'" style="float: initial;width:100%;color:#000;height:auto;line-height:100%;padding:5px 0;'+o.fonts[t]+'">'+o.texts[t]+"</li>")});return'<ul class="soxui-clear" style="width: 128px;">'+i.join("")+"</ul>"}(),this,{tips:[3,"#fff"],time:0,skin:"soxui-box soxui-util-face",success:function(t,e){t.css({marginTop:-4,marginLeft:-10}).find(".soxui-clear>li").on("click",function(){i&&i(this.title,o.fonts);soxui.pop.close(e)})}})},A=function(t,d){var e=this;var i={type:[3,"#fff"],id:"soxui_editor_link",area:"350px",shade:.05,shadeClose:true,moveType:1,title:"超链接",skin:"soxui-layer-msg",content:"",success:function(t,n){t.find(".btn").on("click",function(){var t=f(this);if(t.attr("sox-filter")=="editor-ok"){var e=f("#"+t.attr("sox-editor")).serializeArray();var i={};for(var o in e){i[e[o].name]=e[o].value}d&&d(i)}soxui.pop.close(n)})}};if(r["editor_tool_link"]){i.content=soxui.tpl.render(r["editor_tool_link"],t);A.index=soxui.pop.open(i)}else{a("editor_tool_link",function(){i.content=soxui.tpl.render(r["editor_tool_link"],t);A.index=soxui.pop.open(i)})}},j=function(i){var t=this;var e=s;var o=["[微笑]","[嘻嘻]","[哈哈]","[可爱]","[可怜]","[挖鼻]","[吃惊]","[害羞]","[挤眼]","[闭嘴]","[鄙视]","[爱你]","[泪]","[偷笑]","[亲亲]","[生病]","[太开心]","[白眼]","[右哼哼]","[左哼哼]","[嘘]","[衰]","[委屈]","[吐]","[哈欠]","[抱抱]","[怒]","[疑问]","[馋嘴]","[拜拜]","[思考]","[汗]","[困]","[睡]","[钱]","[失望]","[酷]","[色]","[哼]","[鼓掌]","[晕]","[悲伤]","[抓狂]","[黑线]","[阴险]","[怒骂]","[互粉]","[心]","[伤心]","[猪头]","[熊猫]","[兔子]","[ok]","[耶]","[good]","[NO]","[赞]","[来]","[弱]","[草泥马]","[神马]","[囧]","[浮云]","[给力]","[围观]","[威武]","[奥特曼]","[礼物]","[钟]","[话筒]","[蜡烛]","[蛋糕]"];var n="";var d={tips:[3,"#fff"],time:0,skin:"soxui-box soxui-util-face",nomc:true,maxWidth:500,success:function(t,e){t.css({marginTop:-4,marginLeft:-10}).find(".soxui-clear>li").on("click",function(){var t=f(this).find("img");i&&i({src:t.attr("src"),alt:t.attr("alt")});soxui.pop.close(e)})}};if(r["editor_tool_face"]){n=soxui.tpl.render(r["editor_tool_face"],{path:e,alts:o});j.index=soxui.pop.tips(n,t,d)}else{a("editor_tool_face",function(){n=soxui.tpl.render(r["editor_tool_face"],{path:e,alts:o});j.index=soxui.pop.tips(n,t,d)})}},L=function(d){var t=this;var e={type:1,id:"soxui_editor_code",area:"550px",shade:.05,shadeClose:true,moveType:1,title:"插入代码",skin:"soxui-layer-msg",content:"",success:function(t,n){t.find(".btn").on("click",function(){var t=f(this);if(t.attr("sox-filter")=="editor-ok"){var e=f("#"+t.attr("sox-editor")).serializeArray();var i={};for(var o in e){i[e[o].name]=e[o].value}d&&d(i)}soxui.pop.close(n)})}};if(r["editor_tool_code"]){e.content=soxui.tpl.render(r["editor_tool_code"]);L.index=soxui.pop.open(e)}else{a("editor_tool_code",function(){e.content=soxui.tpl.render(r["editor_tool_code"]);L.index=soxui.pop.open(e)})}},E=function(t,e){var i={html:'<i class="soxui-icon editor-tool-html" title="HTML源代码" editor-command="html" editor-event="html">&#xe64b;</i>',strong:'<i class="soxui-icon editor-tool-b" title="加粗" editor-command="Bold" editor-event="b">&#xe62b;</i>',italic:'<i class="soxui-icon editor-tool-i" title="斜体" editor-command="italic" editor-event="i">&#xe644;</i>',underline:'<i class="soxui-icon editor-tool-u" title="下划线" editor-command="underline" editor-event="u">&#xe646;</i>',del:'<i class="soxui-icon editor-tool-d" title="删除线" editor-command="strikeThrough" editor-event="d">&#xe64f;</i>',hr:'<i class="soxui-icon editor-tool-hr" title="水平线" editor-event="hr"><b>Hr</b></i>',fontFomat:'<i class="soxui-icon" title="段落格式" editor-event="fontFomat" style="font-size:18px;font-weight:bold;">P</i>',fontSize:'<i class="soxui-icon" title="字体大小" editor-event="fontSize" style="font-size:18px;font-weight:bold;">A</i>',"|":'<span class="editor-tool-mid"></span>',left:'<i class="soxui-icon editor-tool-left editor-tool-active" title="左对齐" editor-command="justifyLeft" editor-event="left">&#xe649;</i>',center:'<i class="soxui-icon editor-tool-center" title="居中对齐" editor-command="justifyCenter" editor-event="center">&#xe647;</i>',right:'<i class="soxui-icon editor-tool-right" title="右对齐" editor-command="justifyRight" editor-event="right">&#xe648;</i>',link:'<i class="soxui-icon editor-tool-link" title="插入链接" editor-event="link">&#xe64c;</i>',unlink:'<i class="soxui-icon editor-tool-unlink soxui-disabled" title="清除链接" editor-command="unlink" editor-event="unlink">&#xe64d;</i>',face:'<i class="soxui-icon editor-tool-face" title="表情" editor-event="face"">&#xe650;</i>',image:'<i class="soxui-icon editor-tool-image" title="图片" editor-event="image">&#xe64a;<input type="file" name="file"></i>',file:'<i class="soxui-icon editor-tool-image" title="附件" editor-event="file">&#xe621;<input type="file" name="file"></i>',code:'<i class="soxui-icon editor-tool-code" title="插入代码" editor-event="code">&#xe64e;</i>',colorpicker:'<i class="soxui-icon" title="字体颜色选择" id="soxui-editor-font-color-'+(e||0)+'"></i>',fontBackColor:'<i class="soxui-icon" title="字体背景色选择" id="soxui-editor-font-background-'+(e||0)+'"></i>',table:'<i class="soxui-icon" title="插入表格" editor-event="table" style="font-size:24px">&#xe62d;</i>',help:'<i class="soxui-icon editor-tool-help" title="帮助" editor-event="help">&#xe607;</i>'};return i[t]?i[t]:false}}if(typeof soxui!="undefined"){soxui.editor=new N}else{window.soxeditor=new N}})();