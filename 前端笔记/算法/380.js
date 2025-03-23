//这题抄的有时间再看看
var RandomizedSet = function() {
    this.nums=[]
    this.indices=new Map()
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if(this.indices.has(val)){
        return false
    }else{
        let index=this.nums.length
        this.indices.set(val,index)
        this.nums.push(val)
        return true
    }
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if(!this.indices.has(val)){
        return false
    }else{
        let index=this.indices.get(val)
        this.indices.delete(val)
        this.nums[index]=this.nums[this.nums.length-1]
        this.indices.set(this.nums[index],index)
        this.nums.pop()
        return true
    }
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const randomIndex = Math.floor(Math.random() * this.nums.length);
    return this.nums[randomIndex];
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */