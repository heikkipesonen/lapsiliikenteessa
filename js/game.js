function game(container){
	this._events = new events(this);
	this._container = $(container);

	this._scenes = [];

	this._paneSelector = $('<div class="pane-selector"></div>');
	this._paneContainer = $('<div class="pane-container"></div>');
	this._container.append(this._paneSelector).append(this._paneContainer);

	if (this._container.attr('dev')){
		if (this._container.attr('dev') == 'true'){
			this._container.find('.slot, .ukko, .option, .piece').addClass('dev draggable');

		}
	}

	// wait until images are loaded
	this.preload(function(e){
		if (e){
			this._init();			
		} else {
			console.log('pere')
		}
	});
}

game.prototype = {
	setSize:function(){
		this._container.find('[size]').each(function(){
			var size = $(this).attr('size').split(',');

			$(this).css({
				width:size[0],
				height:size[1]
			});							
		});

		this._container.find('[position]').each(function(){
			var pos = $(this).attr('position').split(',');
			console.log($(this).attr('id') + '-pos '+pos.join(':'))
			$(this).css({
				position:'absolute',
				left:pos[0],
				top:pos[1]
			});
		});

		this._container.find('[autosize]').each(function(){
			if ($(this).attr('autosize')=='true'){
				
				var img = $(this).find('img');
				if (img.length > 0){				

					$(this).css({						
						width:img.width(),
						height:img.height()
					});

					if ($(this).attr('target')){
						$($(this).attr('target')).css({
							width:img.width(),
							height:img.height()							
						});
					}
				}
			}
		})
	},
	preload:function(callback){
		var me = this,
			images = [],
			counter = 0;

		var timeout = setTimeout(function(){
			if (callback){
				callback.call(me,false);
			}
		},60000);

		this._container.find('img').each(function(){
			var img = new Image();
			img.src = $(this).attr('src');
			images.push(img);

			img.onload = function(){
				counter++;
				chkLoaded();
			}

			img.onerror = function(){
				counter++;
				chkLoaded();
			}

			function chkLoaded(){
				if (counter == images.length && callback){
					callback.call(me, images);
					clearTimeout(timeout);
				}
			}
		});
	},
	_init:function(){
		var me = this;
		
		this.setSize();

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
			game = scene.getScenario();

		this._scenes.push( scene );

		scene.on('complete',function(e){
			
			if (e.getScore){
				console.log(this.getScenario());
				console.log(e.getScore())
			}
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
			var game = this._scenes[i].getScenario();
			
			if (!game.isComplete()){
				is = false;
			}
		}
		return is;
	},
}