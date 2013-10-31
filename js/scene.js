function scene(container){
	this._events = new events(this);
	this._element = $(container);
}

scene.prototype = {
	reset:function(){
		this._init();
	},
	isComplete:function(){
		
	}
}