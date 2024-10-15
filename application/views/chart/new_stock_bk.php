<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=us-ascii">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AnyChart-K線圖Demo</title>
    
    <!--
    <script src="http://cdn.anychart.com/themes/7.12.0/dark_blue.min.js"></script>
    <link rel="stylesheet" href="https://cdn.anychart.com/css/7.12.0/anychart-ui.min.css"></link>
  -->

    <style type="text/css">
       html, body, #container {
		  width: 100%;
		  height: 100%;
		  margin: 0;
		  padding: 0;
	   }

     input[type="checkbox"]{
        width: 18px; /*Desired width*/
        height: 18px; /*Desired height*/
        cursor:pointer;
      }
      #toolbar,#toolbar2 {
        left:0px;
        top:37px;
        height:27px;
        width:100%;
        position:relative;
        /*display: none;*/
      }

      #toolbar2
      {
        margin-left:20px;
      }

      #tab_button{
        position:absolute;
        left:10px;
        top:10px;
        width:100%;
        float:left;
        height:25px;
      }
      #toolbar ul.timegroup
      {
        float: left;
        top: 0px;
        left: 0px;
        position: relative;
        margin: 0;
        padding: 0;
      }

      #toolbar ul.timegroup li{
        float:left;
        list-style: none;
        height:25px;
        width:50px;
        background-color: #eee;
        border-width: 2px;
        border-radius: 5px;
        text-align: center;
        margin-left:10px;
      }

      #toolbar ul.timegroup li a:hover{
        color:red;
        font-weight: bold;
      }

      #toolbar ul.timegroup li a{
        text-decoration: none;
      }
      
      #container,#container2{
        position:relative;
        left:0;
        top:30px;
        width:90%;
        height:100%;
      }
      #container
      {
        margin-top:25px;
      }
      #container2
      {
        margin-top:10px;
      }

      #eddays
      {
        text-align: right;
        width:35px;
      }

      #ul-indicator{
        margin-top:5px;
        margin-bottom:0;
        padding-top:0;
        padding-bottom:0;
        float:left;
        position:relative;
        top:0px;
        left:0px;
        width:90%;
      }

      #divsetting
      {
        padding:15px;
      }
      fieldset { border:1px solid green; margin-top:5px; }
      legend {
          padding: 0.2em 0.5em;
          border:1px solid green;
          color:green;
          font-size:90%;
          text-align:left;
      }
     </style>
<head>
<body>

<input type='hidden' id='type' value=<?php echo $type;?> />
<input type='hidden' id='pcode' value=<?php echo $code;?> />
<span id="lbloading" style="background-color:red;color:white;display:none;font-size:20px;padding:2px;">圖表製作中</span>

<div id="tab_button">
  <select id="productchange">
  	<option value="TX">台指期</option>
  	<option value="TE">電子期</option>
  	<option value="TF">金融期</option>
  	<option value="HSI">恆生期</option>
  	<option value="NKN">日經期</option>
        <option value="CIF">滬深期</option>
        <option value="EC">歐元期</option>
        <option value="DAX">法蘭克</option>
        <option value="YM">道瓊期</option>
        <option value="NQ">那斯達</option>
        <option value="CL">輕油期</option>
        <option value="SI">白銀期</option>
        <option value="GC">黃金期</option>
  </select>
  <button id='btn-showk'>K線圖</button>
  <button id='btn-showline'>走勢圖</button>
  <button id='btn-changeproduct'>送出</button>
