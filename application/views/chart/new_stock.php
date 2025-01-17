<!DOCTYPE html>
<html xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="zh-TW" lang="zh-TW">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>K線圖</title>
        <!-- Bootstrap -->
        <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->
        <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.css?0108">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/css/bootstrap-select.min.css">


        <!-- AnyChart UI -->
        <link rel="stylesheet" href="https://cdn.anychart.com/releases/8.1.0/css/anychart-ui.min.css" />
        <link rel="stylesheet" href="https://cdn.anychart.com/fonts/2.7.2/anychart.css">
        <!-- -->
        <!-- ColorPicker -->
        <link href="assets/css/bootstrap-colorpicker.min.css" rel="stylesheet">
        <link href="assets/css/bootstrap-colorpicker-plus.min.css" rel="stylesheet">
        <script src="assets/js/common.js?<?php echo time(); ?>"></script>
        <script src="https://cdn.anychart.com/releases/8.0.1/locales/zh-tw.js"></script>
        <script>(function(){
function ac_add_to_head(el){
    var head = document.getElementsByTagName('head')[0];
    head.insertBefore(el,head.firstChild);
}
function ac_add_link(url){
    var el = document.createElement('link');
    el.rel='stylesheet';el.type='text/css';el.media='all';el.href=url;
    ac_add_to_head(el);
}
function ac_add_style(css){
    var ac_style = document.createElement('style');
    if (ac_style.styleSheet) ac_style.styleSheet.cssText = css;
    else ac_style.appendChild(document.createTextNode(css));
    ac_add_to_head(ac_style);
}
ac_add_link('https://cdn.anychart.com/playground-css/annotated/annotated-title.css');
ac_add_link('https://cdn.anychart.com/releases/8.0.1/css/anychart-ui.min.css');
ac_add_link('https://cdn.anychart.com/releases/8.0.1/fonts/css/anychart-font.min.css');

})();</script>

        <script type="text/javascript">
        window.localStorage.clear();
        
        </script>
        <style>
            * { margin: 0; padding: 0; }
            body { background:#000000; color:#eee; overflow: hidden; }
            body.noscroll { overflow: hidden; }
            a ,a:hover { text-decoration: none; color: #000; }
            li { list-style-type: none; display: inline-block; }
            button { padding: 3px 5px; color:#000; }
            input,select { color:#333; }
            #tab_loading ,#data_setting ,#view_obj_list{
                background-color: rgba(0,0,0,.5); position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
                display: flex; align-items:center; justify-content:center; z-index: 50; cursor: wait; display: none; 
            }
            #tab_loading p {
                padding: 20px 0; display: block; width: 100%; background-color: #fff;
                text-align: center; font-size: 20px; letter-spacing: 5px; color: #f00;
            }

            fieldset { border: 1px solid #008000; margin: 5px; }
            fieldset p { text-align: center; line-height: 1.75; margin: 5px; }
            legend { padding: .2em .5em; border: 1px solid #008000; color: #008000; margin-left: 10px; margin-bottom: 0; width: auto; }
            .setTab ,.setTab_objview { background-color: #fff; padding: 5px; width: 450px; cursor: default; color:#333; }
            .setTab { width: 700px; }
            .tab_half { width: 50%; margin: 0; float: left; }
            .setTab_objview label { margin: 2px; display: inline-block; width: 30%; }
            .set_button { margin: 10px; text-align: center; }
            .output_view { width: 100%; margin: 0 auto; }
            #tabNav { margin: 5px 0 0; }
            #tabNav a { display: block; background-color: #eee; border: 1px solid #ccc; border-radius: 5px 5px 0 0; padding: 4px 5px; }
            #tabNav a.on ,#tabNav a:hover { color: #f00; }
            .viewTab { padding: 10px 0; display: none; }
            .tabBox { border-top: 1px solid #ccc; }
            #k_line_timer { margin: 5px 0; }
            #k_line_timer a { width: 50px; line-height: 25px; text-align: center; display: block; background-color: #eee; }
            #k_line_timer a.on ,#k_line_timer a:hover { color: #f00; font-weight: bold; }
            #k_line_timer li ,#k_line_type li { margin-right: 5px; }
            #k_line_type li { font-size: 18px; }
            #data_setting input[type=text] ,#showline input[type=text] ,
            #showline input[type=number] ,select{ padding: 3px 5px; outline: none; }
            #line_date { width: 120px; } #line_days { width: 50px; }

            #printer_1,#printer_2 ,.draw_tab{ width: 90%; height: calc(100vh - 6em); position: absolute; }
            #data_view {
                width: 135px; position: absolute; top:0; left: 0; font-size: 13px; padding: 10px; display: none;
                background-color: rgba(49, 49, 49, 0.95); color: #e4e4e4; z-index: 99; line-height: 1.5; cursor: move; }
            #btnClose { background-color: transparent; color: #fff; border: none; outline: none; float: right; cursor: pointer; }
            #btnClose:hover { color: #fcffcf; }
            #data_view dt { font-size: 14px; border-bottom: 1px solid #999; }
            #data_view dd { margin: .3em 0; }
            .toolbar { position: absolute; top: 0; left: 0; width: 100%; display: none; background-color: rgba(255,255,255,.5); z-index: 5; height: 40px; line-height: 40px; }

}
        @import "compass/css3";
svg {
  -webkit-backface-visibility: visible;
  -moz-backface-visibility: visible;
  backface-visibility: visible;
}

.phonec{
  opacity: 0;
  -webkit-transform: translateX(-50px);
  -ms-transform: translateX(-50px);
  transform: translateX(-50px);
  -webkit-animation: phoneMove 2s linear 0s
    forwards;
  animation: phoneMove 2s linear 0s
}
@-webkit-keyframes phoneMove {
  0% {
   opacity: 0;
   -webkit-transform: translateX(-50px);
   -ms-transform: translateX(-50px);
   transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    transform: translateX(0px);
  }
}
@keyframes phoneMove {
 0% {
   opacity: 0;
   -webkit-transform: translateX(-50px);
   -ms-transform: translateX(-50px);
   transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    transform: translateX(0px);
  }
}


        </style>
        <link href="assets/css/k_line_style.css?<?php echo time();?>" rel="stylesheet">
    </head>
    <body>

        <input type="hidden" name="p_code">
        <div id="tab_loading"><p>圖表製作中</p></div>
        <div id="data_setting">
            <div class="setTab">
                <div class="tab_half">
                    <!-- <fieldset>
                        <legend>最佳移動平均線</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="ama_p1" >    
                        </p>
                    </fieldset>
                    <fieldset>
                        <legend>布林線</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="bbands_p1" >    
                        </p>
                    </fieldset>
                    <fieldset>
                        <legend>乖離率</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="bbandsb_p1" >    
                        </p>
                    </fieldset>
                    <fieldset>
                        <legend>布林極限</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="bbw_p1" >    
                        </p>
                    </fieldset>
                    <fieldset>
                        <legend>騰落指標</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="ald_p1" >    
                        </p>
                    </fieldset> -->
                    <fieldset>
                        <legend>EMA</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="ema_p1" >	
                        </p>
                    </fieldset>

                    <fieldset>
                        <legend>MMA</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="mma_p1">	
                        </p>
                    </fieldset>

                    <fieldset>
                        <legend>SMA</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="sma_p1">	
                        </p>
                    </fieldset>

                    <fieldset>
                        <legend>阿隆指標</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="arron_p1">	
                        </p>
                    </fieldset>

                    <fieldset>
                        <legend>KDJ隨機指標</legend>
                        <p>
                            <label>Period 1:</label>
                            <input type="text" id="kdj_p1"><br />
                            <label>Period 2:</label>
                            <input type="text" id="kdj_p2"><br />
                            <label>Period 3:</label>
                            <input type="text" id="kdj_p3">
                        </p>
                    </fieldset>
                </div>
                <div class="tab_half">
                    <fieldset>
                        <legend>MACD指標</legend>
                        <p>
                            <label>Period 1:</label>
                            <input type="text" id="macd_p1"><br />
                            <label>Period 2:</label>
                            <input type="text" id="macd_p2"><br />
                            <label>Period 3:</label>
                            <input type="text" id="macd_p3">
                        </p>
                    </fieldset>

                    <fieldset>
                        <legend>ROC變動指標</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="roc_p1">	
                        </p>
                    </fieldset>

                    <fieldset>
                        <legend>RSI相對強弱指標</legend>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="rsi_p1">
                        </p>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="rsi_p2">
                        </p>
                        <p>
                            <label>Period:</label>
                            <input type="text" id="rsi_p3">
                        </p>
                    </fieldset>

                    <fieldset>
                        <legend>KD隨機指標</legend>
                        <p>
                            <label>Period 1:</label>
                            <input type="text" id="stoch_p1"><br />
                            <label>Period 2:</label>
                            <input type="text" id="stoch_p2"><br />
                            <label>Period 3:</label>
                            <input type="text" id="stoch_p3">
                        </p>
                    </fieldset>
                </div>


                <p class="set_button">
                    <button id="btn_param_check" onclick="set_obj()">確認</button>
                    <button id="btn_param_cancel">取消</button>
                </p>
            </div>
        </div>
        <div id="view_obj_list">
            <div class="setTab_objview">
                <fieldset id="tech_mlist">
                    <!-- <legend>主圖</legend>
                    <label><input type="checkbox" class="kline_type" id="ipt_AMA"> 最佳移動平均線</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_BBands"> 布林線</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_BBandsB"> 乖離率</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_BBW"> 布林極限</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_EMA"> EMA</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_MMA"> MMA</label>
 -->
                </fieldset>
                <fieldset id="tech_list">
                    <legend>副圖</legend>
                    <!-- <label><input type="checkbox" class="kline_type" id="ipt_ADL"> 騰落指標</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_Aroon"> 阿隆指標</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_ATR"> 真實波幅</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_CMF"> 佳慶指標</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_CHO"> 蔡金擺動指標</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_CCI"> CCI順勢指標</label> -->
                    <!-- <label><input type="checkbox" class="kline_type" id="ipt_DMI"> DMI</label> -->
                   <!--  <label><input type="checkbox" class="kline_type" id="ipt_KDJ"> KDJ隨機指標</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_MACD"> MACD指標</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_ROC"> ROC變動率指標</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_RSI"> RSI相對強弱指標</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_Stochastic"> ＫＤ隨機指標</label>
                    <label><input type="checkbox" class="kline_type" id="ipt_trend" checked="checked"> 成交量</label> -->
                </fieldset>
                <fieldset>
<!--                     <legend>平均線</legend>
                    <label><input type="checkbox" class="kline_avg" value="ipt_avg_1" id="ipt_avg_1" checked="checked"> 5[白]</label>
                    <label><input type="checkbox" class="kline_avg" value="ipt_avg_2" id="ipt_avg_2"> 10[黃]</label>
                    <label><input type="checkbox" class="kline_avg" value="ipt_avg_3" id="ipt_avg_3"> 20[紅]</label>
                    <label><input type="checkbox" class="kline_avg"  value="ipt_avg_4" id="ipt_avg_4" checked="checked"> 30[綠]</label>
                    <label><input type="checkbox" class="kline_avg" value="ipt_avg_5" id="ipt_avg_5" checked="checked"> 60[藍]</label> -->
                </fieldset>
<!--                 <p class="set_button">
                    <button id="btn_close_tech" onclick="set_obj_tmp()">關閉視窗</button>
                </p> -->
            </div>
        </div>
        <div class="output_view">

            <ul id="tabNav">
                <li>
                    <form id="form_product">
                        <select id="product_code" name="product_code">
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
                            <option value="TTX">台指電</option>
                        </select>
                        <input type="hidden" name="type">
                        <button>送出</button>
                    </form>
                </li>
                <li><a href="#showk">K線圖</a></li>
                <li><a href="#showline">走勢圖</a></li>
            </ul>
            <div class="tabBox">
               
                <div id="showk" class="viewTab">
                
                    <ul id="k_line_timer">
                        <li><a href="#" class="kline_timer" data-time="m1">1分</a></li>
                        <li><a href="#" class="kline_timer" data-time="m3">3分</a></li>
                        <li><a href="#" class="kline_timer" data-time="m5">5分</a></li>
                        <li><a href="#" class="kline_timer" data-time="m10">10分</a></li>
                        <li><a href="#" class="kline_timer" data-time="m15">15分</a></li>
                        <li><a href="#" class="kline_timer" data-time="m30">30分</a></li>
                        <li><a href="#" class="kline_timer" data-time="m60">60分</a></li>
                        <li><a href="#" class="kline_timer" data-time="md">日</a></li>
                        <li><a href="#" class="kline_timer" data-time="mw">週</a></li>
                        <li><a href="#" class="kline_timer" data-time="my">月</a></li>
                        <li>
                            <label>
                                <input type="checkbox" id="update_realtime" checked > 即時更新
                            </label>
                        </li>
                        <li>
                            <button id="btn_setParam">設定參數</button>
                            <button id="btn_printer">繪圖工具</button>
                            <!-- <button id="btn_tech_img">技術指標</button> -->
                            <label><input type="checkbox" class="kline_avg" value="ipt_avg_1" id="ipt_avg_1" checked="checked"> 5[白]</label>
                                    <label><input type="checkbox" class="kline_avg" value="ipt_avg_2" id="ipt_avg_2"> 10[黃]</label>
                                    <label><input type="checkbox" class="kline_avg" value="ipt_avg_3" id="ipt_avg_3"> 20[紅]</label>
                                    <label><input type="checkbox" class="kline_avg"  value="ipt_avg_4" id="ipt_avg_4" checked="checked"> 30[綠]</label>
                                    <label><input type="checkbox" class="kline_avg" value="ipt_avg_5" id="ipt_avg_5" checked="checked"> 60[藍]</label>
                                    <label><input type="text" class="button_num" value="" id="button_num" name="button_num" onkeypress="get_value(this.value)">資料數</label>
                        </li>
                    </ul>
                    
                    <div class="draw_tab" style="padding-left:150px;padding-top:30px">
                        <div id="draw_tool" class="toolbar" style="display: block;">
                            <div class="btn-group-container">
                                <div class="btn-group btn-group-sm">
                                    <button type="button" class="btn btn-sm color-picker" data-color="fill" data-toggle="tooltip"
                                            title="選擇填充顏色"><span
                                            class="color-fill-icon dropdown-color-fill-icon" style="background-color:#e06666;"></span>&nbsp;<b
                                            class="caret"></b>
                                    </button>

                                    <button type="button" class="btn btn-sm color-picker" data-color="stroke" data-toggle="tooltip"
                                            title="選擇筆劃顏色"><span
                                            class="color-fill-icon dropdown-color-fill-icon" style="background-color:#e06666;"></span>&nbsp;<b
                                            class="caret"></b>
                                    </button>

                                    <select class="selectpicker show-menu-arrow btn-sm" id="select-stroke-settings"
                                            title="筆劃設定"
                                            data-style="btn-sm" data-width="121" multiple>
                                        <optgroup label="筆劃寬度" data-max-options="1">
                                            <option data-settings="width" value="1">1 px</option>
                                            <option data-settings="width" value="2">2 px</option>
                                            <option data-settings="width" value="3">3 px</option>
                                            <option data-settings="width" value="4">4 px</option>
                                            <option data-settings="width" value="5">5 px</option>
                                        </optgroup>
                                        <optgroup label="筆劃樣式" data-max-options="1">
                                            <option value="6" data-settings="type">實線</option>
                                            <option value="7" data-settings="type">點線</option>
                                            <option value="8" data-settings="type">虛線</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div class="btn-group btn-group-sm">
                                    <button type="button" data-action-type="unSelectedAnnotation" class="btn btn-default"
                                            aria-label="Center Align" data-toggle="tooltip" title="游標">
                                        <i class="ac ac-mouse-pointer" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="select-container btn-sm">
                                <select class="selectpicker show-menu-arrow choose-drawing-tools btn-sm"
                                        title="繪圖工具"
                                        data-style="btn-sm" data-width="133" data-max-options="1">
                                    <optgroup label="線,趨勢線,光線:">
                                        <option data-icon="ac ac-line" data-annotation-type="line">線段</option>
                                        <option data-icon="ac ac-horizontal-line" data-annotation-type="horizontalLine">水平線</option>
                                        <option data-icon="ac ac-vertical-line" data-annotation-type="verticalLine">垂直線</option>
                                        <option data-icon="ac ac-infinite-line" data-annotation-type="infiniteLine">無限線</option>
                                        <option data-icon="ac ac-ray" data-annotation-type="ray">射線</option>
                                    </optgroup>
                                    <optgroup label="幾何形狀:">
                                        <option data-icon="ac ac-triangle" data-annotation-type="triangle">三角形</option>
                                        <option data-icon="ac ac-rectangle" data-annotation-type="rectangle">長方形</option>
                                        <option data-icon="ac ac-ellipse" data-annotation-type="ellipse">橢圓</option>
                                    </optgroup>
                                    <optgroup label="其他工具:">
                                        <option data-icon="ac ac-trend-channel" data-annotation-type="trendChannel">趨勢頻道</option>
                                        <option data-icon="ac ac-andrews-pitchfork" data-annotation-type="andrewsPitchfork">安德魯的干草叉</option>
                                    </optgroup>
                                    <optgroup label="斐波那契工具:">
                                        <option data-icon="ac ac-fibonacci-fan" data-annotation-type="fibonacciFan">斐波納契風扇</option>
                                        <option data-icon="ac ac-fibonacci-arc" data-annotation-type="fibonacciArc">斐波那契弧</option>
                                        <option data-icon="ac ac-fibonacci-retracement" data-annotation-type="fibonacciRetracement">斐波納契回撤</option>
                                        <option data-icon="ac ac-fibonacci-timezones" data-annotation-type="fibonacciTimezones">斐波納契時區</option>
                                    </optgroup>
                                </select>
                            </div>

                            <div class="btn-group btn-group-sm hidden-xs">
                                <button data-annotation-type="line" type="button" class="btn btn-sm" aria-label="Center Align"
                                        data-toggle="tooltip" title="線段">
                                    <i class="ac ac-line" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="horizontalLine" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="水平線">
                                    <i class="ac ac-horizontal-line" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="verticalLine" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="垂直線">
                                    <i class="ac ac-vertical-line" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="infiniteLine" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="無限線">
                                    <i class="ac ac-infinite-line" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="ray" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="射線">
                                    <i class="ac ac-ray" aria-hidden="true"></i>
                                </button>
                            </div>

                            <div class="btn-group btn-group-sm hidden-xs">
                                <button data-annotation-type="triangle" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="三角形">
                                    <i class="ac ac-triangle" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="rectangle" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="長方形">
                                    <i class="ac ac-rectangle" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="ellipse" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="橢圓">
                                    <i class="ac ac-ellipse" aria-hidden="true"></i>
                                </button>
                            </div>

                            <div class="btn-group btn-group-sm hidden-xs">
                                <button data-annotation-type="trendChannel" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="趨勢頻道">
                                    <i class="ac ac-trend-channel" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="andrewsPitchfork" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="安德魯的干草叉">
                                    <i class="ac ac-andrews-pitchfork" aria-hidden="true"></i>
                                </button>
                            </div>

                            <div class="btn-group btn-group-sm hidden-xs">
                                <button data-annotation-type="fibonacciFan" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="斐波納契風扇">
                                    <i class="ac ac-fibonacci-fan" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="fibonacciArc" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="斐波那契弧">
                                    <i class="ac ac-fibonacci-arc" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="fibonacciRetracement" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="斐波納契回撤">
                                    <i class="ac ac-fibonacci-retracement" aria-hidden="true"></i>
                                </button>
                                <button data-annotation-type="fibonacciTimezones" type="button" class="btn btn-sm"
                                        aria-label="Center Align" data-toggle="tooltip" title="斐波納契時區">
                                    <i class="ac ac-fibonacci-timezones" aria-hidden="true"></i>
                                </button>

                            </div>

                            <div class="btn-group-container btn-group-sm">
                                <div class="btn-group ">
                                    <select class="selectpicker show-menu-arrow select choose-marker btn-sm" id="select-marker-type"
                                            title="標記"
                                            data-style="btn-sm" data-width="90" data-max-options="1">
                                        <option data-icon="ac ac-arrow-up-square" data-annotation-type="marker" data-marker-type="arrowUp"
                                                data-marker-anchor="top">向上箭頭
                                        </option>
                                        <option data-icon="ac ac-arrow-down-square" data-annotation-type="marker"
                                                data-marker-type="arrowDown" data-marker-anchor="bottom">向下箭頭
                                        </option>
                                        <option data-icon="ac ac-arrow-left-square" data-annotation-type="marker"
                                                data-marker-type="arrowLeft" data-marker-anchor="left">向左箭頭
                                        </option>
                                        <option data-icon="ac ac-arrow-right-square" data-annotation-type="marker"
                                                data-marker-type="arrowRight" data-marker-anchor="right">向右箭頭
                                        </option>
                                        <option data-icon="ac ac-head-arrow" data-annotation-type="marker" data-marker-type="arrowHead"
                                                data-marker-anchor="right">頭箭頭
                                        </option>
                                        <option data-icon="ac ac-cross" data-annotation-type="marker" data-marker-type="cross"
                                                data-marker-anchor="center">十字
                                        </option>
                                        <option data-icon="ac ac-diagonal-cros" data-annotation-type="marker" data-marker-type="diagonalCross"
                                                data-marker-anchor="center">對角十字
                                        </option>
                                        <option data-icon="ac ac-diamond" data-annotation-type="marker" data-marker-type="diamond"
                                                data-marker-anchor="center">菱形
                                        </option>
                                        <option data-icon="ac ac-pentagon" data-annotation-type="marker" data-marker-type="pentagon"
                                                data-marker-anchor="center">五角形
                                        </option>
                                        <option data-icon="ac ac-square" data-annotation-type="marker" data-marker-type="square"
                                                data-marker-anchor="center">方形
                                        </option>
                                        <option data-icon="ac ac-star-1" data-annotation-type="marker" data-marker-type="star10"
                                                data-marker-anchor="center">星形 1
                                        </option>
                                        <option data-icon="ac ac-star-2" data-annotation-type="marker" data-marker-type="star4"
                                                data-marker-anchor="center">星形 2
                                        </option>
                                        <option data-icon="ac ac-star-3" data-annotation-type="marker" data-marker-type="star5"
                                                data-marker-anchor="center">星形 3
                                        </option>
                                        <option data-icon="ac ac-star-4" data-annotation-type="marker" data-marker-type="star6"
                                                data-marker-anchor="center">星形 4
                                        </option>
                                        <option data-icon="ac ac-star-5" data-annotation-type="marker" data-marker-type="star7"
                                                data-marker-anchor="center">星形 5
                                        </option>
                                        <option data-icon="ac ac-trapezium" data-annotation-type="marker" data-marker-type="trapezium"
                                                data-marker-anchor="center">梯形
                                        </option>
                                        <option data-icon="ac ac-triangle-up" data-annotation-type="marker" data-marker-type="triangleUp"
                                                data-marker-anchor="top">三角形 向上
                                        </option>
                                        <option data-icon="ac ac-triangle-down" data-annotation-type="marker" data-marker-type="triangleDown"
                                                data-marker-anchor="bottom">三角形 向下
                                        </option>
                                        <option data-icon="ac ac-triangle-left" data-annotation-type="marker" data-marker-type="triangleLeft"
                                                data-marker-anchor="left">三角形 向左
                                        </option>
                                        <option data-icon="ac ac-triangle-right" data-annotation-type="marker" data-marker-type="triangleRight"
                                                data-marker-anchor="right">三角形向 右
                                        </option>
                                    </select>
                                    <select class="selectpicker show-menu-arrow select select-marker-size btn-sm" id="select-marker-size"
                                            title="標記尺寸"
                                            data-style="btn-sm" data-width="80" data-max-options="1">
                                        <option data-settings="width" value="5">5 px</option>
                                        <option data-settings="width" value="10">10 px</option>
                                        <option data-settings="width" value="15">15 px</option>
                                        <option data-settings="width" value="20" selected>20 px</option>
                                        <option data-settings="width" value="25">25 px</option>
                                    </select>
                                </div>
                            </div>
                            <div class="btn-group-container btn-group-sm" >
                                <div class="btn-group">
                                    <button data-action-type="removeSelectedAnnotation" type="button" class="btn btn-default"
                                            aria-label="Center Align" data-toggle="tooltip" title="刪除所選圖形">
                                        <i class="ac ac-remove-thin" aria-hidden="true"></i>
                                    </button>
                                    <button data-action-type="removeAllAnnotations" type="button" class="btn btn-default"
                                            aria-label="Center Align" data-toggle="tooltip" title="刪除所有圖紙">移除所有
                                    </button>
                                </div>
                            </div>
                            <div class="btn-group-container btn-group-sm">
                                <div class="btn-group">
                                    <button type="button" id="btn_close_drawer" class="btn btn-default">關閉繪圖工具</button>
                                </div>
                            </div>
                        </div>
                        <!-- <div id="data_view">
                            <dl>
                                <dt>
                                    <span id="data_view_time">2017-04-28 23:58</span>
                                    <button type="button" id="btnClose"><i class="fa fa-times" aria-hidden="true"></i></button>	
                                </dt>
                                <dd>開:<span id="data_view_open"></span></dd>
                                <dd>高:<span id="data_view_high"></span></dd>
                                <dd>低:<span id="data_view_low"></span></dd>
                                <dd>收:<span id="data_view_close"></span></dd>
                                <dd>總量:<span id="data_view_amount"></span></dd>
                            </dl>
                        </div> -->
                         
                        <div svg-map="'zh_TM'" id="printer_1" style="height: 95%"></div>
                    </div>
                    <div id="left_showk" class="left_viewTab" style="width: 150px;top:165px ;display: block;position: absolute;color: #fff">
                       
                            <fieldset id="tech_mlist">
                                    <label><input type="checkbox" class="kline_type" id="ipt_kline">K線</label>
                                    <label><input type="checkbox" class="kline_type" id="ipt_AMA"> 最佳移動平均線</label>
                                    <label><input type="checkbox" class="kline_type" id="ipt_BBands"> 布林線</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_BBandsB"> 乖離率</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_BBW"> 布林極限</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_EMA"> EMA</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_MMA"> MMA</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_ADL"> 騰落指標</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_Aroon"> 阿隆指標</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_ATR"> 真實波幅</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_CMF"> 佳慶指標</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_CHO"> 蔡金擺動指標</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_CCI"> CCI順勢指標</label><br>
                                    <!-- <label><input type="checkbox" class="kline_type" id="ipt_DMI"> DMI</label> -->
                                    <label><input type="checkbox" class="kline_type" id="ipt_KDJ"> KDJ隨機指標</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_MACD"> MACD指標</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_ROC"> ROC變動率指標</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_RSI"> RSI相對強弱指標</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_Stochastic"> ＫＤ隨機指標</label><br>
                                    <label><input type="checkbox" class="kline_type" id="ipt_trend" checked="checked"> 成交量</label>
                                </fieldset>
                        </div>
                        
                   

                </div>
                <div id="showline" class="viewTab">
                    <form id="form_trend">
                        <label for="line_date">日期：</label>
                        <input type="text" id="line_date">

                        <label for="line_days">日數：</label>
                        <input type="number" id="line_days" value="1">

                        <label><input type="checkbox" id="line_kline" checked="checked">顯示K線</label>
                        <button>送出</button>
                    </form>
                    <div id="printer_2"></div>
                </div>
            </div>
        </div>

        <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="assets/css/font-awesome-4.4.0/css/font-awesome.min.css">
        <script src="http://code.jquery.com/jquery-2.2.4.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
        <script src="assets/js/jquery-ui-1.12.1/datepicker-zh-TW.js"></script>

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

        <script src="assets/js/bootstrap-colorpicker.min.js"></script>
        <script src="assets/js/bootstrap-colorpicker-plus.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/js/bootstrap-select.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.2/moment.min.js"></script>





        <script src="https://cdn.anychart.com/js/8.0.1/anychart-bundle.min.js?d=<?php echo time();?>"></script>
        <script src="https://cdn.anychart.com/releases/8.1.0/js/anychart-base.min.js?d=<?php echo time();?>"></script>
        <script src="https://cdn.anychart.com/releases/8.1.0/js/anychart-stock.min.js?d=<?php echo time();?>"></script>
        <script src="https://cdn.anychart.com/releases/8.1.0/js/anychart-exports.min.js?d=<?php echo time();?>"></script>
        <script src="https://cdn.anychart.com/releases/8.1.0/js/anychart-ui.min.js?d=<?php echo time();?>"></script>
        <script src="https://cdn.anychart.com/csv-data/csco-daily.js?d=<?php echo time();?>"></script>
        <script src="https://cdn.anychart.com/releases/8.1.0/js/anychart-annotations.min.js?d=<?php echo time();?>"></script>

        


<!--         <link rel="stylesheet" href="https://cdn.anychart.com/css/8.0.1/anychart-ui.min.css" /> -->
                
        
        <script src="assets/js/stock_line.js?v=<?php echo time();?>"></script>
        <script type="text/javascript">

                        function set_obj_tmp()
                        {
                            var ipt_avg_1 = document.getElementById('ipt_avg_1').checked;
                            var ipt_avg_2 = document.getElementById('ipt_avg_2').checked;
                            var ipt_avg_3 = document.getElementById('ipt_avg_3').checked;
                            var ipt_avg_4 = document.getElementById('ipt_avg_4').checked;
                            var ipt_avg_5 = document.getElementById('ipt_avg_5').checked;
                            //alert(ipt_avg_1);
                            var obj_setting = {
                                "ipt_avg_1": ipt_avg_1, "ipt_avg_2": ipt_avg_2, "ipt_avg_3": ipt_avg_3,
                                "ipt_avg_4": ipt_avg_4, "ipt_avg_5": ipt_avg_5
                            }
                            var clicent_objset_ipt = JSON.stringify(obj_setting);
                            //  alert(clicent_objset_value);
                            // var clicent_objset = 'clicent_objset_ipt';
                            // _setCookie(clicent_objset, clicent_objset_ipt, 365);
                        }


                        function set_obj()
                        {
                            var ema_p1 = document.getElementById('ema_p1').value;
                            var mma_p1 = document.getElementById('mma_p1').value;
                            var sma_p1 = document.getElementById('sma_p1').value;
                            var arron_p1 = document.getElementById('arron_p1').value;
                            var kdj_p1 = document.getElementById('kdj_p1').value;
                            var kdj_p2 = document.getElementById('kdj_p2').value;
                            var kdj_p3 = document.getElementById('kdj_p3').value;
                            var macd_p1 = document.getElementById('macd_p1').value;
                            var macd_p2 = document.getElementById('macd_p2').value;
                            var macd_p3 = document.getElementById('macd_p3').value;
                            var roc_p1 = document.getElementById('roc_p1').value;
                            var rsi_p1 = document.getElementById('rsi_p1').value;
                            var rsi_p1 = document.getElementById('rsi_p2').value;
                            var rsi_p1 = document.getElementById('rsi_p3').value;
                            var stoch_p1 = document.getElementById('stoch_p1').value;
                            var stoch_p2 = document.getElementById('stoch_p2').value;
                            var stoch_p3 = document.getElementById('stoch_p3').value;

                            var obj_setting = {
                                "ema_p1": ema_p1, "mma_p1": mma_p1, "sma_p1": sma_p1,
                                "arron_p1": arron_p1, "kdj_p1": kdj_p1, "kdj_p2": kdj_p2, "kdj_p3": kdj_p3,
                                "macd_p1": macd_p1, "macd_p2": macd_p2, "macd_p3": macd_p3, "roc_p1": roc_p1,
                                "rsi_p1": rsi_p1, "rsi_p2": rsi_p2,"rsi_p3": rsi_p3,"stoch_p1": stoch_p1, "stoch_p2": stoch_p2, "stoch_p3": stoch_p3
                            }
                            var clicent_objset_value = JSON.stringify(obj_setting);
                            //  alert(clicent_objset_value);
                            var clicent_objset = 'clicent_objset';
                            // _setCookie(clicent_objset, clicent_objset_value, 365);
                        }
                        
           var clicent_objset_ipt = 'clicent_objset_ipt';
            // var clicent_objset_ipt = _getCookie(clicent_objset_ipt);
            clicent_objset_ipt = JSON.stringify(clicent_objset_ipt);
           // alert(clicent_objset_ipt.ipt_avg_1);
            if (clicent_objset_ipt.ipt_avg_1 == true)
            {
           //     alert(1111);
                $("#ipt_avg_1").prop("checked", true);
            }
            if (clicent_objset_ipt.ipt_avg_2 == true)
            {
                $("#ipt_avg_2").prop("checked", true);
            }
             if (clicent_objset_ipt.ipt_avg_3 == true)
            {
                $("#ipt_avg_3").prop("checked", true);
            }
            if (clicent_objset_ipt.ipt_avg_4 == true)
            {
                $("#ipt_avg_4").prop("checked", true);
            }
            if (clicent_objset_ipt.ipt_avg_5 == true)
            {
                $("#ipt_avg_5").prop("checked", true);
            }
                        
                        
        </script>
    </body>
</html>