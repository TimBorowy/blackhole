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

<script>
/*
//this code is no longer in use but i kept it anyway :) 
//http://www.elated.com/articles/drag-and-drop-with-jquery-your-essential-guide/
*/

/*var correctCards = 0;
$( init );
 
function init() {
 
	// Hide the success message
	$('#successMessage').hide();
	$('#successMessage').css( {
		left: '580px',
		top: '250px',
		width: 0,
		height: 0
	} );
 
	// Reset the game
	correctCards = 0;
	$('#cardPile').html( '' );
	$('#cardSlots').html( '' );

 
	for ( var i=1; i<=10; i++ ) {
		//player 1
		$('<div>' + i + '</div>').attr( 'id', 'card'+i ).attr('class', 'circle player1').appendTo( '#player1' ).draggable( {
			cursor: 'move',
			revert: true
		} );
		// player 2
		$('<div>' + i + '</div>').attr( 'id', 'card'+i ).attr('class', 'circle player2').appendTo( '#player2' ).draggable( {
			cursor: 'move',
			revert: true
		} );
	}
 
  	// Create the card slots
	for ( var x=6; x>=1; x-- ) {
		$('<div></div>').attr('class', 'fieldRow '+x).appendTo('.field');
		for ( var i=1; i<=x; i++ ) {
			$('<div></div>').appendTo( '.fieldRow.'+x ).droppable( {
				hoverClass: 'hovered',
				drop: handleCardDrop
			} );
		}
	}
 
}

function handleCardDrop( event, ui ) {
	var slotNumber = $(this).data( 'number' );
	var cardNumber = ui.draggable.data( 'number' );

	// If the card was dropped to the correct slot,
	// change the card colour, position it directly
	// on top of the slot, and prevent it being dragged
	// again

	//if ( slotNumber == cardNumber ) {
		ui.draggable.addClass( 'correct' );
		ui.draggable.draggable( 'disable' );
		$(this).droppable( 'disable' );
		ui.draggable.position( { of: $(this), my: 'center center', at: 'center center' } );
		ui.draggable.draggable( 'option', 'revert', false );
		correctCards++;
	//} 

	// If all the cards have been placed correctly then display a message
	// and reset the cards for another go

	if ( correctCards == 10 ) {
		$('#successMessage').show();
		//
	}
 
}*/


</script>
</html>