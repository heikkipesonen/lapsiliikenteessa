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
	);

	$lib = scandir('lib');

	foreach ($lib as $key => $value) {
		if ($value != '.' && $value != '..' && !startsWith($value, '.')){
			$scripts[] = 'lib/'.$value;
		}
	}

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


	$temp_assets = scandir('res');
	$assets = array();
	foreach ($temp_assets as $key => $value) {
		if ($value != '.' && $value != '..' && !startsWith($value, '.')){
			$assets[] = $value;
		}
	}

	echo '<script type="text/javascript">';
	echo 'var ASSETS=["'.implode($assets,'","').'"];';
	echo '</script>';

	foreach ($scripts as $script){
		addScript($script);
	}

?>
		<meta name="apple-mobile-web-app-capable" content="yes">
	</head>
	<style type="text/css">
		body{
			margin:0px;
			padding:0px;
		}
	</style>
	<script type="text/javascript">


	$(function(){
		document.body.addEventListener('touchstart',function(e){
			e.preventDefault();
		});

		game.init();
	});

	</script>
	<body>
	</body>
</html>