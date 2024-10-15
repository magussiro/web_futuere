<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
*   名稱:    行情模組
*   路徑:    controllers/module/Price
*   開發者:  Sean@2016/1/3
*   網址:    http://211.78.86.129/module/price
*/

//class Price extends MY_Controller
class Price extends CI_Controller
{
  function __construct()
  {
    parent::__construct();
    $this->load->model( 'base_model');
    $this->load->model( 't_product');
    // 商品資料
    $this->product = $this->t_product->getAll('*',array('is_enable'=>1));

    // 商品代碼陣列
    $this->product_code_array = array();

    if(!empty($this->product)){
      foreach($this->product as $k=>$v){
        $this->product_code_array[] = $v['code'];
	echo $v['code'].":";
	print_r($v);
	echo "\n";
        ### 寫入商品快取
        $this->cache->memcached->save('product_'.$v['code'],$v,0);
      }
    }
  }


  ### 對外 socket/API ###

  // 行情WS server
  function priceWS_8001()
  {
    // 設定行程名稱
    swoole_set_process_name("priceWS_8001");

    // 创建websocket服务器对象，监听端口: 8001
    $ws = new swoole_websocket_server("0.0.0.0",8001);

    // 监听WebSocket连接打开事件
    $ws->on('open', function ($ws, $request) {
        var_dump($request->fd, $request->get, $request->server);
    });

    // 监听WebSocket消息事件
    $ws->on('message', function ($ws, $frame) {
      $this->priceWS_process($ws, $frame);
    });

    // 监听WebSocket连接关闭事件
    $ws->on('close', function ($ws, $fd) {
        echo "client-{$fd} is closed\n";
    });

    $ws->start();
    exit;
  }

  // K 線WS server
  function kChartWS_8002()
  {
    // 設定行程名稱
    swoole_set_process_name("kChartWS_8002");

    // 创建websocket服务器对象，监听端口: 8002
    $ws = new swoole_websocket_server("0.0.0.0",8002);

    // 监听WebSocket连接打开事件
    $ws->on('open', function ($ws, $request) {
        var_dump($request->fd, $request->get, $request->server);
    });

    // 监听WebSocket消息事件
    $ws->on('message', function ($ws, $frame) {
      $this->kChartWS_process($ws, $frame);
    });

    // 监听WebSocket连接关闭事件
    $ws->on('close', function ($ws, $fd) {
        echo "client-{$fd} is closed\n";
    });

    $ws->start();
    exit;
  }

  // 行情輔助WS server
  function priceHelpWS_8003()
  {
  }


  ### 系統排程 ###

  function get_pass_socket ()
  {
//    set_time_limit(0);
    $commonProtocol = getprotobyname("tcp");
    $socket         = socket_create(AF_INET, SOCK_STREAM, $commonProtocol);
    @$connection    = socket_connect($socket,'52.192.187.45',8100);
//    $str	    = "";
    return $socket;
  }

  // 行情接收 - 連接訊源
  function price_source ( $sid=1 )
  {
    $time = time();

    switch ( $sid )
    {
        case 3 :
            $sip = '203.66.57.14';
            $sport = 9002;
            $str = "Test2:!qazxsw@";
        break;

        case 2 :
            $sip = '203.124.11.59';
            $sport = 3766;
            $str = "Test3:VFREd#&@s";
        break;

        case 1 :
        default :
            $sip = '210.71.253.19';
            $sport = 3766;
            $str = "Test2:!qazxsw@";
        break;
    }

    $f = fopen(__DIR__ . "/../../logs/source.log","a");
    $log = date("Y-m-d H:i:s") . " -- start source$sid\n";
    fwrite($f, $log);
    fclose($f);

    set_time_limit(0);

    $commonProtocol = getprotobyname("tcp");
    $socket         = socket_create(AF_INET, SOCK_STREAM, $commonProtocol);
    @$connection    = socket_connect($socket, $sip, $sport);
    //@$connection    = socket_connect($socket,'210.71.253.19',3766);
    //$str            = "Test2:!qazxsw@";
    @$send          = socket_send($socket,$str,strlen($str),0);
    $pass_socket    = null;
    
    // 行情處理
    try{
      while($out=socket_read($socket,128,PHP_NORMAL_READ)){
	if ( !$pass_socket ) $pass_socket = $this->get_pass_socket();
	
	$sned = @socket_send($pass_socket,"",0,0);
	if ( !$send ) {
		socket_close($pass_socket);
		$pass_socket = $this->get_pass_socket();
	}
	$this->price_source_process($out,$pass_socket);
	//@socket_send($pass_socket,$out,strlen($out),0);
      }

    }catch(Exception $e){
      socket_close($socket);
      exit;
    }

    exit;
  }

