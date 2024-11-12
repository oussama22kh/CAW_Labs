function setOne(arr) {
  let a = [];

  function check(b) {
    if (!a.includes(b)) {
      a.push(b);
      return true;
    }
    return false;
  }
  return arr.filter(check);
}

console.log(setOne([4, 5, 5, 2, 2, 4, 3, 1, 5, 2]));
