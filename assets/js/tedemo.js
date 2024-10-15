
anychart.licenseKey("etronsoft-227e00e5-e104b122");

//k現價  x:時間 
//現價  時間 || 現量  時間



var overlay = $('<div></div>').text('No data to display').css({
				display: 'none',
				position: 'absolute',
				top:0, left:0, right: 0, bottom: 0,
				backgroundColor: '#fff',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '330px 260px',
				border: '1px solid #ddd',
				padding: '235px 330px'
});
var pcode='';
var typev='1';

var timeIntervalA=2500;
var timer1,timer2;
var tooltip1=null;
var chart1=null;

var aroon_p1=25;
var rsi_p1=14;
var sma_p1=20;
var sma_p2=50;
var roc_p1=14;
var macd_p1=12;
var macd_p2=26;
var macd_p3=9;

var bUrl = '202.55.227.38/fu';
//更改商品
function ChangeProduct(){
	var _pcode = $('#productchange').val();
	var url = "http://"+bUrl+"//chart?product_code="+ _pcode +"&type=0";
	location.replace(url);
	var now_pcode = $.UrlParam("q");
	$('#productchange').val(now_pcode);
}

function ReadParaSetting()
{

	aroon_p1=checkIsNumber("aroon-p1",25);
	rsi_p1=checkIsNumber("rsi-p1",14);
	sma_p1=checkIsNumber("sma-p1",20);
	sma_p2=checkIsNumber("sma-p2",50);
	roc_p1=checkIsNumber("roc-p1",14);
	macd_p1=checkIsNumber("macd-p1",12);
	macd_p2=checkIsNumber("macd-p2",26);
	macd_p3=checkIsNumber("macd-p3",9);
	
	$("#divsetting input[type='text']").each(function(i,item){
		$('#'+item.id).val(
			localStorage.getItem(item.id)
		);
	})
}

function SaveParaSetting()
{
	var checknumber=true;
	$("#divsetting input[type='text']").each(function(i,item){
    	if (
    		!$.isNumeric(($('#'+item.id).val()))
    		)
    	{
    		checknumber=false;
    	}
	});

	if (checknumber ==false)
	{
		alert('設定值須為數字');
		return false;
	}

	$("#divsetting input[type='text']").each(function(i,item){
		localStorage.setItem(item.id,$('#'+item.id).val());
	});
	ReadParaSetting();
	return true;
}

function checkIsNumber(pa,defaultv)
{
	var p;
	try
	{
		p=localStorage.getItem(pa);
		if (!$.isNumeric(p))
		{
			localStorage.setItem(pa,defaultv);
			return defaultv;
		}
		if (Number(p)>0)
		{
			localStorage.setItem(pa,p);
			return Number(p);	
		}
		else
		{
			localStorage.setItem(pa,defaultv);
			return defaultv;
		}
	}
	catch(e)
	{
		localStorage.setItem(pa,defaultv);
		return defaultv;
	}
}

