var ans = 0;   // 记录总答案
var lastAns = 0;  // 记录上一次的总答案
var tempNum = 0;    // 记录每一次操作的数
var hasDot = false;  // 记录是否按下了小数点键
var dotNum = 1;  // 记录有几位小数（n=dotNum/10）
var isClickOp = false;  //记录是否按下了加减乘除键
var isEqual = false;  // 记录是否按了等于键
var currentOp = "";  // 记录当前计算需要用的操作符

$(document).ready(function() {
    //初始化按键位置
    init();
    // 当按下按钮时
    $('.buttons').click(clickAct);
});

function init() {
    for (var i = 0; i < 5; i++)
        for (var j = 0; j < 5; j++) {
            var buttonCell = $('.button-cell-' + i + '-' + j);
            buttonCell.css("top", getPosTop(i, j));
            buttonCell.css("left", getPosLeft(i, j));
        }
}

function clickAct() {
    switch(this.id) {
        case "number-0":
        case "number-1":
        case "number-2":
        case "number-3":
        case "number-4":
        case "number-5":
        case "number-6":
        case "number-7":
        case "number-8":
        case "number-9":
            tempNum = parseFloat(tempNum);  // 避免javascript自动把数字转换为字符串
            if ($('#view-screen').val() == 0 || isClickOp) {  // 如果之前的显示屏上是0或者已经按过操作符键
                tempNum = 0;   // 每次做完操作符运算后都把上一次的数字清零
                if (hasDot) {
                    dotNum *= 10;
                    tempNum = parseInt(this.innerText) / dotNum;
                } else {
                    tempNum += parseInt(this.innerText);
                }
                //console.log("temp: " + tempNum);
                $('#view-screen').val(tempNum);  // 刷新显示屏
                isClickOp = false;
            } else {
                if (hasDot) {
                    dotNum *= 10;
                    tempNum +=  parseInt(this.innerText) / dotNum;
                } else {
                    tempNum = tempNum * 10 + parseInt(this.innerText);
                }
                //console.log("temp: " + tempNum);
                $('#view-screen').val($('#view-screen').val() + this.innerText);  // 在之前的数字基础上加数字
            }
            displayScreen(this);
            break;
        case "dot":
            hasDot = true;  // 记录按过小数点
            if (!isClickOp) {  // 如果输入小数点之前是操作符
                $('#view-screen').val($('#view-screen').val() + this.innerText);
            } else {
                $('#view-screen').val(this.innerText);
            }
            $('#display-screen').text($('#display-screen').text() + this.innerText);
            isClickOp = false;
            break;
        case "plus":
            if (!isClickOp) {  // 如果之前没按过操作符
                hasDot = hasDot ? !hasDot : hasDot;  // 每次按操作符就把之前的小数点记录给去掉
                dotNum = 1;  // 将小数点位数清零
                if (isEqual) {   // 如果已经按过等于号，则在之前的答案基础上进行运算
                    ans = lastAns;
                    isEqual = false;
                    $('#display-screen').text(ans + this.innerText);  // 小显示屏吧之前的算式换为ans
                } else {
                    if (tempNum == 0) {  // 如果直接在0的基础上进行运算
                        $('#display-screen').text(0 + this.innerText);
                    } else {
                        displayScreen(this);
                    }
                }
                calculation();
                $('#view-screen').val(this.innerText);
                currentOp = this.id;
            }
            isClickOp = true;
            break;
        case "reduce":
            if (!isClickOp) {
                hasDot = hasDot ? !hasDot : hasDot;
                dotNum = 1;
                if (isEqual) {   // 如果已经按过等于号，则在之前的答案基础上进行运算
                    ans = lastAns;
                    isEqual = false;
                    $('#display-screen').text(ans + this.innerText);  // 小显示屏吧之前的算式换为ans
                } else {
                    if (tempNum == 0) {  // 如果直接在0的基础上进行运算
                        $('#display-screen').text(0 + this.innerText);
                    } else {
                        displayScreen(this);
                    }
                }
                calculation();
                $('#view-screen').val(this.innerText);
                currentOp = this.id;
            }
            isClickOp = true;
            break;
        case "multi":
            if (!isClickOp) {
                hasDot = hasDot ? !hasDot : hasDot;
                dotNum = 1;
                if (isEqual) {   // 如果已经按过等于号，则在之前的答案基础上进行运算
                    ans = lastAns;
                    isEqual = false;
                    $('#display-screen').text(ans + this.innerText);  // 小显示屏吧之前的算式换为ans
                } else {
                    if (tempNum == 0) {  // 如果直接在0的基础上进行运算
                        $('#display-screen').text(0 + this.innerText);
                    } else {
                        displayScreen(this);
                    }
                }
                calculation();
                $('#view-screen').val(this.innerText);
                currentOp = this.id;
            }
            isClickOp = true;
            break;
        case "divis":
            if (!isClickOp) {
                hasDot = hasDot ? !hasDot : hasDot;
                dotNum = 1;
                if (isEqual) {   // 如果已经按过等于号，则在之前的答案基础上进行运算
                    ans = lastAns;
                    isEqual = false;
                    $('#display-screen').text(ans + this.innerText);  // 小显示屏吧之前的算式换为ans
                } else {
                    if (tempNum == 0) {  // 如果直接在0的基础上进行运算
                        $('#display-screen').text(0 + this.innerText);
                    } else {
                        displayScreen(this);
                    }
                }
                calculation();
                $('#view-screen').val(this.innerText);
                currentOp = this.id;
            }
            isClickOp = true;
            break;
        case "equal":
            isClickOp = false;
            if (!isEqual) {
                if (hasDot && tempNum == 0) {  // 如果输入的只有一个点
                    $('#view-screen').val("Wrong!");
                } else {
                    calculation();
                    ans = parseFloat(ans); // 避免javascript自动把数字转换为字符串
                    lastAns = changeDecimal(ans);  // 更新上一次的ans
                    ans = changeDecimal(ans);
                    $('#view-screen').val(ans);
                    $('#display-screen').text($('#display-screen').text() + "=" + ans);
                }
                hasDot = hasDot ? !hasDot : hasDot;
                dotNum = 1;
                currentOp = "";   // 每次按完等于键要把记录的操作符清空，以免影响到下一次的操作
                tempNum = 0;  // 之前运算保存的数也要清零
                isEqual = true;  // 每按一次等于号都记录下来
            }
            break;
        case "delate":
            if (!isClickOp) {   // 如果删除的是数字
                if (hasDot && tempNum == 0) {  // 如果删除的只是一个点
                    delateViewScreen();
                    $('#display-screen').text($('#display-screen').text().slice(0, -1));
                } else {
                    delateDisplayScreen();
                    delateViewScreen();
                }
                if (hasDot) {
                    dotNum = 1;
                    hasDot = hasDot ? !hasDot : hasDot;
                    tempNum = 0;
                }
            } else {  // 删除的是操作符
                isClickOp = false;  // 让下一次操作符能按下
                currentOp = "";  // 把删除的操作符清空
                delateDisplayScreen();
            }
            break;
        case "ac":
            clearAll();
            break;
        case "ans":
            tempNum = changeDecimal(lastAns);
            $('#view-screen').val(tempNum);
            $('#display-screen').text(tempNum);
            break;
    }
    // console.log("temp: " + tempNum);
    // console.log("ans: " + ans);
}

