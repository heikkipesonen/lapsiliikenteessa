$.fn.extend({
	draggable:function(target,limit,opts){
		return new draggable(this,target,limit,opts);
	}
});


function draggable(element,target,limiter,options){
	this._events = new events(this);
	this._element = $(element);
	this._opts = options || {};

	if (target){
		this._target = $(target);
	} else {
		this._target = false;
	}
	if (limiter){
		this._limiter = $(limiter);
	} else {
		this._limiter = false;
	}
	
	this._delay = 25; // fps --- delay between move events
	this._lastEvent = false;
	this._init();

}

draggable.prototype = {
	getId:function(){
		return this._element.attr('id');
	},
	getElement:function(){
		return this._element;
	},
	getTargetId:function(){
		return this._target.attr('id');
	},
	_init:function(){
		this._attached = [];
		this._position = {left:0,top:0};
		this.move(this._element.getPosition().left, this._element.getPosition().top);
		this._element.css({top:0,left:0,position:'absolute'});

		var me = this;

		this._element.hammer().on('dragstart',function(e){
			me._dragStart(e);
		});

		this._element.hammer().on('drag',function(e){
			me._drag(e);
		});

		this._element.hammer().on('dragend',function(e){
			me._dragEnd(e);
		});

		this._element._draggable = this;
		
	},
	_dragStart:function(e){
		e.preventDefault();
		this._lastEvent = false;
		this._dragStartPosition = this.getElementPosition();
		
		this.fire('dragstart',this);

		if (this._target){
			this._target.addClass('targeted');
		}
	},
	_dragEnd:function(e){
		this._lastEvent = false;		

		if (this._target){

			if (this.checkPosition()){
				if (this._opts.snap){
					this.setOnTarget();
				}
				this.fire('onTarget',this);
			}

			this._target.removeClass('targeted');
		}

		this.fire('dragend',this);
	},
	_drag:function(e){		
		e.preventDefault();
		e.stopPropagation();
		if (!this._lastEvent){
			try{
				this.move(e.gesture.deltaX,e.gesture.deltaY);
				this._lastEvent = e;
			} catch (e){
				this.error(e);
			}
		} else {				
			//if (e.timeStamp - this._lastEvent.timeStamp > this._delay){			
				try{		
					this.move(e.gesture.deltaX - this._lastEvent.gesture.deltaX ,e.gesture.deltaY - this._lastEvent.gesture.deltaY );
					this._lastEvent = e;
				} catch(e) {
					this.error(e);
				}
			//}
		}
	},
	revert:function(){
		this.setPosition( this._dragStartPosition.left, this._dragStartPosition.top );
		this.fire('revert',this._dragStartPosition);
	},
	error:function(e){

	},
	getPosition:function(){
		return this._position;
	},
	checkPosition:function(){			
		try{
			if (this._target && this._target.length > 0){

				var pos = this._element.offset(),
					tpos = this._target.offset();

// console.log(this._target[0].getBoundingClientRect())
//					console.log(tpos);
//					console.log(this._target.offset());

				if (pos.top + this._element.outerHeight() > tpos.top &&
					pos.left + this._element.outerWidth() > tpos.left &&
					pos.top < (tpos.top + this._target.outerHeight()) &&
					pos.left < (tpos.left + this._target.outerWidth())){					
					return true;					
				} else {
					return false;
				}
			}
		} catch (e){
			this.error(e);
		}
	},
	setOnTarget:function(){
		var tc = this._target.getCenter(),
			ec = this._element.getCenter();

		var dc = {left: tc.left - ec.left, top: tc.top - ec.top};
		
		this.move(dc.left,dc.top);
		//this.setPosition(0,0);
		//this._target.append(this._element);
	},
	getLimit:function(){
		return {
			top:this._limiter.position().top,
			left:this._limiter.position().left,
			right: this._limiter.width(),
			bottom:this._limiter.height(),
		}
	},
	setPosition:function(x,y){
		if (this._limiter){
			var limit = this.getLimit();
			
			x = x > limit.left ? x : limit.left;
			x = (x + this._element.outerWidth()) < limit.right ? x : limit.right - this._element.outerWidth();
			
			y = y > limit.top ? y : limit.top;
			y = (y + this._element.outerHeight()) < limit.bottom ? y : limit.bottom - this._element.outerHeight();
		}

		this._position.left= x;
		this._position.top = y;
		this._element._translate(
			this._position.left,
			this._position.top,
			0,
			1
		);
	},
	move:function(x,y){
		for (var i in this._attached){
			if (this._attached instanceof draggable ){
				this._attached[i].move(x,y);
			}
		}

		this.setPosition(this._position.left + x,this._position.top + y);
		this.fire('move',{left:x,top:y});
	},
	getTargetPosition:function(){
		return this._target.getPosition();
	},
	getElementPosition:function(){
		return this._element.getPosition();
	},
	getTarget:function(){
		return this._target;
	},
	getCss:function(){
		return [
			'#'+this._element.attr('id'),
			'{',
				'position:absolute',
				'left:'+this.getElementPosition().left+';',
				'top:'+this.getElementPosition().top+';',
			'}',
		].join('');
	}
}