# JavaScript & TypeScript Concepts - Day 8

## 1. Destructuring in JavaScript

**What is Destructuring?**
Destructuring is a JavaScript expression that allows you to extract data from arrays or objects and assign them to variables in a single statement. It provides a clean, readable way to unpack values without having to access them one by one using bracket or dot notation. This feature significantly reduces code verbosity and makes variable assignment more intuitive.

### Array Destructuring
Array destructuring extracts values from arrays based on their position (index). You can skip elements, assign default values, and use the rest operator to capture remaining elements.
```javascript
// Basic destructuring
const cities = ['New York', 'London', 'Tokyo'];
const [city1, city2] = cities;
console.log(city1); // 'New York'
console.log(city2); // 'London'

// With rest operator
const [first, second, ...remaining] = cities;
console.log(first); // 'New York'
console.log(remaining); // ['Tokyo']

// Skipping elements
const [, , third] = cities;
console.log(third); // 'Tokyo'
```

### Object Destructuring
Object destructuring extracts properties from objects and assigns them to variables. You can rename variables during extraction, set default values for missing properties, and use it in function parameters for cleaner code.
```javascript
const person = { name: 'John', age: 30, city: 'Boston' };

// Basic destructuring
const { name, age } = person;
console.log(name); // 'John'

// Renaming variables
const { name: fullName, age: years } = person;
console.log(fullName); // 'John'

// With rest operator
const { name, ...details } = person;
console.log(details); // { age: 30, city: 'Boston' }
```

## 2. Rest and Spread Operators

**Understanding Rest vs Spread**
These operators use the same syntax (`...`) but serve opposite purposes. The rest operator collects multiple elements into a single array or object, while the spread operator expands elements from arrays or objects. The context determines which one you're using - rest appears on the left side of assignments, spread on the right side or in function calls.

### Rest Operator (`...rest`)
**Purpose**: Groups multiple elements into an array. The rest operator is used in function parameters to accept unlimited arguments, and in destructuring to collect remaining elements.
```javascript
// In function parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// In destructuring
const [first, ...rest] = [1, 2, 3, 4];
console.log(rest); // [2, 3, 4]
```

### Spread Operator (`...spread`)
**Purpose**: Spreads elements from an array/object. The spread operator expands iterables (arrays, strings) or object properties into individual elements. It's commonly used for copying arrays/objects, merging data structures, and passing array elements as function arguments.
```javascript
// With arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// With objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Function calls
Math.max(...arr1); // Same as Math.max(1, 2, 3)
```

## 3. Asynchronous Programming

**What is Asynchronous Programming?**
Asynchronous programming is a technique that enables your program to start potentially long-running tasks and still be able to respond to other events while that task runs, rather than having to wait until that task finishes. This prevents the main thread from being blocked, keeping your application responsive. JavaScript uses Promises, async/await, and callbacks to handle asynchronous operations like API calls, file operations, and timers.

### Promise States
A Promise is an object representing the eventual completion or failure of an asynchronous operation. Understanding these states is crucial for effective async programming:
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed
- **Settled**: Either fulfilled or rejected (no longer pending)

### Promise Syntax
Promises provide a cleaner alternative to callback hell. They allow you to chain operations and handle success/failure scenarios in a more readable way.
```javascript
// Creating a promise
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Data received!');
  }, 2000);
});

// Using promises
fetchData
  .then(data => console.log(data))     // Handle success
  .catch(error => console.error(error)) // Handle error
  .finally(() => console.log('Done'));  // Always runs

// Async/await syntax
async function getData() {
  try {
    const result = await fetchData;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

## 4. TypeScript

**What is TypeScript?**
TypeScript is a superset of JavaScript that adds static type definitions to JavaScript. It helps catch errors during development rather than runtime, provides better IDE support with autocomplete and refactoring, and makes code more maintainable in large applications. TypeScript code compiles down to plain JavaScript, so it runs anywhere JavaScript runs.

### Basic Types
TypeScript provides several built-in types that help you define what kind of data your variables can hold. Type inference allows TypeScript to automatically determine types when you don't explicitly specify them.
```typescript
// Primitive types
let name: string = 'John';
let age: number = 25;
let isActive: boolean = true;

// Type automatically inferred
let city = 'New York'; // TypeScript infers string type
```

### Array Types
TypeScript provides multiple ways to define arrays with type safety. You can specify that an array contains elements of a specific type, mixed types, or even fixed-length arrays with specific types at each position (tuples).
```typescript
// Different ways to define array types
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['John', 'Jane'];
let mixed: any[] = [1, 'hello', true];

// Tuple (fixed length and types)
let person: [string, number] = ['John', 25];
```

### Enums
Enums allow you to define a set of named constants, making your code more readable and maintainable. They're useful when you have a fixed set of values that a variable can take, like status codes, directions, or configuration options.
```typescript
enum Color {
  Red,     // 0
  Green,   // 1
  Blue     // 2
}

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

