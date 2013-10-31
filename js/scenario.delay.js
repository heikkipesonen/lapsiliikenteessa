$.fn.extend({
	delay:function(){
		return new delay(this);
	}
});

function delay(container){
	this._events = new events(this);
	this._element = $(container);
	this._timeout = false;
	this._init();
}

delay.prototype = {
	_init:function(){
		if (this._timeout){
			this.cancel();
		}
	},
	start:function(){
		time = parseInt( this._element.attr('delay') || 1000 );

		var me = this;

		this._timeout = setTimeout(function(){			
			me.fire('complete');
		}, time);
	},
	cancel:function(){		
		clearTimeout( this._timeout );
		this._timeout = false;
	},
	reset:function(){
		this._init();
	},
	isComplete:function(){

	}
}