</div>
<div id="toolbar">
       <ul class='timegroup'>
          <li><a href=# id='m1'>1分</a></li>
          <li><a href=# id='m3'>3分</a></li>
          <li><a href=# id='m5'>5分</a></li>
          <li><a href=# id='m10'>10分</a></li>
          <li><a href=# id='m15'>15分</a></li>
          <li><a href=# id='m30'>30分</a></li>
          <li><a href=# id='m60'>60分</a></li>
          <li><a href=# id='md'>日</a></li>
          <li><a href=# id='mw'>週</a></li>
          <li><a href=# id='my'>月</a></li>
          <!-- <li><a href=# id='mline'>走勢圖</a></li> -->
       </ul>
       <input type='checkbox' checked='checked' id='chktimer'>即時更新</input>
       <a href="#" id="callsetting" style="text-decoration:none;">設定參數</a>
       <div id="divsetting" style="display:none; cursor: default;top:'20px';text-alignment:left;padding:'12px';"> 
          <fieldset>
            <legend>AROON</legend>
            <label>Period:</label>
            <input type="text" id="aroon-p1"></input></br>
          </fieldset>
          <fieldset>
            <legend>RSI</legend>
            <label>Period:</label>
            <input type="text" id="rsi-p1"></input></br>
          </fieldset>
          <fieldset>
            <legend>SMA</legend>
            <label>Period 1:</label>
            <input type="text" id="sma-p1"></input></br>
            <label>Period 2:</label>
            <input type="text" id="sma-p2"></input></br>
          </fieldset>
           <fieldset>
            <legend>ROC</legend>
            <label>Period</label>
            <input type="text" id="roc-p1"></input></br>
          </fieldset>
           <fieldset>
            <legend>MACD</legend>
            <label>Period 1:</label>
            <input type="text" id="macd-p1"></input></br>
            <label>Period 2:</label>
            <input type="text" id="macd-p2"></input></br>
            <label>Period 3:</label>
            <input type="text" id="macd-p3"></input></br>
          </fieldset>
        </br>
          <button id="callSaveSetting">確認</button>
          <button id="cancelSaveSetting">取消</button>
       </div>

      </br> 
      <ul id='ul-indicator'>
        <li>
          <input type='checkbox' class='indicator' id='chk-aroon'>Aroon</input>
          <input type='checkbox' class='indicator' id='chk-ema'>EMA</input>
          <input type='checkbox' class='indicator' id='chk-rsi'>RSI</input>
          <input type='checkbox' class='indicator' id='chk-sma'>SMA</input>
          <input type='checkbox' class='indicator' id='chk-roc'>ROC</input>
          <input type='checkbox' class='indicator' id='macd-roc'>MACD</input>
          <input type='checkbox' class='indicator' id='chk-trend'>量圖</input>
	  <!-- <a href="#" id="aroon">Aroon Indicator</a> -->
        </li>
      </ul>
</div>
<div id='toolbar2'>
        <label>日期:</label><input type='text' id='dt'>
      <label>日數:</label><input type='number' id='eddays' value=1>
      <input type="checkbox" class="indicator" id="chk-showk">顯示K線</input>
      <button id='showLineChart'>送出</button>

</div>

<div id="container">
		
</div>

<div id="container2">
    
</div>

<!-- <link rel="stylesheet" href="//jqueryui.com/jquery-wp-content/themes/jquery/css/base.css?v=1"> -->
<!-- <link rel="stylesheet" href="assets/js/jquery-ui-1.12.1/jquery-ui.min.css"> -->
<!-- <link rel="stylesheet" href="assets/jquery-ui-1.12.1/jquery-ui.theme.min.css"> -->


<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>

<!-- <script type="text/javascript" src="assets/js/jquery-ui-1.12.1/jquery-ui.min.js"></script> -->


<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<!-- <script src="https://code.jquery.com/jquery-1.12.4.js"></script> -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="assets/js/jquery-ui-1.12.1/datepicker-zh-TW.js"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.2/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.anychart.com/js/7.12.0/anychart-bundle.min.js"></script>
<script type="text/javascript" src="assets/js/component/jquery.xdomainajax.js"></script>
<script type="text/javascript" src="assets/js/component/jquery.blockUI.js"></script>

<script> var stockno="<?php echo $code;?>";</script>
<script type="text/javascript" src="assets/js/tedemo.js?v=12392825"></script>

</body>
</html>

