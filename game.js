function game(container){
	this._events = new events(this);
	this._container = $(container);
	this._paneContainer = this._container.find('.pane-container');
	this._panes = this._container.find('.pane');

	this._paneSelector = this._container.find('.pane-selector');

	var me = this;
	this._panes.each(function(){
		var selector = $('<div class="pane-select" show-pane="'+$(this).attr('id')+'"></div>');
		selector.append( '<h3>'+$(this).attr('scenario-name')+'</h3>' );
		me._paneSelector.append( selector );
	});

	this.scale();

	this._paneSelector.hammer().on('tap','.pane-select',function(e){
		me.showPane( me.getPane($(this).attr('show-pane')) );
	});

	$(window).resize(function(){
		me.scale();
	})
}

game.prototype = {
	getPane:function(id){
		return this._container.find('#'+id);
	},
	scale:function(){
		var count = this._paneSelector.children().length,
			w = this._paneSelector.innerWidth() / count,
			me = this,
			counter = 0;

		this._paneSelector.children().each(function(){
			
			$(this).css({
				width:w,
			});
		});

		this._panes.each(function(){
			$(this).css({
				position:'absolute',
				top:'0px',
				width:me._paneContainer.innerWidth() / 3,
				height:'100%',
				left: (me._paneContainer.innerWidth() / 3) * counter
			});
			counter++;
		});

		if (this._visiblePane){
			this.showPane(this._visiblePane);
		}
	},
	showPane:function(pane){
		if (typeof(pane) == 'string'){
			pane = this._container.find(pane);
		}
		if (pane){		
			var left = pane.position().left;

			this._paneContainer.transit({
				left:-left
			},300);

			this.fire('showpane',pane);
			this._visiblePane = pane;
		}
	}
}