/*
1、JavaScript only has one construct: objects.
2、什么是property 是一个键值对Each object has a private property which holds a link to another object called its prototype。
In JavaScript, objects can be seen as a collection of properties.
Object properties are equivalent to key-value pairs.
Property keys are either strings or symbols.
3、在运行时还能改变prototype It is possible to mutate any member of the prototype chain or even swap out the prototype at runtime,
so concepts like static dispatching do not exist in JavaScript.
4、对象的动态分配：可以指向链上的所有对象JavaScript objects are dynamic "bags" of properties (referred to as own properties).
JavaScript objects have a link to a prototype object.
When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object,
the prototype of the prototype, and so on until either a property with a matching name is found or the end of the prototype chain is reached
5、没有方法，任何function也被看做是property的一种形式。JavaScript does not have "methods" in the form that class-based languages define them。
any function can be added to an object in the form of a property
6、 继承下来的function An inherited function acts just as any other property, including property shadowing as shown above
(in this case, a form of method overriding).
7、关于function functions are first-class objects,
because they can be passed to other functions, returned from functions, and assigned to variables and properties.
*/
/*这是一个匿名函数 ，前后加（）可以立即执行*/
(function (window){
  'use strict';
/*window是一个接口 是一个全局变量 The Window interface represents a window containing a DOM document;
 the document property points to the DOM document loaded in that window.
 The Window interface is home to a variety of functions, namespaces, objects, and constructors */
  var App = window.App || {};/*{}是object赋值的一种写法，担心App property 已经被定义过*/
  var Promise = window.Promise;

  function DataStore(){/*A constructor function 创建DataStore object* 首字母大写是构造函数命名的方式*/
    this.data= {};/*data  is the property of DataStore */
//  console.log('running');
  }
  function promiseResolvedWith(value){
    var promise = new Promise(function(resolve,reject){//有关promise https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise
      resolve(value);//如果成功就调用resolve函数，除了value,也可以带入其他参数
    });
    return promise;
  }
/*prototype.add，自己定义的方法。通过对DataStore原型增加方法，可以使该方法对所有DataStore实例都可以用
Properties all DataStores created from the DataStore() constructor will have*/
  DataStore.prototype.add = function(key,val){

      this.data[key]= val;//用this.data.key也可以

    return promiseResolvedWith(null);
  };
  DataStore.prototype.get = function(key){
    return promiseResolvedWith(this.data[key]);
  };
  DataStore.prototype.getAll = function(){
    return promiseResolvedWith(this.data);
  };
  DataStore.prototype.remove = function(key){
    delete this.data[key];//delete是javascript自带的运算符
    return promiseResolvedWith(null);
  };
  App.DataStore= DataStore;/*将模块代码绑定到命名空间上，模块注册*/
  window.App = App;
})(window);
/*
浏览器内输入
var ds = new App.DataStore();
ds.add('m@bond.com', 'tea');
ds.add('james@bond.com', 'eshpressho');
ds.getAll();
ds.remove('james@bond.com');
ds.getAll();
ds.get('m@bond.com');
ds.get('james@bond.com');
*/
/*
// Constructor应该少用
const multiply = new Function("x", "y", "return x * y");

// Declaration
function multiply(x, y) {
  return x * y;
} // No need for semicolon here

// Expression; the function is anonymous but assigned to a variable
const multiply = function (x, y) {
  return x * y;
};
// Expression; the function has its own name
const multiply = function funcName(x, y) {
  return x * y;
};

// Arrow function
const multiply = (x, y) => x * y;

// Method
const obj = {
  multiply(x, y) {
    return x * y;
  },
};
function expression不能直接用function开头，应该加上（）或者 void
*/
