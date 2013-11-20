// main menu screen with option buttons
var startScreen = {
	type:'Option', // which kind of scene , check Scenario.js for types
	pieces:[
		{
			position: {x:787,	y:219},	// position of image
			asset:'res/character.png', // image to show
			value:'1',	 // what is the result value for clicking this item
			draggable:true // is the piece draggable
		},
		{
			position: {x:400,	y:219},
			asset:'res/character.png',
			value:false,
			draggable:true
		},
		{
			position: {x:36,	y:219},
			asset:'res/character.png',
			value:false,
			draggable:true
		}
	]
}





var option = {
	type:'Option',
	background:'res/street-1.jpg', // fullscreen background for scene
	assets:[
		{
			position:{x:12,y:338},
			asset:'res/character-2.png',
			value: false
		}
	],
	pieces:[
		{
			position: {x:787,	y:219},
			asset:'res/traffic-light.png',
			value:'1',
		},
		{
			position: {x:200,	y:219},
			asset:'res/traffic-light.png',
			value:'1'		
		}
	]
}

var ok = {
	type:'SplashScreen',
	image:'res/happyface.png',
	anchor:{x:0.5,y:0.5},
	position:{x:512,y:384},
	duration:2000
}

var touchGuide = {
	type:'Guide',
	image:'res/touch.png',
	anchor:{x:0.5,y:0.5},
	position:{x:512,y:384}
}

var housePuzzle = {
	type:'ImagePuzzle',
	background:'res/house-background.jpg',
	image:'res/house.jpg',
	size:{x:3,y:3},
	position:{x:0,y:0}
}

var trafficLightPuzzle = {
	type:'ImagePuzzle',
	background:'res/street-blurred.jpg',
	image:'res/trafficlight-puzzle.png',
	position:{x:330,y:0},
	size:{x:3,y:4},
	after:ok,
}

var characterPuzzle = {
	type:'ImagePuzzle',
	background:'res/street-2.jpg',
	image:'res/character-2.png',
	position:{x:4,y:369},
	size:{x:2,y:3},
	after:ok,
}

var streetCrossing = {
	type:'PiecePuzzle',
	background:'res/streetWithSchool.jpg',
	pieces:[
		{
			position:{x:4,y:364},
			asset:'res/character-2.png',
			target:{x:900,y:364},
			draggable:true			
		}
	],
	assets:[
		{
			position: {x:787,	y:219},
			asset:'res/traffic-light-green.png',
		},
		{
			position: {x:200,	y:219},
			asset:'res/traffic-light-green.png',
		}
	],
	after:ok,	
}

var clothing = {
	type:'PiecePuzzle',
	background:'res/house.jpg',
	assets:[
		{
			position:{x:682,y:364},
			asset:'res/character.png'
			
		}
	],
	pieces:[
		{
			position: {x:0,	y:334},
			target:{x:724, y:365},
			asset:'res/helmet.png',
			draggable:true
		},
		{
			position: {x:0,	y:504},
			target:{x:728, y:544},
			asset:'res/vest.png',
			draggable:true
		},
		{
			position: {x:0,	y:560},
			target:{x:701, y:595},
			asset:'res/reflector.png',
			draggable:true
		}
	],
	after:ok,
}
