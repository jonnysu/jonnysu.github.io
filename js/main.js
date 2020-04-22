//created by jonnySu
//调整网站home的高低
(function (window) {
    var utility = {};


    function adjustHeader() {
        var clientHeight = document.documentElement.clientHeight;
        var navHeight = document.getElementsByTagName("nav")[0].offsetHeight;

        utility.clientHeight = clientHeight;
        utility.navHeight = navHeight;


        window.utility = utility;


        window.document.getElementById("home").style.height = window.utility.clientHeight - window.utility.navHeight + 'px';

    }
    adjustHeader();

    //调整页面大小是改变
    window.addEventListener("resize", function () {
        utility.clientHeight = document.documentElement.clientHeight;
        adjustHeader();
        //window.console.log(utility.clientHeight);

    })

})(window);


//window.requestAnimFrame = (function () {
//    return window.requestAnimationFrame ||
//        window.webkitRequestAnimationFrame ||
//        window.mozRequestAnimationFrame ||
//        window.oRequestAnimationFrame ||
//        window.msRequestAnimationFrame ||
//        function (/* function */ callback, /* DOMElement */ element) {
//            window.setTimeout(callback, 1000 / 60);
//        };
//})();
//function animate() {
//    requestAnimFrame(animate);
//    draw();

//}



//新鞋一个多功能slider 逐渐添加中
(function (window) {
    var slider = function (ElementInfo) {
        
        this.timeout = ElementInfo.timeout|| 5000;

        this.leftButton = window.document.getElementById(ElementInfo.slideLeft);
        this.rightButton = window.document.getElementById(ElementInfo.slideRight);
        this.slideWrapper = window.document.getElementById(ElementInfo.backgroundSlider).getElementsByTagName("ul");
       
        this.init();
    }
    slider.prototype.init = function () {
        this.slideTime = this.slideWrapper[0].style.transitionDuration;
        this.slideElements = this.slideWrapper[0].children;
        this.length = this.slideElements.length;
        this.slideWrapper[0].style.width = 100 * this.length + "vw";
        //一张的特殊情况
        if (this.length == 1) {
            this.slideWrapper[0].style.left = 0;
            return;
        }
        //两张的特殊情况
        if (this.length == 2) {
            this.slideWrapper[0].appendChild(this.slideWrapper[0].firstElementChild.cloneNode(true)); 
            this.slideWrapper[0].appendChild(this.slideWrapper[0].firstElementChild.nextElementSibling.cloneNode(true));
            this.slideWrapper[0].style.width = 100 * 4 + "vw";
        }
        this.leftButton.addEventListener("click", leftClickCallback(this.slideWrapper[0], this));
        this.rightButton.addEventListener("click", rightClickCallback(this.slideWrapper[0], this));
        
        this.slideWrapper[0].addEventListener("transitionend", myevent(this.slideWrapper[0]));
        //设置时间间隔
        this.intervalProcess = setInterval(rightClickCallback(this.slideWrapper[0], this), this.timeout);
    }
    var leftClickCallback = function (wrapper,slider) {
        return function () {
            //重设时间间隔
            clearInterval(slider.intervalProcess);
            slider.intervalProcess = setInterval(rightClickCallback(wrapper, slider), slider.timeout);
            //翻页开始动作
            adjustLeft(wrapper,slider);
        }
    }
    var rightClickCallback = function (wrapper,slider) {
        return function () {
            clearInterval(slider.intervalProcess);
            slider.intervalProcess = setInterval(rightClickCallback(wrapper, slider), slider.timeout);
            //翻页开始动作
            adjustRight(wrapper, slider);
        }
    }

    var myevent = function (wrapper) {
        return function () {
            if (wrapper.classList.contains("activeleft")) {
                wrapper.prepend(wrapper.lastElementChild);
                wrapper.classList.remove("activeleft");
            }
            if (wrapper.classList.contains("activeright")) {
                wrapper.appendChild(wrapper.firstElementChild);
                wrapper.classList.remove("activeright");
            }
        }
    }
    var adjustLeft = function (wrapper, slider) {
        wrapper.classList.add("activeleft");


    }
    var adjustRight = function (wrapper, slider) {
        wrapper.classList.add("activeright");

    }



    window.slider = slider;
})(window);
//创建一个slider
var slideobj = new window.slider({ slideLeft: 'slideLeft', slideRight: "slideRight", backgroundSlider: "background-slider", timeout:10000 });