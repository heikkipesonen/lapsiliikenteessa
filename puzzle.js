$.fn.extend({
	puzzle:function(){
		return new puzzle(this);
	}
})

function puzzle(container){
	this._events = new events(this);
	this._element = $(container);
	this._piecesOnTarget = [];
	this._pieces = [];
	
	this._init();
}

puzzle.prototype = {
	_init:function(){
		var me = this;
		var pcs = this._element.find('.piece');

		this._slotCount = this._element.find('.slot').length;

		this._container = $(this._element.attr('container'));
		if (!this.container || this._container.length < 1){
			this._container = this._element;
		} 

		$(pcs).each(function(){
			var pc = $(this).draggable( me._element.find( $(this).attr('target') ), me._container);

			pc.on('onTarget',function(e){
				me._pieceOnTarget(this);
			});

			pc.on('dragstart',function(piece){
				me._removeOnTarget(piece);
			});

			me._pieces.push( pc );
		});

		//this.shuffle();
	},
	start:function(){
		return true;
	},
	reset:function(){
		if (this._element.hasClass('shuffle')){
			this.shuffle();
		}
		this._piecesOnTarget = [];
	},
	shuffle:function(piece){

		var max_x = this._container.innerWidth(),
			max_y = this._container.innerHeight();
	
		if (!piece){		
			for (var i in this._pieces){
				var left = Math.random() * (max_x-this._pieces[i]._element.outerWidth());
				var top = Math.random() * (max_y-this._pieces[i]._element.outerHeight());
				
				this._pieces[i].setPosition(left,top);
			}
		} else {
			var left = (Math.random() * max_x);
			var top = (Math.random() * max_y);

			piece.setPosition(left,top);
		}
	},
	isComplete:function(){
		if (this.getPiecesOnTarget().length == this._slotCount){
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
	_removeOnTarget:function(piece){
		var pcs = [];
		for (var i in this._piecesOnTarget){
			if (this._piecesOnTarget[i] != piece){
				pcs.push(this._piecesOnTarget[i]);
			} else {
				
				console.log('asdfsadfdsa')
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

			if (this.isComplete()){
				this.fire('complete',this.getPiecesOnTarget());
			}
		}
	},
	cancel:function(){
		return true;
	}
}