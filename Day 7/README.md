# Basic Level - 4
## Theory
### What are anonymous functions in JavaScript?
Anonymous functions are functions without a name identifier. They are often used as:
```js
// Named function
function namedFunction() {
  return "I have a name";
}

// Anonymous function expression
const anonymousFunc = function() {
  return "I'm anonymous";
};

// Arrow function (always anonymous)
const arrowFunc = () => "I'm an anonymous arrow function";

// Arrow function Event handler version
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

---

### Explain strict comparison and Abstract comparison in javascript?
**Abstract Comparison (`==`)**  
Uses type coercion - converts operands to same type before comparing.

```js
console.log(5 == "5");     // true (string "5" converted to number)
console.log(true == 1);    // true (boolean converted to number)
```
**Strict Comparison (`===`)**  
No type coercion - compares both value and type.

```js
console.log(5 === "5");    // false (different types)
console.log(true === 1);   // false
console.log(false === 0);  // false
console.log(null === undefined); // false
console.log("" === 0);     // false

// Only true when type and value match
console.log(5 === 5);      // true
console.log("hello" === "hello"); // true
console.log(true === true); // true
```

---

### Difference b/w arrow functions and regular functions?
|           Feature            |               Regular Functions               |                 Arrow Functions                  |
| :--------------------------: | :-------------------------------------------: | :----------------------------------------------: |
|            Syntax            |      Defined using the function keyword.      |             Uses concise => syntax.              |
|         this Binding         |     this depends on the calling context.      |    Inherits this from the surrounding scope.     |
|       Arguments Object       |         Has its own arguments object.         |     Does not have its own arguments object.      |
|      Constructor Usage       |    Can be used as a constructor with new.     |         Cannot be used as a constructor.         |
|           Hoisting           |      Function declarations are hoisted.       |       Not hoisted; behaves like variables.       |
|       Implicit Return        |     Requires return for returning values.     | Supports implicit return for single expressions. |
| Methods as Object Properties | Suitable for object methods with proper this. |  Not suitable for methods due to lexical this.   |

---

### What is Hoisting in JavaScript?
Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation,before the code is executed.

`var` variables:
Variables declared with `var` are hoisted and initialized with `undefined`. This allows you to access them before their declaration, but their value will be `undefined` until the line of code where they are assigned a value is reached.   

`let` and `const` variables:
Variables declared with `let` and `const` are also hoisted, but they are not initialized. Instead, they enter a "Temporal Dead Zone" (TDZ) until their declaration line is executed. Attempting to access them within the TDZ will result in a `ReferenceError`.  

Function Declarations:
Function declarations (defined using the `function` keyword) are fully hoisted, meaning both the declaration and the function's body are moved to the top. This allows you to call these functions before their definition in the code.  

Function Expressions:
Function expressions (e.g., `const myFunction = function() {}`) are not hoisted in the same way as function declarations. Only the variable declaration (e.g., `myFunction`) is hoisted, not the function itself. Therefore, attempting to call a function expression before its definition will result in a `TypeError` if declared with `var` (as the variable will be `undefined`), or a `ReferenceError` if declared with `let` or `const` (due to the TDZ).

---

### JavaScript is a garbage collected programming language, explain how?
JavaScript employs an automatic memory management system known as garbage collection to reclaim memory occupied by objects that are no longer needed by the program. This process is handled by the JavaScript engine (e.g., V8 in Chrome, SpiderMonkey in Firefox) and operates in the background, meaning developers do not manually allocate or deallocate memory. 

The primary mechanism for garbage collection in JavaScript is the mark-and-sweep algorithm, which functions as follows:

Roots Identification:
The garbage collector starts by identifying "roots," which are objects known to be actively in use. These typically include:
- The global object (e.g., `window` in browsers, `global` in Node.js).
- Objects referenced from the current call stack (variables in active function calls).
- Objects referenced from JavaScript closures.   
  
Marking Phase:  
From these roots, the garbage collector traverses the object graph, following all reachable references. Any object found during this traversal is marked as "reachable" and therefore still in use. This process continues recursively until all objects directly or indirectly reachable from the roots have been marked.  

Sweeping Phase:  
After the marking phase is complete, the garbage collector "sweeps" through the memory heap. Any objects that were not marked during the marking phase are considered "unreachable" and thus no longer needed. The memory occupied by these unmarked objects is then deallocated and returned to the system for future use. 

This automatic process ensures that memory leaks are minimized and efficient memory utilization is maintained without requiring manual memory management by the developer.


---

### Explain Shallow copy vs Deep copy in Javascript?
**Shallow Copy**  
Creates a new object, but nested objects are still referenced.

```js
let original = {
    name: "John",
    address: {
        city: "NYC",
        zip: "10001"
    }
};

// Shallow copy methods
let shallow1 = Object.assign({}, original);
let shallow2 = { ...original };

shallow1.address.city = "LA";
console.log(original.address.city); // "LA" - original is affected!
```

**Deep Copy**  
Creates completely independent copy including nested objects.

```js
let original = {
    name: "John",
    address: {
        city: "NYC",
        zip: "10001"
    }
};

// Deep copy using JSON (limitations: no functions, dates, undefined)
let deep1 = JSON.parse(JSON.stringify(original));

// Deep copy using structuredClone (modern browsers)
let deep2 = structuredClone(original);

deep1.address.city = "LA";
console.log(original.address.city); // "NYC" - original unaffected
```

---

### What is Object.freeze
`Object.freeze()` makes an object immutable. That means:
- No new properties can be added to the object.
- Existing properties cannot be removed from the object.
- The values of existing properties cannot be changed.

For example:
```js
const person = {
  name: "John",
  age: 30
};

Object.freeze(person);
```

---

## Program
### Write a function that generates a random number between two ranges, -100 to 0 and 800 - 900

```js
const randomRange = () => Math.random() < 0.5 ? 
    Math.round(Math.random() * 100) - 100 :     // -100 to 0
    Math.round(Math.random() * 100) + 800;      // 800 to 900

/*
Math.random() < 0.5 -> 50% chance to pick either range.
For -100 to 0:
    Math.random() * 100 -> gives 0 to 100
    Subtract 100 -> shifts to -100 to 0

For 800 to 900:
    Math.random() * 100 -> gives 0 to 100
    Add 800 -> shifts to 800 to 900
*/
```