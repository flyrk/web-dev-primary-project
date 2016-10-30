var board = [];
var score = 0;
var hasConflicted = [];
$(document).ready(function () {
    newGame();
});

function newGame() {
    //初始化格子
    init();
    //随机生成两个数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    //确定每个小格的位置
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    //初始化board数组
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        hasConflicted[i] = [];
        for (var j = 0; j < 4; j++)
            board[i][j] = 0;
    }
    updateBoardView();
    score = 0;
    updateScore(score);
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + '-' + j + "'></div>");
            var numberCell = $("#number-cell-" + i + '-' + j);

            if (board[i][j] === 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            } else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberCellBgColor(board[i][j]));
                numberCell.css("color", getNumberCellColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    if (nospace(board)) return false;
    //随机一个位置
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));
    var time = 0;
    while(time < 100) {
        if (board[randX][randY] === 0)
            break;
        var randX = parseInt(Math.floor(Math.random() * 4));
        var randY = parseInt(Math.floor(Math.random() * 4));
        time++;
    }
    var flag = 0;
    if(time === 100) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    randX = i;
                    randY = j;
                    flag = 1;
                    break;
                }
            }
            if(flag) break;
        }
    }
    //随机一个数字
    var randNum = Math.random() < 0.5 ? 2 : 4;
    //显示数字
    board[randX][randY] = randNum;
    showNumberAnimation(randX, randY, randNum);
    return true;
}

$(document).keydown(function(event) {
    switch(event.keyCode) {
        case 37: //Left
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38: //Up
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39: //Right
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40: //Down
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default: break;
    }
});

function isGameOver() {
    if(nospace(board) && noMove()) return false;
    gameOver();
    return true;
}
function gameOver() {

}
function moveLeft() {
    if (!canMoveLeft(board))
        return false;
    //moveLeft
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            for (var k = 0; k < j; k++) {
                if (board[i][j] !== 0) {
                    if(board[i][k] === 0 && noBlockLeft(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] === board[i][j] && noBlockLeft(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        //updateScore
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board))
        return false;
    //moveUp
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++){
            for (var k = 0; k < i; k++) {
                if (board[i][j] !== 0) {
                    if(board[k][j] === 0 && noBlockUp(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] === board[i][j] && noBlockUp(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        //updateScore
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board))
        return false;
    //moveLeft
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {
            for (var k = 3; k > i; k--) {
                if (board[i][j] !== 0) {
                    if(board[k][j] === 0 && noBlockDown(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] === board[i][j] && noBlockDown(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        //updateScore
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board))
        return false;
    //moveLeft
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >=  0; j--) {
            for (var k = 3; k > j; k--) {
                if (board[i][j] !== 0) {
                    if(board[i][k] === 0 && noBlockRight(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] === board[i][j] && noBlockRight(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        //updateScore
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
