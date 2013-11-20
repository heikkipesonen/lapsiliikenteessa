/*

	liikenneturva game


	heikki pesonen 2013
*/

var game = {
	dev:true,
	_assetFolder:'res',
	assets:ASSETS, // this actually comes from php which reads the directories for assets
	screen:{x:1024, y: 768}, // ipad screen size
	// initial variables
	stage : false,
	renderer : false,
	loader:false,
	scenario: false,
	init:function() {
		game.load(); // start loading images and stuff
		this.stage = new PIXI.Stage(0xFFFFFF, true); // pixi renderer and stage init
		this.renderer = new PIXI.autoDetectRenderer(game.screen.x,game.screen.y);		
		document.body.appendChild(this.renderer.view); // add the view to the screen
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
		//game.scenario = new Scenario(game.stage,[housePuzzle]);
		game.scenario = new Scenario(game.stage,[touchGuide,clothing,characterPuzzle,option,trafficLightPuzzle,streetCrossing]);
		game.scenario.init();
		game.scenario.show(game.stage);

		/*	
			todo multiple storylines, scenarios
			main menu
		*/

		/*
		game.scenario.onComplete = function(){
			game.scenario.hide();
			game.loaded();
		};
		*/
		game.update(); // ticker update

	},
	update:function(){		
		// ticker function, one frame of the game
		requestAnimFrame(game.update);
		game.renderer.render(game.stage);
		TWEEN.update();	
	}
}
