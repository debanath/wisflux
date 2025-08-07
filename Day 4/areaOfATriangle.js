const calcArea = (a,b,c) => {
  const s = (a+b+c)/2;
  const area = Math.sqrt(s*(s-a)*(s-b)*(s-c));
  return area;
}

console.log(calcArea(5,6,7))