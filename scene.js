function scene(parent,container){
	this._events = new events(this);
	this._element = $(container);

	parent.scene = this;
}

scene.prototype = {

}