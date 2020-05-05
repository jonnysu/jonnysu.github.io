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
    //固定nav栏
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




//新鞋一个多功能slider 逐渐添加中
(function (window) {
    var slider = function (ElementInfo) {
        
        this.timeout = ElementInfo.timeout|| 5000;

        this.leftButton = window.document.getElementById(ElementInfo.slideLeft);
        this.rightButton = window.document.getElementById(ElementInfo.slideRight);
        //在添加两个按钮，特效需要
        this.leftButton2 = window.document.getElementById(ElementInfo.slideLeft2);
        this.rightButton2 = window.document.getElementById(ElementInfo.slideRight2);
        //添加按钮结束
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
        //在添加两个按钮，特效需要
        this.leftButton2.addEventListener("click", leftClickCallback(this.slideWrapper[0], this));
        this.rightButton2.addEventListener("click", rightClickCallback(this.slideWrapper[0], this));
        //添加按钮结束

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
//var slideobj = new window.slider({ slideLeft: 'slideLeft', slideLeft2: 'slideLeft2', slideRight: "slideRight", slideRight2: "slideRight2",  backgroundSlider: "background-slider", timeout: 10000 });

//vue 的使用
(function (window) {
    var vmbackground = new Vue({
        el: "#background-slider",
        data() {
            
            return {
                backgroundimgs: null
            }
        },
        watch: {
            backgroundimgs: function () {
               // nextTich: 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
               //$nextTick 里面DOM更新是指页面上的数据是最新的数据。而不是data的a数据更新了。
                this.$nextTick(function () {
                /*现在数据已经渲染完毕*/
                    var slideobj = new window.slider({ slideLeft: 'slideLeft', slideLeft2: 'slideLeft2', slideRight: "slideRight", slideRight2: "slideRight2", backgroundSlider: "background-slider", timeout: 10000 });
                })
            }
        },
        mounted() {

                axios
                    .get('/content/content.json')
                    .then(response => {
                    this.backgroundimgs = response.data.backgroundimgs;
                        
                    })
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
            

            }
        
    });



    var vmhobbie= new Vue({
        el: "#myhobby",
        data() {

            return {
               
                hobbies:null
            }
        },
        watch: {
            hobbies: function () {
                // nextTich: 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
                //$nextTick 里面DOM更新是指页面上的数据是最新的数据。而不是data的a数据更新了。
                this.$nextTick(function () {
                    /*现在数据已经渲染完毕*/
                    console.log(this.hobbies)
                })
            }
        },
        mounted() {

            axios
                .get('/content/content.json')
                .then(response => {
                    this.hobbies= response.data.hobbies;
                    

                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });


        }

    });


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

(function (window) {
    window.scrollBody = {}
    function scrollAnimation(currentY, targetY) {
        // 获取当前位置方法
        // const currentY = document.documentElement.scrollTop || document.body.scrollTop

        // 计算需要移动的距离

        let needScrollTop = targetY - currentY
        let _currentY = currentY
        setTimeout(() => {
            // 一次调用滑动帧数，每次调用会不一样
            const dist = Math.ceil(needScrollTop / 10)
            _currentY += dist
            window.scrollTo(_currentY, currentY)
            // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
            if (needScrollTop > 10 || needScrollTop < -10) {
                scrollAnimation(_currentY, targetY)
            } else {
                window.scrollTo(_currentY, targetY)
            }
        }, 1)
    }
    scrollBody.scroll = function (id) {
        var targetY = window.document.getElementById(id).offsetTop - 71;
        var currentPOS = window.document.documentElement.scrollTop || window.document.body.scrollTop;
        scrollAnimation(currentPOS, targetY);
    }


    //获取nav里的item列表
    var list = window.document.getElementsByClassName("item")
    //点击的时候滚动到该位置
    Array.from(list, function (item, index) {
        item.addEventListener("click", function () {
            return scrollBody.scroll(item.dataset.navinfo);
        })


    })
    //获取每一块内容的实例
    var elementList = Array.from(list, function (item, index) {
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
                return subvalueitem == 1 || subvalueitem == -1
            });
            if (bool) {

                subvalue.forEach(function (value, index) {
                    if (value == 1) {
                        list[index].classList.add("active")
                    } else if (value == -1 && index > 0) {
                        list[index - 1].classList.add("active")
                        list[index].classList.remove("active")
                    } else {
                        list[index].classList.remove("active")
                    }
                })
            }

        })



    })


})(window);
    //随机播放歌曲


(function (window) {
    window.musics = [
        ["http://96.ierge.cn/14/215/430728.mp3","耀眼-夏婉安"],
        ["http://96.ierge.cn/14/221/442626.mp3","虚度半生"],
        ["http://96.ierge.cn/13/201/402133.mp3","爱疯的我"],
        ["http://96.ierge.cn/14/220/440580.mp3","我只想做真的自己"],
        ["http://96.ierge.cn/13/195/390762.mp3","Say Goodbye"]
    ];
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    //console.log()
    var audio = window.document.getElementsByTagName("audio")[0];
    audio.addEventListener('ended', function () {
        audio.src = window.musics[getRndInteger(0, window.musics.length)][0];
        audio.title = window.musics[getRndInteger(0, window.musics.length)][1];
        audio.play();
    });
    audio.src = window.musics[getRndInteger(0, window.musics.length)][0];
    audio.title = window.musics[getRndInteger(0, window.musics.length)][1];
    audio.volume = 0.5;

})(window);





