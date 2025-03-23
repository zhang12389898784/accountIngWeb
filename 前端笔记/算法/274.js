/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    let num=0,count=0,H=0
    citations.sort(function(a,b){return b-a})
    citations.forEach(element => {
        num++
        count=element
        let curH=Math.min(num,count)
        if(curH>H){
            H=curH
        }
    });
    return H
};
var citations = [3,0,6,1,5]
console.log(hIndex(citations))