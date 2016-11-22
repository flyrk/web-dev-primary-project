var ans = 0;   // 记录总答案
var lastAns = 0;  // 记录上一次的总答案
var tempNum = 0;    // 记录每一次操作的数
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
            if ($('#view-screen').val() == 0 || isClickOp) {  // 如果之前的显示屏上是0或者已经按过操作符键
                tempNum = 0;   // 每次做完操作符运算后都把上一次的数字清零
                tempNum += parseInt(this.innerText);
                //console.log("temp: " + tempNum);
                $('#view-screen').val(this.innerText);  // 刷新显示屏
                isClickOp = false;
            } else {
                tempNum = tempNum * 10 + parseInt(this.innerText);
                //console.log("temp: " + tempNum);
                $('#view-screen').val($('#view-screen').val() + this.innerText);  // 在之前的数字基础上加数字
            }
            displayScreen(this);
            break;
        case "plus":
            if (!isClickOp) {
                if (isEqual) {   // 如果已经按过等于号，则在之前的答案基础上进行运算
                    ans = lastAns;
                    isEqual = false;
                }
                calculation();
                $('#view-screen').val(this.innerText);
                displayScreen(this);
            }
            currentOp = this.id;
            isClickOp = true;
            break;
        case "reduce":
            if (!isClickOp) {
                if (isEqual) {
                    ans = lastAns;
                    isEqual = false;
                }
                calculation();
                $('#view-screen').val(this.innerText);
                displayScreen(this);
            }
            currentOp = this.id;
            isClickOp = true;
            break;
        case "multi":
            if (!isClickOp) {
                if (isEqual) {
                    ans = lastAns;
                    isEqual = false;
                }
                calculation();
                $('#view-screen').val(this.innerText);
                displayScreen(this);
            }
            currentOp = this.id;
            isClickOp = true;
            break;
        case "divis":
            if (!isClickOp) {
                if (isEqual) {
                    ans = lastAns;
                    isEqual = false;
                }
                calculation();
                $('#view-screen').val(this.innerText);
                displayScreen(this);
            }
            currentOp = this.id;
            isClickOp = true;
            break;
        case "equal":
            isClickOp = false;
            if (!isEqual) {
                calculation();
                lastAns = ans;
                $('#view-screen').val(ans);
                currentOp = "";   // 每次按完等于键要把记录的操作符清空，以免影响到下一次的操作
                tempNum = 0;  // 之前运算保存的数也要清零
                isEqual = true;  // 每按一次等于号都记录下来
            }
            break;
        case "delate":
            if (!isClickOp) {   // 如果删除的是数字(有待改进)
                delateDisplayScreen();
                delateViewScreen();
            } else {
                delateDisplayScreen();
            }
            break;
        case "ac":
            clearAll();
            break;
        case "ans":
            tempNum = lastAns;
            $('#view-screen').val(tempNum);
            $('#display-screen').text(tempNum);
            break;
    }
    // console.log("temp: " + tempNum);
    // console.log("ans: " + ans);
}

function calculation() {   // 进行计算
    //console.log("currentOp: " + currentOp);
    if (ans == 0) {
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

function delation() {  // 进行删除（有待改进）
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
    tempNum = 0;
    currentOp = "";
    $('#display-screen').text(0);
    $('#view-screen').val(0);
}
