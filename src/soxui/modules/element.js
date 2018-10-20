/**
 
 @Name:    soxui.element | window.soxelement
 @Author： sixno
 @License：MIT

 */


(function(){
    "use strict";

    function element()
    {
    	this.version = '1.0.0';

        return this;
    }

    if(typeof(soxui) != 'undefined')
    {
        soxui.element = new element();
    }
    else
    {
        window.soxelement = new element();
    }
})();