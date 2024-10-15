<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>教學管理端 - 登入</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/login_black.css">

</head>
<body>
<div id="wrap">
    <div id="content">
        <ul class="login_items">
            <li><a target="_new" href="https://www.google.com/intl/zh-HK/chrome/browser/desktop/">Chrome下載</a></li>
	    <li><a target="_new" href="https://www.mozilla.org/zh-TW/firefox/new/">FireDox下載</a></li>
            <li><a href="">遠端協助</a></li>
            <li><a href="">意見回饋</a></li>
        </ul>
        <div class="panel">
            <div style="display: inline-block;vertical-align: middle;min-width: 350px;">
                <img class="logo_img" src="img/logo1.png" alt="Logo">
                <div>
                    <div class="panel_heading">教學管理端</div>
                    <div class="panel_body">
                        <form name="login_form" class="login_form" action="">
                            <div class="form_group">
                                <label for="server">線路：</label>
                                <select name="server">
                                    <option value="1-伺服器">1-伺服器</option>
                                    <option value="2-伺服器">2-伺服器</option>
                                    <option value="3-伺服器">3-伺服器</option>
                                    <option value="4-伺服器">4-伺服器</option>
                                </select>
                            </div>
                            <div class="form_group">
                                <label for="account">帳號：</label>
                                <input type="text" name="account">
                            </div>
                            <div class="form_group">
                                <label for="password">密碼：</label>
                                <input type="password" name="password">
                            </div>
                            <div class="remember">
                                <input type="checkbox"><label for="">記住用戶名稱</label><br>
                                <input type="checkbox"><label for="">記住密碼</label>
                            </div>
                            <input type="submit" class="login" value="登入">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
