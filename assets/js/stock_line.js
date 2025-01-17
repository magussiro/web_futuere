var data_stage;
var obj_setting = {
    "ema_p1": 20, "mma_p1": 10, "sma_p1": 20,
    "arron_p1": 25, "kdj_p1": 10, "kdj_p2": 10, "kdj_p3": 20,
    "macd_p1": 12, "macd_p2": 6, "macd_p3": 9, "roc_p1": 14,
    "rsi_p1": 6, "rsi_p2": 12, "rsi_p3": 24, "stoch_p1": 10, "stoch_p2": 10, "stoch_p3": 20
}
var timerInterval = 40000;		//即時更新秒數
var timer_update;				//即時更新物件
var default_obj_set = obj_setting;
var now_pcode;
var tooltip1 = null;

var chart;
var annotationsColor;
var clicent_objset = 'clicent_objset';
// var clicent_objset = _getCookie(clicent_objset);
var time_tmp;
////alert(clicent_objset);
////console.log(default_obj_set); 

//if (!time_tmp)
//{
//    console.log('time_tmp'+time_tmp);
//    if (time_tmp < 60)
//    {
//        time_tmp = (60 - time_tmp) + time_tmp;
//        timerInterval = time_tmp+ '00';
//        consoloe.log(timerInterval);
//    }
//}

if (clicent_objset.length != 0)
{
    //  alert(1111);
    default_obj_set = [];
    // clicent_objset = JSON.stringify(clicent_objset);
    var default_obj_set = {
        "ema_p1": parseInt(clicent_objset.ema_p1), "mma_p1": parseInt(clicent_objset.mma_p1), "sma_p1": parseInt(clicent_objset.sma_p1),
        "arron_p1": parseInt(clicent_objset.arron_p1), "kdj_p1": parseInt(clicent_objset.kdj_p1), "kdj_p2": parseInt(clicent_objset.kdj_p2), "kdj_p3": parseInt(clicent_objset.kdj_p3),
        "macd_p1": parseInt(clicent_objset.macd_p1), "macd_p2": parseInt(clicent_objset.macd_p2), "macd_p3": parseInt(clicent_objset.macd_p3), "roc_p1": parseInt(clicent_objset.roc_p1),
        "rsi_p1": parseInt(clicent_objset.rsi_p1), "rsi_p2": parseInt(clicent_objset.rsi_p2), "rsi_p3": parseInt(clicent_objset.rsi_p3), "stoch_p1": parseInt(clicent_objset.stoch_p1), "stoch_p2": parseInt(clicent_objset.stoch_p2), "stoch_p3": parseInt(clicent_objset.stoch_p3)
    }


    var obj_setting = default_obj_set;

}
//console.log(default_obj_set); 

var clicent_objset_ipt = 'clicent_objset_ipt';
// var clicent_objset_ipt = _getCookie(clicent_objset_ipt);

if (clicent_objset_ipt.length != 0)
{
    // clicent_objset_ipt = JSON.parse(clicent_objset_ipt);

    if (clicent_objset_ipt.ipt_avg_1 == true)
    {
        setChart(1);
    }
    if (clicent_objset_ipt.ipt_avg_2 == true)
    {
        setChart(2);
    }
    if (clicent_objset_ipt.ipt_avg_3 == true)
    {
        setChart(3);
    }
    if (clicent_objset_ipt.ipt_avg_4 == true)
    {
        setChart(4);
    }
    if (clicent_objset_ipt.ipt_avg_5 == true)
    {
        setChart(5);
    }
}




$.UrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

$(function () {
    // immediate_load('TX');
    //setInterval(trendLoad, timerInterval);
    $('select.choose-drawing-tools').on('change', changeAnnotations);
    $('select.choose-marker').on('change', changeAnnotations);
    $('[data-annotation-type]').on('click', changeAnnotations);

    $("#btn_printer").click(function () {
        $("#draw_tool").fadeToggle();
    });
    $("#btn_close_drawer").click(function () {
        $("#draw_tool").fadeOut();
    });

    $("#btn_tech_img").click(function () {
        $("#view_obj_list").css("display", "flex");
        $("body").addClass('noscroll');
    });
    $("#btn_close_tech").click(function () {
        $("#view_obj_list").fadeOut();
        $("body").removeClass('noscroll');
    });

    window.localStorage.clear();
    var locale = "zh-tw";

    anychart.format.outputLocale("zh-tw");

    chart = anychart.stock();
    chart.credits().text("");

    /* 繪圖工具 */
    chart.listen("annotationDrawingFinish", onAnnotationDrawingFinish);
    chart.listen("annotationSelect", onAnnotationSelect);
    chart.listen("annotationUnSelect", function () {
        $('.color-picker[data-color="fill"]').removeAttr('disabled');
        $('.select-marker-size').removeAttr('disabled');
        $('.drawing-tools-solo').find('.bootstrap-select').each(function () {
            $(this).removeClass('open');
        })
    });


    function changeAnnotations() {
        var $that = $(this);

        setTimeout(function () {
            var $target = $that;
            var active = $target.hasClass('active');
            var $markerSize = $('#select-marker-size');
            var markerSize = $markerSize.val();

            if (active) {
                chart.annotations().cancelDrawing();
                setToolbarButtonActive(null);
            } else {
                var type = $target.data().annotationType || $target.find('option:selected').data().annotationType;

                if (!$target.data().annotationType) {
                    var markerType = $target.find('option:selected').data().markerType;
                }

                setToolbarButtonActive(type, markerType);

                if (type) {

                    if (!$target.data().annotationType) {
                        var markerAnchor = $target.find('option:selected').data().markerAnchor;
                    }

                    var drawingSettings = {
                        type: type,
                        size: markerSize,
                        color: annotationsColor,
                        markerType: markerType,
                        anchor: markerAnchor
                    };
                    chart.annotations().startDrawing(drawingSettings);
                }
            }

            var annotation = chart.annotations().getSelectedAnnotation();

            if (annotation.fill === undefined) {
                $('.color-picker[data-color="fill"]').attr('disabled', 'disabled');
            } else {
                $('.color-picker[data-color="fill"]').removeAttr('disabled');
            }

            $target.val('');
        }, 1);
    }
    $('.btn[data-action-type]').click(function (evt) {
        var annotation = chart.annotations().getSelectedAnnotation();
        var $target = $(evt.currentTarget);
        $target.blur();
        var type = $target.attr('data-action-type');

        switch (type) {
            case 'removeAllAnnotations':
                removeAllAnnotation();
                break;
            case 'removeSelectedAnnotation' :
                removeSelectedAnnotation();
                break;
            case 'unSelectedAnnotation' :
                chart.annotations().unselect(annotation).cancelDrawing();
                setToolbarButtonActive(null);
                break;
        }

    });

    $('#select-stroke-settings').on('change', function () {
        var strokeWidth;
        var strokeType;
        var STROKE_WIDTH = 1;

        if ($(this).val()) {
            switch ($(this).val()[0]) {
                case '6' :
                case '7' :
                case '8' :
                    strokeType = $(this).val()[0];
                    strokeWidth = $(this).val()[1] || STROKE_WIDTH;
                    break;
                default :
                    strokeType = $(this).val()[1];
                    strokeWidth = $(this).val()[0];
                    break;
            }
            updatePropertiesBySelectedAnnotation(strokeWidth, strokeType);
        }
    });

    $('#select-marker-size').on('change', function () {
        var annotation = chart.annotations().getSelectedAnnotation();

        if (annotation == null)
            return;

        if (annotation.type === 'marker') {
            annotation.size($(this).val());
        }
    });


    $('html').keyup(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            removeSelectedAnnotation();
        }
    })

    $("#data_view").draggable({containment: "parent"});
    $("#btnClose").click(function () {
        $("#data_view").fadeOut();
    });

    //K線圖即時更新
    $('#update_realtime').change(function () {
        if ($(this).is(':checked'))
        {
            //console.log(timerInterval);
            // timer_update = set_timeout('genChart');
            timer_update = setInterval(genChart, timerInterval);
        } else
        {
            clearInterval(timer_update);
        }



    });

    //nav tab change
    $("#tabNav a").click(function (e) {
        var view = $(this).attr("href");
        $("#tabNav a").removeClass("on");
        $(this).addClass('on');
        $(view).show().siblings().hide();
        if (view == "#showk") {
            clearInterval(timer_update);
            chartScrollerFrom = null;
            chartScrollerTo = null;
            // timer_update = set_timeout('dataReload');
            timer_update = setInterval(dataReload, timerInterval);
            dataReload();

        } else {
            clearInterval(timer_update);
            trendScrollerFrom = null;
            trendScrollerTo = null;
            //timer_update = set_timeout('trendLoad');
            timer_update = setInterval(trendLoad, timerInterval);
            trendLoad();
        }
        e.preventDefault();
    });

    //K線圖相關參數 click 效果
    $(".kline_timer").on("click", function (e) {
        $(".kline_timer").removeClass("on");
        $(this).addClass('on');
        typev = $(this).attr("data-time");
        dataReload();
        e.preventDefault();
    });
    $(".kline_type,.kline_avg").on("click", function (e) {
        if (!dataReload())
            e.preventDefault();
    });

    //走勢圖相關參數

    $("#line_date").datepicker({"dateFormat": "yy-mm-dd"})
            .val(moment(new Date()).format("YYYY-MM-DD"));

    //button for param setting
    $("#btn_setParam").click(function (e) {
        if ($("#update_realtime").is(":checked"))
            alert("請先停止【即時更新】再執行參數設定");
        else
            objSetOpen();

    });

    //參數設定檢查
    $("#btn_param_check").click(function (e) {
        var check_num = true;
        $("#data_setting input").each(function (i, el) {
            if (!$.isNumeric($(this).val()))
                check_num = false;
        });

        if (!check_num) {
            alert("設定值須為數字");
        } else {
            var newVal;
            var i;
            for (var i = 0; i < obj_setting.length; i++)
            {
                newVal = $("#" + i).val();
                newVal = (Number(newVal) > 0) ? newVal : default_obj_set[i];
                obj_setting[i] = newVal;
            }
            pageNotBusy('data_setting');
        }

    });

    //參數設定取消
    $("#btn_param_cancel").click(function (e) {
        pageNotBusy('data_setting');
    });

    $("#form_product").submit(function (e) {
        e.preventDefault();

        var _pcode = $('#product_code').val();
        var url = "chart?product_code=" + _pcode + "&type=0";
        location.replace(url);
    });

    $("#line_kline").change(function (e) {
        $("#form_trend").submit();
    });
    $("#form_trend").submit(function (e) {
        e.preventDefault();
        var date = $("#line_date").val();
        var days = $("#line_days").val();
        if (!$.isNumeric(days))
            alert('日數值錯誤');
        else if (date == '')
            alert('日期錯誤');
        else
            trendLoad();
    });

    $("#tabNav a:eq(0),#k_line_timer a:eq(0)").addClass('on');
    $("#showk").show();

    var selType = $.UrlParam("type");
    $("#tabNav a").eq(selType).click();

});

