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

	$temp_assets = scandir('res');
	$assets = array();
	foreach ($temp_assets as $key => $value) {
		if ($value != '.' && $value != '..' && !startsWith($value, '.')){
			$assets[] = $value;
		}
	}
/*
	if (isset($_GET['palapeli'])){
		$temp = scandir('palapelit');
		$games = array();
	
		foreach ($temp as $key => $value) {
			if ($value != '.' && $value != '..' && !startsWith($value, '.')){
				$games[$value] = $value;
			}
		}


		if ($games[$_GET['palapeli']]){

			$handle = fopen('palapelit/'.$games[$_GET['palapeli']], "r");
			$conf = array();

			if ($handle) {
			    while (($line = fgets($handle)) !== false) {
					$t = explode(':', $line);
					if ($t[0] == 'paloja'){
						$t[1] = explode('x', $t[1]);
					}
					$conf[$t[0]] = $t[1];
			    }
			} else {
			    // error opening the file.
			}
		}
	} else {
		*/
		echo '<script type="text/javascript">';
		echo 'var ASSETS=["'.implode($assets,'","').'"];';
		echo '</script>';
	//}

	foreach ($scripts as $script){
		addScript($script);
	}

?>
		<meta name="apple-mobile-web-app-capable" content="yes">
	</head>
	<style type="text/css">
		body{
			position: absolute;
			margin:0px;
			padding:0px;
			height: 100%;
			width: 100%;
			overflow: hidden;
			background-color: #5cc35a;
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