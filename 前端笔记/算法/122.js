/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfit = 0;
    let minPrice = prices[0];
    let totallPrice=0;
    for(let i=1;i<prices.length;i++){
        if(prices[i-1]<=prices[i]){
            maxProfit=prices[i]-minPrice
        }else{
            minPrice=prices[i]
            totallPrice+=maxProfit
            maxProfit=0
        }

    }
    totallPrice+=maxProfit
    return totallPrice
};
var prices = [7,1,5,3,6,4]
console.log(maxProfit(prices))