  //行情接收 - 訊源1
  function price_source1 ()
  {
    $this->price_source(1);
  }

  //行情接收 - 訊源3
  function price_source3 ()
  {
    $this->price_source(3);
  }

  // 行情接收 - 訊源2
  function price_source2()
  {
    $f = fopen(__DIR__ . "/../../logs/source.log","a");
    $log = date("Y-m-d H:i:s") . " -- start source2\n";
    fwrite($f, $log);
    fclose($f);

    set_time_limit(0);

    $commonProtocol = getprotobyname("tcp");
    $socket         = socket_create(AF_INET, SOCK_STREAM, $commonProtocol);
    @$connection    = socket_connect($socket,'203.124.11.59',3766);
    $str            = "Test3:VFREd#&@s";
    @$send          = socket_send($socket,$str,strlen($str),0);

    // 行情處理
    try{
      while($out=socket_read($socket,128,PHP_NORMAL_READ)){
        if ( !$pass_socket ) $pass_socket = $this->get_pass_socket();

        $sned = @socket_send($pass_socket,"",0,0);
        if ( !$send ) {
                socket_close($pass_socket);
                $pass_socket = $this->get_pass_socket();
        }

	$this->price_source_process($out, $pass_socket);
      }

    }catch(Exception $e){
      socket_close($socket);
      exit;
    }

    exit;
  }

  // K 線 - 1分鐘
  function price_kChart_1min()
  {
    // 目標時間點
    $target_time_start = date('Y-m-d H:i',strtotime('-1 minute')).':00';
    $target_time_end = date('Y-m-d H:i',strtotime('-1 minute')).':59';

    // 等行情log先寫入
    sleep(2);

    $this->price_kChart_process('t_price_kChart_1min',$target_time_start,$target_time_end);
    exit;
  }

  // K 線 - 5分鐘
  function price_kChart_5min()
  {
    // 目標時間點
    $minute = intval(date('i',time()));

    // 55~0
    if($minute>=0 && $minute<5){
      $target_time_start = date('Y-m-d H',strtotime('-1 hour')).':55:00';
      $target_time_end = date('Y-m-d H',strtotime('-1 hour')).':59:59';

    // 0~5
    }else if($minute>=5 && $minute<10){
      $target_time_start = date('Y-m-d H',time()).':00:00';
      $target_time_end = date('Y-m-d H',time()).':04:59';

    // 5~10
    }else if($minute>=10 && $minute<15){
      $target_time_start = date('Y-m-d H',time()).':05:00';
      $target_time_end = date('Y-m-d H',time()).':09:59';

    // 10~15
    }else if($minute>=15 && $minute<20){
      $target_time_start = date('Y-m-d H',time()).':10:00';
      $target_time_end = date('Y-m-d H',time()).':14:59';

    // 15~20
    }else if($minute>=20 && $minute<25){
      $target_time_start = date('Y-m-d H',time()).':15:00';
      $target_time_end = date('Y-m-d H',time()).':19:59';

    // 20~25
    }else if($minute>=25 && $minute<30){
      $target_time_start = date('Y-m-d H',time()).':20:00';
      $target_time_end = date('Y-m-d H',time()).':24:59';

    // 25~30
    }else if($minute>=30 && $minute<35){
      $target_time_start = date('Y-m-d H',time()).':25:00';
      $target_time_end = date('Y-m-d H',time()).':29:59';

    // 30~35
    }else if($minute>=35 && $minute<40){
      $target_time_start = date('Y-m-d H',time()).':30:00';
      $target_time_end = date('Y-m-d H',time()).':34:59';

    // 35~40
    }else if($minute>=40 && $minute<45){
      $target_time_start = date('Y-m-d H',time()).':35:00';
      $target_time_end = date('Y-m-d H',time()).':39:59';

    // 40~45
    }else if($minute>=45 && $minute<50){
      $target_time_start = date('Y-m-d H',time()).':40:00';
      $target_time_end = date('Y-m-d H',time()).':44:59';

    // 45~50
    }else if($minute>=50 && $minute<55){
      $target_time_start = date('Y-m-d H',time()).':45:00';
      $target_time_end = date('Y-m-d H',time()).':49:59';

    // 50~55
    }else if($minute>=55 && $minute<=59){
      $target_time_start = date('Y-m-d H',time()).':50:00';
      $target_time_end = date('Y-m-d H',time()).':54:59';
    }

    // 等行情1分鐘log先寫入
    sleep(4);

    $this->price_kChart_process('t_price_kChart_5min',$target_time_start,$target_time_end,'t_price_kChart_1min');
    exit;
  }

