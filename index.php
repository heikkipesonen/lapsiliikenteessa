<html>
	<head>
	<title>Lapsi liikenteessä</title>
	<meta charset="utf-8">

	

<?php
	function startsWith($haystack, $needle)
	{
	    return !strncmp($haystack, $needle, strlen($needle));
	}

	function addCss($filename){
		echo '<link rel="stylesheet" type="text/css" href="'.$filename.'">';
	}

	function addScript($filename){
		echo '<script type="text/javascript" src="'.$filename.'"></script>';
	}

	$scripts = array(
		"../src/jquery-2.0.0.min.js",
		"../src/jquery.hammer.js",	
		"../src/jquery.transit.js",	
		"../jq.extend/jq.extend.js",
		"../events/events.js",
		"../draggable/draggable.js"
	);
	

	$js = scandir('js');

	foreach ($js as $key => $value) {
		if ($value != '.' && $value != '..' && !startsWith($value, '.')){
			$scripts[] = 'js/'.$value;
		}
	}


	$js = scandir('css');

	foreach ($js as $key => $value) {
		if ($value != '.' && $value != '..' && !startsWith($value, '.')){
			addCss('css/'.$value);
		}
	}


	foreach ($scripts as $script){
		addScript($script);
	}
?>

	</head>
	<script type="text/javascript">

	$(function(){
			document.body.addEventListener('touchmove',function(event){event.preventDefault()});
			var g = new game('#game-1');

			$('img').mousedown(function(e){
				e.preventDefault();
			});
	});

	</script>
	<body>
		<div id="wrapper">
		<?php
			include('html/game.html');
		?>
		</div>
	</body>
<script type="text/javascript">
   function animate() {
        requestAnimationFrame( animate ); // js/RequestAnimationFrame.js needs to be included too.
        TWEEN.update();
    }	
    animate();
</script>
</html>