//Loading UI Block
function pageOnBusy() {
    //$("#tab_loading").css("display","flex");
    //$("body").addClass('noscroll');
}

//Param UI Block
function objSetOpen() {
    var i;
    for (var i = 0; i < obj_setting.length; i++)
        $("#" + i).val(obj_setting[i]);
    $("#data_setting").css("display", "flex");
    $("body").addClass('noscroll');
}

//remove UI Block
function pageNotBusy(tar) {
    $("#" + tar).fadeOut();
    $("body").removeClass('noscroll');
}

var date_start, date_end;
var result_arr = [];
var json_arr = {};
var result_high = [];	//開低收高
var result_flat = [];	//開收持平
var result_low = [];	//開高收低
var typev = '1';
var chart1 = null;

function getUrlStr()
{
    var _typev = typev;
    var pd_code = $('#product_code').val();

    if (_typev === 'mline')
    {
        _typev = 'm1';
        return 'chart/datalist?chart_type=line&product_code='
                + pd_code + '&type=' + _typev.replace('m', '');
    } else
    {
        return 'chart/datalist?product_code='
                + pd_code + '&type=' + _typev.replace('m', '');
    }
}

function dataReload() {
    //if($("#tech_list input:checked").length>5){
    //	alert('最多僅能選擇5個指標');
    //	return false;
    //}else{
    //url = getUrlStr();
    var searchDate;
    var searchDays;

//    var dataUrl = getUrlStr() + '&dt_time=' + searchDate + '&ed_time=' + searchDays;
    var dataUrl = getUrlStr();
    json_arr_load(dataUrl, 1);
    return true;
    //}
}
var chartScrollerFrom, chartScrollerTo, trendScrollerFrom, trendScrollerTo;
function trendLoad()
{
    var searchDate = $("#line_date").val();
    var searchDays = $("#line_days").val();
    typev = "mline";
    var dataUrl = getUrlStr() + '&dt=' + searchDate + '&days=' + searchDays;
    json_arr_load(dataUrl, 2);
}


function immediate_load(code) {
    var url = 'chart/immediate_load?code=' + code;
    $.ajax({
        url: url, timeout: 50000, beforeSend: pageOnBusy, error: function () {
        },
        success: function (res) {
            //  console.log(res);
            try {
                var immediate = JSON.parse(res);
                //該值為產品當下現值
                var immediate_date = immediate[code];

            } catch (err) {
                console.log(err);
            }

        }
    });
}



function json_arr_load(url, nextStep) {
    $.ajax({
        url: url, timeout: 10000, beforeSend: pageOnBusy, error: function () {
            pageNotBusy('tab_loading');
        },
        success: function (res) {
            // var list = JSON.parse(res);
            //console.log(list);
            try {
                var list = JSON.parse(res);
                //timerInterval = list.datetime;
                // console.log('timerInterval' + timerInterval);
//                if (timerInterval < 60)
//                {
//                    timerInterval = (60 - timerInterval);
//                    timerInterval = timerInterval * 100;
//                    console.log(timerInterval);
//                }

                // console.log(list);
                //var list_tmp = JSON.parse(res);
                //var list = JSON.stringify(list_tmp);
                var list = list.priceData;
                //console.log(list);
                //list = JSON.parse(list);
                if (list.length > 0)
                {
                    var size = list.length;
                    // console.log(size);
                    result_arr = [];
                    result_high = [];
                    result_flat = [];
                    result_low = [];
                    json_arr = {};

                    date_start = list[size - 1].create_date;
                    date_end = list[0].create_date;

                    //console.log(date_start);
                    //console.log(date_end);
                    var j;
                    for (var j = 0; j < list.length; j++) {
                        if (list[j] != null)
                        {
                            var j_obj = list[j];
                            //   console.log(j_obj);
                            if (j_obj.create_date !== null)
                            {
                                var dt = j_obj.ti;
                                if (dt.split(' ').length > 1)
                                    dt = j_obj.ti.split(' ')[0] + ' ' + j_obj.ti.split(' ')[1] + ' UTC';
                                else
                                    dt = j_obj.ti;

                                var insert_Obj = {
                                    x: dt, amount: j_obj.t,
                                    high: j_obj.h, low: j_obj.l,
                                    open: j_obj.n, close: j_obj.c
                                }

                                result_arr.push(insert_Obj);

                                var obj_key = moment(j_obj.ti).format("YYYY-MM-DD HH:mm");
                                json_arr[obj_key] = insert_Obj;

                                if (j_obj.n < j_obj.c)
                                    result_high.push(insert_Obj);

                                else if (j_obj.n == j_obj.c)
                                    result_flat.push(insert_Obj);

                                else
                                    result_low.push(insert_Obj);

                            }
                        }
                    }
                    result_arr = result_arr.sort(function (a, b) {
                        return (moment(a.x) - moment(b.x));
                    })
                    result_high = result_high.sort(function (a, b) {
                        return (moment(a.x) - moment(b.x));
                    })
                    result_flat = result_flat.sort(function (a, b) {
                        return (moment(a.x) - moment(b.x));
                    })
                    result_low = result_low.sort(function (a, b) {
                        return (moment(a.x) - moment(b.x));
                    })

                    if (nextStep == 1)
                        genChart();
                    else
                        genTrend();
                } else {
                    var view_tab = (nextStep == 1) ? "printer_1" : "printer_2";
                    $("#" + view_tab).html('<p style="text-align:center;">無資料顯示</p>');
                    pageNotBusy('tab_loading');
                }
            } catch (err) {
                console.log(err);
            }

        }
    });
}


