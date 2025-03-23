# scss 混入

5.混合器
    混合器使用@mixin标识符定义。看上去很像其他的CSS @标识符，比如说@media或者@font-face。这个标识符给一大段样式赋予一个名字，这样你就可以轻易地通过引用这个名字重用这段样式。下边的这段sass代码，定义了一个非常简单的混合器，目的是添加跨浏览器的圆角边框。
    @mixin rounded-corners {
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
    }
    然后就可以在你的样式表中通过@include来使用这个混合器，放在你希望的任何地方。@include调用会把混合器中的所有样式提取出来放在@include被调用的地方。如果像下边这样写：
    notice {
        background-color: green;
        border: 2px solid #00aa00;
        @include rounded-corners;
    }
6.给混合器传参
    混合器并不一定总得生成相同的样式。可以通过在@include混合器时给混合器传参，来定制混合器生成的精确样式。当@include混合器时，参数其实就是可以赋值给css属性值的变量。如果你写过JavaScript，这种方式跟JavaScript的function很像：

    @mixin link-colors($normal, $hover, $visited) {
        color: $normal;
        &:hover { color: $hover; }
        &:visited { color: $visited; }
    }
    当混合器被@include时，你可以把它当作一个css函数来传参。如果你像下边这样写：

    a {
        @include link-colors(blue, red, green);
    }