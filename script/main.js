
function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}
function getRandomString(length) {
        var randomChars = 'TOLJISZ';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
         result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
     return result;
    }

var pieces = null;
var tetri = [];

const button = document.getElementById('start_game');
button.disabled = false;

button.addEventListener('click', function(){
    pieces = getRandomString(1000);
    button.disabled = true;
    document.getElementById('messageBlock').innerHTML = null;
    tetri = [];
    const playerElements = document.querySelectorAll('.player');
    [...playerElements].forEach(element => {
        const tetris = new Tetris(element);
        tetri.push(tetris);
    });
    document.addEventListener('gameOver', Result);
    document.addEventListener('keydown', keyListener);
    document.addEventListener('keyup', keyListener);
});

const Result = (event) => {
        if(tetri[0].player.over && tetri[1].player.over){
            button.disabled=false;
            if(tetri[0].player.score > tetri[1].player.score)
                document.getElementById('messageBlock').innerHTML = 'Winner: Player 1';
            else if(tetri[1].player.score > tetri[0].player.score)
               document.getElementById('messageBlock').innerHTML = 'Winner: Player 2'; 
            else
               document.getElementById('messageBlock').innerHTML = 'Draw';  
        }
    };

const keyListener = (event) => {
    [
        [65, 68, 87, 83],
        [37, 39, 38, 40],
    ].forEach((key, index) => {
        const player = tetri[index].player;
        if(player.paused && event.keyCode !== 80)
            return;
        if (event.type === 'keydown') {
            if (event.keyCode === key[0]) {
                player.move(-1);
            } else if (event.keyCode === key[1]) {
                player.move(1);
            } else if (event.keyCode === key[2]) {
                player.rotate(1);
            } else if(event.keyCode === 80){
                player.pause();
            }
        }

        if (event.keyCode === key[3]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
    });
};