function calculation() {   // 进行计算
    //console.log("currentOp: " + currentOp);
    //console.log("tempNum: " + tempNum);
    tempNum = parseFloat(tempNum); // 避免javascript自动把数字转换为字符串
    ans = parseFloat(ans);
    if (currentOp == "") {  // 如果是第一次还没计算的时候
        ans += tempNum;
    } else {
        switch(currentOp) {
            case "plus":
                ans += tempNum;
                break;
            case "reduce":
                ans -= tempNum;
                break;
            case "multi":
                ans *= tempNum;
                break;
            case "divis":
                ans /= tempNum;
                break;
            default:
                break;
        }
    }
    //console.log("ans: " + ans);
    //console.log("temp: " + tempNum);
}

function delation() {  // 进行删除
    //console.log(tempNum);
    switch(currentOp) {
        case "plus":
            ans -= tempNum;
            break;
        case "reduce":
            ans += tempNum;
            break;
        case "multi":
            ans /= tempNum;
            break;
        case "divis":
            ans *= tempNum;
            break;
        default:
            break;
    }
}

function clearAll() {
    ans = 0;
    lastAns = 0;
    isEqual = false;
    isClickOp = false;
    hasDot = false;
    dotNum = 1;
    tempNum = 0;
    currentOp = "";
    $('#display-screen').text(0);
    $('#view-screen').val(0);
}
