$.fn.extend({
	_translate:function(x,y,rotate,scale,units){
		var prefix = ['moz','o','ms','webkit'];
		if (!x) x = 0;
		if (!y) y = 0;
		if (!rotate) rotate = 0;
		if (!scale) scale = 1;
		if (!units) units = 'px';

		this._translated = {top:y,left:x,rotate:rotate,scale:scale,units:units};

		for (var i in prefix){
			$(this).css('-'+prefix[i]+'-transform', 'translate3d('+x+''+units+','+y+''+units+',0'+units+') rotate('+rotate+'deg) scale('+scale+')');
		}
		return this;
	},
	move:function(x,y){
		var pos = this.getPosition();
		if (!x) x = 0;
		if (!y) y = 0;
		this._translate(pos.left + x,pos.top + y);
		return this;
	},
	getTranslated:function(){
		return this._translated;
	},
	getPosition:function(){
		if (!this._translated){
			return this.position();
		} else {
			return this._translated;
		}
	},
	getCenter:function(){
		/*
		if (!this._translated){
		
		} else {			
			return {left: this._translated.left + $(this).outerWidth()/2 , top:this._translated.top+ $(this).outerHeight()/2};
		}
		*/
			return {left: $(this).offset().left + $(this).outerWidth()/2 , top:$(this).offset().top+ $(this).outerHeight()/2};
	},
	scroller:function(){
		return new scroller(this);
	}
})