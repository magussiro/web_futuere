<!-- <!DOCTYPE html> -->
<!-- <html lang="zh-TW">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=1000">
    
    <meta name="author" content="">
	<meta itemprop="name" property="og:title" content="" >
	<meta itemprop="image" property="og:image" content="">
	<meta property="og:url" content="">
	<meta itemprop="image" property="og:image" content="">
	<meta name="description" itemprop="description" property="og:description" content="" >
   
    <title></title> -->
<?php
ini_set("display_errors",0);


function getNowSelectAccount(){
    $loginObj = $_COOKIE['loginObj'];
    if(empty($loginObj)){
        return '';
    }
    $loginObj = json_decode($loginObj,true);
    return $loginObj['now_select'];
}
function getNowSelectPw(){
    $loginObj = $_COOKIE['loginObj'];
    if(empty($loginObj)){
        return '';
    }
    $loginObj = json_decode($loginObj,true);
    $account= $loginObj['now_select'];
    if(empty($account))
        return '';
    return $loginObj[$account];
}


?>
<script>
    $(document).ready(function () {
        if (checkRemAcc() == false) {
            alert('為確保用戶使用品質及避免因為網路延遲造成問題!!\n 強烈建議在4G以上網路速度穩定的連線環境使用本教學軟體!!\n謝謝!');
            alert("此教學軟體用途為模擬測試教學使用請勿用於非法用途!\n一切法律問題皆與本公司無關恕不負責!");
        }
        //檢查瀏覽器
        var isSafari = navigator.userAgent.search("Safari") > -1
        if (!isSafari) {

            alert('請使用Chrome瀏覽器!\n若使用非Chrome瀏覽器可能導致無法使用此教學軟體完整功能。\n\n此教學軟體用途為模擬測試教學使用請勿用於非法用途!\n一切法律問題皆與本公司無關恕不負責!');
        }
        initCookie();

        if (checkRemAcc() == true) {
            setTimeout(autoLogin, 1000);
        }


        function initCookie() {
            var remAcc = _getCookie('rememberAccount');
            var remPw = _getCookie('rememberPass');
            if (remAcc === undefined) {
                _setCookie('rememberAccount', "off")
            }
            if (remPw === undefined) {
                _setCookie('rememberPass', "off")
            }
        }

        function checkRemAcc() {
            var remAcc = _getCookie('rememberAccount');
            var remPw = _getCookie('rememberPass');
            var json =getCookieJson("loginObj");
            if(json ===undefined ||json===''||json===null){
                return false;
            }
            if(json.now_select===undefined ||json.now_select===''||json.now_select===null){
                return false;
            }
            if(remAcc ===undefined ||remAcc ===''||remAcc ===null){
                return false;
            }
            if(remPw ===undefined ||remPw ===''||remPw ===null){
                return false;
            }
            if (remAcc === "on" && remPw === "on") {
                return true;
            }
            return false;
        }

        function autoLogin() {
            if (checkAcc() == false){
                return;
            }
            console.log("prepare_login");
            doLogin();
        }

        function checkAcc() {
            var tmp = $("#account").val();
            var tmp2 = $("#password").val();
            if (tmp !== undefined && tmp2 !== undefined && tmp !== '' && tmp2 !== '') {
                return true;
            }
            try {
                var loginObj = getCookieJson("loginObj");

            }catch(e){
                var loginObj ={};
                loginObj.now_select ="";
                setCookieJson("loginObj",loginObj)

            }finally {
                var loginObj = getCookieJson("loginObj");

                if(loginObj ===undefined ||loginObj==="" ||loginObj ===null){
                    return null;
                }
                if(loginObj.now_select==='')
                    return false;
                var tmp3 = loginObj[loginObj.now_select]
                var tmp4 = loginObj.now_select;
                if (tmp3 !== undefined && tmp4 !== undefined && tmp3 !== '' && tmp4 !== '') {

                    return true;
                }

                return false;
            }
            return false;


        }

        function doLogin() {
            var model = $("form").serializeArray();
            var obj = ajaxSave(model, webroot + "/login/doLogin");
            //alert(webroot+'/login/doLogin');
            obj.success(function (res) {
                // console.log(res);
                if (res.msg == "success") {

                    setLoginObjAtLogin(model);


                    // _setCookie("fu_acc", model[0].value, 365);
                    // _setCookie("fu_pw", model[1].value, 365);
                    var remAccCk = $.grep(model, function (e) {
                        return e.name === "rememberAccount";
                    });
                    if (remAccCk[0] !== undefined) {
                        var ckValue = remAccCk[0].value;
                        _setCookie("rememberAccount", ckValue, 365);
                    } else {
                        _setCookie("rememberAccount", "", 365);
                    }
                    var remPwCk = $.grep(model, function (e) {
                        return e.name === "rememberPass";
                    });
                    if (remPwCk[0] !== undefined) {
                        var ckValue = remPwCk[0].value;
                        _setCookie("rememberPass", ckValue, 365);
                    } else {
                        _setCookie("rememberPass", "", 365);
                    }
                    alertify.success("登入成功");
                    sessionStorage["loginCheck"] = true;
                    window.location.href = webroot + "/operation?token=" + res.token;
                }//
                else {
                    alertify.error(res.msg);
                }

            });
        }


        $('#butSubmit').click(function () {
            doLogin();
        });
        //檢查英文
        $('#account').keyup(function () {
            var _str = $('#account').val();
            re = /\W/;
            if (re.test(_str)) {
                $('#account').addClass('bad_str');
            } else {
                $('#account').removeClass('bad_str');
            }


        });
    });


    function getCookieJson(key) {
        var c = _getCookie(key);
        if (c === undefined || c === '') {
            return null;
        }
        var j = JSON.parse(c);
        console.log(j);
        return j;
    }
    function setCookieJson(key, json) {
        var jstr = JSON.stringify(json);
        _setCookie(key,jstr,365);
    }

    function setLoginObjAtLogin(model){
        var loginObj = getCookieJson("loginObj");
        if(loginObj ===''||loginObj===undefined||loginObj===null){
            loginObj ={};
        }
        console.table(model);
        var account = model[0].value;
        loginObj.now_select = account;
        loginObj[account]= model[1].value;
        // $.cookie("loginObj", JSON.stringify(loginObj), {path: "/", expires: 365});
        setCookieJson("loginObj",loginObj);
    }


