<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="<?=$base_url?>assets/css/reset.css">
    <link rel="stylesheet" href="<?=$base_url?>assets/css/index.css">
    <link rel="stylesheet" href="<?=$base_url?>assets/css/font-awesome-4.4.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="<?=$base_url?>assets/css/colorbox.css">
    <script type="text/javascript" src="<?=$base_url?>assets/js/jquery.colorbox.js"></script>

    <script type="text/javascript" src="<?=$base_url?>assets/js/DataTables-1.10.4/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?=$base_url?>assets/js/DataTables-1.10.4/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="<?=$base_url?>assets/js/DataTables-1.10.4/dataTables.tableTools.min.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$base_url?>assets/css/dataTables-1.10.4/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$base_url?>assets/css/dataTables-1.10.4/css/dataTables.bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$base_url?>assets/css/dataTables-1.10.4/css/dataTables.tableTools.min.css" />
    <script src="<?=$base_url?>assets/js/common.js"></script>
    <script src="<?=$base_url?>assets/js/DatatablesUse.js"></script>

    <link rel="stylesheet" type="text/css"  href="<?=$base_url?>assets/css/jquery.marquee.css" />
    <script src="<?=$base_url?>assets/js/jquery.marquee.js"></script>

    <script type="text/javascript" src="<?=$base_url?>assets/js/bootstrap-datepicker.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$base_url?>assets/css/bootstrap-select.css" />

    <script type="text/javascript" src="<?=$base_url?>assets/js/moment.js"></script>

    <style>
        .tb_list
        {
            width:100%;

        }
        .tb_list th
        {
            background: -webkit-linear-gradient(top, #888787 1%, rgba(184, 184, 184, 0.77) 100%);
            color: #fff;
            border:solid 1px #dcdcdc;
            padding:5px;
            text-align:center;
        }
        .tb_list td
        {
            font-size:14px;
            border:solid 1px #dcdcdc;
            padding:5px;
        }
        table.datatable thead th
        {
            border :  border:solid 1px #dcdcdc;
        }
    </style>
        
</head>
<body>
<!--
  <div id="loading" style="display:block;position:fixed; top:0%; left:0%;opacity:0.9;width:100%;height:100%;z-index:999;text-align:center;padding-top:30px;font-size:25px;background-color:black;">
        <div  style="position:absolute; top:20%; left:20%;background-color:#dcdcdc;opacity: 1;width:60%;height:100px;z-index:2;text-align:center;padding-top:10px;font-size:25px;">
             <img style="margin-top:10px;" width="20" src="assets/img/loading.gif" alt="" /> 連接建立中，請稍候...
        </div>
   </div>
   -->
   
    <div id="div_paying" style="display:none;color:#00AEAE;font-size:30px; position:absolute;z-index:9999;top:25%;left:1px;text-align:center;background-color:#dcdcdc;padding-top:50px;padding-bottom:50px;padding-left:150px;width:100%;border:solid 1px gray;opacity:0.8;"> 
        <img src="<?=$base_url?>assets/img/loading.gif" />&nbsp; 交收處理中，請待交收完畢再進行交易。
    </div>
  
   <input type="hidden" id="default_money" value="<?php
                if($config['default_money']!=null)
                {echo $config['default_money'];}?>" />
    <input type="hidden" id="user_money" value="<?php
                if($config['user_money']!=null)
                {echo $config['user_money'];}?>" />
<div id="wrap" style="position:absolute;z-index:1;"> 
     <header>
        <img src="<?=$base_url?>assets/img/logo2.png" alt="" id="logo">
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
                        <!--<li class="sub"><a onclick="connect();return false;" href="">連線登入</a></li>-->
                        <li class="sub"><a onclick="onClose();return false;" href="">中斷連接</a></li>
                    </ul>
                </li>
                <li class="main">檢視
                    <ul class="submenu">
                        <li class="sub"><a onclick="popwin('popup/personalInfo',800,600);return false;" href="">個人資料</a></li>
                        <li class="sub"><a onclick="popwin('popup/historyProfit',800,600);return false;" href="">歷史損益</a></li>
                        <li class="sub"><a onclick="popwin('popup/historyQuote',800,600);return false;" href="">歷史報價</a></li>
                        <li class="sub"><a onclick="popwin('popup/deposit',800,600);return false;" href="">儲值紀錄</a></li>
                        <li class="sub"><a onclick="popwin('popup/log',800,600);return false;" href="">動作日誌</a></li>
                    </ul>
                </li>
                <li class="main">設定
                    <ul class="submenu">
                    
                        <li class="sub"><a onclick="popwin('popup/password',800,600);return false;" href="">變更密碼</a></li>
                        <li class="sub"><a onclick="popwin('popup/product',800,600);return false;" href="">商品選擇</a></li>
                        <li class="sub"><a onclick="popwin('popup/layout',800,600);return false;" href="">版面選擇</a></li>
                        <!--<li class="sub"><a onclick="popwin('popup/order',800,600);return false;" href="">視覺下單</a></li>
                        <li class="sub"><a onclick="return false;" href="">刪單不確認</a></li>
                        <li class="sub"><a onclick="return false;" href="">下單回報</a></li>
                        <li class="sub"><a onclick="return false;" href="">√拍手動畫</a></li> -->
                    </ul>
                </li>
                <li class="main">說明
                    <ul class="submenu">
                        <li class="sub"><a onclick="popwin('popup/notice',800,600);return false;" href="">交易規則</a></li>
                        <li class="sub"><a onclick="popwin('popup/website',800,600);return false;" href="">相關網站</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="header_middle" style="position:absolute;top:10px;left:300px;z-index:999;">
            商品：<span id="info6_name"></span>
            <span id="product_month"></span>月份
            最後交易日：<span id="last_day"></span>
            禁新：<span id="deny_new_range"></span>
            強平：<span id="offset_range"></span>

        </div>  <!-- class="header_right" -->
        <div  style="position:absolute;top:10px;left:75%;z-index:999;width:300px;">
             <span id="divTime" style="position:relative;padding-right:10px;color:gray;">
                    <span ><span>時間：</span><span id="serverTime" >2016-07-21 10:00:12</span></span>
            </span>
            <i class="fa fa-cog" aria-hidden="true"></i>&nbsp;&nbsp;
            <i class="fa fa-volume-up" aria-hidden="true"></i>&nbsp;&nbsp;
            <a href="login/logout"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
        </div>
        <!-- 系統時間 -->
       
    </div>
    <div id="content">
    
        <table border="1" style="width:100%;">
        <tr><td style="width:265px;">
        <div id="left_cont">
            <div class="left_top">
                <div class="left_top_head"><?php echo $user['account']?>(<?php switch($user['status']){
                    case 0:
                            echo '停用';
                            break;
                    case 1:
                            echo '正常收單';
                            break;
                    case 2:
                            echo '凍結';
                            break;
                }?>)</div>
                <div class="left_top_body">
                    <ul class="list">
                        <li class="item title">客戶名稱：</li>
                        <li class="item show_name"><?php if(isset($config)){echo $config['show_name'];}?></li>
                    </ul>
                    <ul class="list">
                        <li class="item title">服務人員：</li>
                        <li class="item service_name"><?php if(isset($config)){echo $config['service_name'];}?></li>
                    </ul>
                    <ul class="list">
                        <li class="item title">服務專線：</li>
                        <li class="item service_tel"><?php if(isset($config)){echo $config['service_tel'];}?></li>
                    </ul>
                    <ul class="list">
                        <li class="item title">預設額度：</li>
                        <li class="item default_money"><?php if(isset($config)){echo $config['default_money'];}?></li>
                    </ul>
                    <ul class="list">
                        <li class="item title">帳戶餘額：</li>
                        <li id="li_user_money" class="item user_money"><?php if(isset($config)){echo $config['user_money'];}?></li>
                    </ul>
                    <ul class="list">
                        <li class="item title">今日損益：</li>
                        <li id="user_profit" class="item"></li>
                    </ul>
                </div>
            </div>

            <div>
                <!-------- Status 1: 五檔揭示 ----- -->
                <div class="left_main_bottom">
                    <div id="select1" class="left_bottom status1">
                        <div class="left_bottom_head">
                            <div class="head">
                                五檔報價[
                                <span id="info1_name"></span>
                                ]
                            </div>
                        </div>
                        <div class="left_bottom_body">
                            <ul class="list2 header">
                                <li class="item2 title2 one head">比例</li>
                                <li class="item2 title2 two">委買</li>
                                <li class="item2 title2 three">價格</li>
                                <li class="item2 title2 four">委賣</li>
                                <li class="item2 title2 five head">比例</li>
                            </ul>
                            
                            
                            <div id="info1">
                          <!--
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
                            -->
                            </div>
                        </div>
                        
                        
                        <div class="left_bottom_sum">  
                            <ul class="sum">
                                <li class="sum_option" id="fivePrice_totalBuy"></li>
                                <li class="sum_option">總計</li>
                                <li class="sum_option" id="fivePrice_totalSell"></li>
                            </ul>
                        </div>
                        
                        <div class="left_bottom_compare">
                            <ul class="compare" style="height:32px;">         
                                <li class="" style="float:left;width:90px;color:#F67276;">多勢</li>                  
                                <li class="" style="float:left;">
                                    <div style="float:left;background-color:#F67276;"  id="fivePrice_totalBuyBar">&nbsp;</div>
                                    <div style="float:left;background-color:#67E86C;"  id="fivePrice_totalSellBar" >&nbsp;</div>
                                </li>
                                <li class="" style="float:right;width:60px;color:#67E86C;">空勢</li>
                                
                            </ul>
                        </div>

                    </div>
                    <!-- ------ Status 2: 量價分佈 ----- -->
                    <div id="select2" class="left_bottom status2">
                        <div class="left_bottom_head">
                            <div class="head">量價分佈[<span id="info2_name"></span>]</div>
                            <button onclick="popwin('popup/amount_price',800,600);">歷史</button>
                        </div>
                        <div id="price_amount_left_bottom_body"  class="left_bottom_body" style="height:372px;">
                           
                            <ul class="list2 header">
                                <li class="item2 title2 one">價格</li>
                                <li class="item2 title2 two"></li>
                                <li class="item2 title2 three head">比例</li>
                                <li class="item2 title2 four">口</li>
                            </ul>
                            <div id="price_amount_list" style="font-size:14px;">
                            </div>
                           <!--  <ul class="list2">
                                <li class="item2 one">xxx</li>
                                <li class="item2 two"></li>
                                <li class="item2 three">xx
                                    <div>xx</div>
                                </li>
                                <li class="item2 four">xxx</li>
                            </ul>
                           
                            -->
                        </div>
                        <div class="left_bottom_direction" style="background-color:#e7e7e7;">
                            <ul class="direction">
                                <li class="direction_option">
                                    <button id="but_left_up" type="button">往上</button>
                                </li>
                                <li class="direction_option">
                                    <button id="but_left_mid" onclick="center();" type="button">置中</button>
                                </li>
                                <li class="direction_option">
                                    <button id="but_left_down" type="button">往下</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- ------ Status 3: 報價明細 ----- -->
                    <div id="select3" class="left_bottom status3">
                        <div class="left_bottom_head">
                            <div class="head">報價明細[<span id="info3_name"></span>]</div>
                            <button onclick="popwin('popup/historyQuote',800,600);">查詢</button>
                            <input id="chk_bottom" type="checkbox"><span>置底</span>
                        </div>
                        <div id="new_price_left_bottom_body" class="left_bottom_body" style="height:393px;" >
                            <ul class="list2 header" >
                                <li class="item2 title2 one">市場時間</li>
                                <li class="item2 title2 two">口</li>
                                <li class="item2 title2 three" style="width:53px;" >漲跌</li>
                                <li class="item2 title2 four">價格</li>
                            </ul>
                            
                            <div id="info3" style="font-size:14px;height:360px;overflow-y: auto;">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="left_bottom_select" style="margin-top:5px;">
                    <ul class="select">
                        <li class="option">
                            <a id="butFivePrice" href="#select1">五檔揭示</a>
                        </li>
                        <li class="option">
                            <a id="price_amount" href="#select2">量價分佈</a>
                        </li>
                        <li class="option">
                            <a id="butEachPrice" href="#select3">分價揭示</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </td>
      <td >
        <div id="right_cont">
        
            
           <!--  <input id="txtCmd" type="text" class="form-control"  />
            <input id="butCmd" type="button" value="送出指令" />
            -->
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

                    <div id="stock" >
                        <?php
                            foreach($product as $item)
                            {?>                       
                                <ul class="figure productItem" last_day="<?php echo $item['last_order_date'];?>" charge="<?php echo $item['buy_charge'];?>" price="<?php echo $item['price'];?>" id="<?php echo $item['code'];?>" price_code="<?php echo $item['price_code'];?>" >
                                    <li class="figure_result product name" ><?php echo $item['name'];?></li>
                                    <li class="figure_result store" data-bind="text: store">0</li>
<!--
                                    <li class="figure_result k" data-bind="text: k"><a onclick="popwin('chart?product_code=<?php echo $item['code'];?>','90%','90%');return false;"><img src="assets/img/k_chart.png"  width="15"/></a></li>
-->
                                    <li class="figure_result k" data-bind="text: k">
                                    <a onclick="window.open('chart?product_code=<?php echo $item['code'];?>',
                                    'k線',config='toolbar=0,location=0,status=0,menubar=0,titlebar=0')"><img src="assets/img/k_chart.png"  width="15"/></a></li>
                                    <li class="figure_result sit" data-bind="text: sit"><img src="assets/img/chart.png" width="15" /></li>
                                    <li class="figure_result amount" data-bind="text: amount" >---</li>
                                    <li class="figure_result buy" data-bind="text: buy" >---</li>
                                    <li class="figure_result sell" data-bind="text: sell" >---</li>
                                    <li class="figure_result updown" data-bind="text: updown" >---</li>
                                    <li class="figure_result percentage" data-bind="text: percentage" >---</li>
                                    <li class="figure_result total" data-bind="text: total" >---</li>
                                    <li class="figure_result open" data-bind="text: open" >---</li>
                                    <li class="figure_result max" data-bind="text: max" >---</li>
                                    <li class="figure_result min" data-bind="text: min" >---</li>
                                    <li class="figure_result y_close" data-bind="text: y_close" >---</li>
                                    <li class="figure_result y_total" data-bind="text: y_total" >---</li>
                                    <li class="figure_result status" data-bind="text: status">---</li>
                                    <input type="hidden" class="price_no" value=""></input>
                                </ul>
                        <?php }?>
                    </div>
                  
                </div>
            </div>
            <div class="right_middle">
                <div class="right_middle_head">
                    <ul class="head_option">
                        <li class="head_option_result"><a href="#option1">買賣下單(0)</a></li>
                        <li class="head_option_result"><a href="#option2">未平倉</a>(<span id="title_unoffset_up_count"></span>,-<span id="title_unoffset_down_count"></span>)</li>
                        <li class="head_option_result"><a href="#option3">已平倉</a></li>
                        <li class="head_option_result"><a href="#option4">商品統計</a></li>
                        <li id="li_head_option_result5" class="head_option_result"><a href="#option5">對帳表</a></li>
                        <li id="li_head_option_result6" class="head_option_result"><a id="butAdvicer" href="#option6">投顧訊息(0)</a></li>
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
                                        <input type="radio" id="orderList1_con" name="orderList1_con" checked="checked">全部單據
                                    </li>
                                    <li class="select2_result">
                                        <input id="chk_list1_unoffset" type="radio" name="orderList1_con">未成交單據
                                    </li>
                                    <li class="select2_result">
                                        <input type="checkbox">顯示全部商品單據
                                    </li>
                                    <li class="select2_result">
                                        <input id="chk_list1_bottom" type="checkbox">自動置底
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div id="list1_right_middle_body_bottom" class="right_middle_body_bottom">
                           <!-- <ul class="list3 header">
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
                            </ul>-->

                            <table class="tb_list">
                                <thead>
                                    <tr>
                                        <th>操作</th>
                                        <th>序號</th>
                                        <th>商品</th>
                                        <th>
                                            倒
                                        </th>
                                        <th>
                                            多空
                                        </th>
                                         <th>
                                           委託價
                                        </th>
                                         <th>
                                           口數
                                        </th>
                                        <th>
                                           成交價
                                        </th>
                                        <th>
                                           下單時間
                                        </th>
                                         <th>
                                           完成時間
                                        </th>
                                        <th>
                                           型別
                                        </th>
                                         <th>
                                           損失點數
                                        </th>
                                           <th>
                                           獲利點數
                                        </th>
                                         <th>
                                           狀態
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="orderList">

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <!--未平倉 option 2-->
                    <div class="right_middle_body" id="option2">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        <button onclick="storeMulti();" type="button">市價平倉</button>
                                    </li>
                                    <li class="select1_result">
                                        <button onclick="saveLimitMulti()">設定損利點</button>
                                    </li>
                                    <li class="select1_result">
                                        <input id="list2_chk_select_all" type="checkbox"> 全選
                                    </li>
                                   
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="right_middle_body_bottom">
                        <!--
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
                            <div id="nowOrderList">
                                
                            </div>
                            -->
                                <table class="tb_list">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>序號</th>
                                        <th>操作</th>
                                        <th>商品</th>
                                        <th>買賣</th>
                                        <th>型別</th>
                                         <th>成交價</th>
                                         <th>口數</th>
                                        <th>手續費</th>
                                        <th>損失點數</th>
                                         <th>獲利點數</th>
                                        <th>倒線(利)</th>
                                         <th>未平損益</th>
                                           <th>點數</th>
                                         <th>天數</th>
                                          <th>狀態</th>
                                    </tr>
                                </thead>
                                <tbody id="nowOrderList">

                                </tbody>
                            </table>



                           
                        </div>
                    </div>
                    <!--已平倉 option3-->
                    <div class="right_middle_body" id="option3">
                        <div class="right_middle_body_bottom">
                        <!--
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
                            <div id="storeOrderList">
                                
                            </div>
                            -->
                            <table class="tb_list">
                                <thead>
                                    <tr>
                                        <th>商品</th>
                                        <th>新倉序號</th>
                                        <th>平倉序號</th>
                                        <th>新倉型別</th>
                                        <th>平倉型別</th>
                                         <th>口數</th>
                                         <th>多空</th>
                                        <th>成交價</th>
                                        <th>平倉價</th>
                                         <th>成交日期</th>
                                        <th>平倉日期</th>
                                         <th>點數</th>
                                           <th>種類</th>
                                         <th>手續費</th>
                                          <th>損益</th>
                                    </tr>
                                </thead>
                                <tbody id="storeOrderList">

                                </tbody>
                            </table>

                            
                            
                        </div>
                    </div>
                    <!--商品統計 option4-->
                    <div class="right_middle_body" id="option4">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        預設額度：<?php if(isset($config)){echo $config['default_money'];}?>
                                    </li>
                                    <li class="select1_result">
                                        今日損益：<span id="user_profit2"></span>
                                    </li>
                                    <li class="select1_result">
                                        留倉預扣：<span></span>
                                    </li>
                                    <li class="select1_result">
                                        帳戶餘額：<span id="li_user_money2"></span>
                                    </li>
                                    <li class="select1_result">
                                        <input id="chkShowAllProduct" type="checkbox">顯示全部
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="right_middle_body_bottom">
                        <!--
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

                            <div id="list_static"></div>
                            -->

                            <table class="tb_list">
                                <thead>
                                    <tr>
                                        <th>商品名稱</th>
                                        <th>總多</th>
                                        <th>總空</th>
                                        <th>未平倉</th>
                                        <th>總口數</th>
                                         <th>手續費合計</th>
                                         <th>損益</th>
                                        <th>倉留預扣</th>
                                       
                                    </tr>
                                </thead>
                                <tbody id="list_static">

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <!--對帳表 option5-->
                    <div class="right_middle_body" id="option5">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        開始日期
                                        <input id="bill_sdate" name="bill_sdate" type="text">
                                        結束日期
                                        <input id="bill_edate" name="bill_edate" type="text">
                                        <button id="butBillSearch">送出</button>
                                    </li>
                                    <li class="select1_result">
                                        快速查詢
                                        <a href="" onclick="searchBill('today');return false;">今日</a>
                                        <a href="" onclick="searchBill('yesterday');return false;">昨日</a>
                                        <a href="" onclick="searchBill('week');return false;">本週</a>
                                        <a href="" onclick="searchBill('lastWeek');return false;">上週</a>
                                        <a href="" onclick="searchBill('month');return false;">本月</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="right_middle_body_bottom">
                            <!--
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
                            -->

                            <div>
                                <table id="tb2" class="tb_list" ></table>
                            </div>
                            <!--
                            <ul class="list3">
                                <li class="item3"></li>
                                <li class="item3 a"></li>
                                <li class="item3"></li>
                                <li class="item3"></li>
                                <li class="item3"></li>
                                <li class="item3"></li>
                                <li class="item3 b"></li>
                                <li class="item3 b"></li>
                            </ul>
                           -->
                            
                        </div>
                    </div>
                    
                    <!-- 投顧訊息 option6 -->
                    <div class="right_middle_body" id="option6">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        開始日期
                                        <input id="advicer_sdate" name="advicer_sdate" type="text">
                                        結束日期
                                        <input id="advicer_edate" name="advicer_edate" type="text">
                                        <button id="butSearch_advicer">送出</button>
                                    </li>
                                    <li class="select1_result">
                                        快速查詢
                                        <a href="" onclick="searchAdvicer('today');return false;">今日</a>
                                        <a href="" onclick="searchAdvicer('yesterday');return false;">昨日</a>
                                        <a href="" onclick="searchAdvicer('week');return false;">本週</a>
                                        <a href="" onclick="searchAdvicer('lastWeek');return false;">上週</a>
                                        <a href="" onclick="searchAdvicer('month');return false;">本月</a>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="clear"></div>
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        <select name="advice_type">
                                            <option value="">全部</option>
                                            <?php
                                                foreach($advice_type as $item)
                                                {
                                                    echo '<option value="'. $item['id'] .'">'. $item['name'] .'</option>';
                                                }
                                            ?>
                                           <!-- <option value="">期貨</option>
                                            <option value="">股票</option>
                                            <option value="">選擇</option> -->
                                        </select>
                                    </li>
                                    <li class="select1_result">
                                        <button id="butPopTeacher">老師人物設定</button>
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
                          <!--  <ul class="list3 header">
                                <li class="item3 title3">類別</li>
                                <li class="item3 title3 d">發布時間</li>
                                <li class="item3 title3">老師</li>
                                <li class="item3 title3 c">訊息內容</li>
                                
                            </ul>
                            -->
                            <div id="advicerList" class="list3 header">

                                <table id="example" class="tb_list"></table>
                            </div>

                        </div>

                    </div>
                </div>
                    <ul id="marquee3" class="marquee" style="margin-top:3px;;width:100%;background-color:#dcdcdc;border:solid 1px white;color:gray;">
                        <?php
                                if($ann !=null)
                                {
                                    foreach($ann as $item)
                                    {
                                        echo "<li style='padding-left:10px;'>".$item['content']."</li>";
                                    }
                                } 
                            ?>
                    </ul>
            </div>
         <div id='emptyMenu' class="right_bottom" style="display:block;">  
         </div>
           
            <div id='userMenu' class="right_bottom" style="display:none; min-width:800px;">
            <form>
                <div class="right_bottom_one">
                    <input id="now_product_code" name="now_product_code" type="hidden" value="" />
                    <div class="one_title" id="info4_name">壹指期</div>
                    <div class="one_option">   
                        <div><input id="normal_order" name="delay" value="5" checked="checked" type="radio">一般</div>
                        <div><input id="fast_order" name="delay" value="0" type="radio">雷電</div>
                    </div>
                </div>
                <div id="div_order_type" class="right_bottom_two">
                    
                    <div class="right_bottom_two_top">   
                        <input type="radio" name="type" class="two_option type" value="1">批分單
                        <input type="radio" name="type" checked="checked" class="two_option type" value="2">市價單
                    </div>
                    <div class="right_bottom_two_bottom">
                        <input type="radio" name="type" class="two_option type" value="3">收盤單
                        <input id="rad_limitPrice" type="radio" name="type" class="two_option type" value="4">限價單
                    </div>

                </div>
                <div id="div_menu_speed" class="right_bottom_three">
                    <div class="right_bottom_three_top">
                       
                    </div>
                    <div class="right_bottom_three_top">
                       
                    </div>
                    <div class="right_bottom_three_bottom">
                       
                    </div>
                    <ul>
                        <li id="li_limitPrice" style="padding-top:1px;display:none;">
                            <input id="butLimitPrice" type="button" value="限價" />
                            <input id="txtLimitPrice" name="limitPrice" type="text" value="" style="width:50px;" />
                            <button type="button"  style="font-size:11px;color:gray;float:right;" id="plus"><span class="glyphicon glyphicon-plus"></span></button>
                            <button type="button"  style="font-size:11px;color:gray;float:right;" id="mins"><span style="font-size:11px;color:gray;" class="glyphicon glyphicon-minus"></span></button>
                        </li>
                        <li  style="padding-top:1px;">
                            <span class="three_title">停利：</span>
                            <input id="stop_up" name="stop_up" type="text" style="width:50px;" />
                        </li>
                        <li  style="padding-top:1px;">
                            <span class="three_title">停損：</span>
                            <input id="stop_down" name="stop_down" type="text" style="width:50px;" />
                        </li>
                    </ul>

                </div>

                <div id="div_menu_amount" class="right_bottom_four">
                    <div class="right_bottom_four_top">
                        <button id="bt1" type="button" class="four_option">1</button>
                        <button id="bt2" type="button" class="four_option">2</button>
                        <button id="bt3" type="button" class="four_option">3</button>
                        <button id="bt4" type="button" class="four_option">4</button>
                        <button id="bt5" type="button" class="four_option">5</button>
                    </div>
                    <div class="right_bottom_four_middle">
                        <div class="four_title">口數</div>
                        <input id="amount" name="amount" type="text" value="1">
                    </div>
                    <div class="right_bottom_four_bottom">
                        <button type="button" class="four_edit">編輯</button>
                        <button type="button" class="four_delete">還原</button>
                    </div>
                </div>
                <div class="right_bottom_five">
                    <button type="button" id="butBuy_up" class="five_left">
                            →下多單
                    </button>
                    <div class="five_right">
                        <button  onclick="storeAllProduct();" type="button">全平</button>
                    </div>
                </div>

                <div class="right_bottom_six">
                    <button type="button" id="butBuy_down" class="six_left">
                            →下空單
                    </button>
                    
                    <div class="six_right">
                        <div><input  id="chkClose" name="chkClose" type="checkbox" onclick="close_offset();" >(<span id="info5_name"></span>)收盤全平</div>
                        <div><input  name="chkNoConfirm" type="checkbox">下單不確認</div>
                        <div><input  name="chkTip" type="checkbox">限價成交提示</div>
                    </div>
                </div>

            </div>
            
        </form>    
        </div>
        </td>
        </tr>
        </table>
        <!--使用操作選單結尾-->
        
        
    </div>
