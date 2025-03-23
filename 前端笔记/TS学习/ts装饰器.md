# ts装饰器(当前的博客讲的不好下次换一篇)

1.装饰器是什么
    他是一个表达式，该表达式被执行后返回一个函数，函数的入参分别为target,name,descriptor执行该函数后可能返回descriptor对象，用于配置target对象
2.装饰器的分类
    类装饰器
        function Greeter(target: Function): void {
        target.prototype.greet = function (): void {
            console.log("Hello Semlinker!");
        };
        }

        @Greeter//大致相当于将Greeter函数自动调用传入的参数是下面的类
        class Greeting {
        constructor() {
            // 内部实现
        }
        }

        let myGreeting = new Greeting();
        (myGreeting as any).greet(); // console output: 'Hello Semlinker!';
    属性装饰器
        function logProperty(target: any, key: string) {
        delete target[key];

        const backingField = "_" + key;

        Object.defineProperty(target, backingField, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        // property getter
        const getter = function (this: any) {
            const currVal = this[backingField];
            console.log(`Get: ${key} => ${currVal}`);
            return currVal;
        };

        // property setter
        const setter = function (this: any, newVal: any) {
            console.log(`Set: ${key} => ${newVal}`);
            this[backingField] = newVal;
        };

        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
        }

        class Person { 
        @logProperty//大抵和类修饰器一样只不过多了个参数
        public name: string;

        constructor(name : string) { 
            this.name = name;
        }
        }

        const p1 = new Person("semlinker");
        p1.name = "kakuqo";
    方法装饰器
            function log(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            let originalMethod = descriptor.value;
            descriptor.value = function (...args: any[]) {
                console.log("wrapped function: before invoking " + propertyKey);
                let result = originalMethod.apply(this, args);
                console.log("wrapped function: after invoking " + propertyKey);
                return result;
            };
            }

            class Task {
            @log//三个参数目标类，属性名，属性描述符
            runTask(arg: any): any {
                console.log("runTask invoked, args: " + arg);
                return "finished";
            }
            }

            let task = new Task();
            let result = task.runTask("learn ts");
            console.log("result: " + result);
    参数装饰器
            function Log(target: Function, key: string, parameterIndex: number) {
            let functionLogged = key || target.prototype.constructor.name;
            console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
                been decorated`);
            }

            class Greeter {
            greeting: string;
            constructor(@Log phrase: string) {
                this.greeting = phrase; 
            }
            }
