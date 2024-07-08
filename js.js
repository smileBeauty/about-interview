/*
 let m = "sayName";
 class A {
 constructor(name){
 this.name = name;
 }
 [m]() {
 return this.name;
 }
 
 }
 let a = new A("aaa");
 console.log(a[m]())
 */
/*
 let par = (num,radix)=>{
 console.log(num,radix)
 return parseInt(num,radix);
 }
 let res = ["1","2","3"].map(par);
 console.log(parseInt("3",3))
 
 */

// let diff = function(a,b){
//     console.log(Object.getOwnPropertyNames(a))
//
// }
// diff({a:1})
// function deepCopy(obj){
//     let dst;
//     if(Array.prototype.isPrototypeOf(obj)){
//         dst = [];
//         obj.map((item,index)=>{
//             dst[index] = deepCopy(item);
//         })
//     }else if(Object.prototype.isPrototypeOf(obj)){
//         dst = {};
//         for(let pro in obj){
//             if(obj.hasOwnProperty(pro)){
//                 dst[pro] = deepCopy(obj[pro])
//             }
//         }
//     }else{
//         dst = obj;
//     }
//     return dst;
// }
// var a = {a:[1,2,3,4],d:4};
// var c = {a:{b:2,c:3},d:4};
// let b = deepCopy(a);
// let d = deepCopy(c);
// let f = deepCopy(1);
// console.log(d)
// console.log(b,f)
/////////////////////////////////////////

// function Parent(name) {
//     this.name = name;
// }
// Parent.prototype.sayName = function() {
//     console.log('parent name:', this.name);
// }
// Parent.prototype.doSomething = function() {
//     console.log('parent do something!');
// }
// function Child(name, parentName) {
//     Parent.call(this, parentName);
//     this.name = name;
// }
//
// Child.prototype = new Parent();
// Child.prototype.constructor = Child;
// // Child.prototype.sayName = function() {
// //     console.log('child name:', this.name);
// // }
// var child = new Child('son');
// child.sayName();       // child name: son
// child.doSomething();
// Child.prototype = new Parent("parent");
// Child.prototype.constructor = Child;

// Child.prototype.sayName = function() {
//     console.log("Child name",this.name);
// }

///////////////////////////////////////////////
// let Arrow = (name)=>{
//     this.name = name;
//     this.sayName =  ()=> {
//         console.log(this.name);
//     }
//     console.log(this);
//     return this;
// }
// let a = Arrow("aaa");
// a.sayName();
// let b = {name:"bbb"};
// let say = a.sayName.bind(b);
// say()
////////////////////////////////////////////////////

////////////////////////////////////////////////
//实现bind,apply,call
// Function.prototype.newbind = function(context){
//     context = context || window;
//     let func = this;
//     if(typeof func === "function"){
//         return function(){
//
//
//         }
//
//
//
//     }else{
//         throw new TypeError("Bind must be called on a function")
//
//     }
//
//
// }
// Function.prototype.thisbind = function(context, ...bindArgs) {
//     // func 为调用 bind 的原函数
//     const func = this;
//     context = context || window;
//     if (typeof func !== 'function') {
//         throw new TypeError('Bind must be called on a function');
//     }
//     // bind 返回一个绑定 this 的函数
//     return function(...callArgs) {
//         let args = bindArgs.concat(callArgs);
//         if (this instanceof func) {
//             // 意味着是通过 new 调用的 而 new 的优先级高于 bind
//             return new func(...args);
//         }
//         return func.call(context, ...args);
//     }
// }
//
// let he = {
//     name:"aaa",
//     sayName : function(){
//         console.log(this.name);
//     }
// }
// // he.sayName();
// let she = {name:"bbbb"}
// he.sayName.thisbind(she)();

// if([] == true) {
//     console.log(111)
// }else{
//     console.log(2222)
// }
// async function async1(){
//     console.log('async1 start 2')
//     await async2()
//     console.log('async1 end 7')
// }
// async function async2(){
//     console.log('async2 3')
// }
// setTimeout(function(){
//     console.log('setTimeout 8')
// },0)
// async1();
// new Promise(function(resolve){
//     console.log('promise1 4')
//     resolve();
// }).then(function(){
//     console.log('promise2 6')
// })
// console.log('script end 5')
//////////////////////////////////////////////////////
// let resolvePromise = new Promise(resolve => {
//     let resolvedPromise = Promise.resolve()
//     resolve(resolvedPromise)
// })
/////////////////////////////////////////////////////////////////
//resolve(resolvedPromise)
// //等同于：
// Promise.resolve().then(() => resolvedPromise.then(resolve));
////////////////////////////////////
// resolvePromise.then(() => {
//     console.log('resolvePromise resolved')
// })
// let resolvedPromiseThen = Promise.resolve().then(res => {
//     console.log('promise1')
// })
// resolvedPromiseThen
//     .then(() => {
//         console.log('promise2 ')
//     })
//     .then(() => {
//         console.log('promise3')
//     })

// console.log(add(1)(2)(3)(4)())
//
// let html = [];
// let arr = [1,2,3];
// arr.map((item,index)=>{
//     html.push(`<img src=${item+index} />`);
// })
//
//
// console.log(`${html}`)

function deepClone(target, map = new WeakMap()){
    const mapTag = "[object Map]";
    const setTag = "[object Set]";
    const objTag = "[object Object]";
    const arrTag = "[object Array]";
    const artgsTag = "[obejct Arguments]";
    
    //判断是否为一个对象，排除null
    function isObject(target){
        return (typeof target === "object" || typeof target === "function") && typeof target !== null;
    }
    
    console.log(isObject(null));
    
    //获取目标type
    function getType(target){
        return Object.prototype.toString.call(target);
    }
    
    //初始化一个新数据
    function initObj(target, type){
        let Ctor = target.constructor;
        return new Ctor();
    }
    
    //克隆一个Symbol
    function cloneSymbol(target){
        return Object(Symbol.prototype.valueOf.call(target));
    }
    
    let type = getType(target);
    //如果是基础类型
    if (!isObject(target)){
        return target;
    }
    let cloneObj;
    //如果已经存在该对象
    if (map.get(target)){
        return map.get(target);
    }
    //如果不存在 存起来
    cloneObj = initObj(target);
    map.set(target, cloneObj);
    
    if (type === ""){}
    
}

deepClone();









