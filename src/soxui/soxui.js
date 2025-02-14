/**
 
 @Name:    window.soxui
 @Author： sixno
 @License：MIT

 */

(function() {
    "use strict";

    function soxui() {
        this.version = '1.0.1';

        var uibase = '';
        var config = {
            redeclare: false,
        };

        uibase = document.currentScript ? document.currentScript.src : function() {
            for (var i = document.scripts.length - 1; i > 0; i--) {
                if (document.scripts[i].src.indexOf('/soxui/soxui.js') > 0) return document.scripts[i].src;
            }
        }();

        uibase = uibase.substring(0, uibase.lastIndexOf('/') + 1);

        this.base = uibase;

        this.use = function(modules, callback, extension, ext_map) {
            var that = this;
            var head = document.getElementsByTagName('head')[0];
            var func = 'var $ = soxui.$;\r\n';;
            var file = {};

            if (typeof(window.jQuery) != 'undefined') this.$ = window.jQuery;

            var load_module = function(fid, path) {
                var node = document.createElement('script');

                node.type = 'text/javascript';
                node.src  = file[fid].path + '?v=' + that.version;

                if (node.addEventListener) {
                    node.addEventListener('load', function(event) {
                        file_loaded(fid, node, event);
                    }, false);
                } else {
                    node.attachEvent('onreadystatechange', function(event) {
                        file_loaded(fid, node, event);
                    });
                }

                head.appendChild(node);
            }

            var file_loaded = function(fid, node, event) {
                if (typeof(fid) != 'undefined') {
                    file[fid].load = true;
                    head.removeChild(node);

                    if (that[fid].modules.length > 0) {
                        for (var i in that[fid].modules) {
                            if (typeof(file[that[fid].modules[i]]) == 'undefined') {
                                func += 'var ' + that[fid].modules[i] + ' = soxui.' + that[fid].modules[i] + ';\r\n';

                                file[that[fid].modules[i]] = {path: uibase + 'modules/' + that[fid].modules[i] + '.js', load: false};
                            } else {
                                that[fid].modules[i] = '';
                            }
                        }

                        for (var i in that[fid].modules) {
                            if (that[fid].modules[i] != '') load_module(that[fid].modules[i], uibase + 'modules/' + that[fid].modules[i] + '.js');
                        }
                    }
                }

                for (var i in file) {
                    if (!file[i].load) return false;
                }

                if (typeof(callback) == 'function') {
                    if (config.redeclare) {
                        callback = callback.toString();

                        callback = callback.substring(callback.indexOf('{') + 1, callback.lastIndexOf('}'));

                        var exe = new Function(func + callback);

                        exe();
                    } else {
                        callback();
                    }
                }
            }

            for (var i in modules) {
                if (modules[i].indexOf(':') == -1) {
                    file[modules[i]] = {path: uibase + 'modules/' + modules[i] + '.js', load: false};
                } else {
                    file[modules[i].substr(0, modules[i].indexOf(':'))] = {path: modules[i].substr(modules[i].indexOf(':')+1), load: false};

                    modules[i] = modules[i].substr(0, modules[i].indexOf(':'));
                }

                func += 'var ' + modules[i] + ' = soxui.' + modules[i] + ';\r\n';
            }

            if (typeof(extension) == 'object') {
                if (typeof ext_map == undefined) {
                    for (var i in extension) {
                        this[i] = extension[i];

                        func += 'var ' + i + ' = soxui.' + i + ';\r\n';
                    }
                } else {
                    for (var i in ext_map) {
                        this[i] = extension[ext_map[i]];

                        func += 'var ' + i + ' = soxui.' + i + ';\r\n';
                    }
                }
            }

            if (typeof(window.jQuery) != 'undefined') {
                if (modules.length > 0) {
                    for (var i in file) {
                        load_module(i, file[i].path);
                    }
                } else {
                    file_loaded();
                }
            } else {
                var jq_node = document.createElement('script');

                var jq_load = function(node, event) {
                    head.removeChild(node);

                    if (modules.length > 0) {
                        for (var i in file) {
                            load_module(i, file[i].path);
                        }
                    } else {
                        file_loaded();
                    }
                }

                jq_node.type = 'text/javascript';
                jq_node.src  = uibase + 'modules/jquery.js?v=' + that.version;

                if (jq_node.addEventListener) {
                    jq_node.addEventListener('load', function(event) {
                        jq_load(jq_node, event);
                    }, false);
                } else {
                    jq_node.attachEvent('onreadystatechange', function(event) {
                        jq_load(jq_node, event);
                    });
                }

                head.appendChild(jq_node);
            }
        }

        this.ini = function(options) {
            options = options || {};

            for (var i in options) {
                config[i] = options[i];
            }
        }

        return this;
    }

    window.soxui = new soxui();
})();