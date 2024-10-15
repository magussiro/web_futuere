<!doctype html>
<html>
  <head>
    <script type="text/javascript" src="<?=$base_url?>assets/js/jquery.js"></script>
    <!--<script type="text/javascript" src="<?=$base_url?>assets/js/stockTestData.js"></script>-->
    <script src="https://cdn.anychart.com/js/7.13.1/anychart-bundle.min.js"></script>
    <script src="https://cdn.anychart.com/csv-data/csco-daily.js"></script>
    <link rel="stylesheet" href="https://cdn.anychart.com/css/latest/anychart-ui.min.css" />
    <style>
      html, body, #container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
  
      #toolbar {
        left:0px;top:0px;
        height:27px;
        width:100%;
      }
      #toolbar ul li{
        float:left;
        list-style-type:none;
        height:25px;
      }

      #toolbar ul li a{
        text-decoration: none;
      }
      
      #container{
        margin-top:30px;
        width:90%;
        height:100%;
      }

    </style>
  </head>
  <body>
  <?php
    //var_dump($data);
  ?>
    <div id="toolbar">
       <ul>
          <li><a href=# id='m1'>1分</a></li>
          <li><a href=# id='m5'>5分</a></li>
          <li><a href=# id='m15'>15分</a></li>
          <li><a href=# id='m30'>30分</a></li>
          <li><a href=# id='m60'>60分</a></li>
          <li><a href=# id='md'>日</a></li>
          <li><a href=# id='mw'>週</a></li>
          <li><a href=# id='mm'>月</a></li>
       </ul>
    </div>

    <div id="container"></div>
    <script>


        $(document).ready(function() {

            $('#toolbar >a').on('click',function(){
                 alert($(this).id);
            })


            anychart.onDocumentReady(function() {
                // The data that have been used for this sample can be taken from the CDN
                // http://cdn.anychart.com/csv-data/csco-daily.js

                // create data table on loaded data
                var dataTable = anychart.data.table();
                dataTable.addData(getData());              //get_csco_daily_data

                // map loaded data for the ohlc series
                var mapping = dataTable.mapAs({'open': 1, 'high':2, 'low': 3, 'close': 4});

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

                var series = plot.candlestick(mapping).name('<?php echo $name;?>');
                series.legendItem().iconType('risingfalling');

                // create scroller series with mapped data
                chart.scroller().candlestick(mapping);

                // set container id for the chart
                chart.container('container');

                // set chart selected date/time range
                chart.selectRange('2016-10-31', '2016-11-1');

                // initiate chart drawing
                chart.draw();
            });
         });

         function getData()
         {
           var dataList = [];
           <?php
              if($msg=='success')
              {
                  echo 'dataList = ' . json_encode($data) . ";";

              }
           ?>
           //alert(dataList.length);
           return dataList;

           //var list2 = [['2016-10-31',20.2,20.7,20.1,20.3,5000],['2016-11-01',20.2,20,5,20.6,20.9,6700],['2016-11-02',20.2,20,5,20.6,20.9,7700],['2016-11-03',20.2,20,5,20.6,20.9,8700],['2016-11-04',20.2,20,5,20.6,20.9,9700],['2016-11-05',20.2,20,5,20.6,20.9,5700]];
           //return list2;
         }
    

       
    </script>



  </body>
</html>
