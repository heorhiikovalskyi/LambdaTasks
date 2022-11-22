function BinarySearch(IPMatrix, IP){
    let left = 0
    let right = IPMatrix.length - 1
    let mid
    while (left <= right){
        mid = Math.round(left + (right - left) / 2) 
        if(IP < IPMatrix[mid][0]){
            right = mid - 1 
        }
        else if(IP > IPMatrix[mid][1]){
            left = mid + 1
        }
        else{
            return IPMatrix[mid]
        }
    }
}
function IPToDecimal(IP){
IP = IP.split(".")
let decimal = 0
for (let i = 0; i < IP.length; i++){
    decimal += IP[i] * Math.pow(256, 3 - i)
}
return decimal}

export{
    IPToDecimal,
    BinarySearch
}
