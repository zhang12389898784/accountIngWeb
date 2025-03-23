/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    if(nums.length===1){
        return 0
    }
    let num=0
    let getMaxPath = function(nums, index) {
        num++
        console.log(index,"s")
        if(index+nums[index]>=nums.length-1){
            return index
        }
        let maxPath = 0;
        let maxPathIndex=index
        for(let i = index + 1; i <= index+nums[index]; i++){
            let curPath=nums[i]+i
            if(curPath>maxPath){
                maxPath = curPath
                maxPathIndex=i
            }
        }
        if(maxPathIndex+nums[maxPathIndex]>=nums.length-1){
            num++
            return maxPathIndex
        }else{
            return getMaxPath(nums, maxPathIndex)
        }
    }
    let maxPathIndex = getMaxPath(nums, 0)
    return num
};
let nums = [2,3,0,1,4]
console.log(jump(nums))