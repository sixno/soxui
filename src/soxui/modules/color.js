/**
 
 @Name:    soxui.color | window.soxcolor
 @Author： sixno
 @License：MIT

 */

(function(){
    "use strict";

    function color()
    {
        this.version = '1.0.0';
        this.modules = [];

        this.hex = function(sColor)
        {
        }

        this.rgb = function(sColor)
        {
        }

        this.hsl = function(sColor)
        {
        }

        this.lighten = function(sColor,lighten,alpha)
        {
        }

        this.palette = function(sColor,box,dim)
        {
            box = box || 12;
            dim = dim || 'hue';
        }

        return this;
    }

    if(typeof(soxui) != 'undefined')
    {
        soxui.color = new color();
    }
    else
    {
        window.soxcolor = new color();
    }
})();