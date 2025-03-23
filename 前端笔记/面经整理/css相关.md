# css相关

1.flex介绍
    使用：dispaly:flex
    核心属性：
        flex:flex-grow,flex-shrink,flex-basis
        flex-direction主轴方向：row(默认，水平从左到右),row-reverse，column(垂直排列从上到下)
        justify-content 主轴对齐方式 flex-start/flex-end/center/space-around/space-between
        align-items 交叉轴对齐方式：stretch/??
        align-self 单个项目交叉轴对齐方式
        flex-wrap 是否启用多行列布局 wrap允许换行
        order 排序
3.Grid
    使用：display: grid 
    基本概念
    网格容器，网格项，网格线，网格轨道（是相邻两网格之间的空间）网格区域
    基本用法
    grid-template-columns: 100px 100px 100px; /* 定义 3 列，每列宽度为 100px */
    grid-template-rows: 100px 100px; /* 定义 2 行，每行高度为 100px */
    gap: 10px; /* 设置行和列之间的间距 
    grid-column-start / grid-column-end：定义网格项的列起始和结束位置。
    grid-row-start / grid-row-end：定义网格项的行起始和结束位置。
    grid-area：简写属性，定义网格项的区域。
    justify-items设置网格项水平对齐
    align-item设置网格项垂直对齐
    justify-content：设置整个网格在容器中的水平对齐方式。
    align-content：设置整个网格在容器中的垂直对齐方式。
    repeat()、minmax() 和 auto-fill / auto-fit 等特性动态调整布局。
2.BFC
    BFC是css渲染页面时创建的一个独立的渲染区域，它规定了内部的块级盒子如何布局并且与外部元素相互隔离，BFC内部的元素不会影响外部的元素反之亦然
    如何触发 BFC
        根元素（<html>）
        浮动元素：float 的值不为 none。
        绝对定位元素：position 为 absolute 或 fixed。
        display 为以下值：inline-block,table-cell,table-caption,flex,inline-flex,grid,inline-grid
        overflow 不为 visible：例如 overflow: hidden、overflow: auto、overflow: scroll
    BFC特性
        外边距折叠
        在同一个 BFC 中，相邻的块级元素的外边距（margin）会发生折叠（合并）。
        但是，不同 BFC 之间的外边距不会折叠。
        包含浮动元素当一个父元素包含浮动子元素时，父元素的高度会塌陷（高度为 0）。通过触发父元素的 BFC，可以解决这个问题
        阻止元素被浮动元素覆盖BFC 区域不会与浮动元素重叠。例如，当一个元素设置了浮动，另一个元素没有设置浮动时，浮动元素可能会覆盖非浮动元素。通过触发非浮动元素的 BFC，可以避免这种情况
3. Flex布局和Grid布局有什么区别？