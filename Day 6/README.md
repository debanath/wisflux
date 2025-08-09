# JavaScript Learning Guide - Day 6

## Table of Contents
1. [Print to Console](#print-to-console)
2. [Variables](#variables)
3. [Data Types](#data-types)
4. [Operators](#operators)
5. [Control Statements](#control-statements)
6. [Loops](#loops)
7. [Arrays](#arrays)
8. [Shallow Copy vs Deep Copy](#shallow-copy-vs-deep-copy)
9. [Classes and Objects](#classes-and-objects)
10. [DOM Manipulation](#dom-manipulation)

---

## Print to Console

To print something to the console we can use the `console.log()` function.

**Syntax:**
```js
console.log("Hello World");
console.log(42);
console.log(true);
```

**Other Console Methods:**
- `console.warn()` - displays warning messages
- `console.error()` - displays error messages
- `console.info()` - displays informational messages
- `console.table()` - displays data in tabular format

---

## Variables

Variables are like containers that allow us to store a value and reuse it when required. In JavaScript, we can declare variables with `let`, `var`, or `const` keywords.

### Declaration Keywords

#### `var`
- **Function-scoped** or globally scoped
- Can be redeclared and updated
- Hoisted (can be used before declaration)
```js
var name = "John";
var name = "Jane"; // No error
name = "Bob"; // Updated
```

#### `let`
- **Block-scoped**
- Can be updated but not redeclared in same scope
- Hoisted but not initialized
```js
let age = 25;
age = 26; // Updated
// let age = 27; // Error: Cannot redeclare
```

#### `const`
- **Block-scoped**
- Cannot be updated or redeclared
- Must be initialized at declaration
```js
const PI = 3.14159;
// PI = 3.14; // Error: Cannot reassign
// const GRAVITY; // Error: Must initialize
```

### Scope Differences
- **Global Scope**: Variables accessible throughout the program
- **Function Scope**: Variables accessible only within the function (`var`)
- **Block Scope**: Variables accessible only within the block `{}` (`let`, `const`)

---

## Data Types

JavaScript has 7 major data types divided into two categories:

### Primitive Data Types
1. **Number**: Represents both integers and floating-point numbers
   ```js
   let age = 25;
   let price = 99.99;
   ```

2. **String**: Represents text data
   ```js
   let name = "Alice";
   let message = 'Hello World';
   let template = `Welcome ${name}`;
   ```

3. **Boolean**: Represents true or false
   ```js
   let isActive = true;
   let isComplete = false;
   ```

4. **Undefined**: Variable declared but not assigned a value
   ```js
   let x;
   console.log(x); // undefined
   ```

5. **Null**: Intentional absence of value
   ```js
   let data = null;
   ```

### Reference Data Types
6. **Object**: Collection of key-value pairs
   ```js
   let person = {
     name: "John",
     age: 30,
     city: "New York"
   };
   ```

7. **Array**: Ordered list of values
   ```js
   let numbers = [1, 2, 3, 4, 5];
   let mixed = ["apple", 42, true, null];
   ```

---

## Operators

Operators are used to perform operations between operands.

### Arithmetic Operators
- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` Modulus (remainder)
- `**` Exponentiation

### Assignment Operators
- `=` Assignment
- `+=` Add and assign
- `-=` Subtract and assign
- `*=` Multiply and assign
- `/=` Divide and assign

### Comparison Operators
- `==` Equal to (loose equality)
- `===` Strict equal to (type and value)
- `!=` Not equal to
- `!==` Strict not equal to
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal
- `<=` Less than or equal

### Logical Operators
- `&&` Logical AND
- `||` Logical OR
- `!` Logical NOT

### Special Operators
- `typeof`: Returns the type of a variable
  ```js
  console.log(typeof "hello"); // "string"
  console.log(typeof 42); // "number"
  ```

- `instanceof`: Tests if an object is an instance of a specific constructor
  ```js
  let arr = [1, 2, 3];
  console.log(arr instanceof Array); // true
  ```

---

## Control Statements

### If-Else Statement
Used to execute code based on conditions.

```js
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}
```

### Switch Statement
Used when you have multiple possible values for a variable.

```js
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Regular day");
}
```

---

## Loops

### For Loop
Used when you know the number of iterations.

```js
for (let i = 0; i < 5; i++) {
    console.log(`Count: ${i}`);
}
```

### While Loop
Used when you don't know the exact number of iterations.

```js
let count = 0;
while (count < 3) {
    console.log(`Count: ${count}`);
    count++;
}
```

### Do-While Loop
Executes at least once, then checks condition.

```js
let num = 0;
do {
    console.log(`Number: ${num}`);
    num++;
} while (num < 3);
```

### For...of Loop
Iterates over iterable objects (arrays, strings).

```js
let fruits = ["apple", "banana", "orange"];
for (let fruit of fruits) {
    console.log(fruit);
}
```

### For...in Loop
Iterates over object properties.

```js
let person = { name: "John", age: 30, city: "NYC" };
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
```

---

## Arrays

Arrays are ordered collections of elements that can store multiple values.

### Creating Arrays
```js
let numbers = [1, 2, 3, 4, 5];
let fruits = ["apple", "banana", "orange"];
let mixed = [1, "hello", true, null];
```

### Important Array Methods

#### `forEach()`
Executes a function for each array element.
```js
let numbers = [1, 2, 3, 4, 5];
numbers.forEach(function(num) {
    console.log(num * 2);
});
```

#### `map()`
Creates a new array by transforming each element.
```js
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

#### `filter()`
Creates a new array with elements that pass a test.
```js
let numbers = [1, 2, 3, 4, 5];
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
```

#### `reduce()`
Reduces array to a single value.
```js
let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15
```

#### Other Useful Methods
- `push()` - adds element to end
- `pop()` - removes last element
- `unshift()` - adds element to beginning
- `shift()` - removes first element
- `indexOf()` - finds index of element
- `includes()` - checks if element exists
- `join()` - converts array to string
- `slice()` - returns portion of array
- `splice()` - adds/removes elements

---

## Shallow Copy vs Deep Copy

### Shallow Copy
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

### Deep Copy
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

## Classes and Objects

### Defining a Class
```js
class Person {
    // Constructor method
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    greet() {
        return `Hello, my name is ${this.name}`;
    }
    
    // Static method
    static species() {
        return "Homo sapiens";
    }
}
```

### Creating Objects
```js
let person1 = new Person("Alice", 25);
let person2 = new Person("Bob", 30);

console.log(person1.greet()); // "Hello, my name is Alice"
console.log(Person.species()); // "Homo sapiens"
```

### Inheritance
```js
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // Call parent constructor
        this.grade = grade;
    }
    
    study() {
        return `${this.name} is studying`;
    }
    
    // Method overriding
    greet() {
        return `${super.greet()}, I'm a student`;
    }
}

let student = new Student("Charlie", 20, "A");
console.log(student.greet()); // "Hello, my name is Charlie, I'm a student"
console.log(student.study()); // "Charlie is studying"
```

---

## DOM Manipulation

The Document Object Model (DOM) allows JavaScript to interact with HTML elements.

### Selecting Elements

#### `getElementById()`
Selects element by its ID.
```js
let element = document.getElementById("myButton");
```

#### Other Selection Methods
```js
// By class name
let elements = document.getElementsByClassName("myClass");

// By tag name
let paragraphs = document.getElementsByTagName("p");

// CSS selectors
let element = document.querySelector(".myClass");
let elements = document.querySelectorAll("div.container");
```

### Event Handling

#### `addEventListener()`
Attaches event handlers to elements.
```js
let button = document.getElementById("myButton");

button.addEventListener("click", function() {
    alert("Button clicked!");
});

// Arrow function version
button.addEventListener("click", () => {
    console.log("Button clicked!");
});
```

### DOM Manipulation Methods

#### Changing Content
```js
let element = document.getElementById("myElement");

// Change text content
element.textContent = "New text";

// Change HTML content
element.innerHTML = "<strong>Bold text</strong>";
```

#### Changing Attributes
```js
let image = document.getElementById("myImage");

// Set attribute
image.setAttribute("src", "newimage.jpg");

// Get attribute
let source = image.getAttribute("src");

// Direct property access
image.src = "anotherimage.jpg";
```

#### Changing Styles
```js
let element = document.getElementById("myElement");

// Direct style changes
element.style.color = "red";
element.style.backgroundColor = "yellow";

// Adding/removing CSS classes
element.classList.add("highlight");
element.classList.remove("hidden");
element.classList.toggle("active");
```

#### Creating and Removing Elements
```js
// Create new element
let newDiv = document.createElement("div");
newDiv.textContent = "I'm new!";

// Append to parent
let container = document.getElementById("container");
container.appendChild(newDiv);

// Remove element
let oldElement = document.getElementById("oldElement");
oldElement.remove();
```

### Important DOM Events
- `click` - Mouse click
- `mouseover` - Mouse enters element
- `mouseout` - Mouse leaves element
- `keydown` - Key is pressed down
- `keyup` - Key is released
- `load` - Page/image finishes loading
- `submit` - Form is submitted
- `change` - Input value changes

### Event Object
```js
button.addEventListener("click", function(event) {
    console.log("Event type:", event.type);
    console.log("Target element:", event.target);
    event.preventDefault(); // Prevent default behavior
});
```