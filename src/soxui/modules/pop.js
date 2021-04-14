/**
 
 @Name:    soxui.pop | window.soxpop
 @Author： sixno
 @License：MIT

 */

(function(){
    "use strict";

    function pop()
    {
        this.version = '1.0.0';
        this.modules = ['tpl'];

        if(typeof(soxui) != 'undefined' && soxui.$)
        {
            var $ = soxui.$;
        }
        else
        {
            if(typeof(jQuery) == 'undefined')
            {
                typeof(console) == 'object' && console.error('soxpop error: sorry, jQuery is required, you must load it before this script.');
                return false;
            }

            if(typeof(soxui) == 'undefined') window['soxui'] = {};

            for(var i in this.modules)
            {
                if(typeof(window['sox'+this.modules[i]]) == 'undefined')
                {
                    typeof(console) == 'object' && console.error('soxpop error: sorry, sox'+this.modules[i]+' is required, you must load it before this script.');
                    return false;
                }

                window['soxui'][this.modules[i]] = window['sox'+this.modules[i]];
            }
        }

        var jspath   = '';
        var tlpath   = '';
        var template = false;

        jspath = document.currentScript ? document.currentScript.src : function(){
            if(soxui.base)
            {
                return soxui.base+'modules/pop.js';
            }
            else
            {
                for(var i = document.scripts.length - 1; i > 0; i--)
                {
                    if(document.scripts[i].src.indexOf('/soxui/modules/pop.js') > 0) return document.scripts[i].src;
                }
            }

            return document.scripts[0].src;
        }();

        tlpath = jspath.substring(0,jspath.lastIndexOf('/')-7)+'templates/pop.html?v='+this.version+'.'+Date.parse(new Date());

        var get_template = function(callback)
        {
            $.ajax({async:true,type:'GET',url:tlpath,success:function(html){
                template = soxui.tpl.create(html);

                if(typeof(callback) == 'function') callback();
            },error:function(){
                typeof(console) == 'object' && console.error('soxpop error: can`t find the template.');
            },dataType:'html'});
        }

        var win = $(window);
        var ready = {
            getPath: jspath,
            config: {},
            end: {},
            minIndex: 0,
            minLeft: [],
            btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
            //五种原始层模式
            type: ['dialog', 'page', 'iframe', 'loading', 'tips'],
        };

        var layer = {
            ie: function(){ //ie版本
                var agent = navigator.userAgent.toLowerCase();
                return (!!window.ActiveXObject || "ActiveXObject" in window) ? (
                (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
                ) : false;
            }(),
            index: 0,
            path: ready.getPath,
            config: {},

            open: function(deliver){
                var o = new Class(deliver);

                layer.config = o.config;

                return o.index;
            },
            
            //各种快捷引用
            alert: function(content, options, yes){
                var type = typeof options === 'function';
                if(type) yes = options;
                return layer.open($.extend({
                    content: content,
                    yes: yes
                }, type ? {} : options));
            }, 
            
            confirm: function(content, options, yes, cancel){
                var type = typeof options === 'function';
                if(type){
                    cancel = yes;
                    yes = options;
                }
                return layer.open($.extend({
                    content: content,
                    btn: ready.btn,
                    yes: yes,
                    btn2: cancel
                }, type ? {} : options));
            },
            
            msg: function(content, options, end){ //最常用提示层
                var type = typeof options === 'function', rskin = ready.config.skin;
                var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '')||'sox-layer-msg';
                var anim = doms.anim.length - 1;
                if(type) end = options;
                return layer.open($.extend({
                    nomc: true,
                    content: content,
                    time: 3000,
                    shade: false,
                    skin: skin,
                    title: false,
                    closeBtn: false,
                    btn: false,
                    resize: false,
                    end: end
                }, (type && !ready.config.skin) ? {
                    skin: skin + ' sox-layer-hui',
                    anim: anim
                } : function(){
                     options = options || {};
                     if(options.icon === -1 || options.icon === undefined && !ready.config.skin){
                         options.skin = skin + ' ' + (options.skin||'sox-layer-hui');
                     }
                     return options;
                }()));    
            },
            
            load: function(icon, options){
                return layer.open($.extend({
                    type: 3,
                    icon: icon || 0,
                    resize: false,
                    shade: 0.01
                }, options));
            }, 
            
            tips: function(content, follow, options){
                return layer.open($.extend({
                    type: 4,
                    nomc: true,
                    content: content,
                    follow: follow,
                    closeBtn: false,
                    time: 3000,
                    shade: false,
                    resize: false,
                    fixed: false,
                    maxWidth: 210
                }, options));
            }
        };

        this.open    = layer.open;
        this.alert   = layer.alert;
        this.confirm = layer.confirm;
        this.msg     = layer.msg;
        this.load    = layer.load;
        this.tips    = layer.tips;

        var Class = function(setings){    
            var that = this;
            that.index = ++layer.index;
            that.config = $.extend({}, that.config, ready.config, setings);
            document.body ? that.creat() : setTimeout(function(){
                that.creat();
            }, 30);
        };

        Class.pt = Class.prototype;

        //缓存常用字符
        var doms = ['sox-layer', '.sox-layer-header', '.sox-layer-footer', '.sox-layer-dialog', 'sox-layer-iframe', 'sox-layer-content', 'sox-layer-btn', 'sox-layer-close'];
        doms.anim = ['layer-anim-00', 'layer-anim-01', 'layer-anim-02', 'layer-anim-03', 'layer-anim-04', 'layer-anim-05', 'layer-anim-06'];
        doms.html = $('html');

        //默认配置
        Class.pt.config = {
            type: 0,
            shade: 0.3,
            fixed: true,
            move: doms[1],
            title: '',
            content: '',
            follow: 'body',
            scroll: 'auto',
            offset: 'auto',
            area: 'auto',
            closeBtn: 1,
            time: 0, //0表示不自动关闭
            zIndex: 19900608, 
            maxWidth: 360,
            anim: 0,
            isOutAnim: true,
            icon: -1,
            moveType: 1,
            resize: false,
            scrollbar: true, //是否允许浏览器滚动条
            tips: 2,
            border_fix: 2 //Bootstrap外边框线条宽度修正，弹框最大化时会有影响
        };

        //容器
        Class.pt.vessel = function(callback){
            var that   = this;
            var times  = that.index;
            var config = that.config;
            var zIndex = config.zIndex + times;

            var data = config;

            data.ready  = ready;
            data.times  = times;
            data.ismax  = config.maxmin && (config.type === 1 || config.type === 2);
            data.zIndex = zIndex;

            var html = [config.shade ? ('<div class="sox-layer-shade" id="sox-layer-shade'+ times +'" times="'+ times +'" style="'+ ('z-index:'+ (zIndex-1) +'; ') +'"></div>') : ''];

            if(template)
            {
                html.push(soxui.tpl.render(template,data));

                callback(html, $('<div class="sox-layer-move"></div>'));
            }
            else
            {
                get_template(function(){
                    html.push(soxui.tpl.render(template,data));

                    callback(html, $('<div class="sox-layer-move"></div>'));
                });
            }

            return that;
        };

        //创建骨架
        Class.pt.creat = function(){
            var that = this
            ,config = that.config
            ,times = that.index, nodeIndex
            ,content = config.content
            ,body = $('body');
            
            if(config.id && $('#'+config.id)[0]) return;

            if(typeof config.area === 'string'){
                config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
            }
            
            //anim兼容旧版shift
            if(config.shift){
                config.anim = config.shift;
            }
            
            if(layer.ie == 6){
                config.fixed = false;
            }
            
            switch(config.type){
                case 0:
                    config.btn = ('btn' in config) ? config.btn : ready.btn[0];
                    layer.closeAll('dialog');
                break;
                case 3:
                    delete config.title;
                    delete config.closeBtn;
                    config.icon === -1 && (config.icon === 0);
                    layer.closeAll('loading');
                break;
                case 4:
                    config.content = config.content + '<i class="sox-layer-TipsG"></i>';
                    delete config.title;
                    config.tips = typeof config.tips === 'object' ? config.tips : [config.tips, true];
                    config.tipsMore || layer.closeAll('tips');
                break;
            }
            
            //建立容器
            that.vessel(function(html, moveElem){
                body.append(html[0]);

                body.append(html[1]);

                $('.sox-layer-move')[0] || body.append(ready.moveElem = moveElem);
                that.layero = $('#'+ doms[0] + times);
                config.scrollbar || doms.html.css('overflow', 'hidden').attr('layer-full', times);

                //遮罩
                $('#sox-layer-shade'+ that.index).css({
                    'background-color': config.shade[1] || '#000'
                    ,'opacity': config.shade[0]||config.shade
                });

                config.type == 2 && layer.ie == 6 && that.layero.find('iframe').attr('src', config.content);

                //坐标自适应浏览器窗口尺寸
                config.type == 4 ? that.tips() : that.offset();
                if(config.fixed){
                    win.on('resize', function(){
                        that.offset();
                        (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1]));// && that.auto(times);
                        config.type == 4 && that.tips();
                    });
                }
                
                config.time <= 0 || setTimeout(function(){
                    layer.close(that.index)
                }, config.time);
                that.move().callback();
                
                //为兼容jQuery3.0的css动画影响元素尺寸计算
                if(doms.anim[config.anim]){
                    var animClass = 'layer-anim '+ doms.anim[config.anim];
                    that.layero.addClass(animClass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass(animClass);
                    });
                };
                
                //记录关闭动画
                if(config.isOutAnim){
                    that.layero.data('isOutAnim', true);
                }
            });//.auto(times);
        };

        //自适应
        // Class.pt.auto = function(index){
        //     var that = this, config = that.config, layero = $('#'+ doms[0] + index);


        //     var area = [layero.innerWidth(), layero.innerHeight()]
        //     ,titHeight = layero.find(doms[1]).outerHeight() || 0
        //     ,btnHeight = layero.find(doms[2]).outerHeight() || 0
        //     ,setHeight = function(elem){
        //         elem = layero.find(elem);
        //         elem.height(area[1] - titHeight - btnHeight - 2*(parseFloat(elem.css('padding-top'))|0));
        //     };

        //     switch(config.type){
        //         case 2: 
        //             setHeight('iframe');
        //         break;
        //         default:
        //             if(config.area[1] === ''){
        //                 if(config.maxHeight > 0 && layero.outerHeight() > config.maxHeight){
        //                     area[1] = config.maxHeight;
        //                     setHeight('.'+doms[5]);
        //                 } else if(config.fixed && area[1] >= win.height()){
        //                     area[1] = win.height();
        //                     setHeight('.'+doms[5]);
        //                 }
        //             } else {
        //                 setHeight('.'+doms[5]);
        //             }
        //         break;
        //     };

        //     return that;
        // };

        //计算坐标
        Class.pt.offset = function(){
            var that = this, config = that.config, layero = that.layero;

            if(config.area[0] === '' && config.maxWidth > 0){
                //为了修复IE7下一个让人难以理解的bug
                if(layer.ie && layer.ie < 8 && config.btn){
                    layero.width(layero.innerWidth());
                }

                layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
            }

            var area = [layero.outerWidth(), layero.outerHeight()]
            ,titHeight = layero.find(doms[1]).outerHeight() || 0
            ,btnHeight = layero.find(doms[2]).outerHeight() || 0
            ,setHeight = function(elem){
                elem = layero.find(elem);
                elem.height(area[1] - titHeight - btnHeight - 2*(parseFloat(elem.css('padding-top'))|0));
            };

            switch(config.type){
                case 2: 
                    setHeight('iframe');
                break;
                default:
                    if(config.area[1] === ''){
                        if(config.maxHeight > 0 && layero.outerHeight() > config.maxHeight){
                            area[1] = config.maxHeight;
                            setHeight('.'+doms[5]);
                        } else if(config.fixed && area[1] >= win.height()){
                            area[1] = win.height();
                            setHeight('.'+doms[5]);
                        }
                    } else {
                        setHeight('.'+doms[5]);
                    }
                break;
            };

            var type = typeof config.offset === 'object';
            that.offsetTop = (win.height() - area[1])/2;
            that.offsetLeft = (win.width() - area[0])/2;
            
            if(type){
                that.offsetTop = config.offset[0];
                that.offsetLeft = config.offset[1]||that.offsetLeft;
            } else if(config.offset !== 'auto'){
                
                if(config.offset === 't'){ //上
                    that.offsetTop = 0;
                } else if(config.offset === 'r'){ //右
                    that.offsetLeft = win.width() - area[0];
                } else if(config.offset === 'b'){ //下
                    that.offsetTop = win.height() - area[1];
                } else if(config.offset === 'l'){ //左
                    that.offsetLeft = 0;
                } else if(config.offset === 'lt'){ //左上角
                    that.offsetTop = 0;
                    that.offsetLeft = 0;
                } else if(config.offset === 'lb'){ //左下角
                    that.offsetTop = win.height() - area[1];
                    that.offsetLeft = 0;
                } else if(config.offset === 'rt'){ //右上角
                    that.offsetTop = 0;
                    that.offsetLeft = win.width() - area[0];
                } else if(config.offset === 'rb'){ //右下角
                    that.offsetTop = win.height() - area[1];
                    that.offsetLeft = win.width() - area[0];
                } else {
                    that.offsetTop = config.offset;
                }
                
            }
         
            if(!config.fixed){
                that.offsetTop = /%$/.test(that.offsetTop) ? 
                    win.height()*parseFloat(that.offsetTop)/100
                : parseFloat(that.offsetTop);
                that.offsetLeft = /%$/.test(that.offsetLeft) ? 
                    win.width()*parseFloat(that.offsetLeft)/100
                : parseFloat(that.offsetLeft);
                that.offsetTop += win.scrollTop();
                that.offsetLeft += win.scrollLeft();
            }
            
            if(layero.attr('minLeft')){
                that.offsetTop = win.height() - (layero.find(doms[1]).outerHeight() || 0);
                that.offsetLeft = layero.css('left');
            }

            layero.css({top: that.offsetTop, left: that.offsetLeft});
        };

        //Tips
        Class.pt.tips = function(){
            var that = this, config = that.config, layero = that.layero;
            var layArea = [layero.outerWidth(), layero.outerHeight()], follow = $(config.follow);
            if(!follow[0]) follow = $('body');
            var goal = {
                width: follow.outerWidth(),
                height: follow.outerHeight(),
                top: follow.offset().top,
                left: follow.offset().left
            }, tipsG = layero.find('.sox-layer-TipsG');
            
            var guide = config.tips[0];
            config.tips[1] || tipsG.remove();
            
            goal.autoLeft = function(){
                if(goal.left + layArea[0] - win.width() > 0){
                    goal.tipLeft = goal.left + goal.width - layArea[0];
                    tipsG.css({right: 12, left: 'auto'});
                } else {
                    goal.tipLeft = goal.left;
                };
            };
            
            //辨别tips的方位
            goal.where = [function(){ //上
                goal.autoLeft();
                goal.tipTop = goal.top - layArea[1] - 10;
                tipsG.removeClass('sox-layer-TipsB').addClass('sox-layer-TipsT').css('border-right-color', config.tips[1]);
            }, function(){ //右
                goal.tipLeft = goal.left + goal.width + 10;
                goal.tipTop = goal.top;
                tipsG.removeClass('sox-layer-TipsL').addClass('sox-layer-TipsR').css('border-bottom-color', config.tips[1]); 
            }, function(){ //下
                goal.autoLeft();
                goal.tipTop = goal.top + goal.height + 10;
                tipsG.removeClass('sox-layer-TipsT').addClass('sox-layer-TipsB').css('border-right-color', config.tips[1]);
            }, function(){ //左
                goal.tipLeft = goal.left - layArea[0] - 10;
                goal.tipTop = goal.top;
                tipsG.removeClass('sox-layer-TipsR').addClass('sox-layer-TipsL').css('border-bottom-color', config.tips[1]);
            }];
            goal.where[guide-1]();
            
            /* 8*2为小三角形占据的空间 */
            if(guide === 1){
                goal.top - (win.scrollTop() + layArea[1] + 8*2) < 0 && goal.where[2]();
            } else if(guide === 2){
                win.width() - (goal.left + goal.width + layArea[0] + 8*2) > 0 || goal.where[3]()
            } else if(guide === 3){
                (goal.top - win.scrollTop() + goal.height + layArea[1] + 8*2) - win.height() > 0 && goal.where[0]();
            } else if(guide === 4){
                 layArea[0] + 8*2 - goal.left > 0 && goal.where[1]()
            }

            layero.find('.'+doms[5]).css({
                'background-color': config.tips[1], 
                'padding-right': (config.closeBtn ? '30px' : '')
            });
            layero.css({
                left: goal.tipLeft - (config.fixed ? win.scrollLeft() : 0), 
                top: goal.tipTop    - (config.fixed ? win.scrollTop() : 0)
            });
        }

        //拖拽层
        Class.pt.move = function(){
            var that = this
            ,config = that.config
            ,_DOC = $(document)
            ,layero = that.layero
            ,moveElem = layero.find(config.move)
            ,resizeElem = layero.find('.sox-layer-resize')
            ,dict = {};

            if(config.move){
                moveElem.css('cursor', 'move');
            }

            moveElem.on('mousedown', function(e){
                e.preventDefault();
                if(config.move){
                    dict.moveStart = true;
                    dict.offset = [
                        e.clientX - parseFloat(layero.css('left'))
                        ,e.clientY - parseFloat(layero.css('top'))
                    ];
                    ready.moveElem.css('cursor', 'move').show();
                }
            });
            
            resizeElem.on('mousedown', function(e){
                e.preventDefault();
                dict.resizeStart = true;
                dict.offset = [e.clientX, e.clientY];
                dict.area = [
                    layero.outerWidth()
                    ,layero.outerHeight()
                ];
                ready.moveElem.css('cursor', 'se-resize').show();
            });
            
            _DOC.on('mousemove', function(e){

                //拖拽移动
                if(dict.moveStart){
                    var X = e.clientX - dict.offset[0]
                    ,Y = e.clientY - dict.offset[1]
                    ,fixed = layero.css('position') === 'fixed';
                    
                    e.preventDefault();
                    
                    dict.stX = fixed ? 0 : win.scrollLeft();
                    dict.stY = fixed ? 0 : win.scrollTop();

                    // 控制元素不被拖出窗口外
                    if(!config.moveOut){
                        var setRig = win.width() - layero.outerWidth() + dict.stX
                        ,setBot = win.height() - layero.outerHeight() + dict.stY;    
                        X < dict.stX && (X = dict.stX);
                        X > setRig && (X = setRig); 
                        Y < dict.stY && (Y = dict.stY);
                        Y > setBot && (Y = setBot);
                    }
                    
                    layero.css({
                        left: X
                        ,top: Y
                    });
                }
                
                //Resize
                if(config.resize && dict.resizeStart){
                    var X = e.clientX - dict.offset[0]
                    ,Y = e.clientY - dict.offset[1];
                    
                    e.preventDefault();

                    var ini_width  = layero.attr('ini-width');
                    var ini_height = layero.attr('ini-height');

                    if(!ini_width)
                    {
                        ini_width = dict.area[0];

                        layero.attr('ini-width',ini_width);
                    }

                    if(!ini_height)
                    {
                        ini_height = dict.area[1];

                        layero.attr('ini-height',ini_height);
                    }

                    dict.stX = fixed ? 0 : win.scrollLeft();
                    dict.stY = fixed ? 0 : win.scrollTop();

                    // 控制元素不被拖出窗口外
                    if(!config.moveOut){
                        dict.area[0] + X < ini_width && (X = ini_width - dict.area[0]);
                        dict.area[0] + X > win.width() - layero.offset().left && (X = win.width() - layero.offset().left - dict.area[0]); 
                        dict.area[1] + Y < ini_height && (Y = ini_height - dict.area[1]);
                        dict.area[1] + Y > win.height() - layero.offset().top && (Y = win.height() - layero.offset().top - dict.area[1]);
                    }

                    layer.style(that.index, {
                        width: dict.area[0] + X
                        ,height: dict.area[1] + Y
                    })
                    dict.isResize = true;
                    config.resizing && config.resizing(layero);
                }
            }).on('mouseup', function(e){
                if(dict.moveStart){
                    delete dict.moveStart;
                    ready.moveElem.hide();
                    config.moveEnd && config.moveEnd(layero);
                }
                if(dict.resizeStart){
                    delete dict.resizeStart;
                    ready.moveElem.hide();
                }
            });
            
            return that;
        };

        Class.pt.callback = function(){
            var that = this, layero = that.layero, config = that.config;
            that.openLayer();
            if(config.success){
                if(config.type == 2){
                    layero.find('iframe').on('load', function(){
                        config.success(layero, that.index);
                    });
                } else {
                    config.success(layero, that.index);
                }
            }
            layer.ie == 6 && that.IE6(layero);
            
            //按钮
            layero.find('.'+doms[6]).children('a').on('click', function(){
                var index = $(this).index();
                if(index === 0){
                    if(config.yes){
                        config.yes(that.index, layero)
                    } else if(config['btn1']){
                        config['btn1'](that.index, layero)
                    } else {
                        layer.close(that.index);
                    }
                } else {
                    var close = config['btn'+(index+1)] && config['btn'+(index+1)](that.index, layero);
                    close === false || layer.close(that.index);
                }
            });
            
            //取消
            function cancel(){
                var close = config.cancel && config.cancel(that.index, layero);
                close === false || layer.close(that.index);
            }
            
            //右上角关闭回调
            layero.find('.'+ doms[7]).on('click', cancel);
            
            //点遮罩关闭
            if(config.shadeClose){
                $('#sox-layer-shade'+ that.index).on('click', function(){
                    layer.close(that.index);
                });
            } 
            
            //最小化
            layero.find('.sox-layer-min').on('click', function(){
                var min = config.min && config.min(layero);
                min === false || layer.min(that.index, config); 
            });
            
            //全屏/还原
            layero.find('.sox-layer-max').on('click', function(){
                if($(this).hasClass('sox-layer-maxmin')){
                    layer.restore(that.index);
                    config.restore && config.restore(layero);
                } else {
                    layer.full(that.index, config);
                    setTimeout(function(){
                        config.full && config.full(layero);
                    }, 100);
                }
            });

            config.end && (ready.end[that.index] = config.end);
        };

        //for ie6 恢复select
        ready.reselect = function(){
            $.each($('select'), function(index , value){
                var sthis = $(this);
                if(!sthis.parents('.'+doms[0])[0]){
                    (sthis.attr('layer') == 1 && $('.'+doms[0]).length < 1) && sthis.removeAttr('layer').show(); 
                }
                sthis = null;
            });
        }; 

        Class.pt.IE6 = function(layero){
            //隐藏select
            $('select').each(function(index , value){
                var sthis = $(this);
                if(!sthis.parents('.'+doms[0])[0]){
                    sthis.css('display') === 'none' || sthis.attr({'layer' : '1'}).hide();
                }
                sthis = null;
            });
        };

        //需依赖原型的对外方法
        Class.pt.openLayer = function(){
            var that = this;
            
            //置顶当前窗口
            layer.zIndex = that.config.zIndex;
            layer.setTop = function(layero){
                var setZindex = function(){
                    layer.zIndex++;
                    layero.css('z-index', layer.zIndex + 1);
                };
                layer.zIndex = parseInt(layero[0].style.zIndex);
                layero.on('mousedown', setZindex);
                return layer.zIndex;
            };
        };

        ready.record = function(layero){
            var area = [
                layero.width(),
                layero.height(),
                layero.position().top, 
                layero.position().left + parseFloat(layero.css('margin-left'))
            ];
            layero.find('.sox-layer-max').addClass('sox-layer-maxmin');
            layero.attr({area: area});
        };

        ready.rescollbar = function(index){
            if(doms.html.attr('layer-full') == index){
                if(doms.html[0].style.removeProperty){
                    doms.html[0].style.removeProperty('overflow');
                } else {
                    doms.html[0].style.removeAttribute('overflow');
                }
                doms.html.removeAttr('layer-full');
            }
        };

        //获取子iframe的DOM
        this.getChildFrame = layer.getChildFrame = function(selector, index){
            index = index || $('.'+doms[4]).attr('times');
            return $('#'+ doms[0] + index).find('iframe').contents().find(selector);    
        };

        //得到当前iframe层的索引，子iframe时使用
        this.getFrameIndex = layer.getFrameIndex = function(name){
            return $('#'+ name).parents('.'+doms[4]).attr('times');
        };

        //iframe层自适应宽高
        this.iframeAuto = layer.iframeAuto = function(index){
            if(!index) return;
            var heg = layer.getChildFrame('html', index).outerHeight();
            var layero = $('#'+ doms[0] + index);
            var titHeight = layero.find(doms[1]).outerHeight() || 0;
            var btnHeight = layero.find(doms[2]).outerHeight() || 0;
            layero.css({height: heg + titHeight + btnHeight});
            layero.find('iframe').css({height: heg});
        };

        //重置iframe url
        this.iframeSrc = layer.iframeSrc = function(index, url){
            $('#'+ doms[0] + index).find('iframe').attr('src', url);
        };

        //设定层的样式
        this.style = layer.style = function(index, options){
            var layero = $('#'+ doms[0] + index)
            ,config = this.config
            ,contElem = layero.find('.sox-layer-mainer')
            ,type = layero.attr('type')
            ,titHeight = layero.find(doms[1]).outerHeight() || 0
            ,btnHeight = layero.find(doms[2]).outerHeight() || 0
            ,minLeft = layero.attr('minLeft');

            if(type === ready.type[3] || type === ready.type[4]){
                return;
            }

            layero.css(options);
            btnHeight = layero.find('.sox-layer-footer').outerHeight();

            if(type === ready.type[2]){
                layero.find('iframe').css({
                    height: parseFloat(options.height) - titHeight - btnHeight - config.border_fix
                });
            } else {
                contElem.css({
                    height: parseFloat(options.height) - titHeight - btnHeight - config.border_fix
                })
            }
        };

        //最小化
        this.min = layer.min = function(index, options){
            var layero = $('#'+ doms[0] + index)
            ,titHeight = layero.find(doms[1]).outerHeight() || 0
            ,left = layero.attr('minLeft') || (181*ready.minIndex)+'px'
            ,position = layero.css('position');
            
            ready.record(layero);
            
            if(ready.minLeft[0]){
                left = ready.minLeft[0];
                ready.minLeft.shift();
            }
            
            layero.attr('position', position);
            
            layer.style(index, {
                width: 180
                ,height: titHeight
                ,left: left
                ,top: win.height() - titHeight
                ,position: 'fixed'
                ,overflow: 'hidden'
            }, true);

            layero.find('.sox-layer-min').hide();
            layero.attr('type') === 'page' && layero.find(doms[4]).hide();
            ready.rescollbar(index);
            
            if(!layero.attr('minLeft')){
                ready.minIndex++;
            }
            layero.attr('minLeft', left);
        };

        //还原
        this.restore = layer.restore = function(index){
            var layero = $('#'+ doms[0] + index), area = layero.attr('area').split(',');
            var type = layero.attr('type');
            layer.style(index, {
                width: parseFloat(area[0]), 
                height: parseFloat(area[1]), 
                top: parseFloat(area[2]), 
                left: parseFloat(area[3]),
                position: layero.attr('position'),
                overflow: 'visible'
            }, true);
            layero.find('.sox-layer-max').removeClass('sox-layer-maxmin');
            layero.find('.sox-layer-min').show();
            layero.attr('type') === 'page' && layero.find(doms[4]).show();
            ready.rescollbar(index);
        };

        //全屏
        this.full = layer.full = function(index){
            var layero = $('#'+ doms[0] + index), timer;
            ready.record(layero);
            if(!doms.html.attr('layer-full')){
                doms.html.css('overflow','hidden').attr('layer-full', index);
            }
            clearTimeout(timer);
            timer = setTimeout(function(){
                var isfix = layero.css('position') === 'fixed';
                layer.style(index, {
                    top: isfix ? 0 : win.scrollTop(),
                    left: isfix ? 0 : win.scrollLeft(),
                    width: win.width(),
                    height: win.height()
                }, true);
                layero.find('.sox-layer-min').hide();
            }, 100);
        };

        //改变title
        this.title = layer.title = function(name, index){
            var title = $('#'+ doms[0] + (index||layer.index)).find(doms[1]);
            title.html(name);
        };

        //关闭layer总方法
        this.close = layer.close = function(index){
            var layero = $('#'+ doms[0] + index), type = layero.attr('type'), closeAnim = 'layer-anim-close';
            if(!layero[0]) return;
            var WRAP = 'sox-layer-wrap', remove = function(){

                //低版本IE 回收 iframe
                if(type === ready.type[2]){
                    try {
                        var iframe = $('#'+doms[4]+index)[0];
                        iframe.contentWindow.document.write('');
                        iframe.contentWindow.close();
                        layero.find('.'+doms[5])[0].removeChild(iframe);
                    } catch(e){}
                }
                layero[0].innerHTML = '';
                layero.remove();

                typeof ready.end[index] === 'function' && ready.end[index]();
                delete ready.end[index];

                if($('.sox-layer').length == 0)
                {
                    $('.sox-layer-move').remove();

                    layer.index = 0;
                }
            };
            
            if(layero.data('isOutAnim')){
                layero.addClass('layer-anim '+ closeAnim);
            }
            
            $('#sox-layer-moves, #sox-layer-shade' + index).remove();
            layer.ie == 6 && ready.reselect();
            ready.rescollbar(index); 
            if(layero.attr('minLeft')){
                ready.minIndex--;
                ready.minLeft.push(layero.attr('minLeft'));
            }
            
            if((layer.ie && layer.ie < 10) || !layero.data('isOutAnim')){
                remove()
            } else {
                setTimeout(function(){
                    remove();
                }, 200);
            }
        };

        //关闭所有层
        this.closeAll = layer.closeAll = function(type){
            $.each($('.'+doms[0]), function(){
                var othis = $(this);
                var is = type ? (othis.attr('type') === type) : 1;
                is && layer.close(othis.attr('times'));
                is = null;
            });
        };

        return this;
    }

    if(typeof(soxui) != 'undefined')
    {
        soxui.pop = new pop();
    }
    else
    {
        window.soxpop = new pop();
    }
})();