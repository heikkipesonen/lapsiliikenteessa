function game(container){
	this._events = new events(this);
	this._container = $(container);

	this._scenes = [];
	this.init();
}

game.prototype = {
	init:function(){
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
				.addClass('pane');
			
			me._paneContainer.append(container.append(this));
			me._setScene(this);
		});


		this._scroll = this._container.scroller();
	},
	_setScene:function(scene){
		scene = $(scene);
		var me = this;

		if (scene.hasClass('puzzle')){
			
			var g = scene.puzzle();
			g.reset();
		
			if (scene.hasClass('shuffle')){
				g.shuffle();
			}
			
			g.on('complete',function(e){
				me._next(scene,this,e);
			});

			scene.find('.draggable').each(function(){
				$(this).draggable();
			});

			this._scenes.push(g);
		}
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
			if (!this._scenes[i].isComplete()){
				is = false;
			}
		}
		return is;
	},
}