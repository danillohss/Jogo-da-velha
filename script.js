let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
}

let player = '';
let warning = '';
let playing = false;
reset();
document.querySelector('.reset').addEventListener('click', reset());
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset() {
    warning = '';
    playing = true;
    let random = Math.floor(Math.random() * 2);
    random === 0 ? player = 'X' : player = 'O'
    for (let i in square) {
        square[i] = ''
    }
    renderSquare();
    renderInfo();
}

function renderInfo() {
    if (playing) {
        document.querySelector('.vez').innerHTML = player;
    } else {
        document.querySelector('.vez').innerHTML = '';
    }
    document.querySelector('.resultado').innerHTML = warning;

}
function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`).innerHTML = square[i];
        item.innerHTML = square[i];
    }
    checkGame();
}

function checkGame() {
    if (checkWinnerFor('X')) {
        warning = 'O Jogador "X" Venceu';
        playing = false;
    } else if (checkWinnerFor('O')) {
        warning = 'O Jogador "O" Venceu';
        playing = false;
    } else if (isFull()) {
        playing = false;
        warning = 'O Jogo empatou!';
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]
    for (let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player)
        if (hasWon) {
            playing = false;
            return true;
        }
    }
    return false;
}

function isFull() {
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }
    return true;
}

function togglePlayer() {
    player === 'X' ? player = 'O' : player = 'X';
    renderInfo();
}