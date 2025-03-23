# js相关

1.原型链和类的介绍和区别
    原型链是javascript中实现继承的一种方式每个对象都有一个[[prototype]]内部属性，可以通过__proto__访问或Object.getPrototypeOf()方法访问,指向其原型对象。当访问对象的属性或方法时，如果对象本身没有该属性，javaScript会向上找直到null
2.类是es6引入的语法糖，本质是基于原型链的封装，提供了更清晰的语法来定义构造函数和继承关系
    class 关键字用于定义类
    constructor() 方法是类的构造函数，在实例化类的时候，会自动调用该函数
    super() 方法用于调用父类的构造函数，在子类的构造函数中，必须先调用super()方法，否则会报错
    extends 关键字用于实现继承，子类通过extends关键字继承父类
3.箭头函数 es6的新语法
    箭头函数没有自己的 this，它的 this 继承自外层作用域
    普通函数的 this 取决于调用方式（动态作用域）
    箭头函数没有 prototype 属性，不能使用 new 调用。
    箭头函数没有自己的 arguments 对象，但可以通过剩余参数（...args）获取参数
    箭头函数不能使用 yield 关键字
4.普通函数的this指向
    默认绑定：在非严格模式下，直接调用函数时，this 指向全局对象
    隐式绑定：当函数作为对象的方法调用时，this 指向调用该方法的对象
    显式绑定：使用 call、apply 或 bind 方法显式指定 this 的指向
    new 绑定：当函数作为构造函数使用 new 调用时，this 指向新创建的对象。
5.深拷贝
    JSON.parse(JSON.stringify(obj))
        不能拷贝 undefined、Symbol、Function 类型的值
        不能识别 BigInt 类型，如果obj中有 BigInt 类型，会报错
        不能处理循环引用——就是 obj.c = obj.like;  obj.like.m = obj.c，出现这样的代码会报错
6.字符串的方法
    str.trim() 去掉字符串首尾空格
    str.split(separator) 按分隔符分割字符串为数组
    str.concat(str2, ...) 拼接字符串（等效于 + 操作符）
    str.includes(searchStr) 判断是否包含子字符串（ES6）
    str.indexOf(searchStr) 返回子字符串首次出现的索引（未找到返回 -1）
    str.lastIndexOf(searchStr) 返回子字符串最后一次出现的索引
    str.replace(search, replacement) 替换匹配的子字符串（默认只替换第一个匹配项）
    str.toUpperCase() 转换为全大写
    str.toLowerCase() 转换为全小写
    str.charCodeAt(index) 返回字符的 Unicode 编码
7.类型判断
    对于基本数据类型 -->typeof xxx
    对于引用数据类型 -->instanceof 该方法的原理主要是通过测试该对象是否出现在某个构造函数或者其原型链上任意构造函数的实例
    对于任何类型 --->Object.prototype.toString.call(xxx)
8.关于this指针的绑定
    call 立即执行 参数一个一个接收 如call(this,a,b,c)
    apply 立即执行 接收一个参数数组 如apply(this,[a,b,c])
    bind 不立即执行只加工函数 一个一个接收 如bind(this,a,b,c)
9.数组的方法
    push返回的是新数组的长度不是数组,慎用return arr.push(...args)
    Array.prototype.some() 该方法会遍历数组中的所有数据，每次遍历都会执行一个回调函数返回一个Boolean值。直到某次遍历返回的Boolean为true将会停止遍历返回true。如果遍历所有都没有返回false，有三个参数val index arr
    splice() 方法返回一个新数组，包含被删除的元素。如果没有删除元素，则返回一个空数组
        使用示例
            删除元素
            const fruits = ['apple', 'banana', 'cherry', 'date'];
            // 从索引 1 开始删除 2 个元素
            const removed = fruits.splice(1, 2);

            console.log(fruits); // 输出: ['apple', 'date']
            console.log(removed); // 输出: ['banana', 'cherry']
            添加元素
            const fruits = ['apple', 'banana', 'cherry'];
            // 从索引 1 开始删除 0 个元素，并插入 'orange' 和 'grape'
            fruits.splice(1, 0, 'orange', 'grape');
            console.log(fruits); // 输出: ['apple', 'orange', 'grape', 'banana', 'cherry']
            替换元素
            const fruits = ['apple', 'banana', 'cherry'];
            // 从索引 1 开始删除 1 个元素，并插入 'orange'
            const removed = fruits.splice(1, 1, 'orange');
            console.log(fruits); // 输出: ['apple', 'orange', 'cherry']
            console.log(removed); // 输出: ['banana']
            删除末尾元素
            const fruits = ['apple', 'banana', 'cherry'];

            // 从索引 -1（倒数第一个元素）开始删除 1 个元素
            const removed = fruits.splice(-1, 1);
            console.log(fruits); // 输出: ['apple', 'banana']
            console.log(removed); // 输出: ['cherry']
            删除所有元素
            const fruits = ['apple', 'banana', 'cherry'];
            // 从索引 0 开始删除所有元素
            const removed = fruits.splice(0);
            console.log(fruits); // 输出: []
            console.log(removed); // 输出: ['apple', 'banana', 'cherry']