function genTrend()
{
    //走勢圖
    $("#printer_2").empty();

    var range_a = null;
    var range_b = null;

    if (chart1 !== null)
    {
        range_a = chart1.getSelectedRange().firstSelected;
        range_b = chart1.getSelectedRange().lastSelected;
        chart1.dispose();
        chart1 = null;
    }

    var dataTable = anychart.data.table('x').addData(result_arr);

    var mapping_line = dataTable.mapAs({'value': 'open'});
    var mapping_line2 = dataTable.mapAs({'value': 'high'});
    var mapping_line3 = dataTable.mapAs({'value': 'low'});
    var mapping_line4 = dataTable.mapAs({'value': 'close'});
    var mapping_column = dataTable.mapAs({'value': 'amount'});
    //console.log(mapping_line);
    //console.log(mapping_column);

    trend_chart = anychart.stock();
    trend_chart.credits().text("理財教學");

    var background = trend_chart.background();
    background.fill('#000 0.3');

    var plot_line = trend_chart.plot(0);  //走勢圖
    var plot_line1 = trend_chart.plot(1); //量圖
    plot_line.height('70%');
    plot_line1.height('30%');
    //var plot_column = trend_chart.plot(1);


    //走勢圖區
    var plot_obj_1 = plot_line.line(mapping_line);
    plot_obj_1.name("開盤價");
    plot_obj_1.stroke('2px #ef6c00');

    trend_chart.plot(0).xAxis().ticks(true).minorTicks(true);
    trend_chart.plot(0).yAxis(0).orientation('right');
    trend_chart.plot(0).yAxis(1).orientation('left');

    //特殊線圖
    // plot.priceIndicator(0);

    //最高最低

    var last_series = trend_chart.plot(0).line(mapping_line4);

    var currentGroupUnit = null;
    var currentGroupCount = null;
    var controller = trend_chart.plot(0).annotations();
  
    createLabels();

      // set event listener on scrolling
      trend_chart.scroller().listen("scrollerchange", function () {
        

          
          createLabels();
        
      });
  
    function createLabels() {
        // update variables
        
        currentGroupUnit = trend_chart.grouping().getCurrentDataInterval().unit;
        currentGroupCount = trend_chart.grouping().getCurrentDataInterval().count;
          
        var minMaxObj = getMinMax(currentGroupUnit,currentGroupCount);
        var controller = trend_chart.plot(0).annotations();
        controller.removeAllAnnotations();


        //create a Label annotation
        var controller = trend_chart.plot(0).annotations();
        var controller = trend_chart.plot(0).annotations();
        controller.label({
         xAnchor: minMaxObj.keyMin,
         valueAnchor: minMaxObj.minVal,
          text: minMaxObj.minVal,
          anchor: 'left-bottom'
        });
        
        controller.label({
         xAnchor: minMaxObj.keyMax,
         valueAnchor: minMaxObj.maxVal,
          text: minMaxObj.maxVal,
          anchor: 'left-bottom'
        });
    }

    function getMinMax(currentGroupUnit,currentGroupCount) {
        // get start date and end date
        var xScale = trend_chart.xScale();
        var max = xScale.getMaximum();
        var min = xScale.getMinimum();

        var selectable = mapping_line4.createSelectable();
        // select certain dates range
        selectable.select(min, max, currentGroupUnit,currentGroupCount);
        var i = 0;

        // get iterator 
        var iterator = selectable.getIterator();
        iterator.advance();
        var maxVal = iterator.get('value');
        var minVal = iterator.get('value');
        var keyMin = iterator.getKey();
        var keyMax = iterator.getKey();

        // advance iterator to the next position
        while (iterator.advance()) {
        //get max and min value in current grouping
         if(maxVal < iterator.get('value')) {
            maxVal = iterator.get('value');
           keyMax = iterator.getKey();
            } 
          
          if(minVal > iterator.get('value')) {
             minVal = iterator.get('value');
             keyMin = iterator.getKey();
          }
        }
        
        return {
            minVal: minVal,
            keyMin: keyMin,
            maxVal: maxVal,
            keyMax: keyMax
        };
    }
    //最高最低結束


    //開收
    var line_S1 = plot_line.priceIndicator(0);
    line_S1.value('last-visible');
    line_S1.stroke("#f00");
    line_S1.label().background().fill("#f00");
    line_S1.label().fontColor("#fff");

    var line_S2 = plot_line.priceIndicator(1);
    line_S2.value('low');
    line_S2.stroke("#003C9D");
    line_S2.label().background().fill("#003C9D");
    line_S2.label().fontColor("#fff");



    var line_S3 = plot_line.priceIndicator(2);
    line_S3.value('series-end');
    line_S3.stroke("#EE7700");
    line_S3.label().background().fill("#EE7700");
    line_S3.label().fontColor("#fff");


    var line_S4 = plot_line.priceIndicator(3);
    line_S4.value('first-visible');
    line_S4.stroke("#CC00CC");
    line_S4.label().background().fill("#CC00CC");
    line_S4.label().fontColor("#fff");


    // var indicator1 = plot_line.priceIndicator(1);
    // indicator1.value('last-visible');
    // indicator1.fallingStroke('#EF9A9A');
    // indicator1.fallingLabel({background: '#F44336'});
    // indicator1.risingStroke('#4CAF50');
    // indicator1.risingLabel({background: '#A5D6A7'});



    trend_chart.plot(0).xGrid().stroke('Dimgray');
    trend_chart.plot(0).yGrid().enabled(true);
    // trend_chart.plot(0).yGrid().stroke('Dimgray');
    trend_chart.plot(0).xMinorGrid().enabled(true);
    trend_chart.plot(0).xMinorGrid().stroke('Dimgray');
    // trend_chart.plot(0).yMinorGrid().enabled(true);
    // trend_chart.plot(0).yMinorGrid("#BDBDBD", 2, "5 2 5", "round");
    // dashed horizontal grid
    // plot_line.yGrid().enabled(true);
    // plot_line.yGrid().stroke({dash: "3 5"});
    // vertical minor grid bound to x scale
    // plot_line.xMinorGrid().enabled(true);
    // plot_line.xMinorGrid().stroke({dash: "3 5"});




    if ($('#line_kline').is(":checked")) // 在走勢圖上
    {

        var mapas_k = {'x': 'x', 'open': 'open', 'high': 'high', 'low': 'low', 'close': 'close'};

        // var series = chart.candlestick(result_arr);
        // series.pointWidth(20);

        var dataHigh = anychart.data.table('x').addData(result_high);
        var dataFlat = anychart.data.table('x').addData(result_flat);
        var dataLow = anychart.data.table('x').addData(result_low);


        var map_k_h = dataHigh.mapAs(mapas_k);
        var map_k_f = dataFlat.mapAs(mapas_k);
        var map_k_l = dataLow.mapAs(mapas_k);

        var seriesk_h = plot_line.candlestick(map_k_h).name(now_pcode);
        var seriesk_f = plot_line.candlestick(map_k_f).name(now_pcode);
        var seriesk_l = plot_line.candlestick(map_k_l).name(now_pcode);

        seriesk_h.risingStroke("#ef6c00");
        seriesk_h.risingFill("#ef6c00");

        seriesk_f.fallingStroke("#fff");
        seriesk_f.fallingFill("#fff");

        seriesk_l.fallingStroke("#00ff3c");
        seriesk_l.fallingFill("#00ff3c");



    }


    //量圖區
    var plot_obj_2 = plot_line1.column(mapping_column);
    plot_obj_2.name("成交量");
    plot_obj_2.stroke('2px #64b5f6');
    plot_obj_2.fill('#64b5f6');

    plot_line1.yAxis(0).orientation('right');
    plot_line1.yAxis(1).orientation('left');


    // //mapping_all
    // mapping = dataTable.mapAs({'open': 1, 'high': 2,'low': 3,'close':4, 'value': 5});
    // // add two series
    // ohlcSeries = trend_chart.plot(0).ohlc(mapping);

    // // add indicator to OHLC series
    // var indicator1 = trend_chart.plot(0).priceIndicator();
    // indicator1.value('last-visible');
    // indicator1.fallingStroke('#EF9A9A');
    // indicator1.fallingLabel({background: '#F44336'});
    // indicator1.risingStroke('#4CAF50');
    // indicator1.risingLabel({background: '#A5D6A7'});












    // var indicator1 = plot_line.priceIndicator();
    // indicator1.value('last-visible');
    // indicator1.fallingStroke('#EF9A9A');
    // indicator1.fallingLabel({background: '#F44336'});
    // indicator1.risingStroke('#4CAF50');
    // indicator1.risingLabel({background: '#A5D6A7'});

    // var last_new_price = trend_chart.plot(0).priceIndicator(0);//開
    // var last_new_price1 = trend_chart.plot(0).priceIndicator(1);//高
    // var last_new_price2 = trend_chart.plot(0).priceIndicator(2);//低
    // var last_new_price3 = trend_chart.plot(0).priceIndicator(3);//收

    // last_new_price.value('open');
    // last_new_price.stroke("#f00");
    // last_new_price.label().background().fill("#f00");
    // last_new_price.label().fontColor("#fff");

    // trend_chart.plot(0).priceIndicator(1,{axis: trend_chart.plot(0).yAxis(1), value: 'high'});//高

    // // last_new_price1.value('high');
    // last_new_price1.stroke("#0000c6");
    // last_new_price1.label().background().fill("#0000c6");
    // last_new_price1.label().fontColor("#fff");

    // last_new_price2.value('low');
    // last_new_price2.stroke("#ffff37");
    // last_new_price2.label().background().fill("#ffff37");
    // last_new_price2.label().fontColor("#fff");

    // last_new_price3.value('close');
    // last_new_price3.stroke("#ad5a5a");
    // last_new_price3.label().background().fill("#ad5a5a");
    // last_new_price3.label().fontColor("#fff");

    // var extraYScale = anychart.scales.linear();
    // var extraYAxis = plot_line.yAxis(0);
    // extraYAxis.orientation("right");
    // plot_line.yAxis(1).orientation("left");
    // extraYAxis.scale(extraYScale);
    // plot_obj_2.yScale(extraYScale);


    //定位小圖
    trend_chart.tooltip().titleFormat(function () {

        return window['anychart']['format']['dateTime'](this.hoveredDate, 'yyyy-MM-dd HH:mm');
    });

    var trend_tooltip = trend_chart.tooltip().useHtml(true);
    trend_tooltip.unionFormat(function () {
        return tooltip_format(this.points);
    });

    chart1 = trend_chart;




    trend_chart.padding(10, 50, 20, 50);
    trend_chart.container('printer_2');

    // //移動捲軸前
    // trend_chart.listen("selectedrangechangestart", function (e) {
    //     clearInterval(timer_update);
    // });

    // //移動捲軸後
    // trend_chart.listen("selectedrangechangefinish", function (e) {
    //     trendScrollerFrom = new Date(e.firstSelected);
    //     trendScrollerTo = new Date(e.lastSelected);

    //     // set_timeout(genTrend, timerInterval);
    //     timer_update = set_timeout('genTrend');
    //     genTrend();
    // });

    // //設定顯示區域
    // if (result_arr.length > 0) {
    //     var checkStartIdx = result_arr.length > 70 ? result_arr.length - 70 : 0;
    //     var rangeStartIdx = result_arr.length > 70 ? result_arr.length - 70 : 0;
    //     var rangeEndIdx = result_arr.length - 1;

    //     var checkFrom = new Date(result_arr[checkStartIdx]['x']);
    //     var rangeFrom = new Date(result_arr[rangeStartIdx]['x']);
    //     var rangeTo = new Date(result_arr[rangeEndIdx]['x']);

    //     //檢查顯示區域是否要更新
    //     if (trendScrollerFrom) {
    //         if (checkFrom >= trendScrollerFrom) {
    //             rangeFrom = trendScrollerFrom;
    //             rangeTo = trendScrollerTo;
    //         }
    //     }

    //     trend_chart.selectRange(rangeFrom, rangeTo);
    // }






    // trend_chart.scroller().line(mapping_line);
    //即時線 END



    // trend_chart.scroller().allowRangeChange(true).xAxis(false);
    trend_chart.draw();

    //pageNotBusy('tab_loading');
    /*
     rangePicker = anychart.ui.rangePicker();
     rangePicker.render(chart);
     rangeSelector = anychart.ui.rangeSelector();
     rangeSelector.render(chart);
     */
}

function set_timeout(group)
{
    //console.log(group);
    //console.log(timerInterval);

    if (group == 'genTrend')
    {
        // console.log(444);
        var value = setInterval(genTrend, timerInterval);
    }
    if (group == 'trendLoad')
    {
        // console.log(333);
        var value = setInterval(trendLoad, timerInterval);
    }
    if (group == 'dataReload')
    {
        // console.log(222);
        var value = setInterval(dataReload, timerInterval);
    }
    if (group == 'genChart')
    {
        // console.log(111);
        var value = setInterval(genTrend, timerInterval);
    }
    return value;
}

function tooltip_format(obj) {
    var tooltip_str = "";
    var n = 0;

    for (var n = 0; n < obj.length; n++) {
        // console.log(obj[n]);
        if (obj[n].high) {
            tooltip_str = "開:" + obj[n].open + "<br>高:" + obj[n].high
                    + "<br>低:" + obj[n].low + "<br>收:" + obj[n].close;
        } else if (obj[n].value) {
            var tip_val = parseFloat(obj[n].value).toFixed(3);
            tooltip_str += "<br>" + obj[n].seriesName + ":" + parseFloat(tip_val);
        }
    }
    return tooltip_str;
}


function setChart(type)
{
    $("#printer_1").empty();

    data_stage = anychart.graphics.create("printer_1");

    var dataTable = anychart.data.table('x');

    dataTable.addData(result_arr);

    var dataHigh = anychart.data.table('x').addData(result_high);
    var dataFlat = anychart.data.table('x').addData(result_flat);
    var dataLow = anychart.data.table('x').addData(result_low);

    var map_as_set = {'open': 'open', 'high': 'high', 'low': 'low', 'close': 'close'};

    var mapping = dataTable.mapAs(map_as_set);
    var mapping_h = dataHigh.mapAs(map_as_set);
    var mapping_f = dataFlat.mapAs(map_as_set);
    var mapping_l = dataLow.mapAs(map_as_set);


    chart = anychart.stock();
    chart.credits().text("");

    /* 繪圖工具 */
    // chart.listen("annotationDrawingFinish", onAnnotationDrawingFinish);
    // chart.listen("annotationSelect", onAnnotationSelect);
    // chart.listen("annotationUnSelect", function () {
    //     $('.color-picker[data-color="fill"]').removeAttr('disabled');
    //     $('.select-marker-size').removeAttr('disabled');
    //     $('.drawing-tools-solo').find('.bootstrap-select').each(function () {
    //         $(this).removeClass('open');
    //     })
    // });

    var plot_sid = 0;
    var sel_img_counts = $("#tech_list input:checked").length;

    /* 主要區塊 */
    var plot = chart.plot(0);
    plot.yAxis(0).enabled(true);
    plot.yAxis(0).orientation('right');
    plot.yAxis(1).orientation('left');
    plot.xGrid().enabled(true);
    plot.yGrid().enabled(true);
    plot.xMinorGrid().enabled(true);
    plot.yMinorGrid().enabled(true);

    //主區塊檢查是否高度固定
    if (sel_img_counts > 0) {
        var plot_height = 70;
        plot.height(plot_height + '%');
    }

    var background = chart.background();
    background.fill('#000');

    var drawPrint = plot.annotations();

    //點選後出現浮動視窗的事件
    plot.listen("click", function (events) {
        var click_date = moment(this.Wa.Xa.aa).format("YYYY-MM-DD HH:mm");
        var data_obj = json_arr[click_date];

        $("#data_view_time").html(click_date);
        var k;
        for (var k = 0; k < data_obj.length; k++)
        {
            $("#data_view_" + k).html(data_obj[k]);
        }

        $("#data_view").fadeIn();
    });

    // // K線
    // var series1 = plot.candlestick(mapping_h).name(now_pcode);
    // var series2 = plot.candlestick(mapping_f).name(now_pcode);
    // var series3 = plot.candlestick(mapping_l).name(now_pcode);

    // 	series1.risingStroke("#ef6c00");
    // 	series1.risingFill("#ef6c00");
    // 	series2.fallingStroke("#fff");
    // 	series2.fallingFill("#fff");
    // 	series3.fallingStroke("#00ff3c");
    // 	series3.fallingFill("#00ff3c");

    /* 平均線 */
    if (type == 1)
    {
        if ($("#ipt_avg_1").is(":checked")) {
            var map_avg1 = dataTable.mapAs({"value": "close"});
            var series_avg1 = plot.sma(map_avg1, 5).series();
            series_avg1.name('平均線(5)');
            series_avg1.stroke('#fff');
        }
    }

    if (type == 2)
    {
        if ($("#ipt_avg_2").is(":checked")) {
            var map_avg2 = dataTable.mapAs({"value": "close"});
            var series_avg2 = plot.sma(map_avg2, 10).series();
            series_avg2.name('平均線(10)');
            series_avg2.stroke('#ff0');
        }
    }
    if (type == 3)
    {

        if ($("#ipt_avg_3").is(":checked")) {
            var map_avg3 = dataTable.mapAs({"value": "close"});
            var series_avg3 = plot.sma(map_avg3, 20).series();
            series_avg3.name('平均線(20)');
            series_avg3.stroke('#f00');
        }
    }
    if (type == 4)
    {
        if ($("#ipt_avg_4").is(":checked")) {
            var map_avg4 = dataTable.mapAs({"value": "close"});
            var series_avg4 = plot.sma(map_avg4, 30).series();
            series_avg4.name('平均線(30)');
            series_avg4.stroke('#0f0');
        }
    }
    if (type == 5)
    {
        if ($("#ipt_avg_5").is(":checked")) {
            var map_avg5 = dataTable.mapAs({"value": "close"});
            var series_avg5 = plot.sma(map_avg5, 60).series();
            series_avg5.name('平均線(60)');
            series_avg5.stroke('#2ea7b3');
        }
    }




    /* 平均線 */

}

