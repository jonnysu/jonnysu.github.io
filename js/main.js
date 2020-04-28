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
    //�̶�nav��
    var navObj = document.getElementsByTagName("nav")[0];
    var navLine = document.getElementById("nav-line");
    var value = 0;
    window.addEventListener("scroll", function () {
        value = navLine.getBoundingClientRect().top;
      
        if (value <= 0) {
            navLine.style.height = navObj.offsetHeight + "px"
            navObj.classList.add("navFixed")

        } else {
            navObj.classList.remove("navFixed")
            navLine.style.height = 0;
        }
    })

})(window);




//��Ьһ���๦��slider �������
(function (window) {
    var slider = function (ElementInfo) {
        
        this.timeout = ElementInfo.timeout|| 5000;

        this.leftButton = window.document.getElementById(ElementInfo.slideLeft);
        this.rightButton = window.document.getElementById(ElementInfo.slideRight);
        //�����������ť����Ч��Ҫ
        this.leftButton2 = window.document.getElementById(ElementInfo.slideLeft2);
        this.rightButton2 = window.document.getElementById(ElementInfo.slideRight2);
        //��Ӱ�ť����
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
        //�����������ť����Ч��Ҫ
        this.leftButton2.addEventListener("click", leftClickCallback(this.slideWrapper[0], this));
        this.rightButton2.addEventListener("click", rightClickCallback(this.slideWrapper[0], this));
        //��Ӱ�ť����

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
var slideobj = new window.slider({ slideLeft: 'slideLeft', slideLeft2: 'slideLeft2', slideRight: "slideRight", slideRight2: "slideRight2",  backgroundSlider: "background-slider", timeout: 10000 });


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

(function (window) {
    window.scrollBody = {}
    function scrollAnimation(currentY, targetY) {
        // ��ȡ��ǰλ�÷���
        // const currentY = document.documentElement.scrollTop || document.body.scrollTop

        // ������Ҫ�ƶ��ľ���

        let needScrollTop = targetY - currentY
        let _currentY = currentY
        setTimeout(() => {
            // һ�ε��û���֡����ÿ�ε��û᲻һ��
            const dist = Math.ceil(needScrollTop / 10)
            _currentY += dist
            window.scrollTo(_currentY, currentY)
            // ����ƶ�����С��ʮ�����أ�ֱ���ƶ�������ݹ���ã�ʵ�ֶ���Ч��
            if (needScrollTop > 10 || needScrollTop < -10) {
                scrollAnimation(_currentY, targetY)
            } else {
                window.scrollTo(_currentY, targetY)
            }
        }, 1)
    }
    scrollBody.scroll = function (id) {
        var targetY = window.document.getElementById(id).offsetTop-71;
        var currentPOS = window.document.documentElement.scrollTop || window.document.body.scrollTop;
        scrollAnimation(currentPOS, targetY);
    }



    //var navindex = 0;
    //var list = window.document.getElementsByClassName("item")
    //Array.from(list, function (item, index) {
    //    item.addEventListener("click", function () {
    //        return scrollBody.scroll(item.dataset.navinfo);
    //    })
    //    window.addEventListener("scroll", function () {
    //        var obj = window.document.getElementById(item.dataset.navinfo)
    //        var value = obj.getBoundingClientRect().top;

    //        if (value <= 71) {
    //            navindex = index;
    //            for (var i = 0; i <= navindex; i++) {
    //                list[i].classList.remove("active");
    //            }
    //            item.classList.add("active");

    //        } else {
    //            item.classList.remove("active")
    //        }
    //    })

    //})

   //��ȡnav���item�б�
    var list = window.document.getElementsByClassName("item")
    //�����ʱ���������λ��
    Array.from(list, function (item, index) {
        item.addEventListener("click", function () {
            return scrollBody.scroll(item.dataset.navinfo);
        })
       

    })
    //��ȡÿһ�����ݵ�ʵ��
    var elementList=Array.from(list, function (item, index) {
       return window.document.getElementById(item.dataset.navinfo)
    })
    var elementListPositions = new Array(list.length);
    var prevousElementListPositions = new Array(list.length);
    var subvalue = new Array(list.length).fill(0);
    var actValue = new Array(list.length).fill(0);
    window.addEventListener("scroll", function () {
        elementList.forEach(function (value, index, array) {
            prevousElementListPositions = elementListPositions.slice();
            elementListPositions[index] = value.getBoundingClientRect().top - 71;
            elementListPositions.forEach(function (value, index) {
                if (value <= 0 && prevousElementListPositions[index] >= 0) { subvalue[index] = 1; }
                else if (value >= 0 && prevousElementListPositions[index] <= 0) { subvalue[index] = -1; }
                else { subvalue[index] = 0 }
                
            })
            var bool = subvalue.some(function (subvalueitem) {
               return  subvalueitem == 1 || subvalueitem == -1
            });
            if (bool) {
                
                subvalue.forEach(function (value, index) {
                    if (value == 1) {
                        list[index].classList.add("active")
                    } else if (value == -1&&index>0) {
                        list[index - 1].classList.add("active")
                        list[index].classList.remove("active")
                    } else {
                        list[index].classList.remove("active")
                    }
                })
            }
          
        })



    })

  
})(window)

document.getElementsByTagName("audio")[0].volume = 0.5;


