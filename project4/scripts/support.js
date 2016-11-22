function getPosTop(row, col) {
    return 240 + row * 120;
}

function getPosLeft(row, col) {
    return 20 + col * 120;
}

function displayScreen(el) {
    if ($('#display-screen').text() == 0) {
        $('#display-screen').text($('#view-screen').val());  // 重新更新小显示屏
    } else {
        $('#display-screen').text($('#display-screen').text() + el.innerText);  // 在原有基础上更新小显示屏
    }
}

function delateViewScreen() {
    $('#view-screen').val(0);   // 删除屏幕当前数字
}
function delateDisplayScreen() {
    var displayScreenText = $('#display-screen').text();
    var indexText = displayScreenText.indexOf($('#view-screen').val());
    $('#display-screen').text(displayScreenText.slice(0, indexText == 0 ?  indexText + 1 : indexText));  // 删除屏幕字符串最后一位
}
