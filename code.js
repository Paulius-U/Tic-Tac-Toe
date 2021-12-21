window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
    const Name1 = document.getElementById('Name1');
    const Name2 = document.getElementById('Name2');
    const ScoreName1 = document.getElementById('scoreboard__name__1');
    const ScoreName2 = document.getElementById('scoreboard__name__2');
    const PlayGame = document.getElementById('playgame');
    const logInForm = document.getElementById('log_in');
    const gameboard = document.getElementById('board');
    const restartGameButton = document.getElementById('restartGame');
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    let CurrentScore1 = 0;
    let CurrentScore2 = 0;

    const  PLAYERX_WON = 'PLAYERX_WON';
    const  PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function setPlayerName()
    {
        ScoreName1.innerText = Name1.value;
        ScoreName2.innerText = Name2.value;
    }

    PlayGame.addEventListener('click', (event) => {
        event.preventDefault();
        if(Name1.value === "" || Name2.value === "")
        {
            return alert("Ivesti vardus")
        }
        logInForm.style.display = "none";
        gameboard.style.display = "block";
        setPlayerName();
        
    })

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
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

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                CurrentScore2++;
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                score2.innerHTML = CurrentScore2;
                break;
            case PLAYERX_WON:
                CurrentScore1++;
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                score1.innerHTML = CurrentScore1;
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide'); 
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
        if(!isGameActive)
        {
            score1.innerHTML = CurrentScore1;
            score2.innerText = CurrentScore2;
        }
    }

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

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);

    restartGameButton.onclick = function () {
        CurrentScore1 = 0;
        CurrentScore2 = 0;
        score1.innerHTML = CurrentScore1;
        score2.innerHTML = CurrentScore2;
        logInForm.style.display = "block";
        gameboard.style.display = "none";
        resetBoard();
    }
});
