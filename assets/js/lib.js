//溢出 html
function escapeHtml(string) {
    return string.replace(/"/g, '&quot;');
}


/**
 * 取得 GET 變數
 * @param string sParam - 變數名字
 */
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}          

/* 對指定容器下的所有有 .verify 的 tag 做驗證 */
$.fn.verify = function() {
    var boolValidate = true;
    this.find('.verify').each(function() {
        if ( !$(this)._verify() ) {
            boolValidate = false;
            error( $(this).data('verify_message'));
            return false;
        }
    });
    
    return boolValidate;
}

/* 在 form 觸發 submit 事件時做驗證 */
$.fn.formVerify = function() {
    this.on('submit', function(e) {
        var boolValidate = true;
        $(this).find('.verify').each(function() {
            if ( !$(this)._verify() ) {
                boolValidate = false;
                error( $(this).data('verify_message'));
                return false;
            }
        });
        
        if (!boolValidate) {            
            e.preventDefault();
            return false;
        }
    });
};        

$.fn._verify = function() {
    var boolValidate = true;
    if ( this.data('verify_not_null') ) {
        if ( this.hasClass('.selectpicker') ) {
            if ( !this.selectpicker('val') ) {
                boolValidate = false;
            }
        }
        else if (this.is('[type=radio]')) {
            var name = this.attr('name');
            var val = $('[type=radio][name=' + name + ']:checked').val();
            if ( !val ) {
                boolValidate = false;
            }
        }
        else {
            if ( !this.val() ) {
                boolValidate = false;
            }
        } 
    }
    
    if ( this.data('verify_not_zero')) {
        if ( this.hasClass('.selectpicker') ) {
            if ( this.selectpicker('val') == '0') {
                boolValidate = false;
            }
        }
        else {
            if ( this.val() == '0' ) {
                boolValidate = false;
            }
        } 
    }
    
    if ( this.data('verify_type') ) {
        var type = this.data('verify_type');
        if ( this.hasClass('.selectpicker') ) {
            if ( !verify(this.selectpicker('val'), type)) {
                boolValidate = false;
            }
        }
        else {
            if ( !verify( this.val(), type) ) {
                boolValidate = false;
            }
        } 
    }
    
        
    return boolValidate;
}



/**
 * 設定 css 顯示
 */
$.fn.visible = function() {
    return this.css('visibility', 'visible');
};

/**
 * 設定 css 不顯示
 */
$.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

/**
 * 設定 css 顯示切換
 */
$.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

/**
 * 取得隨機顏色, 範圍限定為 bootstrap 系列的色碼
 *
 * @param array exclude - 要排除的顏色
 */
function getRandomColor(exclude) {
    var colors = ['default', 'danger', 'info', 'warning', 'success', 'inverse', 'primary'];
    
    if (exclude) {
        var tmpColors = [];
        for(var i = 0; i < colors.length; i++) {    
            if ( exclude.indexOf(colors[i]) == -1 ) {
                tmpColors.push(colors[i]);
            }
        }        
    }
    else {
        tmpColors = colors;
    }
    
    
    return tmpColors[Math.floor((Math.random() * tmpColors.length))];
}     


/**
 * 清掉 object 或是 array 的 key, 如同 php 中的 array_values
 */
function array_values(input) {
  //  discuss at: http://phpjs.org/functions/array_values/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
  //   returns 1: {0: 'Kevin', 1: 'van Zonneveld'}

  var tmp_arr = [],
    key = '';

  if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    return input.values();
  }

  for (key in input) {
    tmp_arr[tmp_arr.length] = input[key];
  }

  return tmp_arr;
}




function success(msg) {
    if (!msg) {
        msg = '成功';
    }
    Messenger().post({ message: msg, type: 'success' });                        
}

function error(msg) {
    if (!msg) {
        msg = '失敗';
    }
    Messenger().post({ message: msg, type: 'error' });            
}


/**
 * lightblue-bootstrap data
 */
