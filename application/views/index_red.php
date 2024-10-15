<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>前台</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/font-awesome-4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/jquery-ui-red.min.css">
    <link rel="stylesheet" href="css/index_red.css">
    <style type="text/css">
    </style>
</head>
<body>
<div id="wrap">
    <header>
        <img src="img/logo2.png" alt="" id="logo">
        <h1>富暘理財</h1>
        <marquee width="64%">系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈</marquee>
        <div>
            <span>時間：</span><span id="serverTime">2016-07-21 10:00:12</span>
            <button type="button">18-伺服器</button>
        </div>
    </header>
    <div id="header">
        <div class="header_left">
            <ul class="mainmenu">
                <li class="main">連線
                    <ul class="submenu">
                        <li class="sub"><a href="">連線登入</a></li>
                        <li class="sub"><a href="">中斷連接</a></li>
                    </ul>
                </li>
                <li class="main">檢視
                    <ul class="submenu">
                        <li class="sub"><a href="">個人資料</a></li>
                        <li class="sub"><a href="">歷史損益</a></li>
                        <li class="sub"><a href="">歷史報價</a></li>
                        <li class="sub"><a href="">儲值紀錄</a></li>
                        <li class="sub"><a href="">動作日誌</a></li>
                    </ul>
                </li>
                <li class="main">設定
                    <ul class="submenu">
                        <li class="sub"><a href="">變更密碼</a></li>
                        <li class="sub"><a href="">商品選擇</a></li>
                        <li class="sub"><a href="">版面選擇</a></li>
                        <li class="sub"><a href="">視覺下單</a></li>
                        <li class="sub"><a href="">刪單不確認</a></li>
                        <li class="sub"><a href="">下單回報</a></li>
                        <li class="sub"><a href="">√拍手動畫</a></li>
                    </ul>
                </li>
                <li class="main">說明
                    <ul class="submenu">
                        <li class="sub"><a href="">交易規則</a></li>
                        <li class="sub"><a href="">相關網站</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="header_middle">
            <ul class="mainmenu">
                <li class="main">商品：壹指期（五月）</li>
                <li class="main">最後交易日：2016-05-17</li>
                <li class="main">禁新：7518, 9004</li>
                <li class="main">強平：7435, 9087</li>
            </ul>
        </div>
        <div class="header_right">
            <ul class="mainmenu">
                <li class="main"><i class="fa fa-cog"></i></li>
                <li class="main"><i class="fa fa-volume-up" aria-hidden="true"></i></li>
                <li class="main"><i class="fa fa-sign-out" aria-hidden="true"></i></li>
            </ul>
        </div>
    </div>
    <div id="content">
        <div id="left_cont">
            <div class="left_top">
                <div class="left_top_head">DCFDT01(正常收單)</div>
                <div class="left_top_body">
                    <ul class="list">
                        <li class="item title">客戶名稱：</li>
                        <li class="item">xxx</li>
                    </ul>
                    <ul class="list">
                        <li class="item title">服務人員：</li>
                        <li class="item">xxx</li>
                    </ul>
                    <ul class="list">
                        <li class="item title">服務專線：</li>
                        <li class="item">xxx</li>
                    </ul>
                    <ul class="list">
                        <li class="item title">預設額度：</li>
                        <li class="item">xxx</li>
                    </ul>
                    <ul class="list">
                        <li class="item title">帳戶餘額：</li>
                        <li class="item">xxx</li>
                    </ul>
                    <ul class="list">
                        <li class="item title">今日損益：</li>
                        <li class="item">xxx</li>
                    </ul>
                </div>
            </div>
            <div id="left_mid">
                <!-------- Status 1: 五檔揭示 ------->
                <div class="left_main_bottom">
                    <div id="select1" class="left_bottom status1">
                        <div class="left_bottom_head">
                            <div class="head">五檔報價[壹指期]</div>
                        </div>
                        <div class="left_bottom_body">
                            <ul class="list2 header">
                                <li class="item2 title2 one head">比例</li>
                                <li class="item2 title2 two">委買</li>
                                <li class="item2 title2 three">價格</li>
                                <li class="item2 title2 four">委賣</li>
                                <li class="item2 title2 five head">比例</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 two">xx</li>
                                <li class="item2 three">xx</li>
                                <li class="item2 four">xxx</li>
                                <li class="item2 five">xx
                                    <div>xx</div>
                                </li>
                            </ul>
                        </div>
                        <div class="left_bottom_sum">
                            <ul class="sum">
                                <li class="sum_option">106</li>
                                <li class="sum_option">總計</li>
                                <li class="sum_option">105</li>
                            </ul>
                        </div>
                        <div class="left_bottom_compare">
                            <ul class="compare">
                                <li class="compare_option many">多勢</li>
                                <li class="compare_option head">xx
                                    <div class="many_bar">xx</div>
                                    <div class="empty_bar">xx</div>
                                </li>
                                <li class="compare_option empty">空勢</li>
                            </ul>
                        </div>
                    </div>
                    <!-------- Status 2: 量價分佈 ------->
                    <div id="select2" class="left_bottom status2">
                        <div class="left_bottom_head">
                            <div class="head">量價分佈[輕油期]</div>
                            <button>歷史</button>
                        </div>
                        <div class="left_bottom_body">
                            <ul class="list2 header">
                                <li class="item2 title2 one">價格</li>
                                <li class="item2 title2 two"></li>
                                <li class="item2 title2 three head">比例</li>
                                <li class="item2 title2 four">口</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">現價</li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                        </div>
                        <div class="left_bottom_direction">
                            <ul class="direction">
                                <li class="direction_option">
                                    <button>往上</button>
                                </li>
                                <li class="direction_option">
                                    <button>置中</button>
                                </li>
                                <li class="direction_option">
                                    <button>往下</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-------- Status 3: 報價明細 ------->
                    <div id="select3" class="left_bottom status3">
                        <div class="left_bottom_head">
                            <div class="head">報價明細[滬深期]</div>
                            <button>查詢</button>
                            <input type="checkbox" checked><span>置底</span>
                        </div>
                        <div class="left_bottom_body">
                            <ul class="list2 header">
                                <li class="item2 title2 one">市場時間</li>
                                <li class="item2 title2 two">口</li>
                                <li class="item2 title2 three">漲跌</li>
                                <li class="item2 title2 four">價格</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three"><i class="fa fa-caret-up" aria-hidden="true"></i></li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three"><i class="fa fa-caret-up" aria-hidden="true"></i></li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three"><i class="fa fa-caret-up" aria-hidden="true"></i></li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three"><i class="fa fa-caret-up" aria-hidden="true"></i></li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                            <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two">xxx</li>
                                <li class="item2 three">xxx</li>
                                <li class="item2 four">xxx</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="left_bottom_select">
                    <ul class="select">
                        <li class="option">
                            <a href="#select1">五檔揭示</a>
                        </li>
                        <li class="option">
                            <a href="#select2">量價分佈</a>
                        </li>
                        <li class="option">
                            <a href="#select3">分價揭示</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="right_cont">
            <div class="right_top">
                <div class="right_top_body">
                    <ul class="figure figure_title">
                        <li class="figure_result">商品</li>
                        <li class="figure_result">倉位</li>
                        <li class="figure_result">K線</li>
                        <li class="figure_result">走勢</li>
                        <li class="figure_result">成交</li>
                        <li class="figure_result">買進</li>
                        <li class="figure_result">賣出</li>
                        <li class="figure_result">漲跌</li>
                        <li class="figure_result">漲跌幅</li>
                        <li class="figure_result">總量</li>
                        <li class="figure_result">開盤</li>
                        <li class="figure_result">最高</li>
                        <li class="figure_result">最低</li>
                        <li class="figure_result">昨收盤</li>
                        <li class="figure_result">昨結算</li>
                        <li class="figure_result">狀態</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">加權指</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result upColor">8146</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor"><i class="fa fa-caret-up" aria-hidden="true"></i> 21</li>
                        <li class="figure_result upColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result upColor">8169</li>
                        <li class="figure_result upColor">8170</li>
                        <li class="figure_result upColor">8104</li>
                        <li class="figure_result upColor">8148</li>
                        <li class="figure_result upColor">8167</li>
                        <li class="figure_result">參考用</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">壹指期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result downColor">8146</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor"><i class="fa fa-caret-down" aria-hidden="true"></i> 21</li>
                        <li class="figure_result downColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result downColor">8169</li>
                        <li class="figure_result downColor">8170</li>
                        <li class="figure_result downColor">8104</li>
                        <li class="figure_result downColor">8148</li>
                        <li class="figure_result downColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">電子期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result upColor">8146</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor"><i class="fa fa-caret-up" aria-hidden="true"></i> 21</li>
                        <li class="figure_result upColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result upColor">8169</li>
                        <li class="figure_result upColor">8170</li>
                        <li class="figure_result upColor">8104</li>
                        <li class="figure_result upColor">8148</li>
                        <li class="figure_result upColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">金融期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result downColor">8146</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor"><i class="fa fa-caret-down" aria-hidden="true"></i> 21</li>
                        <li class="figure_result downColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result downColor">8169</li>
                        <li class="figure_result downColor">8170</li>
                        <li class="figure_result downColor">8104</li>
                        <li class="figure_result downColor">8148</li>
                        <li class="figure_result downColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">恆生期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result upColor">8146</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor"><i class="fa fa-caret-up" aria-hidden="true"></i> 21</li>
                        <li class="figure_result upColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result upColor">8169</li>
                        <li class="figure_result upColor">8170</li>
                        <li class="figure_result upColor">8104</li>
                        <li class="figure_result upColor">8148</li>
                        <li class="figure_result upColor">8167</li>
                        <li class="figure_result">交易中</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">上海期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result downColor">8146</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor"><i class="fa fa-caret-down" aria-hidden="true"></i> 21</li>
                        <li class="figure_result downColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result downColor">8169</li>
                        <li class="figure_result downColor">8170</li>
                        <li class="figure_result downColor">8104</li>
                        <li class="figure_result downColor">8148</li>
                        <li class="figure_result downColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">滬深期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result upColor">8146</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor"><i class="fa fa-caret-up" aria-hidden="true"></i> 21</li>
                        <li class="figure_result upColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result upColor">8169</li>
                        <li class="figure_result upColor">8170</li>
                        <li class="figure_result upColor">8104</li>
                        <li class="figure_result upColor">8148</li>
                        <li class="figure_result upColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">日經期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result downColor">8146</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor"><i class="fa fa-caret-down" aria-hidden="true"></i> 21</li>
                        <li class="figure_result downColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result downColor">8169</li>
                        <li class="figure_result downColor">8170</li>
                        <li class="figure_result downColor">8104</li>
                        <li class="figure_result downColor">8148</li>
                        <li class="figure_result downColor">8167</li>
                        <li class="figure_result">交易中</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">歐元期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result downColor">8146</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor"><i class="fa fa-caret-down" aria-hidden="true"></i> 21</li>
                        <li class="figure_result downColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result downColor">8169</li>
                        <li class="figure_result downColor">8170</li>
                        <li class="figure_result downColor">8104</li>
                        <li class="figure_result downColor">8148</li>
                        <li class="figure_result downColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">法蘭克</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result upColor">8146</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor"><i class="fa fa-caret-up" aria-hidden="true"></i> 21</li>
                        <li class="figure_result upColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result upColor">8169</li>
                        <li class="figure_result upColor">8170</li>
                        <li class="figure_result upColor">8104</li>
                        <li class="figure_result upColor">8148</li>
                        <li class="figure_result upColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">道瓊期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result upColor">8146</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor"><i class="fa fa-caret-up" aria-hidden="true"></i> 21</li>
                        <li class="figure_result upColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result upColor">8169</li>
                        <li class="figure_result upColor">8170</li>
                        <li class="figure_result upColor">8104</li>
                        <li class="figure_result upColor">8148</li>
                        <li class="figure_result upColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">那斯達</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result downColor">8146</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor"><i class="fa fa-caret-down" aria-hidden="true"></i> 21</li>
                        <li class="figure_result downColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result downColor">8169</li>
                        <li class="figure_result downColor">8170</li>
                        <li class="figure_result downColor">8104</li>
                        <li class="figure_result downColor">8148</li>
                        <li class="figure_result downColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">輕油期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result upColor">8146</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor"><i class="fa fa-caret-up" aria-hidden="true"></i> 21</li>
                        <li class="figure_result upColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result upColor">8169</li>
                        <li class="figure_result upColor">8170</li>
                        <li class="figure_result upColor">8104</li>
                        <li class="figure_result upColor">8148</li>
                        <li class="figure_result upColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">黃金期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result downColor">8146</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor">0</li>
                        <li class="figure_result downColor"><i class="fa fa-caret-down" aria-hidden="true"></i> 21</li>
                        <li class="figure_result downColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result downColor">8169</li>
                        <li class="figure_result downColor">8170</li>
                        <li class="figure_result downColor">8104</li>
                        <li class="figure_result downColor">8148</li>
                        <li class="figure_result downColor">8167</li>
                        <li class="figure_result unopen">未開盤</li>
                    </ul>
                    <ul class="figure">
                        <li class="figure_result product">白銀期</li>
                        <li class="figure_result blue">0</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result">X</li>
                        <li class="figure_result upColor">8146</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor">0</li>
                        <li class="figure_result upColor"><i class="fa fa-caret-up" aria-hidden="true"></i> 21</li>
                        <li class="figure_result upColor">-0.26%</li>
                        <li class="figure_result blue">3927550</li>
                        <li class="figure_result upColor">8169</li>
                        <li class="figure_result upColor">8170</li>
                        <li class="figure_result upColor">8104</li>
                        <li class="figure_result upColor">8148</li>
                        <li class="figure_result upColor">8167</li>
                        <li class="figure_result">交易中</li>
                    </ul>
                </div>
            </div>
            <div class="right_middle">
                <div class="right_middle_head">
                    <ul class="head_option">
                        <li class="head_option_result"><a href="#option1">買賣下單(0)</a></li>
                        <li class="head_option_result"><a href="#option2">未平倉</a></li>
                        <li class="head_option_result"><a href="#option3">已平倉</a></li>
                        <li class="head_option_result"><a href="#option4">商品統計</a></li>
                        <li class="head_option_result"><a href="#option5">對帳表</a></li>
                        <li class="head_option_result"><a href="#option6">投顧訊息(0)</a></li>
                    </ul>
                </div>
                <div>
                    <div class="right_middle_body" id="option1">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">→刪單</li>
                                    <li class="select1_result">
                                        <input type="checkbox">全選
                                    </li>
                                    <li class="select1_result">
                                        <input type="checkbox">全不選
                                    </li>
                                </ul>
                            </div>
                            <div class="right_middle_body_right">
                                <ul class="right_middle_body_select2">
                                    <li class="select2_result">
                                        <input type="radio">全部單據
                                    </li>
                                    <li class="select2_result">
                                        <input type="radio">未成交單據
                                    </li>
                                    <li class="select2_result">
                                        <input type="checkbox">顯示全部商品單據
                                    </li>
                                    <li class="select2_result">
                                        <input type="checkbox">自動置底
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="right_middle_body_bottom">
                            <ul class="list3 header">
                                <li class="item3 title3">操作</li>
                                <li class="item3 title3 a">序號</li>
                                <li class="item3 title3">商品</li>
                                <li class="item3 title3">倒</li>
                                <li class="item3 title3">多空</li>
                                <li class="item3 title3">委託價</li>
                                <li class="item3 title3">口數</li>
                                <li class="item3 title3">成交價</li>
                                <li class="item3 title3 b">下單時間</li>
                                <li class="item3 title3 b">完成時間</li>
                                <li class="item3 title3">型別</li>
                                <li class="item3 title3">損失點數</li>
                                <li class="item3 title3">獲利點數</li>
                                <li class="item3 title3">狀態</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3"></li>
                                <li class="item3 a">14074628</li>
                                <li class="item3">壹指期</li>
                                <li class="item3">XXX</li>
                                <li class="item3">多</li>
                                <li class="item3">8102</li>
                                <li class="item3">5</li>
                                <li class="item3">8102</li>
                                <li class="item3 b">2015-06-06 13:00:00</li>
                                <li class="item3 b">2015-06-06 13:00:00</li>
                                <li class="item3">系統</li>
                                <li class="item3">無</li>
                                <li class="item3">無</li>
                                <li class="item3">已成交<br>(轉新單)</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3"></li>
                                <li class="item3 a">14074628</li>
                                <li class="item3">壹指期</li>
                                <li class="item3"></li>
                                <li class="item3">多</li>
                                <li class="item3">8102</li>
                                <li class="item3">5</li>
                                <li class="item3">8102</li>
                                <li class="item3 b">2015-06-06 13:00:00</li>
                                <li class="item3 b">2015-06-06 13:00:00</li>
                                <li class="item3">系統</li>
                                <li class="item3">無</li>
                                <li class="item3">無</li>
                                <li class="item3">已成交<br>(轉新單)</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3"></li>
                                <li class="item3 a">14074628</li>
                                <li class="item3">壹指期</li>
                                <li class="item3"></li>
                                <li class="item3">多</li>
                                <li class="item3">8102</li>
                                <li class="item3">5</li>
                                <li class="item3">8102</li>
                                <li class="item3 b">2015-06-06 13:00:00</li>
                                <li class="item3 b">2015-06-06 13:00:00</li>
                                <li class="item3">系統</li>
                                <li class="item3">無</li>
                                <li class="item3">無</li>
                                <li class="item3">已成交<br>(轉新單)</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3"></li>
                                <li class="item3 a">14074628</li>
                                <li class="item3">壹指期</li>
                                <li class="item3"></li>
                                <li class="item3">多</li>
                                <li class="item3">8102</li>
                                <li class="item3">5</li>
                                <li class="item3">8102</li>
                                <li class="item3 b">2015-06-06 13:00:00</li>
                                <li class="item3 b">2015-06-06 13:00:00</li>
                                <li class="item3">系統</li>
                                <li class="item3">無</li>
                                <li class="item3">無</li>
                                <li class="item3">已成交<br>(轉新單)</li>
                            </ul>
                        </div>
                    </div>
                    <!--未平倉 option 2-->
                    <div class="right_middle_body" id="option2">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        <button>市價平倉</button>
                                    </li>
                                    <li class="select1_result">
                                        <button>設定損利點</button>
                                    </li>
                                    <li class="select1_result">
                                        <input type="checkbox">全選
                                    </li>
                                    <li class="select1_result">
                                        <input type="checkbox">全不選
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="right_middle_body_bottom">
                            <ul class="list3 header">
                                <li class="item3 title3">序號</li>
                                <li class="item3 title3">操作</li>
                                <li class="item3 title3">商品</li>
                                <li class="item3 title3">買賣</li>
                                <li class="item3 title3">型別</li>
                                <li class="item3 title3">成交價</li>
                                <li class="item3 title3">口數</li>
                                <li class="item3 title3">手續費</li>
                                <li class="item3 title3">損失點數</li>
                                <li class="item3 title3">獲利點數</li>
                                <li class="item3 title3">倒線(利)</li>
                                <li class="item3 title3">未平損益</li>
                                <li class="item3 title3">點數</li>
                                <li class="item3 title3">天數</li>
                                <li class="item3 title3">狀態</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                        </div>
                    </div>
                    <!--已平倉 option3-->
                    <div class="right_middle_body" id="option3">
                        <div class="right_middle_body_bottom">
                            <ul class="list3 header">
                                <li class="item3 title3">商品</li>
                                <li class="item3 title3">新倉序號</li>
                                <li class="item3 title3">平倉序號</li>
                                <li class="item3 title3">新倉型別</li>
                                <li class="item3 title3">平倉型別</li>
                                <li class="item3 title3">口數</li>
                                <li class="item3 title3">多空</li>
                                <li class="item3 title3">成交價</li>
                                <li class="item3 title3">平倉價</li>
                                <li class="item3 title3">成交日期</li>
                                <li class="item3 title3">平倉日期</li>
                                <li class="item3 title3">點數</li>
                                <li class="item3 title3">種類</li>
                                <li class="item3 title3">手續費</li>
                                <li class="item3 title3">損益</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                        </div>
                    </div>
                    <!--商品統計 option4-->
                    <div class="right_middle_body" id="option4">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        預設額度：xxxxx
                                    </li>
                                    <li class="select1_result">
                                        今日損益：xxxxx
                                    </li>
                                    <li class="select1_result">
                                        留倉預扣：xxxxx
                                    </li>
                                    <li class="select1_result">
                                        帳戶餘額：xxxxx
                                    </li>
                                    <li class="select1_result">
                                        <input type="checkbox">顯示全部
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="right_middle_body_bottom">
                            <ul class="list3 header">
                                <li class="item3 title3">商品名稱</li>
                                <li class="item3 title3">總多</li>
                                <li class="item3 title3">總空</li>
                                <li class="item3 title3">未平倉</li>
                                <li class="item3 title3">總口數</li>
                                <li class="item3 title3 b">手續費合計</li>
                                <li class="item3 title3">損益</li>
                                <li class="item3 title3">倉留預扣</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>
                        </div>
                    </div>
                    <!--對帳表 option5-->
                    <div class="right_middle_body" id="option5">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        開始日期
                                        <input type="text" id="option5From" name="option5From">
                                        結束日期
                                        <input type="text" id="option5To" name="option5To">
                                        <button>送出</button>
                                    </li>
                                    <li class="select1_result">
                                        快速查詢
                                        <a href="">今日</a>
                                        <a href="">昨日</a>
                                        <a href="">本週</a>
                                        <a href="">上週</a>
                                        <a href="">本月</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="right_middle_body_bottom">
                            <ul class="list3 header">
                                <li class="item3 title3">日期</li>
                                <li class="item3 title3 a">預設額度</li>
                                <li class="item3 title3">帳戶餘額</li>
                                <li class="item3 title3">今日損益</li>
                                <li class="item3 title3">口數</li>
                                <li class="item3 title3">留倉預扣</li>
                                <li class="item3 title3 b">對匯額度</li>
                                <li class="item3 title3 b">交收</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3 a">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3 b">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3 a">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3 b">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3 a">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3 b">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3 a">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3 b">XXX</li>
                            </ul>
                        </div>
                    </div>
                    <!--投顧訊息 option6-->
                    <div class="right_middle_body" id="option6">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        開始日期
                                        <input type="text" id="option6From" name="option6From">
                                        結束日期
                                        <input type="text" id="option6To" name="option6To">
                                        <button>送出</button>
                                    </li>
                                    <li class="select1_result">
                                        快速查詢
                                        <a href="">今日</a>
                                        <a href="">昨日</a>
                                        <a href="">本週</a>
                                        <a href="">上週</a>
                                        <a href="">本月</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        <select name="all">
                                            <option value="">全部</option>
                                            <option value="">期貨</option>
                                            <option value="">股票</option>
                                            <option value="">選擇</option>
                                        </select>
                                    </li>
                                    <li class="select1_result">
                                        <button>老師人物設定</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="right_middle_body_right">
                                <ul class="right_middle_body_select2">
                                    <li class="select2_result">
                                        <input type="checkbox">訊息聲音提示
                                    </li>
                                    <li class="select2_result">
                                        <button>音效試聽</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="right_middle_body_bottom option6">
                            <ul class="list3 header">
                                <li class="item3 title3">類別</li>
                                <li class="item3 title3">老師</li>
                                <li class="item3 title3 c">訊息內容</li>
                                <li class="item3 title3 d">發布時間</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 c">XXX</li>
                                <li class="item3 d">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 c">XXX</li>
                                <li class="item3 d">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 c">XXX</li>
                                <li class="item3 d">XXX</li>
                            </ul>
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 c">XXX</li>
                                <li class="item3 d">XXX</li>
                            </ul>
                        </div>
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        <input type="checkbox">自動刷新
                                    </li>
                                    <li class="select1_result">
                                        最後更新時間: 剩 XX 秒
                                    </li>
                                    <li class="select1_result">
                                        秒數
                                        <select name="time" id="">
                                            <option value="">10</option>
                                            <option value="">30</option>
                                            <option value="">60</option>
                                            <option value="">90</option>
                                        </select>
                                        <button>刷新</button>
                                    </li>
                                    <li class="select1_result">
                                        當前第 1/2 頁
                                    </li>
                                </ul>
                            </div>
                            <div class="right_middle_body_right">
                                <ul class="right_middle_body_select2">
                                    <li class="select2_result">
                                        <button>第一頁</button>
                                        <button>上一頁</button>
                                        <button>下一頁</button>
                                        <button>最末頁</button>
                                    </li>
                                    <li class="select2_result">
                                        頁 /
                                        <input type="text">
                                        跳至
                                        <select name="page" id="">
                                            <option value="">1</option>
                                            <option value="">2</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right_bottom">
                <div class="right_bottom_one">
                    <div class="one_title">壹指期</div>
                    <div class="one_option">
                        <div><input type="radio" name="rt_3_1" id="rt_3_1_1" checked>一般</div>
                        <div><input type="radio" name="rt_3_1" id="rt_3_1_2">雷電</div>
                    </div>
                </div>
                <div class="right_bottom_two">
                    <div class="right_bottom_two_top">
                        <input type="radio" class="two_option">批分單
                        <input type="radio" class="two_option">市價單
                    </div>
                    <div class="right_bottom_two_bottom">
                        <input type="radio" class="two_option">收盤單
                        <input type="radio" class="two_option">限價單
                    </div>

                </div>
                <div class="right_bottom_three">
                    <div class="right_bottom_three_top">
                        <div class="three_title">停利：</div>
                        <input type="number" value="0">
                    </div>
                    <div class="right_bottom_three_bottom">
                        <div class="three_title">停損：</div>
                        <input type="number" value="0">
                    </div>
                </div>
                <div class="right_bottom_four">
                    <div class="right_bottom_four_top">
                        <button class="four_option">1</button>
                        <button class="four_option">2</button>
                        <button class="four_option">3</button>
                        <button class="four_option">4</button>
                        <button class="four_option">5</button>
                    </div>
                    <div class="right_bottom_four_middle">
                        <div class="four_title">口數</div>
                        <input type="number" value="1">
                    </div>
                    <div class="right_bottom_four_bottom">
                        <button class="four_edit">編輯</button>
                        <button class="four_delete">還原</button>
                    </div>
                </div>
                <div class="right_bottom_five">
                    <div class="five_left">下多單</div>
                    <div class="five_right">
                        <button>全平</button>
                    </div>
                </div>
                <div class="right_bottom_six">
                    <div class="six_left">下空單</div>
                    <div class="right_bottom_four" style="display:none;" id="rt_3_6_2">
                        <div class="right_bottom_four_top">
                            <button class="four_option">1</button>
                            <button class="four_option">2</button>
                            <button class="four_option">3</button>
                            <button class="four_option">4</button>
                            <button class="four_option">5</button>
                        </div>
                        <div class="right_bottom_four_middle">
                            <div class="four_title">口數</div>
                            <input type="number" value="1">
                        </div>
                        <div class="right_bottom_four_bottom">
                            <button class="four_edit">編輯</button>
                            <button class="four_delete">還原</button>
                        </div>
                    </div>
                    <div class="six_right">
                        <div><input type="checkbox" checked>(壹指期)收盤全平</div>
                        <div id="rt_3_6_3_2"><input type="checkbox">下單不確認</div>
                        <div id="rt_3_6_3_3"><input type="checkbox">限價成交提示</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>
