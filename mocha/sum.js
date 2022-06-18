module.exports = function (...rest) {
  let sum = 0;
  for (let i of rest) {
    sum += i;
  }

  return sum;
};
