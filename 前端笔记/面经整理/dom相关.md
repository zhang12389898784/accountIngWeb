# dom相关
https://juejin.cn/post/6875674323042959368
1.事件
    onmouseover鼠标移入
    onmouseout鼠标移出
1.节点导航（以下都是属性不是方法）
    document 入口节点
    document.documentElement HTML节点
    document.head head节点
    document.body body节点

    node.parentNode 获取节点的父节点
    node.previousSibling 获取节点的上一个兄弟节点
    node.nextSibling 获取节点的下一个兄弟节点
    node.childNodes 获取节点的孩子节点返回数组
    node.firstChild node.lastChild 获取第一个和最后一个孩子节点

    纯元素导航属性
    node.parentElement
    elem.previousElementSibling
    elem.nextElementSibling
    elem.children
    elem.firstElementChild elem.lastElementChild
2.搜索节点
    document.getElementById(id)
    document.getElememtsByName(name)
    document/element.getElementsByTagName(tagName)
    document/element.getElementsByClassName(className)
    没有element..getElementById(id)，此系列获取的数据是动态的

    document/element.querySelectorAll(CSSSelector) 返回满足选择器的一组节点列表
    document/element.querySelector(CSSSelector) 返回第一个满足选择器的元素
    elem.matches(selector)可以检查某个元素是否与选择器匹配
    ，此系列获取的数据是静态的，参数是选择器的名字
3.节点通用操作
    判断节点类型
    node.nodeType===Node.ELEMENT_NODE
    node instanceof Element
    node instanceof HTMLInputElement
    判断是否拥有子节点 node.hasChildNodes()
    判断是否拥有特定子节点，node.contains(childNode)
4.元素节点的操作
    判断元素类型elem.tagName,elem.nodeName
    elem.innerHTML获取或设置元素内的HTML片段（注意：其内的脚本不会执行）
    elem.textContent 获取或设置元素内的文本元素
    innerHTML,textContent,innerHTML只适用于有子节点的元素，对于input这种自闭合元素不起作用，使用input。value获取值
    元素的特性和属性
        elem.hasAttribute(attrName) --检查是否存在某个特性
        elem.getAttribute(attrName) --获取某个特性的值
        elem.setAttribute(attrName,value) --设置某个特性的值
        elem.removeAttribute(attrName) --删除某个特性
        elem.attributes() --获取所有特性
        特殊的data-* 这是一种合法且安全的传递自定义数据的方式，可以通过elem.dataset.name获取或修改如elem上的data-apple-price对应elem.dataset.applePrice
    元素的类和样式
        elem.classList --一个包含elem所有类的可迭代的类数组对象
        elem.classList.contains(className) --判断是否包含某个类
        elem.classList.add(className) --添加一个类
        elem.classList.remove(className) --删除一个类
        elem.classList.toggle(className) --切换一个类
        elem.className --一个字符串，包含elem所有类
        如果需要直接设定元素的样式可以设置elem.style
        获取元素的最终应用的样式 getComputedStyle(elem) 他返回一个样式对象
    元素的位置和尺寸
        位置是相对于参照物的，对于一个元素有相对于父元素，相对于视口，相对于文档三种位置关系
            相对于 父元素：elem.offsetLeft elem.offsetTop,相对于参照父节点的左上边距。elem.offsetParent获取元素的定位父元素
            相对于 窗口：elem.getBoundingClientRect() 返回一个对象，
                包含top,left,right,bottom,width 分别表示元素盒子四角到视口左或上的距离
                width，height 表示元素盒子的宽高
            相对于文档：没有直接的获取方式，需根据相对于视口+滚动距离简单计算
                上：elem.scrollTop+elem.getBoundingClientRect().top
                左：elem.scrollLeft+elem.getBoundingClientRect().left
        元素的盒子的尺寸也有多种情况，需要考虑边框，内边距，是否为标准盒子模型，是否有滚动条
            含边框的盒子尺寸：elem.offsetWidth/offsetHeight或elem.getBoundingClientRect().width/height
            边框宽度：elem.clientLeft/clientTop/clientRight/clientBottom
            含内边距的盒子尺寸：elem.clientWidth/clientHeight
            elem.scrollLeft/scrollTop滚动的长度
            elem.scrollWidth/scrollHeight滚动的内容的尺寸
