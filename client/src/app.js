let $ttt_board = document.getElementById('ttt_board');
let myCells = document.getElementsByClassName('cell');

// replace with http get return value;
let	game_state = [	'-',	'-', 	'-',
				 	'-',  	'-', 	'-',
				 	'-', 	'-', 	'-'		];

let row_0_state, row_1_state, row_2_state, 
	col_0_state, col_1_state, col_2_state,
	diagonal_0_state, diagonal_1_state, 
	row_0_win, row_1_win, row_2_win, 
	col_0_win, col_1_win, col_2_win,
	diagonal_0_win, diagonal_1_win, win_array, triplet_array;

let turn = 0;


const determineTripletStates = () => {
	row_0_state = game_state.slice(0,3);
	row_1_state = game_state.slice(3,6);
	row_2_state = game_state.slice(6,9);

	col_0_state = game_state[0].concat(game_state[3]).concat(game_state[6]).split(''); 
	col_1_state = game_state[1].concat(game_state[4]).concat(game_state[7]).split(''); 
	col_2_state = game_state[2].concat(game_state[5]).concat(game_state[8]).split('');

	diagonal_0_state =  game_state[0].concat(game_state[4]).concat(game_state[8]).split('');
	diagonal_1_state =  game_state[6].concat(game_state[4]).concat(game_state[2]).split('');
	triplet_array = [row_0_state, row_1_state, row_2_state, col_0_state, col_1_state, col_2_state, diagonal_0_state, diagonal_1_state];
	console.log(triplet_array);
}; 

const containsWin = (triplet) => {
	if(triplet.includes('-')) {
		return false;
	}
	for (let i = 1; i < triplet.length; i++) {
		if(triplet[i] !== triplet[0]) {
			return false;
		}
	}
	return true;	
};

const determineWinStates = () => {
	win_array = [row_0_win, row_1_win, row_2_win, col_0_win, col_1_win, col_2_win, diagonal_0_win, diagonal_1_win];
	for(let i = 0; i < triplet_array.length; i++) {
		win_array[i] = containsWin(triplet_array[i]);
	}
	console.log(win_array);
};

// replace with http get return value;

const determineTurn = () => {
	turn = game_state.filter( (cell) => cell !== '-').length;
	console.log(game_state);
	console.log(turn);
	return game_state.length;
};


// define a click handler function
const setCellState = (event) => {
	if(event.target.innerHTML === '-' ) {
		determineTurn();
		event.target.innerHTML = turn % 2 === 0 ? 'X' : 'O';
	}
	for(let i = 0; i < game_state.length; i++) {
		game_state[i] = document.getElementsByClassName('cell')[i].innerHTML
	};
	determineTripletStates();
	determineWinStates();
	for(let i = 0; i < win_array.length; i++) {
		if (win_array[i]) {
			console.log('winning row vals:', triplet_array[i]);
			if (triplet_array[i][0] === 'X') {
				alert('Xs win!');
				return triplet_array[i];
			} 
			if (triplet_array[i][0] === 'O') {
				alert('Os win!');
				return triplet_array[i];
			} 
		}
	}
	// send post request
	if(turn === 8) {
		alert('Tie!');
	}
};

// change all cells based on an array

const drawBoard = () => {
 	for(let i = 0; i < myCells.length; i++) {
		myCells[i].innerHTML = game_state[i];
		if(myCells[i].innerHTML !== '-') {
			myCells[i]
		}
		// disable Xs and Os
  	}
};

// reset the board
const resetBoard = () => {
	game_state = [	'-', '-', '-', 
				 	'-', '-', '-', 
			 		'-', '-', '-'	];
	drawBoard();
	determineTurn();
	determineTripletStates();
	determineWinStates();
	// send post request
};

const getGameState = () => {

};

const onReady = () => {
	// send get request
	for (let i = 0; i < myCells.length; i++) {
		myCells[i].addEventListener('click', setCellState);
	}
	drawBoard();
	determineTurn();
	determineTripletStates();
	determineWinStates();
	document.getElementById('reset_button').addEventListener('click', resetBoard);
};