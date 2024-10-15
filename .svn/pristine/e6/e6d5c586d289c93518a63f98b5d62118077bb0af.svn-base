
<link href="<?=$base_url?>assets/css/login.css" rel="stylesheet"/>
<script>
    $( document ).ready(function() {
        
        $('#butSubmit').click(function(){
            var model = $("form").serializeArray();
            var obj  = ajaxSave(model,webroot +"/login/doLogin");
	    //alert(webroot+'/login/doLogin');
            obj.success(function (res) {
                console.log(res);
                if(res.msg=="success")
                {
                    alertify.success(res.msg);
                    window.location = webroot + "/operation?token="+res.token;
                }
                else
                {
                    alertify.error(res.msg);
                }
            
            });
        });
        
    });
</script>
<div id="wrap">
    <div id="content">
        <div class="panel">
            <div class="panel_heading">教學端</div>
            <div class="panel_body">
                <form name="login_form" class="login_form" action="">
                    <div class="form_group">
                        <label for="server">線路</label>
                        <select name="server">
                            <option value="1-伺服器">1-伺服器</option>
                            <option value="2-伺服器">2-伺服器</option>
                            <option value="3-伺服器">3-伺服器</option>
                            <option value="4-伺服器">4-伺服器</option>
                        </select>
                    </div>
                    <div class="form_group">
                        <label for="account">帳號</label>
                        <input id="account" type="text" name="account" value="<?php if(isset($acc)){echo $acc;}?>" style="padding:5px;" AutoComplete="Off">
                    </div>
                    <div class="form_group">
                        <label for="password">密碼</label>
                        <input id="password" type="password" name="password" value="<?php if(isset($pass)){echo $pass;}?>" style="padding:5px;" AutoComplete="Off">
                    </div>
                    <div class="remember" style="padding-left:10px;">
                        <input name="rememberAccount" type="checkbox" <?php if( isset( $_SESSION['acc'])){ echo 'checked=\'checked\'';} ?>>&nbsp;記住用戶名稱
                        &nbsp;&nbsp;&nbsp;&nbsp;<input name="rememberPass" type="checkbox"<?php if( isset( $_SESSION['pass'])){ echo 'checked=\'checked\'';} ?> >&nbsp;記住密碼
                    </div>
                    <input id="butSubmit" type="button" class="login" value="登入">
                </form>
            </div>
            <div style="color:red;padding:10px;">
                <h3>此教學軟體用途為模擬測試教學使用請勿用於非法用途!一切法律問題皆與本公司無關恕不負責!</h3>
            </div>
        </div>
    </div>
</div>