//var code=<?php echo  ?>
$(document).ready(function() {
	//從取得目前商品代號
	$.UrlParam = function (name) {
    		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    		var r = window.location.search.substr(1).match(reg);
    		if (r != null) return unescape(r[2]); return null;
	}
	var now_pcode = $.UrlParam("product_code");
	//console.log(now_pcode);
	
	$('#productchange').val(now_pcode);
	$('#callsetting').css('color',"blue");
	$('#callsetting').on('hover',function(){
		$(this).css('color','red');
	});
	$('#callsetting').on('click',function(){
		if ($('#chktimer').prop("checked")==true)
		{
			alert('請先停止【即時更新】再執行參數設定');
			return;
		}
		ReadParaSetting();
		// $("#divsetting input[type='text']").each(function(i,item){
		// 	$('#'+item.id).val(
		// 		localStorage.getItem(item.id)
		// 	);
		// });
        $.blockUI({ message: $('#divsetting'), css: { width: '500px',top:'10%' } }); 
	});
	$('#callSaveSetting').on('click',function(){
		if (SaveParaSetting()==true)
		{
         	$.unblockUI(); 
         	return false;
     	}	
     	else
     	{
     		return false; 	
     	}
        
	});
	$('#cancelSaveSetting').on('click',function(){
        $.unblockUI(); 
        return false; 
	});
	$('#container').css('margin-top','35px').css('top','30px');
	$('#ul-indicator').css('background-color','#fff');
	$('#ul-indicator li').css('background-color','#fff').css('display','inline');

	$('#chktimer').change(function(){
		var _timer1=timer1;
		if ($(this).prop("checked")!==true)
		{
			clearInterval(timer1);
			clearInterval(_timer1);
		}
		else
		{
			timer1=setInterval(genChart, timeIntervalA);	
		}
	});

	$( "#dt" ).datepicker($.datepicker.regional['zh-TW'] );
    $( "#dt" ).datepicker("option", "dateFormat", 'yy-mm-dd' );
    
	//init
    $('#toolbar2').hide();
    $('#container2').hide();
    $('#btn-showk').css('color','red');
    $('#toolbar ul.timegroup li:first a').addClass('select');

    $('#btn-showk').on('click',function(){
    	$('#toolbar').show();
    	$('#toolbar2').hide();
    	$('#container').show();
  	    $('#container2').hide();

  	    $('#btn-showline').css('color','black');
  	    $(this).css('color','red');
    })
    $('#btn-showline').on('click',function(){
    	$('#toolbar2').show();
    	$('#toolbar').hide();
    	$('#container2').show();
  	    $('#container').hide();
  	    $('#btn-showk').css('color','black');
  	    $(this).css('color','red');
  	    if ($('#dt').val()==='')
  	    {
  	    	$('#dt').val(moment(new Date()).format("YYYY-MM-DD"));
  	    	$('#showLineChart').click();
  	    }
    })

    $('#chk-showk').change(function(){
    	$('#showLineChart').trigger('click');
    })
    //改商品
    $('#btn-changeproduct').on('click',function(){
        ChangeProduct();
    })
    $('#showLineChart').on('click',function(){
    	clearInterval(timer1);
    	typev='mline';
    	var idays=0;
    	try
    	{
    		idays=parseInt($('#eddays').val());
    	}
    	catch(ex)
    	{
    		idays=0;
    	}
    	if (idays==0)
    	{
    		alert('日數值錯誤');
    		return;
    	}
    	if ($( "#dt" ).val()=='')
    	{
    		alert('日期錯誤');
    		return;
    	}

    	genLineChart($( "#dt" ).val(),idays);
    })


	$('#toolbar ul.timegroup li ').css('list-style-type','none');
	$('#toolbar ul.timegroup li a').on('click',function(){
		$('#toolbar ul.timegroup li a').removeClass('select');
		$(this).addClass('select');
		$('#lbloading').show();

		$('#toolbar ul.timegroup li a').css('color','#000');
		$('#toolbar ul.timegroup li a').css('font-weight','normal');
		$(this).css('color','red');
		$(this).css('font-weight','bold');

		if (typev !== $(this).attr('id'))
		{
			chart1=null;	
		}

		typev=$(this).attr('id');
        genChart();
        clearInterval(timer1);
        
        if ($('#chktimer').prop("checked")===true)
        {
	        timer1=setInterval(genChart, timeIntervalA);
        }

 	})	

 	$('.indicator').on('click',function(){
 		//$(this).toogleClass('active');
 		genChart();
        clearInterval(timer1);
        
        if ($('#chktimer').prop("checked")===true)
        {
	        timer1=setInterval(genChart, timeIntervalA);
        }
 	})

 	if ($('#type').val()==="1")
 	{
 		$('#btn-showline').trigger("click");
 	}
})

