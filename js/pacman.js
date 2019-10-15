var gPacman;
const PACMAN = 'ᗧ';


function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
    if (!gGame.isOn) return;


    var nextLocation = getNextLocation(eventKeyboard);
    // User pressed none-relevant key in the keyboard
    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // Hitting a WALL, not moving anywhere
    if (nextCell === WALL) return;
    if (nextCell === POWERFOOD) {
        gPacman.isSuper = true
        for (var i = 0; i < gGhosts.length; i++) {
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))

        }
        setTimeout(function() {
            gPacman.isSuper = false
            for (var i = 0; i < gGhosts.length; i++) {
                renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
            }

        }, 5000)
    }
    if (nextCell === CHERRY) {
        updateScore(15)
    }
    // Hitting FOOD? update score
    if (nextCell === FOOD) {
        updateScore(1);
        console.log(countFood(gBoard))
        if (countFood(gBoard) === 0) {
            renderVictory()
        }
    }
    if (nextCell === GHOST) {
        if (gPacman.isSuper === true) superMode(nextLocation)
        else {
            gameOver()
            renderCell(gPacman.location, EMPTY);
            return;
        }
    }
    // Update the model to reflect movement
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // Update the DOM
    renderCell(gPacman.location, EMPTY);

    // Update the pacman MODEL to new location  
    gPacman.location = nextLocation;

    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // Render updated model to the DOM
    renderCell(gPacman.location, PACMAN);

}


function superMode(coords) {
    var deadGhosts = []
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === coords.i &&
            gGhosts[i].location.j === coords.j) {
            deadGhosts.push(gGhosts[i])
            gGhosts.splice(i, 1)


        }
    }
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
    setTimeout(function() {
        for (var i = deadGhosts.length - 1; i >= 0; i--) {
            gGhosts.push(deadGhosts[i])
        }
        for (var i = 0; i < gGhosts.length; i++) {

            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
        }
    }, 5000);
}

function getNextLocation(keyboardEvent) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }

    return nextLocation;
}