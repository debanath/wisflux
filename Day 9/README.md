# Node.js & Express.js Development Guide - Day 9

## Table of Contents
1. [Node.js File System (fs) Module](#nodejs-file-system-fs-module)
2. [Express.js Framework](#expressjs-framework)
3. [API Development](#api-development)
4. [Code Examples](#code-examples)
5. [Export vs Export Default](#export-vs-export-default)

---

## Node.js File System (fs) Module

The Node.js `fs` module provides an API for interacting with the file system. It offers both synchronous and asynchronous methods for file operations.

### Key Features:
- **File Operations**: Read, write, append, delete files
- **Directory Operations**: Create, read, remove directories
- **File System Checks**: Check file existence, permissions
- **Stream Operations**: Handle large files efficiently

### Common Methods:
- `fs.readFile()` - Read file content
- `fs.writeFile()` - Write data to file
- `fs.appendFile()` - Append data to file
- `fs.access()` - Check file accessibility
- `fs.promises` - Promise-based file operations

---

## Express.js Framework

Express.js is a minimal and flexible Node.js web application framework that provides robust features for building web and mobile applications.

### Core Concepts:

#### 1. **Application Configuration**
- Initialize Express app
- Set port and environment variables
- Configure basic settings

#### 2. **Middleware**
Middleware functions execute during the request-response cycle:
- `express.json()` - Parse JSON bodies
- `express.urlencoded()` - Parse URL-encoded bodies
- `cors()` - Enable Cross-Origin Resource Sharing
- Custom middleware for authentication, logging, etc.

#### 3. **Routing**
Define how application responds to client requests:
- HTTP methods (GET, POST, PUT, DELETE)
- Route parameters and query strings
- Route handlers and middleware

#### 4. **Services**
Business logic layer that handles:
- Data processing
- External API calls
- Database operations
- Validation logic

---

## API Development

### REST API Principles:
- **Resource-based URLs**: `/users`, `/products`
- **HTTP Methods**: GET (read), POST (create), PUT (update), DELETE (remove)
- **Status Codes**: 200 (success), 404 (not found), 500 (server error)
- **JSON Response Format**: Consistent data structure

### Best Practices:
- Separate concerns (routes, controllers, services)
- Use middleware for common functionality
- Implement proper error handling
- Validate input data
- Use environment variables for configuration

---

## Code Examples

### File System Operations Example

```typescript
import * as fs from "fs";

interface DetailType {
  name: string;
  company: string;
}

const FILE_PATH = "./dist/data.json";
const initialValue: DetailType[] = [
  { name: "Daksh Lohar", company: "Wisflux Private Limited!" },
];

enum FILE_MODE {
  READ = "r",
  WRITE = "w",
  APPEND = "a",
}

const checkFileExists = async (file: string): Promise<boolean> => {
  try {
    await fs.promises.access(file, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

async function fillInitialDataIfFileNotExist(): Promise<void> {
  fs.appendFile(FILE_PATH, JSON.stringify(initialValue), (err) => {
    if (err) console.log(err);
  });
}

async function main() {
  const isFileExist = await checkFileExists(FILE_PATH);
  
  if (isFileExist) {
    fs.readFile(FILE_PATH, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      
      const newDetail: DetailType = {
        name: "D",
        company: "Wisflux",
      };
      
      const parsedData = JSON.parse(data);
      const appendedData = [...parsedData, newDetail];
      
      fs.writeFile(FILE_PATH, JSON.stringify(appendedData), (err) => {
        if (err) console.log(err);
      });
    });
  } else {
    fillInitialDataIfFileNotExist();
  }
}

main();
```

### Express.js Application Setup

```typescript
import * as express from "express";
import * as cors from "cors";
import { addNumRouter } from "./controllers/addNum.controller";

// Express APP configuration
const app = express();

// Basic configuration
app.set("port", process.env.PORT || 3000);

// Middleware setup
app.use(express.json());                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());                           // Enable CORS

// Routes
app.get("/", (req, res) => {
  res.send("Hi");
});

// Register API endpoints
app.use("/", addNumRouter);

// Export the app
export default app;
```

---

## Export vs Export Default

### `export` (Named Export)
```typescript
// Multiple named exports
export const config = { port: 3000 };
export function helper() { return "help"; }
export class UserService { }

// Import named exports
import { config, helper, UserService } from "./module";
```

### `export default` (Default Export)
```typescript
// Single default export per module
export default class App {
  // class implementation
}

// Import default export
import App from "./App";
import CustomName from "./App"; // Can use any name
```

### Key Differences:

| Feature | Named Export | Default Export |
|---------|-------------|----------------|
| **Quantity** | Multiple per module | One per module |
| **Import Syntax** | `import { name }` | `import name` |
| **Naming** | Must use exact name | Can rename during import |
| **Tree Shaking** | Better support | Limited support |

### Best Practices:
- Use **named exports** for utilities, constants, and multiple exports
- Use **default exports** for main class/component of a module
- Prefer named exports for better IDE support and refactoring
- Avoid mixing both in the same module when possible

---

## Additional Notes

### Error Handling
Always implement proper error handling in your applications:
```typescript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### Environment Variables
Use environment variables for configuration:
```typescript
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL || 'localhost';
```

### Async/Await Best Practices
- Use `fs.promises` for promise-based file operations
- Implement proper error handling with try-catch blocks
- Avoid callback hell by using async/await or promises