  // K 線 - 15分鐘
  function price_kChart_15min()
  {
    // 目標時間點
    $minute = intval(date('i',time()));

    // 45~00
    if($minute>=0 && $minute<15){
      $target_time_start = date('Y-m-d H',strtotime('-1 hour')).':45:00';
      $target_time_end = date('Y-m-d H',strtotime('-1 hour')).':59:59';

    // 00~15
    }else if($minute>=15 && $minute<30){
      $target_time_start = date('Y-m-d H',time()).':00:00';
      $target_time_end = date('Y-m-d H',time()).':14:59';

    // 15~30
    }else if($minute>=30 && $minute<45){
      $target_time_start = date('Y-m-d H',time()).':15:00';
      $target_time_end = date('Y-m-d H',time()).':29:59';

    // 30~45
    }else if($minute>=45 && $minute<=59){
      $target_time_start = date('Y-m-d H',time()).':30:00';
      $target_time_end = date('Y-m-d H',time()).':44:59';
    }

    // 等行情1分鐘log先寫入
    sleep(4);

    $this->price_kChart_process('t_price_kChart_15min',$target_time_start,$target_time_end,'t_price_kChart_1min');
    exit;
  }

  // K 線 - 30分鐘
  function price_kChart_30min()
  {
    // 目標時間點
    $minute = intval(date('i',time()));

    // 30~00
    if($minute>=0 && $minute<30){
      $target_time_start = date('Y-m-d H',strtotime('-1 hour')).':30:00';
      $target_time_end = date('Y-m-d H',strtotime('-1 hour')).':59:59';

    // 00~30
    }else if($minute>=30 && $minute<=59){
      $target_time_start = date('Y-m-d H',time()).':00:00';
      $target_time_end = date('Y-m-d H',time()).':29:59';
    }

    // 等行情1分鐘log先寫入
    sleep(4);

    $this->price_kChart_process('t_price_kChart_30min',$target_time_start,$target_time_end,'t_price_kChart_1min');
    exit;
  }

  // K 線 - 1小時
  function price_kChart_hour()
  {
    // 目標時間點
    $target_time_start = date('Y-m-d H',strtotime('-1 hour')).':00:00';
    $target_time_end = date('Y-m-d H',strtotime('-1 hour')).':59:59';

    // 等行情1分鐘log先寫入
    sleep(4);

    $this->price_kChart_process('t_price_kChart_hour',$target_time_start,$target_time_end,'t_price_kChart_1min');
    exit;
  }

  // K 線 - 日線 - 每日00:00:00執行
  function price_kChart_day()
  {
    // 目標時間點
    $target_time_start = date('Y-m-d',strtotime('-1 day')).' 00:00:00';
    $target_time_end = date('Y-m-d',strtotime('-1 day')).' 23:59:59';

    // 等行情1小時log先寫入
    sleep(6);

    $this->price_kChart_process('t_price_kChart_day',$target_time_start,$target_time_end,'t_price_kChart_hour');
    exit;
  }

