function SplashScreen(config){
	Scene.call(this);
	this.init(config);
}

SplashScreen.prototype = new Scene();

SplashScreen.prototype.init = function(config){
	this._config = config;
	this._stage = this.getOverlay();

	this._sprite = this.getSprite(config.image);
	this._stage.addChild(this._sprite);
	this.setPosition(this._sprite,config);
	this.initInteraction(this._sprite);

	if (this._config.duration){
		var me = this;
		this._timer = setTimeout(function(){me.onComplete()},this._config.duration);
		console.log('asdflkasdfjkalsdf')
	}
}

SplashScreen.prototype.click = function(e){
	if (this._timer) clearTimeout(this._timer);
	this.onComplete();
}