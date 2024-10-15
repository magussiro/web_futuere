<?php
    date_default_timezone_set('Asia/Taipei');
    require("autoload.php");

    define('ACCOUNT',0);
    define('USER_GROUP',1);
    define('TAX',2);
    define('AMOUNT',3);
    define('TOTAL_CHARGE',4);
    define('LARGE_CHARGE',5);
    define('MED_CHARGE',6);
    define('SMALL_CHARGE',7);
    define('MINI_CHARGE',8);
    define('PROFIT',9);
    define('USER_MONEY',10);
    define('CREATE_DATE',11);
    define('TOTAL_PROFIT',12);
    define('PARENT_ACCOUNT',13);

    function insertToDB ($db, $user_info, $agent_info )
    {
        $sql = "INSERT INTO report_history ( account, user_group, tax, order_amount, total_charge, large_charge, med_charge, small_charge, mini_charge, profit, user_money, create_date, total_profit, parent_account ) VALUES ";
        $arr = array();
        
        foreach ( $user_info as $idx => $row )
        {
            $sql .= "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),";
            $arr = array_merge($arr, $row);
        }

        foreach ( $agent_info as $idx => $row )
        {
            $sql .= "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),";
            $arr = array_merge($arr, $row);
        }
        
        $len = strlen($sql)-1;
        $sql = substr($sql,0,$len);
//        print_r($arr);
        $rtn = $db->insert($sql, $arr,true);
        if ( empty($rtn) ) echo "insert fail\n";
    }
    
    function logFile ( $msg )
    {
        $f = fopen('/tmp/REPORT.log','a');
        fwrite($f,date('Y-m-d H:i:s')." -- $msg"."\n");
        fclose($f);
    }
    
    //取得平倉資訊
    function getOrderData ( $db, $st, $ed )
    {    
//        $ed = date('Y-m-d 13:50');
//        $st = date('Y-m-d 13:50',strtotime('-1 days'));

        $ch_st = strtotime($st);
        $ch_ed = strtotime($ed);

        if ( $ch_st < 1 || $ch_ed < 1 ) {
            logFile("[Error] bad start time or end time, st:$st ed:$ed. exit prog");
            die();
        }
        
        $ret = $db->query("
        SELECT 
            a.rel_id, c.account_head, c.account, c.user_group, a.create_date, a.amount, a.total_charge, a.profit_loss, a.charge_type, a.buy_charge, a.sell_charge, b.user_money
        FROM 
            orders_rel as a 
                LEFT JOIN 
            user_config as b ON ( a.user_id = b.user_id ) 
                LEFT JOIN 
            user as c ON ( a.user_id = c.user_id ) 
        WHERE 
            a.create_date > '$st' and a.create_date <= '$ed' and user_group = 1", array());
            
        return $ret;
    }

    //取出代理設定值    
    function getAgentSetting ( $db )
    {
        $ret = $db->query("
        SELECT 
            a.account_head, a.account, b.tax, b.user_money 
        FROM 
            user as a 
                left join 
            user_config as b on ( a.user_id = b.user_id ) 
        WHERE 
            user_group = 2");
            
        $ret = $ret[1];
        $agent_setting = array();

        foreach ( $ret as $idx => $row )
        {
            $_agent = $row['account'];
            $_tax   = (int)$row['tax'];
            $_money = (int)$row['user_money'];
            $agent_setting[$_agent] = array($_tax, $_money, $row['account_head']);
        }
        
        return $agent_setting;
    }
    
    function getAgentData ( $setting, $account, $data, $info )
    {
        $_len = strlen($account);
        $_parent_profit = 0;
        for ( $i=$_len; $i>0; $i-- )
        {
            $_acc = substr($account,0,$i);

            if ( !isset($info[$_acc]) ) {
                $_tax_info = $setting[$_acc];
                $_tmp = $data;
                $_tax = $_tax_info[0];
                $_tmp[ACCOUNT]	= $_acc;
                $_tmp[TAX]	= $_tax;
                $_tmp[TOTAL_PROFIT] = $data[PROFIT];
                $_tmp[PROFIT]	= round($data[PROFIT] * $_tax / 100);
                $_tmp[USER_MONEY] = $_tax_info[1];
                $_tmp[PARENT_ACCOUNT] = $_tax_info[2];
                $info[$_acc] 	= $_tmp;

                if ( $data[PROFIT] < 0 ) {
                    $data[PROFIT] += -$_tmp[PROFIT];
                } else {
                    $data[PROFIT] -= $_tmp[PROFIT];
                }
//                if ( $_acc[0] == 'S' ) echo "step a $_acc,${_tmp[PROFIT]},${data[PROFIT]}\n";
                continue;
            }
		                
            
            $_tmp = $info[$_acc];
            $_tax = $_tmp[TAX];
            $_tmp[TOTAL_PROFIT] += $data[PROFIT];
            $_tmp[LARGE_CHARGE] += $data[LARGE_CHARGE];
            $_tmp[MED_CHARGE] += $data[MED_CHARGE];
            $_tmp[SMALL_CHARGE] += $data[SMALL_CHARGE];
            $_tmp[MINI_CHARGE] += $data[MINI_CHARGE];
            $_profit = round($data[PROFIT] * $_tax / 100);

            if ( $_profit < 0 ) {
                $data[PROFIT]	+= -$_profit;
            } else {
                $data[PROFIT]	-= $_profit;
            }
            
            $_tmp[PROFIT]	+= $_profit;

            $info[$_acc]   = $_tmp;
//            if ( $_acc[0] == 'S' ) echo "$_acc,${_tmp[PROFIT]},${data[PROFIT]}\n";
        }
        
        return $info;
    }
    
    //整理代理的損益資訊
    function initAgentProfitInfo ( $db, $info )
    {
        $_setting = getAgentSetting($db);
        $_agent_info = array();
        $_agent = $info['agent'];
        echo "\n";        
        foreach ( $_agent as $acc => $data )
        {
            $_agent_info = getAgentData($_setting, $acc, $data, $_agent_info);
        }
        
        return $_agent_info;
    }
    
    //整理損益資訊
    function initProfitInfo ( $data )
    {    
        $charge_names = array(999, LARGE_CHARGE, MED_CHARGE, SMALL_CHARGE, MINI_CHARGE);
        
//        $_def_data = array('',0,0,0,0,0,0,0,0,0,0,0,0, '');
        $_date = date('Y-m-d');
//        $_date = '2016-10-27';
        $bad_charge_types = array();
        $info = array('agent'=>array(),'user'=>array());

        foreach ( $data as $idx => $row )
        {
            $_acc = $row['account'];
            $_profit = (int)$row['profit_loss'];
            
            if ( !isset($info['user'][$_acc]) ) {
//                $_tmp = $_def_data;
                $_tmp = array('',0,0,0,0,0,0,0,0,0,0,0,0, '');
                $_tmp[ACCOUNT]		= $_acc;
                $_tmp[USER_GROUP]	= $row['user_group'];
                $_tmp[TAX]		= 100;
                $_tmp[AMOUNT] 		= (int)$row['amount']; //交易口數
                $_tmp[PROFIT]		= $_profit;	//損益資訊
                $_tmp[CREATE_DATE] 	= $_date;
                $_tmp[TOTAL_CHARGE] 	= (int)$row['total_charge']; //總手續費
                $_tmp[PARENT_ACCOUNT]	= $row['account_head'];
                $info['user'][$_acc] = $_tmp;
            } else {
                $info['user'][$_acc][AMOUNT] += (int)$row['amount'];
                $info['user'][$_acc][TOTAL_CHARGE] += (int)$row['total_charge'];
                $info['user'][$_acc][PROFIT] += $_profit;
            }
            
            $_charge_type = (int)$row['charge_type'];

            if ( !isset($charge_names[$_charge_type]) ) {
                array_push($bad_charge_types,$row);
                continue;
//                echo "charge type not define in charge_type name. charge_type = $_charge_type\n";
//                $_charge_type = 0;
            }
            //紀錄手續費資訊
            $_charge_name = $charge_names[$_charge_type];
//            $info['user'][$_acc][$_charge_name] = (int)$row['buy_charge'] + (int)$row['sell_charge'];
            $info['user'][$_acc][$_charge_name]+= $row['amount'];
            
            //紀錄上層損益資訊
            $_agent = $row['account_head'];
            if ( !isset($info['agent'][$_agent]) ) {
                $_tmp = array('',0,0,0,0,0,0,0,0,0,0,0,0, '');
//                $_tmp = $_def_data;
                $_tmp[ACCOUNT]		= $_agent;
                $_tmp[USER_GROUP]	= 2;
                $_tmp[AMOUNT] 		= (int)$row['amount']; //交易口數
                $_tmp[PROFIT]		= $_profit;	//損益資訊
                $_tmp[CREATE_DATE] 	= $_date;
                $_tmp[$_charge_name]	= (int)$row['amount'];
                $_tmp[TOTAL_CHARGE] 	= (int)$row['total_charge']; //總手續費
                $info['agent'][$_agent] = $_tmp;
            } else {
                $_tmp = $info['agent'][$_agent];
                $_tmp[AMOUNT] 		+= (int)$row['amount'];
                $_tmp[PROFIT]		+= $_profit;
                $_tmp[TOTAL_CHARGE] 	+= (int)$row['total_charge'];
                $_tmp[$_charge_name]    += (int)$row['amount'];
                $info['agent'][$_agent] = $_tmp;
            }
        }
        
        if ( isset($bad_charge_types[0]) ) logFile('[Warring] have bad charge_type.row :'.json_encode($bad_charge_types));

        return $info;
    }
        
    if ( !isset($argv[1]) || !isset($argv[2]) ) {
        if ( isset($argv) ) 
            logFile("[Error] args not enough. argv:".json_encode($argv));
        else
            logFile("[Error] args is null.");
                
        die();
    }

    $st = $argv[1];
    $ed = $argv[2];
    $log = '';
    $db = new ModuleDB;
    $ret = getOrderData($db,$st,$ed); //取得交易資訊
    $log .= "交易資訊:".json_encode($ret) ."\n";
    $info = initProfitInfo($ret[1]); //整理玩家的損益資料
    $user_info = $info['user'];
    $log .= "玩家損益:".json_encode($user_info) ."\n";
    $agent_info = initAgentProfitInfo($db, $info);	//整理代理的損益資料
    $log .= "代理損益:".json_encode($agent_info) ."\n";
    echo $log;
    logFile($log);
    insertToDB($db, $user_info, $agent_info);
?>
