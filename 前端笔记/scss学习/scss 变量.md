# scss 变量
1. 定义变量 $zzz 可以出现在规则块之外，也可以出现在规则块中在其中便只会作用于其中
2. 数据类型：
   数组
   字符串(分为有引用字符串和无引用字符串)
   颜色
   布尔型
   空值
   数组，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
   maps, 相当于 JavaScript 的 object (key1: value1, key2: value2)
3.数组的功能大多都在sass list functions中nth函数可以直接访问数组中的某一项，join 函数可以合并数组,append可以在数组中添加新值，@each可以遍历数组中的每一项
4.maps， Maps中的keys和values可以是sassscript的任何对象， 和Lists一样Maps主要为sassscript函数服务， map-get函数用于查找键值，map-merge函数用于map和新加的键值融合，@each命令可添加样式到一个map中的每个键值对。 Maps可用于任何Lists可用的地方，在List函数中 Map会被自动转换为List (反之则不能)
5.插值语句 通过 #{} 插值语句可以在选择器或属性名中使用变量：
6.!default 可以在变量的结尾添加 !default 给一个未通过 !default 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值