function getUrl()
{
	console.log(typev);
	var _typev;

	_typev=typev;

	if (_typev==='mline')
	{
		_typev='m1';
		return 'http://'+bUrl+'/chart/datalist?chart_type=line&product_code='+$('#pcode').val()+'&type='+_typev.replace('m','');
	}
	else
	{
		return 'http://'+bUrl+'/chart/datalist?product_code='+$('#pcode').val()+'&type='+_typev.replace('m','');
	}
	
}

function genLineChart(dt,days)
{


	typev='mline';
	pcode=$('#pcode').val();
	$('#container2').empty();
	var datelist=[];

	var urla='http://'+bUrl+'/chart/datalist?product_code='+pcode;
	urla=getUrl()+'&dt='+dt+'&days='+days;

	var resultList=[];
	var date_start,date_end;
	$.ajax(
	{
	 	url:urla,
	 	async:false,
	 	timeout: 3500,
	 	success:function(response){
	 		//overlay.hide()
			var list=JSON.parse(response);
			
			if (list.length>0)
			{
			   var _i=0;
			   var j;
			   var size = list.length;
			   date_start=list[size-1].create_date;
			   date_end=list[0].create_date;
			   for ( j=0; j<size; j++ ) {
				   if (list[j] !=null){
				   		var jobj=list[j]
			   			if (jobj.create_date!==null)
			   			{
				   			var dt=jobj.create_date.split(' ')[0]+' '+moment(jobj.create_time).format("HH:mm:ss")+' UTC';
					   		resultList.unshift(
					   			[
					   				//dt,jobj.open_price,jobj.high_price,jobj.low_price,jobj.new_price,jobj.sell_1_price
					   				dt,jobj.new_price,jobj.high_price,jobj.low_price,jobj.close_price,jobj.total_amount
					   			]
					   		);
				   		}
					}
			   }
			   resultList=resultList.sort(function(a,b){
			   		return (moment(a[0])-moment(b[0]));
			   })
			}
	    }
	})
	
	//console.log(resultList);

	var dataTable = anychart.data.table();
	var dataTable2 = anychart.data.table();

	dataTable.addData(resultList);
	dataTable2.addData(resultList);

	chart = anychart.scatter();

	var credits = chart.credits();
	//credits.enabled(false);
	credits.text("理財教學");


	mapping = dataTable.mapAs({'value': 5});
	mapping2 = dataTable2.mapAs({'value': 1});
	var mappingk=dataTable.mapAs({'SourceDate':0,'open': 1, 'high': 2, 'low': 3, 'close': 4});

	// create stock chart
	chart = anychart.stock();

	// event is fired each time flash object is redrawn
	// chart.onChartDraw = function() {
	// 	// "this" refers to chart object here
	// 	// set handler to null - make sure event is fired only once
	// 	this.onChartDraw = null;
		
	// 	overlay.appendTo('#container2').show()
	// }

	// create plot on the chart
	var plot2 = chart.plot(0);

	var plot = chart.plot(1);


	var lineSeries2 = chart.plot(0).line(mapping2);
	lineSeries2.name(pcode);
	lineSeries2.stroke('2px #ef6c00');

	var lineSeries = chart.plot(1).column(mapping);
	lineSeries.name(pcode);
	lineSeries.stroke('2px #64b5f6');

	if ($('#chk-showk').prop("checked")===true)
	{
		var seriesk = chart.plot(0).candlestick(mappingk).name(pcode);
		seriesk.legendItem().iconType('risingfalling');

		tooltip1 = seriesk.tooltip();
	  	tooltip1.enabled(true);
	  	chart.tooltip().titleFormatter(function(){
	     	return window['anychart']['format']['dateTime'](this.hoveredDate, 'yyyy-MM-dd HH:mm:ss');
		});

		tooltip1.textFormatter("開:{%open}\n高:{%high}\n低:{%low}\n收:{%close}");
	}

	var extraYScale=anychart.scales.linear();
  	var extraYAxis=chart.plot(0).yAxis(0);
  	extraYAxis.orientation('left');
    extraYAxis.scale(extraYScale);
    lineSeries2.yScale(extraYScale);

	// setting chart padding to fit both Y axes
	chart.padding(10, 50, 20, 50);

	// create scroller series with mapped data
	// set container id for the chart
	chart.container('container2');

	// initiate chart drawing
	chart.draw();

	// create range picker
	rangePicker = anychart.ui.rangePicker();
	// init range picker
	rangePicker.render(chart);

	// create range selector
	rangeSelector = anychart.ui.rangeSelector();
	// init range selector
	rangeSelector.render(chart);

	$('#lbloading').hide();

}

