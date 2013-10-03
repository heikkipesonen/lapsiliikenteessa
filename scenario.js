function scenario(container){
	this._events = new events(this);
	this._element = $(container);
	this._init();
}

scenario.prototype = {
	_init:function(){
		if (this._element.hasClass('delay')){
			this._game = this._element.delay();
		} else if (this._element.hasClass('puzzle')){			
			this._game = this._element.puzzle();
		}


		this._element.find('.draggable').each(function(){
			$(this).draggable();
		});

		this._game.reset();
		
		/*
		var me = this;
		
		this._element.find('.draggable').each(function(){
			$(this).draggable();
		});		
		*/
	},
	reset:function(){
		this._game.reset();
	},
	getElement:function(){
		return this._element;
	},
	getGame:function(){
		return this._game;
	},
	start:function(){
		this._game.start();
	},
	cancel:function(){
		this._game.cancel();
	}
}