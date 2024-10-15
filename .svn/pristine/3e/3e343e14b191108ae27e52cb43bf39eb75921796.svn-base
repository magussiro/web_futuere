var IDLE_TIMEOUT = 600; //指定使用者多久不動作來刷新頁面 1070125 改自動登入
var _idleSecondsCounter = 0;
var REFRESH_DEBUG = false;
document.onclick = function() {
    _idleSecondsCounter = 0;
};
document.onmousemove = function() {
    _idleSecondsCounter = 0;
};
document.onkeypress = function() {
    _idleSecondsCounter = 0;
};
window.setInterval(CheckIdleTime, 1000);

function CheckIdleTime() {
    _idleSecondsCounter++;
    var oPanel = document.getElementById("SecondsUntilExpire");
    if (oPanel && REFRESH_DEBUG ==true)
        oPanel.innerHTML = (IDLE_TIMEOUT - _idleSecondsCounter) + "";
    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
        window.location = 'login';
        // location.reload();
    }
}

//https://stackoverflow.com/questions/13246378/detecting-user-inactivity-over-a-browser-purely-through-javascript/13246534#13246534