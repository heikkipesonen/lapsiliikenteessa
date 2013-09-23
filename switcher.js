function switcher(container,items,opts){
	this._events = new events(this);
	this._container = $(container);
	this.init();
}

switcher.prototype = {
	init:function(){
		this._paneContainer = $('<div id="sw-panecontainer"></div>');
		
		this._panes = [
			$('<div id="pane-1" class="sw-pane"></div>'),
			$('<div id="pane-2" class="sw-pane"></div>'),
			$('<div id="pane-3" class="sw-pane"></div>')
		];

		for (var i in this._panes){
			this._paneContainer.append(this._panes[i]);
			
			this._panes[i].css({
				'display':'inline-block',
				'vertical-align':'top',
				'width':(100/3) +'%',
				'heigth':'100%'
			});
		}

		this._paneContainer.css({
			width:'300%',
			heigth:'100%'
		});

		this._container.html(this._paneContainer);
	},

}