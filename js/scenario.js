/*

	storyline, scenario for the game

		runs multiple scenes in a row
		after one completes, the next one is created and shown

*/

function Scenario(stage,timeline){
	this._scenes = timeline; // timeline = array of scenario definitions given in config.js
	this._stage = stage; // pixi stage
	this._currentScene = false;
	this.scene = false;
}

Scenario.prototype = {	
	scenes:{
		// possible scenes to use in game
		ImagePuzzle:function(src){return new ImagePuzzle(src)},
		PiecePuzzle:function(src){return new PiecePuzzle(src)},
		SplashScreen:function(src){return new SplashScreen(src)},
		Option:function(src){return new Option(src)},
		Guide:function(src){return new Guide(src)},
	},
	isScene:function(type){
		return this.scenes[type] != undefined;
	},
	init:function(){
		this.setScene( this.next() );
	},
	setScene:function(scene){
		var me = this;
		if (this.scenes[scene.type]){
			this._currentScene = scene;
			this.scene = this.scenes[scene.type](scene);
			this.scene.onComplete = function(scene){
				
				if (scene._config){				
					if (scene._config.after){
						// mainly used for happy-face screen, not recursive because of things and stuff
						var _scene = me.scenes[scene._config.after.type](scene._config.after);
						_scene.show(me._stage);
						_scene.onComplete = function(){
							_scene.hide();
							me.onSceneComplete(scene);
						}
						return;
					}
				}
				me.onSceneComplete(scene);
			};
		}
		return this.scene;
	},
	onComplete:function(){
		
		console.log(this);

	},
	onSceneComplete:function(scene){
		this.setNext();
	},
	show:function(){		
		this.scene.show(this._stage);
	},
	hide:function(){
		this.scene.hide();
	},
	setNext:function(){
		if (this.next()){
			this.hide();
			this.setScene(this.next());
			this.show();
		} else {
			this.onComplete.call(this);
		}
	},
	next:function(){
		if (!this._currentScene){
			return this._scenes[0];
		}

		if (this._scenes.indexOf(this._currentScene) < this._scenes.length){						
			return this._scenes[this._scenes.indexOf(this._currentScene) +1];
		}

		return false;
	},
	prev:function(){
		if (!this._currentScene){
			return this._scenes[0];
		}

		if (this._scenes.indexOf(this._currentScene) > 0){
			return this._scenes[this._scenes.indexOf(this._currentScene) -1];
		}
		return false;		
	}
}