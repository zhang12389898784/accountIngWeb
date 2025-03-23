# @-Rules 与指令 (@-Rules and Directives)

1.@import
    分音 (Partials)？？？？
2.@media与在css中一样只是其他sass语法可以应用于其中
    补充在css中@media的语法
        @media only screen and (max-width: 600px) {
            body {
                background-color: lightblue;
            }
        }
    not：not 关键字反正整个媒体查询的含义。
    only：only 关键字可防止旧版浏览器应用指定的样式，这些浏览器不支持带媒体特性的媒体查询。它对现代浏览器没有影响。
    and：and 关键字将媒体特性与媒体类型或其他媒体特性组合在一起。
3.@extend继承(不只是用于css选择器，还有伪类如a:hover)(看不太懂之后再补)
    .error {
    border: 1px #f00;
    background-color: #fdd;
    }
    .seriousError {
    @extend a:hover
    border-width: 3px;
    }
4.控制字符
    @if 使用方法 @if 条件{内容}@else if 条件{内容}@else{内容}
        $type: monster;
        p {
        @if $type == ocean {
            color: blue;
        } @else if $type == matador {
            color: red;
        } @else if $type == monster {
            color: green;
        } @else {
            color: black;
        }
        }
    @for （其实类似与js中的for of）
        使用方法 @for $var from <start> through <end> 结束 {}或者 @for $var from <start> to <end>
        through 与 to 的含义：当使用 through 时，条件范围包含 <start> 与 <end> 的值，而使用 to 时条件范围只包含 <start> 的值不包含 <end> 的值
    @each
        使用方法@each $var in <list> {内容}
    @while
        使用方法@while <condition> {内容}基本与@for 一样
5.混合指令
    @mixin 定义
    @include 导入
    可以传参
    @mixin sexy-border($color, $width) {
    border: {
        color: $color;
        width: $width;
        style: dashed;
    }
    }
    p { @include sexy-border(blue, 1in); }
6.函数指令
    @function 定义(我觉得单个属性的复杂生成用函数指令，多个属性的多次复用用混合指令)
    $grid-width: 40px;
    $gutter-width: 10px;

    @function grid-width($n) {
    @return $n * $grid-width + ($n - 1) * $gutter-width;
    }

    #sidebar { width: grid-width(5); }