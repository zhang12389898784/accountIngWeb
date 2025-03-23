# ts相关

1.interface 和 type 的区别
    interface：支持声明合并 type：不允许重复定义
    interface：通过 extends 继承 type：通过 & 交叉类型
    如：
        interface Animal { name: string }
        interface Dog extends Animal { breed: string }

        type Animal = { name: string }
        type Dog = Animal & { breed: string }
    interface：主要用于定义对象结构 type：可定义更复杂的类型如：联合类型 元组类型 函数类型