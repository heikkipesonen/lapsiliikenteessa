
function Option(config){
	Scene.call(this);
	this.init(config);
}

Option.prototype = new Scene();


Option.prototype.init = function(config){
	this._config = config;
	if (config.background){
		this._stage = this.getSprite(config.background);
	} else {
		this._stage = this.getOverlay();
	}

	this.load();
	this.addSprites(this.sprites);
	this.addSprites(this.assets);
	
	this.setPosition(this._stage,config);
}

Option.prototype.click = function(e,config){	
	if (config.value === false){
		console.log('ljksdafjklsadf')
	} else  {
		this.onComplete(config);
	}
}