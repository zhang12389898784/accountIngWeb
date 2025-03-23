/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfit = 0;
    let minPrice = prices[0];
    prices.forEach(element => {
        if(element<minPrice){
            minPrice = element;
        }else{
            maxProfit = Math.max(maxProfit,element-minPrice);
        }
    });
    return maxProfit;
};
console.log(maxProfit([7,1,5,3,6,4]))