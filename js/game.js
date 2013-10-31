function game(container){
	this._events = new events(this);
	this._container = $(container);

	this._scenes = [];
	this._init();
}

game.prototype = {
	_init:function(){
		var me = this;
		this._paneSelector = $('<div class="pane-selector"></div>');
		this._paneContainer = $('<div class="pane-container"></div>');
		this._container.append(this._paneSelector).append(this._paneContainer);

		this._container.find('.scenario').each(function(){
			

			var e = $(this);
			var container = $('<div></div>');
			var name = e.attr('name').replace(' ','');


			container.attr('id', 'scenario-'+name)
				.attr('scenario-name',name )
				.attr('name',e.attr('name') )
				.attr('transition',e.attr('transition'))
				.addClass('pane');
			
			me._paneContainer.append(container.append(this));
			me._setScene(this);

		});


		this._scroll = this._container.scroller();
		
		this._scroll.on('change',function(pane,prevPane){
			var prevScene = me._getSceneByPane(prevPane);
			prevScene.cancel();

			var scene = me._getSceneByPane(pane);

			scene.reset();
			scene.start();
		});
	},
	_getSceneByPane:function(pane){
		for (var i in this._scenes){
			if (this._scenes[i].getElement().parent().attr('id') == pane.attr('id')){
				return this._scenes[i];
			}
		}
		return false;
	},
	_setScene:function(container){
		var me = this;
		var scene = new scenario(container),
			game = scene.getGame();

		this._scenes.push( scene );


		/*
		game.on('complete',function(e){			
			me._next(container,this,e)
		});
		*/

		scene.on('complete',function(e){
			me._next(container,this,e)
		});

	},
	_next:function(container){		
		if (!this.isComplete()){
			this._scroll.next();
			this.fire('next',this);
		} else {
			this.fire('complete',this);
		}
	},
	isComplete:function(){
		is = true;
		for (var i in this._scenes){
			var game = this._scenes[i].getGame();
			
			if (!game.isComplete()){
				is = false;
			}
		}
		return is;
	},
}