</div>



<!-- 選取老師視窗 -->
<div style="display:none;">
    <div id="divTeacherList" style="background-color:white;padding:10px;line-height:35px;width:100%;height:100%;">
        <div>
            <h2>請選擇老師:
            </h2>
        </div>
       <div style="padding-left:10px;"> 
        <?php
            foreach($teacher as $item)
            {
                echo '<input type="checkbox" checked="checked" id="t_'.$item['id'].'" name="teacher[]" value="'.$item['id'].'" />'. $item['name'] . '<br>';
            }
        ?>
        </div>
        <div style="text-align:center;">
                <input id="but_tcEnter" type="button" value="確定" />
                <input id="but_tcCancel" type="button" value="取消" />
        </div>
    </div>

</div>

<!-- 修改停損利視窗 -->
<div style="display:none;">
    <div id="divLimit"  style="background-color:white;padding:10px;line-height:35px;width:100%;height:100%;">
        <input id="selected_order_id" type="hidden" value="" />
        停損：<input id="loss_point" type="text" />
        停利：<input id="profit_point" type="text" />
        <br>
        <div style="text-align:center;padding-top:10px;">
        <input onclick="saveLimit();" type="button" value="確定">
        <input onclick="window.parent.close();" type="button" value="取消">
        </div>
    </div>