function get_value(value_tmp)
{
    //Ｋ線
    $("#printer_1").empty();

    data_stage = anychart.graphics.create("printer_1");

    var dataTable = anychart.data.table('x');
    // console.log(result_arr);
    dataTable.addData(result_arr);
    var dataall = anychart.data.table('x').addData(result_arr);
    var dataHigh = anychart.data.table('x').addData(result_high);
    var dataFlat = anychart.data.table('x').addData(result_flat);
    var dataLow = anychart.data.table('x').addData(result_low);

    var map_as_set = {'open': 'open', 'high': 'high', 'low': 'low', 'close': 'close'};



    var mapping = dataTable.mapAs(map_as_set);
    var mapping_h = dataHigh.mapAs(map_as_set);
    var mapping_f = dataFlat.mapAs(map_as_set);
    var mapping_l = dataLow.mapAs(map_as_set);
    var mapping_line = dataTable.mapAs({'value': 'open'});

    // console.log(result_arr);
    chart = anychart.stock();
    chart.credits().text("理財教學");

    /* 繪圖工具 */
    chart.listen("annotationDrawingFinish", onAnnotationDrawingFinish);
    chart.listen("annotationSelect", onAnnotationSelect);
    chart.listen("annotationUnSelect", function () {
        $('.color-picker[data-color="fill"]').removeAttr('disabled');
        $('.select-marker-size').removeAttr('disabled');
        $('.drawing-tools-solo').find('.bootstrap-select').each(function () {
            $(this).removeClass('open');
        })
    });

    var plot_sid = 0;
    var sel_img_counts = $("#tech_list input:checked").length;

    /* 主要區塊 */
    var plot = chart.plot(0);
    plot.yAxis(0).enabled(true);
    plot.yAxis(0).orientation('right');
    plot.yAxis(1).orientation('left');
    // plot.xGrid().enabled(true);
    // plot.yGrid().enabled(true);
    plot.xGrid().stroke('Dimgray 0.3');
    plot.yGrid().stroke('Dimgray 0.3');
    plot.xMinorGrid().enabled(true);
    plot.xMinorGrid().stroke('Dimgray 0.3');
    plot.yMinorGrid().enabled(true);
    plot.yMinorGrid().stroke('Dimgray 0.3');



//特殊線圖
    // plot.priceIndicator(0);

    //最後一筆
    var line_S1 = plot.priceIndicator(0);
    line_S1.value('last-visible');
    line_S1.stroke("#f00");
    line_S1.label().background().fill("#f00");
    line_S1.label().fontColor("#fff");

    //低
    var line_S2 = plot.priceIndicator(1);
    line_S2.value('low');
    line_S2.stroke("#003C9D");
    line_S2.label().background().fill("#003C9D");
    line_S2.label().fontColor("#fff");



    var line_S3 = plot.priceIndicator(2);
    line_S3.value('series-end');
    line_S3.stroke("#EE7700");
    line_S3.label().background().fill("#EE7700");
    line_S3.label().fontColor("#fff");

    //第一筆
    var line_S4 = plot.priceIndicator(3);
    line_S4.value('first-visible');
    line_S4.stroke("#CC00CC");
    line_S4.label().background().fill("#CC00CC");
    line_S4.label().fontColor("#fff");



    //主區塊檢查是否高度固定
    // if (sel_img_counts > 0) {
    var plot_height = 70;
    plot.height(plot_height + '%');
    // }


    var background = chart.background();
    background.fill('#000');
    // chart.yScale().ticks().interval(10);

    var drawPrint = plot.annotations();

    //點選後出現浮動視窗的事件
    plot.listen("click", function (events) {
        var click_date = moment(this.Wa.Xa.aa).format("YYYY-MM-DD HH:mm");
        var data_obj = json_arr[click_date];

        $("#data_view_time").html(click_date);
        var k;
        for (var k = 0; k < data_obj.length; k++)
        {
            $("#data_view_" + k).html(data_obj[k]);
        }

        $("#data_view").fadeIn();
    });




    /* 平均線 */
    if ($("#ipt_avg_1").is(":checked")) {
        var map_avg1 = dataTable.mapAs({"value": "close"});
        var series_avg1 = plot.sma(map_avg1, 5).series();
        series_avg1.name('平均線(5)');
        series_avg1.stroke('#fff');
    }
    if ($("#ipt_avg_2").is(":checked")) {
        var map_avg2 = dataTable.mapAs({"value": "close"});
        var series_avg2 = plot.sma(map_avg2, 10).series();
        series_avg2.name('平均線(10)');
        series_avg2.stroke('#ff0');
    }
    if ($("#ipt_avg_3").is(":checked")) {
        var map_avg3 = dataTable.mapAs({"value": "close"});
        var series_avg3 = plot.sma(map_avg3, 20).series();
        series_avg3.name('平均線(20)');
        series_avg3.stroke('#f00');
    }
    if ($("#ipt_avg_4").is(":checked")) {
        var map_avg4 = dataTable.mapAs({"value": "close"});
        var series_avg4 = plot.sma(map_avg4, 30).series();
        series_avg4.name('平均線(30)');
        series_avg4.stroke('#0f0');
    }
    if ($("#ipt_avg_5").is(":checked")) {
        var map_avg5 = dataTable.mapAs({"value": "close"});
        var series_avg5 = plot.sma(map_avg5, 60).series();
        series_avg5.name('平均線(60)');
        series_avg5.stroke('#2ea7b3');
    }
    /* 平均線end */








    /* 技術指標 Start */
    /* 主圖 */


    //主K線

    // var series_ohlc = plot.ohlc(mapping).name(now_pcode);
    var series0 = plot.candlestick(mapping).name(now_pcode);
    var series1 = plot.candlestick(mapping_h).name(now_pcode);
    var series2 = plot.candlestick(mapping_f).name(now_pcode);
    var series3 = plot.candlestick(mapping_l).name(now_pcode);

    // set the interactivity mode

    series1.risingStroke("#ef6c00");
    series1.risingFill("#ef6c00");

    series2.fallingStroke("#fff");
    series2.fallingFill("#fff");

    series3.fallingStroke("#00ff3c");
    series3.fallingFill("#00ff3c");


    // AMA
    if ($("#ipt_AMA").is(":checked"))
    {
        //plot_sid++;
        //var plot_ama = chart.plot(plot_sid);
        var map_ama = dataTable.mapAs({"value": "close"});
        var series_ama = plot.ama(map_ama).series();
        series_ama.name('AMA');
        series_ama.stroke('#bf360c');
    }

    // BBands
    if ($("#ipt_BBands").is(":checked"))
    {
        //plot_sid++;
        //var plot_bbands = chart.plot(plot_sid);
        var map_bbands = dataTable.mapAs({"value": "close"});
        var series_bbands = plot.bbands(map_bbands);
    }

    // BBandsB 乖離
    if ($("#ipt_BBandsB").is(":checked"))
    {
        //plot_sid++;
        //var plot_bbandsB = chart.plot(plot_sid);
        var map_bbandsB = dataTable.mapAs({"value": "close"});
        var series_bbandsB = plot.bbandsB(map_bbandsB);
    }

    // BBW
    if ($("#ipt_BBW").is(":checked"))
    {
        //plot_sid++;
        //var plot_bbw = chart.plot(plot_sid);
        var map_bbandsWidth = dataTable.mapAs({"value": "close"});
        var series_bbandsWidth = plot.bbandsWidth(map_bbandsWidth);
    }

    // EMA
    if ($("#ipt_EMA").is(":checked"))
    {
        //plot_sid++;
        //var plot_ema = chart.plot(plot_sid);
        var map_ema = dataTable.mapAs({"value": "close"});
        var series_ema = plot.sma(map_ema, obj_setting.ema_p1).series();
        series_ema.name('EMA');
        series_ema.stroke('#bf360c');

    }

    // MMA
    if ($("#ipt_MMA").is(":checked"))
    {
        //plot_sid++;
        //var plot_mma = chart.plot(plot_sid);
        var map_mma = dataTable.mapAs({"value": "close"});
        var series_mma = plot.mma(map_mma, obj_setting.mma_p1).series();
        series_mma.name('MMA');
        series_mma.stroke('#bf360c');
    }
    /* 主圖 */
    /* 副圖 */
    // ADL
    if ($("#ipt_ADL").is(":checked"))
    {
        plot_sid++;
        var plot_adl = chart.plot(plot_sid);
        var map_adl = dataTable.mapAs({
            "high": "high", "open": "open", "low": "low", "close": "close", "volume": "low"
        });
        var series_adl = plot_adl.adl(map_adl).series();
        series_adl.name('ADL');
    }

    // K線

    if ($("#ipt_kline").is(":checked"))
    {
        //K線
        plot_sid++;
        var plot_k = chart.plot(plot_sid);
        var series0 = plot_k.candlestick(mapping).name(now_pcode);
        var series1 = plot_k.candlestick(mapping_h).name(now_pcode);
        var series2 = plot_k.candlestick(mapping_f).name(now_pcode);
        var series3 = plot_k.candlestick(mapping_l).name(now_pcode);


        series1.risingStroke("#ef6c00");
        series1.risingFill("#ef6c00");
        series2.fallingStroke("#fff");
        series2.fallingFill("#fff");
        series3.fallingStroke("#00ff3c");
        series3.fallingFill("#00ff3c");

    }


    // Aroon
    if ($("#ipt_Aroon").is(":checked"))
    {
        plot_sid++;
        var plot_aroon = chart.plot(plot_sid);
        var map_aroon = dataTable.mapAs({'high': 'open', 'low': 'low'});
        var series_aroon = plot_aroon.aroon(map_aroon, obj_setting.arron_p1);
    }

    // ATR
    if ($("#ipt_ATR").is(":checked"))
    {
        plot_sid++;
        var plot_atr = chart.plot(plot_sid);
        var map_atr = dataTable.mapAs();
        map_atr.addField('open', 'high', "first");
        map_atr.addField('high', 'open', 'max');
        map_atr.addField('low', 'low', 'min');
        map_atr.addField('close', 'close', 'last');
        var series_atr = plot_atr.atr(map_atr).series();
        series_atr.name('ATR');
    }

    // CMF
    if ($("#ipt_CMF").is(":checked"))
    {
        plot_sid++;
        var plot_cmf = chart.plot(plot_sid);
        var map_cmf = dataTable.mapAs({
            "high": "high", "low": "low", "close": "close",
            "volume": "amount", "value": "close"
        });

        var series_cmf = plot_cmf.cmf(map_cmf).series();
        series_cmf.name('CMF');
        series_cmf.stroke("#bf360c");
    }

    // CHO
    if ($("#ipt_CHO").is(":checked"))
    {
        plot_sid++;
        var plot_cho = chart.plot(plot_sid);
        var map_cho = dataTable.mapAs({
            "high": "high", "low": "low", "close": "close",
            "volume": "amount", "value": "close"
        });

        var series_cho = plot_cho.cho(map_cho).series();
        series_cho.name('CHO');
        series_cho.stroke("#bf360c");
    }

    // CCI
    if ($("#ipt_CCI").is(":checked"))
    {
        plot_sid++;
        var plot_cci = chart.plot(plot_sid);
        var map_cci = dataTable.mapAs({
            "high": "high", "low": "low",
            "close": "close", "value": "close"
        });
        var series_cci = plot_cci.cci(map_cci);
    }

    // DMI
    if ($("#ipt_DMI").is(":checked"))
    {
        plot_sid++;
        var plot_dmi = chart.plot(plot_sid);
        var map_dmi = dataTable.mapAs({
            "high": "high", "open": "open", "low": "low",
            "close": "close", "value": "close", "volume": "close"
        });
        var series_dmi = plot_dmi.dmi(map_cci);
        series_dmi.name('DMI');
    }

    // KDJ
    if ($("#ipt_KDJ").is(":checked"))
    {
        plot_sid++;
        var plot_kdj = chart.plot(plot_sid);
        var map_kdj = dataTable.mapAs();
        map_kdj.addField("open", "high", "first");
        map_kdj.addField("high", "open", "max");
        map_kdj.addField("low", "low", "min");
        map_kdj.addField("close", "close", "last");
        map_kdj.addField("value", "amount", "value");

        var series_kdj = plot_kdj.kdj(map_kdj,
                obj_setting.kdj_p1, "EMA",
                obj_setting.kdj_p2, "SMA",
                obj_setting.kdj_p3);
        series_kdj.kSeries().stroke("#bf360c");
        series_kdj.dSeries().stroke("#FFF");
        series_kdj.jSeries().stroke("#FFFF00");
    }

    // MACD
    if ($("#ipt_MACD").is(":checked"))
    {
        plot_sid++;
        var plot_macd = chart.plot(plot_sid);
        var map_macd = dataTable.mapAs({'value': 'close'});
        var series_macd = plot_macd.macd(map_macd,
                obj_setting.macd_p1,
                obj_setting.macd_p2,
                obj_setting.macd_p3);
        series_macd.macdSeries().stroke('#bf360c');
        series_macd.signalSeries().stroke('#ff6d00');


        // // Sets type for histogram series.
        // series_macd.histogramSeries("column");
        //get series object
        var histogramSeries = series_macd.histogramSeries();
        // //set custom drawer to the series
        // var currentRendering = histogramSeries.rendering();
        setupDrawer(histogramSeries);

        //chart.container("container").draw();

        //custom drawer function
        function setupDrawer(series) {
            //add the 2nd shape
            var fallShape = series.rendering().shapes();
            fallShape.push({
                name: 'negative',
                shapeType: 'path',
                fillNames: null,
                strokeNames: ['stroke'],
                isHatchFill: false,
                zIndex: 1
            });

            series.rendering()
                    .shapes(fallShape)
                    .point(function () {
                        if (!this.missing) {

                            // get shapes group
                            var shapes = this.shapes || this.getShapesGroup(this.pointState);
                            // calculate the left value of the x-axis
                            var leftX = this.x - this.pointWidth / 2;
                            // calculate the right value of the x-axis
                            var rightX = leftX + this.pointWidth;
                            // calculate the half of point width
                            var rx = this.pointWidth / 2;

                            //define colors for positive and negative paths
                            shapes['path'].fill('OrangeRed', 0.8);
                            shapes['negative'].fill('DodgerBlue', 0.8);

                            //condition coloring
                            if (+this.getDataValue('value') > 0) {
                                shapes['path']
                                        // draw column with rounded edges
                                        .moveTo(leftX, this.zero)
                                        .lineTo(leftX, this.value - rx)
                                        .lineTo(rightX, this.value - rx)
                                        .lineTo(rightX, this.zero)
                                        // close by connecting the last point with the first straight line
                                        .close();

                            } else {
                                shapes['negative']
                                        // draw column with rounded edges
                                        .moveTo(leftX, this.zero)
                                        .lineTo(leftX, this.value + rx)
                                        .lineTo(rightX, this.value + rx)
                                        .lineTo(rightX, this.zero)
                                        // close by connecting the last point with the first straight line
                                        .close();
                            }
                        }
                    });
        }
    }

    // ROC
    if ($("#ipt_ROC").is(":checked"))
    {
        plot_sid++;
        var plot_roc = chart.plot(plot_sid);
        var map_roc = dataTable.mapAs({'value': 'close'});
        var series_roc = plot_roc.roc(map_roc, obj_setting.roc_p1).series();
        series_roc.name('ROC');
        series_roc.stroke('#bf360c');
    }

    // RSI
    if ($("#ipt_RSI").is(":checked"))
    {
        plot_sid++;
        var plot_rsi = chart.plot(plot_sid);
        var map_rsi = dataTable.mapAs({'value': 'close'});

        var series_rsi = plot_rsi.rsi(map_rsi, obj_setting.rsi_p1).series();
        var series_rsi1 = plot_rsi.rsi(map_rsi, obj_setting.rsi_p2).series();
        var series_rsi2 = plot_rsi.rsi(map_rsi, obj_setting.rsi_p3).series();
        series_rsi.name('RSI1');
        series_rsi1.name('RSI2');
        series_rsi2.name('RSI3');
        series_rsi.stroke('#FFFFFF');
        series_rsi1.stroke('#FFFF33');
        series_rsi2.stroke('#FF3333');
    }

    // Stochastic
    if ($("#ipt_Stochastic").is(":checked"))
    {
        plot_sid++;
        var plot_stoch = chart.plot(plot_sid);
        var map_stochastic = dataTable.mapAs();
        map_stochastic.addField("open", "high", "first");
        map_stochastic.addField("high", "open", "max");
        map_stochastic.addField("low", "low", "min");
        map_stochastic.addField("close", "close", "last");
        map_stochastic.addField("value", "amount", "value");

        var series_stoch = plot_stoch.stochastic(map_stochastic,
                obj_setting.stoch_p1, "EMA",
                obj_setting.stoch_p2, "SMA",
                obj_setting.stoch_p3);
        stoch_k = series_stoch.kSeries();
        stoch_k.stroke("#FFF");
        stoch_d = series_stoch.dSeries();
        stoch_d.stroke("#FFFF00");
    }


    // 量圖
    if ($("#ipt_trend").is(":checked"))
    {
        plot_sid++;
        var plot_trend = chart.plot(plot_sid);
        trend_map = dataall.mapAs({"value": "amount"});
        // var trend_maph = dataHigh.mapAs({"value": "amount"});
        // var trend_mapf = dataFlat.mapAs({"value": "amount"});
        // var trend_mapl = dataLow.mapAs({"value": "amount"});
        var trend_all = plot_trend.column(trend_map).name("成交量");
        // var trend_h = plot_trend.column(trend_maph).name("成交量");
        // var trend_f = plot_trend.column(trend_mapf).name("成交量");
        // var trend_l = plot_trend.column(trend_mapl).name("成交量");
        trend_all.fill("#66b3ff");
        // trend_h.fill("#eb6b61");
        // trend_f.fill("#F0F0F0");
        // trend_l.fill("#00ff3c");




    }
    /* 副圖 */
    /* 技術指標 End */

    chart.plot(0).yAxis(0).enabled(true);
    chart.padding().left(75).right(75);
    chart.plot(0).yAxis(0).orientation('right');
    chart.plot(0).yAxis(1).orientation('left');
    chart.scroller(true);
    chart.scroller().orientation("top");
    // autoHide the scroller
    chart.scroller().autoHide("true");

    // set the fill color
    chart.scroller().fill("#33CC33");

    // set the selected fill color
    chart.scroller().selectedFill("#339966");

    // set the stroke of the bar
    chart.scroller().outlineStroke("#33CC33");
    // set the bar height
    chart.scroller().minHeight(1);
    chart.scroller().maxHeight(10);
    // var xpoint = ss
    // chart.xZoom().setToPointsCount(10);   
    chart.scroller().allowRangeChange(true).xAxis(false);
    chart.container(data_stage);



    //移動捲軸前
    chart.listen("selectedrangechangestart", function (e) {
        clearInterval(timer_update);
    });

    //移動捲軸後
    chart.listen("selectedrangechangefinish", function (e) {
        chartScrollerFrom = new Date(e.firstSelected);
        chartScrollerTo = new Date(e.lastSelected);
        //timer_update = set_timeout('genChart');
        timer_update = setInterval(genChart, timerInterval);
        genChart();
    });

    //設定顯示區域


//    function show_arr(value)
//    {
//        var button_num_change = value;
//        var checkStartIdx = result_arr.length > 30 ? result_arr.length - button_num_change : 0;
//        var rangeStartIdx = result_arr.length > 30 ? result_arr.length - button_num_change : 0;
//        var rangeEndIdx = result_arr.length - 1;
//        var button_num_check = 500 - rangeStartIdx;
//
//        var checkFrom = new Date(result_arr[checkStartIdx]['x']);
//        var rangeFrom = new Date(result_arr[rangeStartIdx]['x']);
//        var rangeTo = new Date(result_arr[rangeEndIdx]['x']);
//
//        document.getElementById("button_num").value = button_num_check;
//
//        //檢查顯示區域是否要更新
//        if (chartScrollerFrom) {
//            if (checkFrom >= chartScrollerFrom) {
//                rangeFrom = chartScrollerFrom;
//                rangeTo = chartScrollerTo;
//            }
//        }
//
//        chart.selectRange(rangeFrom, rangeTo);
//    }


    if (result_arr.length > 0) {

        var button_num_change = value_tmp;
        var checkStartIdx = result_arr.length > 30 ? result_arr.length - button_num_change : 0;
        var rangeStartIdx = result_arr.length > 30 ? result_arr.length - button_num_change : 0;
        var rangeEndIdx = result_arr.length - 1;
        var button_num_check = 500 - rangeStartIdx;

        var checkFrom = new Date(result_arr[checkStartIdx]['x']);
        var rangeFrom = new Date(result_arr[rangeStartIdx]['x']);
        var rangeTo = new Date(result_arr[rangeEndIdx]['x']);

        document.getElementById("button_num").value = button_num_check;

        //檢查顯示區域是否要更新
        if (chartScrollerFrom) {
            if (checkFrom >= chartScrollerFrom) {
                rangeFrom = chartScrollerFrom;
                rangeTo = chartScrollerTo;
            }
        }

        chart.selectRange(rangeFrom, rangeTo);
    }


    chart.tooltip().titleFormat(function () {

        return window['anychart']['format']['dateTime'](this.hoveredDate, 'yyyy-MM-dd HH:mm');
    });

    var chart_tooltip = chart.tooltip().useHtml(true);
    chart_tooltip.unionFormat(function () {
        return tooltip_format(this.points);
    });
    var interactivity = chart.interactivity();

    // Disable use mouse wheel for zooming.
    interactivity.zoomOnMouseWheel(false);
    //implement scrolling with mouse wheel
    var xScale = null;
    var min = null;
    var max = null;
    var gap = null;
    var delta = null;

    $("#container").on("mousewheel", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        xScale = chart.xScale();
        max = xScale.getMaximum();
        min = xScale.getMinimum();
        gap = max - min;
        delta = gap * e.originalEvent.deltaY / 4000;
        if ((min + delta) > xScale.getFullMinimum() && (max + delta) < xScale.getFullMaximum()) {
            chart.selectRange(min + delta, max + delta);
        }
    });

    chart1 = chart;
    //請幫我加入 ajax 更改  last_new_price.value('last-visible'); 值
    //應該就可以做到即時更新了
    //即時線


    // var last_new_price = chart.plot(0).priceIndicator();
    // last_new_price.value('last-visible');
    //consoloe.log(last_new_price.value('last-visible'));
    //alert(last_new_price.value('last-visible'));
    // last_new_price.stroke("#f00");
    // last_new_price.label().background().fill("#f00");
    // last_new_price.label().fontColor("#fff");

    // chart.scroller().line(mapping_line);
    //即時線 END



    chart.draw();

    pageNotBusy('tab_loading');

    /*
     rangePicker = anychart.ui.rangePicker();
     rangePicker.render(chart);
     rangePicker.dispose();
     
     rangeSelector = anychart.ui.rangeSelector();
     rangeSelector.render(chart);
     rangeSelector.dispose();
     */

}


