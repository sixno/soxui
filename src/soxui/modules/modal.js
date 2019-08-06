/**
 
 @Name:    soxui.modal | window.soxmodal
 @Author： sixno
 @License：MIT

 */

(function(){
    "use strict";

    function modal()
    {
        this.version = '1.0.0';
        this.modules = ['tpl'];

        var config = {
            target: 'body',
            holder: '<div class="sox-modal"></div>',
        };

        this.config = function(options)
        {
            options = options || {};

            for(var i in options)
            {
                config[i] = options[i];
            }
        }

        if(typeof(soxui) != 'undefined' && soxui.$)
        {
            var $ = soxui.$;
        }
        else
        {
            if(typeof(jQuery) == 'undefined')
            {
                typeof(console) == 'object' && console.error('soxmodal error: sorry, jQuery is required, you must load it before this script.');
                return false;
            }

            if(typeof(soxui) == 'undefined') window['soxui'] = {};

            for(var i in this.modules)
            {
                if(typeof(window['sox'+this.modules[i]]) == 'undefined')
                {
                    typeof(console) == 'object' && console.error('soxmodal error: sorry, sox'+this.modules[i]+' is required, you must load it before this script.');
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
                return soxui.base+'modules/modal.js';
            }
            else
            {
                for(var i = document.scripts.length - 1; i > 0; i--)
                {
                    if(document.scripts[i].src.indexOf('/soxui/modules/modal.js') > 0) return document.scripts[i].src;
                }
            }

            return document.scripts[0].src;
        }();

        tlpath = jspath.substring(0,jspath.lastIndexOf('/')-7)+'templates/modal.html?v='+this.version+'.'+Date.parse(new Date());

        var get_template = function(callback)
        {
            $.ajax({async:true,type:'GET',url:tlpath,success:function(html){
                template = soxui.tpl.create(html);

                if(typeof(callback) == 'function') callback();
            },error:function(){
                typeof(console) == 'object' && console.error('soxmodal error: can`t find the template.');
            },dataType:'html'});
        };

        var load_modal = function()
        {
            var html = $(soxui.tpl.render(template));

            if(typeof(config.target) == 'string')
            {
                var target = $(config.target);
            }
            else
            {
                var target = config.target;
            }

            target.append(html);

console.log(html.width());
            html.addClass('sox-modal-show');
        };

        this.open = function(){
            if(!template)
            {
                get_template(function(){
                    load_modal();
                });
            }
            else
            {
                load_modal();
            }
        };

        this.close = function(){};
    }

    if(typeof(soxui) != 'undefined')
    {
        soxui.modal = new modal();
    }
    else
    {
        window.soxmodal = new modal();
    }
})();