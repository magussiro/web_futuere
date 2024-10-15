var data_stage;
var obj_setting = {
	"aroon_p1" : 25, "rsi_p1" : 14,
	"sma_p1" : 20, "sma_p2" : 50,
	"roc_p1" : 14, "macd_p1" : 12,
	"macd_p2" : 26, "macd_p3" : 9
}
var timerInterval = 1000000;		//即時更新秒數
var timer_update;				//即時更新物件
var default_obj_set = obj_setting;
var now_pcode;
var tooltip1 = null;

var chart;
var annotationsColor;

$.UrlParam = function (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

$(function(){

    $('select.choose-drawing-tools').on('change', changeAnnotations);
    $('select.choose-marker').on('change', changeAnnotations);
    $('[data-annotation-type]').on('click', changeAnnotations);

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
                        var markerAnchor =  $target.find('option:selected').data().markerAnchor;
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

        if (annotation == null) return;

        if (annotation.type === 'marker') {
            annotation.size($(this).val());
        }
    });


    $('html').keyup(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            removeSelectedAnnotation();
        }
    })

	$("#data_view").draggable({ containment: "parent" });
	$("#btnClose").click(function(){ $("#data_view").fadeOut(); });

	//K線圖即時更新
	$('#update_realtime').change(function(){
		if ($(this).is(':checked'))
			timer_update = setInterval(genChart,timerInterval);
		else
			clearInterval(timer_update);	
	});

	//nav tab change
	$("#tabNav a").click(function(e){
		var view = $(this).attr("href");
		$("#tabNav a").removeClass("on");
		$(this).addClass('on');
		$(view).show().siblings().hide();
		if(view=="#showk"){
			clearInterval(timer_update);
			timer_update = setInterval(dataReload, timerInterval);
			dataReload();
		}else{
			clearInterval(timer_update);
			trendLoad();
		}
		e.preventDefault();
	});

	//K線圖相關參數 click 效果
	$(".kline_timer").on("click",function(e){
		$(".kline_timer").removeClass("on");
		$(this).addClass('on');
		typev = $(this).attr("data-time");
		dataReload();
		e.preventDefault();
	});
	$(".kline_type").on("click",function(e){
		dataReload();
	});

	//走勢圖相關參數
	$("#line_date").datepicker({ "dateFormat" : "yy-mm-dd" })
					.val(moment(new Date()).format("YYYY-MM-DD"));

	//button for param setting
	$("#btn_setParam").click(function(e) {
		if($("#update_realtime").is(":checked"))
			alert("請先停止【即時更新】再執行參數設定");
		else
			objSetOpen();				
		
	});

	//參數設定檢查
	$("#btn_param_check").click(function(e) {
		var check_num = true;
		$("#data_setting input").each(function(i, el) {
			if(! $.isNumeric( $(this).val() )) check_num = false;
		});

		if(! check_num) {
			alert("設定值須為數字");			
		}else{
			var newVal;
			for(var i in obj_setting)
			{
				newVal = $("#"+i).val();
				newVal = (Number(newVal)>0) ? newVal : default_obj_set[i];
				obj_setting[i] = newVal;
			}
			pageNotBusy('data_setting');	
		}
		
	});

	//參數設定取消
	$("#btn_param_cancel").click(function(e) {
		pageNotBusy('data_setting');
	});

	$("#form_product").submit(function(e) {
		e.preventDefault();

		var _pcode = $('#product_code').val();
		var url = "http://202.55.227.39/fu/new_stock.html?product_code="+ _pcode +"&type=0";
		location.replace(url);
	});

	$("#line_kline").change(function(e) {
		$("#form_trend").submit();
	});
	$("#form_trend").submit(function(e) {
		e.preventDefault();
		var date = $("#line_date").val();
		var days = $("#line_days").val();
		if(!$.isNumeric(days)) alert('日數值錯誤');
		else if(date=='') alert('日期錯誤');
		else trendLoad();
	});


	//Page ready
	now_pcode = $.UrlParam("product_code");
	$('#product_code').val(now_pcode);

	$("#tabNav a:eq(0),#k_line_timer a:eq(0)").addClass('on');
	$("#showk").show();

	var selType = $.UrlParam("type");
	$("#tabNav a").eq(selType).click();
	
});

