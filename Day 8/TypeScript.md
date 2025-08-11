# TypeScript quiz (Basic Level - 1)

## Theory
### What are the basic data types in TypeScript?
TypeScript provides several fundamental data types:

Primitive types: `number`, `string`, `boolean`, `null`, `undefined`  
Object types: `object`, `array`, `function`  
Special types: `any`, `unknown`, `void`, `never`
```ts
let age: number = 25;
let name: string = "John";
let isActive: boolean = true;
let data: any = "could be anything";
let value: unknown = getData(); // safer than any
let result: void = console.log("no return value");
```

---

### What is Generic data type.
Generics allow us to create reusable components that work with multiple types while maintaining type safety. They use angle brackets <T> where T is a type parameter:

```ts
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage
let stringResult = identity<string>("hello"); // T becomes string
let numberResult = identity<number>(42);      // T becomes number

// Generic with constraints
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know arg has a length property
  return arg;
}
```

---

### What is type inferring in TS.
TypeScript can automatically deduce types without explicit type annotations, this property of TypeScript is called type inferring.
```ts
// TypeScript infers these types
let message = "Hello"; // inferred as string
let count = 42;        // inferred as number
let items = [1, 2, 3]; // inferred as number[]

// Function return type inference
function add(a: number, b: number) {
  return a + b; // return type inferred as number
}

// Generic type inference
let result = identity("hello"); // T is inferred as string

// Contextual typing
window.onmousedown = function(mouseEvent) {
  // mouseEvent is inferred as MouseEvent
  console.log(mouseEvent.button);
};
```

---

### What are the possible ways to define typing for functions.
There are several approaches to type functions:
```ts
// 1. Function declaration with parameter and return types
function greet(name: string): string {
  return `Hello, ${name}`;
}

// 2. Function expression with explicit typing
const greet2: (name: string) => string = function(name) {
  return `Hello, ${name}`;
};

// 3. Arrow function with types
const greet3 = (name: string): string => `Hello, ${name}`;

// 4. Using function type alias
type GreetFunction = (name: string) => string;
const greet4: GreetFunction = (name) => `Hello, ${name}`;
```

---

### How to define Generic type for Classes
We can define generic classes that work with multiple types:
```ts
class Container<T> {
  private item: T;

  constructor(item: T) {
    this.item = item;
  }

  getItem(): T {
    return this.item;
  }

  setItem(item: T): void {
    this.item = item;
  }
}
```
---

## Program

```ts
interface Todo {
  name: string;
  description: string;
  done: boolean;
}

let todos: Todo[] = [];

function add(name: string, description: string): number{
  return todos.push({
    name: name,
    description: description,
    done: false
  });
}

function remove(index: number): Todo[] {
  return todos.splice(index, 1);
}

function list(): void {
  todos.forEach(function(todo: Todo, index: number): void {
    console.log(`${index} - ${todo.name}`);
  });
}

function update(index: number, name: string, description: string): Todo {
  todos[index].name = name;
  todos[index].description = description;
  return todos[index];
}
```