function JLNew(context, ...args){
    let obj = {};
    obj.__proto__ = context.prototype;
    let res = context.apply(obj, args);
    return res instanceof Object ? res : obj;
  }