window.onload = function() {
    //得到navbar元素
    var lis = document.querySelectorAll(".navbar");
    //单个页面点击
    var clicked = true;
    for(var i = 0; i < lis.length - 1; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
            /*
             *点击单个书签时该书签旋转到0deg
             *左边的书签依次旋转-15deg
             *右边的书签依次旋转15deg
            */
            this.style.transform = "rotate(0deg)";
            var leftDeg = 0;
            var rightDeg = 15;
            //旋转左边书签
            for(var j = this.index - 1; j >= 0; j--) {
                leftDeg -= 15;
                lis[j].style.transform = "rotate("+leftDeg+"deg)";
            }
            //旋转右边书签
            for(var k = this.index + 1; k < lis.length; k++) {
                rightDeg += 15;
                lis[k].style.transform = "rotate("+rightDeg+"deg)";
            }
        };
    }
    //封面点击
    lis[lis.length - 1].onclick = function() {
        /*
         *封面书签被点击时，n=i-6
         *每个书签依次旋转15*ndeg
        */
        if(clicked) {
            for(var i = 0; i < lis.length; i++) {
                lis[i].style.transform = "rotate(0deg)";
            }
        } else {
            for(var i = 0; i < lis.length; i++) {
                var n = i - lis.length/2;
                n *= 15;
                lis[i].style.transform = "rotate("+n+"deg)";
            }
        }
        clicked = !clicked;
    };
};
