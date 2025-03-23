# ts函数

1.参数类型和返回类型
    function A(name:string,id:number):string{
        return name+id;
    }
2.函数类型(chars:string,nums:number)=>string
3.可选参数（可选参数要放在默认参数后面防止编译错误）
    function A(name:string,id？:number):string{
        return name+id;
    }
4.函数重载??