# vue相关

1.composition   options
    组合式通过函数封装可跨组件复用 受限于选项名称复用需复制代码
    关于代码组织 组合式按逻辑拆分 选项式分散在data,methods等选项中
2.事件总线   Event Bus：实现组件间的跨组件通信（在vue2中使用，vue3删除但可自己实现或调用库）