function genChart()
{
    //Ｋ線
    $("#printer_1").empty();

    data_stage = anychart.graphics.create("printer_1");

    var dataTable = anychart.data.table('x');
    // console.log(result_arr);
    dataTable.addData(result_arr);
    var dataall = anychart.data.table('x').addData(result_arr);
    var dataHigh = anychart.data.table('x').addData(result_high);
    var dataFlat = anychart.data.table('x').addData(result_flat);
    var dataLow = anychart.data.table('x').addData(result_low);

    var map_as_set = {'open': 'open', 'high': 'high', 'low': 'low', 'close': 'close'};



    var mapping = dataTable.mapAs(map_as_set);
    var mapping_h = dataHigh.mapAs(map_as_set);
    var mapping_f = dataFlat.mapAs(map_as_set);
    var mapping_l = dataLow.mapAs(map_as_set);
    var mapping_line = dataTable.mapAs({'value': 'open'});

    // console.log(result_arr);
    chart = anychart.stock();
    chart.credits().text("理財教學");

    /* 繪圖工具 */
    chart.listen("annotationDrawingFinish", onAnnotationDrawingFinish);
    chart.listen("annotationSelect", onAnnotationSelect);
    chart.listen("annotationUnSelect", function () {
        $('.color-picker[data-color="fill"]').removeAttr('disabled');
        $('.select-marker-size').removeAttr('disabled');
        $('.drawing-tools-solo').find('.bootstrap-select').each(function () {
            $(this).removeClass('open');
        })
    });

    var plot_sid = 0;
    var sel_img_counts = $("#tech_list input:checked").length;

    /* 主要區塊 */
    var plot = chart.plot(0);
    plot.yAxis(0).enabled(true);
    plot.yAxis(0).orientation('right');
    plot.yAxis(1).orientation('left');
    // plot.xGrid().enabled(true);
    // plot.yGrid().enabled(true);
    plot.xGrid().stroke('Dimgray 0.3');
    plot.yGrid().stroke('Dimgray 0.3');
    plot.xMinorGrid().enabled(true);
    plot.xMinorGrid().stroke('Dimgray 0.3');
    plot.yMinorGrid().enabled(true);
    plot.yMinorGrid().stroke('Dimgray 0.3');



//特殊線圖
    // plot.priceIndicator(0);

    //最後一筆
    var line_S1 = plot.priceIndicator(0);
    line_S1.value('last-visible');
    line_S1.stroke("#f00");
    line_S1.label().background().fill("#f00");
    line_S1.label().fontColor("#fff");

    //低
    var line_S2 = plot.priceIndicator(1);
    line_S2.value('low');
    line_S2.stroke("#003C9D");
    line_S2.label().background().fill("#003C9D");
    line_S2.label().fontColor("#fff");



    var line_S3 = plot.priceIndicator(2);
    line_S3.value('series-end');
    line_S3.stroke("#EE7700");
    line_S3.label().background().fill("#EE7700");
    line_S3.label().fontColor("#fff");

    //第一筆
    var line_S4 = plot.priceIndicator(3);
    line_S4.value('first-visible');
    line_S4.stroke("#CC00CC");
    line_S4.label().background().fill("#CC00CC");
    line_S4.label().fontColor("#fff");



    //主區塊檢查是否高度固定
    // if (sel_img_counts > 0) {
    var plot_height = 70;
    plot.height(plot_height + '%');
    // }


    var background = chart.background();
    background.fill('#000');
    // chart.yScale().ticks().interval(10);

    var drawPrint = plot.annotations();

    //點選後出現浮動視窗的事件
    plot.listen("click", function (events) {
        var click_date = moment(this.Wa.Xa.aa).format("YYYY-MM-DD HH:mm");
        var data_obj = json_arr[click_date];

        $("#data_view_time").html(click_date);
        var k;
        for (var k = 0; k < data_obj.length; k++)
        {
            $("#data_view_" + k).html(data_obj[k]);
        }

        $("#data_view").fadeIn();
    });




    /* 平均線 */
    if ($("#ipt_avg_1").is(":checked")) {
        var map_avg1 = dataTable.mapAs({"value": "close"});
        var series_avg1 = plot.sma(map_avg1, 5).series();
        series_avg1.name('平均線(5)');
        series_avg1.stroke('#fff');
    }
    if ($("#ipt_avg_2").is(":checked")) {
        var map_avg2 = dataTable.mapAs({"value": "close"});
        var series_avg2 = plot.sma(map_avg2, 10).series();
        series_avg2.name('平均線(10)');
        series_avg2.stroke('#ff0');
    }
    if ($("#ipt_avg_3").is(":checked")) {
        var map_avg3 = dataTable.mapAs({"value": "close"});
        var series_avg3 = plot.sma(map_avg3, 20).series();
        series_avg3.name('平均線(20)');
        series_avg3.stroke('#f00');
    }
    if ($("#ipt_avg_4").is(":checked")) {
        var map_avg4 = dataTable.mapAs({"value": "close"});
        var series_avg4 = plot.sma(map_avg4, 30).series();
        series_avg4.name('平均線(30)');
        series_avg4.stroke('#0f0');
    }
    if ($("#ipt_avg_5").is(":checked")) {
        var map_avg5 = dataTable.mapAs({"value": "close"});
        var series_avg5 = plot.sma(map_avg5, 60).series();
        series_avg5.name('平均線(60)');
        series_avg5.stroke('#2ea7b3');
    }
    /* 平均線end */








    /* 技術指標 Start */
    /* 主圖 */


    //主K線

    // var series_ohlc = plot.ohlc(mapping).name(now_pcode);
    var series0 = plot.candlestick(mapping).name(now_pcode);
    var series1 = plot.candlestick(mapping_h).name(now_pcode);
    var series2 = plot.candlestick(mapping_f).name(now_pcode);
    var series3 = plot.candlestick(mapping_l).name(now_pcode);

    // set the interactivity mode

    series1.risingStroke("#ef6c00");
    series1.risingFill("#ef6c00");

    series2.fallingStroke("#fff");
    series2.fallingFill("#fff");

    series3.fallingStroke("#00ff3c");
    series3.fallingFill("#00ff3c");


    // AMA
    if ($("#ipt_AMA").is(":checked"))
    {
        //plot_sid++;
        //var plot_ama = chart.plot(plot_sid);
        var map_ama = dataTable.mapAs({"value": "close"});
        var series_ama = plot.ama(map_ama).series();
        series_ama.name('AMA');
        series_ama.stroke('#bf360c');
    }

    // BBands
    if ($("#ipt_BBands").is(":checked"))
    {
        //plot_sid++;
        //var plot_bbands = chart.plot(plot_sid);
        var map_bbands = dataTable.mapAs({"value": "close"});
        var series_bbands = plot.bbands(map_bbands);
    }

    // BBandsB 乖離
    if ($("#ipt_BBandsB").is(":checked"))
    {
        //plot_sid++;
        //var plot_bbandsB = chart.plot(plot_sid);
        var map_bbandsB = dataTable.mapAs({"value": "close"});
        var series_bbandsB = plot.bbandsB(map_bbandsB);
    }

    // BBW
    if ($("#ipt_BBW").is(":checked"))
    {
        //plot_sid++;
        //var plot_bbw = chart.plot(plot_sid);
        var map_bbandsWidth = dataTable.mapAs({"value": "close"});
        var series_bbandsWidth = plot.bbandsWidth(map_bbandsWidth);
    }

    // EMA
    if ($("#ipt_EMA").is(":checked"))
    {
        //plot_sid++;
        //var plot_ema = chart.plot(plot_sid);
        var map_ema = dataTable.mapAs({"value": "close"});
        var series_ema = plot.sma(map_ema, obj_setting.ema_p1).series();
        series_ema.name('EMA');
        series_ema.stroke('#bf360c');

    }

    // MMA
    if ($("#ipt_MMA").is(":checked"))
    {
        //plot_sid++;
        //var plot_mma = chart.plot(plot_sid);
        var map_mma = dataTable.mapAs({"value": "close"});
        var series_mma = plot.mma(map_mma, obj_setting.mma_p1).series();
        series_mma.name('MMA');
        series_mma.stroke('#bf360c');
    }
    /* 主圖 */
    /* 副圖 */
    // ADL
    if ($("#ipt_ADL").is(":checked"))
    {
        plot_sid++;
        var plot_adl = chart.plot(plot_sid);
        var map_adl = dataTable.mapAs({
            "high": "high", "open": "open", "low": "low", "close": "close", "volume": "low"
        });
        var series_adl = plot_adl.adl(map_adl).series();
        series_adl.name('ADL');
    }

    // K線

    if ($("#ipt_kline").is(":checked"))
    {
        //K線
        plot_sid++;
        var plot_k = chart.plot(plot_sid);
        var series0 = plot_k.candlestick(mapping).name(now_pcode);
        var series1 = plot_k.candlestick(mapping_h).name(now_pcode);
        var series2 = plot_k.candlestick(mapping_f).name(now_pcode);
        var series3 = plot_k.candlestick(mapping_l).name(now_pcode);


        series1.risingStroke("#ef6c00");
        series1.risingFill("#ef6c00");
        series2.fallingStroke("#fff");
        series2.fallingFill("#fff");
        series3.fallingStroke("#00ff3c");
        series3.fallingFill("#00ff3c");

    }


    // Aroon
    if ($("#ipt_Aroon").is(":checked"))
    {
        plot_sid++;
        var plot_aroon = chart.plot(plot_sid);
        var map_aroon = dataTable.mapAs({'high': 'open', 'low': 'low'});
        var series_aroon = plot_aroon.aroon(map_aroon, obj_setting.arron_p1);
    }

    // ATR
    if ($("#ipt_ATR").is(":checked"))
    {
        plot_sid++;
        var plot_atr = chart.plot(plot_sid);
        var map_atr = dataTable.mapAs();
        map_atr.addField('open', 'high', "first");
        map_atr.addField('high', 'open', 'max');
        map_atr.addField('low', 'low', 'min');
        map_atr.addField('close', 'close', 'last');
        var series_atr = plot_atr.atr(map_atr).series();
        series_atr.name('ATR');
    }

    // CMF
    if ($("#ipt_CMF").is(":checked"))
    {
        plot_sid++;
        var plot_cmf = chart.plot(plot_sid);
        var map_cmf = dataTable.mapAs({
            "high": "high", "low": "low", "close": "close",
            "volume": "amount", "value": "close"
        });

        var series_cmf = plot_cmf.cmf(map_cmf).series();
        series_cmf.name('CMF');
        series_cmf.stroke("#bf360c");
    }

    // CHO
    if ($("#ipt_CHO").is(":checked"))
    {
        plot_sid++;
        var plot_cho = chart.plot(plot_sid);
        var map_cho = dataTable.mapAs({
            "high": "high", "low": "low", "close": "close",
            "volume": "amount", "value": "close"
        });

        var series_cho = plot_cho.cho(map_cho).series();
        series_cho.name('CHO');
        series_cho.stroke("#bf360c");
    }

    // CCI
    if ($("#ipt_CCI").is(":checked"))
    {
        plot_sid++;
        var plot_cci = chart.plot(plot_sid);
        var map_cci = dataTable.mapAs({
            "high": "high", "low": "low",
            "close": "close", "value": "close"
        });
        var series_cci = plot_cci.cci(map_cci);
    }

    // DMI
    if ($("#ipt_DMI").is(":checked"))
    {
        plot_sid++;
        var plot_dmi = chart.plot(plot_sid);
        var map_dmi = dataTable.mapAs({
            "high": "high", "open": "open", "low": "low",
            "close": "close", "value": "close", "volume": "close"
        });
        var series_dmi = plot_dmi.dmi(map_cci);
        series_dmi.name('DMI');
    }

    // KDJ
    if ($("#ipt_KDJ").is(":checked"))
    {
        plot_sid++;
        var plot_kdj = chart.plot(plot_sid);
        var map_kdj = dataTable.mapAs();
        map_kdj.addField("open", "high", "first");
        map_kdj.addField("high", "open", "max");
        map_kdj.addField("low", "low", "min");
        map_kdj.addField("close", "close", "last");
        map_kdj.addField("value", "amount", "value");

        var series_kdj = plot_kdj.kdj(map_kdj,
                obj_setting.kdj_p1, "EMA",
                obj_setting.kdj_p2, "SMA",
                obj_setting.kdj_p3);
        series_kdj.kSeries().stroke("#bf360c");
        series_kdj.dSeries().stroke("#FFF");
        series_kdj.jSeries().stroke("#FFFF00");
    }

    // MACD
    if ($("#ipt_MACD").is(":checked"))
    {
        plot_sid++;
        var plot_macd = chart.plot(plot_sid);
        var map_macd = dataTable.mapAs({'value': 'close'});
        var series_macd = plot_macd.macd(map_macd,
                obj_setting.macd_p1,
                obj_setting.macd_p2,
                obj_setting.macd_p3);
        series_macd.macdSeries().stroke('#bf360c');
        series_macd.signalSeries().stroke('#ff6d00');


        // // Sets type for histogram series.
        // series_macd.histogramSeries("column");
        //get series object
        var histogramSeries = series_macd.histogramSeries();
        // //set custom drawer to the series
        // var currentRendering = histogramSeries.rendering();
        setupDrawer(histogramSeries);

        //chart.container("container").draw();

        //custom drawer function
        function setupDrawer(series) {
            //add the 2nd shape
            var fallShape = series.rendering().shapes();
            fallShape.push({
                name: 'negative',
                shapeType: 'path',
                fillNames: null,
                strokeNames: ['stroke'],
                isHatchFill: false,
                zIndex: 1
            });

            series.rendering()
                    .shapes(fallShape)
                    .point(function () {
                        if (!this.missing) {

                            // get shapes group
                            var shapes = this.shapes || this.getShapesGroup(this.pointState);
                            // calculate the left value of the x-axis
                            var leftX = this.x - this.pointWidth / 2;
                            // calculate the right value of the x-axis
                            var rightX = leftX + this.pointWidth;
                            // calculate the half of point width
                            var rx = this.pointWidth / 2;

                            //define colors for positive and negative paths
                            shapes['path'].fill('OrangeRed', 0.8);
                            shapes['negative'].fill('DodgerBlue', 0.8);

                            //condition coloring
                            if (+this.getDataValue('value') > 0) {
                                shapes['path']
                                        // draw column with rounded edges
                                        .moveTo(leftX, this.zero)
                                        .lineTo(leftX, this.value - rx)
                                        .lineTo(rightX, this.value - rx)
                                        .lineTo(rightX, this.zero)
                                        // close by connecting the last point with the first straight line
                                        .close();

                            } else {
                                shapes['negative']
                                        // draw column with rounded edges
                                        .moveTo(leftX, this.zero)
                                        .lineTo(leftX, this.value + rx)
                                        .lineTo(rightX, this.value + rx)
                                        .lineTo(rightX, this.zero)
                                        // close by connecting the last point with the first straight line
                                        .close();
                            }
                        }
                    });
        }
    }

    // ROC
    if ($("#ipt_ROC").is(":checked"))
    {
        plot_sid++;
        var plot_roc = chart.plot(plot_sid);
        var map_roc = dataTable.mapAs({'value': 'close'});
        var series_roc = plot_roc.roc(map_roc, obj_setting.roc_p1).series();
        series_roc.name('ROC');
        series_roc.stroke('#bf360c');
    }

    // RSI
    if ($("#ipt_RSI").is(":checked"))
    {
        plot_sid++;
        var plot_rsi = chart.plot(plot_sid);
        var map_rsi = dataTable.mapAs({'value': 'close'});

        var series_rsi = plot_rsi.rsi(map_rsi, obj_setting.rsi_p1).series();
        var series_rsi1 = plot_rsi.rsi(map_rsi, obj_setting.rsi_p2).series();
        var series_rsi2 = plot_rsi.rsi(map_rsi, obj_setting.rsi_p3).series();
        series_rsi.name('RSI1');
        series_rsi1.name('RSI2');
        series_rsi2.name('RSI3');
        series_rsi.stroke('#FFFFFF');
        series_rsi1.stroke('#FFFF33');
        series_rsi2.stroke('#FF3333');
    }

    // Stochastic
    if ($("#ipt_Stochastic").is(":checked"))
    {
        plot_sid++;
        var plot_stoch = chart.plot(plot_sid);
        var map_stochastic = dataTable.mapAs();
        map_stochastic.addField("open", "high", "first");
        map_stochastic.addField("high", "open", "max");
        map_stochastic.addField("low", "low", "min");
        map_stochastic.addField("close", "close", "last");
        map_stochastic.addField("value", "amount", "value");

        var series_stoch = plot_stoch.stochastic(map_stochastic,
                obj_setting.stoch_p1, "EMA",
                obj_setting.stoch_p2, "SMA",
                obj_setting.stoch_p3);
        stoch_k = series_stoch.kSeries();
        stoch_k.stroke("#FFF");
        stoch_d = series_stoch.dSeries();
        stoch_d.stroke("#FFFF00");
    }


    // 量圖
    if ($("#ipt_trend").is(":checked"))
    {
        plot_sid++;
        var plot_trend = chart.plot(plot_sid);
        trend_map = dataall.mapAs({"value": "amount"});
        // var trend_maph = dataHigh.mapAs({"value": "amount"});
        // var trend_mapf = dataFlat.mapAs({"value": "amount"});
        // var trend_mapl = dataLow.mapAs({"value": "amount"});
        var trend_all = plot_trend.column(trend_map).name("成交量");
        // var trend_h = plot_trend.column(trend_maph).name("成交量");
        // var trend_f = plot_trend.column(trend_mapf).name("成交量");
        // var trend_l = plot_trend.column(trend_mapl).name("成交量");
        trend_all.fill("#66b3ff");
        // trend_h.fill("#eb6b61");
        // trend_f.fill("#F0F0F0");
        // trend_l.fill("#00ff3c");




    }
    /* 副圖 */
    /* 技術指標 End */

    chart.plot(0).yAxis(0).enabled(true);
    chart.padding().left(75).right(75);
    chart.plot(0).yAxis(0).orientation('right');
    chart.plot(0).yAxis(1).orientation('left');
    chart.scroller(true);
    chart.scroller().orientation("top");
    // autoHide the scroller
    chart.scroller().autoHide("true");

    // set the fill color
    chart.scroller().fill("#33CC33");

    // set the selected fill color
    chart.scroller().selectedFill("#339966");

    // set the stroke of the bar
    chart.scroller().outlineStroke("#33CC33");
    // set the bar height
    chart.scroller().minHeight(1);
    chart.scroller().maxHeight(10);
    // var xpoint = ss
    // chart.xZoom().setToPointsCount(10);   
    chart.scroller().allowRangeChange(true).xAxis(false);
    chart.container(data_stage);



    //移動捲軸前
    chart.listen("selectedrangechangestart", function (e) {
        clearInterval(timer_update);
    });

    //移動捲軸後
    chart.listen("selectedrangechangefinish", function (e) {
        chartScrollerFrom = new Date(e.firstSelected);
        chartScrollerTo = new Date(e.lastSelected);
        //timer_update = set_timeout('genChart');
        timer_update = setInterval(genChart, timerInterval);
        genChart();
    });

    //設定顯示區域


//    function show_arr(value)
//    {
//        var button_num_change = value;
//        var checkStartIdx = result_arr.length > 30 ? result_arr.length - button_num_change : 0;
//        var rangeStartIdx = result_arr.length > 30 ? result_arr.length - button_num_change : 0;
//        var rangeEndIdx = result_arr.length - 1;
//        var button_num_check = 500 - rangeStartIdx;
//
//        var checkFrom = new Date(result_arr[checkStartIdx]['x']);
//        var rangeFrom = new Date(result_arr[rangeStartIdx]['x']);
//        var rangeTo = new Date(result_arr[rangeEndIdx]['x']);
//
//        document.getElementById("button_num").value = button_num_check;
//
//        //檢查顯示區域是否要更新
//        if (chartScrollerFrom) {
//            if (checkFrom >= chartScrollerFrom) {
//                rangeFrom = chartScrollerFrom;
//                rangeTo = chartScrollerTo;
//            }
//        }
//
//        chart.selectRange(rangeFrom, rangeTo);
//    }


    if (result_arr.length > 0) {

        var button_num_change = 30;
        var checkStartIdx = result_arr.length > 30 ? result_arr.length - button_num_change : 0;
        var rangeStartIdx = result_arr.length > 30 ? result_arr.length - button_num_change : 0;
        var rangeEndIdx = result_arr.length - 1;
        var button_num_check = 500 - rangeStartIdx;

        var checkFrom = new Date(result_arr[checkStartIdx]['x']);
        var rangeFrom = new Date(result_arr[rangeStartIdx]['x']);
        var rangeTo = new Date(result_arr[rangeEndIdx]['x']);

        document.getElementById("button_num").value = button_num_check;

        //檢查顯示區域是否要更新
        if (chartScrollerFrom) {
            if (checkFrom >= chartScrollerFrom) {
                rangeFrom = chartScrollerFrom;
                rangeTo = chartScrollerTo;
            }
        }

        chart.selectRange(rangeFrom, rangeTo);
    }


    chart.tooltip().titleFormat(function () {

        return window['anychart']['format']['dateTime'](this.hoveredDate, 'yyyy-MM-dd HH:mm');
    });

    var chart_tooltip = chart.tooltip().useHtml(true);
    chart_tooltip.unionFormat(function () {
        return tooltip_format(this.points);
    });
    var interactivity = chart.interactivity();

    // Disable use mouse wheel for zooming.
    interactivity.zoomOnMouseWheel(false);
    //implement scrolling with mouse wheel
    var xScale = null;
    var min = null;
    var max = null;
    var gap = null;
    var delta = null;

    $("#container").on("mousewheel", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        xScale = chart.xScale();
        max = xScale.getMaximum();
        min = xScale.getMinimum();
        gap = max - min;
        delta = gap * e.originalEvent.deltaY / 4000;
        if ((min + delta) > xScale.getFullMinimum() && (max + delta) < xScale.getFullMaximum()) {
            chart.selectRange(min + delta, max + delta);
        }
    });

    chart1 = chart;
    //請幫我加入 ajax 更改  last_new_price.value('last-visible'); 值
    //應該就可以做到即時更新了
    //即時線


    // var last_new_price = chart.plot(0).priceIndicator();
    // last_new_price.value('last-visible');
    //consoloe.log(last_new_price.value('last-visible'));
    //alert(last_new_price.value('last-visible'));
    // last_new_price.stroke("#f00");
    // last_new_price.label().background().fill("#f00");
    // last_new_price.label().fontColor("#fff");

    // chart.scroller().line(mapping_line);
    //即時線 END



    chart.draw();

    pageNotBusy('tab_loading');

    /*
     rangePicker = anychart.ui.rangePicker();
     rangePicker.render(chart);
     rangePicker.dispose();
     
     rangeSelector = anychart.ui.rangeSelector();
     rangeSelector.render(chart);
     rangeSelector.dispose();
     */

}

