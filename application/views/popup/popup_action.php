<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>動作日誌</title>
    <link rel="stylesheet" href="<?=$webroot;?>assets/css/reset.css">
    <link rel="stylesheet" href="<?=$webroot;?>assets/css/popup_black.css">
</head>
<body>
<div id="action_wrap">
    <div id="action_content">
        <ul class="action_select">
            <li class="action_option">
                <form action="">
                    開始日期
                    <input type="text" class="inputStyle1">
                    結束日期
                    <input type="text" class="inputStyle1">
                    <button class="btnStyle1">送出</button>
                </form>
            </li>
            <li class="action_option">
                快速查詢
                <a href="" class="btnStyle1">今日</a>
                <a href="" class="btnStyle1">昨日</a>
                <a href="" class="btnStyle1">本周</a>
                <a href="" class="btnStyle1">上週</a>
                <a href="" class="btnStyle1">本月</a>
                <a href="" class="btnStyle1">上月</a>
            </li>
        </ul>
        <div class="action_result">
            <ul class="action_content head">
                <li class="a">序號</li>
                <li class="b">帳號</li>
                <li class="c">動作類別</li>
                <li class="d">說明</li>
                <li class="e">日期</li>
                <li class="f">IP紀錄</li>
            </ul>
            <ul class="action_content">
                <li class="a">xxx</li>
                <li class="b">xxx</li>
                <li class="c">xxx</li>
                <li class="d">xxx</li>
                <li class="e">xxx</li>
                <li class="f">xxx</li>
            </ul>
            <ul class="action_content">
                <li class="a">xxx</li>
                <li class="b">xxx</li>
                <li class="c">xxx</li>
                <li class="d">xxx</li>
                <li class="e">xxx</li>
                <li class="f">xxx</li>
            </ul>
            <ul class="action_content">
                <li class="a">xxx</li>
                <li class="b">xxx</li>
                <li class="c">xxx</li>
                <li class="d">xxx</li>
                <li class="e">xxx</li>
                <li class="f">xxx</li>
            </ul>
        </div>
        <div class="action_bottom">
            <ul class="action_page_left">
                <li class="action_page_result">當前第[1/1]頁</li>
            </ul>
            <ul class="action_page_right">
                <li class="action_page_result">
                    <button>第一頁</button>
                    <button>上一頁</button>
                    <button>下一頁</button>
                    <button>最末頁</button>
                </li>
                <li class="action_page_result">
                    頁 / <input type="text"> 跳至
                    <select name="page" id="">
                        <option value="">1</option>
                        <option value="">2</option>
                    </select>
                </li>
            </ul>
        </div>
    </div>
</div>
</body>
</html>