//Loading UI Block
function pageOnBusy(){
	$("#tab_loading").css("display","flex");
	$("body").addClass('noscroll');
}

//Param UI Block
function objSetOpen(){
	for(var i in obj_setting) $("#"+i).val(obj_setting[i]);
	$("#data_setting").css("display","flex");
	$("body").addClass('noscroll');
}

//remove UI Block
function pageNotBusy(tar){
	$("#"+tar).fadeOut();
	$("body").removeClass('noscroll');
}

var date_start ,date_end;
var result_arr = [];
var json_arr = {};
var result_high = [];	//開低收高
var result_flat = [];	//開收持平
var result_low = [];	//開高收低
var typev='1';
var chart1 = null;

function getUrlStr()
{
	var _typev = typev;
	var pd_code = $('#product_code').val();

	if (_typev==='mline')
	{
		_typev='m1';
		return 'http://202.55.227.39/fu/chart/datalist?chart_type=line&product_code='
			+ pd_code + '&type=' + _typev.replace('m','');
	}
	else
	{
		return 'http://202.55.227.39/fu/chart/datalist?product_code='
			+ pd_code + '&type='+ _typev.replace('m','');
	}
}

function dataReload(){ url = getUrlStr(); json_arr_load(url ,1); }

function trendLoad()
{
	var searchDate = $("#line_date").val();
	var searchDays = $("#line_days").val();
	typev = "mline";
	var dataUrl = getUrlStr() + '&dt=' + searchDate + '&days=' + searchDays;
	json_arr_load(dataUrl ,2);
}

function json_arr_load(url,nextStep){
	$.ajax({
		url: url, timeout: 3500, beforeSend:pageOnBusy, error:function(){ pageNotBusy('tab_loading'); },
		success:function(res){
			var list = JSON.parse(res);
			if(list.length>0)
			{
				var size = list.length;
				result_arr = []; result_high = []; result_flat = []; result_low = []; json_arr = {};

				date_start = list[size-1].create_date;
				date_end = list[0].create_date;

				for(var j in list){
					if(list[j]!=null)
					{
						var j_obj = list[j];
						if(j_obj.create_date!==null)
						{
							var dt = j_obj.create_time;
					   		if (dt.split(' ').length>1)
					   			dt = j_obj.create_time.split(' ')[0] + ' ' + j_obj.create_time.split(' ')[1]+' UTC';
					   		else 
					   			dt = j_obj.create_time;

					   		var insert_Obj = {
								x : dt  , amount : j_obj.total_amount,
								high : j_obj.high_price , low : j_obj.low_price ,
								open : j_obj.new_price , close : j_obj.close_price, 
								stroke: '#FF0000'
							}

					   		result_arr.push(insert_Obj);

					   		var obj_key = moment(j_obj.create_time).format("YYYY-MM-DD HH:mm");
					   		json_arr[obj_key] = insert_Obj;

							if(j_obj.new_price < j_obj.close_price)
								result_high.push(insert_Obj);

							else if(j_obj.new_price == j_obj.close_price)
								result_flat.push(insert_Obj);

							else
								result_low.push(insert_Obj);

						}
					}
				}
				result_arr = result_arr.sort(function(a,b){
			   		return ( moment(a.x) - moment(b.x) );
			   	})
				result_high = result_high.sort(function(a,b){
			   		return ( moment(a.x) - moment(b.x) );
			   	})
				result_flat = result_flat.sort(function(a,b){
			   		return ( moment(a.x) - moment(b.x) );
			   	})
				result_low = result_low.sort(function(a,b){
			   		return ( moment(a.x) - moment(b.x) );
			   	})

				if(nextStep==1) genChart();
				else genTrend();
			}
		}
	});
}


