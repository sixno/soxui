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

        this.play = function(eid,draw,events)
        {
            var that = this;
            var conf = {};

            var sketch = function(p)
            {
                if(typeof(eid) == 'string')
                {
                    conf.eid = eid;
                }
                else
                {
                    conf = eid;
                }

                var ele = document.getElementById(conf.eid);

                if(!conf.width)
                {
                    conf.width = ele.offsetWidth;
                }

                if(!conf.height)
                {
                    conf.height = ele.offsetHeight;
                }

                conf.fps = conf.fps || 24;

                if(conf.pre)
                {
                    p.preload = function()
                    {
                        conf.pre(p,conf);
                    }
                }

                p.setup = function()
                {
                    var obj = p.createCanvas(conf.width,conf.height);

                    obj.canvas.id = conf.eid+'-canvas';

                    obj.canvas.style.display = 'block';

                    p.frameRate(conf.fps);

                    if(conf.set)
                    {
                        conf.set(p,conf);
                    }

                    if(conf.css)
                    {
                        for(var i in conf.css)
                        {
                            obj.canvas.style[i] = conf.css[i];
                        }
                    }

                    ele.appendChild(obj.canvas);
                }

                p.draw = function()
                {
                    draw(p,conf);
                }

                if(events)
                {
                    for(var i in events)
                    {
                        p[i] = function(){
                            events[i](p,conf);
                        };
                    }
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