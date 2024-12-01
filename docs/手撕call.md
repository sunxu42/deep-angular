### copilot 推荐
```js
function call(fn, context, ...args) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function');
  }
  context = context || window;
  const key = Symbol('key');
  context[key] = fn;
  const result = context[key](...args);
  delete context[key];
  return result;
}
```
### 渡一推荐
怎么手写一个call方法？
1. 该方法应该定义在原型上，方便任何一个函数调用
2. 可以根据call方法传入的指向，改变this指向
3. 不应该影响原函数的原型链

```js
Function.prototype.myCall = function(context, ...args) {
    // context 的值可能为 undefined, null, window 或者 global, 引用对象 或者 简单数据
    const ctx = context === null || context === undefined ? globalThis : Object(context);
    
    // 防止重名的属性
    const key = Symbol('key');
    // 防止遍历ctx属性时，污染ctx对象
    Object.defineProperty(ctx, key, {
        value: this,
        enumable: false,
    })
    
    const result = ctx[key](...args);
    // 删除属性，不修改原指向
    delete  ctx[key];
    
    return result;
}
```

### 手写Apply
```js
Function.prototype.myApply = function(context, args) {
  const ctx = context === undefined || context === null ? globalThis : Object(ctx);
  // 将类数组转换成数组
  const validArgs = args ? Array.from(args) : [];
  const key = Symbol('key');

  Object.defineProperty(ctx, key, {
    value: this,
    enumerable: false,
  })

  const result = ctx[key](...validArgs);

  delete ctx[key];

  return result; 
}
```

### 手写bind
```js
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  // 考虑为null 或 undefined
  const actualContext = (context === null || context === undefined) ? globalThis : Object(context);

  function boundFunction(...newArgs) {
    // 检测是否通过 new 操作符调用
    return fn.apply(this instanceof boundFunction ? this : actualContext, args.concat(newArgs));
  }

  // 保留原型关系
  if (fn.prototype) {
    boundFunction.prototype = Object.create(fn.prototype);
    // 为了确保在设置新的 prototype 时可以正确设置 constructor
    boundFunction.prototype.constructor = boundFunction;
  }

  return boundFunction;
};
```
