# Day 4

## classes and object
Classes are like a blueprint or template that is being copied by the object when it is created

## function
syntax:
```js
// Using function keyword
function fnName(params1, param2){
  // Logic
  return expression
}

// arrow function (concise)
const fnName2 = (params1,params2) => expression

// arrow function (block body)
const fnName3 = (params1, params2) => {
  return expression;
}
```

## Object
syntax:
```js
const obj = {
  key : "val",
  key2 : "val2"
}
```

> [!NOTE]  
> each `key-value` pair in an object is called a `property`

> [!WARNING]  
> In js `&&(and)` and `||(or)` are evaluated a bit differnt from orther programming language. It uses the concept of truthy and falsy value. If there is a falsy value somewhere rather can returing false it returns the value of the falsy value instead. Falsy values include `false`,`0`,`empty string`,`null`,`undefined` and `NaN`. All other values are truthy

> [!IMPORTANT]  
> in js object cannot be compared easily by just using the `==` or `===` operator because these check for the refrence instead of the value of the object. To compare value we'll have to use some library or create our own function that will check for each property and make sure that they are equal or not.

> [!NOTE]  
> The same thing applies to array because array in js are also like object where the index is the key and the element inside is the value

## [1,2,3].forEach(console.log)
```js
[1,2,3].forEach(console.log)
```
### what happend here?
- `.forEach()` takes a callback function and calls it for each element in the array
- `console.log` can be passes directly as the callback

under the hood it looks something like this:
```js
[1,2,3].forEach((element,index,array)=> {
  console.log(element,index,array);
})
```