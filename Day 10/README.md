# User Management REST API

A TypeScript-based REST API built with Express.js for managing users with JSON file storage.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete users
- **Email Validation**: Prevents duplicate email addresses
- **Type Safety**: Full TypeScript implementation
- **Gender Enum**: Structured gender field with predefined values
- **File-based Storage**: Uses JSON file for data persistence
- **Error Handling**: Comprehensive error handling and validation
- **Clean Architecture**: Organized folder structure with separation of concerns

## Project Structure

```
src/
├── controllers/       # Request handlers
├── services/         # Business logic
├── routes/           # API route definitions
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── middleware/       # Custom middleware
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
data/
└── users.json       # JSON file for storing users
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create environment file:
   ```bash
   touch .env
   ```
4. Populate the env file with values:
   ```
   PORT=<port>
   NODE_ENV=development
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## API Endpoints

### 1. Get All Users
- **Method**: GET
- **URL**: `/api/users`
- **Description**: Retrieves all users from the JSON file

### 2. Get User by Email
- **Method**: GET
- **URL**: `/api/users/:email`
- **Description**: Retrieves a specific user by email

### 3. Create User
- **Method**: POST
- **URL**: `/api/users`
- **Body**:
```json
{
  "name": "John Doe",
  "age": 34,
  "email": "john@gmail.com",
  "gender": "Male"
}
```

### 4. Update User
- **Method**: PUT
- **URL**: `/api/users/:email`
- **Body**: (All fields optional)
```json
{
  "name": "John Smith",
  "age": 35,
  "gender": "Male"
}
```

### 5. Delete User
- **Method**: DELETE
- **URL**: `/api/users/:email`
- **Description**: Deletes a user by email

## User Schema

```typescript
{
  name: string;
  age: number;
  email: string;
  gender: "Male" | "Female" | "Other";
}
```

## Features

- **Duplicate Email Prevention**: Cannot create users with existing email addresses
- **Input Validation**: Comprehensive validation for all user inputs
- **Type Safety**: Full TypeScript support with proper typing
- **Error Handling**: Detailed error messages and proper HTTP status codes
- **JSON File Storage**: Persistent storage using fs module

## Development Notes

- The API automatically creates the `data/users.json` file if it doesn't exist
- All email comparisons are case-insensitive
- Age validation ensures values between 0 and 150
- Gender field uses enum for type safety