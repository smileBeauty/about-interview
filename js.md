JS
---
#### _**ES6**_
 * let 和 const
   * let和var的区别
   * 引用与const
   * const 定义的 Array 中间元素能否被修改? 如果可以, 那 const 修饰对象有什么意义
     其中的值可以被修改. 意义上, 主要保护引用不被修改 (如用 Map 等接口对引用的变化很敏感, 使用 const 保护引用始终如一是有意义的), 也适合用在 immutable 的场景.
 * 解构赋值
 * Symbol 
   * 私有化和symbol
 * Set 和 Map
   * {}的使用与缺点
 * Proxy 
 * Reflect
 * Promise
 * Iterator
 * Generator
 * async await 
 * Class
 * Class 的继承
 * Module
 * ArrayBuffer
 * Decorator
 * String的扩展
 * Number的扩展
 * Function 的扩展
 * Array 的扩展
 * Object的扩展
 * 箭头函数
    * 箭头函数没有prototype,所以箭头函数内部本身没有this
    * 箭头函数的this指向在箭头函数声明的时候指向外部函数的this.
        * 箭头函数的this指向定义时所在的外层第一个普通函数，跟使用位置没有关系。
        * 被继承的普通函数的this指向改变，箭头函数的this指向会跟着改变
    * 不能直接修改箭头函数的this指向
    * 箭头函数外层没有外层函数this会指向window
    * 箭头函数的arguments
        * 箭头函数的this指向window时，使用arguments抛出引用异常
        * 箭头函数this指向外层函数，arguments继承自外层函数
        * 可以使用...来收集箭头函数的参数
    * 注意事项
        * 箭头函数一条语句返回对象字面量，需要加括号
        * 箭头函数在参数和箭头之间不能换行
        * 箭头函数的解析顺序相对||靠前
 
#### _**JS五种基本数据类型**_  
 * Number
 * String
 * Boolean
 * null
 * undefined   
 除了五种基本类型之外的数据类型都是Object
 基本类型的值无法改变

#### _**原型链**_   
![原型链](F:\wangxinshu\studyProject\interviewTopic\image\prototype.jpg)
* 每一个对象都有一个__proto__属性，该属性指向它的构造函数的prototype属性指向的原型对象。
* 每一个构造函数都有一个prototype竖向，该属性指向原型对象。
* 构造函数的原型对象都具有constructor竖向，指向构造函数本身

实例对象的__proto__指向构造函数的prototype,从而实现继承  
```javascript
    var a = new Object();              
    a.__proto__ === Object.prototype;   
```

原型链就是当对象在调用一个方法或者属性的时候通过原型对象（prototype）一层一层向上搜寻的过程，知道搜索到Object的原型对象为止。
例如  
```javascript
    var arr = [1,2];
    arr.valueOf(); //1,2
    //搜索valueOf的过程
    //arr=>arr.__proto__=>Array.prototype=>Array.prototype.__proto__=>Object.prototype
```

#### _**闭包**_
闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量(封闭了外部变量)   
闭包允许将函数与其所操作的某些数据（环境）关联起来。
````
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }   
})();
Counter.value();
使用闭包的特性模拟了对象的私有变量。
````
#### _**js里的class类的理解**_
   class 替代了ES5中使用原型链方式的继承，本质上仍然是使用原型链方式的继承
   * 函数声明可以被提升，类声明不能
   * 类声明中的代码自动强制运行在严格模式下
   * 类中的所有方法都是不可枚举的
   * 每个类都有一个[[construct]]方法
   * 只能使用new来调用构造方法
   * 不能在类中修改类名
   * 类支持在原型上定义访问器属性。(getter setter)
   * 可计算成员名称（可计算成员是指使用方括号包裹一个表达式）
   * 生成器方法（* yield）
   * 静态成员static
   * 继承与派生类
   * 
