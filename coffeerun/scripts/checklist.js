(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {//函数是蓝的 这些构造函数类似于声明，不被调用的吗
    if (!selector) {
      throw new Error('No selector provided');
    }
    /*jquery方法获取元素的输入框的值
    var name = $('input[name="CSDN_NAME"]').val();通过name
    var name = $('#CSDN_NAME').val();通过id
    var name = $('.CSDN_NAME').val();通过class
    */
    this.$element = $(selector);//jQuery对象
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }
  //点击清单中的一个订单，删除该的订单
   CheckList.prototype.addClickHandler = function (fn) {
     console.log('');
     /*this是javascript自身的语法关键字，它指向一个javascript对象，所以可以使用所指向的目标javascript对象所拥有的方法,
     为了使用jQuery对象的方法，你必须传入jQuery函数$(this), 将javascript 对象包装成为一个jquery对象*/

     this.$element.on('click','input',function(event){//jQuery on() 方法
       var email= event.target.value;


       fn(email)
       .then(function(){
         this.removeRow(email);
       }.bind(this));
     }.bind(this));
   };
  /*使用Row构造函数创建Row实例。它会将每个Row
实例的$element添加到页面的活动DOM上*/
  CheckList.prototype.addRow = function (coffeeOrder){
    this.removeRow(coffeeOrder.emailAddress);//每个邮箱只能有一个订单，移除与相应邮箱地址相同的行，覆盖前一个订单
    var rowElement = new Row(coffeeOrder);
    //将rowElement的$element属性（它包含了DOM子树）附加到CheckList实例的$element属性（它是对清单项容器的引用）上
    this.$element.append(rowElement.$element);
  };
  
  CheckList.prototype.removeRow = function(email){
    //链式调用。链式调用的要求是前一个方法必须返回jQuery封装对象，以便调用后一个方法
    this.$element.find('[value="' + email + '"]').closest('[data-coffee-order="checkbox"]').remove();
  };
  //使用jQuery创建DOM数据，jQuery的方法创建DOM
  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });
    var $label = $('<label></label>');
    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });
    var description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }
    description += coffeeOrder.coffee + ',';
    description += ' (' + coffeeOrder.emailAddress + ')';
    //description += ' [' + coffeeOrder.strength + 'x]';
    $label.append($checkbox);
      $label.append(description);
      $div.append($label);

      this.$element =$div;//子树赋值给this.$element
  }


  App.CheckList = CheckList;
  window.App = App;
})(window);
