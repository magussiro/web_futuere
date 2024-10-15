<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class chart extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('model_user_config');
        $this->load->model('model_product');
        $this->load->model('model_operation');
        $this->load->model('model_DataTableList');
        $this->load->model('model_advice_type');
        $this->load->driver('cache');
    }

    public function data() {
        $product_code = $this->input->get_post('product_code', TRUE);
        $date = $this->input->get_post('date', TRUE);
    }

    //預設k線圖
    public function index() {
        $type = 0;
        $type = $this->input->get('type');
        if ($type == null) {
            $type = 0;
        }

        $product_code = $this->input->get_post('product_code', TRUE);
        $this->load->view('chart/new_stock', array("code" => $product_code, "type" => $type));
        return;
        $mapData = array();
        $usr = $_SESSION['end_user'];
        $product_code = $this->input->get_post('product_code', TRUE);

        $sql = 'select * from product where  code = \'' . $product_code . '\'';
        $product = $this->mydb->queryRow($sql);
        //var_dump($product);
        $mapData['name'] = $product['name'];


        $path = '/var/www/dev_future/application/logs/' . $product_code . '.txt';
        $file = fopen($path, "r");
        if (!$file) {
            $mapData['msg'] = 'no file';
            //$this->View('chart/stock', $mapData); 
        } else {

            $arrDate = array();
            $allData = array();
            $i = 0;
            while (!feof($file)) {
                $value = fgets($file);
                $json = json_decode($value, true);

                $date1 = date('Y-m-d');
                if (!isset($json['create_date'])) {
                    continue;
                }


                $priceData = array();
                $priceData[] = strtotime($json['create_date']); //date('Y-m-d', strtotime($json['create_date']));
                $priceData[] = $json['open_price'] / 100;   //開盤價
                $priceData[] = $json['open_price'] / 100;   //開盤價
                $priceData[] = $json['high_price'] / 100;   //最高
                $priceData[] = $json['low_price'] / 100;     //最低
                $priceData[] = $json['now_amount']; //總量

                $allData[] = $priceData;

                $i++;
            }
            $mapData['msg'] = 'success';
            $mapData['data'] = $allData;
            $mapData['type'] = $type;
            fclose($file);
        }
        $this->load->view('chart/stock', $mapData);
    }

    private function getNowPrice($product_code) {

        $file_path = __DIR__ . "/../config/cache.php";
        //echo "include file:$file_path\n";
        $config = include($file_path);
        $host = $config['memcached'][0]['host'];
        $port = $config['memcached'][0]['port'];
        $memcache2 = new memcached();
        $memcache2->setOption(Memcached::OPT_SERIALIZER, Memcached::SERIALIZER_PHP);
        $memcache2->addServer($host, $port);



//取得所有商品，memcached最後的價位


        $cache = $memcache2->get("price_$product_code");
        $cache = $cache[0];
        $money = $cache['new_price'];
        return $money;
    }

    public function immediate_load() {
        $product_code = $this->input->get_post('code', TRUE);

        $money = $this->getNowPrice($product_code);

        $allData[$product_code] = $money;

        echo json_encode($allData, JSON_UNESCAPED_SLASHES);
    }

    public function datalist() {
        //ini_set("display_errors", 1);
        /* */
        $uri = 'mongodb://mongofire:52F6C04E8E959D8C64A11496B92AD239@192.168.10.12:27567/admin';
        $manager = new MongoDB\Driver\Manager($uri);

        //date_default_timezone_set('Asia/Taipei');
        $product_code = $this->input->get_post('product_code', TRUE);
        $date = $this->input->get_post('date', TRUE);
        $type = $this->input->get_post('type', TRUE);
        $output = $this->input->get_post('output', TRUE);


        //正式機要拿掉 by magus
//        $memcache2->setOption(Memcached::OPT_SERIALIZER, Memcached::SERIALIZER_PHP);
        //正式機要拿掉 by magus

        if ($product_code == '') {
            $product_code = 'CIF';
        }



        //$filter = ['_id' => $_id1];
        //   ini_set("display_errors", 1);
//        var_dump($date);
        // var_dump($type);
        if ($type == '') {

            $type = '1';
        }
//die;
//        $list = array();
//
//        $cnt = 1;
//        $ext = '1';
//
        // var_dump($type);
        date_default_timezone_set('Asia/Taipei');
        $datetime = date("Y-m-d");

        $dates = date("s");

        $date_time = $this->input->get_post('dt_time');
        $date_end = $this->input->get_post('ed_time');

//        var_dump($date_end);

        $limit = 500;

        if (empty($date_time)) {
            //var_dump($date_time);
//            if (empty($date_time)) {
//                $date_m = date("Y-m-d");
//                $date_time = $date_m . ' 00:00:00 ';
//            }
//            if (empty($date_end)) {
//                $end_m = date("Y-m-d");
//                $date_end = $end_m . ' 24:59:59 ';
//            }
            $date_m = date("Y-m-d");
            $datetime = $date_m . ' 24:59:59 ';
            if ($type == '1') {
                $cnt = 2;
                $ext = '1';
                if ($this->input->get_post('chart_type', TRUE) == 'line') {
                    $date = new DateTime($this->input->get_post('dt'));
                    $cnt = intval($this->input->get_post('days'));
                }

                if (!empty($date)) {
                    //$filter = ['create_time' => ['$lte' => "$datetime"]];
                    if (date("H") < 6) {
                        $y_day = date("Y-m-d", strtotime("-1 day"));
                    } else {
                        $y_day = date("Y-m-d");
                    }

                    if ($product_code == 'TX') {
                        $y_time = "8:45";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 300) {
                            $limit = 300;
                        }
                    } else if ($product_code == 'TE') {
                        $y_time = "8:45";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 300) {
                            $limit = 300;
                        }
                    } else if ($product_code == 'TF') {
                        $y_time = "8:45";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 300) {
                            $limit = 300;
                        }
                    } else if ($product_code == 'HSI') {
                        $y_time = "9:15";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 375) {
                            $limit = 375;
                        }
                    } else if ($product_code == 'NKN') {
                        $y_time = "7:45";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 405) {
                            $limit = 405;
                        }
                    } else if ($product_code == 'CIF') {
                        $y_time = "9:30";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 240) {
                            $limit = 240;
                        }
                    } else if ($product_code == 'EC') {
                        $y_time = "7:00";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }
                    } else if ($product_code == 'DAX') {
                        $y_time = "15:00";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 840) {
                            $limit = 840;
                        }
                    } else if ($product_code == 'YM') {
                        $y_time = "7:00";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }
                    } else if ($product_code == 'NQ') {
                        $y_time = "7:00";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 1335) {
                            $limit = 1335;
                        }
                    } else if ($product_code == 'CL') {
                        $y_time = "7:00";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 1335) {
                            $limit = 1335;
                        }
                    } else if ($product_code == 'SI') {
                        $y_time = "7:00";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 1335) {
                            $limit = 1335;
                        }
                    } else if ($product_code == 'GC') {
                        $y_time = "7:00";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 1335) {
                            $limit = 1335;
                        }
                    } else if ($product_code == 'TTX') {
                        $y_time = "8:45";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }

                        if ($limit > 1140) {
                            $limit = 1335;
                        }
                    } else if ($product_code == 'TXA') {
                        $y_time = "8:45";
                        $limit = (strtotime(date('Y-m-d H:i')) - strtotime($y_day . $y_time) ) / 60;
                        if ($limit < 0) {
                            $limit = 100;
                        }
                        if ($limit > 1140) {
                            $limit = 1140;
                        }
                    }
                    $date_s = date("Y-m-d");
                    $date_s = $date_s . ' 00:00:00';
                    $date_e = date("Y-m-d H:i:s");
                    //    var_dump($date_s);
                    //     var_dump($date_e);
                    // $filter = ['create_time' => ['$gte' => "$date_s", '$lte' => "$date_e"]];
                    //var_dump($y_day . $y_time);
                    if($y_time < 10)
                    {
                        $y_time = '0'.$y_time;
                    }
                    $tmp_date = $y_day .' '. $y_time.':00';
                   // var_dump($tmp_date);
                    $filter = ['create_time' => ['$gte' => "$tmp_date"]];
                    $options = [
                        'pretty',
                        // 'projection' => ['new_price' => true,'high_price' => true,'low_price' => true,'total_amount' => true,'close_price' => true,'create_time' => true],
                        'sort' => ['create_time' => -1],
                        'limit' => $limit,
                    ];
                    $query = new MongoDB\Driver\Query($filter, $options);
                    $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '1', $query);
                    //       var_dump($rows);
                } else {
                    $filter = ['create_time' => ['$lte' => "$datetime"]];
                    $options = [
                        'pretty',
                        'sort' => ['create_time' => -1],
                        'limit' => $limit,
                    ];
                    $query = new MongoDB\Driver\Query($filter, $options);
                    $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '1', $query);
                }
            }
            if ($type == '3') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$lte' => "$datetime"]];
                //      $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                    'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '3', $query);
            }
            if ($type == '5') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$lte' => "$datetime"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                    'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '5', $query);
            }
            if ($type == '10') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$lte' => "$datetime"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                    'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '10', $query);
            }
            if ($type == '15') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$lte' => "$datetime"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                    'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '15', $query);
            }
            if ($type == '30') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$lte' => "$datetime"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                    'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '30', $query);
            }
            if ($type == '60') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$lte' => "$datetime"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                    'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '60', $query);
            }
            if ($type == 'd') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d");
                $datetime = date("Y-m-d", strtotime("$datetime +1 day"));
                $filter = ['create_time' => ['$lte' => "$datetime"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                    'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.daily_' . $product_code, $query);
            }
            if ($type == 'w') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d");
                $datetime = date("Y-m-d", strtotime("$datetime +1 day"));
                $filter = ['create_time' => ['$lte' => "$datetime"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                    'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.week_' . $product_code, $query);
            }
            if ($type == 'y') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d");
                $datetime = date("Y-m-d", strtotime("$datetime +1 day"));
                $filter = ['create_time' => ['$lte' => "$datetime"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                    'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.month_' . $product_code, $query);
            }
            $money = $this->getNowPrice($product_code);
            $allData = array();
            if ($output == 'table') {
                echo '<pre>';
                print_r($list);
                echo('</pre>');
                $icount = 0;
                if (!empty($rows)) {

                    foreach ($rows as $key => $value) {
                        $priceData = new stdClass;
                        //$priceData->create_date = $value->create_time;
//                        $priceData->create_time = $value->create_time; // strtotime($json['create_time']); //date('Y-m-d', strtotime($json['create_date']));
//                        $priceData->new_price = (int) $value->new_price;   //開盤價
//                        $priceData->high_price = (int) $value->high_price;   //最高
//                        $priceData->low_price = (int) $value->low_price;     //最低
//                        $priceData->close_price = (int) $value->close_price;   //開盤價
//                        $priceData->total_amount = $value->total_amount; //總量
                        $priceData->ti = $value->create_time; // strtotime($json['create_time']); //date('Y-m-d', strtotime($json['create_date']));
                        $priceData->n = (int) $value->new_price;   //開盤價
                        $priceData->h = (int) $value->high_price;   //最高
                        $priceData->l = (int) $value->low_price;     //最低
                        $priceData->c = (int) $value->close_price;   //開盤價
                        $priceData->t = $value->total_amount; //總量                        
                        //新的價位20180111
                        $priceData->newext_price = $money; //新的價位20180111
                        $allData[] = $priceData;
                    }
                }
                if (count($allData) > 0) {
                    echo '<style>';
                    echo 'table, th, td {';
                    echo 'border: 1px solid black;';
                    echo 'border-collapse: collapse;';
                    echo '}';
                    echo 'th, td {';
                    echo 'padding: 5px;';
                    echo 'text-align: right;';
                    echo '}';
                    echo '</style>';

                    echo '<table border=1 padding=0 ><thead>';
                    echo '<th>idx</th>';
                    echo '<th>create_date</th>';
                    echo '<th>create_time</th>';
                    echo '<th>new_price</th>';
                    echo '<th>high_price</th>';
                    echo '<th>low_price</th>';
                    echo '<th>close_price</th>';
                    echo '<th>total_amount</th>';
                    echo '</thead>';
                    echo '<tbody>';

                    foreach ($allData as $key => $value) {
                        // if (($value->idx >=800) and ($type=='1'))
                        // {
                        //   break;
                        // }
                        echo '<tr>';
                        echo '<td>' . $value->idx . '</td>';
                        echo '<td>' . $value->create_date . '</td>';
                        echo '<td>' . $value->create_time . '</td>';
                        echo '<td>' . $new_price . '</td>';
                        echo '<td>' . $high_price . '</td>';
                        echo '<td>' . $low_price . '</td>';
                        echo '<td>' . $close_price . '</td>';
                        echo '<td>' . $value->total_amount . '</td>';
                        echo '</tr>';
                    }
                    echo '</tbody>';
                    echo '</table>';
                    echo '<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>';
                }
                return;
            }

            $icount = 0;
            // var_dump(count($rows));
            foreach ($rows as $key => $value) {
                $priceData = new stdClass;
                $priceData->ti = $value->create_time; // strtotime($json['create_time']); //date('Y-m-d', strtotime($json['create_date']));
                $priceData->n = (int) $value->new_price;   //開盤價
                $priceData->h = (int) $value->high_price;   //最高
                $priceData->l = (int) $value->low_price;     //最低
                $priceData->c = (int) $value->close_price;   //開盤價
                $priceData->t = $value->total_amount; //總量         
                //新的價位20180111
                $priceData->newext_price = $money; //新的價位20180111
                $priceData_tmp[] = $priceData;
            }
            if (!empty($priceData_tmp)) {
                $allData['priceData'] = $priceData_tmp;
                $allData['datetime'] = $dates;
                //                 echo json_encode($allData);
                echo json_encode($allData, JSON_UNESCAPED_SLASHES);
            }
        } else {


            if ($type == '1') {
                $cnt = 2;
                $ext = '1';
                if ($this->input->get_post('chart_type', TRUE) == 'line') {
                    $date = new DateTime($this->input->get_post('dt'));
                    $cnt = intval($this->input->get_post('days'));
                }
                // var_dump($date_time);
                $filter = ['create_time' => ['$gte' => "$date_time", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        //'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);

                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '1', $query);
            }
            if ($type == '3') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
//            $filter = ['create_time' => ['$lte' => "$datetime"]];
                $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        //'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '3', $query);
            }
            if ($type == '5') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        //'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '5', $query);
            }
            if ($type == '10') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        //'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '10', $query);
            }
            if ($type == '15') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        //'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '15', $query);
            }
            if ($type == '30') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        //'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '30', $query);
            }
            if ($type == '60') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d H:i:s");
                $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        //'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.amount_price_' . $product_code . '60', $query);
            }
            if ($type == 'd') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d");
                $datetime = date("Y-m-d", strtotime("$datetime +1 day"));
                $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        //  'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.daily_' . $product_code, $query);
            }
            if ($type == 'w') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d");
                $datetime = date("Y-m-d", strtotime("$datetime +1 day"));
                $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        // 'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.week_' . $product_code, $query);
            }
            if ($type == 'y') {
                date_default_timezone_set('Asia/Taipei');
                $datetime = date("Y-m-d");
                $datetime = date("Y-m-d", strtotime("$datetime +1 day"));
                $filter = ['create_time' => ['$gte' => "$datetime", '$lte' => "$date_end"]];
                $options = [
                    'pretty',
                    'sort' => ['create_time' => -1],
                        // 'limit' => $limit,
                ];
                $query = new MongoDB\Driver\Query($filter, $options);
                $rows = $manager->executeQuery('amount_price.month_' . $product_code, $query);
            }
            $money = $this->getNowPrice($product_code);
            $allData = array();
            if ($output == 'table') {
                echo '<pre>';
                print_r($list);
                echo('</pre>');
                $icount = 0;
                if (!empty($rows)) {

                    foreach ($rows as $key => $value) {
                        $priceData = new stdClass;
                        //$priceData->create_date = (string) $value->create_time;
//                        $priceData->create_time = (string) $value->create_time; // strtotime($json['create_time']); //date('Y-m-d', strtotime($json['create_date']));
//                        $priceData->new_price = (int) $value->new_price;   //開盤價
//                        $priceData->high_price = (int) $value->high_price;   //最高
//                        $priceData->low_price = (int) $value->low_price;     //最低
//                        $priceData->close_price = (int) $value->close_price;   //開盤價
//                        $priceData->total_amount = $value->total_amount; //總量
//                                                $priceData->create_time = (string) $value->create_time; // strtotime($json['create_time']); //date('Y-m-d', strtotime($json['create_date']));
//                        $priceData->new_price = (int) $value->new_price;   //開盤價
//                        $priceData->high_price = (int) $value->high_price;   //最高
//                        $priceData->low_price = (int) $value->low_price;     //最低
//                        $priceData->close_price = (int) $value->close_price;   //開盤價
//                        $priceData->total_amount = $value->total_amount; //總量
//                                                $priceData->c = $value->create_time; // strtotime($json['create_time']); //date('Y-m-d', strtotime($json['create_date']));
                        $priceData->n = (int) $value->new_price;   //開盤價
                        $priceData->h = (int) $value->high_price;   //最高
                        $priceData->l = (int) $value->low_price;     //最低
                        $priceData->c = (int) $value->close_price;   //開盤價
                        $priceData->t = $value->total_amount; //總量         
                        //新的價位20180111
                        $priceData->newext_price = $money; //新的價位20180111
                        $allData[] = $priceData;
                    }
                }
                if (count($allData) > 0) {
                    echo '<style>';
                    echo 'table, th, td {';
                    echo 'border: 1px solid black;';
                    echo 'border-collapse: collapse;';
                    echo '}';
                    echo 'th, td {';
                    echo 'padding: 5px;';
                    echo 'text-align: right;';
                    echo '}';
                    echo '</style>';

                    echo '<table border=1 padding=0 ><thead>';
                    echo '<th>idx</th>';
                    echo '<th>create_date</th>';
                    echo '<th>create_time</th>';
                    echo '<th>new_price</th>';
                    echo '<th>high_price</th>';
                    echo '<th>low_price</th>';
                    echo '<th>close_price</th>';
                    echo '<th>total_amount</th>';
                    echo '</thead>';
                    echo '<tbody>';

                    foreach ($allData as $key => $value) {
                        // if (($value->idx >=800) and ($type=='1'))
                        // {
                        //   break;
                        // }
                        echo '<tr>';
                        echo '<td>' . $value->idx . '</td>';
                        echo '<td>' . $value->create_date . '</td>';
                        echo '<td>' . $value->create_time . '</td>';
                        echo '<td>' . $new_price . '</td>';
                        echo '<td>' . $high_price . '</td>';
                        echo '<td>' . $low_price . '</td>';
                        echo '<td>' . $close_price . '</td>';
                        echo '<td>' . $value->total_amount . '</td>';
                        echo '</tr>';
                    }
                    echo '</tbody>';
                    echo '</table>';
                    echo '<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>';
                }
                return;
            }

            $icount = 0;
            // var_dump(count($rows));
            //$priceData_tmp = [];
            foreach ($rows as $key => $value) {
                $priceData = new stdClass;
                $priceData->ti = $value->create_time; // strtotime($json['create_time']); //date('Y-m-d', strtotime($json['create_date']));
                $priceData->n = (int) $value->new_price;   //開盤價
                $priceData->h = (int) $value->high_price;   //最高
                $priceData->l = (int) $value->low_price;     //最低
                $priceData->c = (int) $value->close_price;   //開盤價
                $priceData->t = $value->total_amount; //總量         
                //新的價位20180111
                $priceData->newext_price = $money; //新的價位20180111
                // $allData[] =  [$priceData];
                $priceData_tmp[] = $priceData;
            }
            $allData['priceData'] = $priceData_tmp;
            $allData['datetime'] = $dates;
            // echo json_encode($allData);
            echo json_encode($allData, JSON_UNESCAPED_SLASHES);
        }
    }

}