#### _**变量提升**_
使用var 来声明一个变量时，变量的声明将提升到整个文件的开头，但变量的初始化不会提升。
```javascript
    console.log(a); //报错引用错误（ReferenceError）
    console.log(foo); //undefined
    var foo = 1;
    console.log(foo) //1
```     
#### _**函数提升**_
使用function来声明一个函数也会被提升。
```javascript
    foo();
    function foo() {
        alert("Hello!");
    } 
```
#### _**浏览器事件代理**_
事件委托的雏形是由事件冒泡来形成的一个通知链
#### _**事件捕获、事件冒泡、事件委托**_
事件从document对象开始向下传播，找到具体的目标前，整个过程都是捕获阶段。    
找到具体的目标后，开始向外层冒泡，直到回到document对象结束，这个过程叫冒泡阶段     
如果有多个子元素需要添加事件，那么可以将事件委托到父元素上，然后通过className 或者序号来区分出具体触发
那个事件函数。

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。
#### _**继承**_
在ES6中class可以通过extends来实现类的继承
在ES5中可以通过改变原型对象来实现函数的继承。
```javascript
    //原型链继承
    //最容易实现的继承，直接将子类的原型对象修改为父类的实例。即可完成继承。
    function Parent(name){
        this.name = name;
    }
    Parent.prototype.sayName = function(){
        console.log("parent name",this.name);
    }
    function Child(name) {
        this.name = name;
    }
    Child.prototype = new Parent("parent");
    Child.prototype.constructor = Child;
    let c = new Child("child");
    c.sayName();
    //组合式继承
    //通过在子类的构造函数中调用父类的构造函数从而实现了从子类向父类中传递参数。
    function Parent(name) {
        this.name = name;
    }
    Parent.prototype.sayName = function() {
        console.log('parent name:', this.name);
    }
    Parent.prototype.doSomething = function() {
        console.log('parent do something!');
    }
    function Child(name, parentName) {
        Parent.call(this, parentName);
        this.name = name;
    }
    Child.prototype = new Parent();
    Child.prototype.constructor = Child;
    //如果需要重写父类的方法可以直接在重写。
    // Child.prototype.sayName = function() {
    //     console.log('child name:', this.name);
    // }
    var child = new Child('son');
    child.sayName();       // child name: son
    child.doSomething();
```
####  _**diff函数--深比较**_

#### _**copy函数-深拷贝和浅拷贝**_
浅拷贝，在拷贝过程中无法拷贝属性值为引用类型的属性（拷贝的是属性在栈中的指针）;
```javascript
    function shallowCopy(obj){
        let dst = {};
        for(let pro in obj){
            if(obj.hasOwnProperty(pro)){
                dst[pro] = obj[pro];
            }
        }
        return dst;    
    }
    // 将之前写的 deepClone 函数封装一下
    function cloneDeep(obj) {
        let family = {}
        let parent = Object.getPrototypeOf(obj)
    
        while (parent != null) {
            family = completeAssign(deepClone(family), parent)
            parent = Object.getPrototypeOf(parent)
        }
    
        // 下面这个函数会拷贝所有自有属性的属性描述符,来自于 MDN
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        function completeAssign(target, ...sources) {
            sources.forEach(source => {
                let descriptors = Object.keys(source).reduce((descriptors, key) => {
                    descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
                    return descriptors
                }, {})
    
                // Object.assign 默认也会拷贝可枚举的Symbols
                Object.getOwnPropertySymbols(source).forEach(sym => {
                    let descriptor = Object.getOwnPropertyDescriptor(source, sym)
                    if (descriptor.enumerable) {
                        descriptors[sym] = descriptor
                    }
                })
                Object.defineProperties(target, descriptors)
            })
            return target
        }
        return completeAssign(deepClone(obj), family)
    }
    


```
#### _**LocalStorage 和 SessionStorage_** 
sessionStorage用于存储一个会话中的数据，这些数据只有在同一个会话中的页面才能够访问，并且在会话结束时数据会被销毁。     
LocalStorage 用于持久化本地存储，不主动删除，永久有效。要求在相同的协议、相同的主机名、相同的端口下；

#### _**this**_
* 在全局作用域下，this指向global(window)
* 在普通函数中，this指向全局对象（global,window）
* 在对象调用的方法中，this指向该对象
* 箭头函数this绑定继承于它声明时所在的环境的this.
#### _**提取url的query成Object**_

#### _**call,bind,apply的区别**_
call,bind,apply的作用都是改变函数执行时的上下文，即改变this的指向。
call,apply是在改变完this指向立即执行该函数
bind是在改变完this的时候返回一个函数。

