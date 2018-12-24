/**
 
 @Name:    soxui.film | window.soxfilm
 @Author： sixno
 @License：MIT

 */

(function(){
    "use strict";

    function film()
    {
        this.version = '1.0.0';
        this.modules = [];

        if(typeof(p5) == 'undefined')
        {
            typeof(console) == 'object' && console.error('soxfilm error: sorry, film.js is required, you must load it before this script.');

            return false;
        }

        this.play = function(elem,callback)
        {
            var that = this;
            var conf = {};

            var sketch = function(p)
            {
                if(typeof(elem) == 'string')
                {
                    conf.elem = elem;
                }
                else
                {
                    conf = elem;
                }

                var ele = document.querySelector(conf.elem);

                if(!conf.width)
                {
                    conf.width = ele.offsetWidth;
                }

                if(!conf.height)
                {
                    conf.height = ele.offsetHeight;
                }

                conf.fps = conf.fps || 24;

                p.setup = function()
                {
                    var obj = p.createCanvas(conf.width,conf.height);

                    p.frameRate(20);
                    p.noStroke();

                    if(conf.setup)
                    {
                        conf.setup(p,obj);
                    }

                    ele.appendChild(obj.canvas);
                }

                p.draw = function()
                {
                    callback(p,conf);
                }
            }

            return new p5(sketch);
        }
    }

    if(typeof(soxui) != 'undefined')
    {
        soxui.film = new film();
    }
    else
    {
        window.soxfilm = new film();
    }
})();