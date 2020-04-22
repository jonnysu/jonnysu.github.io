//created by jonnySu
//������վhome�ĸߵ�
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

    //����ҳ���С�Ǹı�
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



//��Ьһ���๦��slider �������
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
        //һ�ŵ��������
        if (this.length == 1) {
            this.slideWrapper[0].style.left = 0;
            return;
        }
        //���ŵ��������
        if (this.length == 2) {
            this.slideWrapper[0].appendChild(this.slideWrapper[0].firstElementChild.cloneNode(true)); 
            this.slideWrapper[0].appendChild(this.slideWrapper[0].firstElementChild.nextElementSibling.cloneNode(true));
            this.slideWrapper[0].style.width = 100 * 4 + "vw";
        }
        this.leftButton.addEventListener("click", leftClickCallback(this.slideWrapper[0], this));
        this.rightButton.addEventListener("click", rightClickCallback(this.slideWrapper[0], this));
        
        this.slideWrapper[0].addEventListener("transitionend", myevent(this.slideWrapper[0]));
        //����ʱ����
        this.intervalProcess = setInterval(rightClickCallback(this.slideWrapper[0], this), this.timeout);
    }
    var leftClickCallback = function (wrapper,slider) {
        return function () {
            //����ʱ����
            clearInterval(slider.intervalProcess);
            slider.intervalProcess = setInterval(rightClickCallback(wrapper, slider), slider.timeout);
            //��ҳ��ʼ����
            adjustLeft(wrapper,slider);
        }
    }
    var rightClickCallback = function (wrapper,slider) {
        return function () {
            clearInterval(slider.intervalProcess);
            slider.intervalProcess = setInterval(rightClickCallback(wrapper, slider), slider.timeout);
            //��ҳ��ʼ����
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
//����һ��slider
var slideobj = new window.slider({ slideLeft: 'slideLeft', slideRight: "slideRight", backgroundSlider: "background-slider", timeout:10000 });