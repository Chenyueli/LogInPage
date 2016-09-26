/**
 * Created by chenyueli on 26/9/16.
 */
;
(function() {
	var $username = $("#username"),
		$password = $("#password");
		
	//解除输入禁止
	$("#username").removeAttr("disabled");
	$("#password").removeAttr("disabled");
	
	//提交前，验证用户名和密码
	$("button").click(function(e) {
		e.preventDefault();
		//alert(this);
		if(e.target.classList.contains("confirm")) {

			//确认登录
			var warning = "";
			if($username.val().trim().length == 0) {
				warning = "请输入账号";
			} else {
				if($password.val().trim().length == 0) {
					warning = "请输入密码";
				} else {

					//验证成功
					$(".confirm").text('取消');
					e.target.classList.add("cancel");
					e.target.classList.remove("confirm");
					$("button").css({
						"background-color": "#f08000"
					});
					$('.fa-spinner').removeClass('hidden');
					$(".form-signin").css({
						"opacity": "0.8"
					});

					//禁止输入
					$("#username").attr("disabled", true);
					$("#password").attr("disabled", true);

					//保存登录密码
					$(".checkbox > :checkbox").each(function() {
						if(this.checked == true) {
							CookieUtil.setCookie($username.val(), $password.val());
						} else {
							CookieUtil.delCookie($username.val());
							alert(CookieUtil.get($username.val()));
						}
					});
					//登录相关后台处理，例如: Ajax请求
				}
			}
			$(".tips").text(warning);

		} else if(e.target.classList.contains("cancel")) {

			//取消登录
			$(".cancel").text('确定');
			e.target.classList.add("confirm");
			e.target.classList.remove("cancel");
			$('.fa-spinner').addClass('hidden');
			$username.focus();
			$(".form-signin").css({
				"opacity": "1"
			});
			//解除输入禁止
			$("#username").removeAttr("disabled");
			$("#password").removeAttr("disabled");
		};
	});

	$username.focus(function() {
		this.select();
	});
	//自动填写密码
	$password.focus(function() {
		this.select();
		var pw = CookieUtil.getCookie($username.val());
		if(pw !== null) {
			this.value = pw;
		}
		this.select();
	});
})();

/*
 * Cookies-API, 保存格式：name1=value1；name2=value2；
 * @param name
 * @param value
 */
var CookieUtil = {

	setCookie: function(name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},

	getCookie: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},

	delCookie: function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if(cval != null) {
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	}
}