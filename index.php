<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="style.css">
	<title>Blackhole</title>
</head>
<body>
	<div class="main flexContainer">
		<div class="flex player" id="player1"></div>

		<div class="flex fieldContainer">
			<div class="field">
				
			</div>
		</div>

		<div class="flex player" id="player2"></div>	
	</div>
	<button onclick="init()">Reset Game</button>
</body>

<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<script src="http://code.jquery.com/ui/1.8.21/jquery-ui.min.js"></script>
<script src="jquery.ui.touch-punch.min.js"></script>
<script src="blackhole.js"></script>

</html>