function initDataTables() {
    /* Set the defaults for DataTables initialisation */
    $.extend( true, $.fn.dataTable.defaults, {
        "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-6'i><'col-md-12'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        }
    } );


    /* Default class modification */
    $.extend( $.fn.dataTableExt.oStdClasses, {
        "sWrapper": "dataTables_wrapper form-inline"
    } );


    /* API method to get paging information */
    $.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
    {
        return {
            "iStart":         oSettings._iDisplayStart,
            "iEnd":           oSettings.fnDisplayEnd(),
            "iLength":        oSettings._iDisplayLength,
            "iTotal":         oSettings.fnRecordsTotal(),
            "iFilteredTotal": oSettings.fnRecordsDisplay(),
            "iPage":          oSettings._iDisplayLength === -1 ?
                0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
            "iTotalPages":    oSettings._iDisplayLength === -1 ?
                0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
        };
    };


    /* Bootstrap style pagination control */
    $.extend( $.fn.dataTableExt.oPagination, {
        "bootstrap": {
            "fnInit": function( oSettings, nPaging, fnDraw ) {
                var oLang = oSettings.oLanguage.oPaginate;
                var fnClickHandler = function ( e ) {
                    e.preventDefault();
                    if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
                        fnDraw( oSettings );
                    }
                };

                $(nPaging).append(
                    '<ul class="pagination no-margin">'+
                    '<li class="prev disabled"><a href="#">'+oLang.sPrevious+'</a></li>'+
                    '<li class="next disabled"><a href="#">'+oLang.sNext+'</a></li>'+
                    '</ul>'
                );
                var els = $('a', nPaging);
                $(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
                $(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
            },

            "fnUpdate": function ( oSettings, fnDraw ) {
                var iListLength = 5;
                var oPaging = oSettings.oInstance.fnPagingInfo();
                var an = oSettings.aanFeatures.p;
                var i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

                if ( oPaging.iTotalPages < iListLength) {
                    iStart = 1;
                    iEnd = oPaging.iTotalPages;
                }
                else if ( oPaging.iPage <= iHalf ) {
                    iStart = 1;
                    iEnd = iListLength;
                } else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
                    iStart = oPaging.iTotalPages - iListLength + 1;
                    iEnd = oPaging.iTotalPages;
                } else {
                    iStart = oPaging.iPage - iHalf + 1;
                    iEnd = iStart + iListLength - 1;
                }

                for ( i=0, ien=an.length ; i<ien ; i++ ) {
                    // Remove the middle elements
                    $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                    // Add the new list items and their event handlers
                    for ( j=iStart ; j<=iEnd ; j++ ) {
                        sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
                        $('<li '+sClass+'><a href="#">'+j+'</a></li>')
                            .insertBefore( $('li:last', an[i])[0] )
                            .bind('click', function (e) {
                                e.preventDefault();
                                oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
                                fnDraw( oSettings );
                            } );
                    }

                    // Add / remove disabled classes from the static elements
                    if ( oPaging.iPage === 0 ) {
                        $('li:first', an[i]).addClass('disabled');
                    } else {
                        $('li:first', an[i]).removeClass('disabled');
                    }

                    if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
                        $('li:last', an[i]).addClass('disabled');
                    } else {
                        $('li:last', an[i]).removeClass('disabled');
                    }
                }
            }
        }
    } );


    $(".dataTables_length select").selectpicker({
        width: 'auto'
    });
}


/**
 *  驗證資料格式
 *
 * @param string content- 物件
 * @param string type	- 類型
 * 
 * @return bool TRUE or FALSE 
 */
