/**
 
 @Name:    soxui.editor | window.soxeditor
 @Author： sixno
 @License：MIT

 */

(function() {
    "use strict";

    function editor() {
        this.version = '1.0.1';
        this.modules = ['tpl', 'pop', 'colorpicker'];

        if (typeof(soxui) != 'undefined' && soxui.$) {
            var $ = soxui.$;
        } else {
            if (typeof(jQuery) == 'undefined') {
                typeof(console) == 'object' && console.error('soxpop error: sorry, jQuery is required, you must load it before this script.');
                return false;
            }

            if (typeof(soxui) == 'undefined') window['soxui'] = {};

            for (var i in this.modules) {
                if (typeof(window['sox' + this.modules[i]]) == 'undefined') {
                    typeof(console) == 'object' && console.error('soxpop error: sorry, sox' + this.modules[i] + ' is required, you must load it before this script.');
                    return false;
                }

                window['soxui'][this.modules[i]] = window['sox'+this.modules[i]];
            }
        }

        var jspath   = '';
        var fapath   = '';
        var tlpath   = '';
        var template = {};
        var version  = this.version;

        jspath = document.currentScript ? document.currentScript.src : function() {
            if (soxui.base) {
                return soxui.base+'modules/editor.js';
            } else {
                for (var i = document.scripts.length - 1; i > 0; i--) {
                    if (document.scripts[i].src.indexOf('/soxui/modules/editor.js') > 0) return document.scripts[i].src;
                }
            }
        }();

        fapath = jspath.substring(0,jspath.lastIndexOf('/') - 7) + 'images/face/';

        tlpath = jspath.substring(0,jspath.lastIndexOf('/') - 7) + 'templates/editor/';

        var get_template = function(name, callback) {
            $.ajax({async: true, type: 'GET', url: tlpath + name + '.html?v=' + version + '.' + (new Date()).getTime(), success: function(html) {
                template[name] = soxui.tpl.create(html);

                if (typeof(callback) == 'function') callback();
            }, error: function() {
                typeof(console) == 'object' && console.error('soxeditor error: can`t find the template.');
            }, dataType: 'html'});
        }

        var device = {
            ie: (function() { // ie版本
                var agent = navigator.userAgent.toLowerCase();

                return (!!window.ActiveXObject || 'ActiveXObject' in window) ? ((agent.match(/msie\s(\d+)/) || [])[1] || '11') : false; // ie11没有msie的标识
            })(),
        }
        
        , MOD_NAME = 'editor', THIS = 'soxui-this', SHOW = 'soxui-show', ABLED = 'soxui-disabled';

        this.index = 0;
            
        // 全局配置
        this.config = {
            //默认工具bar
            tool: [
                'strong', 'italic', 'underline', 'del', 'hr', 'fontFomat', 'fontSize'
                , '|'
                , 'left', 'center', 'right'
                , '|'
                , 'link', 'unlink', 'face', 'image', 'file', 'table'
                , '|'
                , 'colorpicker', 'fontBackColor'
                , '|', 'help'
            ]
            ,hideTool: []
            ,height: 280 //默认高
        };

        
        // 全局设置
        this.set = function(options) {
            var that = this;
            $.extend(true, that.config, options);
            return that;
        };
        
        // 建立编辑器
        var ed_elem;

        this.build = function(id, settings) {
            settings = settings || {};
            
            var that = this
            , config = that.config
            , ELEM = 'soxui-editor', textArea = $(typeof(id) == 'string' ? '#' + id : id)
            , name = 'soxui_editor_' + (++that.index)
            , haveBuild = textArea.next('.'+ELEM)
            
            , set = $.extend({}, config, settings)
            
            , tool = function() {
                var node = [], hideTools = {};
                $.each(set.hideTool, function(_, item) {
                    hideTools[item] = true;
                });
                $.each(set.tool, function(_, item) {
                    if (toolShow(item,that.index) && !hideTools[item]) {
                        node.push(toolShow(item, that.index));
                    }
                });
                return node.join('');
            }();
 

            ed_elem = $(['<div class="'+ ELEM +'">'
                , '<div class="soxui-unselect soxui-editor-tool">'+ tool +'</div>'
                , '<div class="soxui-editor-iframe">'
                , '<iframe id="'+ name +'" name="'+ name +'" textarea="'+ id +'" frameborder="0"></iframe>'
                , '</div>'
                , '</div>'].join(''));
            
            // 编辑器不兼容ie8以下
            if (device.ie && device.ie < 8) {
                return textArea.removeClass('soxui-hide').addClass(SHOW);
            }

            haveBuild[0] && (haveBuild.remove());

            setIframe.call(that, ed_elem, textArea[0], set);
            textArea.addClass('soxui-hide').after(ed_elem);

            soxui.colorpicker.render({
                elem: '#soxui-editor-font-color-' + that.index  // 绑定元素
                , predefine: true
                , colors: ['#cc0000', '#999999', '#ff8c00', '#ffb800', '#ff7800', '#1e90ff', '#009688', '#5fb878', '#ffffff', '#000000']
                , size: 'ed'
                , color: '#000'
                , index: that.index
                , done: function (color) {
                    var iframeWin = getWin(this.index);
                    iframeWin[0].document.execCommand('forecolor', false, color);
                    setTimeout(function () {
                        iframeWin[0].document.body.focus();
                    }, 10);
                }
            });

            soxui.colorpicker.render({
                elem: '#soxui-editor-font-background-' + that.index  // 绑定元素
                , predefine: true
                , colors: ['#cc0000', '#999999', '#ff8c00', '#ffb800', '#ff7800', '#1e90ff', '#009688', '#5fb878', '#ffffff', '#000000']
                , size: 'ed'
                , index: that.index
                , done: function (color) {
                    var iframeWin = getWin(this.index);
                    if (device.ie) {
                        iframeWin[0].document.execCommand('backColor', false, color);
                    } else {
                        iframeWin[0].document.execCommand('hiliteColor', false, color);
                    }

                    setTimeout(function () {
                        iframeWin[0].document.body.focus();
                    }, 10);
                }
            });

            return that.index;
        };
        
        //获得编辑器中内容
        this.getContent = function(index) {
            var iframeWin = getWin(index);
            if (!iframeWin[0]) return;
            return toLower(iframeWin[0].document.body.innerHTML);
        };
        
        //获得编辑器中纯文本内容
        this.getText = function(index) {
            var iframeWin = getWin(index);
            if (!iframeWin[0]) return;
            return $(iframeWin[0].document.body).text();
        };
        /**
         * 设置编辑器内容
         * @param {[type]} index     编辑器索引
         * @param {[type]} content 要设置的内容
         * @param {[type]} flag        是否追加模式
         */
        this.setContent = function(index, content, flag) {
            var iframeWin = getWin(index);
            if (!iframeWin[0]) return;
            if (flag) {
                $(iframeWin[0].document.body).append(content)
            }else{
                $(iframeWin[0].document.body).html(content)
            };
            editor.sync(index)
        };
        //将编辑器内容同步到textarea（一般用于异步提交时）
        this.sync = function(index) {
            var iframeWin = getWin(index);
            if (!iframeWin[0]) return;
            var textarea = $('#'+iframeWin[1].attr('textarea'));
            textarea.val(toLower(iframeWin[0].document.body.innerHTML));
        };
        
        //获取编辑器选中内容
        this.getSelection = function(index) {
            var iframeWin = getWin(index);
            if (!iframeWin[0]) return;
            var range = Range(iframeWin[0].document);
            return document.selection ? range.text : range.toString();
        };

        //iframe初始化
        var setIframe = function(ed_elem, textArea, set) {
            var that = this, iframe = ed_elem.find('iframe');

            iframe.css({
                height: set.height
            }).on('load', function() {
                var conts = iframe.contents()
                ,iframeWin = iframe.prop('contentWindow')
                ,head = conts.find('head')
                ,style = $(['<style>'
                    ,'*{margin: 0; padding: 0;}'
                    ,'body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}'
                    ,'hr{border: none;border-top: #ddd solid 1px;}'
                    ,'h1,h2,h3,h4,h5,h6{margin-bottom: 10px;}'
                    ,'a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}'
                    ,'p{margin-bottom: 10px;}'
                    ,'td{border: 1px solid #DDD;min-width:80px;padding:5px;}'
                    ,'table{border-collapse: collapse;}'
                    ,'td table{width:100%;height:100%;}'
                    ,'img{display: inline-block; border: none; vertical-align: middle;}'
                    ,'pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}'
                ,'</style>'].join(''))
                ,body = conts.find('body');
                
                head.append(style);
                body.attr('contenteditable', 'true').css({
                    'min-height': set.height
                }).html(textArea.value||'');

                hotkey.apply(that, [iframeWin, iframe, textArea, set]); //快捷键处理
                toolActive.call(that, iframeWin, ed_elem, set); //触发工具

            });
        }
        
        //获得iframe窗口对象
        , getWin = function(index) {
            var iframe = $('#soxui_editor_' + index)
            , iframeWin = iframe.prop('contentWindow');

            return [iframeWin, iframe];
        }
        
        //IE8下将标签处理成小写
        , toLower = function(html) {
            if (device.ie == 8) {
                html = html.replace(/<.+>/g, function(str) {
                    return str.toLowerCase();
                });
            }
            return html;
        }
        
        //快捷键处理
        , hotkey = function(iframeWin, iframe, textArea, set) {
            var iframeDOM = iframeWin.document, body = $(iframeDOM.body);
            body.on('keydown', function(e) {
                var keycode = e.keyCode;
                //处理回车
                if (keycode === 13) {
                    var range = Range(iframeDOM)
                    , container = getContainer(range)
                    , parentNode = container.parentNode;

                    switch(parentNode.tagName.toLowerCase()) {
                        case 'pre':
                            if (e.shiftKey) return;
                            soxui.pop.msg('请暂时用shift+enter');
                            return false;
                            break;

                        case 'h1':
                            // ed_elem.find('.soxui-editor-tool .editor-tool-h1').removeClass('editor-tool-active');
                            // break;
                        case 'h2':
                            // ed_elem.find('.soxui-editor-tool .editor-tool-h2').removeClass('editor-tool-active');
                            // break;
                        case 'h3':
                        case 'h4':
                        case 'h5':
                        case 'h6':
                        case 'td':
                        case 'div':
                            // iframeDOM.execCommand('formatBlock', false);
                            break;

                        default:
                            iframeDOM.execCommand('formatBlock', false, '<p>');
                            break;
                    }
                }
            });
            
            //给textarea同步内容
            $(textArea).parents('form').on('submit', function() {
                var html = body.html();
                //IE8下将标签处理成小写
                if (device.ie == 8) {
                    html = html.replace(/<.+>/g, function(str) {
                        return str.toLowerCase();
                    });
                }
                textArea.value = html;
            });
            
            //处理粘贴
            body.on('paste', function(e) {
                iframeDOM.execCommand('formatBlock', false, '<p>');
                setTimeout(function() {
                    filter.call(iframeWin, body);
                    textArea.value = body.html();
                }, 100); 
            });
        }
        
        //标签过滤
        ,filter = function(body) {
            var iframeWin = this
            ,iframeDOM = iframeWin.document;
            
            //清除影响版面的css属性
            body.find('*[style]').each(function() {
                var textAlign = this.style.textAlign;
                this.removeAttribute('style');
                $(this).css({
                    'text-align': textAlign || ''
                })
            });
            
            //修饰表格
            // body.find('table').addClass('soxui-table');
            
            //移除不安全的标签
            body.find('script,link').remove();
        }
        
        //Range对象兼容性处理
        ,Range = function(iframeDOM) {
            return iframeDOM.selection 
                ? iframeDOM.selection.createRange()
            : iframeDOM.getSelection().getRangeAt(0);
        }
        
        //当前Range对象的endContainer兼容性处理
        ,getContainer = function(range) {
            return range.endContainer || range.parentElement().childNodes[0]
        }
        
        //在选区插入内联元素
        ,insertInline = function(tagName, attr, range) {
            var iframeDOM = this.document
            ,elem = document.createElement(tagName)
            for (var key in attr) {
                elem.setAttribute(key, attr[key]);
            }
            elem.removeAttribute('text');

            if (iframeDOM.selection) { //IE
                var text = range.text || attr.text;
                if (tagName === 'a' && !text) return;
                if (text) {
                    elem.innerHTML = text;
                }
                range.pasteHTML($(elem).prop('outerHTML')); 
                range.select();
            } else { //非IE
                var text = range.toString() || attr.text;
                if (tagName === 'a' && !text) return;
                if (text) {
                    elem.innerHTML = text;
                }
                range.deleteContents();
                range.insertNode(elem);
            }
        }
        
        //工具选中
        ,toolCheck = function(tools, othis) {
            var iframeDOM = this.document
            ,CHECK = 'editor-tool-active'
            ,container = $(getContainer(Range(iframeDOM)))
            ,item = function(type) {
                return tools.find('.editor-tool-'+type)
            }

            if (othis) {
                othis[othis.hasClass(CHECK) ? 'removeClass' : 'addClass'](CHECK);
            }
            
            tools.find('>i').removeClass(CHECK);
            item('unlink').addClass(ABLED);

            container.parents().each(function() {
                var tagName = this.tagName.toLowerCase()
                ,textAlign = this.style.textAlign;

                switch(tagName) {
                    //文字
                    case 'b':
                    case 'strong':
                        item('b').addClass(CHECK);
                        break;

                    case 'i':
                    case 'em':
                        item('i').addClass(CHECK);
                        break;

                    case 'u':
                        item('u').addClass(CHECK);
                        break;

                    case 'strike':
                        item('d').addClass(CHECK);
                        break;

                    // case 'h1':
                    // case 'h2':
                    //     item(tagName).addClass(CHECK);

                    //对齐
                    case 'body':
                    case 'p':
                    case 'h1':
                    case 'h2':
                    case 'h3':
                    case 'h4':
                    case 'h5':
                    case 'h6':
                    case 'div':
                        if (textAlign === 'center') {
                            item('center').addClass(CHECK);
                        } else if (textAlign === 'right') {
                            item('right').addClass(CHECK);
                        } else {
                            item('left').addClass(CHECK);
                        }
                        break;

                    //超链接
                    case 'a':
                        item('link').addClass(CHECK);
                        item('unlink').removeClass(ABLED);
                        break;
                }
            });

            if (item('left').length > 0) {
                item('left').removeClass(CHECK);

                if (container.attr('style') == 'text-align: center;' || container.attr('align') == 'center') {
                    item('center').addClass(CHECK);
                } else if (container.attr('style') == 'text-align: right;' || container.attr('align') == 'right') {
                    item('right').addClass(CHECK);
                } else {
                    if (!item('center').hasClass(CHECK) && !item('right').hasClass(CHECK)) item('left').addClass(CHECK);
                }
            }
        }

        // 触发工具
        , toolActive = function(iframeWin, ed_elem, set) {
            var iframeDOM = iframeWin.document
            , body = $(iframeDOM.body)
            , toolEvent = {
                // 水平线
                hr: function (range) {
                        insertInline.call(iframeWin, 'hr', {}, range);
                    }
                // 表格
                , table: function (range) {
                        table.call(this, {}, function (opts) {
                            var tbody = "<tr>";
                            for (var i = 0; i < opts.cells; i++) {
                                tbody += "<td></td>";
                            }
                            tbody += "</tr>";
                            var tmptr = tbody;
                            for (var i = 0; i < opts.rows; i++) {
                                tbody += tmptr;
                            }
                            var table = {text: tbody};
                            if (opts.align == 'center') table.style = 'margin: auto;';
                            insertInline.call(iframeWin, 'table', table, range);
                        });
                    }
                // 段落格式
                , fontFomat: function (range) {
                        var alt = set.fontFomat || {
                            code: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "div"],
                            text: ["正文(p)", "一级标题(h1)", "二级标题(h2)", "三级标题(h3)", "四级标题(h4)", "五级标题(h5)", "六级标题(h6)", "块级元素(div)"]
                        }, arr = {}, arr2 = {};
                        var codes = alt.code;
                        var texts = alt.text;
                        var fonts = function () {
                            $.each(codes, function (index, item) {
                                arr[index] = item;
                            });
                            return arr;
                        }();
                        var fonttexts = function () {
                            $.each(texts, function (index, item) {
                                arr2[index] = item;
                            });
                            return arr2;
                        }();
                        fontFomat.call(this, { fonts: fonts, texts: fonttexts }, function (value) {
                            iframeDOM.execCommand('formatBlock', false, "<" + value + ">");
                            setTimeout(function () {
                                body.focus();
                            }, 10);
                        });
                    }
                // 字体大小
                , fontSize: function (range) {
                        var alt = set.fontSize || {
                            code: ["font-size:10px", "font-size:12px", "font-size:14px", "font-size:16px", "font-size:18px", "font-size:20px", "font-size:24px", "font-size:26px", "font-size:28px", "font-size:30px", "font-size:32px"],
                            text: ["10px", "12px", "14px", "16px", "18px", "20px", "24px", "26px", "28px", "30px", "32px"]
                        }, arr = {}, arr2 = {};
                        var codes = alt.code;
                        var texts = alt.text;
                        var fonts = function () {
                            $.each(codes, function (index, item) {
                                arr[index] = item;
                            });
                            return arr;
                        }();
                        var fonttexts = function () {
                            $.each(texts, function (index, item) {
                                arr2[index] = item;
                            });
                            return arr2;
                        }();
                        fontSize.call(this, { fonts: fonts, texts: fonttexts }, function (value) {
                            insertInline.call(iframeWin, 'span', {
                                style: value
                                , text: "&nbsp;"
                            }, range);
                            setTimeout(function () {
                                body.focus();
                            }, 10);
                        });
                    }
                // 超链接
                ,link: function(range) {
                    var container = getContainer(range)
                    , parentNode = $(container).parent();

                    link.call(body, {
                        text: (document.selection ? range.text : range.toString())
                        , href: parentNode.attr('href') || ''
                        , target: parentNode.attr('target') || ''
                    }, function(field) {
                        var parent = parentNode[0];
                        if (parent.tagName === 'A') {
                            parent.href = field.href;
                        } else {
                            if (field.text === '') field.text = field.href;

                            insertInline.call(iframeWin, 'a', field, range);
                        }
                    });
                }
                // 清除超链接
                , unlink: function(range) {
                    iframeDOM.execCommand('unlink');
                }
                // 表情
                , face: function(range) {
                    face.call(this, function(img) {
                        insertInline.call(iframeWin, 'img', {
                            src: img.src
                            ,alt: img.alt
                        }, range);
                    });
                }
                // 图片
                , image: function(range) {
                    var input = $($(this).find('input')[0]);

                    input.unbind('change');

                    input.change(function(e) {
                        if (!set.uploadImage) {
                            this.value = '';

                            soxui.pop.msg('未设置上传参数');

                            return ;
                        }

                        if (this.files.length > 0) {
                            var loading = soxui.pop.load(2);

                            var upload = set.uploadImage;

                            var all = {'.jpg':1,'.jpeg':1,'.png':1,'.gif':1,'.bmp':1};
                            var ext = this.value.substr(this.value.lastIndexOf('.')).toLowerCase();

                            if (!all[ext]) {
                                soxui.pop.msg('非图片文件');

                                return ;
                            }

                            if (upload.size && this.files[0].size > upload.size * 1024) {
                                soxui.pop.msg('文件大小超过'+upload.size+'KB');

                                return ;
                            }

                            var data = new FormData();

                            data.append((upload.file || 'file'),this.files[0]);

                            this.value = '';

                            $.ajax({
                                url: upload.url,
                                type: 'POST',
                                // crossDomain: true,
                                // xhrFields:{withCredentials: true},
                                data: data,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function(obj,status,xhr) {
                                    soxui.pop.close(loading);

                                    var img = upload.data(obj,status,xhr);

                                    if (img) {
                                        insertInline.call(iframeWin, 'img', img, range);
                                    } else {
                                        soxui.pop.msg('图片上传失败');
                                    }
                                },
                                error: function() {
                                    soxui.pop.close(loading);

                                    soxui.pop.msg('图片上传失败');
                                },
                                dataType: 'json'
                            });
                        } else {
                            soxui.pop.msg('未选中图片');

                            this.value = '';
                        }
                    });
                }
                // 附件
                , file: function(range) {
                    var input = $($(this).find('input')[0]);

                    input.unbind('change');

                    input.change(function(e) {
                        if (!set.uploadFile) {
                            this.value = '';

                            soxui.pop.msg('未设置上传参数');

                            return ;
                        }

                        if (this.files.length > 0) {
                            var loading = soxui.pop.load(2);

                            var upload = set.uploadFile;

                            if (upload.size && this.files[0].size > upload.size * 1024) {
                                soxui.pop.msg('文件大小超过' + upload.size + 'KB');

                                return ;
                            }

                            var data = new FormData();

                            data.append((upload.file || 'file'),this.files[0]);

                            this.value = '';

                            $.ajax({
                                url: upload.url,
                                type: 'POST',
                                // crossDomain: true,
                                // xhrFields:{withCredentials: true},
                                data: data,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function(obj,status,xhr) {
                                    soxui.pop.close(loading);

                                    var attach = upload.data(obj, status, xhr);

                                    if (attach) {
                                        insertInline.call(iframeWin, 'a', attach, range);
                                    } else {
                                        soxui.pop.msg('文件上传失败');
                                    }
                                },
                                error: function() {
                                    soxui.pop.close(loading);

                                    soxui.pop.msg('文件上传失败');
                                },
                                dataType: 'json'
                            });
                        } else {
                            soxui.pop.msg('未选中文件');

                            this.value = '';
                        }
                    });
                }
                // 插入代码
                , code: function(range) {
                    code.call(body, function(pre) {
                        insertInline.call(iframeWin, 'pre', {
                            text: pre.code
                            ,'lay-lang': pre.lang
                        }, range);
                    });
                }
                // 帮助
                , help: function() {
                    soxui.pop.open({
                        type: 2
                        , title: '帮助'
                        , area: ['560px', '640px']
                        , shadeClose: true
                        , shade: 0.1
                        , skin: 'soxui-layer-msg'
                        , content: 'https://www.soxui.com/#bW9kdWxlL2VkaXRvcnx8ZWRpdG9yLmpzb24='
                    });
                }
            }
            , tools = ed_elem.find('.soxui-editor-tool')
            
            , click = function() {
                var othis = $(this)
                , events = othis.attr('editor-event')
                , command = othis.attr('editor-command');
                
                if (othis.hasClass(ABLED)) return;

                body.focus();

                var range = Range(iframeDOM)
                , container = range.commonAncestorContainer
                
                if (command) {
                    switch (command) {
                        case 'heading':
                            if (othis.hasClass('editor-tool-active')) {
                                iframeDOM.execCommand('formatBlock', false, '<p>');
                            } else {
                                iframeDOM.execCommand('formatBlock', false, '<'+events+'>');
                            }
                            break;

                        default:
                            iframeDOM.execCommand(command);
                            break;
                    }
                    
                    if (/justifyLeft|justifyCenter|justifyRight/.test(command)) {
                        if (container.parentNode) {
                            iframeDOM.execCommand('formatBlock', false, '<'+container.parentNode.tagName.toLowerCase()+'>');
                        } else {
                            iframeDOM.execCommand('formatBlock', false, '<p>');
                        }
                    }
                    setTimeout(function() {
                        body.focus();
                    }, 10);
                } else {
                    toolEvent[events] && toolEvent[events].call(this, range);
                }
                toolCheck.call(iframeWin, tools, othis);
            }
            
            , isClick = /image/

            tools.find('>i').off('mousedown').on('mousedown', function() {
                var othis = $(this)
                , events = othis.attr('editor-event');
                if (isClick.test(events)) return;
                click.call(this)
            }).off('click').on('click', function() {
                var othis = $(this)
                , events = othis.attr('editor-event');
                if (!isClick.test(events)) return;
                click.call(this)
            });
            
            //触发内容区域
            body.off('click').on('click', function() {
                toolCheck.call(iframeWin, tools);
                soxui.pop.close(face.index);
                soxui.pop.close(fontFomat.index);
                soxui.pop.close(fontSize.index);
                soxui.pop.close(table.index);
            });
        }

        // 插入表格面板
        , table = function (options, callback) {
            table.hide = table.hide || function (e) {
                if ($(e.target).attr('editor-event') !== 'table') {
                    soxui.pop.close(table.index);
                }
            };
            if (!/mobile/i.test(navigator.userAgent)) {
                return table.index = soxui.pop.tips(
                    function () {
                        return '<div style="padding: 5px;border: 1px solid #e6e6e6;background: #fff;color: #000;"><span id="laytable_label" class="soxui-label">0列 x 0行</span>'
                            + '<span style="float:right;"><input type="checkbox" style="position: relative;top: 2px;">居中</span>'
                            + '<table class="soxui-table" lay-size="sm">'
                            + '<tbody>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'

                            + '</tbody>'
                            + '</table></div>';
                    }(), this, {
                        tips: [3, '#fff']
                        , time: 0
                        , skin: 'soxui-box soxui-util-face'
                        , maxWidth: 500
                        , success: function (layero, index) {
                            var tb_align = '';

                            layero.css({
                                marginTop: -4
                                ,marginLeft: -10
                            });
                            layero.find('td').on('mouseover', function () {
                                layero.find('#laytable_label')[0].innerText = (this.cellIndex + 1) + "列 x " + (this.parentElement.rowIndex + 1) + "行";
                                layero.find('td').removeAttr("style");

                                $(this).attr('style', 'background-color:linen;');
                                $(this).prevAll().attr('style', 'background-color:linen;');
                                for (var i = 0; i < $(this.parentElement).prevAll().length; i++) {
                                    for (var j = 0; j < $(this.parentElement).prevAll()[i].childNodes.length; j++) {
                                        if (j <= this.cellIndex) {
                                            $(this.parentElement).prevAll()[i].children[j].style = "background-color:linen;";
                                        }
                                    }
                                }
                            });
                            layero.find('input').on('click', function () {
                                tb_align = tb_align == 'center' ? '' : 'center';
                            });
                            layero.find('td').on('click', function () {
                                callback && callback({
                                    cells: this.cellIndex + 1
                                    , rows: this.parentElement.rowIndex
                                    , align: tb_align
                                });
                                soxui.pop.close(index);
                            });
                            // $(document).off('click', table.hide).on('click', table.hide);
                        }
                    });
            } else {
                return table.index = soxui.pop.open({
                    type: 1
                    , title: false
                    , closeBtn: 0
                    , shade: 0.05
                    , shadeClose: true
                    , content: function () {
                        return '<div style="padding: 5px;border: 1px solid #e6e6e6;background: #fff;color: #000;"><span id="laytable_label" class="soxui-label">0列 x 0行</span>'
                            + '<span style="float:right;"><input type="checkbox" style="position: relative;top: 2px;">居中</span>'
                            + '<table class="soxui-table" lay-size="sm">'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '<tr style="height: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            + '</table></div>';
                    }()
                    , area: ['85%']
                    , skin: 'soxui-box soxui-util-face'
                    , success: function (layero, index) {
                        var tb_align = '';

                        layero.css({
                            marginTop: -4
                            ,marginLeft: -10
                        });
                        layero.find('td').on('touchmove', function (e) {
                            var realTarget = getTouchElement(e);
                            if (realTarget != null && realTarget.tagName.toUpperCase() === 'TD') {
                                layero.find('#laytable_label')[0].innerText = (realTarget.cellIndex + 1) + "列 x " + (realTarget.parentElement.rowIndex + 1) + "行";
                                layero.find('td').removeAttr("style");

                                $(realTarget).attr('style', 'background-color:linen;');
                                $(realTarget).prevAll().attr('style', 'background-color:linen;');
                                for (var i = 0; i < $(realTarget.parentElement).prevAll().length; i++) {
                                    for (var j = 0; j < $(realTarget.parentElement).prevAll()[i].childNodes.length; j++) {
                                        if (j <= realTarget.cellIndex) {
                                            $(realTarget.parentElement).prevAll()[i].children[j].style = "background-color:linen;";
                                        }
                                    }
                                }
                            }
                        });
                        layero.find('input').on('touchend', function () {
                            tb_align = tb_align == 'center' ? '' : 'center';
                        });
                        layero.find('td').on('touchend', function (e) {
                            var realTarget = getTouchElement(e);
                            if (realTarget != null && realTarget.tagName.toUpperCase() === 'TD') {
                                callback && callback({
                                    cells: realTarget.cellIndex + 1
                                    , rows: realTarget.parentElement.rowIndex
                                    , align: tb_align
                                });
                                soxui.pop.close(index);
                            }
                        });
                    }
                });
            }
        }

        // 段落格式
        , fontFomat = function (options, callback) {
            // fontFomat.hide = fontFomat.hide || function (e) {
            //     if ($(e.target).attr('editor-event') == 'fontFomat' || $(e.target).attr('editor-event') == 'fontfamily') {
            //     } else {
            //         // soxui.pop.close(fontFomat.index);
            //     }
            // }
            fontFomat.index = soxui.pop.tips(function () {
                var content = [];
                $.each(options.fonts, function (index, item) {
                    content.push('<li title="' + options.fonts[index] + '" style="float: initial;width:100%;height:auto;line-height:100%;"><' + options.fonts[index] + ' style="padding:5px 0;margin:0;">' + options.texts[index] + '</' + options.fonts[index] + '></li>');
                });
                return '<ul class="soxui-clear" style="color:#000;width:256px;">' + content.join('') + '</ul>';
            }(), this, {
                    tips: [3, '#fff']
                    , time: 0
                    , skin: 'soxui-box soxui-util-face'
                    , success: function (layero, index) {
                        layero.css({ marginTop: -4, marginLeft: -10 }).find('.soxui-clear>li').on('click', function () {
                            callback && callback(this.title, options.fonts);
                            soxui.pop.close(index);
                        });
                        // $(document).off('click', fontFomat.hide).on('click', fontFomat.hide);
                    }
                });
        }

        // 字体大小
        , fontSize = function (options, callback) {
            // fontSize.hide = fontSize.hide || function (e) {
            //     if ($(e.target).attr('editor-event') != 'fontSize') {
            //         // soxui.pop.close(fontSize.index);
            //     }
            // }
            fontSize.index = soxui.pop.tips(function () {
                var content = [];
                $.each(options.fonts, function (index, item) {
                    content.push('<li title="' + options.fonts[index] + '" style="float: initial;width:100%;color:#000;height:auto;line-height:100%;padding:5px 0;' + options.fonts[index] + '">' + options.texts[index] + '</li>');
                });
                return '<ul class="soxui-clear" style="width: 128px;">' + content.join('') + '</ul>';
            }(), this, {
                    tips: [3, '#fff']
                    , time: 0
                    , skin: 'soxui-box soxui-util-face'
                    , success: function (layero, index) {
                        layero.css({ marginTop: -4, marginLeft: -10 }).find('.soxui-clear>li').on('click', function () {
                            callback && callback(this.title, options.fonts);
                            soxui.pop.close(index);
                        });
                        // $(document).off('click', fontSize.hide).on('click', fontSize.hide);
                    }
                });
        }
        
        // 超链接面板
        , link = function(options, callback) {
            var body = this;

            var conf = {
                type: [3, '#fff']
                ,id: 'soxui_editor_link'
                ,area: '350px'
                ,shade: 0.05
                ,shadeClose: true
                ,moveType: 1
                ,title: '超链接'
                ,skin: 'soxui-layer-msg'
                ,content: ''
                ,success: function(layero, index) {
                    layero.find('.btn').on('click', function() {
                        var btn = $(this);

                        if (btn.attr('sox-filter') == 'editor-ok') {
                            var form = $('#'+btn.attr('sox-editor')).serializeArray();
                            var data = {};

                            for (var i in form) {
                                data[form[i].name] = form[i].value;
                            }

                            callback && callback(data);
                        }

                        soxui.pop.close(index);
                    });
                }
            };

            if (template['editor_tool_link']) {
                conf.content = soxui.tpl.render(template['editor_tool_link'],options);

                link.index = soxui.pop.open(conf);
            } else {
                get_template('editor_tool_link',function() {
                    conf.content = soxui.tpl.render(template['editor_tool_link'],options);

                    link.index = soxui.pop.open(conf);
                });
            }
        }
        
        // 表情面板
        , face = function(callback) {
            var body = this;
            var path = fapath;
            var alts = ["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]", "[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]", "[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]", "[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]", "[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]", "[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]", "[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"];
            var cont = '';
            var conf = {
                tips: [3, '#fff']
                ,time: 0
                ,skin: 'soxui-box soxui-util-face'
                ,nomc: true
                ,maxWidth: 500
                ,success: function(layero, index) {
                    layero.css({
                        marginTop: -4
                        ,marginLeft: -10
                    }).find('.soxui-clear>li').on('click', function() {
                        var img = $(this).find('img');

                        callback && callback({
                            src: img.attr('src')
                            ,alt: img.attr('alt')
                        });
                        soxui.pop.close(index);
                    });
                    // $(document).off('click', face.hide).on('click', face.hide);
                }
            };

            // face.hide = face.hide || function(e) {
            //     if (face.index > 0 && $(e.target).attr('editor-event') !== 'face') {
            //         soxui.pop.close(face.index);
            //         face.index = 0;
            //     }
            // }

            if (template['editor_tool_face']) {
                cont = soxui.tpl.render(template['editor_tool_face'],{path:path,alts:alts});

                face.index = soxui.pop.tips(cont,body,conf);
            } else {
                get_template('editor_tool_face',function() {
                    cont = soxui.tpl.render(template['editor_tool_face'],{path:path,alts:alts});

                    face.index = soxui.pop.tips(cont,body,conf);
                });
            }
        }
        
        // 插入代码面板
        , code = function(callback) {
            var body = this;

            var conf = {
                type: 1
                ,id: 'soxui_editor_code'
                ,area: '550px'
                ,shade: 0.05
                ,shadeClose: true
                ,moveType: 1
                ,title: '插入代码'
                ,skin: 'soxui-layer-msg'
                ,content: ''
                ,success: function(layero, index) {
                    layero.find('.btn').on('click', function() {
                        var btn = $(this);

                        if (btn.attr('sox-filter') == 'editor-ok') {
                            var form = $('#'+btn.attr('sox-editor')).serializeArray();
                            var data = {};

                            for (var i in form) {
                                data[form[i].name] = form[i].value;
                            }

                            callback && callback(data);
                        }

                        soxui.pop.close(index);
                    });
                }
            };

            if (template['editor_tool_code']) {
                conf.content = soxui.tpl.render(template['editor_tool_code']);

                code.index = soxui.pop.open(conf);
            } else {
                get_template('editor_tool_code',function() {
                    conf.content = soxui.tpl.render(template['editor_tool_code']);

                    code.index = soxui.pop.open(conf);
                });
            }
        }
        
        // 全部工具
        , toolShow = function(item,index) {
            var tools = {
                html: '<i class="soxui-icon editor-tool-html" title="HTML源代码" editor-command="html" editor-event="html">&#xe64b;</i>'
                , strong: '<i class="soxui-icon editor-tool-b" title="加粗" editor-command="Bold" editor-event="b">&#xe62b;</i>'
                , italic: '<i class="soxui-icon editor-tool-i" title="斜体" editor-command="italic" editor-event="i">&#xe644;</i>'
                , underline: '<i class="soxui-icon editor-tool-u" title="下划线" editor-command="underline" editor-event="u">&#xe646;</i>'
                , del: '<i class="soxui-icon editor-tool-d" title="删除线" editor-command="strikeThrough" editor-event="d">&#xe64f;</i>'
                , hr: '<i class="soxui-icon editor-tool-hr" title="水平线" editor-event="hr"><b>Hr</b></i>'
                , fontFomat: '<i class="soxui-icon" title="段落格式" editor-event="fontFomat" style="font-size:18px;font-weight:bold;">P</i>'
                , fontSize: '<i class="soxui-icon" title="字体大小" editor-event="fontSize" style="font-size:18px;font-weight:bold;">A</i>'
                
                , '|': '<span class="editor-tool-mid"></span>'
                
                , left: '<i class="soxui-icon editor-tool-left editor-tool-active" title="左对齐" editor-command="justifyLeft" editor-event="left">&#xe649;</i>'
                , center: '<i class="soxui-icon editor-tool-center" title="居中对齐" editor-command="justifyCenter" editor-event="center">&#xe647;</i>'
                , right: '<i class="soxui-icon editor-tool-right" title="右对齐" editor-command="justifyRight" editor-event="right">&#xe648;</i>'
                , link: '<i class="soxui-icon editor-tool-link" title="插入链接" editor-event="link">&#xe64c;</i>'
                , unlink: '<i class="soxui-icon editor-tool-unlink soxui-disabled" title="清除链接" editor-command="unlink" editor-event="unlink">&#xe64d;</i>'
                , face: '<i class="soxui-icon editor-tool-face" title="表情" editor-event="face"">&#xe650;</i>'
                , image: '<i class="soxui-icon editor-tool-image" title="图片" editor-event="image">&#xe64a;<input type="file" name="file"></i>'
                , file: '<i class="soxui-icon editor-tool-image" title="附件" editor-event="file">&#xe621;<input type="file" name="file"></i>'
                , code: '<i class="soxui-icon editor-tool-code" title="插入代码" editor-event="code">&#xe64e;</i>'

                , colorpicker: '<i class="soxui-icon" title="字体颜色选择" id="soxui-editor-font-color-'+(index || 0)+'"></i>'
                , fontBackColor: '<i class="soxui-icon" title="字体背景色选择" id="soxui-editor-font-background-'+(index || 0)+'"></i>'

                , table: '<i class="soxui-icon" title="插入表格" editor-event="table" style="font-size:24px">&#xe62d;</i>'
                
                , help: '<i class="soxui-icon editor-tool-help" title="帮助" editor-event="help">&#xe607;</i>'
            }

            return tools[item] ? tools[item] : false;
        }

        // , tools = {
        //     html: '<i class="soxui-icon editor-tool-html" title="HTML源代码" editor-command="html" editor-event="html"">&#xe64b;</i>'
        //     , strong: '<i class="soxui-icon editor-tool-b" title="加粗" editor-command="Bold" editor-event="b"">&#xe62b;</i>'
        //     , italic: '<i class="soxui-icon editor-tool-i" title="斜体" editor-command="italic" editor-event="i"">&#xe644;</i>'
        //     , underline: '<i class="soxui-icon editor-tool-u" title="下划线" editor-command="underline" editor-event="u"">&#xe646;</i>'
        //     , del: '<i class="soxui-icon editor-tool-d" title="删除线" editor-command="strikeThrough" editor-event="d"">&#xe64f;</i>'
        //     , h1: '<i class="soxui-icon editor-tool-h1" title="大标题" editor-command="heading" editor-event="h1""><b>H1</b></i>'
        //     , h2: '<i class="soxui-icon editor-tool-h2" title="小标题" editor-command="heading" editor-event="h2""><b>H2</b></i>'
            
        //     , '|': '<span class="editor-tool-mid"></span>'
            
        //     , left: '<i class="soxui-icon editor-tool-left" title="左对齐" editor-command="justifyLeft" editor-event="left"">&#xe649;</i>'
        //     , center: '<i class="soxui-icon editor-tool-center" title="居中对齐" editor-command="justifyCenter" editor-event="center"">&#xe647;</i>'
        //     , right: '<i class="soxui-icon editor-tool-right" title="右对齐" editor-command="justifyRight" editor-event="right"">&#xe648;</i>'
        //     , link: '<i class="soxui-icon editor-tool-link" title="插入链接" editor-event="link"">&#xe64c;</i>'
        //     , unlink: '<i class="soxui-icon editor-tool-unlink soxui-disabled" title="清除链接" editor-command="unlink" editor-event="unlink"">&#xe64d;</i>'
        //     , face: '<i class="soxui-icon editor-tool-face" title="表情" editor-event="face"">&#xe650;</i>'
        //     , image: '<i class="soxui-icon editor-tool-image" title="图片" editor-event="image">&#xe64a;<input type="file" name="file"></i>'
        //     , file: '<i class="soxui-icon editor-tool-image" title="附件" editor-event="file">&#xe621;<input type="file" name="file"></i>'
        //     , code: '<i class="soxui-icon editor-tool-code" title="插入代码" editor-event="code">&#xe64e;</i>'

        //     , colorpicker: '<i class="soxui-icon" title="字体颜色选择" id="soxui-editor-font-color-'+this.index+'"></i>'
        //     , fontBackColor: '<i class="soxui-icon" title="字体背景色选择" id="soxui-editor-font-background-'+this.index+'"></i>'
            
        //     , help: '<i class="soxui-icon editor-tool-help" title="帮助" editor-event="help">&#xe607;</i>'
        // }
    }

    if (typeof(soxui) != 'undefined') {
        soxui.editor = new editor();
    } else {
        window.soxeditor = new editor();
    }
})();