### new 操作符

new 操作符的核心功能有什么？
1. 创建一个新的对象
2. 将新对象的`__proto__`链接到构造函数的 `prototype`属性上
3. 调用构造函数并将`this`指向新对象
4. 根据构造函数的返回值来决定最终返回的对象

```js
function myNew(construct, ...args) {
    // 创建一个新对象
    const obj = {};
    // 将构造函数的prototype赋给obj的__proto__
    Object.setPrototypeOf(obj, construct.prototype);
    // 运行构造函数，并且将this指向obj本身
    const result = construct.apply(obj, args)
    // 运行完成后，如果构造函数返回一个对象，则返回它
    // 如果构造函数返回不是一个对象，那么返回 obj 对象
    return typeof result === 'object' && result !== null ? result : obj;
}
```
