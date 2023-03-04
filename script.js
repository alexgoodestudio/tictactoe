//pull tile selected by player info and add X or O for correspomding player


window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('#alert');

    //initialize all the positions on the board

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';

    /*if isGameActive is set to false that means the game has come to an end and that you
    no longer select any tiles until reset*/
    let isGameActive = true;



    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    //setting all possible winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
/*   this loop will run to check the tiles to see if it matches any
of the winning conditions. It starts by setting the round onw variable
to false and the using a forloop to run through the winning conditions
and if a condition is matched round won will become true. It will then
 change the value of roundwon to true, annouce the winner and set the 
 board to inactive. If all tiles have ben filled and no winningcondition
has been met the annoucer will display Tie */

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningCombinations[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }
/* switch to annouce which player won or if it was a tie and 
set the announcer HTML */
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };
// if statement to determine if player is choosing an available tile
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }else{
        return true;
        }
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

/*this function is for changing the player, using a ternary operator 
to route what to do based on the current player. and then 
update the text in the playerDisplay*/

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

/* this function takes a tile and index and check to see if 
the move was valid. The next step, if the last conditon was 
valid it will then call the updateBoard function to place
the corresponding players mark on the tile*/ 

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    /*reset board function  sets tiles all back to empty strings.
    it puts annoucer back to hidden f */
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
//Jquery calls for tile responsiveness and reset button
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});