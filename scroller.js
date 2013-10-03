function scroller(container,opts){
	this._events = new events(this);

	this._container = $(container);
	this._paneContainer = this._container.find('.pane-container');
	this._panes = this._container.find('.pane');

	this._paneSelector = this._container.find('.pane-selector');

	var me = this;

	this._panes.each(function(){
		var selector = $('<div class="pane-select" id="selector-of-'+$(this).attr('id')+'" show-pane="'+$(this).attr('id')+'"></div>');
		selector.append( '<h3>'+$(this).attr('name')+'</h3>' );
		me._paneSelector.append( selector );
	});

	this._paneSelector.hammer().on('tap','.pane-select',function(e){
		me.showPane( me.getPane( $(this).attr('show-pane')) );
	});

	this._visiblePane = this._panes.first();

	this.scale();

	$(window).resize(function(){
		me.scale();
	})
}

scroller.prototype = {
	getPane:function(id){
		return this._container.find('#'+id);
	},
	scale:function(){
		var count = this._paneSelector.children().length,
			w = this._paneSelector.innerWidth() / count,
			me = this,
			counter = 0;


		this._paneContainer.css({
			position:'absolute',
			top: this._paneSelector.outerHeight(),
			left:'0px',
			width:this._container.innerWidth()*this._panes.length,
			height:this._container.innerHeight() - this._paneSelector.outerHeight()
		});
		
		var left = 0;

		this._panes.each(function(){
			$(this).css({
				position:'absolute',
				top:'0px',
				left:left,
				height:me._paneContainer.innerHeight(),
				width:me._container.innerWidth()
			});		
			left += $(this).outerWidth();			
		});

		this._paneSelector.children().each(function(){
			$(this).css({
				width:w,
			});
		});

		if (this._visiblePane){
			this.showPane(this._visiblePane);
		}
	},
	next:function(){
		var res = this.showPane(this._visiblePane.next());
		this.fire('next',this,this._visiblePane,res);

		return res;
	},
	prev:function(){
		var res = this.showPane(this._visiblePane.prev());
		this.prev('next',this,this._visiblePane,res);

		return res;
	},
	showPane:function(pane){
		if (typeof(pane) == 'string'){
			pane = this._container.find(pane);
		}

		if (pane){		
			if (pane.position()){

				var left = pane.position().left;

				this._paneContainer.transit({
					left:-left
				},300);

				this.fire('showpane',pane);
				
				if (pane.attr('id') != this._visiblePane.attr('id')){
					this.fire('change',pane,this._visiblePane);
				}

				this._paneSelector.find('.selected').removeClass('selected');
				this._paneSelector.find('#selector-of-'+pane.attr('id')).addClass('selected');
				this._visiblePane = pane;
				return true;
			} else {
				return false;
			}
		}
	}
}