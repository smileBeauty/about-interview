1.MVC 和 MVVM

- MVC 我们最早的架构模型，p 端，统一称之为 MVC, 前端视图层叫 View，后端的也有自己的数据库 Model, 用户操作界面想获取一些数据，它会像后端发起请求，请求被路由拦截到， 然后转发到对应的控制器来处理，最终显示到视图上。 一句话描述就是 Controller 负责将 Model 的数据用 View 显示出来。用户会操作服务器端路由，路由回调用对应控制器，控制器会找对应的 model 数据，将结果返回给前端。这种方向是单向的，而且是针对我们整个应用的架构，随着我们前端越来越复杂，不在只是渲染页面，不再只是通过后端来渲染，有了单页应用。我们把前端这一层进行了抽离，处理处理 MVVM。
- MVVM View 我们的 DOM 元素，数据是我们前端的静态数据，或者 ajax 请求来的数据，以前是我们直接手动操作数据，将数据放到页面上，这就有个问题，需要我们手动操作 DOM。Vue 就充当一个中间层。将数据绑定到 ViewModel, 当数据发生改变，会通知给 ViewModel, ViewModel 自动将数据渲染到视图 view, 用户不需要手动操作 DOM。ViewModel 就是 MVVM 桥梁。就是一个数据双向绑定的过程。都是响应式的，数据变化会驱动视图，视图更改了比如 v-model

  2.说一下 Vue 响应式数据原理

- Vue2.0 核心是 Object.defineProperty,默认初始化 Vue ，给 data 中的属性用 Object.defineProperty 重新定义，为属性添加 get set 方法。当属性在模版中获取的时候，会调用 get ，然后进行依赖收集。在属性发生变化的时候进行会执行 set , 通知相关依赖进行派发更新。

```
 Object.defineProperty(obj, key, {
     get() {
         return val;
     },
     set(newVal) {
         if (val === newVal) return; //优化性能
         val = newVal;
         update();
     }
 })
```

- Vue3.0 Proxy&Reflect 通过 Proxy（代理）设置 get set 方法通过 Reflect 更新值

```
let oProxy = new Proxy(data, {
      get(target, key, receiver) {
          console.log(1)
          return Reflect.get(target, key);
      },
      set(target, key, newValue, receiver) {
          console.log(1)
          return Reflect.set(target, key, newValue)
      }
});
```

Vue2.0 数据双向绑定缺点：

- 缺点不能直接监控数组，而是间接重写 Array.prototype 上的数组方法(就是 vue 中常常听见的数组变异方法)比如 push、unshfit...属性,监听数组原型上的这些方法,进而实现更新
- 如果被监听对象在执行监听之后又重新添加了属性,这些属性值则无法监听到

Vue3.0 更新原因

- ES6 的 Proxy&Reflect 完美解决了 ES5Object.definedProperty()缺点（上面已经指出），但是浏览器不能直接兼容，只能间接通过 babel 语言降级，因此这里只给出关键代码大家了解一下即可。

  3.数组是如何检测变化的
