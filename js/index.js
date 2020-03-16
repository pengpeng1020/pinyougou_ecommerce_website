window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    //鼠标经过focus 就显示隐藏的左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        // timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            arrow_r.click()
        }, 2000);
    })
    // 动态生成小圆圈 有几张图片 生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个li
        //记录当前小圆圈的索引号 通过自定义属性来做
        //把li插入到ol里面
        var li = document.createElement('li');
        li.setAttribute('index', i)
        ol.appendChild(li);
        //小圆圈的排他思想 可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            //把所有li清楚current类名
            //当前的li设置为current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击小圆圈 移动图片 移动的是ul
            //ul的移动距离就是小圆圈的索引号乘图片的宽度
            //当我们点击了某个li 就拿到当前li的索引号
            var focusWidth = focus.offsetWidth;
            var index = this.getAttribute('index');
            //当我们点击了某个小圆圈li 就要把这个li的索引号给num 
            num = index;
            //还要把索引号给circle 让小圆圈也跟着变化
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    //把ol里面的第一个li设置类名为current
    ol.children[0].className = 'current';
    //克隆第一张图片放在ul的最后 避免复制一个图片使小圆圈变多
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮 图片滚动一张
    var num = 0;
    //circle控制小圆圈的播放
    var circle = 0;
    //节流阀 为了让一个图片播放结束才能播放下一张 防止快速点击时播放过快
    var flag = true;

    arrow_r.addEventListener('click', function () {
        if (flag) {
            //关闭节流阀
            flag = false;
            //如果走到了最后一张复制的图片 此时ul要快速复原left改为0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
            animate(ul, -num * focus.offsetWidth, function () {
                flag = true;  //打开节流阀
        });
        //点击右侧按钮 小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
        circle++;
        //如果circle == 4 说明走到了最后克隆的那张图片
        if (circle == 4) {
            circle = 0;
        }
        //先清除其他小圆圈的current类名
        //留下当前的小圆圈的current类名
        circlechange();
        }
        
    })
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * focus.offsetWidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * focus.offsetWidth, function () {
                flag = true;
            });
            //小圆圈效果
            circle--;
            //如果circle < 0 说明第一张图片 则小圆圈要改为第4个小圆圈(3)
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circlechange();
        }
    })
    function circlechange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    //自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_r.click()
    }, 2000);
})

//jquery
$(function () {
    //当我们点击li 此时不需要执行页面滚动事件里面的遍历li的背景选择来添加current
    //因为点击事件已经添加了current
    //节流阀 互斥锁
    var flag = true;
    toggleTool();
    function toggleTool() {
        if ($(document).scrollTop() >= $(".recom_hd").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    //页面滑动到recom_hd时显示电梯导航
    $(window).scroll(function () {
        toggleTool();
        //当页面滚动到内容区某个楼层时 电梯导航对应的楼层添加current 其他移除current类名
        if (flag == true) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }
    })
    // 点击电梯导航滑动到对应楼层
    $(".fixedtool li").click(function () {
        flag = false;
        var index = $(this).index();
        //选出对应索引号的内容区的盒子 计算它的offset().top值
        var current = $(".floor .w").eq(index).offset().top;
        //不能是文档 而是 html和body元素做动画
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
                flag = true;   //animate回调函数 点击事件结束后执行的函数 让flag= true 这样滚动页面时又可以添加current类名
        })
        //点击之后让当前的li添加current类名 其他兄弟移除current类名
        $(this).addClass("current").siblings().removeClass("current");
    })
})