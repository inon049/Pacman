'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var CHERRY = '🍒';
var POWERFOOD = 'x'
var gCherryInterval;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.score = 0
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    generateCherrys(findEmptyCells(gBoard))
    gGame.isOn = true;
}

function renderVictory() {
    clearInterval(gIntervalGhosts)
    var elModalMsg = document.querySelector('.modalmsg')
    var elModal = document.querySelector('.modal')
    elModalMsg.innerText = `You won!!! with`
    elModal.style.display = 'block'
    gGame.isOn = false

}


function renderDefeat() {
    var elModal = document.querySelector('.modal')
    var elModalMsg = document.querySelector('.modalmsg')
    elModalMsg.innerText = `Game over!`
    elModal.style.display = 'block'


}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;

            if (i === 1 && j === 8 || i === 1 && j === 1) board[i][j] = POWERFOOD;
            if (i === 8 && j === 1 || i === 8 && j === 8) board[i][j] = POWERFOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {

                board[i][j] = WALL;


            }
        }
    }
    return board;
}

function updateScore(value) {
    // Update both the model and the dom for the score
    gGame.score += value;

    document.querySelector('header h3 span').innerText = `${gGame.score}`;
}


function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    gIntervalGhosts = null;
    renderDefeat()
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
}