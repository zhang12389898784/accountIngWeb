# webpack相关

1.有哪些常见的loader
    raw-loader:加载文件原始内容
    file-loader:把文件输出到一个文件夹中通过url引入输出的文件
    url-loader:与file类似区别是大于阈值会交给file-loader处理，小于阈值会返回文件base64形式进行处理
    image-loader:加载压缩图片文件
    babel-loader:es6转换成es5
    ts-loader:将ts转js
    sass-loader
    eslint-loader
2.有哪些常见的Plugin
    define-plugin定义环境变量
    ignore-plugin忽略部分文件
    ....
3.loader和plugin的区别
    loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。因为webpack只认识js,所以loader就成了翻译官，对其他类型的资源进行转译的预处理工作