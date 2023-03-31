const binarySearch = (ipMatrix, ip) => {
  let left = 0;
  let right = ipMatrix.length - 1;
  let mid;
  while (left <= right) {
    mid = Math.round(left + (right - left) / 2);
    const [startIp, endIp] = ipMatrix[mid];
    if (ip < startIp) right = mid - 1;
    else if (ip > endIp) left = mid + 1;
    else return ipMatrix[mid];
  }
};
const ipToDecimal = (ip) => {
  ip = ip.split(".");
  let decimal = 0;
  ip.forEach((number, index) => (decimal += number * Math.pow(256, 3 - index)));
  return decimal;
};

export { ipToDecimal, binarySearch };