function verify(content, type)
{
	//是否中文
	var verify_name		= /^[\u4e00-\u9fa5]+$/;
	var verify_phone	= /^[0-9]{8,10}$/;
	var verify_phone2   = /^[\d\+\-\#]+$/;
	var	verify_post		= /^[0-9]{3,5}$/;
	var	verify_birth	= /^\d{2}[/]\d{2}[/]\d{2}$/;
	var verify_email	= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
	var verify_symbol   = /^[^$%\^]+$/;
	var verify_eng_num  = /^\w+$/;
	var verify_positive_integer   = /^\d+$/;
	var verify_positive_float = /^\d+(\.\d+)?$/;
	var verify_date     = /^\d{4}-\d{2}-\d{2}$/;
	var verify_eng      = /^[a-zA-Z\s]+$/;
	var verify_num      = /^\d+$/;
	var verify_ip      = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;  

	if (type == 'eng_and_num') {
		return content.match(/^\w+$/) && content.match(/\d/) && content.match(/[a-zA-Z]/);
	}

	if (type == 'not_null' ) {
		if (content != '' ) {
			return true;
		}
		else {
			return false;
		}
	}

	eval( 'var result = verify_' + type + '.test(content);' );

	return result;
};
/**
 *  驗證資料格式
 *
 * @param string content- 物件
 * @param string type	- 類型
 * 
 * @return bool TRUE or FALSE 
 */
function ckpassword(content1, content2)
{
	var verify_pw_length	= /^\w{7,24}$/;
	var verify_pw			= /^[a-zA-Z]\w{7,24}$/; //只能輸入由數字、26 個英文字母或者下劃線組成的字符串
	if(content1 == ""){
		return	'null';
	}
	
	if(content1 != content2){
		return	'equal';
	}
	
	if(!verify_pw_length.test(content1)){
		return	'length';
	}
	
	if(!verify_pw.test(content1)){
		return	'format';
	}
	return true;
};


function htmlEncode(value) {
	return $('<div/>').text(value).html();
}

function htmlDecode(value) {
	return $('<div/>').html(value).text();
}

/*
 * Error code
 * -99 : system busy
 * -1  : no session
 * 0   : success
 * 1   : loging failed
 */
function act(action, data, success, format, async, session_timeout) {
	async		= async && true;
	format	= format || 'json'; //xml, json, script, or html
	//data.XDEBUG_SESSION_START = 'ECLIPSE_DBGP';
	
	if ('jsonp' == format) {
		action	+= '&callback=?';
	}
	
	$.ajax({
		url		: action,
		type	: 'post',
		data	: data,
		dataType: format,
		async	: async,
		cache	: false,	//防止抓到 API 舊資料
		crossDomain: true,	//可跨網域
		success	: function(json) {
		if (json && json.error == -99) {
                if ( typeof console != 'undefined') {
                    console.log(json);
                }
				//console && console.log(json);
				alert('System busy! Please try again later!');
				return;
			}
			
			//成功的狀態
			success && success(json);
		},
		error	: function(xhr, msg) {
            if ( typeof console != 'undefined') {
                console.log(xhr.responseText);
            }
			// 連線發生錯誤狀態
			// 1. 手機沒有連線狀態
			// 2. 無法連接伺服器
			if (device.Android()) {
				android.onError();
			} else if (device.iOS()) {
				window.location = 'objc://onError';
			}
		}
	});
}

//判斷裝置
var device = {
	Android	: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry : function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS : function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera : function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows : function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any : function() {
		return (device.Android() || device.BlackBerry() || device.iOS() || device.Opera() || device.Windows());
	}
};


/** 偵測 Object 的長度 **/
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 * 跳出確認視窗
 */
function _confirm (message, opt){
	opt = opt || {};
	
	//original type
	if( confirm( message) ) {
		opt.ok_callback && opt.ok_callback();
	}
	else {
		opt.cancel_callback && opt.cancel_callback();		
	}	
}

/**
 * 跳出警告視窗
 */
function _alert(message, opt) {
	opt = opt || {};

	//original
	alert( message);
	opt.callback && opt.callback();
}

/**
 * 轉換訊息
 */
function _pnotify(error, title, msg) {
	var obj = {};
	obj.title	= title;
	obj.text	= msg;
	obj.delay	= 1000; //效果持續時間(預設一秒)
	if (error == 0) {
		obj.type	= 'success';
	} 
	else if (error < 0) {
		obj.type	= 'info';
	}
	else {
		obj.type	= 'error';
	}
	
	return obj;
}



/*
 * 將 unix timestamp 轉成 yyyy-mm-dd hh:ii:ss
 */
function unix2ts(unix_timestamp, format) {
	format = format || 'Y-m-d H:i:s';
	var date = new Date(unix_timestamp * 1000);
	if (0 >= date) {
		return '';	
	}
	date['year'] = date.getFullYear();
	date['month'] = date.getMonth() + 1;
	date['date'] = date.getDate();
	date['hour'] = date.getHours();
	date['minute'] = date.getMinutes();
	date['second'] = date.getSeconds();

	var clone = date;
	for(var key in clone) {
		if ( clone[key] < 10) {
			date[key] = '0' + clone[key];
		}
	}
	if ('Y-m-d H:i' == format) {
		return date['year'] + '-' + date['month'] + '-' + date['date'] + ' ' + date['hour'] + ':' + date['minute'];	
	}
	else if ('Y-m-d' == format) {
		return date['year'] + '-' + date['month'] + '-' + date['date'];	
	}
	
	return date['year'] + '-' + date['month'] + '-' + date['date'] + ' ' + date['hour'] + ':' + date['minute'] + ':' + date['second'];
	
}


/*
 * 取得今天的日期
 */
function getToday() {
	var date = new Date();
	date['year'] = date.getFullYear();
	date['month'] = date.getMonth() + 1;
	date['date'] = date.getDate();
	
	var clone = date;
	for(var key in clone) {
		if ( clone[key] < 10) {
			date[key] = '0' + clone[key];
		}
	}

	return date['year'] + '-' + date['month'] + '-' + date['date'];
}


$(function() {
    /**
     * 修正 bootstrap 再使用 modal 時會發生的錯誤
     */
	$.fn.modal.Constructor.prototype.enforceFocus = function () {
	    modal_this = this
	    $(document).on('focusin.modal', function (e) {
	        if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
	        // add whatever conditions you need here:
	        &&
	        !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select') && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')) {
	            modal_this.$element.focus()
	        }
	    })
	};
	
    /**
     * 圖片先縮小到適當的大小, 置中後, 裁減掉多餘的部份(圖片需至於父容器內, 裁減的範圍參考父容器)
     */
    $.fn.imgCenter = function(callback) {
        return this.each(function(index, row) {
            var img = $(this);
            var _img = new Image();
    
            //圖片載入完成後, 要重新調整圖片大小並置中
            _img.onload = function() {

                var targetHeight = img.parent().height();        
                var targetWidth = img.parent().width();
                var realWidth = this.width;
                var realHeight = this.height;

                //先將圖片縮小, 依長或寬較小的一邊為準, 等比例縮到與容器差不多大
                if ( realWidth > realHeight ) {
                    var ratio = realHeight / targetHeight;
                    var height = targetHeight;
                    var offset_y = 0;
    
                    var width = realWidth / ratio;
                    var offset_x = (width - targetWidth) / 2 * -1;
                }
                else {
                    var ratio = realWidth / targetWidth;
                    var width = targetWidth;
                    var offset_x = 0;
                    
                    var height = realHeight / ratio;
                    var offset_y = (height - targetHeight) / 2 * -1;
                }
    
                //再放大回適當的大小
                var sourceWidth = width;
                var sourceHeight = height;
                if (realWidth > realHeight) {
                    if (sourceWidth < targetWidth) {
                        var ratio = sourceWidth / targetWidth;
                        var width = targetWidth;
                        var offset_x = 0;
                        
                        var height = sourceHeight / ratio;
                        var offset_y = (height - targetHeight) / 2 * -1;
                    }
                }            
                else {
                    if (sourceHeight < targetHeight) {
                        var ratio = sourceHeight / targetHeight;
                        var height = targetHeight;
                        var offset_y = 0;
                        
                        var width = sourceWidth / ratio;
                        var offset_x = (width - targetWidth) / 2 * -1;
                    }                
                }
                
                //將修改後的大小套回原本的 img
                img.css({
                    width: width,
                    height: height,
                    marginLeft: offset_x,
                    marginTop: offset_y
                });
                
                callback && callback(img);
            };
        
            //啟動計算
            _img.src = img.attr('src');     
        });
    }
    
	/* serialize 成物件 */
	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};


	/**
	 * 是否支援 CSS3 
	 */
	$.hasCSS3 = function() {
		if ( $.browser.msie && $.browser.version < 10 ) {
			return false;
		}
		
		return true;
	}



	/**
	 * 使用 animate.css 播放 CSS 動畫
	 */
	$.fn.playEffect = function(effect, opt) {
		var me = $(this);

		//NOTICE for unsupport css3 browser
		if ( !$.hasCSS3() ) {
			//NOTICE IE8 cannot use regular style
			if ( typeof(opt.callback) == 'function' ) {
				opt.callback();
			}
			return;
		}

		var setting = {
			duration: 450,
			callback: null,
			count: 1
		}

		var _setting = $.extend(setting, opt, true);

		var vendor_prefix = [ '-moz-', '-ms-', '-webkit-', '-o-' ];
		var css = {
			"animation-duration": ( _setting.duration / 1000) + 's',
			"animation-delay"   : '0s',
			"animation-iteration-count" : _setting.count
		};

		for(var i = 0; i < vendor_prefix.length; i++) {
			css[ vendor_prefix[i] + 'animation-duration' ] = ( _setting.duration / 1000) + 's';
			css[ vendor_prefix[i] + 'animation-delay' ] = '0s';
			css[ vendor_prefix[i] + 'animation-iteration-count' ] = _setting.count;
		}
		
		me.css( css ).addClass('animated ' + effect).data('last_effect', effect);

		me.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
			me.removeClass( me.data('last_effect') ).removeClass('animated').data('last_effect');
			_setting.callback && _setting.callback();
		});

		return me;
	}

	/**
	 * 增加取得 outerHTML 的方法
	 */
	$.fn.extend({
		outerHTML: function(htmlString)
		{
			if (htmlString) {
				return this.replaceWith(htmlString);
			}
	
			if ('outerHTML' in this[0]) {
				return this[0].outerHTML;
			}
	
			return (function(element) {
				var attrs = element.attributes,
				i = 0,
				n = attrs.length,
				name = element.nodeName.toLowerCase(),
				attrlist = '';
	
				for (; i != n; ++i) {
					attrlist += ' ' + attrs[i].name + '="' + attrs[i].value + '"';
				}
				return '<' + name + attrlist + '>' + element.innerHTML + '</' + name + '>';
			}(this[0]));
		}
	});

});

