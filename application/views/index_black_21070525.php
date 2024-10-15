<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>前台</title>
    <link rel="stylesheet" href="<?=$base_url?>assets/css/reset.css">
    <link rel="stylesheet" href="<?=$base_url?>assets/css/font-awesome-4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?=$base_url?>assets/css/jquery-ui-black.min.css">
    <link rel="stylesheet" href="<?=$base_url?>assets/css/index_black.css">
   
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

    <!--<script src="<?=$base_url?>assets/js/jquery.scrollTo.js"></script>-->


    <!--<script src="<?=$base_url?>assets/js/jquery.fixedheadertable.js"></script>-->

    
    <link rel="stylesheet" type="text/css"  href="<?=$base_url?>assets/css/jquery.marquee.css" />
    <script src="<?=$base_url?>assets/js/jquery.marquee.js"></script>

    <script type="text/javascript" src="<?=$base_url?>assets/js/bootstrap-datepicker.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$base_url?>assets/css/bootstrap-select.css" />

    <script type="text/javascript" src="<?=$base_url?>assets/js/moment.js"></script>
   
   <script>
   
   </script>
<?php
if(isset($_GET['si']) && $_GET["si"] == 99)
{
?>
<style type="text/css">
#wrap #content #right_cont {
width: 93%;
float: left;
}
</style>
<?php
}
else
{
?>
<style type="text/css">
#wrap #content #right_cont {
width: 80%;
float: left;
}
</style>
<?php
}
?>
    <style type="text/css">

   /* .right_middle table */




        .right_middle table {
            width: 100%;
        }

        .right_middle table thead {
            width: 100%;
            display: block;
            background-color: #EB6B5D;
            color: white;
        }

        .right_middle table thead tr {
            display: block;
            width: 100%;
            font-size: 0px;
            text-align: left;
        }

        .right_middle table thead tr th {
            width: 6.25%;
            display: inline-block;
            font-size: 13px;
            padding: 5px 0px 6px 0px;
            text-align: center;
        }

        .right_middle table tbody {
            width: 100%;
            display: block;
        }

        .right_middle table tbody tr {
            display: block;
            width: 100%;
            font-size: 0px;
            border-bottom: solid 1px #696969;
            text-align: left;
        }

        .right_middle table tbody tr td {
            width: 6.25%;
            display: inline-block;
            font-size: 13px;
            padding: 5px 0px 6px 0px;
            text-align: center;
        }

        #option1 table thead tr th:nth-child(1),
        #option1 table thead tr th:nth-child(4),
        #option1 table thead tr th:nth-child(5),
        #option1 table thead tr th:nth-child(7),
        #option1 table thead tr th:nth-child(11) {
            width: 7%;
        }

        #option1 table thead tr th:nth-child(2),
        #option1 table thead tr th:nth-child(3),
        #option1 table thead tr th:nth-child(6),
        #option1 table thead tr th:nth-child(8),
        #option1 table thead tr th:nth-child(14) {
            width: 7%;
        }

        #option1 table thead tr th:nth-child(9),
        #option1 table thead tr th:nth-child(10),
        #option1 table thead tr th:nth-child(12),
        #option1 table thead tr th:nth-child(13) {
            width: 7%;
        }

        #option2 table thead tr th:nth-child(1) {
            width: 3%;
        }

        #option2 table thead tr th:nth-child(8) {
            width: 4%;
        }

        #option2 table thead tr th:nth-child(3),
        #option2 table thead tr th:nth-child(4),
        #option2 table thead tr th:nth-child(5),
        #option2 table thead tr th:nth-child(6),
        #option2 table thead tr th:nth-child(9),
        #option2 table thead tr th:nth-child(14) {
            width: 6%;
        }

        #option2 table thead tr th:nth-child(2),
        #option2 table thead tr th:nth-child(7),
        #option2 table thead tr th:nth-child(10),
        #option2 table thead tr th:nth-child(11),
        #option2 table thead tr th:nth-child(12),
        #option2 table thead tr th:nth-child(13),
        #option2 table thead tr th:nth-child(15) {
            width: 7%;
        }

        #option3 table thead tr th:nth-child(6),
        #option3 table thead tr th:nth-child(7) {
            width: 4%;
        }

        #option3 table thead tr th:nth-child(1),
        #option3 table thead tr th:nth-child(12),
        #option3 table thead tr th:nth-child(13),
        #option3 table thead tr th:nth-child(14),
        #option3 table thead tr th:nth-child(15) {
            width: 6%;
        }

        #option3 table thead tr th:nth-child(2),
        #option3 table thead tr th:nth-child(3),
        #option3 table thead tr th:nth-child(4),
        #option3 table thead tr th:nth-child(5),
        #option3 table thead tr th:nth-child(8),
        #option3 table thead tr th:nth-child(9) {
            width: 7%;
        }

        #option3 table thead tr th:nth-child(10),
        #option3 table thead tr th:nth-child(11) {
            width: 9%;
        }

        #option4 table thead tr th {
            width: 12.2%;
           
        }

        #option5 table thead tr th {
            width: 10%;
        }

        #option5 table tbody tr td {
            width: 10%;
        }

        #option5 table tbody {
            height: 98px;
            overflow-y: scroll;
        }

        #option6 table thead tr th:nth-child(1),
        #option6 table thead tr th:nth-child(2),
        #option6 table thead tr th:nth-child(4) {
            width: 10%;
        }
        

        #option6 table thead tr th:nth-child(3) {
            width: 68%;
            text-align: left;
            padding-left: 10px;
        }


        #option6 table tbody tr td:nth-child(3) {
            width :68%;
            text-align: left;
            padding-left: 10px;
        }

        #option6 table tbody tr td:nth-child(1),
        #option6 table tbody tr td:nth-child(2),
        #option6 table tbody tr td:nth-child(4) {
            width: 10%;
        }

        #option6 table tbody {
            height: 72px;
            overflow-y: scroll;
        }

   
       
        .modal-dialog
        {
            width:300px;
           
        }

        .controler
        {
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;

            border:solid 1px #dcdcdc;
            padding-left:5px;
        }

        /*bootstrap 的modal 背景色，改成全透明*/
        .modal-backdrop.in {
            opacity: .1;
        }
        .list2 
        {
            border-bottom:solid 1px gray;
        }
        .borderRed
        {
            border:solid 1px red;
        }

        input{
            margin-right:5px;
        }
     .tb_list
        {
            width:100%;
            font-size:14px;
            font-family: "Times New Roman", Times, serif;
            background-color:transparent;

        }
        .tb_list th
        {
            background: #eb6b61;
            color: #fff;
           /* border:solid 1px #dcdcdc;*/
            padding:5px;
            text-align:center;
        }
        .tb_list td
        {
            font-size:14px;
            /*border:solid 1px #dcdcdc;*/
            padding:5px;
             background-color:transparent;
             color:#dcdcdc;
           font-family: "Times New Roman", Times, serif;
        }
        table.datatable thead th
        {
            /*border :  border:solid 1px #dcdcdc;*/
        }
        .tb_list tr
        {
            /*border-bottom:solid 1px #696969;*/
        }
        table.dataTable tbody tr {
             background-color: transparent; 
            
        }
        .tb_list td {
  
              /*border-bottom: solid 1px #696969;*/
        }
        

        .blueBut
        {
            font-size: 12px;
            background: rgb(41, 149, 188);
            border: 2px solid rgb(41, 149, 188);
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            padding: 0px 6px;
            height: 22px;
        }
        .font{
              font-family: "Times New Roman", Times, serif;
               font-size: 14px;
        }

        .alertify-logs {
            color: white;
            font-size: 14px;
            font-family: sans-serif;
        }

        .gray{
            width: 5.4%;
            color: gray;
            line-heigt:1.5;
            font-size:15px;
            display:inline-block;
            text-align:center;
        }

         .tb_list2
        {
            width:100%;
            font-size:14px;
            font-family: "Times New Roman", Times, serif;

        }

        .popClass{
            font-family: "Times New Roman", Times, serif;
            font-size:14px;
            color:black;
        }
        .popClass input
        {
            padding-left:5px;
        }

        .modal-title {
            margin: 0;
             font-family: "Times New Roman", Times, serif;
             font-weight:bold;
            color: black;
            font-size: 14px;
        }

        .close_msg
        {
           
            font-size: 16px;
            letter-spacing: 1px;
            padding: 1px 10px 3px 10px;
            border-radius: 5px 5px 0px 0px;
            border-top: 1px solid rgba(229, 248, 255, 0.4);
            margin-right: 3px;

           
    
        }



       /* #cboxOverlay {
            background: #3C3C3C;
            opacity: 0.9;
            filter: alpha(opacity = 90);
        }*/
       
    </style>

