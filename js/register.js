window.onload = function () {
    var regtel = /^1[3|4|5|7|8]\d{9}$/;  //手机号码的正则表达式
    var tel = document.querySelector('#tel');
    regexp(tel, regtel);  //手机号验证
    var regqq = /^[1-9]\d{4,}$/   //10000往后
    var qq = document.querySelector('#qq');
    regexp(qq, regqq); //qq号验证
    var regname = /^[\u4e00-\u9fa5]{2,8}$/;
    var name = document.querySelector('#name'); //昵称验证
    regexp(name, regname);
    var regmes = /^\d{6}$/;
    var mes = document.querySelector('#mes');
    regexp(mes, regmes);//短信验证码验证
    var regpsw = /^[a-zA-Z0-9_-]{6,16}$/;
    var psw = document.querySelector('#pwd');//输入密码
    var surepwd = document.querySelector('#surepwd'); //确认密码

    regexp(psw, regpsw);
    //表单验证的函数
    function regexp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                console.log('正确的');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 输入正确';
            } else {
                console.log('不正确');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确，请重新输入';
            }
        }
    
    }
    //两次密码比较
    surepwd.onblur = function () {
        if (this.value == psw.value) {
            this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次密码输入不一致';

        }
    }
}