anychart.licenseKey("etronsoft-227e00e5-e104b122");
anychart.onDocumentReady(function () {
    createPageColorPicker();

    //Page ready
    now_pcode = $.UrlParam("product_code");
    $('#product_code').val(now_pcode);


    //dataReload();
    //timer_update = setInterval(dataReload, timerInterval);
    pageNotBusy("tab_loading");
});

function createPageColorPicker() {
    var colorPicker = $('.color-picker');
    var strokeWidth;
    var STROKE_WIDTH = 1;
    colorPicker.colorpickerplus();
    colorPicker.on('changeColor', function (e, color) {
        var annotation = chart.annotations().getSelectedAnnotation();

        if (annotation) {
            switch ($(this).data('color')) {
                case 'fill' :
                    annotation.fill(color);
                    break;
                case 'stroke' :
                    strokeWidth = annotation.stroke().thickness || STROKE_WIDTH;
                    strokeDash = annotation.stroke().dash || '';
                    var settings = {
                        thickness: strokeWidth,
                        color: color,
                        dash: strokeDash
                    };
                    annotation.stroke(settings);
                    annotation.hovered().stroke(settings);
                    annotation.selected().stroke(settings);
            }
        }

        if (color == null) {
            $('.color-fill-icon', $(this)).addClass('colorpicker-color');
        } else {
            $('.color-fill-icon', $(this)).removeClass('colorpicker-color');
            $('.color-fill-icon', $(this)).css('background-color', color);
        }
    });
}

