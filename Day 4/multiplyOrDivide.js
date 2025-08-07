const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const multiplyBtn = document.getElementById("multiply");
const divideBtn = document.getElementById("divide");
const ans = document.getElementById("answer");

multiplyBtn.addEventListener("click",()=> {
  const num1 = parseFloat(n1.value);
  const num2 = parseFloat(n2.value);

  if(isNaN(num1) || isNaN(num2)){
    ans.textContent = "Please enter valid numbers";
    return;
  }

  ans.innerHTML = `The Result Is: <br> ${num1*num2}`;
})

divideBtn.addEventListener("click",()=> {
  const num1 = parseFloat(n1.value);
  const num2 = parseFloat(n2.value);

  if(isNaN(num1) || isNaN(num2)){
    ans.textContent = "Please enter valid numbers";
    return;
  }

  if(num2 === 0){
    ans.textContent = "Cannot divide by 0";
    return;
  }

  ans.innerHTML = `The Result Is: <br> ${num1/num2}`;
})