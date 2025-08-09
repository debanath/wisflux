# Basic Level - 1
## Theory
### What is JavaScript?
JavaScript is a high-level, interpreted Programming language that was originally created to make web pages intereactive

---
### What is the differnce btween let and var?
|               |                let                 |                   var                    |
| :-----------: | :--------------------------------: | :--------------------------------------: |
|     scope     |            block scoped            |             function scoped              |
| redeclaration | cannot be redeclared in same scope |            can be redeclared             |
|   hoisting    |     hoited but not initialized     | hoisted and initialized with `undefined` |

---

### Whay do we prefer const over var?

Becauseof the following reasons:
  - Block scope nature of the const, its often considered safer
  - Prevents accidental reassignment
  - No redeclaration
  - Shows clear intent that the varibale is meant to be constant and wont change
  - better error detection

---

### What is the use of javascript in web browsers?

Javascript is used in web browser to make pages interactive, validate forms before submission, create animation and make api calls to servers

---

### What are Objects?

Objects are collections of key-value paris that represent real world entities.

---

### What is an array and how is it different from an Object in Javascript?

arrays are ordered list with numeric indexes, where the indexing starts with 0, whereas, objects are unordered colletion with named keys.

---

### What is a function?

A reusuable block of code that performs a specific task.

```js
// Function declaration
function greet(name){
  return `Hello ${name}`;
}

// function call
greet("Deba");

// In the above code `name` is a parameter and `Deba` is an argument.
```

---

### How can we implement call by value and call by reference in Javascript?

call by value are usually used on primitive datatypes where only the copies are passed. But call by refrence are usually used in objects or arrays where the refrence is passed and changing it will modify the orignal value.

---

### What are the primitive data types in Javascript?

- number - `23`,`4.5`
- String - `"Hello"`
- Boolean - `true`,`false`
- Undefined - `undefined`
- Null - `null`

---

### What is DOM?

DOM stands for `Document Object Model`, it is a progeamming interface that represents HTML as a tree of objects that Js can manipulate

---

### Why do we need DOM?

We need DOM for creating dynamic content, event handling, animation, interactive web apps, etc. The DOM bridges the gap between static HTML and Dynamic JavaScript functionality.

---
## Programs
### Average of array nums in Javascript?
```js
let nums = [1,2,3,4];
let avg = nums.reduce((sum,num) => sum + num,0) / nums.length;
```
---

### Swap two numbers by reference?
```js
let nums = {a: 10, b: 20};
function swap(obj){
  [obj.a, obj.b] = [obj.b, obj.a];
}
```
---

### Print the fibonacci sequence?
```js
const fib = (n) => {
  let fibo = [0,1];
  for(let i = 2;i< n;i++){
    fibo[i] = fibo[i-1] + fibo[i-2];
  }

  return fibo;
}
```
---

### Sort an array by both ascending and descending order?
```js
let asc = arr.sort((a, b) => a - b);   // asc
let desc = arr.sort((a, b) => b - a);  // desc
```
---

### Show a variable value in an HTML webpage using DOM
```js
document.getElementById("elementId").textContent = variableValue;
```
---


# Basic Level - 2
## Theory
### Why do we use functions in JavaScript?
we use functions in js for the following characteristics:
- Reusability
- moduclarity
- organization
- abstraction
- avoid repetition

---

### What is Function Invocation?
it is the process of calling a function. It happens when we use parenthesis `()` after the function name.

---

### Does a function behave like an object in Javascript? Prove it by an example.
yes, functions are first class objects in js

example:
```js
function myFunc() { return "Hello"; }

// Add properties like an object
myFunc.customProperty = "I'm a property!";
myFunc.count = 0;

// Access properties
console.log(myFunc.customProperty); // "I'm a property!"
console.log(typeof myFunc); // "function" but also "object"

// Functions can be stored in variables
let func = myFunc;

// Functions can be passed as arguments
function execute(fn) { return fn(); }
execute(myFunc);
```

---

### What are Events in Javascript?
events are actions or occurrences that happen in the browser that JS can respont to. For example:
- user actions : clicks, typing, mouse movement
- browser actions: page loadiing, form submission

---

### What is a string?
a string is a sequence of characters used to represent text data. Strings are primitive data types in js

---

### What is an array? Is it static or dynamic in Javascript?
array is an ordered collection of elements. Js arrays are dynamic and can grow or shrink in size during runtime

---

### Difference between Map and Set?
|           Map            |            Set            |
| :----------------------: | :-----------------------: |
|  Stores key-value pairs  | Stores unique values only |
|   Keys can be any type   |  Values can be any type   |
| `map.get(key)` to access | `set.has(value)` to check |
| Allows duplicate values  |   No duplicates allowed   |

---

### Difference between Array and Map?
|           Array           |           Map            |
| :-----------------------: | :----------------------: |
|   Indexed (0, 1, 2...)    |     Key-value pairs      |
|     Ordered by index      |   Ordered by insertion   |
| `arr[<index>]` to access  | `map.get(key)` to access |
| Can have duplicate values |     Keys are unique      |

---

### What are array methods? List a few names?
Mutating methods: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`  
Non-mutating methods: `map()`, `filter()`, `reduce()`, `forEach()`, `find()`, `includes()`, `indexOf()`, `slice()`, `join()`, `concat()`

---

### In how many ways can we traverse through an array in Javascript?
- for loop: `for(let i = 0; i < arr.length; i++)`
- for...of loop: `for(let item of arr)`
- for...in loop: `for(let index in arr)`
- forEach(): `arr.forEach(item => console.log(item))`
- while loop: `while(i < arr.length)`
- map(): `arr.map(item => item * 2)`
- filter(): `arr.filter(item => item > 5)`

---

## Program
### Reverse an array? Input: [1, 2, 3, 4, 5, 6]
```js
let arr = [1, 2, 3, 4, 5, 6];
let reversed = [...arr].reverse(); // [6, 5, 4, 3, 2, 1]
```

---

### Explain the properties of the join array method function via program?
```js
let fruits = ['apple', 'banana', 'orange'];
console.log(fruits.join(' - ')); // "apple - banana - orange"
```

---

### Show all the values of an array in a html webpage using DOM and forEach method?
```js
let colors = ['red', 'green', 'blue'];
colors.forEach(color => {
    let div = document.createElement('div');
    div.textContent = color;
    document.body.appendChild(div);
});
```

---

### Merge to sets in javascript?
```js
let set1 = new Set([1, 2, 3]);
let set2 = new Set([3, 4, 5]);
let merged = new Set([...set1, ...set2]); // {1, 2, 3, 4, 5}
```

---

# Basic Level - 3
## Theory
<!-- TODO -->