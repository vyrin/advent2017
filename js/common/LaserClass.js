// namespace
var laser = laser || {};

//
function ClassManager(){
    //tells own name
    return arguments.callee.name || (arguments.callee.toString()).match(/^function ([^(]+)/)[1];
}
ClassManager.id=(0|(Math.random()*998));
ClassManager.compileSuper=function(func, name, id){
    //make the func to a string
    var str = func.toString();
    //find parameters
    var pstart = str.indexOf('(');
    var pend = str.indexOf(')');
    var params = str.substring(pstart+1, pend);
    params = params.trim();

    //find function body
    var bstart = str.indexOf('{');
    var bend = str.lastIndexOf('}');
    var str = str.substring(bstart+1, bend);

    //now we have the content of the function, replace this._super
    //find this._super
    while(str.indexOf('this._super')!= -1)
    {
        var sp = str.indexOf('this._super');
        //find the first '(' from this._super)
        var bp = str.indexOf('(', sp);

        //find if we are passing params to super
        var bbp = str.indexOf(')', bp);
        var superParams = str.substring(bp+1, bbp);
        superParams = superParams.trim();
        var coma = superParams? ',':'';

        //find name of ClassManager
        var Cstr = arguments.callee.ClassManager();

        //replace this._super
        str = str.substring(0, sp)+  Cstr+'['+id+'].'+name+'.call(this'+coma+str.substring(bp+1);
    }
    return Function(params, str);
};
ClassManager.compileSuper.ClassManager = ClassManager;
ClassManager.getNewID=function(){
    return this.id++;
};


(function () {
    var initializing = false, fnTest = /\b_super\b/;
    var releaseMode = null;
    if(releaseMode)
    {
        console.log("release Mode");
    }

    /**
     * The base Class implementation (does nothing)
     * @class
     */
    laser.Class = function () {
    };

    /**
     * Create a new Class that inherits from this Class
     * @param {object} prop
     * @return {function}
     */
    laser.Class.extend = function (prop) {
        var _super = this.prototype;

        // Instantiate a base Class (but only create the instance,
        // don't run the init constructor)
        var prototype = Object.create(_super);

        var classId = ClassManager.getNewID();
        ClassManager[classId] = _super;
        // Copy the properties over onto the new prototype. We make function
        // properties non-eumerable as this makes typeof === 'function' check
        // unneccessary in the for...in loop used 1) for generating Class()
        // 2) for cc.clone and perhaps more. It is also required to make
        // these function properties cacheable in Carakan.
        var desc = { writable: true, enumerable: false, configurable: true };
        for (var name in prop) {
            if(releaseMode && typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]))
            {
                desc.value = ClassManager.compileSuper(prop[name], name, classId);
                Object.defineProperty(prototype, name, desc);
            }
            else if(typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name])){
                desc.value = (function (name, fn) {
                    return function () {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-Class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]);
                Object.defineProperty(prototype, name, desc);
            }
            else if(typeof prop[name] == "function") {
                desc.value = prop[name];
                Object.defineProperty(prototype, name, desc);
            }
            else{
                prototype[name] = prop[name];
            }
        }

        // The dummy Class constructor. The properties are initialized in
        // the constructor in advance so that the hidden class an instance
        // of this belongs is stable. We need to create this constructor on
        // the fly with "new Function" intead of doing
        //
        //     function Class () {
        //       for (var p in this)
        //         this[p] = this[p];
        //     }
        //
        // because using keyed assignment (this[x] = y instead of this.x = y)
        // to append new proeprties is almost certainly going to make an object
        // turn into dictionary mode in V8.
        //
        // See https://github.com/oupengsoftware/v8/wiki/Dictionary-mode-%28English%29#wiki-append-property
        //
        // for principles under the hood.
        var functionBody = releaseMode? "": "this._super=null;";
        for (var p in prototype) {
            functionBody += "this." + p + "=this." + p + ";";
        }
        if (prototype.ctor)
            functionBody += "this.ctor.apply(this,arguments)";
        var Class = new Function(functionBody);

        Class.id = classId;
        // desc = { writable: true, enumerable: false, configurable: true,
        //          value: XXX }; Again, we make this non-enumerable.
        desc.value = classId;
        Object.defineProperty(prototype, '__pid', desc);

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        desc.value = Class;
        Object.defineProperty(Class.prototype, 'constructor', desc);

        // And make this Class extendable
        Class.extend = arguments.callee;

        //add implementation method
        Class.implement = function (prop) {
            for (var name in prop) {
                prototype[name] = prop[name];
            }
        };
        return Class;
    };
})();

laser.Class.addCreateFunction = function (clazz) {
    clazz.create = function (params) {
        var instance = new clazz();
        if (instance.init) {
            instance.init(params);
        }
        return instance;
    }
};

laser.Class.addSingletonFunction = function (clazz) {
    clazz.getInstance = function () {
        if (!clazz.sharedInstance) {
            clazz.createInstance();
        }
        return clazz.sharedInstance;
    }
    clazz.createInstance = function (params) {
        if (clazz.sharedInstance) {
            cc.log("WARNING: Leaking previous instance");
        }
        if (clazz.instanceSubclass) {
            clazz.sharedInstance = new clazz.instanceSubclass();
        } else {
            clazz.sharedInstance = new clazz();
        }
        if (clazz.sharedInstance.init) {
            clazz.sharedInstance.init(params);
        }
        return clazz.sharedInstance;
    }
};