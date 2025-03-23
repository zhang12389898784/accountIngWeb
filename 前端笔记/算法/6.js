/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if(numRows===1) return s
    let arr=new Array()
    let pre=0
    let index=0
    while(s.length>pre){
        let cur=index%2===0? pre+numRows:pre+numRows-2
        arr.push(s.slice(pre,cur))
        pre=cur
        index++
    }
    let curS=''
    for(let i=0;i<numRows;i++){
        arr.forEach((item,index)=>{
            if(i===0||i===numRows-1){
                if(index%2===0) curS=item[i]? curS+item[i]:curS
            }
            else{
                if(index%2===0) curS=item[i]? curS+item[i]:curS
                else{
                    curS=item[numRows-i-2]? curS+item[numRows-i-2]:curS
                }
            }
        })
    }
    return curS
};
var s = "AB", numRows = 1
console.log(convert(s,numRows))