/**
 
 @Name:    soxui.tpl | window.soxtpl
 @Author： sixno
 @License：MIT

 */

(function(){
    "use strict";

    function tpl()
    {
        var config = {
            tag_open: '{{',
            tag_shut: '}}'
        };

        var tool = {
            exp: function(str){
                return new RegExp(str, 'g');
            },
            query: function(type, _, __){
                var types = ['#([\\s\\S])+?','([^{#}])*?'][type || 0];
                return this.exp((_ || '')+config.tag_open+types+config.tag_shut+(__ || ''));
            },
            escape: function(html){
                return String(html || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
                                         .replace(/</g, '&lt;')
                                         .replace(/>/g, '&gt;')
                                         .replace(/'/g, '&#39;')
                                         .replace(/"/g, '&quot;');
            },
            error: function(e,log){
                var error = 'soxtpl Error：';
                typeof(console) == 'object' && console.error(error+e+'\n'+(log || ''));
                return error + e;
            }
        };

        this.create = function(tpl)
        {
            var js_s = tool.exp('^'+config.tag_open+'#', '');
            var js_e = tool.exp(config.tag_shut+'$', '');

            tpl = tpl.replace(/\s+|\r|\t|\n/g, ' ')
                     .replace(tool.exp(config.tag_open+'#'), config.tag_open+'# ')
                     .replace(tool.exp(config.tag_shut+'}'), '} '+config.tag_shut)
                     .replace(/\\/g, '\\\\').replace(/(?="|')/g, '\\')
                     .replace(tool.query(), function(str){
                        str = str.replace(js_s, '').replace(js_e, '');
                        return '";'+str.replace(/\\/g, '')+';view+="';
                     })
                     .replace(tool.query(1), function(str){
                        var start = '"+(';
                            if(str.replace(/\s/g, '') === config.tag_open+config.tag_shut)
                            {
                                return '';
                            }

                            str = str.replace(tool.exp(config.tag_open+'|'+config.tag_shut), '');

                            if(/^=/.test(str))
                            {
                                str = str.replace(/^=/, '');
                                start = '"+_escape_(';
                            }

                            return start+str.replace(/\\/g, '') + ')+"';
                     });

            tpl = '"use strict";var view = "'+tpl+'";return view;';

            try{
                return new Function('d, _escape_', tpl);
            }catch(e){
                return tool.error(e, tpl);
            }
        };

        this.render = function(tpl, data, callback)
        {
            if(!data) data = {};

            tpl = tpl(data, tool.escape);

            if(!callback) return tpl;

            callback(tpl);
        };

        this.config = function(options)
        {
            options = options || {};

            for(var i in options)
            {
                config[i] = options[i];
            }
        }
        
        this.version = '1.0.0';

        return this;
    }

    if(typeof(soxui) != 'undefined')
    {
        soxui.tpl = new tpl();
    }
    else
    {
        window.soxtpl = new tpl();
    }
})();