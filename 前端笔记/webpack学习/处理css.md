# 处理css
1.识别css css-loader
2.处理css
    style-loader 将css写入js插入到style标签中
    mini-css-extract-plugin 将css单独打包成文件
3.css预处理器如less 加入less-loader
4.css压缩 css-minimizer-webpack-plugin 将css压缩成没有换行和空格
5.处理文件 file-loader(基础的识别处理) url-loader（基于file-loader）