function genChart()
{
	var rangea=null;
	var rangeb=null;

	if (chart1!==null)
	{
		rangea=chart1.getSelectedRange().firstSelected;
		rangeb=chart1.getSelectedRange().lastSelected;
		chart1.dispose();
		chart1 = null;
	}

	pcode=$('#pcode').val();
	$('#container').empty();
	var datelist=[];

	var urla='http://'+bUrl+'/chart/datalist?product_code='+pcode;
	urla=getUrl();

	var resultList=[];
	var date_start,date_end;
	$.ajax(
	{
	 	url:urla,
	 	async:false,
	 	timeout: 2500,
	 	success:function(response){
	 		
			var list=JSON.parse(response);
			//try {list = r.split("\n");} catch(ex) {}
			
			if (list.length>0)
			{
			   var _i=0;
			   var j;
			   var size = list.length;
			   date_start=list[size-1].create_time;
			   date_end=list[0].create_time;
			   for ( j=0; j<size; j++ ) {
				   if (list[j] !=null){
				   		var jobj=list[j]
				   		//console.log(jobj);
				   		//if ( parseInt(jobj.open_price) == 0 ) continue;
				   			if (jobj.create_date!==null)
				   			{
					   			//var dt=jobj.create_date.split(' ')[0]+' '+moment(jobj.create_time).format("HH:mm:ss");
					   			var dt=jobj.create_time;
					   			if (jobj.create_time.split(' ').length>1)
					   			{
					   			  dt=jobj.create_time.split(' ')[0]+' '+jobj.create_time.split(' ')[1]+' UTC';
					   			}
					   			else 
					   			{
					   				dt=jobj.create_time;	
					   			}
					   			//dt=moment(dt).format('YYYY:MM:DDTHH:mm:ssZ');
					   			
						   		//resultList.unshift(
						   			resultList.push(
						   			[
						   				//dt,jobj.open_price,jobj.high_price,jobj.low_price,jobj.new_price,jobj.sell_1_price
						   				dt,jobj.new_price,jobj.high_price,jobj.low_price,jobj.close_price,jobj.total_amount
						   			]
						   		);
					   		}
			   				//break;
					}
			   }
			   resultList=resultList.sort(function(a,b){
			   		return (moment(a[0])-moment(b[0]));
			   })
			   //console.log(resultList);
			}
	    }
	})
		
	// create data table on loaded data
	var dataTable = anychart.data.table();

	//console.log(resultList);
	dataTable.addData(resultList);

	var stage = anychart.graphics.create('container');
	// map loaded data for the ohlc series
	var mapping = dataTable.mapAs({'SourceDate':0,'open': 1, 'high': 2, 'low': 3, 'close': 4});

	// map loaded data for the scroller
	var scrollerMapping = dataTable.mapAs();
	scrollerMapping.addField('value', 5);

	// create stock chart
	chart = anychart.stock();

	var credits = chart.credits();
	//credits.enabled(false);
	credits.text("理財教學");


	chart1=chart;

	// create first plot on the chart
	var plot = chart.plot(0);
	plot.grid().enabled(true);
	plot.grid(1).enabled(true).layout('vertical');
	plot.minorGrid().enabled(true);
	plot.minorGrid(1).enabled(true).layout('vertical');
	
	var background = chart.background();
	background.fill('#40484D');

	var series = plot.candlestick(mapping).name(pcode);
	series.legendItem().iconType('risingfalling');
	series.risingStroke("#eb6b61");
	series.risingFill("#eb6b61");
	series.fallingStroke("#00ff3c");
	series.fallingFill("#00ff3c");

    tooltip1 = series.tooltip();
  	tooltip1.enabled(true);
  	chart.tooltip().titleFormatter(function(){
     	return window['anychart']['format']['dateTime'](this.hoveredDate, 'yyyy-MM-dd HH:mm:ss');
	});

	tooltip1.textFormatter("開:{%open}\n高:{%high}\n低:{%low}\n收:{%close}");


  	var plotidx=0;

  	if ($('#chk-aroon').prop("checked")===true)
    {
    	plotidx++;
    	
    	var indicatorPlot = chart.plot(plotidx);
    	//indicatorPlot.height('30%');

     	var aroonIndicator = indicatorPlot.aroon(mapping);
	    // set period

	    aroonIndicator.period(checkIsNumber("aroon-p1",25)); //aroon_p1 default 25
	    // set color stroke
	    aroonIndicator.upSeries().stroke('2px #eb6b61');
	    aroonIndicator.downSeries().stroke('2px #00ff3c');
	    plot.yAxis(1).orientation('right');
    	indicatorPlot.yAxis(1).orientation('right');
    }

    if ($('#chk-ema').prop("checked")===true)
    {
    	plotidx++;
    	
    	var emaPlot = chart.plot(0);

    	var emamapping = dataTable.mapAs({'value': 4});

    	var ema50 = emaPlot.ema(emamapping, 30).series();
		ema50.stroke('2px #ffa000');

		var emayAxis = emaPlot.yAxis(1);
		emayAxis.orientation('right');

    }

     if ($('#chk-rsi').prop("checked")===true)
    {
    	plotidx=plotidx+1;

    	rsiplot = chart.plot(plotidx);

    	var rsimapping = dataTable.mapAs();
		rsimapping.addField('open', 1, 'first');
		rsimapping.addField('high', 2, 'max');
		rsimapping.addField('low', 3, 'min');
		rsimapping.addField('close', 4, 'last');
		rsimapping.addField('value', 4, 'close');

		// create line series
		var rsiSeries = rsiplot.ohlc(rsimapping);
		rsiSeries.name(pcode);
		rsiSeries.risingStroke("#eb6b61");
		rsiSeries.risingFill("#eb6b61");
		rsiSeries.fallingStroke("#00ff3c");
		rsiSeries.fallingFill("#00ff3c");

		// create first plot on the chart
		plotidx=plotidx+1;
		var rsisecondPlot = chart.plot(plotidx);
		rsisecondPlot.height('30%');

		// ???create RSI indicator with period 14
		var rsi14  = rsisecondPlot.rsi(rsimapping, checkIsNumber("rsi-p1",14)).series(); //rsi_p1 default 14
		rsi14 .stroke('2px #64b5f6');

		// adding extra Y axis to the right side
		//rsiplot.yAxis(1).orientation('right');
		//secondPlot.yAxis(1).orientation('right');
    }

    if ($('#chk-sma').prop("checked")===true)
    {
    	plotidx++;

    	var smamapping = dataTable.mapAs({'value': 4});

    	var smaplot = chart.plot(plotidx);
		// create line series
		var smaSeries = smaplot.line(smamapping);
		smaSeries.name(pcode);
		smaSeries.stroke('2px #64b5f6');

		// ???create SMA indicators with period 20
		var sma20 = smaplot.sma(smamapping, checkIsNumber("sma-p1",20)).series(); //sma_p1 default 20
		sma20.name('SMA('+checkIsNumber("sma-p1",20)+')');
		sma20.stroke('2px #bf360c');

		// create SMA indicators with period 20
		var sma50 = smaplot.sma(smamapping, checkIsNumber("sma-p2",50)).series(); //sma_p2 default 50
		sma50.name('SMA('+checkIsNumber("sma-p2",50)+')');
		sma50.stroke('2px #ff6d00');

		// adding extra Y axis to the right side
		var yAxis = smaplot.yAxis(1);
		yAxis.orientation('right');
    }

    if ($('#chk-roc').prop("checked")===true)
    {
    	plotidx++;

    	var rocmapping = dataTable.mapAs();
		rocmapping.addField('open', 1, 'first');
		rocmapping.addField('high', 2, 'max');
		rocmapping.addField('low', 3, 'min');
		rocmapping.addField('close', 4, 'last');
		rocmapping.addField('value', 4, 'close');

    	var rocplot = chart.plot(plotidx);

		// create line series
		var rocSeries = rocplot.ohlc(rocmapping);
		rocSeries.name(pcode);
		rocSeries.risingStroke("#eb6b61");
		rocSeries.risingFill("#eb6b61");
		rocSeries.fallingStroke("#00ff3c");
		rocSeries.fallingFill("#00ff3c");

		// create first plot on the chart
		plotidx++;
		var rocsecondPlot = chart.plot(plotidx);
		//secondPlot.height('30%');

		// ???create ROC indicator with period 12
		var roc_roc = rocsecondPlot.roc(rocmapping, checkIsNumber("roc-p1",14)).series(); //roc_p1 default 14
		roc_roc.stroke('2px #64b5f6');

		chart.scroller().line(rocmapping);

    }

      if ($('#macd-roc').prop("checked")===true)
    {
    	plotidx++;

    	var macdmapping = dataTable.mapAs();
		macdmapping.addField('open', 1, 'first');
		macdmapping.addField('high', 2, 'max');
		macdmapping.addField('low', 3, 'min');
		macdmapping.addField('close', 4, 'last');
		macdmapping.addField('value', 4, 'close');

    	var macdplot = chart.plot(plotidx);

		// create line series
		var macdohlcSeries = macdplot.ohlc(macdmapping);
		macdohlcSeries.name(pcode);
		//macdohlcSeries.stroke('2px #64b5f6');
		macdohlcSeries.risingStroke("#eb6b61");
		macdohlcSeries.risingFill("#eb6b61");
		macdohlcSeries.fallingStroke("#00ff3c");
		macdohlcSeries.fallingFill("#00ff3c");

		// create first plot on the chart
		plotidx++;
		var macdsecondPlot = chart.plot(plotidx);
		//secondPlot.height('30%');

		// create MACD indicator with fast period 12, slow period 26 and signal period 9
		// macd_p1 default 12, macd_p2 default 26 , macd_p3 default 9
		var macd = macdsecondPlot.macd(macdmapping, 
			checkIsNumber("macd-p1",12),
			checkIsNumber("macd-p2",26),
			checkIsNumber("macd-p3",9)		
		);
		macd.macdSeries().stroke('#bf360c');
		macd.signalSeries().stroke('#ff6d00');
		macd.histogramSeries().fill('#ffe082');

		// adding extra Y axis to the right side
		//macdplot.yAxis(1).orientation('right');
		//macdsecondPlot.yAxis(1).orientation('right');
    }
	
	if( $('#chk-ama').prop('checked') ===true )
	{
		plotidx++;

    	var amamapping = dataTable.mapAs();
		amamapping.addField('open', 1, 'first');
		amamapping.addField('high', 2, 'max');
		amamapping.addField('low', 3, 'min');
		amamapping.addField('close', 4, 'last');
		amamapping.addField('value', 4, 'close');

    	var amaplot = chart.plot(plotidx);

		// create line series
		var amaSeries = amaplot.line(amamapping);
		amaSeries.name('CSCO');
		amaSeries.stroke('2px #64b5f6');

		var ama = amaplot.ama(amamapping).series();
		ama.stroke('2px #bf360c');
		
	}
	
	if( $('#chk-atr').prop('checked') ===true )
	{
		plotidx++;

    	var atrmapping = dataTable.mapAs();
		atrmapping.addField('open', 1, 'first');
		atrmapping.addField('high', 2, 'max');
		atrmapping.addField('low', 3, 'min');
		atrmapping.addField('close', 4, 'last');
		atrmapping.addField('value', 4, 'close');

    	var atrplot = chart.plot(plotidx);

		// create line series
		var atrSeries = atrplot.ohlc(atrmapping);
		atrSeries.name('CSCO');
		//atrSeries.stroke('2px #64b5f6');
		atrSeries.risingStroke("#eb6b61");
		atrSeries.risingFill("#eb6b61");
		atrSeries.fallingStroke("#00ff3c");
		atrSeries.fallingFill("2px #00ff3c");
		

		plotidx++;
		var _atrplot = chart.plot(plotidx);
		var atr = _atrplot.atr(atrmapping).series();
		atr.stroke('2px #bf360c');
		
	}
	
	if( $('#chk-bbands').prop('checked')===true)
	{
		plotidx++;

    	var bandsmapping = dataTable.mapAs({
			'open': 1,
			'high': 2,
			'low': 3,
			'close': 4,
			'value': {column: 4, type: 'close'}
		});
		
		var bbandsplot = chart.plot(plotidx);
		bbandsplot.bbands(bandsmapping);
		bbandsplot.ohlc(bandsmapping).name('CSCO');
	}
	
	if( $('#chk-bbandsb').prop('checked')===true)
	{
		plotidx++;

    	var bandsbmapping = dataTable.mapAs({
			'open': 1,
			'high': 2,
			'low': 3,
			'close': 4,
			'value': {column: 4, type: 'close'}
		});
		
		var bbandsbplot = chart.plot(plotidx);
		bbandsbplot.bbandsB(bandsbmapping);
		
		plotidx++;
		var _bbandsbplot = chart.plot(plotidx);
		_bbandsbplot.ohlc(bandsbmapping).name('CSCO');
	}
	
	if( $('#chk-bbw').prop('checked')===true)
	{
		plotidx++;

    	var bbwmapping = dataTable.mapAs({
			'open': 1,
			'high': 2,
			'low': 3,
			'close': 4,
			'value': {column: 4, type: 'close'}
		});
		
		var bbwplot = chart.plot(plotidx);
		bbwplot.bbandsWidth(bbwmapping);
		
		plotidx++;
		var _bbwplot = chart.plot(plotidx);
		_bbwplot.ohlc(bbwmapping).name('CSCO');
	}
	
	if( $('#chk-mma').prop('checked')===true)
	{
		plotidx++;

    	var mmamapping = dataTable.mapAs({
			'open': 1,
			'high': 2,
			'low': 3,
			'close': 4,
			'value': {column: 4, type: 'close'}
		});
		
		var mmaplot = chart.plot(plotidx);
		var mmaSeries = mmaplot.line(mmamapping);
		mmaSeries.name('CSCO');
		mmaSeries.stroke('2px #64b5f6');
		
		var mma = mmaplot.mma(mmamapping, 10).series();
		mma.stroke('2px #bf360c');
	
	}
	
	if( $('#stochastic').prop('checked')===true)
	{
		plotidx++;

    	var stmapping = dataTable.mapAs();
		stmapping.addField("open", 1, "first");
		stmapping.addField("high", 2, "max");
		stmapping.addField("low", 3, "min");
		stmapping.addField("close", 4, "last");
		stmapping.addField("value", 5, "value");
		
		var stplot = chart.plot(plotidx);
		var stLineSeries = stplot.ohlc(stmapping);
		stLineSeries.name('CSCO');
		stLineSeries.stroke('2px #64b5f6');
		stLineSeries.risingStroke("#eb6b61");
		stLineSeries.risingFill("#eb6b61");
		stLineSeries.fallingStroke("#00ff3c");
		stLineSeries.fallingFill("#00ff3c");
		
		plotidx++;
		stplot = chart.plot(plotidx);
		var stochastic = stplot.stochastic(stmapping, 10, "EMA", 10, "SMA", 20);
		stochastic_k = stochastic.kSeries();
		stochastic_k.stroke("2px #bf360c");
		stochastic_d = stochastic.dSeries();
		stochastic_d.stroke("2px #00ff3c");
	
	}
	
	if( $('#chk-kdj').prop('checked')===true)
	{
		plotidx++;

    	var kdjmapping = dataTable.mapAs();
		kdjmapping.addField("open", 1, "first");
		kdjmapping.addField("high", 2, "max");
		kdjmapping.addField("low", 3, "min");
		kdjmapping.addField("close", 4, "last");
		kdjmapping.addField("value", 5, "value");
		
		var kdjplot = chart.plot(plotidx);
		var kdjLineSeries = kdjplot.ohlc(kdjmapping);
		kdjLineSeries.name('CSCO');
		kdjLineSeries.stroke('2px #64b5f6');
		kdjLineSeries.risingStroke("#eb6b61");
		kdjLineSeries.risingFill("#eb6b61");
		kdjLineSeries.fallingStroke("#00ff3c");
		kdjLineSeries.fallingFill("#00ff3c");
		
		plotidx++;
		kdjplot = chart.plot(plotidx);
		var kdj = kdjplot.kdj(kdjmapping, 10, "EMA", 10, "SMA", 20);
		kdj.kSeries().stroke("#FB0914");
		kdj.dSeries().stroke("#00ff3c");
		kdj.jSeries().stroke("#75D9F3");
	
	}
	//顯示量
	if ($('#chk-trend').prop("checked")===true)
    {
        plotidx++;

        var trendPlot = chart.plot(0);

        var trendmapping = dataTable.mapAs({'value': 5});

        var trend50 = chart.plot(1).column(trendmapping);
        trend50.name(pcode);
        trend50.stroke('2px #64b5f6')

                var trendAxis = trendPlot.yAxis(1);
                trendAxis.orientation('right');

    }


	// create scroller series with mapped data
	chart.scroller().candlestick(mapping);

	// set container id for the chart
	chart.container(stage);


	if (resultList.length>0)
	{
		var rangeStartIdx= resultList.length > 3 ? resultList.length-Math.floor(resultList.length/3) : 0;
		var rangeEndIdx=resultList.length-1;

		chart.selectRange(
			new Date(resultList[rangeStartIdx][0]),
			new Date(resultList[rangeEndIdx][0])
		);
	}
	// set chart selected date/time range
	//chart.selectRange('2007-01-03', '2007-05-20');
	// date_end=moment(new Date()).format("YYYY-MM-DD");
	// var tmp_date=moment(new Date()).add(-30,'days').format('YYYY-MM-DD');
	// date_start= tmp_date;

	if (rangea!==null)
	{
		chart.selectRange(rangea,rangeb);
	}

	// initiate chart drawing
	chart.draw();

	// create range picker
	rangePicker = anychart.ui.rangePicker();
	// init range picker
	rangePicker.render(chart);

	// create range selector
	rangeSelector = anychart.ui.rangeSelector();
	// init range selector
	rangeSelector.render(chart);

	$('#lbloading').hide();

}

//anychart.theme(anychart.themes.darkBlue);

anychart.onDocumentReady(function () {
	console.log('chart ready');
	$('#toolbar').show();

	$('#container').css('margin-top','10px');

	$('#toolbar ul li a').css('color','#000');
	$('#toolbar ul li a').css('font-weight','normal');
	$('#toolbar ul li:first a').css('color','red');
	$('#toolbar ul li:first a').css('font-weight','bold');

	$('#lbloading').show();

	genChart();
	timer1=setInterval(genChart, timeIntervalA);

	$('#lbloading').hide();


	
});
