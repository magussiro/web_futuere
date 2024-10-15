<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>個人資料</title>
    <link rel="stylesheet" href="<?php echo $webroot;?>assets/css/reset.css">
    <link rel="stylesheet" href="<?php echo $webroot;?>assets/css/popup_black.css?9">
</head>
<body>

<?php
    function add_winter_time ( $row )
    {
        $tmp = array('','2','3');

        for ( $i=0; $i<3; $i++ )
        {
            $key1 = 'open_time' . $tmp[$i];
            $key2 = 'close_time' . $tmp[$i];
            
            if ( ($row[$key1] == $row[$key2]) && ($row[$key1] == '00:00:00') ) continue;
            
            $row[$key1] = date('H:i:s',strtotime($row[$key1])+3600);
            $row[$key2] = date('H:i:s',strtotime($row[$key2])+3600);
        }
        //var_dump($row);
        return $row;
    }
    
    $strHeader  = '';
    $strBody = '';
    foreach($product as $index=>$row)
    {
        $i = 0;
	
       // if ( (int)$row['day_time'] == 1 ) $row = add_winter_time($row);

        //var_dump($row);
        $strHeader .='<li>'. $index .'</li>';
        $strBody .= '<ul class="personal_info">';
        
	foreach($row as $k=>$v)
        {
	   //var_dump($v);
            $class = '';
            if($i==0)
            {
                $class = 'class="personal_head"';
            }

            if($v== null)
            {
                $v = '&nbsp;';
            }

            if($k=='is_enable')
            {
                if($v==1)
                    $v='正常';
                else
                    $v ='停用';
            }

            if($k == 'day_time'){
	    	if($v == 0)
		    $v ='關閉';
		elseif($v == 1)
		    $v ='開啟';
	    } 

          

           $strBody .= '<li '.$class.'>'. $v .'</li>';
            $i++;
        }
         $strBody .= '</ul>';
        
       
    }
//echo  'header='.$strHeader;
?>

<!--
<div id="personal_wrap" class="popupWrap" style="width:80%;">
     <h2 class="popupH2">個人資料</h2>
    <div id="personal_content">
        <ul class="personal_info title">
            <li class="personal_head">商品/屬性</li>
           
            <li>每點價格</li>
            <li>手續費(進/出)</li>
            <li>單商品口數上限(每手)</li>
            <li>單商品滿倉上限</li>
            <li>單商品留倉口數</li>
            <li>留倉預扣(每口)</li>
            <li>開盤最大漲跌</li>
            <li>每口最大漲跌</li>
            <li>損利需>=</li>
            <li>可下單時間一</li>
            <li>&nbsp;</li>
            <li>可下單時間二</li>
            <li>&nbsp;</li>
            <li>可下單時間三</li>
            <li>&nbsp;</li>
            <li>狀態</li>
            <li>禁新</li>
            <li>強平</li>
	    <li>冬令時間</li>
        </ul>
        <div class="personal_info_body">
          
             <?php// echo $strBody;?>
           
        </div>
        <div class="clear"></div>
        <div class="personal_info_bottom">
            <ul class="personal_notice">
                <li class="personal_notice_detail"><span>注意：</span>(全商品)口數上限-每日: 30</li>
                <li class="personal_notice_detail">(全商品)留倉口數: 30</li>
                <li class="personal_notice_detail">(全商品)留倉天數: 30</li>
            </ul>
        </div>
    </div>
</div>

-->


<div id="personal_wrap" class="popupWrap">
    <h2 class="popupH2">個人資料</h2>
    <div id="personal_content">
        <ul class="personal_info personal_title">
            <li class="personal_head">商品/屬性</li>
            <li>每點價格</li>
            <li>手續費(進/出)</li>

            <li>單商品口數上限(每手)</li>
            <li>單商品滿倉上限</li>
            <li>單商品留倉口數</li>

            <li>留倉預扣(每口)</li>
            <li>開盤最大漲跌</li>
            <li>每口最大漲跌</li>
            <li>損利需>=</li>
            <li>可下單時間一</li>
            <li>&nbsp;</li>
            <li>可下單時間二</li>
            <li>&nbsp;</li>
            <li>可下單時間三</li>
            <li>&nbsp;</li>
	    <li>狀態</li>
            <li>禁新</li>
            <li>強平</li>
         </ul>
        <div class="personal_body">
         <?php echo $strBody;?>
        <!--
            <ul class="personal_info">
                <li class="personal_head">加權指</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">壹指其</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">電子期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">金融期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">恆生期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">上海期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">滬深期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">日經期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">歐元期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">法蘭克</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">道瓊期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">那斯達</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">輕油期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">黃金期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            <ul class="personal_info">
                <li class="personal_head">白銀期</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>xx</li>
                <li>無限制</li>
                <li>無限制</li>
                <li>無限制, 無限制</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>09:00:00</li>
                <li>禁多空單</li>
                <li>3%, 3%</li>
            </ul>
            -->
        </div>
    </div>
    <ul class="personal_notice">
        <li><span class="redColor">注意：</span>(全商品)口數上限-每日: <?php if(isset($config)){echo $config['max_online_amount'];}?></li>
        <li>(全商品)留倉口數: <?php if(isset($config)){echo $config['max_offline_amount'];}?></li>
        <li>(全商品)留倉天數: <?php if(isset($config)){echo $config['max_offline_day'];}?></li>
    </ul>


<?php
   //var_dump($product);

?>
</body>
</html>