</head>
<body>
   <div id="div_paying" style="display:none;color:#00AEAE;font-size:30px; position:absolute;z-index:9999;top:25%;left:1px;text-align:center;background-color:#dcdcdc;padding-top:50px;padding-bottom:50px;padding-left:150px;width:100%;border:solid 1px gray;opacity:0.8;"> 
        <img src="<?=$base_url?>assets/img/loading.gif" />&nbsp; 結算處理中，請待完畢再進行交易。
    </div>
  
   <div id="div_login" style="text-aligen:center;color:#00AEAE;position:absolute;z-index:9999;top:0%;left:1px;background-color:#dcdcdc;height:100%;width:100%;opacity:0.8;"> 
       登入中
    </div>
  
   <input type="hidden" id="default_money" value="<?php
                if($config['default_money']!=null)
                {echo $config['default_money'];}?>" />
    <input type="hidden" id="user_money" value="<?php
                if($config['user_money']!=null)
                {echo $config['user_money'];}?>" />

<div id="wrap">
    <header style="display:table;">
        <!--<img  src="<?=$base_url?>assets/img/logo2.png" alt="" id="logo">-->
        <!--<div style="height:30px;width:100px;float:left;">&nbsp;</div>
        <h1></h1>-->
        <div style="">
	    <span id = "onlinestatus" class="online"> 連線</span>
	    <span>時間：</span><span id="serverTime">--</span>
            <button type="button">18-伺服器</button>
        </div>

           <div style="width:60%;margin-left:-300px;">
                <!--<marquee width="64%">系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈 系統公告跑馬燈</marquee>-->
                 <ul id="marquee3" onclick="popwin('popup/announce','80%','80%');" class="marquee" style="font-size:14px;background-color:transparent;border:none;width:100%;color:#66d9ff;">
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
     
    </header>
    <div id="header">
        <div class="header_left">
            <ul class="mainmenu">
                <li class="main">連線
                    <ul class="submenu">
                        <!--<li class="sub"><a href="">連線登入</a></li>-->
                        <li class="sub"><a href="" onclick="onClose();return false;">中斷連接</a></li>
                    </ul>
                </li>
                <li class="main">檢視
                    <ul class="submenu">
                        <li class="sub"><a onclick="popwin('popup/personalInfo','100%','100%');return false;" href="">個人資料</a></li>
                        <li class="sub"><a onclick="popwin('popup/historyProfit',800,600);return false;" href="">歷史損益</a></li>
                        <li class="sub"><a onclick="popwin('popup/historyQuote',800,600);return false;"  href="">歷史報價</a></li>
                       <!-- <li class="sub"><a onclick="popwin('popup/deposit',800,600);return false;" href="">儲值紀錄</a></li>-->
                        <li class="sub"><a onclick="popwin('popup/log',800,600);return false;" href="">動作日誌</a></li>
                    </ul>
                </li>
                <li class="main">設定
                    <ul class="submenu">
                        <li class="sub"><a onclick="popwin('popup/password',800,600);return false;"  href="">變更密碼</a></li>
                        <li class="sub"><a onclick="popwin('popup/product',800,600);return false;" href="">商品選擇</a></li>
                        <li class="sub"><a onclick="popwin('popup/layout',800,600);return false;" href="">版面選擇</a></li>
                       <!-- <li class="sub"><a href="">視覺下單</a></li>
                        <li class="sub"><a href="">刪單不確認</a></li>
                        <li class="sub"><a href="">下單回報</a></li>
                        <li class="sub"><a href="">√拍手動畫</a></li>-->

                    </ul>
                </li>
                <li class="main">說明
                    <ul class="submenu">
                        <li class="sub"><a target="_new" href="../notice.html">交易規則</li>
			<!--<li class="sub"><a onclick="popwin('popup/website',800,600);return false;"  href="">相關網站</a></li>-->
                    </ul>
                </li>
            </ul>
        </div>
        <div class="header_middle">
            <ul class="mainmenu">
                <li class="main">商品：<span id="info6_name"></span></li>
                <li class="main">最後交易日： <span id="product_month"></span></li>
                <li class="main">禁新：<span id="deny_new_range"></span></li>
                <li class="main">強平：<span id="offset_range"></span></li>
		<li class="main">本月最後結算日：<span id="last_bill_day"></span></li>
            </ul>
        </div>
        <div class="header_right">
            <ul class="mainmenu">
                <!--<li class="main"><i class="fa fa-cog"></i></li>
                <li class="main"><i class="fa fa-volume-up" aria-hidden="true"></i></li>-->
                 <li class="main"><a href="login/logout"><i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
            </ul>
        </div>
    </div>
    <div id="content">
        <div id="left_cont">
            <div class="left_top">
            <?php
            
            ?>
                <div class="left_top_head" id="divUserStatus"><?php echo $user['account']?>(<?php 
                //var_dump($user['status']);
                switch($user['status']){
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
                        <li class="item"><?php if(isset($config)){echo $config['show_name'];}?></li>
                    </ul>
                    <ul class="list">
                        <li class="item title">服務人員：</li>
                        <li class="item"><?php if(isset($config)){echo $config['service_name'];}?></li>
                    </ul>
                    <ul class="list">
                        <li class="item title">服務專線：</li>
                        <li class="item"><?php if(isset($config)){echo $config['service_tel'];}?></li>
                    </ul>
                    <ul class="list">
                        <li class="item title">預設額度：</li>
                        <li id="default_money2" class="item default_money"><?php if(isset($config)){echo $config['default_money'];}?></li>
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
            <div id="left_mid">
                <!-------- Status 1: 五檔揭示 ----- -->
                <div class="left_main_bottom">
                    <div id="select1" class="left_bottom status1">
                        <div class="left_bottom_head">
                            <div class="head">五檔報價[<span id="info1_name"></span>]</div>
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
                                    <div style="color:white;text-align:center;padding-top:100px;font-size:14px;">請選擇商品</div>
                              </div>
                        
                        </div>
                        <div class="left_bottom_sum">
                            <ul class="sum">
                                <li id="fivePrice_totalBuy" class="sum_option"></li>
                                <li class="sum_option">總計</li>
                                <li  id="fivePrice_totalSell" class="sum_option"></li>
                            </ul>
                        </div>

                        <div class="left_bottom_compare">
                            <ul class="compare">
                                <li class="compare_option many">多勢</li>
                                <li class="compare_option head">xx
                                    <div id="fivePrice_totalBuyBar" class="many_bar">xx</div>
                                    <div id="fivePrice_totalSellBar" class="empty_bar">xx</div>
                                </li>
                                <li class="compare_option empty">空勢</li>
                            </ul>
                        </div>

                    </div>
                    <!-------- Status 2: 量價分佈 ----- -->
                    <div id="select2" class="left_bottom status2">
                        <div class="left_bottom_head">
                            <div class="head">量價分佈[<span id="info2_name"></span>]</div>
                            <button id="but_amount_price"  style="padding-top:0px;padding-bottom:0px;">歷史</button>
                        </div>
                        <div id="price_amount_left_bottom_body" class="left_bottom_body">
                            <ul class="list2 header">
                                <li class="item2 title2 one">價格</li>
                                <li class="item2 title2 two"></li>
                                <li class="item2 title2 three head">比例</li>
                                <li class="item2 title2 four">口</li>
                            </ul>
                             <div id="price_amount_list" style="font-size:14px;">
                            </div>
                           
                        </div>
                        <div class="left_bottom_direction">
                            <ul class="direction">
                                <li class="direction_option">
                                    <button id="but_left_up" type="button">往上</button>
                                </li>
                                <li class="direction_option">
                                    <button id="but_left_mid" type="button" onclick="center();">置中</button>
                                </li>
                                <li class="direction_option">
                                    <button id="but_left_down" type="button">往下</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-------- Status 3: 報價明細 ----- -->
                    <div id="select3" class="left_bottom status3">
                        <div class="left_bottom_head">
                            <div class="head">報價明細[<span id="info3_name"></span>]</div>
                            <button onclick="popwin('popup/historyQuote',800,600);" style="padding-top:0px;padding-bottom:0px;">查詢</button>
                            &nbsp;&nbsp;<input id="chk_bottom" type="checkbox" checked /><span style='color:white; font-family: "Times New Roman", Times, serif;'>置底</span>
                        </div>
                        <div class="left_bottom_body">
                            <ul class="list2 header">
                                <li class="item2 title2 one">市場時間</li>
                                <li class="item2 title2 two">口</li>
                                <li class="item2 title2 three">漲跌</li>
                                <li class="item2 title2 four">價格</li>
                            </ul>
                          <div id="info3" style="font-size:14px;height:350px;overflow-y: auto;">
                            <div style="color:white;text-align:center;padding-top:100px;">請選擇商品</div>
                          </div>

                        </div>
                    </div>
                </div>
                <div class="left_bottom_select">
                    <ul class="select">
                        <li class="option">
                            <a id="butEachPrice" href="#select1">五檔揭示</a>
                        </li>
                        <li class="option">
                            <a id="price_amount" href="#select2">量價分佈</a>
                        </li>
			<li class="option">
                            <a id="butFivePrice" href="#select3">分價揭示</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="right_cont">
            <div class="right_top" >
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
                            {
                                ?>                       
                                <ul class="figure productItem" last_day="<?php echo $item['last_order_date'];?>" charge="<?php echo $item['buy_charge'];?>" price="<?php echo $item['price'];?>" id="<?php echo $item['code'];?>" price_code="<?php echo $item['price_code'];?>" >
                                    <li class="figure_result product name" ><?php echo $item['name'];?></li>
                                    <li class="figure_result store blue" data-bind="text: store">0</li>
<!--
                                    <li class="figure_result k" data-bind="text: k"><a onclick="popwin('chart?product_code=<?php echo $item['code'];?>','90%','90%');return false;"><img src="assets/img/k_chart.png"  width="15"/></a></li>
-->
                                    <li class="figure_result k" data-bind="text: k"><a onclick="window.open('chart?product_code=<?php echo $item['code'];?>&type=0','k線',config='status=0,toolbar=0,location=0,menubar=0')"><img src="assets/img/k_chart.png"  width="15"/></a></li>
                                    <li class="figure_result sit" data-bind="text: sit"><a onclick="window.open('chart?product_code=<?php echo $item['code'];?>&type=1','走勢線',config='status=0,toolbar=0,location=0,menubar=0')"><img src="assets/img/chart.png" width="15" /></a></li>
                                    <li class="figure_result amount blue" data-bind="text: amount" >---</li>
                                    <li class="figure_result buy" data-bind="text: buy" >---</li>
                                    <li class="figure_result sell" data-bind="text: sell" >---</li>
                                    <li class="figure_result updown" data-bind="text: updown" >---</li>
                                    <li class="figure_result percentage" data-bind="text: percentage" >---</li>
                                    <li class="figure_result total blue" data-bind="text: total" >---</li>
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
                        <li class="head_option_result" style="color:white;"><a href="#option1">買賣下單(<span id="buyListCount"></span>)</a></li>
                        <li class="head_option_result" style="color:white;"><a href="#option2">未平倉</a>(<span  id="title_unoffset_up_count"></span>,-<span id="title_unoffset_down_count"></span>)</li>
                        <li class="head_option_result"><a href="#option3">已平倉</a></li>
                        <li class="head_option_result"><a href="#option4">商品統計</a></li>
                        <li class="head_option_result"><a href="#option5">對帳表</a></li>
                        <li class="head_option_result"><a href="#option6">投顧訊息(<span id="advice_count"></span>)</a></li>
                        <li class="head_option_result close_msg " id="close_msg" style="border:solid 0px black;background-color:transparent;color:white;"></li>
                    </ul>
                </div>
                

                <div>
                    <div class="right_middle_body" id="option1">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result"><button id="butDelAll_close_limit" type="button">→刪單</button></li>
                                    <!--<li class="select1_result">
                                        <input type="checkbox">全選
                                    </li>
                                    <li class="select1_result">
                                        <input type="checkbox">全不選
                                    </li>-->
                                </ul>
                            </div>
                            <div class="right_middle_body_right">
                                <ul class="right_middle_body_select2">
                                    <li class="select2_result">
                                        <input type="radio" checked="checked" id="orderList1_con" name="orderList1_con" >全部單據
                                    </li>
                                    <li class="select2_result">
                                        <input type="radio" id="chk_list1_unoffset" name="orderList1_con">未成交單據
                                    </li>
                                    <li class="select2_result">
                                        <input id="show_all_order" type="checkbox" checked>顯示全部商品單據
                                    </li>
                                    <li class="select2_result">
                                        <input type="checkbox" id="chk_list1_bottom">自動置底
                                    </li>
                                    
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div id="list1_right_middle_body_bottom" class="right_middle_body_bottom">
                        <!--
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
                            </ul>-->

                             <table class="tb_list" style='text-align:center ;' >
                                <thead style="background-color:#EB6B5D;color:white;display:block;">
                                    <tr>
                                        <th style="padding:3px;">操作</th>
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
                                
                                <tbody id="orderList" class="scroll_div_1">


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
                                    <!--<li class="select1_result">
                                        <button onclick="saveLimitMulti()" type="button">設定損利點</button>-->
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
                            -->
                             <table class="tb_list">
                                <thead style="display:block;">
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
                                <tbody id="nowOrderList" class="scroll_div_1">

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
                            </ul>-->
                             <table class="tb_list">
                                <thead style="display:block;">
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
                                <tbody id="storeOrderList" class="scroll_div_2">

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
                                        預設額度：<span id="default_money"><?php if(isset($config)){echo $config['default_money'];}?></span>
                                    </li>
                                    <li class="select1_result">
                                        今日損益：<span id="user_profit2"></span>
                                    </li>
                                    <li class="select1_result">
                                        留倉預扣：<span id="spanReserverMoney"></span>
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
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                            </ul>-->

                              <table class="tb_list">
                                <thead style="display:block;">
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
                                <tbody id="list_static" class="scroll_div_1">

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
                                        <input type="text" id="bill_sdate" name="bill_sdate">
                                        結束日期
                                        <input type="text" id="bill_edate" name="bill_edate">
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
                            <div>
                                <table id="tb2" class="tb_list" style="background-color:opacity:0.8;" ></table>
                            </div>
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
                           
                            <ul class="list3">
                                <li class="item3">XXX</li>
                                <li class="item3 a">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3">XXX</li>
                                <li class="item3 b">XXX</li>
                                <li class="item3 b">XXX</li>
                            </ul>-->

                        </div>
                    </div>
                    <!--投顧訊息 option6-->
                    <div class="right_middle_body" id="option6">
                        <div class="right_middle_body_top">
                            <div class="right_middle_body_left">
                                <ul class="right_middle_body_select1">
                                    <li class="select1_result">
                                        開始日期
                                        <input type="text" id="advicer_sdate" name="advicer_sdate">
                                        結束日期
                                        <input type="text" id="advicer_edate" name="advicer_edate"  >

                                        <button  id="butSearch_advicer">送出</button>
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
                                        <select name="all">
                                            <option value="">全部</option>
                                           <!-- <option value="">期貨</option>
                                            <option value="">股票</option>
                                            <option value="">選擇</option>-->
                                             <?php
                                                foreach($advice_type as $item)
                                                {
                                                    echo '<option value="'. $item['id'] .'">'. $item['name'] .'</option>';
                                                }
                                            ?>
                                        </select>
                                    </li>
                                    <li class="select1_result">
                                        <button id="butPopTeacher">老師人物設定</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="right_middle_body_right" style="display:none;">
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

                        <div class="right_middle_body_bottom option6" >

                             <div id="advicerList" class="list3 header"  >

                                <table id="example" class="tb_list" ></table>
                                    <br>
                            </div>
                        </div>

                        <div class="right_middle_body_top" style="display:none;">
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

             <div id='emptyMenu' class="right_bottom" style="display:none;">
             <div class="right_bottom_one" style="width:83px;">&nbsp</div>
         </div>
            <div id="userMenu" class="right_bottom">
            <form>
                <div class="right_bottom_one">
                     <input id="now_product_code" name="now_product_code" type="hidden" value="" />
                    <div class="one_title" id="info4_name"></div>
                    <div class="one_option">
                        <div><input id="normal_order" type="radio" name="order_speed" value="normal" checked>&nbsp;一般</div>
                        <div id="divOrderFast"><input id="fast_order" type="radio" name="order_speed" value="fast" >&nbsp;雷電</div>
                    </div>


                </div>
                <div id="div_order_type"  class="right_bottom_two">
                    <div class="right_bottom_two_top">
                        <input type="radio" class="two_option type"  name="type" value="1">&nbsp;批分單
                        <input type="radio" class="two_option type" checked  name="type"  value="2">&nbsp;市價單
                    </div>
                    <div class="right_bottom_two_bottom">
                        <input type="radio"  name="type" class="two_option type" value="3">&nbsp;收盤單
                        <input id="rad_limitPrice" type="radio" class="two_option type" name="type" value="4">&nbsp;限價單
                    </div>

                </div>

                <div id="div_menu_speed" class="right_bottom_three">
                     <div id="li_limitPrice" style="padding-top:1px;display:none;">
                            <input id="butLimitPrice" type="button" value="限價" class="blueBut" />
                            <input id="txtLimitPrice" name="limitPrice" type="text" value="" style="width:50px;" />
                            <button type="button"  style="font-size:11px;color:white;float:right;" id="plus">
                                <span class="glyphicon glyphicon-plus"></span>
                            </button>
                            &nbsp;
                            <button type="button"  style="font-size:11px;color:white;float:right;" id="mins">
                                <span style="font-size:11px;color:white;" class="glyphicon glyphicon-minus"></span>
                            </button>
                    </div>
                    <div class="right_bottom_three_top" class="popClass">
                        <div class="three_title">停利：</div>
                        <input id="stop_up" name="stop_up" type="number" min="0"  value="0">
                    </div>
                    <div class="right_bottom_three_bottom">
                        <div class="three_title">停損：</div>
                        <input  id="stop_down" name="stop_down" type="number" min="0" value="0">
                    </div>
                </div>

                <div class="right_bottom_four">
                    <div class="right_bottom_four_top">
                        <button id="bt1" type="button" class="four_option">1</button>
                        <button id="bt2" type="button" class="four_option">2</button>
                        <button id="bt3" type="button" class="four_option">3</button>
                        <button id="bt4" type="button" class="four_option">4</button>
                        <button id="bt5" type="button" class="four_option">5</button>
                    </div>
                    <div class="right_bottom_four_middle">
                        <div class="four_title">口數</div>
                        <input id="amount" name="amount" type="number" value="1">
                    </div>
                    <div class="right_bottom_four_bottom">
                        <button type="button" class="four_edit" style="display:none;">編輯</button>
                        <button type="button" class="four_delete" style="display:none;">還原</button>
                    </div>

                </div>
                <div class="right_bottom_five">
                    <div class="five_left" id="butBuy_up">下多單</div>
                    <div class="five_right" style="text-aling:center;">
                        <div id="fast_info" style="display:none;">
                            未平倉:<span id="title_unoffset_up_count2"></span>,-<span id="title_unoffset_down_count2"></span> 
                            <br>損益:<span id="user_profit3"></span>
                        </div>
                        <button onclick="storeAllProduct();" type="button">全平</button>
                    </div>
                </div>
                <div class="right_bottom_six">
                    <div id="butBuy_down" class="six_left">下空單</div>

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
                        <div><input id="chkClose" name="chkClose" type="checkbox"  onclick="close_offset();">&nbsp;<span id="info5_name"></span> 收盤全平
                        </div>
                        <div name="chkNoConfirm" id="rt_3_6_3_2" ><input id="not_confirm" type="checkbox" >&nbsp;下單不確認</div>
                        <div name="chkTip"  id="rt_3_6_3_3"><input id="limitOrderMsg" type="checkbox" >&nbsp;限價成交提示</div>
                    </div>

                </div>
            </form>
            </div>
        </div>
    </div>
</div>

</body>
<!-- <script src="jquery/jquery-1.11.3.min.js"></script> -->
<!--<script src="<?=$base_url?>assets/js/jquery.js"></script>-->
<script>
    var prodCloseOrder = <?php echo $is_adm ? 'true' : 'false';?>;
    var wsUri = "<?php echo $url?>";
    var user_account = "<?php echo $user['account']?>";
</script>
<script src="<?=$base_url?>assets/js/jquery-ui-v1.10.3.js"></script>
 <script src="<?=$base_url?>assets/js/model.js?f3322"></script>
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
        var _showTab = 2;
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

    

    $(function() {
/*
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
        }*/
    });

    /* 投顧訊息Tab #option6From #option6To */

    $(function() {
/*
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
        }*/
    });


</script>
<!-- 選取老師視窗 -->
<div style="display:none;clear:both;">
    <div id="divTeacherList"  style="background-color:white;height:340px;color:black;"class="font">
        <div>
            <h2>請選擇老師:
            </h2>
        </div>
       <div style="padding-left:10px;color:black;"> 
        <?php
            foreach($teacher as $item)
            {
                echo '<input type="checkbox" checked="checked" id="t_'.$item['id'].'" name="teacher[]" value="'.$item['id'].'" />'. $item['name'] . '<br>';
            }
        ?>
         <div style="text-align:center;" >
                <input id="but_tcEnter" type="button" value="確定" class="blueBut" />
                <input id="but_tcCancel" type="button" value="取消" class="blueBut" />
        </div>
        </div>
       
    </div>

</div>

<!-- 修改限價單視窗 -->
<!--<div style="display:none;">
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
</div>-->



 <div id="tallModal" class="modal modal-wide fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 id="tallModelTitle" class="modal-title">修改限價單</h4>
                </div>
                <div class="modal-body">

                     <div id="divModify" style="color:black;">
                            <input id="modify_preID" type="hidden" value="" />
                            <table class="tb_list2">
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
                                <!--<div style="text-align:center;padding-top:20px;">
                                    <input onclick="" type="button" value="確定" />
                                    <input onclick="parent.close()" type="button" value="取消" />
                                </div>-->
                        </div>

                    
                </div>
                <div class="modal-footer">
                    <button id="butClose" type="button" class="btn btn-default" data-dismiss="modal">關閉</button>
                    <button id="butSave" type="button" onclick="javascript: limit_modify_save();" class="btn btn-primary">儲存</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div id="tallModal2" class="modal modal-wide fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 id="tallModelTitle2" class="modal-title" style="font-size:18px;color:gray;font-weight:bold;">修改停損</h4>
                </div>

                <div class="modal-body">
                    <input type="hidden" value="0" id="stop_profit" />
                    <input type="hidden" value="0" id="stop_loss" />
                    <!-- 修改停損利視窗 -->
                    <div id="divLimit" class="popClass" style="height:160px;">
                          <iframe id="ifStopLossProfit" src="" frameborder="1" width="100%" height="160px;">
                          </iframe>
                    </div>    
                </div>

                <div class="modal-footer">
                    <button id="butClose" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button  type="button" class="btn btn-default" onclick="clear_stop_loss_profit()">清除設定</button>
                    <button id="butSave" type="button" onclick="javascript: save_stop();" class="btn btn-primary">儲存</button>
                </div>
                
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

     <div id="sendComfirm" class="modal modal-wide fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 id="tallModelTitle" class="modal-title">修改上下限</h4>
                </div>
                <div class="modal-body">

                    <!-- 修改停損利視窗 -->
                    <div id="confirmMsg" class="popClass">
                       
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button id="butClose" type="button" class="btn btn-default" data-dismiss="modal">關閉</button>
                    <button id="butSave" type="button" onclick="javascript: saveLimit();" class="btn btn-primary">儲存</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</html>
