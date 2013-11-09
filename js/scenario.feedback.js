$.fn.extend({
	feedback:function(){
		return new feedback(this);
	}
});

function feedback(container){
	this._events = new events(this);
	this._element = $('#feedback').clone().removeClass('template');
	this._container = container;

	this._positive = this._element.find('#feedback-positive');
	this._negative = this._element.find('#feedback-negative');

	this._init();
}

feedback.prototype = {
	_init:function(){
		this._element.css('display','none');
		var me = this;
		this._element.hammer().on('tap',function(){
			me.hide();
			me.fire('close');
		});

		this.reset();
	},
	show:function(feedback){
		this._init();
		this._container.append(this._element);
		if (feedback){
			this._positive.css('display','block');
			this._negative.css('display','none');
		} else {
			this._positive.css('display','none');
			this._negative.css('display','block');		
		}
		this._element.css('display','block');
	},
	hide:function(){
		this._element.remove();
			this._positive.css('display','none');
			this._negative.css('display','none');
	},
	positive:function(){
		this.show(true);	
	},
	negative:function(){
		this.show(false);
	},
	start:function(){
		return true;
	},
	reset:function(){
		
	},
	isComplete:function(){

	},
	cancel:function(){
		return true;
	}
}