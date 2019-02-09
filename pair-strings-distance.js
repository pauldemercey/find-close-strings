const findPairs = (data) => {
  // distribution gathers position after position the count of characters
  let distribution = data.reduce((memo, line) => {
    let len = line.length;
    for(let i=0; i<len; i++){
      if(!memo[i]){
        memo.push(new Map());
      }
      let map = memo[i];
      let char = line.charAt(i);
      if(!map.has(char)){
        map.set(char, 0);
      }
      let count = map.get(char);
      map.set(char, count+1);
    }
    return memo;
  }, []);

  const reference = distribution.map((map) => {
    let max = 0, char;
    map.forEach((value, key) => {
      if(value > max){
        max = value;
        char = key;
      }
    });
    return char;
  }).join('');

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

  let maxDistance = 0;

  let dataBydistance = data.reduce((memo, item, index) => {
    // const steps = getSteps(item, reference);
    // const distance = Object.keys(steps).length;
    const distance = getDistance(item, reference);
    if(distance > maxDistance){
      maxDistance = distance;
    }
    if(!memo.has(distance)){
      memo.set(distance, []);
    }
    const items = memo.get(distance);

    items.push(
      index
    );

    return memo;
  }, new Map);

  let distance = -1;

  const output = [];

  const compareAToSet = (a, list) => {
    const len = list.length;
    const aVal = data[a];
    for(let i = 0 ; i<len ; i++){
      const b = list[i];
      // const comparison = compareAB(a, b);
      const dist = getDistance(aVal, data[b]);
      //if(comparison === 1){
      if(dist === 1){
        output.push(
          [a, b]
          );
      }
    }
  }

  while(distance <= maxDistance){
    distance += 1;
    if(!dataBydistance.has(distance)){
      continue;
    }
    const isSameDistanceSearch = distance > 0;
    const nextDist = distance+1;
    const isCrossDistanceSearch = dataBydistance.has(nextDist);
    const items = dataBydistance.get(distance);

    const len = items.length;
    for(let i = 0 ; i<len ; i++){
      const a = items[i];

      if(isSameDistanceSearch){
        compareAToSet(a, items.slice(i+1));
      }

      if(isCrossDistanceSearch){
        const nextList = dataBydistance.get(distance+1);
        if(distance > 0){
          compareAToSet(a, nextList);
        } else {
          const len = nextList.length;
          for(let i = 0 ; i<len ; i++){
            output.push([a, nextList[i]]);
          }
        }
      }
    }
  }

  return output;

};

module.exports = findPairs;
