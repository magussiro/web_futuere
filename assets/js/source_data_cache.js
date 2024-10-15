const timeLimit = 1000;//毫秒，超過時間的話重新要
const requestUri = "http://202.55.227.38/fu//operation/getSourcePackets";
//

var SourceLogger = function () {
    this.onWarning = function (evt) {
        this.logStorage(evt, "Warning", "SourceDataWarning");
    }
    this.onError = function (evt) {
        this.logStorage(evt, "ERROR", "SourceDataError")
    }
    this.logStorage = function (evt, title, key) {
        // console.log(title + ': ' + JSON.stringify(evt));
        var data = localStorage.getItem(key);
        var time = new Date();
        var timeStr = time.toDateString();
        if (data == null) {
            var data = [];
        } else {
            data = JSON.parse(localStorage.getItem(key));
        }
        var errData = {};
        errData.date_time = timeStr;
        errData.error_msg = evt;
        data.push(errData);
        localStorage.setItem(key, JSON.stringify(data));
    }
    this.logStorageSimple = function (title, storageKey, msg, value) {
        // console.log(title + ': ' + msg + '; val:' + value);
        var data = localStorage.getItem(storageKey);
        var time = new Date();
        var timeStr = time.toDateString();
        if (data == null) {
            var data = [];
        } else {
            data = JSON.parse(localStorage.getItem(storageKey));
        }
        var stData = {};
        stData.date_time = timeStr;
        stData.msg = msg;
        stData.value = msg;
        data.push(stData);
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

}
var _sourceLogger = new SourceLogger();
/**
 * 寫三隻程序分別跑，一直持續送到queue, 由ws onMessage送
 * 一隻檢查queue，如果有空的去跟server要
 * 一隻一直顯示資料並從queue移除
 *
 * dependency : underscore.js;jQuery
 */


var SourceDataCache = function () {

    var self = this;

    this.openHashProduct = {};
    this.sourceDataHash = {};
    this.sourceNeedRequestArr = [];
    this.lastReceivedPacketId = null;
    this.nowShowId = null;
    this.getSourceDataFromHash = function (packetId) {
        return this.sourceDataHash[packetId];
    };
    //ws 接口
    this.forWsReceive = function (obj) {

        d = new Date();
        last_receive_time = d.getTime();
        // this.showData(obj.data)
        this.receiveSourceData(obj.data);
    }


    /**
     * main 1 持續送到queue, 由ws onMessage送
     */
    this.receiveSourceData = function (sourceData) {
        var packet_id = sourceData.packet_id;
        // console.log('packet_id:' + packet_id);
        if (packet_id == -1) {
            this.checkOpenHash(sourceData);

            // this.showData(sourceData);
            return;
        }
        // var exist_ids = Object.keys(this.sourceDataHash);
        //
        // //這裡接直接show的部分
        if (this.lastReceivedPacketId + 1 != packet_id && this.lastReceivedPacketId != null) {
            this.sourceNeedRequestArr.push(packet_id);
        }
        this.sourceDataHash[packet_id] = sourceData;
        this.lastReceivedPacketId = packet_id;
    };

    this.checkOpenHash = function (sourceData) {
        var productCode = sourceData.product_code;
        if (productCode == undefined)
            return;
        if (this.openHashProduct[productCode] != undefined)
            return;
        this.openHashProduct[productCode] = true;
        // console.table(sourceData);
        this.showData(sourceData);

    }
    /**
     * main 2 檢查queue間隔，如果有空隙的去跟server要
     */

    this.checkHashIntegrity = function () {

        // console.log("checkHashIntegrity");
        var existKeys = Object.keys(this.sourceDataHash);
        var tmp = [];

        //原本key 是string,轉成int
        for (var i = 0; i < existKeys.length; i++) {
            tmp.push(Number(existKeys[i]));
        }
        existKeys = tmp;
        var minKey = _.min(existKeys);
        var maxKey = _.max(existKeys);
        var checkArr = [];
        for (var i = minKey; i < maxKey; i++) {
            checkArr.push(i);
        }
        this.sourceNeedRequestArr = _.difference(checkArr, existKeys);
        // console.log("existKeys");
        // console.table(existKeys);
        // console.log(" this.sourceNeedRequestArr ");
        // console.table( this.sourceNeedRequestArr );
        if (this.sourceNeedRequestArr.length > 0) {

            var responseData = this.getLostPackets(this.sourceNeedRequestArr);
            if (responseData != null || responseData != undefined) {
                for (var key in responseData) {
                    this.putHash(key, responseData[key]);
                }
            }
        }
        //做完清空
        this.sourceNeedRequestArr = [];
    }

    /**
     * main 3 一直顯示資料並從queue移除
     */
    this.prepareShowData = function () {


        var size = Object.keys(this.sourceDataHash).length;
        // if (size > 0) {
        //     console.log("prepare show");
        //     var minKey = this.getHashMinKey();
        //     console.log("minKey" + minKey);
        //     var minSData = this.getHashData(minKey);
        //     if (minSData == undefined) {
        //         _sourceLogger.logStorageSimple("prepareShowData", "prepareShowData", "not found minData", null);
        //         return;
        //     }
        //     this.showData(minSData)
        //     this.nowShowId = minKey;
        //     this.deleteHash(minKey)
        // }
        if (size > 0) {
            // console.log("prepare show");
            var keys = Object.keys(this.sourceDataHash);
            var minKey = this.getHashMinKey();
            var maxKey = this.getHashMaxKey();
            var tmpKey = maxKey - 2;
            // console.log("minKey" + minKey);
            // console.log("maxKey" + maxKey);
            for (var index = 0, len = keys.length; index < len; ++index) {
                // console.log(keys[index]);
                var key = keys[index];
                if (key >= tmpKey)
                    continue;
                var minSData = this.getHashData(key);
                if (minSData == undefined) {
                    _sourceLogger.logStorageSimple("prepareShowData", "prepareShowData", "not found minData", null);
                    continue
                }
                this.showData(minSData)
                var cpKey = Number(this.nowShowId )+ 1;
                if (Number(cpKey) != Number(key)) {
                    _sourceLogger.logStorageSimple("prepareShowData", "prepareShowData", "封包有少：packet_id" + key + ",now id:" +cpKey, null);
                }
                this.nowShowId = key;
                this.deleteHash(key)
            }
            // keys.forEach(function (key) {
            //         var minSData = this.getHashData(key);
            //         if (minSData == undefined) {
            //             _sourceLogger.logStorageSimple("prepareShowData", "prepareShowData", "not found minData", null);
            //             return;
            //         }
            //         this.showData(minSData)
            //         this.nowShowId = key;
            //         this.deleteHash(key)
            // } );

            // for (var i = minKey; i < maxKey; i++) {
            //     var minSData = this.getHashData(minKey);
            //     if (minSData == undefined) {
            //         _sourceLogger.logStorageSimple("prepareShowData", "prepareShowData", "not found minData", null);
            //         continue;
            //     }
            //     this.showData(minSData)
            //     this.nowShowId = i;
            //     this.deleteHash(i)
            // }
        }
    }
    this.showData = function (minSData) {


        updateProduct(minSData);

        lastestProduct[minSData.product_code] = minSData;

        sdCache.receiveSourceData(minSData);
        //在收到價格，更新 分價揭示 ，
        if (minSData.product_code == selectedProduct) {
            newPrice(minSData);
            nowSelectedPrice = minSData.new_price;

            //每次價位進來，更新量價分佈
            amount_price_per_tick(minSData);
            // console.log(minSData.status_name);
            if (minSData.status_name !== "交易中") {
                console.log("選中的商品未開盤")
                //Method 1 :這個方法 CSS要調
                $('#userMenu').hide();
                $('#emptyMenu').show();
                //Method 2 這個方法會重刷頁面
                // location.reload()
            }
        }
        // console.log(minSData);
    }
    this.deleteHash = function (key) {
        delete this.sourceDataHash[key];
    }
    this.putHash = function (key, data) {
        this.sourceDataHash[key] = data;
    }
    this.getHashMinKey = function () {
        return this.getMinKey(this.sourceDataHash);
    }
    this.getHashMaxKey = function () {
        return this.getMaxKey(this.sourceDataHash);
    }
    this.getMinKey = function (obj) {
        return _.min(Object.keys(obj));
    }
    this.getMaxKey = function (obj) {
        return _.max(Object.keys(obj));
    }
    this.getHashData = function (key) {
        return this.sourceDataHash[key];
    }
    this.getLostPackets = function (packet_ids) {
        //TODO 這裡跟後端要soruceData
        var requestData = {};
        // var token = QueryString('token');
        var token = "52E26F83-D02F-806D-7EFC-94AD3A50D16F";
        requestData.token = token;
        requestData.packet_ids = JSON.stringify(packet_ids);


        $.ajax({
            url: requestUri,
            type: 'POST', dataType: 'json',
            data: requestData,
            success: function (rdata) {
                if (rdata.msg == 'success') {
                    return rdata.data;
                }
                // console.log(rdata);
                _sourceLogger.onWarning(rdata);
                return null;
            },
            error: function (data) {
                _sourceLogger.onError(data);
                return null;
            }
        })
    }

    // this.idinterval = setInterval(self.checkHashIntegrity(), 30);
    // this.showinterval = setInterval(self.prepareShowData(), 30);
};

//
// var s = new SourceDataCache();
//
// var testData = JSON.parse('{"type":0,"data":{"price_time":"16:45:08","product_code":"DAX","price_code":"DAX1712","name":"\u6cd5\u862d\u514b","last_new_price":"13001","now_amount":2,"unoffset_amount":0,"open_price":"13041","high_price":"13055","low_price":"13013","new_price":"13031","total_amount":12408,"buy_1_price":"13030","buy_1_amount":2,"sell_1_price":"13032","sell_1_amount":2,"number_format":1,"price_no":60551,"create_date":"2017-12-07 16:45:08","month":12,"up_down_count":30,"up_down_rate":"0.23%","up_down_sign":"+","last_close_price":null,"status_code":1,"status_name":"\u4ea4\u6613\u4e2d","deny_new_order_min":12351,"deny_new_order_max":13651,"system_offset_min":12351,"system_offset_max":13651,"packet_id":1}}');
// var testData2 = JSON.parse('{"type":0,"data":{"price_time":"16:45:08","product_code":"DAX","price_code":"DAX1712","name":"\u6cd5\u862d\u514b","last_new_price":"13001","now_amount":2,"unoffset_amount":0,"open_price":"13041","high_price":"13055","low_price":"13013","new_price":"13031","total_amount":12408,"buy_1_price":"13030","buy_1_amount":2,"sell_1_price":"13032","sell_1_amount":2,"number_format":1,"price_no":60551,"create_date":"2017-12-07 16:45:08","month":12,"up_down_count":30,"up_down_rate":"0.23%","up_down_sign":"+","last_close_price":null,"status_code":1,"status_name":"\u4ea4\u6613\u4e2d","deny_new_order_min":12351,"deny_new_order_max":13651,"system_offset_min":12351,"system_offset_max":13651,"packet_id":3}}');
// var testData3 = JSON.parse('{"type":0,"data":{"price_time":"16:45:08","product_code":"DAX","price_code":"DAX1712","name":"\u6cd5\u862d\u514b","last_new_price":"13001","now_amount":2,"unoffset_amount":0,"open_price":"13041","high_price":"13055","low_price":"13013","new_price":"13031","total_amount":12408,"buy_1_price":"13030","buy_1_amount":2,"sell_1_price":"13032","sell_1_amount":2,"number_format":1,"price_no":60551,"create_date":"2017-12-07 16:45:08","month":12,"up_down_count":30,"up_down_rate":"0.23%","up_down_sign":"+","last_close_price":null,"status_code":1,"status_name":"\u4ea4\u6613\u4e2d","deny_new_order_min":12351,"deny_new_order_max":13651,"system_offset_min":12351,"system_offset_max":13651,"packet_id":5}}');
// console.log(JSON.stringify(testData));
// s.receiveSourceData(testData.data);
// s.receiveSourceData(testData2.data);
// s.receiveSourceData(testData3.data);
// // console.log(s.getSourceDataFromHash(31762));
// console.log(s.getSourceDataFromHash(0) == undefined);
// // console.log();
// s.getLostPackets([1, 2, 3])