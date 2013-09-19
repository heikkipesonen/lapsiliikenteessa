function puzzle(container){
	this._events = new events(this);
	this._element = $(container);
	this._piecesOnTarget = [];
	this._pieces = [];
	this._slots = [];
	this._init();
}

puzzle.prototype = {
	_init:function(){
		var me = this;
		var pcs = this._element.find('.piece');
		var slots =this._element.find('.slot');			

		$(pcs).each(function(){
			var pc = $(this).draggable( $(this).attr('target'),me._element.attr('container'));

			pc.on('onTarget',function(e){
				me._pieceOnTarget(this);
			});

			pc.on('dragstart',function(piece){
				me.removeOnTarget(piece);
			});

			me._pieces.push( pc );
		});

		this.shuffle();
	},
	shuffle:function(piece){
		var max_x = $(this._element.attr('container')).innerWidth(),
			max_y = $(this._element.attr('container')).innerHeight();
	
		if (!piece){		
			for (var i in this._pieces){
				var left = (Math.random() * max_x);
				var top = (Math.random() * max_y);
				
				this._pieces[i].setPosition(left,top);
			}
		} else {
			var left = (Math.random() * max_x);
			var top = (Math.random() * max_y);

			piece.setPosition(left,top);
		}
	},
	isComplete:function(){
		if (this.getPiecesOnTarget().length == this._pieces.length){
			return true;
		} else {
			return false;
		}
	},
	getPiecesOnTarget:function(){
		return this._piecesOnTarget;
	},
	hasPiece:function(target){
		for (var i in this._piecesOnTarget){
			if (target.attr('id') == this._piecesOnTarget[i].getTarget().attr('id')){
				return true;
			}
		}
		return false;
	},
	_hasPieceOnTarget:function(target){
		for (var i in this._piecesOnTarget){
			if (this._piecesOnTarget[i] == target){
				return true;
			}
		}
		return false;
	},
	removeOnTarget:function(piece){
		var pcs = [];
		for (var i in this._piecesOnTarget){
			if (this._piecesOnTarget[i] != piece){
				pcs.push(this._piecesOnTarget[i]);
			}
		}
		this._piecesOnTarget = pcs;
	},
	_pieceOnTarget:function(piece){
		if (this.hasPiece(piece.getTarget())){
			piece.revert();
		} else {
			piece.setOnTarget();

			if (!this._hasPieceOnTarget(piece)){
				this._piecesOnTarget.push(piece);
			}

			if (this._piecesOnTarget.length == this._pieces.length){
				this.fire('complete',this);
			}
		}
	}
}