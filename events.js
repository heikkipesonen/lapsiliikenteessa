function events(parent){	
	this._listeners = [];
	this._parent = parent;
	var me = this;

	this._parent.on = function(name,fn){
		me._on(name,fn);
	}

	this._parent.fire = function(evt,data,e){
		me._fire(evt,data,e);
	}

	this._parent.off = function(evt){
		me._off(evt);
	}
}	

events.prototype = {
	_on:function(name,fn){		
		if (this._listeners[name] == undefined){
			this._listeners[name] = Array();
		}	
		this._listeners[name].push(fn);		
	},
	_fire : function(evt,data,e){		
		for (var i in this._listeners['all']){			
			if (this._listeners['all'][i]!=undefined && typeof(this._listeners['all'][i])== 'function'){						
				this._listeners['all'][i].call(this._parent,i,evt,data,e);
			}
		}
		if (this._listeners[evt]!=undefined){
			for (var i in this._listeners[evt]){
				if (typeof(this._listeners[evt][i])=='function'){
					this._listeners[evt][i].call(this._parent,data,e);
				}
			}			
		}
	},
	_off:function(evt){
		delete this._listeners[evt];
	}
}