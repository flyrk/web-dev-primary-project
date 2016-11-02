documentWidth = window.screen.availWidth;
//documentWidth = window.innerWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSpace = 0.04 * documentWidth;
cellSiderLength = 0.18 * documentWidth;

function getPosTop(row, col) {
    return cellSpace + row * (cellSpace + cellSiderLength);
}

function getPosLeft(row, col) {
    return cellSpace + col * (cellSpace + cellSiderLength);
}

function getNumberCellBgColor(number) {
    switch(number) {
        case 2:
            return "rgb(197, 209, 194)";
            break;
        case 4:
            return "rgb(197, 209, 194)";
            break;
        case 8:
            return "rgb(226, 207, 35)";
            break;
        case 16:
            return "rgb(140, 52, 181)";
            break;
        case 32:
            return "rgb(217, 75, 168)";
            break;
        case 64:
            return "rgb(231, 58, 30)";
            break;
        case 128:
            return "rgb(14, 231, 191)";
            break;
        case 256:
            return "rgb(27, 111, 172)";
            break;
        case 512:
            return "rgb(37, 215, 49)";
            break;
        case 1024:
            return "rgb(37, 159, 108)";
            break;
        case 2048:
            return "rgb(222, 173, 26)";
            break;
        case 4096:
            return "rgb(212, 20, 55)";
            break;
    }
}

function getNumberCellColor(number) {
    if (number <= 4) return "#776e65";
    return "white";
}

function nospace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] === 0)
                return false;
    return true;
}

function noMove(board) {
    if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board))
        return false;
    return true;
}
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j-1] === 0 || board[i][j-1] === board[i][j])
                    return true;
            }
        }
    return false;
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i-1][j] === 0 || board[i-1][j] === board[i][j])
                    return true;
            }
        }
    return false;
}

function canMoveDown(board) {
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i+1][j] === 0 || board[i+1][j] === board[i][j])
                    return true;
            }
        }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 3; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j+1] === 0 || board[i][j+1] === board[i][j])
                    return true;
            }
        }
    return false;
}

function noBlockLeft(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++)
        if (board[row][i] !== 0)
            return false;
    return true;
}

function noBlockUp(col, row1, row2, board) {
    for (var i = row1 - 1; i >  row2; i--)
        if (board[i][col] !== 0)
            return false;
    return true;
}

function noBlockDown(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] !== 0)
            return false;
    return true;
}

function noBlockRight(row, col1, col2, board) {
    for (var i = col1 - 1; i > col2; i--)
        if (board[row][i] !== 0)
            return false;
    return true;
}