5.修改文档
    插入节点 分三步
        创建一个节点 
            document.createElement(tagName) 元素节点
            document.createTextNode(data)
            从已有节点复制let dupNode=node.cloneNode(deep) deep为true表示深拷贝，默认false
        编辑节点的属性和内容
        把节点插入文档树中
            传统方式
                parentNode.appendChild(node)
                parentNode.insertBefore(node,nextSibling)在nextSibling之前插入node
            现代方式
                .....(烦了之后再补)
    移除节点 node.remove() node.parentNode.removeChild(node)
    替换节点 node.replaceWith(newNode) parentNode.repalceChild(newNode,node)
6.事件处理
    事件类型
        鼠标事件 click contextmenu鼠标右键 dblclick双击 mousedown鼠标按键按下 mouseup鼠标按键释放 mouseover鼠标移入（冒泡） mouseout 鼠标移出（冒泡） mouseenter鼠标进入元素 mouseleave鼠标离开元素
        键盘事件keydown 键盘按键按下 keyup 键盘按键释放
        表单事件 submit change input focus获得焦点时 blur失去焦点时
        窗口/文档事件 load DOMContentLoaded HTML解析完成时触发 resize窗口尺寸变化 scroll滚动事件 beforeunload窗口关闭前触发
    事件流
        事件捕获 事件从整个文档依次向最小目标捕获
        事件冒泡  事件事件从最小目标向整个文档依次冒泡
        dom事件规范 事件捕获阶段->目标阶段->事件冒泡阶段
    事件处理函数
        1.HTML特性处理在HTML标签中使用on<event>特性
        2.DOM 0级事件处理函数 把处理函数赋值给节点的对象的on<event>事件
        3.DOM 2级事件处理函数 addEventListener(event,handler,capture) capture为true表示捕获，false表示冒泡
        补充:    HTML事件处理函数和0级的不同
                    HTML
                    onclick="fun()"
                    ==>node.onclick=function(event){
                        func()
                    }
                    删除2级事件处理函数 node.removeEventListener(event,handler) handler必须和addEventListener的handler一致
        4.事件处理函数的参数
            node.handler(event)
            函数内部的this指向当前节点
    事件对象
        event.preventDefault() --阻止默认行为只对捕获事件起效
        event.stopPropagation() --阻止事件冒泡只对冒泡事件起效
        event.stopImmediatePropagation() --阻止事件冒泡和捕获，只对当前事件起效
        event.target --事件的最小目标
        event.currentTarget --事件的当前目标
        event.type --事件的类型
        event.phase --事件流类型 1捕获 2目标 3冒泡
        event.bubbles --事件是否冒泡
        event.cancelable --事件是否可取消默认行为
        event.trused --事件是否为浏览器生成的
        上面的属性是通用的，且只读
    鼠标事件 
        鼠标点击时会发生一系列的事件他们具有特点的顺序以某次双击为例，依次触发事件mousedown->mouseup->click->mousedown->mouseup->click->dbclick
        鼠标事件相关属性
        鼠标按键 mousedown/mouseup event.button --0左键 1中键 2右键 3滚轮键前进 4滚轮键后退
        鼠标位置 mousemove event.clientX/event.clientY --鼠标相对于视口左上角的位置
                            event.pageX/event.pageY --鼠标相对于文档左上角的位置
                            event.screenX/event.screenY --鼠标相对于屏幕左上角的位置
        组合键event.ctrlKey/event.altKey/event.shiftKey
    键盘事件 （烦烦烦以后再说）


    资源事件
        页面生命周期事件
            DOMContentLoaded HTML解析完成时触发
            load 所有资源加载完成时触发
            beforeunload 页面关闭前触发
            unload 页面关闭时触发
    表单操作