</script>
<link rel="apple-touch-icon-precomposed" sizes="144x144"
      href="<?= $base_url ?>assets/login/img/apple-touch-icon-144x144-precomposed.png" type="image/x-icon">
<link rel="apple-touch-icon-precomposed" sizes="114x114"
      href="<?= $base_url ?>assets/login/img/apple-touch-icon-114x114-precomposed.png" type="image/x-icon">
<link rel="apple-touch-icon-precomposed" sizes="72x72"
      href="<?= $base_url ?>assets/login/img/apple-touch-icon-72x72-precomposed.png" type="image/x-icon">
<link rel="apple-touch-icon-precomposed" href="<?= $base_url ?>assets/login/img/apple-touch-icon-57x57-precomposed.png"
      type="image/x-icon">
<link rel="shortcut icon" href="<?= $base_url ?>assets/login/img/favicon.png">
<!-- Bootstrap -->
<link href="<?= $base_url ?>assets/login/css/bootstrap.css" rel="stylesheet">
<link href="<?= $base_url ?>assets/login/css/screen.css" rel="stylesheet">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<!-- </head>
<body>
	<h1></h1> -->

<div class="container">
    <div class="row">
        <div class="col-xs-5 login-flex">
            <div class="login-wrap">
                <div class="bg-gray">
                    <h2>教學端</h2>
                    <form>
                        <div class="form-group">
                            <label for="">線路</label>
                            <select class="form-control">
                                <option>1-伺服器</option>
                                <option>2-伺服器</option>
                                <option>3-伺服器</option>
                                <option>4-伺服器</option>
                                <option>5-伺服器</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="account">帳號</label>
                            <!-- <input type="" class="form-control" id="" placeholder=""> -->
                            <input id="account" class="form-control" type="text" name="account"
                                   value="<?php
                                   if (isset($_COOKIE['rememberAccount']) && $_COOKIE['rememberAccount'] == "on") {
                                       echo getNowSelectAccount();
                                   } ?>" style="padding:5px;" AutoComplete='Off'>
                        </div>
                        <div class="form-group">
                            <label for="password">密碼</label>
                            <!-- <input type="" class="form-control" id="" placeholder=""> -->
                            <input id="password" class="form-control" type="password" name="password"
                                   value="<?php  if (isset($_COOKIE['rememberPass']) && $_COOKIE['rememberPass'] == "on") {
                                       echo getNowSelectPw();
                                   } ?>" style="padding:5px;" AutoComplete='Off'>

                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <div class="checkbox">
                                    <label>
                                        <input name="rememberAccount"
                                               type="checkbox" <?php if (isset($_COOKIE['rememberAccount']) && $_COOKIE['rememberAccount'] == "on") {
                                            echo 'checked=\'checked\'';
                                        } ?> > 記住用戶名稱
                                    </label>
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="checkbox text-right">
                                    <label>
                                        <input name="rememberPass"
                                               type="checkbox" <?php if (isset($_COOKIE['rememberPass']) && $_COOKIE['rememberPass'] == "on") {
                                            echo 'checked=\'checked\'';
                                        } ?>> 記住密碼
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <!-- <button type="submit" id="butSubmit"class="btn btn-lg btn-primary btn-block">登入</button> -->
                            <input id="butSubmit" type="button" class="login" value="登入" style="color: #000">
                        </div>
                        <p>此教學軟體用途為模擬測試教學使用請勿用於非法用途！一切法律問題皆與本公司無關恕不負責！</p>
                        <div class="row download-wrap">
                            <div class="col-xs-6">
                                <img src="<?= $base_url ?>assets/login/img/qr-google.png" alt="GOOGLE PLAY下載點">
                                <br>
                                <p>GOOGLE PLAY下載點</p>
                            </div>
                            <div class="col-xs-6">
                                <img src="<?= $base_url ?>assets/login/img/qr-google.png" alt="IPHONE 蘋果專用">
                                <p>IPHONE 蘋果專用</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 	<footer></footer>
</body>
</html> -->
