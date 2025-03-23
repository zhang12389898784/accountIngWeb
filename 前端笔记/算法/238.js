/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let l=[],r=[]
    l[0]=1
    r[0]=1
    for(let i=1;i<nums.length;i++){
        l[i]=l[i-1]*nums[i-1]
    }
    for(let i=1;i<nums.length;i++){
        r[i]=r[i-1]*nums[nums.length-i]
    }
    return l.map((item,index)=>{
        return item*r[nums.length-index-1]  
    })
};
var nums = [1,2,3,4]
console.log(productExceptSelf(nums))