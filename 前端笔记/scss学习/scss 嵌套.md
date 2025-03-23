# scss 嵌套
1.简化选择器书写（用此和::v-deep覆盖element plus的样式会非常方便）
    #content article h1 { color: #333 }
    #content article p { margin-bottom: 1.4em } 
    #content aside { background-color: #EEE }

    ===》

    #content {
        article {
            h1 { color: #333 }
            p { margin-bottom: 1.4em }
        }
        aside { background-color: #EEE }
    }
2.在嵌套中使用&会替换为父选择器(在为父级选择器添加：hover等伪类时)
    article a {
        color: blue;
        &:hover { color: red }
    }
    
    ===》

    article a { color: blue }
    article a:hover { color: red }
3.群组选择器的嵌套
    .container h1, .container h2, .container h3 { margin-bottom: .8em }

    ==>

    .container {
        h1, h2, h3 {margin-bottom: .8em}
    }
4.嵌套属性 
    嵌套属性的规则是这样的：把属性名从中划线-的地方断开，在根属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中。就像css选择器嵌套一样，sass会把你的子属性一一解开，把根属性和子属性部分通过中划线-连接起来，最后生成的效果与你手动一遍遍写的css样式一样：
    如(如此不用再猜混合属性的值是什么了)
    nav {
        border-style: solid;
        border-width: 1px;
        border-color: #ccc;
    }

    nav {
        border: 1px solid #ccc;
        border-left: 0px;
        border-right: 0px;
    }