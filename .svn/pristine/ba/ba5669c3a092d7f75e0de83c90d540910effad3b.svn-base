
	function quasarSelector(){

        var config ={
            container           : $('#widgetCalendar'),
            jsRenderer          : $.templates('#tmplOption'),
            masterData          : [{"value":"2","name":"\u660e\u66dc\u65d7\u8266\u9928"},{"value":"3","name":"\u660e\u9928"}],
            secondaryData       : [{"value":"1","name":"Cycle"},{"value":"3","name":"Barre"},{"value":"2","name":"Yoga"}],
            lastData            : [{"value":"15","name":"SHIRLYN","group_id":"2"},{"value":"17","name":"SUMMER","group_id":"2"}],
            masterId            : 'location_id',
            secondaryId         : 'category_id',
            lastId              : 'staff_id',
            dependendId         : 'staff_id',
            controlId           : 'location_id'
        }; 

        var masterSelector;
        var secondarySelector;
        var lastSelector;
        var controlSelector;
        var dependendSelector;

	    var comboSelector = {
	    	init : function(settings){
	            $.extend( config, settings );
	            masterSelector     = config.container.find('[name=' + config.masterId + ']');
	   	        secondarySelector  = config.container.find('[name=' + config.secondaryId + ']');
	            lastSelector       = config.container.find('[name=' + config.lastId + ']');
                controlSelector    = config.container.find('[name=' + config.controlId + ']');
                dependendSelector  = config.container.find('[name=' + config.dependendId + ']');

	       	    comboSelector.setup();
            },
            setup : function(){
              	//選單初始化
                
               	masterSelector.html( config.jsRenderer.render( config.masterData ) ).selectpicker('refresh');
             	secondarySelector.append(config.jsRenderer.render({value:'', name:'ALL'}))
                    .append( config.jsRenderer.render( config.secondaryData ) ).selectpicker('refresh');
                lastSelector.append( config.jsRenderer.render({value:'', name:'ALL'}))
                    .append( config.jsRenderer.render( config.lastData) ).selectpicker('refresh');

                 //controlSelector 變換時, 要控制可選的 dependendSelector
                controlSelector.on('change', function() {
                	var val = controlSelector.selectpicker('val');

                    if (val == ''){
                        dependendSelector.find('option').prop('disabled', false);
                    }else{
                        dependendSelector.find('option').prop('disabled', true);
                        dependendSelector.find('option[data-group_id=' + val + ']').prop('disabled', false);
                        dependendSelector.find('option[data-group_id=""]').prop('disabled', false);
                    }

                    dependendSelector.selectpicker('val', '');
                    dependendSelector.selectpicker('refresh');            
                });

                controlSelector.change();
            },
            getSelectorParams : function(){

            	var param = {};
                param[config.masterId] = masterSelector.selectpicker('val');
		        param[config.secondaryId] = [secondarySelector.selectpicker('val')],
		        param[config.lastId] = lastSelector.selectpicker('val')
	            return param;

            },
            onChange : function(callback){
                    var changeString = '[name='+config.masterId+'], [name='+config.secondaryId+'], [name="'+config.lastId+'"]';
                    config.container.on('change', changeString , function() {        
                        var param = comboSelector.getSelectorParams();
                        callback(param);
                });
            }

	    };
	    return comboSelector;
	}

    /*******************
     *      日曆區      *
     *******************/
    function quasarCalendar( $, moment ){	
       /****************
        *   常數定義    *
        ***************/
        var STATUS_OPEN = 'open';
        var STATUS_NOT_OPEN = 'not_open';
        var STATUS_CLOSE = 'close';
        var STATUS_STOP = 'stop';
        var STATUS_FULL = 'full';
        var STATUS_WAITING = 'waiting';
        var STATUS_IN_CLASS = 'in_class';

        var calendar;
		var config;
        var calendarDefaultSetting = {
            lazyFetching: false,
            overlap:true,
            header  : {
                left: 'title ',
                center: '',
                right: 'prev,next'
            },
            titleFormat: "MMM DD, YYYY",
            firstDay: 1,
            allDaySlot  : false,
            minTime         : "06:30:00",
            slotDuration    : "00:15:00", // 時間區間
            maxTime         : "23:30:00",
            height          : 600,
            contentHeight   : 600,
            lang            : 'zh-tw',
            selectable  : false,    // 點選日曆上的反應
            selectHelper: false,    // 即時顯示，目前選取的範圍
            editable: false,
            eventConstraint: {
                start: "06:30",
                end: "23:30"
            },
            eventDurationEditable: false,              
            droppable: false,
            defaultTimedEventDuration: '01:00:00',         
        };

        var init = function( settings, calendarSetting ){
        	config = {
        		// apiGetClassScheduleList : "",
	            // location_id : widgetCalendar.find('[name=location_id]').selectpicker('val'),
	            // category_id : [widgetCalendar.find('[name=category_id]').selectpicker('val')],
	            // staff_id    : widgetCalendar.find('[name=staff_id]').selectpicker('val')
                // rawParamForApi : {            
                //     start_time: start_time,
                //     end_time: end_time,
                //     location_id: config.location_id,
                //     category_id: config.category_id,
                //     staff_id: config.staff_id
                // }
                getEventTitle : function (tmp,class_status){
                    var resultString = tmp.category_name + '\n' + tmp.class_name + '\n' + tmp.staff_name;
                    return resultString;
                }
            };    	
	        $.extend( config, settings );
            $.extend(calendarDefaultSetting, calendarSetting);

        	calendar = $('#widgetCalendar').find('.calendar');
        	initCalendar();
        };
        var refresh = function (params){
            $.extend( config, {rawParamForApi:params} );
            initCalendar();
            calendar.fullCalendar('refetchEvents');
        };
        // var getEventObject = function (id) {
        //     return calendar.fullCalendar('clientEvents', function(evt) {
        //         return evt.json.class_schedule_id === id;
        //     })[0];
        // };
       
        var getColor = function (id) {
            var arrColor = ['default', 'danger', 'success', 'warning', 'info', 'primary'];
            return arrColor[ id % arrColor.length ];
        };


        var getCurrentWeekParamForApi = function(param) {
        	var calendarView = calendar.fullCalendar('getView');
            var current_week = calendarView.start.format('w');
            var start_time = moment(current_week, 'w').day(1).format('YYYY-MM-DD 00:00:00');
            var end_time = moment(current_week, 'w').day(7).format('YYYY-MM-DD 23:59:59');

            param['start_time']  = start_time;
            param['end_time']    = end_time;

            
            if (!param.room_id) {
                delete param.room_id;
            }
            
            if ( ( typeof param.category == 'object' ) && param.category_id[0] == '') {
                delete param.category_id;

            }
            if (!param.membership_id) {
                delete param.membership_id;
            }

            return param;
        };
        // var getEventByAjax = function(start, end, timezone, callback) {
        // 	var apiParam = getCurrentWeekParamForApi();
        //     $.ajax({
        //         url: config.apiGetClassScheduleList,
        //         dataType: 'json',
        //         data: apiParam,
        //         success: function(json) {
        //             if( json.error) {
        //                 error(json.message);
        //                 return false;
        //             }

        //             var events = buildEventsArray(json.data);
        //             callback(events);
        //         }
        //     });
        // };

        var buildEventsArray = function (data){
        	var events = [];
	        for(var key in data) {
	            var tmp = data[key];
	            
	            var class_status = '';
	            switch(tmp.class_status) {
	                case STATUS_OPEN:
	                class_status = '開放預約中';
	                break;
	                
	                case STATUS_NOT_OPEN:
	                class_status = '未開放預約';
	                break;
	                
	                case STATUS_FULL:
	                class_status = '已額滿';
	                break;
	                
	                case STATUS_WAITING:
	                class_status = '候補中';
	                break;
	                
	                case STATUS_STOP:
	                class_status = '已停課';
	                break;
	                
	                case STATUS_CLOSE:
	                class_status = '結束';
	                break;
	                
	                case STATUS_IN_CLASS:
	                class_status = '已開課';
	                break;
	            }

	            events.push({
	                start : moment(tmp.start_time, 'YYYY-MM-DD HH:mm:ss').format(),
	                end : moment(tmp.end_time, 'YYYY-MM-DD HH:mm:ss').format(),
	                className : 'bg-' + getColor(tmp.category_id),
	                title: config.getEventTitle(tmp,class_status),
	                overlap:true,
                    //color : getEventColor(tmp.category_id),
	                json: tmp
	            });
	        }
	        return events;
        };
        var calendarEventClickHandler = function(eventObject) {         
            if (eventObject.json.state == 'stop') {
                error('本課程已停課');
                return;
            }

            if (config.account) {
                act(config.apiFetchClass, {account:config.account, class_schedule_id:eventObject.json.class_schedule_id}, function(json) {
                    if ( json.error) {
                        error(json.message);
                        return false;
                    }
                    location.href = gotoBookClass + '&account=' + config.account + '&class_schedule_id=' + eventObject.json.class_schedule_id;                        
                });
            }
            else {
                location.href = config.gotoBookClass + '&class_schedule_id=' + eventObject.json.class_schedule_id;

            }
        };
        var getEventColor = function (id) {
            var arrColor = ['#337ab7',  '#5cb85c', '#d9534f','#f0ad4e', '#5bc0de', '#5bc0de'];
            return arrColor[ id % arrColor.length ];
        };

        var initCalendar = function(){
	        //日曆初始化
            calendarDefaultSetting.events= function(start, end, timezone, callback) {
                var ms = start;
                $.ajax({
                    url: config.apiGetClassScheduleList,
                    dataType: 'json',
                    data: getCurrentWeekParamForApi(config.rawParamForApi),
                    success: function(json) {
                        if( json.error) {
                            error(json.message);
                            return false;
                        }
                        var events = buildEventsArray(json.data);
                        callback(events);
                    }
                });
            };    
            calendarDefaultSetting.eventClick = function(eventObject) {     
                calendarEventClickHandler(eventObject);  
            };

	        calendar.fullCalendar(calendarDefaultSetting);

	        // 設定顯示方式 月(month)、周(agendaWeek or basicWeek )、日(agendaDay or basicDay)
	        calendar.fullCalendar('changeView', 'agendaWeek');
        };
        var publicObj = {
			//public functions
			init : init,
            refresh : refresh
        };
       
        return publicObj;
    };
            /**************
         *   會員區    *
         **************/
    function quasarMemberSearch(){

        var config;
        var jsRenderer;
        var widgetMember;
        var jsRenderer;  
        var account;     
        var modalCancel;
        var gotoCurrentPage;
        var MEMBERSHIP_TYPE;
        var member_id;
        //取得會集
        var apiFetchMembership;

        var init = function setting( settings ){
            config = {
                widgetMember    : $('#widgetMember'),
                jsRenderer      : $.templates('#tmplMembership'),
                account         : getUrlParameter('account'),
                gotoCurrentPage : "#",//'<?php echo $gotoCurrentPage;?>',
                //apiFetchMembership :'<?php echo $apiFetchMembership;?>';
                membership_type : 'classes',
            };      
            $.extend( config, settings );
            widgetMember    = config.widgetMember;
            jsRenderer      = config.jsRenderer;
            account         = config.account;
            modalCancel     = $('#modalCancel');
            gotoCurrentPage = config.gotoCurrentPage;
            apiFetchMembership = config.apiFetchMembership;
            MEMBERSHIP_TYPE = config.membership_type;

            //初始化時 如果有帶參數要直接打開
            if (account) {
                refresh(account);
            }
            else {
                widgetMember.find('.member_data').hide();
            }
            setupEvents();

        };
        var setupEvents = function(){
            //按下查詢
            widgetMember.on('click', '.btn-search', function() {
                location.href = gotoCurrentPage + '&account=' + widgetMember.find('[name=account]').val();
            });
            //按下取消
            widgetMember.on('click', '.btn-cancel', function() {
               location.href = gotoCurrentPage;
            });
            //按下 Enter 時, 要幫他查詢
             widgetMember.on('keydown', '[name=account]', function(e) {
                 if (e.keyCode == 13) {
                     widgetMember.find('.btn-search').click();
                     e.preventDefault();
                 }
             });
            widgetMember.on('click', '.btn-cancel-book', function() {
                 var _strHtml = $(this).closest('.book').find('.class-info').html();
                 modalCancel.find('.class-info').html( _strHtml );
                 modalCancel.find('.btn-save').attr('data-book_id', $(this).attr('data-book_id'));
             });
                    //按下取消預約/取消候補
             modalCancel.on('click', '.btn-save', function() {
                act(apiCancelBook, {book_id: $(this).attr('data-book_id')}, function(json) {
                    if ( json.error) {
                        error(json.message);
                        return false;
                    }
                    
                    success(json.message);                
                    refresh(account);
                    modalCancel.modal('hide');
                });
             });
        };

        /**
         * 整頁的資訊更新
         */
        var refresh =function(_account) {
            act(apiFetchMembership, {account: _account, membership_type:MEMBERSHIP_TYPE}, function(json) {
                if ( json.error) {
                    error(json.message);
                    account = '';
                    member_id = '';
                    widgetMember.find('.member_data').hide();
                    //getClassScheduleReserved();
                    return false;
                }
                
                member_id = json.account.member_id;
                
                //套用會員基本資料
                widgetMember.find('.member_src').attr('src', json.account.src);
                widgetMember.find('.member_name').html(json.account.member_name);
                widgetMember.find('.member_no').html(json.account.member_no);
                widgetMember.find('.phone').html(json.account.member_phone);
                
                //資料套版前處理
                for(var key in json.data) {
                    var tmp = json.data[key];
                    for(var key2 in tmp.book) {
                        var tmp2 = tmp.book[key2];                    
                        tmp2.start_time = moment(tmp2.start_time).format('MM-DD ddd HH:mm');
                    }
                }

                //套用會藉
                widgetMember.find('.membership_list').html('')
                    .append( jsRenderer.render( json.data ) );

                widgetMember.find('.member_data').show();
                
                // //更新日曆
                // calendar.fullCalendar('refetchEvents');
            });
        };

        var publicObj ={
            init: init
        };
        return publicObj;

    }