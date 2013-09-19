$.fn.extend({
	_translate:function(x,y,rotate,scale,units){
		var prefix = ['moz','o','ms','webkit'];

		if (!units){
			units = 'px';
		}

		this._translated = {top:y,left:x,rotate:rotate,scale:scale,units:units};

		for (var i in prefix){
			$(this).css('-'+prefix[i]+'-transform', 'translate3d('+x+''+units+','+y+''+units+',0'+units+') rotate('+rotate+'deg) scale('+scale+')');
		}
		return this;
	},
	_getTranslated:function(){
		return this._translated;
	},
	getPosition:function(){
		if (!this._translated){
			return this.position();
		} else {
		console.log(this._translated);
			return this._translated;
		}
	},
	getCenter:function(){
		if (!this._translated){
			return {left: $(this).position().left + $(this).outerWidth()/2 , top:$(this).position().top+ $(this).outerHeight()/2};
		} else {			
			return {left: this._translated.left + $(this).outerWidth()/2 , top:this._translated.top+ $(this).outerHeight()/2};
		}
	},
	draggable:function(target,limit){
		return new draggable(this,target,limit);
	},
	puzzle:function(){
		return new puzzle(this);
	},
	game:function(){
		return new game(this);
	}
})