call,apply的差别在于参数的差别，call，apply第一个参数都是要改变成的上下文对象，而call从第二个参数开始以列表的形式展现，
apply将传递一个数组，数组里面存放要传递的参数列表。    
* 可以使用call,apply来使伪数组能够使用数组的方法
* 可以利用call来实现继承
```javascript
function Animal(name){
    this.name = name;
    this.showName = function(){
        console.log(this.name);
    }
}
function Cat(name){
    Animal.call(this, name);
}
```
* 实现多继承
```javascript
function Animal1(name){
    this.name = name;
    this.showName = function(){
        console.log(this.name);
    }
}function Animal2(name){
     this.name = name;
     this.showName = function(){
         console.log(this.name);
     }
 }

function Cat(name){
    Animal1.call(this, name);
    Animal2.call(this, name);
}
```
#### _**箭头函数和普通函数的区别**_
   * 箭头函数没有prototype(原型)，所以箭头函数本身没有this
   * 箭头函数的this在定义的时候继承自外层第一个普通函数的this。
   * 如果箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)
   * 箭头函数本身的this指向不能改变，但可以修改它要继承的对象的this。
   * 箭头函数的this指向全局，使用arguments会报未声明的错误。
   * 箭头函数的this指向普通函数时,它的argumens继承于该普通函数
   * 使用new调用箭头函数会报错，因为箭头函数没有constructor
   * 箭头函数不支持new.target
   * 箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名
   * 箭头函数相对于普通函数语法更简洁优雅
#### _**数组去重**_

#### _**new一个对象的四个步骤**_
* 创建一个新对象
* 将构造函数的作用域赋给新对象
* 指向构造函数中的代码给该对象添加属性
* 返回这个新对象

#### _**函数的节流和防抖**_
   * 防抖
        函数的防抖（debunce）是指把多个信号合并成一个信号，即防止用户在点击（或者其他动作）的时候重复点击而导致的误触。
        实现原理：将目标函数包装在一个setTimeout中，然后这个方法是一个事件的回调函数，如果该回调函数一直执行，则一直不执行目标函数，直到该回调不执行，再执行一次目标函数
   ```javascript
     const debunce = (func,delay)=>{
        let timer ;
        clearTimeout(timer);
        return ()=>{
            let context = this,args = arguments;
            timer = setTimeout(()=>{
                func.apply(context,args);
            },delay);
            }
     }
   ```
   * 节流
      函数的节流（throttle）是指将需要频繁执行的函数，改为一段时间执行一次，以节约性能
```javascript
    const throttle = (func,threshhold)=>{
        var timeout;
        var start = new Date();
        threshhold = threshhold || 160;
        return function(){
            var context = this,args = arguments ,curr = new Date() - 0;
            clearTimeout(timeout);
            if(curr - start> threshhold){
                func.apply(context,args);
                start = curr;
            }else{
                timeout = setTimeout(function(){
                    func.apply(context,args);
                },threshhold)
            }
        }
    }
```
#### _**cookie session**_
Cookie 是服务器发送到用户浏览器保存在本地的数据。它会在浏览器下一次想服务器发送请求时携带，cookie使无状态的http有了能够记录稳定状态信息的可能。cookie的失效时间可以设置。     
Session 代表了服务器和客户端一次会话的过程，Session对象存储特定用户会话所需的属性及配置信息。Session的时间是会话期内。      
Cookie 和Session的区别
* Cookie 保存在浏览器端，Session保存在服务器端。
* Cookie只能保存Ascii,session可以保存几乎任何编码的数据
* 安全性上Session要比Cookie好一些
* 单个Cookie存储上限4K，Session要不Cookie要大。      
当用户第一次访问服务器的时候，服务器会创建一个Session,并自动生成一个sessionId发送给客户端，客户端会将改sessionId存放在Cookie中，在下一次请求的时候客户端会在Cookie中携带SessionId进行访问，然后服务端会在自己的内存中查找改sessionID对应的Session.

#### _**内存分配**_
js中基本数据分配在栈内存中，数据大小确定，内存空间大小可分配，是直接按值存放的，所以可以直接访问。  
js中的引用数据存放在堆中，变量实际上存放了一个在栈内存中的指针，该指针指向堆内存中存放该对象的实际内存地址。
#### _**内存回收**_
javascript的内存回收机制：标记清除，引用计数，分代回收。
* 标记清除Mark Sweep
  将内存中的数据从根即global对象开始标记，标记处所有的可以从根节点访问到的对象，那么没标记到的对象将在垃圾回收启动的时候被回收掉。
* 引用计数
  将内存中所有的对象依次计数，计算该对象是否被其他对象所引用，如果有一个引用将计数加一，直到该对象的计数为零表示该对象没有任何引用。
