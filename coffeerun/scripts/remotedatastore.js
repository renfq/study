(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    /*$.post知道了三件事情：和谁交流、交流什么和交流后要做什么
    jQuery的$.ajax方法返回的Deferred对象*/
    /*var   $test =
  $.ajax({
      type: 'POST',
 url: this.serverUrl,
 data: val,
 headers: {'Access-Control-Allow-Origin':'*'},

 success:function(serverResponse){//当服务器响应后，这个回调函数会被执行
    console.log(serverResponse);
  }

});*/

    return $.post(this.serverUrl, val,function(serverResponse){//当服务器响应后，这个回调函数会被执行
      console.log(serverResponse);
    });
    //return  $test;
 };

 RemoteDataStore.prototype.getAll = function (cb) {
   var $testget = $.get(this.serverUrl);
   return $.get(this.serverUrl,function(serverResponse){
     if(cb){//确认是否有回调函数
     console.log(serverResponse);
     cb(serverResponse);
   }
 });
 };
 RemoteDataStore.prototype.get = function (key, cb) {

  return   $.get(this.serverUrl + '/' + key, function (serverResponse) {
    if(cb){
      console.log(serverResponse);
      cb(serverResponse);
      }
    });
  };
  RemoteDataStore.prototype.remove = function (key) {

    return   $.ajax(this.serverUrl + '/' + key, {
        type: 'DELETE'
      });
    };
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
