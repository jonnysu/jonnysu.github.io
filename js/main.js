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
//新鞋一个多功能slider 逐渐添加中


(function (window) {
    var slider = function () {
        
        //this.elapsedTime = 0;
        this.init();
    }
    slider.prototype.init = function () {

        this.leftButton = window.document.getElementById('slideLeft');
        this.rightButton = window.document.getElementById('slideRight');
        this.slideWrapper = window.document.getElementById('background-slider').getElementsByTagName("ul");
        this.slideTime = this.slideWrapper[0].style.transitionDuration;
        this.slideElements = this.slideWrapper[0].children;
        this.length = this.slideElements.length;
        this.slideWrapper[0].style.width = 100 * this.length + "vw";
        if (this.length == 1) { return; }
        if (this.length == 2) {
            this.slideWrapper[0].appendChild(this.slideWrapper[0].firstElementChild.cloneNode(true));
            this.slideWrapper[0].style.width = 100 * 3 + "vw";
        }
        this.leftButton.addEventListener("click", leftClickCallback(this.slideWrapper[0], this));
        this.rightButton.addEventListener("click", rightClickCallback(this.slideWrapper[0], this));
        
        this.slideWrapper[0].addEventListener("transitionend", myevent(this.slideWrapper[0]));


    }
    var leftClickCallback = function (wrapper,slider) {
        return function () {
            adjustLeft(wrapper,slider);
        }
    }
    var rightClickCallback = function (wrapper,slider) {
        return function () {
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


    window.slider =new slider();
    //window.slider()

})(window);