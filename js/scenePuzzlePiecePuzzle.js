function PiecePuzzle(config){
	Puzzle.call(this);
	this.init(config);
}

PiecePuzzle.prototype = new Puzzle();


PiecePuzzle.prototype.init = function(config){
	this._config = config;
	this.pieces = [];
	this.assets = [];
	
	if (config.background){
		this.setBackground(config.background);
	}

	this.assets = this.loadSprite(config.assets);	
	this.pieces = this.loadSprite(config.pieces);
	
	this.addTo(this._background);
	if (config.assets){
		this.loadSprite(config.assets);
	}

	this._limiter = this.getBounds();
	console.log(this._limiter)

	for (var i in this.pieces){
		this.pieces[i].setLimiter(this._limiter);
	}
	//this.showGuide(touchGuide);
}

PiecePuzzle.prototype.addTo = function(stage){
	this._stage = stage;
	this.showAssets(this.assets, this._stage);
	this.showAssets(this.pieces, this._stage);
}

