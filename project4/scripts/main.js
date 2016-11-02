$(document).ready(function() {
    //初始化按键位置
    init();
    $('.buttons').click();
});

function init() {
    for (var i = 0; i < 5; i++)
        for (var j = 0; j < 5; j++) {
            var buttonCell = $('#button-cell-' + i + '-' + j);
            buttonCell.css("top", getPosTop(i, j));
            buttonCell.css("left", getPosLeft(i, j));
        }
}
