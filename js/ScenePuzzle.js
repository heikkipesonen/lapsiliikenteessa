function Puzzle(){
	
}

Puzzle.prototype = new Scene();



Puzzle.prototype.onComplete = function(){

}

Puzzle.prototype.checkComplete = function(){
	var count = 0;
	for (var i in this.pieces){

		if (this.pieces[i].isInPosition() && this.pieces[i].moved){
			count++;
		}
	}

	if (count == this.pieces.length){
		this.onComplete.call(this,this);
	}

	return count == this.pieces.length;
}

Puzzle.prototype.onPosition = function(){

}

Puzzle.prototype.sort = function(piece){
/*
	this.pieces.sort(function(a,b){	
		if (a.isInPosition()){
			return -1;
		}

		return 1;
	});
*/
}