function genTrend()
{
	$("#printer_2").empty();

	var dataTable = anychart.data.table('x').addData(result_arr);

	var mapping_line = dataTable.mapAs({'value': 'open'});
	var mapping_column = dataTable.mapAs({'value': 'amount'});

	trend_chart = anychart.stock();
	trend_chart.credits().text("理財教學");

	var background = trend_chart.background();
		background.fill('#40484D');

	var plot_line = trend_chart.plot(0);
	var plot_column = trend_chart.plot(1);

	var plot_obj_1 = plot_line.line(mapping_line);
		plot_obj_1.name(now_pcode);
		plot_obj_1.stroke('2px #ef6c00');

	var plot_obj_2 = plot_column.column(mapping_column);
		plot_obj_2.name(now_pcode);
		plot_obj_2.stroke('2px #64b5f6');
		plot_obj_2.fill('#64b5f6');

	if ($('#line_kline').is(":checked"))
	{
		var mapas_k = {'x':'x' ,'open':'open' ,'high': 'high', 'low': 'low', 'close': 'close'};


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


		tooltip1 = trend_chart.tooltip();
	  	tooltip1.enabled(true);

	  	var t_tooltip = trend_chart.tooltip().useHtml(true);
	  	t_tooltip.unionFormat(function(){ return tooltip_format(this.points); });

	  	trend_chart.tooltip().titleFormat(function(){
	     	return window['anychart']['format']['dateTime'](this.hoveredDate, 'yyyy-MM-dd HH:mm:ss');
		});
	}

	var extraYScale = anychart.scales.linear();
  	var extraYAxis = trend_chart.plot(0).yAxis(0);
	  	extraYAxis.orientation('left');
	    extraYAxis.scale(extraYScale);

    plot_line.yScale(extraYScale);

    trend_chart.padding(10, 50, 20, 50);
	trend_chart.container('printer_2');
	trend_chart.draw();

	pageNotBusy('tab_loading');
	/*
	rangePicker = anychart.ui.rangePicker();
	rangePicker.render(chart);
	rangeSelector = anychart.ui.rangeSelector();
	rangeSelector.render(chart);
	*/
}


function tooltip_format(obj) {
	var tooltip_str = "";
	for(var n in obj){
		if(obj[n].high){
			tooltip_str = "開:" + obj[n].open + "<br>高:" + obj[n].high 
				+ "<br>低:" + obj[n].low + "<br>收:"+obj[n].close; 
			break;
		}
	}
	return tooltip_str;
}

