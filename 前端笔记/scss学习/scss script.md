# scss script

1. Interactive Shell ????
    Interactive Shell 可以在命令行中测试 SassScript 的功能。在命令行中输入 sass -i，然后输入想要测试的 SassScript 查看输出结果：

    $ sass -i
    >> "Hello, Sassy World!"
    "Hello, Sassy World!"
    >> 1px + 1px + 1px
    3px
    >> #777 + #777
    #eeeeee
    >> #777 + #888
    white
2.变量
3.数据类型
    数字，1, 2, 13, 10px
    字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
    颜色，blue, #04a3f9, rgba(255,0,0,0.5)
    布尔型，true, false
    空值，null
    数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
    maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)
    3.1
        SassScript 支持 CSS 的两种字符串类型：有引号字符串 (quoted strings)，如 "Lucida Grande" 'https://sass-lang.com'；与无引号字符串 (unquoted strings)，如 sans-serif bold，在编译 CSS 文件时不会改变其类型。只有一种情况例外，使用 #{} (interpolation) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名：

        @mixin firefox-message($selector) {
        body.firefox #{$selector}:before {
            content: "Hi, Firefox users!";
        }
        }
        @include firefox-message(".header");
        编译为

        body.firefox .header:before {
        content: "Hi, Firefox users!"; }
