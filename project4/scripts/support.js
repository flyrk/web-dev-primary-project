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
