module.exports = function zeros(expression) {

  let {twos, fives} = expression
    .split('*')
    .map((factor) => {
      return countFactorsOfTen(factor);
    })
    .reduce((counts, {twos, fives}) => {
      counts.twos += twos;
      counts.fives += fives;
      return counts
    }, {twos: 0, fives: 0});
    
  return (twos < fives) ? twos : fives;
}

function countFactorsOfTen(str){

  const number = parseInt(str);
  const isDoubleFactorial = str[str.length - 2] === '!';

  if (!isDoubleFactorial){
    return {
      twos: countForSingle(2, number),
      fives: countForSingle(5, number)
    }
  } else {
    return {
      twos: countForDouble(2, number),
      fives: countForDouble(5, number)
    }
  }
}

function countForSingle(prime, number){
  let primeInPow = prime;
  let count = 0;
  
  while (primeInPow <= number){
    count += (number / primeInPow) | 0;
    primeInPow *= prime;
  }
  
  return count;
}

function countForDouble(prime, number){

  let isNumberEven = number % 2 === 0;
  
  if (prime === 2 && !isNumberEven){
    return 0;
  }
  
  if (prime === 2 && isNumberEven){
    return countForSingle(prime, number);
  }

  let count = 0;
  let start = (isNumberEven) ? 2 : 1;

  for (
    let factor = start;
    factor <= number;
    factor += 2
  ){
    let subFactor = factor;
    
    while (subFactor % prime === 0){
      count++;
      subFactor /= prime;
    }
  }

  return count;
}
