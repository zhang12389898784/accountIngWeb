/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    if(nums[0]===0&&nums.length>1) return false
    if(nums.length===1) return true
    for(let i=0;i<nums.length;i++){
        if(nums[i]==0){
            console.log(i)
            let isBreak=false
            for(let j=i-1;j>=0;j--){
                console.log(nums[j]>i-j,nums[j],i-j,i)
                if(i===nums.length-1&&nums[j]===i-j){
                    return true
                }
                if(nums[j]>i-j){
                    isBreak=true
                }
            }
            if(!isBreak) return false
        }
    }
    return true
};
let nums = [2,0,0]
console.log(canJump(nums))