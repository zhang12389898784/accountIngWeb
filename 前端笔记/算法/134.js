/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    for(let i=0;i<gas.length;i++){
        let total=0
        let num=0
        if(gas[i]>cost[i]){
            total+=(gas[i]-cost[i])
            num++
            for(let j=0;j<gas.length-1;j++){
                let cur=(i+j+1)<gas.length? i+j+1:i+j+1-gas.length
                console.log(i,cur,gas[cur],cost[cur],total)
                if(gas[cur]+total>=cost[cur]){
                    total=total+gas[cur]-cost[cur]
                    num++
                }
                else{
                    break;
                }

            }
            console.log(num,i)
            if(num===gas.length){
                return i
            }
        }
    }
    return -1
};
var gas = [1,2,3,4,5], cost = [3,4,5,1,2]
console.log(canCompleteCircuit(gas,cost))