function removeSelectedAnnotation() {
    var annotation = chart.annotations().getSelectedAnnotation();
    if (annotation)
        chart.annotations().removeAnnotation(annotation);
    return !!annotation;
}

function removeAllAnnotation() {
    chart.annotations().removeAllAnnotations();
}

function onAnnotationDrawingFinish() {
    setToolbarButtonActive(null);
}

function onAnnotationSelect(evt) {
    var annotation = evt.annotation;
    var colorFill;
    var colorStroke;
    var strokeWidth;
    var strokeDash;
    var strokeType;
    var markerSize;
    var STROKE_WIDTH = 1;
    // val 6 in select = 'solid'
    var STROKE_TYPE = '6';
    var $strokeSettings = $('#select-stroke-settings');
    var $markerSize = $('#select-marker-size');
    var $markerSizeBtn = $('.select-marker-size');
    var $colorPickerFill = $('.color-picker[data-color="fill"]');
    var $colorPickerStroke = $('.color-picker[data-color="stroke"]');

    if (annotation.fill !== undefined) {
        $colorPickerFill.removeAttr('disabled');
        colorFill = annotation.fill();
    } else {
        $colorPickerFill.attr('disabled', 'disabled');
    }

    if (typeof annotation.stroke() === 'function') {
        colorStroke = $colorPickerStroke.find('.color-fill-icon').css('background-color');
        colorFill = $colorPickerFill.find('.color-fill-icon').css('background-color');

        if (colorFill.indexOf('a') === -1) {
            colorFill = colorFill.replace('rgb', 'rgba').replace(')', ', 0.5)');
        }

        if ($strokeSettings.val()) {
            switch ($strokeSettings.val()[0]) {
                case '6' :
                case '7' :
                case '8' :
                    strokeType = $strokeSettings.val()[0];
                    strokeWidth = $strokeSettings.val()[1] || STROKE_WIDTH;
                    break;
                default :
                    strokeWidth = $strokeSettings.val()[0];
                    strokeType = $strokeSettings.val()[1];
                    break;
            }
        } else {
            strokeWidth = STROKE_WIDTH;
            strokeType = STROKE_TYPE;
        }

    } else {
        colorStroke = annotation.stroke().color;
        strokeWidth = annotation.stroke().thickness;
        strokeDash = annotation.stroke().dash;
    }

    switch (strokeType) {
        case '6' :
            strokeType = null;
            break;
        case '7' :
            strokeType = '1 1';
            break;
        case '8' :
            strokeType = '10 5';
            break;
    }

    if (strokeType === undefined) {
        strokeType = strokeDash;
    }

    if (annotation.type === 'marker') {
        markerSize = annotation.size();

        if ($('.choose-marker').hasClass('open')) {
            $markerSize.val($markerSize.val()).selectpicker('refresh');
            annotation.size($markerSize.val());
            $markerSizeBtn.removeAttr('disabled')
        } else {
            $markerSize.removeAttr('disabled').val(markerSize).selectpicker('refresh');
            annotation.size(markerSize);
            $markerSizeBtn.removeAttr('disabled')
        }
        $markerSizeBtn.removeAttr('disabled');

    } else {
        $markerSizeBtn.attr('disabled', 'disabled');
    }

    var settings = {
        thickness: strokeWidth,
        color: colorStroke,
        dash: strokeType
    };

    annotation.stroke(settings);
    annotation.hovered().stroke(settings);
    annotation.selected().stroke(settings);

    if (annotation.fill !== undefined) {
        annotation.fill(colorFill);
    }

    switch (strokeType) {
        case '1 1' :
            strokeDash = 7;
            break;
        case '10 5' :
            strokeDash = 8;
            break;
        default :
            strokeDash = 6;
            break;
    }

    $colorPickerFill.find('.color-fill-icon').css('background-color', colorFill);
    $colorPickerStroke.find('.color-fill-icon').css('background-color', colorStroke);
    $strokeSettings.val([strokeWidth, strokeDash]).selectpicker('refresh');
}

