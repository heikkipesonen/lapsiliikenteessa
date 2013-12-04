// main menu screen with option buttons
var sc = {};

sc.logo = {
	type:'SplashScreen',
	image:'res/liikenneturva.jpg',
	duration:3000
}

sc.startScreen = {
	type:'SplashScreen', // which kind of scene , check Scenario.js for types
	image:'res/startscreen.png',
}

sc.option = {
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

sc.ok = {
	type:'SplashScreen',
	image:'res/happyface.png',
	anchor:{x:0.5,y:0.5},
	position:{x:512,y:384},
	duration:2000
}

sc.touchGuide = {
	type:'Guide',
	image:'res/touch.png',
	anchor:{x:0.5,y:0.5},
	position:{x:512,y:384}
}

sc.housePuzzle = {
	type:'ImagePuzzle',
	background:'res/house-background.jpg',
	image:'res/house.jpg',
	size:{x:3,y:3},
	position:{x:0,y:0}
}

sc.suojatiePuzzle = {
	type:'ImagePuzzle',
	background:'res/StreetWithSchool_suojatie.jpg',
	image:'res/suojatie.png',
	size:{x:2,y:2},
	position:{x:233,y:592},
	after:sc.ok,
/*
	assets:[{
			position:{x:4,y:364},
			asset:'res/character-2.png',
			target:{x:900,y:364},
		}]
*/
}


sc.trafficLightPuzzle = {
	type:'ImagePuzzle',
	background:'res/street-blurred.jpg',
	image:'res/trafficlight-puzzle.png',
	position:{x:330,y:0},
	size:{x:3,y:3},
	after:sc.ok,
}

sc.characterPuzzle = {
	type:'ImagePuzzle',
	background:'res/street-2.jpg',
	image:'res/character_cap.png',
	position:{x:4,y:369},
	size:{x:2,y:3},
	after:sc.ok,
}

sc.streetCrossing = {
	type:'PiecePuzzle',
	background:'res/StreetWithSchool.jpg',
	pieces:[
		{
			position:{x:4,y:364},
			asset:'res/character_cap.png',
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
	after:sc.ok,	
}

sc.goOut = {
	type:'PiecePuzzle',
	background:'res/house_2.jpg',
	pieces:[
		{
			position:{x:206,y:364},
			target:{x:761,y:370},
			asset:'res/character_cap.png',
			draggable:true
		},
	],	
}

sc.clothing = {
	type:'PiecePuzzle',
	background:'res/house.jpg',
	assets:[
		{
			position:{x:682,y:364},
			asset:'res/character.png'
			
		},
	],	
	pieces:[
		{
			position: {x:0,	y:334},
			target:{x:731, y:390},
			asset:'res/cap.png',
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
	after:sc.ok,
}
