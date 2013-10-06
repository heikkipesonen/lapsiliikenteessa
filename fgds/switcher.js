$.fn.extend({
	switcher:function(items,opts){
		return new switcher(this,items,opts);
	}
});



function switcher(container,items,opts){
	this._events = new events(this);
	this._container = $(container);
	
	this._opts = opts || {
		tension:0.6,
		chageVelocity:1.5,
		speed:200,
		minIndex:false,
		maxIndex:false
	};

	this._items = items;

	this.init();
}

switcher.prototype = {
	init:function(){
		this._index = 0;
		this._delay = 10;
		this._lastEvent = false;
		this._paneContainer = $('<div id="sw-panecontainer"></div>');
		
		this._panes = [
			$('<div id="pane-1" class="sw-pane"></div>'),
			$('<div id="pane-2" class="sw-pane"></div>'),
			$('<div id="pane-3" class="sw-pane"></div>')
		];


		for (var i in this._panes){
			this._paneContainer.append(this._panes[i]);
			
			this._panes[i].css({
				'position':'absolute',
				'top':'0px',
				'left':'0px',
				'width':'100%',
				'height':'100%',
				'overflow':'hidden'
			});
		}

		this._paneContainer.css({
			width:'100%',
			height:'100%',
			'overflow':'hidden'
		});

		this._container.html(this._paneContainer);


		var me = this;

		this._container.hammer().on('drag',function(e){
			
			if (e.timeStamp > me._lastEvent.timeStamp + me._delay || me._lastEvent == false){			
				me._onDrag(e.gesture);
				e.preventDefault();
				me.fire('drag',e);
			}
		});

		this._container.hammer().on('dragstart',function(e){
			me._lastEvent = false;
			me._sw = false;
			e.preventDefault();
			me.fire('dragstart',e);
		});

		this._container.hammer().on('dragend',function(e){
			e.preventDefault();
			me.fire('dragend',e);
			me._dragEnd(e);
			me._lastEvent = false;
		});


		this.reset();
		$(window).resize(function(){
			me.reset();
		})
	},
	reset:function(){
		var startX = 0-this._container.innerWidth();
		for (var i in this._panes){
			this._panes[i]._translate(startX + (this._panes[i].outerWidth()*i));
		}
		this._setIndex();
		this._prevCenter = this._panes[1];
	},
	_eachpane:function(fn){
		for (var i in this._panes){
			fn.call(this._panes[i],i);
		}
	},
	_onDrag:function(e){
		var x = 0;
		if (this._lastEvent){
			x = e.deltaX - this._lastEvent.deltaX;
		} else {
			x = e.deltaX;
		}
		this.move(x);

		this._lastEvent = e;
	},
	_dragEnd:function(e){		
		if (this._lastEvent.velocityX > this._opts.chageVelocity || Math.abs(this._lastEvent.deltaX) > (this._opts.tension*this._panes[1].outerWidth())){
			if (this._sw == false){			
				if (this._lastEvent.direction == 'left'){
					this.next();
				} else {
					this.prev();
				}
			}
		} else if (this._getCenterOffset()){			
			this._animate(0-this._getCenterOffset());			
		}			
	},
	move:function(x){
		for (var i in this._panes){
			this._panes[i].move(x);
		}
		this._checkPosition();
	},
	_checkPosition:function(){
		if (this._panes[1].getPosition().left <= (0-this._panes[1].outerWidth()) ){		
			this._swRight();
			this._sw = true;			
		} else if (this._panes[1].getPosition().left >= this._panes[1].outerWidth() ){					
			this._swLeft();
			this._sw = true;						
		}
	},	
	_setIndex:function(){
		var c = -1;
		for (var i in this._panes){
			this._panes[i].attr('sw-index',this._index+c);
			c++;	
		}
	},
	_swLeft:function(){
		this._index--;
		this._panes[2]._translate( this._panes[0].getPosition().left - this._panes[2].outerWidth() );
		this._panes[2].attr('sw-index',this._index-1);
		this._panes.unshift( this._panes.pop() );
		this._checkChange();
	},
	_swRight:function(){
		this._index++;
		this._panes[0]._translate( this._panes[2].getPosition().left + this._panes[2].outerWidth() );
		this._panes[0].attr('sw-index',this._index+1);
		this._panes.push( this._panes.shift() );
		this._checkChange();
	},
	_getCenterOffset:function(){		
		return this._panes[1].getPosition().left;
	},
	next:function(){
		this._animate( -this._panes[2].getPosition().left );
		this.fire('next', this._panes[2] );		
	},
	prev:function(){
		this._animate( -this._panes[0].getPosition().left );		
		this.fire('prev', this._panes[0] );
	},
	_checkChange:function(){
		if (this._prevCenter != this._panes[1]){
			this.fire('change',this._panes[1],this._panes[1].attr('sw-index'));		
			this._prevCenter = this._panes[1];
		}
	},
	_animate:function(distance,duration){		
		var lastStep = 0,
			me = this;

		if (!this._dummy){
			this._dummy = $('<div />');
		}

		this._animating = true;
		this._dummy.stop();
		this._dummy.css('width','100px');

		this._dummy.animate({
			width:0
		},{
			step:function(step){
				var cdist = (step-100) * (distance/100);					
				me.move( -(cdist-lastStep));
				lastStep = cdist;
			},
			complete:function(){
				me._animating = false;
			},
			duration: duration || 200
		});			

		
	},
	setList:function(list){
		this._items = list;
	},
	getListItem:function(){
		if (this._items.length > 0){
			return this._getListItem( this._index );
		} else {
			return this._index;
		}
	},
	_getListItem:function(index){
		if (index >= this._items.length){
			return this._getListItem( index - this._items.length);
		}  else if (index < 0){								
			return this._getListItem(this._items.length + index);
		} else {
			return this._items[index];
		}
	},
	_getListIndex:function(index){
		if (index >= this._items.length){
			return this._getListIndex( index - this._items.length);
		}  else if (index < 0){								
			return this._getListIndex(this._items.length + index);
		} else {
			return index;
		}
	},
	_getListItemIndex:function(item){
		for (var i in this._items){
			if (this._items[i] == item){
				return i;
			}
		}
	},	
}