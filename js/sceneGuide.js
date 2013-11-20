function Guide(config){
	Scene.call(this);
	this.init(config);	
}

Guide.prototype = new Scene();

Guide.prototype.init = function(config){
	this._config = config;
	this._stage = this.getSprite(config.image);
	this.setPosition(this._stage,config);
	this.initInteraction(this._stage);
}

Guide.prototype.show = function(stage){
	var me = this;
	if (this.tween){
		this.tween.stop();
	}

	this.__stage = stage;
	stage.addChild(this._stage);

	this.tween = new TWEEN.Tween({alpha:0})
				.to({alpha:1},300)
				.easing(TWEEN.Easing.Back.Out)
				.onUpdate(function(){
					me._stage.alpha = this.alpha;
				}).onComplete(function(){
					me.tween = false;
					me.onShow.call(me,me);
				}).start();
	
}

Guide.prototype.hide = function(){
	var me = this;
	if (this.tween){
		this.tween.stop();
	}

	this.tween = new TWEEN.Tween({x:this._stage.alpha})
				.to({alpha:0},300)
				.easing(TWEEN.Easing.Back.Out)
				.onUpdate(function(){
					me._stage.alpha = this.alpha;
				}).onComplete(function(){
					me._stage.visible = false;
					me.tween = false;	
					me.onHide.call(me,me);				
					me.__stage.removeChild(me._stage);
				}).start();	
}

Guide.prototype.click = function(e){
	this.onComplete(e);
}
