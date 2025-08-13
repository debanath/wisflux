# What is NodeJS?
Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript code on the server-side, outside of a web browser.

---

# What is V8 Engine?
V8 is Google's open-source JavaScript engine written in C++. It's the same engine that powers Google Chrome browser and Node.js.

---

# What is Event Loop in NodeJS.
The Event Loop is the core mechanism that enables Node.js to handle asynchronous operations efficiently using a single thread.
```
.  ┌───────────────────────────┐
┌─>│           timers          │  <- setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  <- I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  <- internal use
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  <- fetch new I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  <- setImmediate callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  <- close event callbacks
   └───────────────────────────┘
```
**Event Loop Phases:**

**Timers:** Executes setTimeout and setInterval callbacks  
**Pending Callbacks:** Executes I/O callbacks deferred to the next iteration  
**Poll:** Fetches new I/O events and executes I/O related callbacks  
**Check:** Executes setImmediate callbacks  
**Close Callbacks:** Executes close event callbacks  

---

# What is the use of tsconfig.json file?
`tsconfig.json` is a configuration file for TypeScript that specifies the root files and compiler options required to compile a TypeScript project.

---

# What are the methods provided by fs module to manipulate files?
The Node.js `fs` (File System) module provides both synchronous and asynchronous methods for file operations.  

Reading Files  
`fs.readFile(path, options, callback)` - Read entire file asynchronously  
`fs.readFileSync(path, options)` - Read entire file synchronously  
`fs.promises.readFile(path, options)` - Promise-based file reading  

Writing Files  
`fs.writeFile(path, data, options, callback)` - Write data to file asynchronously  
`fs.writeFileSync(path, data, options)` - Write data to file synchronously  
`fs.appendFile(path, data, options, callback)` - Append data to file  

File Information  
`fs.stat(path, callback)` - Get file statistics (size, modification time, etc.)  
`fs.access(path, mode, callback)` - Check if file exists and permissions  
`fs.exists(path, callback)` - Check if file/directory exists (deprecated)  

File Operations  
`fs.unlink(path, callback)` - Delete a file  
`fs.rename(oldPath, newPath, callback)` - Rename or move a file  
`fs.copyFile(src, dest, callback)` - Copy a file  
`fs.truncate(path, len, callback)` - Truncate file to specified length  

Directory Operations  
`fs.mkdir(path, options, callback)` - Create directory  
`fs.rmdir(path, callback)` - Remove directory  
`fs.readdir(path, options, callback)` - Read directory contents  

---

# What is API?
API (Application Programming Interface) is a set of protocols, routines, and tools that specify how different software components should interact with each other.

**API Components:**

**Endpoints:** Specific URLs where API can be accessed  
**Methods:** HTTP verbs (GET, POST, PUT, DELETE)  
**Headers:** Metadata about the request/response  
**Parameters:** Data sent with the request  
**Response:** Data returned by the API  

---

# What is JSON format?
JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that's easy for humans to read and write, and easy for machines to parse and generate.

---

# Why we use JSON format for API?
JSON is the preferred format for APIs due to several advantages:

- **Lightweight:** Less verbose than XML
- **Human-readable**: Easy to read and debug
- **Language-independent**: Supported by virtually all programming languages
- **Native JavaScript support:** No parsing needed in JavaScript
- **Faster parsing**: More efficient than XML parsing
- **Structured data**: Supports nested objects and arrays
- **Wide adoption**: Industry standard for web APIs

---

# What is a Framework?
A framework is a pre-written, reusable set of code that provides a foundation for building applications. It defines the architecture and provides common functionality.

**Framework Characteristics:**
- Inversion of Control
- Pre-built Components
- Architecture Guidelines
- Conventions

**Web Frameworks:**
- Express.js
- React
- Angular
- Vue.js

**Backend Frameworks:**
- Express.js
- NestJS

---

# How an HTTP Communication works.
HTTP (HyperText Transfer Protocol) is the foundation of data communication on the World Wide Web.

```
Client                          Server
  |                               |
  |---- HTTP Request ------------>|
  |                               |
  |                         Process Request
  |                               |
  |<--- HTTP Response ------------|
  |                               |
```

---

# What is Middleware in ExpressJS.
Middleware functions are functions that execute during the request-response cycle in Express.js applications. They have access to the request object (`req`), response object (`res`), and the next middleware function (`next`).

```ts
function middleware(req, res, next) {
  // Middleware logic here
  next(); // Call next middleware
}
```


**Common Use Cases:**

- Authentication: Verify user credentials
- Logging: Record request information
- CORS: Handle cross-origin requests
- Body Parsing: Parse request bodies
- Error Handling: Catch and handle errors
- Security: Add security headers
- Rate Limiting: Limit request frequency
- Compression: Compress responses


---
