/*

	liikenneturva game


	heikki pesonen 2013
*/

var game = {
	dev:false,
	_assetFolder:'res',
	assets:ASSETS, // this actually comes from php which reads the directories for assets
	screen:{x:1024, y: 768}, // ipad screen size, base screen size of the game, scaled to this aspect ratio and according to.
	// initial variables
	stage : false,
	_stage: false,
	renderer : false,
	loader:false,
	scenario: false,
	// draggable object movement scale factor
	_scale:{
		x:1,
		y:1
	},
	init:function() {
		game.load(); // start loading images and stuff
		this._stage = new PIXI.Stage(0xFFFFFF, true); // pixi renderer and stage init
		//5cc35a
		this.stage =  game.getOverlay(); // fake stage for scaling up the whole scene at once
		this.renderer = new PIXI.autoDetectRenderer(window.innerWidth,window.innerHeight);		
		
		document.body.appendChild(this.renderer.view); // add the view to the screen
		
		this._stage.addChild(this.stage);
		this.scale();

		$(window).resize(function(){
			game.scale();
		});
	},
	getOverlay:function(color,alpha){
		if (!color){
			color = 0x00FF00;			
		}
		if (!alpha){
			alpha= 0.3;
		}
		var overlay = new PIXI.Graphics();
			overlay.beginFill(color,alpha);
			overlay.drawRect(0,0,window.innerWidth.x,window.innerHeight);

		return overlay;
	},	
	scale:function(){
		/*

			scale the scene according to screen size
			except of course the ios7
		*/

		var maxH = window.innerHeight,
			maxW = window.innerWidth,
			aspect = this.screen.x / this.screen.y;

		var scaleWidth = maxW / this.screen.x,
			scaleHeight = maxH / this.screen.y;

		if ((this.screen.x * scaleHeight) > maxH && (this.screen.y * scaleWidth) < maxH){
			this.stage.scale.x = this.stage.scale.y = scaleWidth;
		} else {
			this.stage.scale.x = this.stage.scale.y = scaleHeight;
		}

		this.renderer.resize(window.innerWidth, window.innerHeight);

		// renderer resize as window size changes
		this.stage.position.y = (window.innerHeight/2) - ((this.stage.scale.y * this.screen.y)/2);
		this.stage.position.x = (window.innerWidth/2) - ((this.stage.scale.x  * this.screen.x)/2);

		this._scale = this.stage.scale; // draggable object reference scale, so things move correct distances
	},
	load:function(){
		// preloading all assets, in other words, images
		for (var i in game.assets){
			game.assets[i] = game._assetFolder+'/'+game.assets[i];
		}
		
		game.loader = new PIXI.AssetLoader( game.assets );
		game.loader.onComplete = game.loaded;	
		game.loader.load();
	},
	loaded:function(){		
		// define the games, or stories		
		game.scenario = new Scenario(game.stage,[
			sc.logo,
			sc.startScreen,
			sc.clothing,
			sc.goOut, 
			sc.characterPuzzle, 
			sc.trafficLightPuzzle, 
			sc.streetCrossing
		]);

		//game.scenario = new Scenario(game.stage,[sc.logo,sc.goOut,sc.goOut]);
		game.scenario.init();
		game.scenario.show(game.stage);

		// game complete functionality
		game.scenario.onComplete = function(){
			game.scenario.hide();
			game.loaded();
		};

		game.update(); // ticker update
	},
	update:function(){		
		// ticker function, one frame of the game
		requestAnimFrame(game.update);
		game.renderer.render(game._stage);
		TWEEN.update();	
	}
}
