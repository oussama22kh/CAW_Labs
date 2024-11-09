 function mean(scores) {
  let average = 0;
  scores.forEach((element) => {
    average += element;
  });
  average = average / scores.length;
  return average;
}

module.exports = mean()