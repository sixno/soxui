/**
 
 @Name:    soxui.react | window.soxreact
 @Author： sixno
 @License：MIT
 @Warning: need React

 */

(function(){
    "use strict";

    function react()
    {
        this.version = '1.0.0';
        this.modules = [];

        this.loading_flag = false;

        this.await_file = {};
        this.loaded_file = {};

        this.await_callback = {};

        this.load = function(path,callback)
        {
            var that = this;

            if(!that.loaded_file[path])
            {
                that.await_file[path] = 1;

                that.loading(path);
            }

            
        };

        this.loading = function(path)
        {
            var that = this;

            var node = document.createElement('script');

                node.type = 'text/javascript';
                node.src  = path+'?v='+that.version;

                if(node.addEventListener)
                {
                    node.addEventListener('load', function(event){
                        that.loaded(path,node,event);
                    },false);
                }
                else
                {
                    node.attachEvent('onreadystatechange', function(event){
                        that.loaded(fid,node,event);
                    });
                }

                head.appendChild(node);
        };

        this.loaded = function(path,node,event)
        {
            var that = this;

            if(Object.keys(that.await_file).length == 0)
            {
                for(var i in that.await_callback)
                this.await_callback
            }
        }

        return this;
    }

    if(typeof(soxui) != 'undefined')
    {
        soxui.react = new react();
    }
    else
    {
        window.soxreact = new react();
    }
})();