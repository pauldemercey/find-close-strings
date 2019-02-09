const findPairs = (data) => {
  const output = [];

  const getDistance = (s1, s2) => {
    const len = s1.length;
    if(len !== s2.length){
      return null;
    }
    let distance = 0;
    for(let i=0; i<len; i++){
      if(s1[i] !== s2[i]){
        distance += 1;
      }
    }
    return distance;
  }

  const dataLen = data.length;
  for (let i = 0; i < dataLen-1; i++) {
    let a = data[i];
    for (let j = i+1; j < dataLen; j++) {
      let b = data[j];
      const distance = getDistance(a, b);
      if(distance === 1){
        output.push([i, j]);
      }
    }
  }

  return output;

};

module.exports = findPairs;