</div>

<!-- 修改限價單視窗 -->
<div style="display:none;">
    <div id="divModify" style="background-color:white;padding:10px;line-height:35px;width:100%;height:100%;">
        <input id="modify_preID" type="hidden" value="" />
       <table>
            <tr>
                <td style="padding-left:10px;">口數:</td>
                <td style="padding-left:10px;">
                    <input id="limit_modify_amount" type="text"  />
                </td>
            </tr>
            <tr>
                <td style="padding-left:10px;">價格:</td>
                <td style="padding-left:10px;">
                    <input type="radio" name="limit_modify_type" id="limit_modify_type1" value="2" /> 改市價 <br>
                    <input type="radio" name="limit_modify_type" id="limit_modify_type2" value="4" checked="checked" /> 改限價 <input id="limit_modify_price" type="text" />
                </td>
            </tr>
          
       </table>
        <div style="text-align:center;padding-top:20px;">
              <input onclick="limit_modify_save()" type="button" value="確定" />
                    <input onclick="parent.close()" type="button" value="取消" />
       </div>
    </div>
</div>









</body>
<!-- <script src="jquery/jquery-1.11.3.min.js"></script> -->
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
    
</script>
 <script src="<?=$base_url?>assets/js/model.js?11"></script>
 <!-- <link rel="stylesheet" href="<?=$base_url?>assets/css/reset.css">
    <link rel="stylesheet" href="<?=$base_url?>assets/css/index.css">
  -->
</html>








   