let userColor: Color = Color.Red;
let move: Direction = Direction.Up;
```

### Function Types
TypeScript allows you to specify types for function parameters and return values. This helps catch errors when calling functions with wrong argument types and ensures functions return the expected data type.
```typescript
// Function declaration
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function
const add = (a: number, b: number): number => a + b;

// Optional parameters
function introduce(name: string, age?: number): string {
  return age ? `I'm ${name}, ${age} years old` : `I'm ${name}`;
}
```

### Object Types
Object types define the structure of objects, specifying which properties they should have and their types. This is fundamental to TypeScript's type checking for complex data structures.
```typescript
// Inline object type
let user: { name: string; age: number; email?: string } = {
  name: 'John',
  age: 25
};

// Using type alias
type User = {
  name: string;
  age: number;
  email?: string;
};

let newUser: User = { name: 'Jane', age: 30 };
```

### Type Aliases
Type aliases allow you to create custom names for types, making complex type definitions more readable and reusable. They're particularly useful for union types, complex object structures, and when you want to give semantic meaning to primitive types.
```typescript
// Basic type alias
type ID = string | number;
type Status = 'loading' | 'success' | 'error';

// Complex type alias
type ApiResponse = {
  data: any;
  status: Status;
  message?: string;
};

let response: ApiResponse = {
  data: { id: 1, name: 'Product' },
  status: 'success'
};
```

### Special Types

#### Never Type
The `never` type represents values that never occur. It's used for functions that never return (like functions that always throw errors or have infinite loops) and for type guards that eliminate all possibilities.
```typescript
// Function that never returns
function throwError(message: string): never {
  throw new Error(message);
}

// Unreachable code
function infiniteLoop(): never {
  while (true) {
    // This function never returns
  }
}
```

#### Null and Undefined
TypeScript can help you handle null and undefined values safely. With strict null checks enabled, you must explicitly handle these cases, preventing many common runtime errors.
```typescript
let value: string | null = null;
let undefinedValue: string | undefined = undefined;

// Strict null checks help prevent runtime errors
function processValue(val: string | null) {
  if (val !== null) {
    console.log(val.toUpperCase()); // Safe to use
  }
}
```

### Interfaces
Interfaces define contracts for objects, specifying what properties and methods they must have. They're similar to type aliases but are more powerful for object-oriented programming, supporting inheritance and implementation by classes.
```typescript
interface Person {
  name: string;
  age: number;
  email?: string; // Optional property
  [propName: string]: any; // Dynamic properties
}

// Extending interfaces
interface Employee extends Person {
  employeeId: number;
  department: string;
}

let emp: Employee = {
  name: 'John',
  age: 30,
  employeeId: 123,
  department: 'IT',
  bonus: 5000 // Dynamic property
};
```

### Generics

**Understanding Generics**  
Generics allow you to write reusable code that works with multiple types while maintaining type safety. Instead of using `any` (which loses type information), generics preserve type relationships and provide better autocomplete and error checking.

#### Simple Generic
Basic generics use type parameters (usually denoted as `T`) to create functions or classes that work with various types while preserving type information.
```typescript
function identity<T>(arg: T): T {
  return arg;
}

let stringResult = identity<string>('hello');
let numberResult = identity<number>(42);
```

#### Better Generic with Constraints
Generic constraints allow you to specify that a type parameter must have certain properties or extend certain types. This gives you more control while maintaining flexibility.
```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // Works - strings have length
logLength([1, 2, 3]); // Works - arrays have length
// logLength(123); // Error - numbers don't have length
```

#### Built-in Generics
TypeScript provides many built-in generic types and utility types that solve common programming patterns. These save time and provide well-tested solutions for common scenarios.
```typescript
// Array generic
let numbers: Array<number> = [1, 2, 3];

// Promise generic
let promise: Promise<string> = new Promise(resolve => {
  resolve('Hello');
});

// Utility types
type PartialUser = Partial<User>; // All properties optional
type RequiredUser = Required<User>; // All properties required
type UserName = Pick<User, 'name'>; // Only 'name' property
```

#### Generic Types
Generic types allow you to create reusable type definitions for interfaces and classes. They're essential for building type-safe APIs and data structures that work with multiple data types.
```typescript
// Generic interface
interface Repository<T> {
  save(entity: T): void;
  findById(id: number): T | null;
}

// Generic class
class DataService<T> {
  private data: T[] = [];
  
  add(item: T): void {
    this.data.push(item);
  }
  
  getAll(): T[] {
    return this.data;
  }
}

const userService = new DataService<User>();
userService.add({ name: 'John', age: 25 });
```

## Key Takeaways

1. **Destructuring** simplifies extracting values from arrays and objects
2. **Rest** groups elements, **Spread** expands them
3. **Promises** handle asynchronous operations with three main methods: `.then()`, `.catch()`, `.finally()`
4. **TypeScript** adds type safety to JavaScript, preventing many runtime errors
5. **Generics** provide reusable, type-safe code that works with multiple types