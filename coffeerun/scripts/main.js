(function (window) {
/*main.js是项目的入口文件*/
/*JavaScript操作html 元素是通过web API DOM*/
    'use strict';
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    const SERVER_URL = 'http://localhost:3000/coffeeorders';
//const SERVER_URL = 'http://127.0.0.1:3000/coffeeorders';
    var App = window.App||{};
    var Truck = App.Truck;//函数可以作为变量或对象,不要把变量和对象搞混。用App.Truck也可以，只是为了名字更短
    var DataStore = App.DataStore;
    var RemoteDataStore= App.RemoteDataStore;
    var FormHandler = App.FormHandler;//实例化一个Formhandler实例
    var CheckList = App.CheckList;//属性都是红的，对象是黄的，变量是灰的
    var Validation =App.Validation;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    //var myTruck = new Truck('ncc-1701',remoteDS);
    var myTruck = new Truck('ncc-1701',new DataStore());
    window.myTruck = myTruck;//将Truck暴露到全局命名空间
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var formhandler = new FormHandler(FORM_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
/*The bind() method creates a new function that,
when called, has its this keyword set to the provided value,所以this便指向了myTruck*/
    //formhandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));//Function.prototype.bind()是standard built-in objects下function的一个方法

//formhandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));//表示在执行createOrder期间this是指向myTruck
//formhandler.addSubmitHandler(checkList.addRow.bind(checkList));
    formhandler.addSubmitHandler(function(data){

      return myTruck.createOrder.call(myTruck,data)//renturn了一个deffer,这个执行完之后，再执行checklist。addRow，用了then
      .then(function(){
        checkList.addRow.call(checkList,data);
      },function(){
        alert('Server unreachable');
      });

    });//调用完这两个函数，this.reset的this又指向了form,,所以不会对checklist进行reset
    formhandler.addInputHandler(Validation.isCompanyEmail);
myTruck.printOrders(checkList.addRow.bind(checkList));
})(window);
/*myTruck
Truck {truckId: 'ncc-1701', db: DataStore}
db: DataStore
  data: jdfkj@mail.com: {coffee: '123', emailAddress: 'jdfkj@mail.com', size: 'tall', flavor: 'caramel'}
truckId: "ncc-1701"*/
