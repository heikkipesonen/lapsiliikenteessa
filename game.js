function game(container){
	this._container = $(container);
	this._paneContainer = this._container.find('.pane-container')

	this.showPane(this._container.find('#right-pane'));
}

game.prototype = {
	showPane:function(pane){
		var left = pane.position().left;

		this._paneContainer.transit({
			left:-left
		},300);
	}
}