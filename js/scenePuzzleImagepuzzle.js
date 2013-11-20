function ImagePuzzle (config){
	Puzzle.call(this);
	this.init(config);
}

ImagePuzzle.prototype = new Puzzle();

ImagePuzzle.prototype.init = function(config){
	this._config = config;
	this.setBackground(config.background);
	this._stage = this._background;
	this._texture = new PIXI.BaseTexture.fromImage( config.image );
	this._grid = config.size;
	
	this._piecesize ={
		x : Math.floor( this._texture.width / this._grid.x ),
		y : Math.floor( this._texture.height / this._grid.y )
	};


	this.load();

	this.pieces = [];
	this._limiter = this.getBounds();
	this.divide();
	this.arrange();
	this.shuffle();
	
	this.addTo(this._background);
	if (this.assets){
		this.showAssets();
	}
}

ImagePuzzle.prototype.shuffle = function(){
	this.each(function(piece){
		piece.setPosition(piece.getSnap().x , piece.getSnap().y );
	});

	this.each(function(piece){	
		piece.animateTo(
		 Math.floor( Math.random() * this._limiter.width - this._piecesize.x ) + this._limiter.x,
			Math.floor( Math.random() * this._limiter.height - this._piecesize.y )+ this._limiter.y,500,500);
	});
}

ImagePuzzle.prototype.divide = function(){
	for (y=0; y<this._grid.y; y++){
		var me = this;

		for (x=0; x<this._grid.x; x++){

			var texture = new PIXI.Texture ( this._texture, {
				x:x * this._piecesize.x,
				y:y * this._piecesize.y,
				width : this._piecesize.x,
				height : this._piecesize.y
			});

			var d = new Draggable( new PIXI.Sprite(texture) );			
			d.setLimiter(this._limiter);
			d.setTolerance();
			d.setScale(0.7);
			d.onSnap = function(piece){me.onSnap(piece)};
			d.onMove = function(piece){me.checkComplete(piece)};
			
			this.pieces.push(d);
		}
	}
}

ImagePuzzle.prototype.onSnap = function(piece){
	this.sendToBack(piece);
}

ImagePuzzle.prototype.arrange = function(){		
	var py = 0,
		px = 0,
		count = 0;

	for (var y in this.pieces)	{						
		var pc = this.pieces[y];
		pc.position.x = px;
		pc.position.y = py;				
		pc.snapTo(px+ this._config.position.x,py +this._config.position.y);
		count++;
		px += pc.width;		

		if (count == this._grid.x){
			py += pc.height;
			count=0;
			px=0;
		}

	}
}

ImagePuzzle.prototype.each = function(fn){
	for (var y in this.pieces){
		fn.call( this, this.pieces[y],y);
	}
}

ImagePuzzle.prototype.addTo = function(stage){		
	this._stage = stage;
	this.each(function(piece){
		piece.addTo(this._background);
	});

}
