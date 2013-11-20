function Scene(){
}

Scene.prototype ={
	tween:false,
	interactionTime:0,
	load:function(config){
		if (!config) config = this._config;
		if (config.pieces){
			this.sprites = this.loadSprite(config.pieces);
		}

		if (config.assets){
			this.assets = this.loadSprite(config.assets);
		}
	},
	showAssets:function(assets, stage){
		if (!assets) assets = this.assets;
		if (!stage) stage = this._stage;
		for (var i in assets){
			if (assets[i] instanceof Draggable){
				assets[i].addTo(stage);
			} else {
				stage.addChild(assets[i]);			
			}
		}	
	},	
	showGuide:function(guide, position){
		var me = this;
		if (position) guide.position = position;
		this._guide = new Guide(guide);
		this._guide.show(this._stage);
		
		this._guide.onHide = function(){
			me._guide = false;
		}
	},
	setPosition:function(resource,config){
		if (config.position){
			resource.position.x = config.position.x;
			resource.position.y = config.position.y;			
		}

		if (config.scale){
			resource.scale.x = config.scale.x;
			resource.scale.y = config.scale.y;
		}

		if (config.anchor){
			resource.anchor.x = config.anchor.x;
			resource.anchor.y = config.anchor.y;
		}

		if (config.rotation){
			resource.rotation = config.rotation;
		}
	},
	extend:function(prop){
		for (var i in prop){
			this[i] = prop[i];
		}
		return this;
	},
	initInteraction:function(resource,config){
		var me = this;
		
		if (resource instanceof Draggable){
			return resource;
		}

		resource.interactive = true;			 
		resource.mousedown = resource.touchstart = function(e){me._mousedown(e,config)};
		resource.mouseup = resource.touchend =  function(e){me._mouseup(e,config)};		 
		resource.mouseupoutside = resource.touchendoutside =  function(e){me._mouseup(e,config)};
		resource.mousemove = resource.touchmove =  function(e){me.mousemove(e,config)};

		return resource;
	},
	addSprites:function(sprites,stage){
		if (!stage) stage = this._stage;
		if (!sprites) sprites = this._sprites;

		for (var i in sprites){		
			if (sprites[i] instanceof Draggable){
				sprites[i].addTo(stage);
			} else {
				this.initInteraction(sprites[i], this._config.pieces[i]);
				stage.addChild(sprites[i]);
			}
		}
	},
	sendToBack : function(piece){
		if (this._stage){
			for (var i in this.pieces){
				if (this.pieces[i] != piece){
					var _piece = this.pieces[i];
					if (this.pieces[i] instanceof Draggable){
						_piece = _piece.sprite;
					}
					this._stage.removeChild(_piece);
					this._stage.addChild(_piece);
				}
			}
		}	
	},
	loadSprite : function(asset){
		var me = this;
		if (asset){			
			if (asset instanceof Array){
				sprites = [];
				for (var i in asset){
					sprites.push( this.loadSprite(asset[i]));
				}
				return sprites;
			} else {
				var sprite = this.getSprite(asset.asset);
				
				if (asset.position){
					sprite.position = asset.position;
				}

				if (asset.rotation){
					sprite.rotation = asset.rotation;
				}


				if (asset.draggable === true){
					sprite = new Draggable(sprite);	
					sprite.click = function(e){me.click(e,asset)};

					if (asset.target){
						sprite.setTolerance();
						sprite.snapTo(asset.target.x, asset.target.y);
						var me = this;
						sprite.onMove = function(e){me.checkComplete(e)};
					}
				}

				return sprite;
			}
		}
	},
	getOverlay:function(color,alpha){
		if (!color){
			color = 0x00FF00;			
		}
		if (!alpha){
			alpha= 0.3;
		}
		var overlay = new PIXI.Graphics();
			overlay.beginFill(color,alpha);
			overlay.drawRect(0,0,game.screen.x,game.screen.y);

		return overlay;
	},
	_mousedown:function(e,config){
		this.interactionTime = e.originalEvent.timeStamp;
		this.mousedown(e,config);
	},
	_mouseup:function(e,config){
		if (e.originalEvent.timeStamp - this.interactionTime < 500){this.click(e,config)};
		this.mouseup(e,config);
	},
	click:function(){
		return;
	},
	mousedown:function(){
		return;	
	},
	mouseup:function(){
		return;
	},
	mousemove:function(){
		return;
	},
	init : function(){
	},
	setBackground: function(background){
		this._background = new PIXI.Sprite( new PIXI.Texture.fromImage( background) );		
	},
	getBounds:function(){
		return {x:this._background.position.x, y:this._background.position.y, width:this._background.width, height: this._background.height};
	},
	addChild:function(child){
		this._background.addChild(child);
	},
	removeChild:function(child){
		this._background.removeChild(child);
	},
	getSprite:function(image){
		return new PIXI.Sprite( new PIXI.Texture.fromImage( image ));	
	},
	onShow:function(){

	},
	onHide:function(){

	},
	show:function(stage){
		var me = this;
		if (this.tween){
			this.tween.stop();
		}
		
		this.__stage = stage;
		stage.addChild(this._stage);

		this.tween = new TWEEN.Tween({x:this._stage.width})
					.to({x:0},300)
					.easing(TWEEN.Easing.Back.Out)
					.onUpdate(function(){
						me._stage.position.x = this.x;
					}).onComplete(function(){
						me.tween = false;
						me.onShow.call(me,me);
					}).start();
		
	},
	hide:function(){
		var me = this;
		if (this.tween){
			this.tween.stop();
		}

		this.tween = new TWEEN.Tween({x:this._stage.position.x})
					.to({x:-this._stage.width},300)
					.easing(TWEEN.Easing.Back.Out)
					.onUpdate(function(){
						me._stage.position.x = this.x;
					}).onComplete(function(){
						me._stage.visible = false;
						me.tween = false;	
						me.onHide.call(me,me);				
						me.__stage.removeChild(me._stage);
					}).start();
	},
	onComplete : function(){

	},
	checkComplete:function(){

	},
	reset:function(){

	},
	start:function(){

	}
}