  // K 線 - 週線 - 每週日00:00:00執行
  function price_kChart_week()
  {
    // 目標時間點
    $target_time_start = date('Y-m-d',strtotime('last Monday')).' 00:00:00';
    $target_time_end = date('Y-m-d',strtotime('last Saturday')).' 23:59:59';

    // 等行情日線log先寫入
    sleep(6);

    $this->price_kChart_process('t_price_kChart_week',$target_time_start,$target_time_end,'t_price_kChart_day');
    exit;
  }

  // K 線 - 月線 - 每月1日執行
  function price_kChart_month()
  {
    // 目標時間點
    $target_time_start = date('Y-m',strtotime('-1 month')).'-01 00:00:00';
    $target_time_end = date('Y-m-d',strtotime('-1 day')).' 23:59:59';

    // 等行情日線log先寫入
    sleep(6);

    $this->price_kChart_process('t_price_kChart_month',$target_time_start,$target_time_end,'t_price_kChart_day');
    exit;
  }

  // 行情快取 - 昨收盤快取 - 每分鐘執行一次
  function price_last_new()
  {
    // 星期天不執行
    if(date('w')==0){
      exit;
    }

    if(!empty($this->product)){
      foreach($this->product as $k=>$v){

        $open_time   = strtotime(date('Y-m-d').' '.$v['open_time']);
        $close_time  = strtotime(date('Y-m-d').' '.$v['close_time']);
        $now         = time();
        $target_time = '';

        // 撈取風控快取
        $risk_cache = array();
        $risk_cache = $this->cache->memcached->get('risk_'.$v['code']);

        if(!empty($risk_cache)){

          // 當日交易
          if($open_time<$close_time){

            // 盤中
            if($risk_cache['status_code']==1){
              $target_time = date('Y-m-d',strtotime('-1 Day')).' '.$v['close_time'];

              // 星期ㄧ
              if(date('w')==1){
                $target_time = date('Y-m-d',strtotime('last Friday')).' '.$v['close_time'];
              }

            // 非盤中
            }else{

              // 盤前
              if($now<$open_time){

                // 星期一
                if(date('w')==1){
                  $target_time = date('Y-m-d',strtotime('last Friday')).' '.$v['close_time'];

                // 其他交易日
                }else{
                  $target_time = date('Y-m-d',strtotime('-1 Day')).' '.$v['close_time'];
                }

              // 盤後
              }else{
                $target_time = date('Y-m-d',$now).' '.$v['close_time'];
              }
            }

          // 跨日交易
          }else{

            // 盤中
            if($risk_cache['status_code']==1){

              if(date('w')==1){
                $target_time = date('Y-m-d',strtotime('last Saturday')).' '.$v['close_time'];

              }else{
                $target_time = date('Y-m-d',strtotime('-1 Day')).' '.$v['close_time'];
              }

            // 非盤中
            }else{

              if(date(w)==6){
                $target_time = date('Y-m-d',$now).' '.$v['close_time'];

              }elseif(date(w)==1){

                // 盤前
                if($now<$open_time){
                  $target_time = date('Y-m-d',strtotime('last Saturday')).' '.$v['close_time'];

                // 盤後
                }else{
                  $target_time = date('Y-m-d',$now).' '.$v['close_time'];
                }

              }else{

                // 盤前
                if($now<$open_time){
                  $target_time = date('Y-m-d',strtotime('-1 Day')).' '.$v['close_time'];

                // 盤後
                }else{
                  $target_time = date('Y-m-d',$now).' '.$v['close_time'];
                }
              }
            }
          }

          if(!empty($target_time)){

            // 取得指定時間商品行情log
            $price_log = array();
            $price_log = $this->t_price_log->exec("SELECT new_price FROM `price_log`
                                                    WHERE price_code='".$v['price_code']."'
                                                      AND LEFT(create_date,16)='".substr($target_time,0,16)."'
                                                    ORDER BY id DESC LIMIT 0,1");

            if(!empty($price_log) && !empty($price_log[0]['new_price'])){

              $price_last_new_data = array('product_code'   => $v['code'],
                                           'last_new_price' => intval($price_log[0]['new_price']),
                                          );

              $this->cache->memcached->save('price_last_new_'.$v['code'],$price_last_new_data,0);
            }
          }
        }
      }
    }
    exit;
  }


  ### 底層方法 ###

  // 行情接收 - 行情log/行情快取
  private function price_source_process($out='',$pass_socket=null)
  {
    $data = array();
    
    if(!empty($out)){
      $this->cache->memcached->save("last_receive_time",date,120);
      $data = explode(',',$out);

      // 訊源行情頭部
      $product_code = '';

      if(in_array_quick(substr($data[1],0,2),$this->product_code_array)){
        $product_code = substr($data[1],0,2);
      }

      if(in_array_quick(substr($data[1],0,3),$this->product_code_array)){
        $product_code = substr($data[1],0,3);
      }

      // 訊源行情 - 頭部
      if(!empty($product_code)){
        if($this->is_correct_product($data[1],$product_code)){

          // 撈出商品快取
          $product_cache = $this->cache->memcached->get('product_'.$product_code);

          ### 行情log - 新增
          $insert_data = array('price_time'       => $data[0],
                               'product_code'     => $product_code,
                               'price_code'       => $data[1],
                               'name'             => $data[2],
                               'last_close_price' => number_format($data[3]/$product_cache['price_rate'],0,'',''),
                               'now_amount'       => $data[4],
                               'unoffset_amount'  => $data[5],
                               'open_price'       => number_format($data[6]/$product_cache['price_rate'],0,'',''),
                               'high_price'       => number_format($data[7]/$product_cache['price_rate'],0,'',''),
                               'low_price'        => number_format($data[8]/$product_cache['price_rate'],0,'',''),
                               'new_price'        => number_format($data[9]/$product_cache['price_rate'],0,'',''),
                               'total_amount'     => $data[10],
                               'buy_1_price'      => number_format($data[11]/$product_cache['price_rate'],0,'',''),
                               'buy_1_amount'     => $data[12],
                               'sell_1_price'     => number_format($data[13]/$product_cache['price_rate'],0,'',''),
                               'sell_1_amount'    => $data[14],
                               'number_format'    => $data[15],
                               'price_no'         => $data[16],
                               'create_date'      => now(),
                              );

          // 加權期調整
          if($product_code=='TS'){
            $insert_data['total_amount'] = round($data[10]/$product_cache['price_rate'],2);
          }

          $insert_id = $this->t_price_log->insert($insert_data);


          ### 行情log - 快取頭部資訊給尾部更新使用
          $cache_log = array('price_log_id' => $insert_id,
                             'product_code' => $product_code,
                             'price_rate'   => $product_cache['price_rate'],
                            );

          $this->cache->memcached->save($data[16],$cache_log,30);


          ### 寫入行情快取

          // 名稱/月份
          $insert_data['name']  = $product_cache['name'];
          $insert_data['month'] = intval(substr($data[1],-2));

          // 增加漲跌相關資料
          $insert_data['up_down_count'] = $insert_data['new_price']-$insert_data['last_close_price'];
          @$insert_data['up_down_rate'] = (round($insert_data['up_down_count']/$insert_data['last_close_price'],4)*100).'%';

          if($insert_data['up_down_count']>0){
            $insert_data['up_down_sign'] = '+';

          }else if($insert_data['up_down_count']<0){
            $insert_data['up_down_sign'] = '-';

          }else{
            $insert_data['up_down_sign'] = '';
          }

          $insert_data['up_down_count'] = abs($insert_data['up_down_count']);

          // 加上昨收盤
          $price_last_new_cache = array();
          $price_last_new_cache = $this->cache->memcached->get('price_last_new_'.$product_code);

          if(!empty($price_last_new_cache) && $price_last_new_cache['product_code']==$product_code){
            $insert_data = array_merge($insert_data,$price_last_new_cache);
          }

          // 加上開盤狀態/風控參數(撈風控快取)
          $risk_cache = array();
          $risk_cache = $this->cache->memcached->get('risk_'.$product_code);

          if(!empty($risk_cache) && $risk_cache['product_code']==$product_code){
            $insert_data = array_merge($insert_data,$risk_cache);
          }

          // 加上倉位數量(撈掛單快取)

          $this->cache->memcached->save('price_'.$product_code,$insert_data,0);
          
	  //
	  if ( !$pass_socket ) return;

	  $out = json_encode(array("type"=>0,"data"=>$insert_data));
	  @socket_send($pass_socket,$out,strlen($out),0);
	}

      // 訊源行情 - 尾部
      }else{

        $cache_price_log = $this->cache->memcached->get($data[0]);

        if(!empty($cache_price_log)){

          ### 行情log - 尾部更新
          $update_data = array('buy_2_price'   => round($data[3]/$cache_price_log['price_rate']),
                               'buy_2_amount'  => $data[4],
                               'buy_3_price'   => round($data[5]/$cache_price_log['price_rate']),
                               'buy_3_amount'  => $data[6],
                               'buy_4_price'   => round($data[7]/$cache_price_log['price_rate']),
                               'buy_4_amount'  => $data[8],
                               'buy_5_price'   => round($data[9]/$cache_price_log['price_rate']),
                               'buy_5_amount'  => $data[10],
                               'sell_2_price'  => round($data[11]/$cache_price_log['price_rate']),
                               'sell_2_amount' => $data[12],
                               'sell_3_price'  => round($data[13]/$cache_price_log['price_rate']),
                               'sell_3_amount' => $data[14],
                               'sell_4_price'  => round($data[15]/$cache_price_log['price_rate']),
                               'sell_4_amount' => $data[16],
                               'sell_5_price'  => round($data[17]/$cache_price_log['price_rate']),
                               'sell_5_amount' => $data[18],
                               'update_date'   => now(),
                              );

          $this->t_price_log->update($update_data,array('id'=>$cache_price_log['price_log_id']));
          //
	  if ( !$pass_socket ) return;

	  $update_data['buy_1_price'] = round($data[1]/$cache_price_log['price_rate']);
	  $update_data['buy_1_amount'] = $data[2];

	  $out = json_encode(array("type"=>1,"data"=>$update_data,"price_no"=>$data[0]));
          @socket_send($pass_socket,$out,strlen($out),0);
	}
      }
    }
  }

  // 判斷是否正確商品
  private function is_correct_product($price_code='',$product_code='')
  {
    $result = false;

    if(!empty($price_code) && !empty($product_code)){

      // 撈出商品快取
      $product_cache = $this->cache->memcached->get('product_'.$product_code);

      if(!empty($product_cache)){
        if($price_code==$product_cache['price_code']){
          $result = true;
        }
      }
    }

    return $result;
  }

  // K 線 - K線資料/K線快取
  private function price_kChart_process($model_name='',$target_time_start='',$target_time_end='',$price_from_model_name='t_price_log')
  {
    if(!empty($this->product)){
      foreach($this->product as $k=>$v){

        // 撈取風控快取(系統共用)
        $risk_cache = $this->cache->memcached->get('risk_'.$v['code']);

        // 盤中
        if($risk_cache['status_code']==1){

          switch($model_name)
          {
            case 't_price_kChart_1min':
            case 't_price_kChart_5min':
            case 't_price_kChart_15min':
            case 't_price_kChart_30min':
            case 't_price_kChart_hour':
            case 't_price_kChart_day':
            case 't_price_kChart_week':
            case 't_price_kChart_month':

              // 取得指定時間商品行情log
              $price_log = $this->$price_from_model_name->exec("SELECT * FROM `".substr($price_from_model_name,2)."`
                                                                 WHERE price_code='".$v['price_code']."'
                                                                   AND create_date>='".$target_time_start."'
                                                                   AND create_date<='".$target_time_end."'");

              if(!empty($price_log)){

                $insert_data = array('product_code' => $v['code'],
                                     'price_code'   => $v['price_code'],
                                     'name'         => $v['name'],
                                     'now_amount'   => 0,
                                     'open_price'   => 0,
                                     'high_price'   => 0,
                                     'low_price'    => 0,
                                     'new_price'    => 0,
                                     'create_date'  => $target_time_start,
                                    );


                foreach($price_log as $k1=>$v1){
                  $insert_data['now_amount'] += $v1['now_amount'];
                  $insert_data['open_price'] += $v1['open_price'];
                  $insert_data['high_price'] += $v1['high_price'];
                  $insert_data['low_price']  += $v1['low_price'];
                  $insert_data['new_price']  += $v1['new_price'];
                }

                $insert_data['open_price'] = round($insert_data['open_price']/count($price_log));
                $insert_data['high_price'] = round($insert_data['high_price']/count($price_log));
                $insert_data['low_price']  = round($insert_data['low_price']/count($price_log));
                $insert_data['new_price']  = round($insert_data['new_price']/count($price_log));

                $this->$model_name->insert($insert_data);
              }
              break;
          }

        // 非盤中
        }else{

          switch($model_name)
          {
            case 't_price_kChart_30min':
            case 't_price_kChart_hour':

              // 只記收盤前最後一小時
              if(date('H',$target_time_end)==date('H') || (intval(date('H',$target_time_end))+1)==intval(date('H'))){

                // 取得指定時間商品行情log
                $price_log = $this->$price_from_model_name->exec("SELECT * FROM `".substr($price_from_model_name,2)."`
                                                                   WHERE price_code='".$v['price_code']."'
                                                                     AND create_date>='".$target_time_start."'
                                                                     AND create_date<='".$target_time_end."'");

                if(!empty($price_log)){

                  $insert_data = array('product_code' => $v['code'],
                                       'price_code'   => $v['price_code'],
                                       'name'         => $v['name'],
                                       'now_amount'   => 0,
                                       'open_price'   => 0,
                                       'high_price'   => 0,
                                       'low_price'    => 0,
                                       'new_price'    => 0,
                                       'create_date'  => $target_time_start,
                                      );


                  foreach($price_log as $k1=>$v1){
                    $insert_data['now_amount'] += $v1['now_amount'];
                    $insert_data['open_price'] += $v1['open_price'];
                    $insert_data['high_price'] += $v1['high_price'];
                    $insert_data['low_price']  += $v1['low_price'];
                    $insert_data['new_price']  += $v1['new_price'];
                  }

                  $insert_data['open_price'] = round($insert_data['open_price']/count($price_log));
                  $insert_data['high_price'] = round($insert_data['high_price']/count($price_log));
                  $insert_data['low_price']  = round($insert_data['low_price']/count($price_log));
                  $insert_data['new_price']  = round($insert_data['new_price']/count($price_log));

                  $this->$model_name->insert($insert_data);
                }
              }
              break;

            case 't_price_kChart_day':

              // 只記禮拜天以外的時間
              if(date('w')!=1){

                // 取得指定時間商品行情log
                $price_log = $this->$price_from_model_name->exec("SELECT * FROM `".substr($price_from_model_name,2)."`
                                                                   WHERE price_code='".$v['price_code']."'
                                                                     AND create_date>='".$target_time_start."'
                                                                     AND create_date<='".$target_time_end."'");

                if(!empty($price_log)){

                  $insert_data = array('product_code' => $v['code'],
                                       'price_code'   => $v['price_code'],
                                       'name'         => $v['name'],
                                       'now_amount'   => 0,
                                       'open_price'   => 0,
                                       'high_price'   => 0,
                                       'low_price'    => 0,
                                       'new_price'    => 0,
                                       'create_date'  => $target_time_start,
                                      );


                  foreach($price_log as $k1=>$v1){
                    $insert_data['now_amount'] += $v1['now_amount'];
                    $insert_data['open_price'] += $v1['open_price'];
                    $insert_data['high_price'] += $v1['high_price'];
                    $insert_data['low_price']  += $v1['low_price'];
                    $insert_data['new_price']  += $v1['new_price'];
                  }

                  $insert_data['open_price'] = round($insert_data['open_price']/count($price_log));
                  $insert_data['high_price'] = round($insert_data['high_price']/count($price_log));
                  $insert_data['low_price']  = round($insert_data['low_price']/count($price_log));
                  $insert_data['new_price']  = round($insert_data['new_price']/count($price_log));

                  $this->$model_name->insert($insert_data);
                }
              }
              break;

            case 't_price_kChart_week':
            case 't_price_kChart_month':

              // 取得指定時間商品行情log
              $price_log = $this->$price_from_model_name->exec("SELECT * FROM `".substr($price_from_model_name,2)."`
                                                                 WHERE price_code='".$v['price_code']."'
                                                                   AND create_date>='".$target_time_start."'
                                                                   AND create_date<='".$target_time_end."'");

              if(!empty($price_log)){

                $insert_data = array('product_code' => $v['code'],
                                     'price_code'   => $v['price_code'],
                                     'name'         => $v['name'],
                                     'now_amount'   => 0,
                                     'open_price'   => 0,
                                     'high_price'   => 0,
                                     'low_price'    => 0,
                                     'new_price'    => 0,
                                     'create_date'  => $target_time_start,
                                    );


                foreach($price_log as $k1=>$v1){
                  $insert_data['now_amount'] += $v1['now_amount'];
                  $insert_data['open_price'] += $v1['open_price'];
                  $insert_data['high_price'] += $v1['high_price'];
                  $insert_data['low_price']  += $v1['low_price'];
                  $insert_data['new_price']  += $v1['new_price'];
                }

                $insert_data['open_price'] = round($insert_data['open_price']/count($price_log));
                $insert_data['high_price'] = round($insert_data['high_price']/count($price_log));
                $insert_data['low_price']  = round($insert_data['low_price']/count($price_log));
                $insert_data['new_price']  = round($insert_data['new_price']/count($price_log));

                $this->$model_name->insert($insert_data);
              }
              break;
          }
        }

        // 更新K線快取
        $model_name_tmp = explode('_',$model_name);

        $kChart_data = $this->$model_name->exec("SELECT *,'".$model_name_tmp[3]."' AS kChart_type FROM `".substr($model_name,2)."`
                                                  WHERE product_code='".$v['code']."'
                                                  ORDER BY id DESC LIMIT 0,80");

        $this->cache->memcached->save('price_kChart_'.$v['code'].'_'.$model_name_tmp[3],json_encode(array_reverse($kChart_data)),0);
      }
    }
  }

  // 行情 socket - 處理端
  private function priceWS_process($ws=null, $frame=null)
  {
    set_time_limit(0);

    while(!empty($ws) && !empty($frame)){
      $price_data = array();

      // 檢查帳密
      if($frame->data!='price:future!QAZ2wsx'){
        $ws->push($frame->fd,'-1');exit;
      }

      if(!empty($this->product)){
        foreach($this->product as $k=>$v){

          $price_data[$v['code']] = array();

          // 撈取行情快取
          $price_cache = array();
          $price_cache = $this->cache->memcached->get('price_'.$v['code']);

          if(!empty($price_cache) && $price_cache['product_code']==$v['code']){
            $price_data[$v['code']] = $price_cache;
          }
        }
      }

      // 傳到前台
      $ws->push($frame->fd,json_encode($price_data));

      // 每0.1秒一跳
      usleep(100000);
    }
    exit;
  }

  // K 線 socket - 處理端
  private function kChartWS_process($ws=null, $frame=null)
  {
    set_time_limit(0);

    while(!empty($ws) && !empty($frame)){

      // 檢查帳密
      // 範例: kChart:future!QAZ2wsx:TX:1min
      $frame_data = explode(':',$frame->data);

      if(empty($frame_data) || ($frame_data[0].':'.$frame_data[1])!='kChart:future!QAZ2wsx'){
        $ws->push($frame->fd,'-1');exit;
      }

      // 取得K線快取
      $kChart_data = array();
      $kChart_data = $this->cache->memcached->get('price_kChart_'.$frame_data[2].'_'.$frame_data[3]);

      // 傳到前台
      $ws->push($frame->fd,$kChart_data);

      // 每1秒一跳
      usleep(1000000);
    }
    exit;
  }
  ### 底層方法 end ###
}
