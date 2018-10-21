/**
 
 @Name:    window.soxui
 @Author： sixno
 @License：MIT

 */

(function(){
    "use strict";

    function soxui()
    {
        var uibase = '';
        var config = {
            redeclare: true,
        };

        uibase = document.currentScript ? document.currentScript.src : function(){
            for(var i = document.scripts.length - 1; i > 0; i--){
                if(document.scripts[i].substr(document.scripts[i].lastIndexOf('/')+1) === 'soxui.js') return document.scripts[i];
            }
        }();

        uibase = uibase.substring(0,uibase.lastIndexOf('/')+1);

        this.use = function(modules,callback,extension)
        {
            var head = document.getElementsByTagName('head')[0];
            var func = '';
            var file = {};

            var load_module = function(fid,path,version)
            {
                var node = document.createElement('script');

                node.type = 'text/javascript';
                node.src  = file[i].path+'?v='+version;

                if(node.addEventListener)
                {
                    node.addEventListener('load', function(event){
                        file_loaded(fid,node,event);
                    }, false);
                }
                else
                {
                    node.attachEvent('onreadystatechange', function(event){
                        file_loaded(fid,node,event);
                    });
                }

                head.appendChild(node);
            }

            var file_loaded = function(fid,node,event)
            {
                if(typeof(fid) != 'undefined')
                {
                    file[fid].load = true;
                    head.removeChild(node);

                    for(var i in file)
                    {
                        if(!file[i].load) return false;
                    }
                }

                if(typeof(callback) == 'function')
                {
                    if(config.redeclare)
                    {
                        callback = callback.toString();

                        callback = callback.substring(callback.indexOf('{')+1,callback.lastIndexOf('}'));

                        var exe = new Function(func+callback);

                        exe();
                    }
                    else
                    {
                        callback();
                    }
                }
            }

            if(typeof(window.jQuery) != 'undefined')
            {
                this.$ = window.jQuery;
            }
            else
            {
                file.jquery = {path: uibase+'modules/jquery.js',load: false};
            }

            for(var i in modules)
            {
                if(modules[i].indexOf(':') == -1)
                {
                    file[modules[i]] = {path: uibase+'modules/'+modules[i]+'.js',load: false};
                }
                else
                {
                    file[modules[i].substr(0,modules[i].indexOf(':'))] = {path: modules[i].substr(modules[i].indexOf(':')+1),load: false};

                    modules[i] = modules[i].substr(0,modules[i].indexOf(':'));
                }

                func += 'var '+modules[i]+' = soxui.'+modules[i]+';\r\n';
            }

            if(typeof(extension) == 'object')
            {
                for(var i in extension)
                {
                    this[i] = extension[i];

                    func += 'var '+i+' = soxui.'+i+';\r\n';
                }
            }

            for(var i in file)
            {
                load_module(i,file[i].path,this.version);
            }

            if(typeof(window.jQuery) != 'undefined' && modules.length == 0)
            {
                file_loaded();
            }
        }

        this.ini = function(options)
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

    window.soxui = new soxui();
})();