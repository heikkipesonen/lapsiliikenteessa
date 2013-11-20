function DraggablePiece(sprite){
	Draggable.call(this);
	this.init(sprite);
}

DraggablePiece.prototype = new Draggable();


DraggablePiece.prototype.init = function(sprite){
	if (typeof(sprite) == 'string') sprite = this.getSprite(sprite);
	this.sprite = sprite;
	this.setSprite();
	this.setBorders();
}

DraggablePiece.prototype.setSprite = function(){
	var me = this;
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
}

DraggablePiece.prototype.getBorders = function(color,width,alpha){
	if (!color){
		color = 0xFFFFFF;
	}
	if (!width){
		width = 10;
	}
	if (!alpha){
		alpha= 0.3;
	}
	var overlay = new PIXI.Graphics();
		overlay.beginFill(color,alpha);
		overlay.drawRect(this.sprite.position.x-width,this.sprite.position.y-width,this.sprite.width+2*width,this.sprite.height+2*width);
		overlay.endFill();

		overlay.height = this.sprite.height;
		overlay.width = this.sprite.width;

	return overlay;
}

DraggablePiece.prototype.setBorders = function(){
/*
	if (this._border === this.sprite) return;

	if (!this._border){
		var border = this.getBorders();
			border.addChild(this.sprite);
		this._border = border;
	}

	this.sprite.setInteractive(false);
	this.sprite = this._border;
	this.setSprite();
*/
}

DraggablePiece.prototype.removeBorders = function(){
/*
	if (this.sprite != this._border) return;
	this.sprite = this._border.getChildAt(0);
	this.sprite.visible = false;
	this._stage.removeChild(this._border);
	this._stage.addChild(this.sprite);
	this.sprite.setInteractive(true);
	this.sprite.visible = true;
	this.setSprite();
*/
}


DraggablePiece.prototype.hideBorder = function(){
	//this._border.alpha = 0.1;
}

DraggablePiece.prototype.showBorder = function(){
	//this._border.alpha = 1;
}

DraggablePiece.prototype._checkSnap = function(){
	var me = this;
	if (( Math.abs(this.position.x - this._snap.x) <= this.tolerance.x ) && 
		( Math.abs(this.position.y - this._snap.y) <= this.tolerance.y )){
		
		if (this.tween) return;

		this.hideBorder();

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
	this.showBorder();
	return false;
}

DraggablePiece.prototype._mousedown = function(e){
	var me = this;	
	this.setBorders();
	this._touchStartTime = e.originalEvent.timeStamp;
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
}