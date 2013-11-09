function scenario(container){
	this._events = new events(this);
	this._element = $(container);
	this._feedback = false;
	this._init();
}

scenario.prototype = {
	_init:function(){
		if (this._element.hasClass('delay')){
			this._scenario = this._element.delay();
		} else if (this._element.hasClass('puzzle')){			
			this._scenario = this._element.puzzle();
		} else if (this._element.hasClass('select')){
			this._scenario = this._element.select();
		}

		if (this._element.attr('background')){
			this._element.css('background-image','url('+this._element.attr('background')+')');
		}

		this._setFeedback();
		this._element.find('.draggable').each(function(){
			$(this).draggable();
		});

		this._scenario.reset();
		this._minScore = parseInt(this._element.attr('complete-score')) || false;
		
		var me = this;
		this._scenario.on('complete',function(e){
			if (me._minScore && me._scenario.getScore){
				
				if (me._minScore >= me._scenario.getScore() && me._hasFeedback()){
					me._feedback.show(false);
				} else {
					me._feedback.show(true);
					console.log(me._minScore);
					console.log(me._scenario.getScore());
					me._complete(e);
				}

			} else {			
				me._complete(e);
			}
		});
	},
	_setFeedback:function(){
		if (this._hasFeedback()){
			this._feedback = this._element.feedback();
			
			var me = this;

			this._feedback.on('close',function(){
				me.reset();
			})			
		}
	},
	_hasFeedback:function(){
		return this._element.attr('feedback') == 'true';
	},
	_complete:function(e){
		var me = this;
		if (this._element.attr('complete-delay')){
			var d = setTimeout(function(){
					me.fire('complete',me._scenario,e);		
				},parseInt(this._element.attr('complete-delay')));

		} else {
			this.fire('complete',me._scenario,e);
		}
	},
	reset:function(){
		this._scenario.reset();
	},
	getElement:function(){
		return this._element;
	},
	getScenario:function(){
		return this._scenario;
	},
	start:function(){
		this._scenario.start();
	},
	cancel:function(){
		this._scenario.cancel();
	}
}