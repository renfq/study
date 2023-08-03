(function(window) {


  'use strict';
  var App = window.App || {};
  var $ = window.jQuery; //当我们添加jQuery<script>标签时，它创建了一个名为jQuery的函数，以及一个指向该函数的名为$的变量
  function FormHandler(selector) { //为FormHandler构造函数添加一个名为selector的参数
    if (!selector) { //如果没有传入参数，就抛出异常
      throw new Error('No select provided');

    }
    this.$formElement = $(selector); //使用jQuery的$函数来选择元素，jQuery 选择器基于元素的 id、类、类型、属性、属性值等"查找"（或选择）HTML 元素，比如$("p")在页面中选取所有 <p> 元素:。
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selecor:' + selecor);
    }
  }
  FormHandler.prototype.addSubmitHandler = function(fn) { //fn 是给addsubmitHandler传递了一个函数参数，可以addSubmitHandler （fn）这样调用这个函数
    console.log('setting submit handler for form');
    this.$formElement.on('submit', function(event) { //on可以注册简单的事件
      event.preventDefault();
      var data = {}; //function内的形参不用var来声明，会让人费解，不知道要传什么对象进去
      /*//serializeArray是jQuery Form AjAx 内的函数， creates a JavaScript array of objects。
      Encode a set of form elements as an array of names and values.
      这个this指向form*/
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value; //array1.forEach(element => console.log(element));
        console.log(item.name + 'is' + item.value);
      });

      console.log(data);
      fn(data)
      .then(function(){
        this.reset();
        this.elements[0].focus();
      }.bind(this));
      //this.reset(); //this指向form
    });
  };
  /*怎么用js或者jQuery实现表单实时验证*/
  FormHandler.prototype.addInputHandler = function(fn) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      console.log(fn(emailAddress));
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
        $(event.target).css('borderColor','');
      } else {
        message = emailAddress + ' is not an authorized email address!'
        /*web API：The setCustomValidity() method of the HTMLObjectElement interface sets a custom validity message for the element.
        event.target是input#emailInput.form-control元素.*/
        event.target.setCustomValidity(message);//event.target是jQuery,返回的是element
        $(event.target).css('borderColor','red');
      }
    });
  };


  App.FormHandler = FormHandler; /*将模块代码绑定到命名空间上，模块注册*/
  window.App = App;


})(window);