</body>
<!-- <script src="jquery/jquery-1.11.3.min.js"></script> -->
<script src="jquery/jquery-3.1.0.min.js"></script>
<script src="jquery/jquery-ui.min.js"></script>
<script type="text/javascript">
    $(function () {
        // 幫 #menu li 加上 hover 事件
        $('.mainmenu li').hover(function () {
            // 先找到 li 中的子選單
            var _this = $(this),
                _subnav = _this.children('ul');

            // 變更目前母選項的背景顏色
            // 同時顯示子選單(如果有的話)
//            _this.css('backgroundColor', '#06c');
            _subnav.css('display', 'block');
        }, function () {
            // 變更目前母選項的背景顏色
            // 同時隱藏子選單(如果有的話)
            // 也可以把整句拆成上面的寫法
            $(this).css('backgroundColor', '').children('ul').css('display', 'none');
        });

        // 取消超連結的虛線框
        $('a').focus(function () {
            this.blur();
        });
    });

    $(function () {
        // 預設顯示第一個 Tab
        var _showTab = 0;
        var $defaultLi = $('ul.select li').eq(_showTab).addClass('selected');
        $($defaultLi.find('a').attr('href')).siblings().hide();

        // 當 li 頁籤被點擊時...
        // 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
        $('ul.select li').click(function () {
            // 找出 li 中的超連結 href(#id)
            var $this = $(this),
                _clickTab = $this.find('a').attr('href');
            // 把目前點擊到的 li 頁籤加上 .active
            // 並把兄弟元素中有 .active 的都移除 class
            $this.addClass('selected').siblings('.selected').removeClass('selected');
            // 淡入相對應的內容並隱藏兄弟元素
            $(_clickTab).stop(false, true).fadeIn().siblings().hide();

            return false;
        }).find('a').focus(function () {
            this.blur();
        });
    });

    $(function () {
        // 預設顯示第一個 Tab
        var _showTab = 0;
        var $defaultLi = $('ul.head_option li').eq(_showTab).addClass('picked');
        $($defaultLi.find('a').attr('href')).siblings().hide();

        // 當 li 頁籤被點擊時...
        // 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
        $('ul.head_option li').click(function () {
            // 找出 li 中的超連結 href(#id)
            var $this = $(this),
                _clickTab = $this.find('a').attr('href');
            // 把目前點擊到的 li 頁籤加上 .active
            // 並把兄弟元素中有 .active 的都移除 class
            $this.addClass('picked').siblings('.picked').removeClass('picked');
            // 淡入相對應的內容並隱藏兄弟元素
            $(_clickTab).stop(false, true).fadeIn().siblings().hide();

            return false;
        }).find('a').focus(function () {
            this.blur();
        });
    });

    $("#rt_3_1_1").change(function(){
        $(".right_bottom_two").css("display", "inline-block");
        $(".right_bottom_three").css("display", "inline-block");
        $("#rt_3_6_2").css("display", "none");
        $("#rt_3_6_3_2").css("display", "block");
        $("#rt_3_6_3_3").css("display", "block");
    });

    $("#rt_3_1_2").change(function(){
        $(".right_bottom_two").css("display", "none");
        $(".right_bottom_three").css("display", "none");
        $("#rt_3_6_2").css("display", "inline-block");
        $("#rt_3_6_3_2").css("display", "none");
        $("#rt_3_6_3_3").css("display", "none");
    });

    /* 對帳表Tab #option5From #option5To */

    $(function() {

        var dateFormat = "mm/dd/yy",
            option5From = $("#option5From")
            .datepicker({
                defaultDate: "0",
                changeMonth: false,
                numberOfMonths: 1,
                maxDate: 0,
                monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
            })
            .on("change", function() {
                option5To.datepicker("option", "minDate", getDate(this));
            }),
            option5To = $("#option5To").datepicker({
                defaultDate: "0",
                changeMonth: false,
                numberOfMonths: 1,
                maxDate: 0,
                monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
            })
            .on("change", function() {
                option5From.datepicker("option", "maxDate", getDate(this));
            });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
    });

    /* 投顧訊息Tab #option6From #option6To */

    $(function() {

        var dateFormat = "mm/dd/yy",
            option6From = $("#option6From")
            .datepicker({
                defaultDate: "0",
                changeMonth: false,
                numberOfMonths: 1,
                maxDate: 0,
                monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
            })
            .on("change", function() {
                option6To.datepicker("option", "minDate", getDate(this));
            }),
            option6To = $("#option6To").datepicker({
                defaultDate: "0",
                changeMonth: false,
                numberOfMonths: 1,
                maxDate: 0,
                monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
            })
            .on("change", function() {
                option6From.datepicker("option", "maxDate", getDate(this));
            });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
    });


</script>
</html>