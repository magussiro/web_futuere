<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>變更密碼</title>
        <link rel="stylesheet" href="<?= $webroot; ?>assets/css/reset.css">
        <link rel="stylesheet" href="<?= $webroot; ?>assets/css/popup_black.css">
        <script src="<?= $webroot ?>assets/js/jquery.js"></script>
        <script src="<?= $webroot ?>assets/js/common.js"></script>
        <style>
            td{
                padding:10px;
            }
        </style>
        <script>
            $(document).ready(function () {
<?php
if (isset($msg)) {
    echo 'alert(\'' . $msg . '\');';
    echo 'parent.close();';
}
?>

                $('#butSubmit').click(function () {
                    //alert(QueryString('token'));
                    $('#token').val(QueryString('token'));
                    //var account = $('#account').val();
                    var oldPass = $('#oldPass').val();
                    var newPass = $('#newPass').val();
                    var confirmPass = $('#confirmPass').val();


                    oldPass = oldPass.toLowerCase();
                    newPass = newPass.toLowerCase();
                    confirmPass = confirmPass.toLowerCase();
                    
                    
                    $('#oldPass').val(oldPass);
                    $('#newPass').val(newPass);
                    $('#confirmPass').val(confirmPass);

                    $('form').attr('action', 'password?token=' + QueryString('token'))




                    if (oldPass == '')
                    {

                        alert('請輸入舊密碼');
                        return false;
                    }
                    if (newPass == '')
                    {
                        alert('請輸入新密碼');
                        return false;
                    }
                    if (confirmPass == '')
                    {
                        alert('請輸入確認密碼');
                        return false;
                    }

                    if (newPass.length < 6)
                    {
                        alert('密碼長度最少要六碼');
                        return false;
                    }

                    if (newPass != confirmPass)
                    {
                        alert('新密碼和確認密碼不符');
                        return false;

                    }


                    $('form').submit();
                });



            });
        </script>
    </head>
    <body>
        <div style="padding:10px;font-weight:bold;">
            <h2 class="popupH2">變更密碼</h2>
        </div>
        <div >
            <div id="password_content" style="padding:10px;text-align:center;">
                <div class="password_top" style="margin:0 auto; ">
                    <form method="post" action="password" style="text-align:center;">
                        <table border="1" style="width:500px;margin:0 auto;">
                            <input id="token" name="token" type="hidden" value="" />
                               <!-- <tr>
                                    <td style="text-align:right;">帳號:</td>
                                    <td style="text-align:left;"><input style="padding-left:5px;" id="account" name="account" type="text"></td>
                                </tr>-->
                            <tr>
                                <td style="text-align:right;">舊密碼:</td>
                                <td style="text-align:left;"><input class="inputStyle3" id="oldPass" name="oldPass" type="password"></td>
                            </tr>
                            <tr>
                                <td style="text-align:right;">新密碼:</td>
                                <td style="text-align:left;"><input class="inputStyle3" id="newPass" name="newPass" type="password"></td>
                            </tr>
                            <tr>
                                <td style="text-align:right;">確認密碼:</td>
                                <td style="text-align:left;"><input class="inputStyle3" id="confirmPass" name="confirmPass" type="password"></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <button id="butSubmit" type="button" class="btnStyle2">確定變更密碼</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div class="password_bottom">
                    密碼規則:<br>
                    &nbsp;&nbsp;1.必須6位長度;<br>
                    &nbsp;&nbsp;2.需要數字和非數字組合;<br>
                    &nbsp;&nbsp;3.不能有４位或以上連續數字或字母(比如1111,aaaa,1234,abcd)
                </div>
            </div>
        </div>
    </body>
</html>