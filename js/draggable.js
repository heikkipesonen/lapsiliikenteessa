function Draggable(sprite){
	if (sprite){	
		this.init(sprite);
	}
}

Draggable.prototype = {
	tolerance:{x:100,y:100},
	position:{x:0,y:0},
	lastPosition:false,
	button:false,
	velocity:{x:0,y:0,d:0},
	tween:false,
	moved:false,
	_scale:{x:1,y:1},
	_touchStartTime:0,
	init:function(sprite){
		var me = this;
		if (typeof(sprite) == 'string') sprite = this.getSprite(sprite);
		this.sprite = sprite;

		this.width = this.sprite.width;
		this.height = this.sprite.height;
		this.sprite.setInteractive(true);
		
		this.anchor = this.sprite.anchor;
		this.scale = this.sprite.scale,
		this.position = this.sprite.position;
		this.rotation = this.sprite.rotation;

		this.sprite.mousedown = this.sprite.touchstart = function(e){me._mousedown(e)};		 
		this.sprite.mouseup = this.sprite.touchend =  function(e){me._mouseup(e)};		 
		this.sprite.mouseupoutside = this.sprite.touchendoutside =  function(e){me._mouseup(e)};
		this.sprite.mousemove = this.sprite.touchmove =  function(e){me._mousemove(e)};		
	},
	setTolerance:function(x,y){
		if (!x){
			this.tolerance.x = this.sprite.width;			
		} else {
			this.tolerance.x = x;
		}

		if (!y){
			this.tolerance.y = this.sprite.height;
		} else {
			this.tolerance.y = y;
		}
	},
	animateTo:function(tox,toy,time,delay){
		var me = this;
		this.tween = new TWEEN.Tween({x:this.position.x,y:this.position.y}).delay(delay).to({x:tox,y:toy},time).onUpdate(function(){
			me.setPosition(this.x,this.y);
		}).easing(TWEEN.Easing.Elastic.InOut).start().onComplete(function(){
			me.tween = false;
		});
	},
	getSnap:function(){
		return this._snap;
	},
	animating:function(){
		return this.tween != false;
	},
	click:function(e){
		return;
	},
	snapTo:function(x,y){
		this._snap = {x:x, y:y};
	},
	onMove:function(){
		return;
	},
	onSnap:function(){
		return;
	},
	addTo:function(stage){
		if (stage) this._stage = stage;
		this._stage.addChild(this.sprite);
	},
	hide:function(){
		this._stage.removeChild(this.sprite);
	},
	setLimiter:function(limiter){
		this._limiter = limiter;
	},
	_mousemove:function(e){
		if (this.animating()) return;
		if (this.button && this.lastPosition && e.target == this.sprite){
		
			var dx = e.global.x - this.lastPosition.x,
				dy = e.global.y - this.lastPosition.y;

			this.move(dx,dy);

			this.velocity = {
				x: dx / (e.originalEvent.timeStamp - this.lastPosition.timeStamp),
				y: dy / (e.originalEvent.timeStamp - this.lastPosition.timeStamp),
				d: Math.sqrt( Math.pow( dx , 2) + Math.pow( dy, 2))
			}
		}

		this.lastPosition = {
				x:e.global.x,
				y:e.global.y,
				timeStamp:e.originalEvent.timeStamp
			};
	},
	_mousedown:function(e){
		var me = this;	
		this._touchStartTime = e.originalEvent.timeStamp;
		if (this._stage){
			this._stage.removeChild(this.sprite);
			this._stage.addChild(this.sprite);			
		}
		var t = new TWEEN.Tween({scale:this._scale.x}).to({scale:1},100).onUpdate(function(){
			me.sprite.scale.x  = this.scale;
			me.sprite.scale.y  = this.scale;			
		}).start();

		this.lastPosition = {
				x:e.global.x,
				y:e.global.y,
				timeStamp:e.originalEvent.timeStamp
			};

		this.button = true;
	},
	_mouseup:function(e){
		var me = this;
		if (this.animating()) return;
		if (e.originalEvent.timeStamp - this._touchStartTime < 300){
			this.click(this);
		}

		this.button = false;
		this.lastPosition = false;


		if (game.dev){
			console.log(this.sprite.position.x +':'+ this.sprite.position.y);
		}
		
		if (this.velocity.d){
			var time = Math.max( this.velocity.d )* 10;
			this.moved = true;
		}	

		var t = new TWEEN.Tween({scale:this.scale.x}).to({scale:this._scale.x},100).onUpdate(function(){
			me.scale.x  = this.scale;
			me.scale.y  = this.scale;
		}).start();

		if (this._checkSnap()){			

		} else {
			this.onMove(this);
		}
	},
	_checkSnap:function(){
		var me = this;
		if (this._snap){		
			if (( Math.abs(this.position.x - this._snap.x) <= this.tolerance.x ) && 
				( Math.abs(this.position.y - this._snap.y) <= this.tolerance.y )){
				
				if (this.tween) return;

				this.tween = new TWEEN.Tween({x:this.position.x, y: this.position.y,scale:this.scale})
							.to({x:this._snap.x,y:this._snap.y,scale:1}, 200 )
							.easing(TWEEN.Easing.Elastic.Out)
							.onUpdate(function(){
								me.setPosition(this.x, this.y);
								me.scale.x = this.scale;
								me.scale.y = this.scale;
							}).onComplete(function(){me.tween = false; me.onSnap(me);me.onMove(me);}).start();
				return true;
			}
		}
		return false;
	},
	isInPosition:function(){
		if (this._snap){			
			if (( Math.abs(this.position.x - this._snap.x) <= this.tolerance.x ) && 
				( Math.abs(this.position.y - this._snap.y) <= this.tolerance.y )){
				return true;
			}
		}			
		return false;
	},
	setScale:function(x,y){
		if (!y){
			y = x;
		}
		this._scale = {x:x,y:y};

		this.scale.x = x;
		this.scale.y = y;
	},
	getSprite:function(image){
		return new PIXI.Sprite( new PIXI.Texture.fromImage( image ));	
	},
	move:function(x,y){	
		this.setPosition( this.sprite.position.x + x, this.sprite.position.y + y);
	},
	setPosition:function(x,y){
		
		if (this._limiter){
			x = x < this._limiter.x ? this._limiter.x : x > (this._limiter.x + this._limiter.width) - this.sprite.width ? (this._limiter.x + this._limiter.width) - this.sprite.width : x;
			y = y < this._limiter.y ? this._limiter.y : y > (this._limiter.y + this._limiter.height) - this.sprite.height ? (this._limiter.y + this._limiter.height) - this.sprite.height : y;
		}

		this.position.x = x;
		this.position.y = y;
		this.sprite.rotation = this.rotation;
	}
}