* 分代回收
  在Node V8中的垃圾回收机制主要是分代回收，将内存中分成新生代和老年代两个区域，V8中该两个区域的大小一经运行将无法在更改。
  在分代回收中不同区域的对象有不同的回收算法。
  * Scavenge
    在新生代中主要是使用Scavenge算法来进行垃圾回收，将新生代区域再分成两个区域From 和To 新的对象将分配在From中，在经历过一次垃圾回收之后仍然存活的对象将被复制到To区域中，    
    在经历过若干次的垃圾回收之后，仍然在To区域中的对象将被移动到老年代区域。
  * 标记清除和标记整理
    在老年代区域主要就是标记清除和标记整理，标记整理就是在标记清除执行之后对内存碎片的整理。
  * 增量标记
    为了减少老年代的垃圾回收导致的停顿，标记清除的标记阶段将分步进行。
    
#### _**内存泄漏**_
* 作用域未释放（闭包）
* 没必要的全局变量
* 无效的dom引用
* 未清除的定时器
* 未清空事件监听

#### _**定位内存泄漏**_
* 使用heapdump保存内存快照，使用devtool查看内存快照。（使用heapdump保存内存快照时，只会有nodejs中的对象）
* 打印内存快照（一般打印三张）
* 比较内存快照找出泄漏位置

#### _**cut函数--正则**_

#### _**forEach 和 findIndex 的原理和区别， 用ES3和原型链来实现**_

#### _**利用闭包实现module**_

#### _**window的onload事件和DOMContentLoaded 谁先谁后？**_
onload(完全加载完成触发) DOMContentLoaded(dom解析完成后触发)
dom文档的加载顺序
- 解析html结构
- 构建dom树 （完成后触发DOMContentLoaded 事件）
- 加载外部脚本和样式表文件
- 解析并执行脚本代码
- 加载图片等外部文件（完成后触发onload事件）

#### 手写bind,call,apply
```javascript
Function.prototype.thisbind = function(context, ...bindArgs) {
    // func 为调用 bind 的原函数
    const func = this;
    context = context || window;
    if (typeof func !== 'function') {
        throw new TypeError('Bind must be called on a function');
    }
    // bind 返回一个绑定 this 的函数
    return function(...callArgs) {
        let args = bindArgs.concat(callArgs);
        if (this instanceof func) {
            // 意味着是通过 new 调用的 而 new 的优先级高于 bind
            return new func(...args);
        }
        return func.call(context, ...args);
    }
}


```

#### 实现new
```javascript
function _new(func,...args){
    //先判断func是否是一个函数
    let obj = Object.create(func.prototype);
    let res = func.call(obj,...args);
    if(res!== null && (typeof res =="object" || typeof res == "function")){
    res.__proto__ = func.prototype;
        return res;
    }
    obj.__proto__ = func.prototype;
    return obj;
}
```
#### 实现instanceof

#### 手写实现jsonp

#### ajax的实现

#### 实现reduce

#### 实现generator

#### 实现Promise

#### 实现一个路由hash

#### 实现一个JSON.stringify

#### 实现一个JSON.parse

#### 实现函数柯里化
sum(100, 200)(300)(...)...(...)() curring化实现
```javascript
var add = function() {
    var _args = arguments
    return function() {
        if (!arguments.length) {
            var sum = 0;
            for (var i = 0,c; c = _args[i++];){
                sum += c;
            }
            return sum
        } else {
            Array.prototype.push.apply(_args, arguments)
            return arguments.callee
        }
    }
}
```

#### requestAnimationFrame 和setTimeout 、setInterval的关系
requestAnimationFrame 是window对象的一个方法，只能在浏览器中使用，专门为动画提供的让动画有一个统一的刷新机制。     
按帧对网页进行重绘，该方法高速浏览器希望执行动画并请求浏览器在下一次重绘之前调用回调函数来更新动画。       
handler = requestAniamationFrame(callback)
callback接受唯一一个参数是一个高精度时间戳（perfornamce.now()）

#### micro任务，macro任务
js的执行顺序
- 取第一个task queue里的任务执行(可以认为同步任务队列是第一个task queue)
- 取 micro task全部任务依次执行
- 取下一个task queue里的任务执行
… 这样循环往复
常见的micro 和 macro 任务
macrotask：
* setTimeout
* setInterval
* setImmediate
* requestAnimationFrame
* I/O
* UI rendering

microtask:
* process.nextTick
* Promises\
* Async/Await
* Object.observe
* MutationObserver


#### 判断if([] == false) {} , if({} == false) {} , if([]) {}
[] == false // true
{} == false //false 
[] //true



































