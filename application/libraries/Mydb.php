<?php
class Mydb {
	private $_query_message_pattern;//query 錯誤訊息
	var $link			= null;		//mysql link
	var $query_history	= array();	//Debug 模式記錄的語法
	var $store_rows		= array();	//累計筆數
	
	/**
     * main
     * 
     * @param string $encoding utf8 etc..
     * @param string $timezone DB timezone for queries 
     * 
     * @return null 
     */
	public function __construct($setting = false)
    {  
    	// Set time zone
        $timezone = '+8:00'; //'Asia/Taipei'
        $encoding = "utf8";
        
    	if (!$setting) {
    		//載入資料庫設定
    		$CI =& get_instance();
    		$CI->load->database();
        	$this->link = new mysqli($CI->db->hostname, $CI->db->username, $CI->db->password, $CI->db->database);
		}
		else {
			//connect db
        	$this->link = new mysqli($setting['hostname'], $setting['username'], $setting['password'], $setting['database']);
        }
        
        //default setting
		if (isset($setting['encoding'])) {
			$encoding = $setting['encoding'];
		}
		if (isset($setting['timezone'])) {
			$timezone = $setting['timezone']; 
		}

        $this->_query_message_pattern = '%s; sql statement(%s)';
        // Throw an error if the connection fails
        if ($this->link->connect_error) {
        	$full_message = sprintf('error no: %d; message: %s', mysqli_connect_errno(), mysqli_connect_error());
			throw new Exception('Cannot connect to db' . $full_message); 
        }

        // Throw an error if charset loading fails 
        if (!$this->link->set_charset($encoding)) {
            $full_message = sprintf('error no: %d; message: %s', mysqli_connect_errno(), mysqli_connect_error());
			throw new Exception('Cannot connect to db' . $full_message); 
        };
		
        // Set time zone
        $this->query("SET time_zone = '$timezone' ");
	}
	
    /**
     * Changes the database we want to use
     * 
     * @param string $db_name The database to switch to
     * 
     * @return null
     */
    function selectDB($db_name)
    {
        $return = $this->link->select_db($db_name);
        if (!$return) {
        	$full_message = sprintf('error no: %d; message: %s', $this->link->errno, $this->link->error);
			throw new Exception('Unknown database' . $full_message); 
        }
    }
    
    /**
     * 有一些情境, 用 multi_query 才可以執行
     */
    public function multi_query($stmt) {
        $sql    = $this->buildSql($stmt, func_get_args());
        $rs     = $this->link->multi_query($sql);
        $err    = $this->link->error;

		//free result
		while($this->link->next_result()) {;}

        if ($err !== '') {
        	 $full_message = sprintf($this->_query_message_pattern, $err, $sql);
		}
		
        //TODO 確認功用
        // development environment sometimes wants to show all queries executed
        if ((isset($_GET['debug']) === true && $_GET['debug'] === 'db')) {
            $this->query_history[] = $sql;
        }
	    return $rs;
    }
    
    /**
     * Prepare the SQL statement and execute the query on the database. 
     * 
     * @param string $sql The statement to execute
     * 
     * @return object Result Set
     */
    public function query($sql)
    {
        $rs     = $this->link->query($sql);
        $err    = $this->link->error;
        if ($err !== '') {
        	 $full_message = sprintf($this->_query_message_pattern, $err, $sql);
        }
        
        // development environment sometimes wants to show all queries executed
        if ((isset($_GET['debug']) === true && $_GET['debug'] === 'db')) {
            $this->query_history[] = $sql;
        }
            
        return $rs;
    }
    
    /**
     * Prepare the SQL statement and execute the query on the database, telling
     * it to return one column of a single row.
     * 
     * @param string $stmt The statement to execute
     * 
     * @return mixed|boolean
     */
    function queryItem($stmt)
    {
        $sql    = $this->buildSql($stmt, func_get_args());
        $rs     = $this->query($sql . ' LIMIT 1');
        
        $res = $rs->fetch_row();
        
        return $res[0];
    }
    
    /**
     * Prepare the SQL statement and execute the query on the database, telling
     * it to return one single row.
     *
     * The database will return a resultset which be transformed into an array
     * corresponding to the fetched row, or false if there are no rows in the resultset.
     * 
     * @param string $stmt The statement to execute
     * 
     * @return array|boolean
     */
    function queryRow($stmt)
    {
        $sql    = $this->buildSql($stmt, func_get_args());
        $rs     = $this->query($sql . ' LIMIT 1');
        if (!$rs) {
			return false;
		}
        $arr = array();
        if ($a = $rs->fetch_array(MYSQLI_ASSOC)) {
            $arr = $a;
        }
        
        return $arr;
    }
    
