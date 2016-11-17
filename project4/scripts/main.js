var ans = 0;   // 记录总答案
var lastAns = 0;  // 记录上一次的总答案
var tempNum = 0;    // 记录每一次操作的数
var isClickOp = false;  //记录是否按下了加减乘除键
var isEqual = false;  // 记录是否按了等于键
var lastOp = "";   // 记录上一次按下的操作符键
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
                tempNum +=parseInt(this.innerText);
                $('#view-screen').val(this.innerText);  // 刷新显示屏
                isClickOp = false;
            } else {
                tempNum = tempNum * 10 + parseInt(this.innerText);
                $('#view-screen').val($('#view-screen').val() + this.innerText);  // 在之前的数字基础上加数字
            }
            if (isEqual) {
                ans = 0;
                $('#display-screen').text() = 0;
            }
            displayScreen(this);
            break;
        case "plus":
            currentOp = lastOp;
            lastOp = "plus";
            isClickOp = true;
            displayScreen(this);
            calculation();
            break;
        case "reduce":
            currentOp = lastOp;
            lastOp = "reduce";
            isClickOp = true;
            displayScreen(this);
            calculation();
            break;
        case "multi":
            currentOp = lastOp;
            lastOp = "multi";
            isClickOp = true;
            displayScreen(this);
            calculation();
            break;
        case "divis":
            currentOp = lastOp;
            lastOp = "divis";
            isClickOp = true;
            displayScreen(this);
            calculation();
            break;
        case "equal":
            currentOp = lastOp;
            isClickOp = true;
            isEqual = true;
            calculation();
            lastAns = ans;
            $('#view-screen').val(ans);
            break;
    }
    // console.log("temp: " + tempNum);
    // console.log("ans: " + ans);
}

function calculation() {   // 进行计算
    if (ans == 0) {
        ans += tempNum;
    }
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
    tempNum = 0;   // 每次做完操作符运算后都把上一次的数字清零
}