function genChart()
{
	
	var range_a = null;
	var range_b = null;

	if (chart1!==null)
	{
		range_a = chart1.getSelectedRange().firstSelected;
		range_b = chart1.getSelectedRange().lastSelected;
		chart1.dispose();
		chart1 = null;
	}
	
	$("#printer_1").empty();

	data_stage = anychart.graphics.create("printer_1");

	var dataTable = anychart.data.table('x');
		dataTable.addData(result_arr);

	var dataHigh = anychart.data.table('x').addData(result_high);
	var dataFlat = anychart.data.table('x').addData(result_flat);
	var dataLow = anychart.data.table('x').addData(result_low);

	var map_as_set = { 'open':'open' ,'high': 'high', 'low': 'low', 'close': 'close'};

	var mapping = dataTable.mapAs(map_as_set);
	var mapping_h = dataHigh.mapAs(map_as_set);
	var mapping_f = dataFlat.mapAs(map_as_set);
	var mapping_l = dataLow.mapAs(map_as_set);
	

	chart = anychart.stock();
	chart.credits().text("理財教學");

	chart.listen("annotationDrawingFinish", onAnnotationDrawingFinish);
    chart.listen("annotationSelect", onAnnotationSelect);
    chart.listen("annotationUnSelect", function () {
        $('.color-picker[data-color="fill"]').removeAttr('disabled');
        $('.select-marker-size').removeAttr('disabled');
        $('.drawing-tools-solo').find('.bootstrap-select').each(function () {
            $(this).removeClass('open');
        })
    });


	var plot = chart.plot(0);
		plot.grid().enabled(true);
		plot.grid(1).enabled(true).layout('vertical');
		plot.minorGrid().enabled(true);
		plot.minorGrid(1).enabled(true).layout('vertical');


	var background = chart.background();
		background.fill('#40484D');

	var drawPrint = plot.annotations();

	var series1 = plot.candlestick(mapping_h).name(now_pcode);
	var series2 = plot.candlestick(mapping_f).name(now_pcode);
	var series3 = plot.candlestick(mapping_l).name(now_pcode);

		series1.risingStroke("#ef6c00");
		series1.risingFill("#ef6c00");

		plot.listen("click",function(){
			console.log(this);
			var click_date = moment(this.zb.yb.W).format("YYYY-MM-DD HH:mm");

			var data_obj = json_arr[click_date];

			$("#data_view_time").html(click_date);
			for(var k in data_obj) $("#data_view_" + k).html(data_obj[k]);
			
			$("#data_view").fadeIn();
		});

		series2.fallingStroke("#fff");
		series2.fallingFill("#fff");

		series3.fallingStroke("#00ff3c");
		series3.fallingFill("#00ff3c");



  	chart.tooltip().titleFormat(function(){
     	return window['anychart']['format']['dateTime'](this.hoveredDate, 'yyyy-MM-dd HH:mm');
	});
	
	var t_tooltip = chart.tooltip().useHtml(true);
	t_tooltip.unionFormat(function(){ return tooltip_format(this.points); });

	plot_idx = 1;

	//選擇Aroon
	if($("#ipt_Aroon").is(":checked"))
	{
		plot_idx++;
    	var indicatorPlot = chart.plot(plot_idx);

    	var aroonMapping = dataTable.mapAs();
		    aroonMapping.addField('open', 'open', 'first');
		    aroonMapping.addField('high', 'high', 'max');
		    aroonMapping.addField('low', 'low', 'min');
		    aroonMapping.addField('close', 'close', 'last');
		    aroonMapping.addField('value', 'close', 'last');

     	var aroonIndicator = indicatorPlot.aroon(aroonMapping);

		    aroonIndicator.period(obj_setting.aroon_p1);
		    aroonIndicator.upSeries().stroke('2px #eb6b61');
		    aroonIndicator.downSeries().stroke('2px #00ff3c');

	    plot.yAxis(1).orientation('right');
    	indicatorPlot.yAxis(1).orientation('right');
	}

	//選擇EMA
	if($("#ipt_EMA").is(":checked"))
	{

		plot_idx++;
    	
    	var emaPlot = chart.plot(0);
    	var emamapping = dataTable.mapAs();
		    emamapping.addField('open', 'open', 'first');
		    emamapping.addField('high', 'high', 'max');
		    emamapping.addField('low', 'low', 'min');
		    emamapping.addField('close', 'close', 'last');
		    emamapping.addField('value', 'close', 'last');

    	var ema50 = emaPlot.ema(emamapping, 30).series();
			ema50.stroke('2px #ffa000');

		var emayAxis = emaPlot.yAxis(1);
			emayAxis.orientation('right');
	}

	//選擇RSI
	if($("#ipt_RSI").is(":checked"))
	{

		plot_idx++;

    	rsiplot = chart.plot(plot_idx);

    	var rsimapping = dataTable.mapAs();
    		rsimapping.addField('open', 'open', 'first');
    		rsimapping.addField('high', 'high', 'max');
    		rsimapping.addField('low', 'low', 'min');
    		rsimapping.addField('close', 'close', 'last');
    		rsimapping.addField('value', 'low', 'last');

		var rsiSeries = rsiplot.ohlc(rsimapping);
			rsiSeries.name(now_pcode);
			rsiSeries.risingStroke("#eb6b61");
			rsiSeries.risingFill("#eb6b61");
			rsiSeries.fallingStroke("#00ff3c");
			rsiSeries.fallingFill("#00ff3c");

		plot_idx++;
		var rsisecondPlot = chart.plot(plot_idx);
			rsisecondPlot.height('30%');

		var rsi14 = rsisecondPlot.rsi(rsimapping, obj_setting.rsi_p1).series();
			rsi14.stroke('2px #64b5f6');
	}

	//選擇SMA
	if($("#ipt_SMA").is(":checked"))
	{
		plot_idx++;

    	var smamapping = dataTable.mapAs();
    		smamapping.addField('open', 'open', 'first');
    		smamapping.addField('high', 'high', 'max');
    		smamapping.addField('low', 'low', 'min');
    		smamapping.addField('close', 'close', 'last');
    		smamapping.addField('value', 'low', 'last');

    	var smaplot = chart.plot(plot_idx);
		var smaSeries = smaplot.line(smamapping);
			smaSeries.name(now_pcode);
			smaSeries.stroke('2px #64b5f6');

		var sma20 = smaplot.sma(smamapping, obj_setting.sma_p1).series();
			sma20.name('SMA('+ obj_setting.sma_p1 + ')');
			sma20.stroke('2px #bf360c');

		var sma50 = smaplot.sma(smamapping, obj_setting.sma_p2).series();
			sma50.name('SMA('+ obj_setting.sma_p2 + ')');
			sma50.stroke('2px #ff6d00');

		var yAxis = smaplot.yAxis(1);
			yAxis.orientation('right');
	}

	//選擇ROC
	if($("#ipt_ROC").is(":checked"))
	{

		plot_idx++;

    	var rocmapping = dataTable.mapAs();
    		rocmapping.addField('open', 'open', 'first');
    		rocmapping.addField('high', 'high', 'max');
    		rocmapping.addField('low', 'low', 'min');
    		rocmapping.addField('close', 'close', 'last');
    		rocmapping.addField('value', 'low', 'last');

    	var rocplot = chart.plot(plot_idx);

		var rocSeries = rocplot.ohlc(rocmapping);
			rocSeries.name(now_pcode);
			rocSeries.risingStroke("#eb6b61");
			rocSeries.risingFill("#eb6b61");
			rocSeries.fallingStroke("#00ff3c");
			rocSeries.fallingFill("#00ff3c");

		plot_idx++;
		var rocsecondPlot = chart.plot(plot_idx);

		var roc_roc = rocsecondPlot.roc(rocmapping, obj_setting.roc_p1).series();
			roc_roc.stroke('2px #64b5f6');

		chart.scroller().line(rocmapping);
	}

	//選擇MACD
	if($("#ipt_MACD").is(":checked"))
	{
		plot_idx++;

    	var macdmapping = dataTable.mapAs();
    		macdmapping.addField('open', 'open', 'first');
    		macdmapping.addField('high', 'high', 'max');
    		macdmapping.addField('low', 'low', 'min');
    		macdmapping.addField('close', 'close', 'last');
    		macdmapping.addField('value', 'close', 'last');

    	var macdplot = chart.plot(plot_idx);

		var macdohlcSeries = macdplot.ohlc(macdmapping);
			macdohlcSeries.name(now_pcode);
			macdohlcSeries.risingStroke("#eb6b61");
			macdohlcSeries.risingFill("#eb6b61");
			macdohlcSeries.fallingStroke("#00ff3c");
			macdohlcSeries.fallingFill("#00ff3c");

		plot_idx++;
		var macdsecondPlot = chart.plot(plot_idx);
		var macd = macdsecondPlot.macd(macdmapping, 
				obj_setting.macd_p1,
				obj_setting.macd_p2,
				obj_setting.macd_p3		
			);
			macd.macdSeries().stroke('#bf360c');
			macd.signalSeries().stroke('#ff6d00');
			macd.histogramSeries().fill('#ffe082');
	}

	//選擇AMA
	if($("#ipt_AMA").is(":checked"))
	{
		plot_idx++;

    	var amamapping = dataTable.mapAs();
    		amamapping.addField('open', 'open', 'first');
    		amamapping.addField('high', 'high', 'max');
    		amamapping.addField('low', 'low', 'min');
    		amamapping.addField('close', 'close', 'last');
    		amamapping.addField('value', 'close', 'last');

    	var amaplot = chart.plot(plot_idx);

		var amaSeries = amaplot.line(amamapping);
			amaSeries.name(now_pcode);
			amaSeries.stroke('2px #64b5f6');

		var ama = amaplot.ama(amamapping).series();
			ama.stroke('2px #bf360c');
	}

	//選擇ATR
	if($("#ipt_ATR").is(":checked"))
	{
		plot_idx++;

    	var atrmapping = dataTable.mapAs();
    		atrmapping.addField('open', 'open', 'first');
    		atrmapping.addField('high', 'high', 'max');
    		atrmapping.addField('low', 'low', 'min');
    		atrmapping.addField('close', 'close', 'last');
    		atrmapping.addField('value', 'close', 'last');

    	var atrplot = chart.plot(plot_idx);

		var atrSeries = atrplot.ohlc(atrmapping);
			atrSeries.name(now_pcode);
			atrSeries.risingStroke("#eb6b61");
			atrSeries.risingFill("#eb6b61");
			atrSeries.fallingStroke("#00ff3c");
			atrSeries.fallingFill("2px #00ff3c");
		

		plot_idx++;
		var _atrplot = chart.plot(plot_idx);
		var atr = _atrplot.atr(atrmapping).series();
			atr.stroke('2px #bf360c');
	}

	//選擇BBands
	if($("#ipt_BBands").is(":checked"))
	{

		plot_idx++;

    	var bandsmapping = dataTable.mapAs();
    		bandsmapping.addField('open', 'open', 'first');
    		bandsmapping.addField('high', 'high', 'max');
    		bandsmapping.addField('low', 'low', 'min');
    		bandsmapping.addField('close', 'close', 'last');
    		bandsmapping.addField('value', 'close', 'last');
		
		var bbandsplot = chart.plot(plot_idx);
			bbandsplot.bbands(bandsmapping);
			bbandsplot.ohlc(bandsmapping).name('CSCO');
	}

	//選擇BBandsB
	if($("#ipt_BBandsB").is(":checked"))
	{
		plot_idx++;

    	var bandsbmapping = dataTable.mapAs();
    		bandsbmapping.addField('open', 'open', 'first');
    		bandsbmapping.addField('high', 'high', 'max');
    		bandsbmapping.addField('low', 'low', 'min');
    		bandsbmapping.addField('close', 'close', 'last');
    		bandsbmapping.addField('value', 'close', 'last');
		
		var bbandsbplot = chart.plot(plot_idx);
			bbandsbplot.bbandsB(bandsbmapping);
		
		plot_idx++;
		var _bbandsbplot = chart.plot(plot_idx);
			_bbandsbplot.ohlc(bandsbmapping).name('CSCO');
	}

	//選擇BBW
	if($("#ipt_BBW").is(":checked"))
	{
		plot_idx++;

    	var bbwmapping = dataTable.mapAs();
    		bbwmapping.addField('open', 'open', 'first');
    		bbwmapping.addField('high', 'high', 'max');
    		bbwmapping.addField('low', 'low', 'min');
    		bbwmapping.addField('close', 'close', 'last');
    		bbwmapping.addField('value', 'close', 'last');
		
		var bbwplot = chart.plot(plot_idx);
			bbwplot.bbandsWidth(bbwmapping);
		
		plot_idx++;
		var _bbwplot = chart.plot(plot_idx);
			_bbwplot.ohlc(bbwmapping).name('CSCO');
	}

	//選擇MMA
	if($("#ipt_MMA").is(":checked"))
	{
		plot_idx++;

    	var mmamapping = dataTable.mapAs();
    		mmamapping.addField('open', 'open', 'first');
    		mmamapping.addField('high', 'high', 'max');
    		mmamapping.addField('low', 'low', 'min');
    		mmamapping.addField('close', 'close', 'last');
    		mmamapping.addField('value', 'close', 'last');
		
		var mmaplot = chart.plot(plot_idx);
		var mmaSeries = mmaplot.line(mmamapping);
			mmaSeries.name(now_pcode);
			mmaSeries.stroke('2px #64b5f6');
		
		var mma = mmaplot.mma(mmamapping, 10).series();
			mma.stroke('2px #bf360c');
	}

	//選擇Stochastic
	if($("#ipt_Stochastic").is(":checked"))
	{
		plot_idx++;

    	var stmapping = dataTable.mapAs();
    		stmapping.addField('open', 'open', 'first');
    		stmapping.addField('high', 'high', 'max');
    		stmapping.addField('low', 'low', 'min');
    		stmapping.addField('close', 'close', 'last');
    		stmapping.addField('value', 'low', 'last');
		
		var stplot = chart.plot(plot_idx);
		var stLineSeries = stplot.ohlc(stmapping);
			stLineSeries.name(now_pcode);
			stLineSeries.stroke('2px #64b5f6');
			stLineSeries.risingStroke("#eb6b61");
			stLineSeries.risingFill("#eb6b61");
			stLineSeries.fallingStroke("#00ff3c");
			stLineSeries.fallingFill("#00ff3c");
			
		plot_idx++;
		stplot = chart.plot(plot_idx);
		var stochastic = stplot.stochastic(stmapping, 10, "EMA", 10, "SMA", 20);
			stochastic_k = stochastic.kSeries();
			stochastic_k.stroke("2px #bf360c");
			stochastic_d = stochastic.dSeries();
			stochastic_d.stroke("2px #00ff3c");
	}

	//選擇KDI
	if($("#ipt_KDI").is(":checked"))
	{
		plot_idx++;
		var kdjmapping = dataTable.mapAs();
    		kdjmapping.addField('open', 'open', 'first');
    		kdjmapping.addField('high', 'high', 'max');
    		kdjmapping.addField('low', 'low', 'min');
    		kdjmapping.addField('close', 'close', 'last');
    		kdjmapping.addField('value', 'low', 'last');
		
		var kdjplot = chart.plot(plot_idx);
		var kdjLineSeries = kdjplot.ohlc(kdjmapping);
			kdjLineSeries.name(now_pcode);
			kdjLineSeries.stroke('2px #64b5f6');
			kdjLineSeries.risingStroke("#eb6b61");
			kdjLineSeries.risingFill("#eb6b61");
			kdjLineSeries.fallingStroke("#00ff3c");
			kdjLineSeries.fallingFill("#00ff3c");
		
		plot_idx++;
		kdjplot = chart.plot(plot_idx);
		var kdj = kdjplot.kdj(kdjmapping, 10, "EMA", 10, "SMA", 20);
			kdj.kSeries().stroke("#FB0914");
			kdj.dSeries().stroke("#00ff3c");
			kdj.jSeries().stroke("#75D9F3");
	}

	//選擇量圖
	if($("#ipt_trend").is(":checked"))
	{
		plot_idx++;

		var trendPlot = chart.plot(0);
        var trend_maph = dataHigh.mapAs({"value":"amount"});
        var trend_mapf = dataFlat.mapAs({"value":"amount"});
        var trend_mapl = dataLow.mapAs({"value":"amount"});

		var trend_plot = chart.plot(plot_idx);
        var trend_h = trend_plot.column(trend_maph);
        var trend_f = trend_plot.column(trend_mapf);
        var trend_l = trend_plot.column(trend_mapl);

			trend_h.fill("#eb6b61");
			trend_h.tooltip().enabled(false);
			trend_f.fill("#fff");
			trend_f.tooltip().enabled(false);
			trend_l.fill("#00ff3c");
			trend_l.tooltip().enabled(false);
	}

	chart.scroller().candlestick(mapping);
	chart.container(data_stage);

	if (result_arr.length>0)
	{
		var rangeStartIdx = result_arr.length > 3 ? result_arr.length - Math.floor(result_arr.length/3) : 0;
		var rangeEndIdx = result_arr.length-1;

		chart.selectRange(
			new Date(result_arr[rangeStartIdx]['x']),
			new Date(result_arr[rangeEndIdx]['x'])
		);
	}

	if (range_a!==null)
		chart.selectRange(range_a,range_b);

	chart1 = chart;
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
	dataReload();
	timer_update = setInterval(dataReload, timerInterval);
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
                    annotation.hoverStroke(settings);
                    annotation.selectStroke(settings);
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
    if (annotation) chart.annotations().removeAnnotation(annotation);
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
    annotation.hoverStroke(settings);
    annotation.selectStroke(settings);

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
        if (markerType) selector += '[data-marker-type="' + markerType + '"]';
        $(selector).addClass('active');
    }
}

function updatePropertiesBySelectedAnnotation(strokeWidth, strokeType) {
    var strokeColor;
    var annotation = chart.annotations().getSelectedAnnotation();
    if (annotation == null) return;

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
        thickness: strokeWidth,
        color: strokeColor,
        dash: strokeType
    };

    annotation.stroke(settings);
    annotation.hoverStroke(settings);
    annotation.selectStroke(settings);
}

function initTooltip(position) {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip({
            'placement': position,
            'animation': false
        });
    });
}