/*
--- BLACKHOLE ---
BY: Tim Borowy
CREATED: 06-04-2016
INSPIRATION: Tom Scott, as part of the 'game on' series on his youtube channel
https://www.youtube.com/watch?v=zMLE7a3faI4
*/

var placedCards, player1Counter, player2Counter, player, field, winner;

$( init );
 
function init() {
 
	// Reset the game
	placedCards = 0, player1Counter = 1, player2Counter = 1, player = 'player1';
	field = [
		[{}, ], 
		[{}, {}, ], 
		[{}, {}, {}, ], 
		[{}, {}, {}, {}, ], 
		[{}, {}, {}, {}, {}, ], 
		[{}, {}, {}, {}, {}, {}, ], 
	];

	$('#player1').html( '' );
	$('#player2').html( '' );
	$('.field').html( '' );

 	// Create play cards for players
	for ( var i=1; i<=10; i++ ) {
		//player 1
		$('<div>' + i + '</div>').attr( 'id', 'card'+i ).data('value', i).attr('class', 'circle player1').appendTo( '#player1' );
		// player 2
		$('<div>' + i + '</div>').attr( 'id', 'card'+i ).data('value', i).attr('class', 'circle player2').appendTo( '#player2' );
	}
 
  	// Create the card slots
	for ( var row=6; row>=1; row-- ) {
		$('<div></div>').attr('class', 'fieldRow '+row).appendTo('.field');
		for ( var col=1; col<=row; col++ ) {
			$('<div></div>').appendTo( '.fieldRow.'+row ).data('location', {x: col, y: row} ).droppable( {
				hoverClass: 'hovered',
				drop: handleCardDrop
			} );
		}
	}

	// start the game logic loop
	turnSwitcher();
 
}

function turnSwitcher() {

	if(player == 'player1'){

		$('.player1#card'+player1Counter).addClass('active').draggable( {
			cursor: 'move',
			revert: true
		} );
		player1Counter++

		player = 'player2';
	}
	else{
		$('.player2#card'+player2Counter).addClass('active').draggable( {
			cursor: 'move',
			revert: true
		} );
		player2Counter++

		player = 'player1';
	}
}

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function blackholeCalc(y, x){

	var topLeft, topRight, left, right, underLeft, underRight;
	var score1 = 0, score2 = 0;
	var blackhole= [];

	// exclude invalid fields
	if(y == 0 && x == 0){
		// lowest circle.
		topLeft = field[y+1][x];
		topRight = field[y+1][x+1];
		blackhole = [topLeft, topRight];
	}
	else if(y == 5){
		// top row.
		if(x == 0){
			// top left circle.
			right = field[y][x+1];
			underRight = field[y-1][x];
			blackhole = [right, underRight];
		}
		else if(x == 5){
			// top right circle.
			left = field[y][x-1];
			underLeft = field[y-1][x-1];
			blackhole = [left, underLeft];
		}
		else{
			// all other top row circles.
			left = field[y][x-1];
			right = field[y][x+1];
			underLeft = field[y-1][x-1];
			underRight = field[y-1][x];
			blackhole = [left, right, underLeft, underRight];
		}
	}
	else if(x == 0){
		// all the circles on the left side of the row with the 
		//exeption of the first and last because they are already filtered out.
		topLeft = field[y+1][x];
		topRight = field[y+1][x+1];
		right = field[y][x+1];
		underRight = field[y-1][x];
		blackhole = [topLeft, topRight, right, underRight];
	}
	else if(y == x){
		// ditto above comment but now for the right side.
		topLeft = field[y+1][x];
		topRight = field[y+1][x+1];
		left = field[y][x-1];
		underLeft = field[y-1][x-1];
		blackhole = [topLeft, topRight, left, underLeft];
	}
	else{
		// the 6 circles that are left that are in the middle of the triangle.
		topLeft = field[y+1][x];
		topRight = field[y+1][x+1];
		left = field[y][x-1];
		right = field[y][x+1];
		underLeft = field[y-1][x-1];
		underRight = field[y-1][x];
		blackhole = [topLeft, topRight, left, right, underLeft, underRight];
	}

	// loop through the previously filtered circles that are
	//sucked in the blackhole and count the player scores.
	for (var i = 0; i < blackhole.length; i++) {
		if(blackhole[i].player == 'player1'){
			score1 = score1 + blackhole[i].value;
		}
		else{
			score2 = score2 + blackhole[i].value;
		}
	};

	// todo: output this to the user
	console.log('player1 score = '+score1);
	console.log('player2 score = '+score2);

	if(score1 < score2) { winner = 'Player 1 (red)'; }
	else { winner = 'Player 2 (blue)'; }

	console.log('The player with the lowest score wins and that is: '+winner);
}

function handleCardDrop( event, ui ) {

	turnSwitcher(); // continue the game loop

	// begin jquery ui drag & drop gibberish
	ui.draggable.addClass( 'correct' );
	ui.draggable.draggable( 'disable' );
	$(this).droppable( 'disable' );
	ui.draggable.removeClass('active');
	ui.draggable.position( { of: $(this), my: 'center center', at: 'center center' } );
	ui.draggable.draggable( 'option', 'revert', false );
	// end jquery ui gibberish

	placedCards++;

	// set some vars for easy and readable playfield filling
	var yPos = $(this).data('location').y -1;
	var xPos = $(this).data('location').x -1;
	var cardValue = ui.draggable.data('value');
	
	// fill playfield array
	field[yPos][xPos] = {'player': player, 'value': cardValue};

	//console.log(field);

	// If all the cards have been placed correctly calculate winner and reset game
	if ( placedCards == 20 ) {
		// get coordinates of the 'Blackhole'
		for (var y = field.length - 1; y >= 0; y--) {
			for (var x = field[y].length - 1; x >= 0; x--) {
				if(isEmpty(field[y][x])){
					console.log(y+' '+x);
					blackholeCalc(y, x);
				}
			};
		};
	}
 
}