/**
 * 將數字加入千分位逗號
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//在當前的 colorbox 視窗加入標題到下方 */
function setColorboxTitle(html) {
    var _top = $('#colorbox').css('top');
    var _left = $('#colorbox').css('left');
    var _width = $('#colorbox').css('width');
    var _height = $('#colorbox').css('height');
    
    var top = parseInt(_top.slice(0, -2)) + parseInt(_height.slice(0, -2));
    var left = parseInt(_left.slice(0, -2));
    
    $('#colorbox').after('<div id="colorboxTitle" style="z-index:999999;color:white;font-size: 14px;position:absolute; left:' + left + 'px; top:' + top + 'px; width:' + _width + '; word-wrap: break-word;">' + html + '</div>');
    
}


//bootstrap3 editor
$(function() {
	$.ezWysihtml5Templates	= {
        "emphasis": function(argument) {},
		"image": function(argument) {},
		"html": function(argument) { },
		"font-styles": function(argument) { },
		"lists": function(argument) { },
		//"link": function(argument) { },
		"image": function(argument) { },
		//"color": function(argument) { },
		"blockquote": function(argument) { },
		"size": function(argument) { },
	},

    $.noticeWysihtml5Templates = {
        "emphasis": function(argument) {
            var locale = argument.locale,
                options = argument.options,
                size = (options.toolbar && options.toolbar.size) ? ' btn-'+options.toolbar.size : '';
            return "<li>" +
                "<div class='btn-group'>" +
                "<a class='btn btn-default btn-" + size + "' data-wysihtml5-command='bold' title='CTRL+B' tabindex='-1'><i class='glyphicon glyphicon-bold'></i></a>" +
                "<a class='btn btn-default btn-" + size + "' data-wysihtml5-command='italic' title='CTRL+I' tabindex='-1'><i class='glyphicon glyphicon-italic'></i></a>" +
                "</div>" +
                "</li>";
        },
        "link": function(argument){},
        "image": function(argument){},
        "blockquote": function(argument) { },
        "html": function(argument) {
            var locale = argument.locale,
                options = argument.options,
                size = (options.toolbar && options.toolbar.size) ? ' btn-'+options.toolbar.size : '';
            return "<li>" +
                "<div class='btn-group'>" +
                "<a class='btn btn-default btn-" + size + "' data-wysihtml5-action='change_view' title='" + locale.html.edit + "' tabindex='-1'><i class='fa fa-pencil'></i></a>" +
                "</div>" +
                "</li>";
        }
    };

    $.bs3Wysihtml5Templates = {
        "emphasis": function(argument) {
            var locale = argument.locale,
                options = argument.options,
                size = (options.toolbar && options.toolbar.size) ? ' btn-'+options.toolbar.size : '';
            return "<li>" +
                "<div class='btn-group'>" +
                "<a class='btn btn-default btn-" + size + "' data-wysihtml5-command='bold' title='CTRL+B' tabindex='-1'><i class='glyphicon glyphicon-bold'></i></a>" +
                "<a class='btn btn-default btn-" + size + "' data-wysihtml5-command='italic' title='CTRL+I' tabindex='-1'><i class='glyphicon glyphicon-italic'></i></a>" +
                "</div>" +
                "</li>";
        },
        "link": function(argument) {
            var locale = argument.locale,
                options = argument.options,
                size = (options.toolbar && options.toolbar.size) ? ' btn-'+options.toolbar.size : '';
            return "<li>" +
                "<a class=\"btn btn-sm btn-transparent btn-default\" data-wysihtml5-command=\"createLink\" title=\"Insert link\" tabindex=\"-1\" href=\"javascript:;\" unselectable=\"on\">\
            <span class=\"glyphicon glyphicon-share\"></span>\
            </a>\
            <div class=\"bootstrap-wysihtml5-insert-link-modal modal fade\" data-wysihtml5-dialog=\"createLink\">\
            <div class=\"modal-dialog \">\
                <div class=\"modal-content\">\
                    <div class=\"modal-header\">\
                        <a class=\"close\" data-dismiss=\"modal\">×</a>\
                        <h3>Insert link</h3>\
                    </div>\
                    <div class=\"modal-body\">\
                        <div class=\"form-group no-margin\">\
                            <input value=\"http://\" class=\"bootstrap-wysihtml5-insert-link-url form-control bg-gray-lighter\" data-wysihtml5-dialog-field=\"href\" data-parsley-id=\"7677\"><ul class=\"parsley-errors-list\" id=\"parsley-id-7677\"></ul>\
                            </div>\
                            <br>\
                            <div class=\"checkbox mt-sm checkbox-dark\">\
                                <input type=\"checkbox\" id=\"in-a-new-window\" class=\"bootstrap-wysihtml5-insert-link-target\" checked=\"\">\
                                <label for=\"in-a-new-window\">\
                                Open link in new window\
                                    </label>\
                                </div>\
                            </div>\
                            <div class=\"modal-footer\">\
                                <a class=\"btn btn-default\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"cancel\" href=\"#\">Cancel</a>\
                                <a href=\"#\" class=\"btn btn-primary\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"save\">Insert link</a>\
                            </div>\
                        </div>\
                    </div>\
                </div>" +
                "</li>";
        },
        "image": function(argument){
          return "<li><div class=\"bootstrap-wysihtml5-insert-image-modal modal fade\" data-wysihtml5-dialog=\"insertImage\" aria-hidden=\"true\" style=\"display: none;\">\
            <div class=\"modal-dialog \">\
                <div class=\"modal-content\">\
                    <div class=\"modal-header\">\
                        <a class=\"close\" data-dismiss=\"modal\">×</a>\
                        <h3>Insert image</h3>\
                    </div>\
                    <div class=\"modal-body\">\
                        <div class=\"form-group no-margin\">\
                            <input value=\"http://\" class=\"bootstrap-wysihtml5-insert-image-url form-control bg-gray-lighter\" data-parsley-id=\"7359\"><ul class=\"parsley-errors-list\" id=\"parsley-id-7359\"></ul>\
                            </div>\
                        </div>\
                        <div class=\"modal-footer\">\
                            <a class=\"btn btn-default\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"cancel\" href=\"#\">Cancel</a>\
                            <a class=\"btn btn-primary\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"save\" href=\"#\">Insert image</a>\
                        </div>\
                    </div>\
                </div>\
                </div>\
                <a class=\"btn btn-sm btn-transparent btn-default\" data-wysihtml5-command=\"insertImage\" title=\"Insert image\" tabindex=\"-1\" href=\"javascript:;\" unselectable=\"on\"><span class=\"glyphicon glyphicon-picture\"></span></a>\
                </li>"  
        },
        "html": function(argument) {
            var locale = argument.locale,
                options = argument.options,
                size = (options.toolbar && options.toolbar.size) ? ' btn-'+options.toolbar.size : '';
            return "<li>" +
                "<div class='btn-group'>" +
                "<a class='btn btn-default btn-" + size + "' data-wysihtml5-action='change_view' title='" + locale.html.edit + "' tabindex='-1'><i class='fa fa-pencil'></i></a>" +
                "</div>" +
                "</li>";
        }
    };
});
