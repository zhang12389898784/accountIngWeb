/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
   let pre,cur,end1;
   console.log(nums)
   end1=nums[nums.length-1]
   for(let i=0;i<k;i++){
      pre=nums[i]
      cur=nums[i+k]
      nums[i]=end1
      nums[i+k]=pre
      end1=cur
   }
   return nums
};
var nums = [1,2,3,4,5,6,7], k = 3
console.log(rotate(nums,k))