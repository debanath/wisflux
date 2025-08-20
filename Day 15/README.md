# Day 15 - NestJS Notes

## What is NestJS?

NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses modern JavaScript/TypeScript and combines elements of Object-Oriented Programming (OOP), Functional Programming (FP), and Functional Reactive Programming (FRP).

Key features of NestJS:
- Built with TypeScript (but also supports plain JavaScript)
- Heavily inspired by Angular's architecture
- Uses decorators extensively
- Built-in support for TypeORM, Mongoose, GraphQL, and more
- Modular architecture that promotes code reusability
- Powerful CLI for generating boilerplate code
- Built-in testing utilities

## Three Core Components of NestJS

### 1. Controllers

Controllers are responsible for handling incoming requests and returning responses to the client. They define the routes and handle HTTP requests.

**Key characteristics:**
- Use the `@Controller()` decorator
- Handle HTTP methods using decorators like `@Get()`, `@Post()`, `@Put()`, `@Delete()`
- Extract data from requests using parameter decorators

**Example from user.controller.ts:**

```typescript
import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";

@Controller('user')
export class UserController {
  constructor(private userService: UserService){
    this.userService.addUser({id:1,name: "Deba",email: "debanath26@gmail.com"})
  }
  
  @Get()
  findAll(){
    return this.userService.findUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDto){
    return this.userService.addUser({id:2, ...user})
  }

  @Post()
  createUserWithId(@Param('id',ParseIntPipe) id: number, @Body() user: CreateUserDto){
    return this.userService.addUser({id, ...user})
  }
}
```

### 2. Providers (Services)

Providers are classes that can be injected as dependencies. The most common type of provider is a service, which contains business logic and can be shared across multiple controllers.

**Key characteristics:**
- Use the `@Injectable()` decorator
- Contain business logic
- Can be injected into controllers and other providers
- Follow the Dependency Injection pattern

**Example from user.service.ts:**

```typescript
import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";

@Injectable()
export class UserService {
  private readonly Users:User[] = [];

  findUsers(){
    return this.Users;
  }

  addUser(user: User){
    return this.Users.push(user);
  }
}
```

### 3. Modules

Modules are classes annotated with the `@Module()` decorator. They organize the application structure and provide metadata that NestJS uses to organize the application.

**Key characteristics:**
- Use the `@Module()` decorator
- Define which controllers, providers, and other modules belong together
- Can import other modules
- Can export providers to make them available to other modules

**Example from user.module.ts:**

```typescript
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

**Module decorator properties:**
- `imports`: Modules that export providers needed in this module
- `controllers`: Controllers defined in this module
- `providers`: Providers that will be instantiated by the NestJS injector
- `exports`: Providers that should be available to other modules

## Data Transfer Objects (DTOs)

DTOs are objects that define how data will be sent over the network. They help with:
- **Type Safety**: Ensure data structure consistency
- **Validation**: Can be combined with validation pipes
- **Documentation**: Serve as a contract for API consumers
- **Transformation**: Define how incoming data should be shaped

**Example from user.dto.ts:**

```typescript
export class CreateUserDto {
  name: string;
  email: string;
}
```

**Benefits of using DTOs:**
- Separate concerns between internal data models and external API contracts
- Enable easy validation and transformation of incoming data
- Provide clear documentation of expected request/response formats
- Allow for versioning of API contracts without affecting internal models

**Interface example from user.interface.ts:**

```typescript
export interface User{
  name: string;
  id: number;
  email: string;
}
```

## Pipes

Pipes are classes that implement the `PipeTransform` interface. They have two primary use cases:
1. **Transformation**: Transform input data to the desired form
2. **Validation**: Evaluate input data and throw an exception if invalid

### ParseIntPipe

The `ParseIntPipe` is a built-in transformation pipe that converts string parameters to integers.

**Example usage:**

```typescript
@Post()
createUserWithId(@Param('id', ParseIntPipe) id: number, @Body() user: CreateUserDto){
  return this.userService.addUser({id, ...user})
}
```

**What ParseIntPipe does:**
- Takes a string parameter (like "123" from URL)
- Attempts to parse it as an integer
- Returns the parsed number if successful
- Throws a `BadRequestException` if parsing fails

### Common Built-in Pipes

1. **ValidationPipe**: Validates incoming data against DTO classes
2. **ParseIntPipe**: Transforms strings to integers
3. **ParseFloatPipe**: Transforms strings to floats
4. **ParseBoolPipe**: Transforms strings to booleans
5. **ParseArrayPipe**: Transforms strings to arrays
6. **ParseUUIDPipe**: Validates and transforms UUID strings
7. **DefaultValuePipe**: Sets default values for parameters

### Pipe Usage Levels

Pipes can be applied at different levels:

1. **Parameter-level**: Applied to specific parameters
```typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  // id is now guaranteed to be a number
}
```

2. **Method-level**: Applied to all parameters of a method
```typescript
@Post()
@UsePipes(ValidationPipe)
create(@Body() createUserDto: CreateUserDto) {
  // All parameters will be validated
}
```

3. **Controller-level**: Applied to all routes in a controller
```typescript
@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  // All routes will use ValidationPipe
}
```

4. **Global-level**: Applied to the entire application
```typescript
app.useGlobalPipes(new ValidationPipe());
```

## Request Lifecycle in NestJS

1. **Incoming Request** -> **Middleware** -> **Guards** -> **Interceptors** -> **Pipes** -> **Controller** -> **Service** -> **Interceptors** -> **Response**

Understanding this flow helps in deciding where to place different types of logic in your application.