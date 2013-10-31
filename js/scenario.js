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
		} else if (this._element.hasClass('select')){
			this._game = this._element.select();
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
		var me = this;

		this._game.on('complete',function(e){
			if (me._element.attr('complete-delay')){
				var dl = parseInt(me._element.attr('complete-delay'));

				var d = setTimeout(function(){
					me.fire('complete',me._game,e);		
				},dl);

			} else {
				me.fire('complete',me._game,e);
			}
		})
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