    /**
     * Prepare the SQL statement and execute the query on the database.

     * The database will return a resultset, which will be transformed into an
     * array corresponding to all fetched rows.
     * 
     * @param string $stmt The statement to execute
     * 
     * @return array of results
     */
    function queryArray($stmt)
    {
        $sql    = $this->buildSql($stmt, func_get_args());
        $rs     = $this->query($sql);
		if (!$rs) {
			return false;
		}
        $arr = array();
        for ($arr = array(); $a = $rs->fetch_array(MYSQLI_ASSOC);) {
            $arr[] = $a;
        }
        
        return $arr;
    }
    
    /**
     * Prepare the SQL statement and execute the query on the database.
     *
     * The database will return a resultset. The function will then get the
     * value of $key for every row, and use this value as keys of the returned 
     * array's elements.
     *
     * @param string $key  The key in the resultset that contains the values
     *                     that will be used as keys of the returned associative array.
     * @param string $stmt The statement to execute
     * 
     * @return array of results
     */
	function queryHash($key, $stmt)
    {
        /* Compose SQL */
        $args       = func_get_args();
        $argsCount  = count($args);
        $a          = explode('?', $stmt);
        
        /* Skip the first two args: $key and $stmt */
        for ($i = 2; $i < $argsCount; $i++) {
            $a[$i - 2] .= "'" . $this->escape($args[$i]) . "'";
        }
        $sql    = implode('', $a);
        
        $rs     = $this->query($sql);
        if (!$rs) {
			return false;
		}
        $arr = array();
        for ($arr = array(); $a = $rs->fetch_array(MYSQLI_ASSOC);) {
            $arr[strval($a[$key])] = $a;
        }
        
        return $arr;
    }
    /**
     * Execute an INSERT statement to a database table.
     *
     * @param string $stmt The statement to execute
     * 
     * @return ID of FALSE
     */
    function insert($stmt)
    {
        $sql    = $this->buildSql($stmt, func_get_args());
		$this->query($sql);
        
        $id = $this->link->insert_id;
        return (!$id) ? false :$id;        
    }
    
    /**
     * Insert or update a row in a database table.
     * 
     * @param string $table   The database table we want to insert a row
     * @param array  $map     The map of the field values and their keys
     * @param bool   $replace Execute a replace query instead of an insert
     * 
     * @return integer The value of the AUTO_INCREMENT field that was updated
     */
    function insertRow($table, $map, $replace = false)
    {
        $fields = array();
        $values = array();
        $updateSql = '';
        foreach ($map as $field => $value) {
            $fields[] = $field;
            $val = $this->escape($value);
            $values[] = $val;
            $updateSql .= "$field='$val',";
        }
        //remove last comma
        $updateSql = substr($updateSql, 0, -1);

        $sql = "INSERT INTO `$table` (`" . implode('`,`', $fields) . "`) VALUES ('" .implode("','", $values). "')";
        $sql .= $replace? ' ON DUPLICATE KEY UPDATE ' . $updateSql: '';    

        $this->query($sql);

        $id = $this->link->insert_id;
        if (!$id) {
            // TODO no affect rows will return this
            return false;
        }

        return $id;
    }
    
    /**
     * Execute an UPDATE statement to a database table.
     *
     * @param string $stmt The statement to execute
     * 
     * @return integet Number of affected rows
     */
    function update($stmt)
    {
		$sql    = $this->buildSql($stmt, func_get_args());
		$this->query($sql);
        return $this->link->affected_rows;
    }

    /**
     * Execute an UPDATE statement to a database table.
     *
     * @param string $table - table name
     * @param array  $map   - values to be updated
     * @param string $where - where clause
     * 
     * @return integet Number of affected rows
     */
    function updateRow($table, $map, $where = '')
    {
        $fields = array();
        $values = array();
        $sql = "UPDATE $table SET ";
        foreach ($map as $field => $value) {
            $sql .= "`$field`='" . $this->escape($value) . "', ";
        }

        $sql = substr($sql, 0, -2) . ($where? " WHERE $where" : "");
        //var_dump($sql);
        $this->query($sql);
        return $this->link->affected_rows;
    }
    

    /**
     * Close database connection.
     *
     * @return null  
     */
    function close()
    {
        // Kill the connection thread
        $thread_id = $this->link->thread_id;
        $this->link->kill($thread_id);

        // Close connection
        $this->link->close();
        unset($this->link);
    }
    
