(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) { /*构造函数*/
      this.truckId = truckId;
      this.db = db; //DataStore类型
    }

    Truck.prototype.createOrder = function(order) {

      console.log('Adding order for' + order.emailAddress);

      return this.db.add(order.emailAddress, order); //key 和value的关系，加了return是返回一个defferddu对象
    };

    Truck.prototype.deliverOrder = function(customerId) {
      console.log('Delivering order for' + customerId);
      return this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function(printFn) {
      var $testgetAll = this.db.getAll();
      return this.db.getAll()
        .then(function(orders) {
          var customerIdArray = Object.keys(orders); //详见object.keys的例子
          console.log('Truck #' + this.truckId + 'has pending orders:');
          customerIdArray.forEach(function(id) {
            console.log(orders[id]);
            if(printFn){
              printFn(orders[id]);
            }
          }.bind(this));
        }.bind(this));


    };
    App.Truck = Truck;
    window.App = App;
  }

)(window);
/*
var myTruck = new App.Truck('007', new App.DataStore());
myTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});
myTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
myTruck.db;
myTruck.deliverOrder('m@bond.com');
myTruck.deliverOrder('dr@no.com');
myTruck.db; */

/*Array-like object standard built-in objects > objects
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.keys(obj)); // ['0', '1', '2']
*/
/*Array.from
console.log(Array.from('foo'));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// Expected output: Array [2, 4, 6]
*/