function contextMenuItemsFormatter(items) {
    // insert context menu item on 0 position
    items.splice(0, 0, {
        text: "Remove selected annotation",
        action: removeSelectedAnnotation
    });

    // insert context menu item on 1 position
    items.splice(1, 0, {
        text: "Remove all annotations",
        action: removeAllAnnotation
    });

    // insert context menu separator
    items.splice(2, 0, undefined);

    return items;
}

function setToolbarButtonActive(type, markerType) {
    var $buttons = $('.btn[data-annotation-type]');
    $buttons.removeClass('active');
    $buttons.blur();

    if (type) {
        var selector = '.btn[data-annotation-type="' + type + '"]';
        if (markerType)
            selector += '[data-marker-type="' + markerType + '"]';
        $(selector).addClass('active');
    }
}

function updatePropertiesBySelectedAnnotation(strokeWidth, strokeType) {
    var strokeColor;
    var annotation = chart.annotations().getSelectedAnnotation();
    if (annotation == null)
        return;

    if (typeof annotation.stroke() === 'function') {
        strokeColor = annotation.color();
    } else {
        strokeColor = annotation.stroke().color;
    }

    switch (strokeType) {
        case '6' :
            strokeType = null;
            break;
        case '7' :
            strokeType = '1 1';
            break;
        case '8' :
            strokeType = '10 5';
            break;
    }

    var settings = {
        thickness: 12,
        color: strokeColor,
        dash: strokeType
    };

    annotation.stroke(settings);
    annotation.hovered().stroke(settings);
    annotation.selected().stroke(settings);
}

function initTooltip(position) {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip({
            'placement': position,
            'animation': false
        });
    });
}