    /** Transactions begin
     * 
     * @return null
     */
    function begin()
    {
        $this->link->query('BEGIN');
    }
    
    /** Transactions commit
     * 
     * @return null
     */
    function commit()
    {
        $this->link->query('COMMIT');
    }
    
    /** Transactions rollback
     * 
     * @return null
     */
    function rollback()
    {
        $this->link->query('ROLLBACK');
    }
    
    /**
     * equiv to mysql_result()
     * 
     * @param resource $result - result
     * @param int      $row    - row number
     * @param string   $field  - field name or index
     * 
     * @return value
     */
    function result($result, $row, $field)
    { 
        if ($result->num_rows==0) {
            return 'unknown';
        } 
        $result->data_seek($row);
        $ceva = $result->fetch_assoc(); 
        $rasp = $ceva[$field]; 
        return $rasp; 
    }
    
    /**
     * Prepare the SQL statement by replacing parameter placeholders with
     * their corresponding sanitized values.
     *
     * @param string $stmt The SQL statement
     * @param string $args args to add to the statement
     * 
     * @return The generated statement
     */
    function buildSql($stmt, $args = null)
    {
        // Construct SQL 
        $argsCount  = count($args);
        $a          = explode('?', $stmt);
            
        for ($i = 1; $i < $argsCount; $i ++) {
            $a[$i - 1] .= "'" . mysqli_real_escape_string($this->link, $args[$i]) . "'";
        }
        
        return implode('', $a);
    }

    /**
     * escape - Escape special character in a string.
     * 
     * @param string $string String to be escaped.
     *
     * @access public
     * @return string
     */
    function escape($string)
    {
        return $this->link->real_escape_string($string);
    }
    
	/**
	 * 大量異動資料	- 初始化設定
	 * 最大筆數數	= $perRow * $limitRows
	 * 
	 * @param string $table		- 資料表名稱
	 * @param string $field		- 資料欄位
	 * @param string $perRow	- 一次執行資料筆數
	 * @param string $limitRows	- 產生多少次
	 * @param string $store		- 執行sql目標
	 *
	 * @access public
	 * @return string
	 */
	function storeInit($table, $field, $perRow = 1000, $limitRows = 1, $store = 'default') {
		$this->store_table[$store]		= $table;
		$this->store_field[$store]		= $field;
		$this->store_perRow[$store]		= $perRow; //一次執行資料筆數
		$this->store_limitRows[$store]	= $limitRows; //產生多少次
	}
	
	/**
	 * 大量異動資料	- 填寫內容
	 * 
	 * @param string $row		- HashArray( 'key目前無作用'=> '值', ...)
	 *
	 * @access public
	 * @return string
	 */
	function storeAddRow($row, $store ='default') {
		$rowsSize = count($this->store_rows[$store]);	//目前執行次數
		$lastQueryIndex = $rowsSize - 1;

		//第一次使用或一個 row 以滿了
		if ( $rowsSize == 0) {
			$this->store_rows[$store][] = array();
			$lastQueryIndex++;
		} 
		else if ( count($this->store_rows[$store][ $lastQueryIndex ]) == $this->store_perRow[$store] ) {
			$this->store_rows[] = array();	
			$lastQueryIndex++;
		}
		
		//always push data in last row		
		$this->store_rows[$store][ $lastQueryIndex ][] = $row;

		//detect to flush
		if (count($this->store_rows[$store]) ==  $this->store_limitRows[$store]) {
			if ( count($this->store_rows[$store][$lastQueryIndex]) == $this->store_limitRows[$store]) {
				return $this->storeFlush();
			}
		}
		return true;
	}
	
	/**
	 * 執行SQL 並清除SQL暫存
	 * 
	 * @param string $store		- 執行sql目標
	 *
	 * @access public
	 * @return string
	 */
	function storeFlush($store ='default') {
		$sql = '';
		foreach($this->store_rows[$store] as $row) {
			$sql .= 'INSERT IGNORE INTO `'.$this->store_table[$store].'` (`' . implode('`,`', $this->store_field[$store]) . '`) VALUES ';
			foreach($row as $elements) {
				$sql .= '(';
				foreach($elements as $value) {
					$sql .= "'" . $this->escape($value) . "',";
				}
				$sql = substr($sql, 0, -1) . '),';	
			}
			$sql = substr($sql, 0, -1) . ';';
		}
		$this->store_rows[$store] = array();
		$bool	= $this->link->multi_query($sql);
		while($this->link->next_result()) {;}
		
		return $bool;
	}
}