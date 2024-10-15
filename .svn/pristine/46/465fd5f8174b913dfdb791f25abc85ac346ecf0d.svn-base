
var pcode='';
var typev='5';
//var code=<?php echo  ?>
$(document).ready(function() {
	
	$('#toolbar ul li a').css('color','#000');
	$('#toolbar ul li a').css('font-weight','normal');
	$('#toolbar ul li:nth-child(2) a').css('color','red');
	$('#toolbar ul li:nth-child(2) a').css('font-weight','bold');

	$('#toolbar ul li ').css('list-style-type','none');
	$('#toolbar ul li a').on('click',function(){

		$('#lbloading').show();

		$('#toolbar ul li a').css('color','#000');
		$('#toolbar ul li a').css('font-weight','normal');
		$(this).css('color','red');
		$(this).css('font-weight','bold');
		typev=$(this).attr('id');
                       genChart();
 	})	
})

function getUrl()
{
	return 'http://202.55.227.39/fu/chart/datalist?product_code='+$('#pcode').val()+'&type='+typev.replace('m','');
}

function genChart()
{
	$('#container').empty();
	var datelist=[];

	var urla='http://202.55.227.39/fu/chart/datalist?product_code='+pcode;
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
			console.log(list);
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
				   		//console.log(jobj);
				   		//if ( parseInt(jobj.open_price) == 0 ) continue;
//				   			var dt=jobj.create_date.split(' ')[0];
							var dt=jobj.create_date;
					   		resultList.push(
					   			[
					   				//dt,jobj.open_price,jobj.high_price,jobj.low_price,jobj.new_price,jobj.sell_1_price
					   				dt,jobj.new_price,jobj.high_price,jobj.low_price,jobj.close_price,jobj.total_amount
					   			]
					   		);
			   				//break;
					}
			   }
			}
	    }
	})
		
	// create data table on loaded data
	var dataTable = anychart.data.table();

	dataTable.addData(resultList);

	var stage = anychart.graphics.create('container');
	// map loaded data for the ohlc series
	var mapping = dataTable.mapAs({'open': 1, 'high': 2, 'low': 3, 'close': 4});

	// map loaded data for the scroller
	var scrollerMapping = dataTable.mapAs();
	scrollerMapping.addField('value', 5);

	// create stock chart
	chart = anychart.stock();

	// create first plot on the chart
	var plot = chart.plot(0);
	plot.grid().enabled(true);
	plot.grid(1).enabled(true).layout('vertical');
	plot.minorGrid().enabled(true);
	plot.minorGrid(1).enabled(true).layout('vertical');

	// create EMA indicators with period 50
	plot.ema(dataTable.mapAs({'value': 4})).series().stroke('1.5 #455a64');

	var series = plot.candlestick(mapping).name('CSCO');
	series.legendItem().iconType('risingfalling');

	// create scroller series with mapped data
	chart.scroller().candlestick(mapping);

	// set container id for the chart
	chart.container(stage);

	// set chart selected date/time range
	//chart.selectRange('2007-01-03', '2007-05-20');
	// date_end=moment(new Date()).format("YYYY-MM-DD");
	// var tmp_date=moment(new Date()).add(-30,'days').format('YYYY-MM-DD');
	// date_start= tmp_date;

	chart.selectRange(date_start,date_end);

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

	$('#lbloading').hide();


	
});