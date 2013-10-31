$.fn.extend({
	select:function(){
		return new select(this);
	}
});


function select(container){
	this._events = new events(this);
	this._element = $(container);	

	this.init();
}

select.prototype = {
	init:function(){
		var me = this;
		this._multiselect = false;

		if (this._element.attr('multiselect')){
			this._multiselect = parseInt(this._element.attr('multiselect'));

			if (this._multiselect == NaN){
				this._multiselect = false;
			}
		}		

		this._element.hammer().on('tap','.option',function(){
						

			$(this).toggleClass('selected');


			if (me.isComplete()){
				me.fire('complete',me.getValues());
			}
		});
	},
	getValues:function(){
		var result = [];
		$.each(this._element.find('.selected'), function(){
			result.push( $(this).attr('value') );
		});

		return result;
	},
	isComplete:function(){
		if (this._multiselect == false){			
			return this._element.find('.selected').length > 0;
		} else {
			return this._element.find('.selected').length >= this._multiselect;
		}
	},
	start:function(){

	},
	cancel:function(){
		this._element.find('.selected').removeClass('selected');
		return true;
	},
	reset:function(){		
		this._element.find('.selected').removeClass('selected');		
	}
}