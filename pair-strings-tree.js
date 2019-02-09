const findPairs = (data) => {

  const tree = data.reduce((memo, line, index) => {
    const len = line.length;
    let ref = memo;
    for(let i=0; i<len; i++){
      const letter = line.charAt(i);
      if(!(letter in ref)){
        ref[letter] = {};
      }
      ref = ref[letter];
    }
    if(!("lines" in ref)){
      ref.lines = [];
    }
    ref.lines.push(index);
    return memo;
  }, {});

  const getPairs = (branch1, branch2) => {
    const pairs = [];
    if("lines" in branch1){
      const lines1 = branch1.lines, lines2 = branch2.lines;
      for(let i=0 ; i<lines1.length ; i++){
        for(let j=0 ; j<lines2.length ; j++){
          pairs.push([lines1[i], lines2[j]]);
        }
      }
      return pairs;
    }

    for(let key in branch1){
      if(key in branch2){
        pairs.push(...getPairs(branch1[key], branch2[key]));
      }
    }
    return pairs;
  };

  const compare = (tree) => {
    if("lines" in tree) return [];

    const output = [];
    const branches = Object.values(tree);
    const len = branches.length;
    for(let i = 0 ; i < len-1 ; i++){
      const branch1 = branches[i];
      for(let j = i+1 ; j < len ; j++){
        const branch2 = branches[j];
        output.push(...getPairs(branch1, branch2));
      }
    }
    for(let i = 0 ; i < len; i++){
      output.push(...compare(branches[i]));
    }

    return output;
  };

  return compare(tree);

};

module.exports = findPairs;
