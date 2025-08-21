# Day 16 - NestJS Advanced: ORM, Authentication & Security

## Object-Relational Mapping (ORM)

ORM is a programming technique that allows you to query and manipulate data from a database using an object-oriented paradigm. Instead of writing raw SQL queries, you work with objects and methods.

**Benefits of ORM:**
- **Database Abstraction**: Write database-agnostic code
- **Type Safety**: Strong typing with TypeScript
- **Reduced Boilerplate**: Less repetitive SQL code
- **Security**: Built-in protection against SQL injection
- **Migrations**: Version control for database schema
- **Relationships**: Easy handling of complex data relationships

## Sequelize ORM

Sequelize is a popular Object-Relational Mapping (ORM) library for Node.js that supports PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server.

### Installation (from package.json)

```json
{
  "dependencies": {
    "@nestjs/sequelize": "^11.0.0",
    "sequelize": "^6.37.7",
    "sequelize-typescript": "^2.1.6",
    "pg": "^8.16.3",
    "pg-hstore": "^2.3.4"
  },
  "devDependencies": {
    "@types/sequelize": "^4.28.20"
  }
}
```

### Basic Setup

The application module shows how Sequelize is configured with PostgreSQL:

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './User/user.model';

@Module({
  imports: [UserModule, SequelizeModule.forRoot({
    dialect: 'postgres',
    database: 'userDemo',
    host: 'localhost',
    port: 5112,
    username: 'postgres',
    password: 'postgres',
    models: [User],
    // logging: true,
    autoLoadModels: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## PostgreSQL

PostgreSQL is used as the database in this project. The configuration is handled through Docker Compose:

```yaml
# docker-compose.yml
services:
  SequelizeDemo:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: userDemo
      POSTGRES_HOST: localhost
    ports:
      - 5112:5432
```

This sets up:
- PostgreSQL database named `userDemo`
- Running on port `5112` (mapped from container's 5432)
- Username and password both set to `postgres`

## Sequelize Models

The User model demonstrates how to define database entities:

```typescript
// user.model.ts
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class User extends Model{
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;
  @Column(DataType.STRING)
  name: string;
  @Column
  email: string;
  @Column
  password: string;
}
```

**Key features:**
- `@Table` decorator marks the class as a database table
- `@PrimaryKey` defines the primary key
- `@Column` with `DataType` specifies column types
- `declare id: number` uses TypeScript's declare keyword for the primary key

## Data Transfer Objects (DTOs)

DTOs define the structure for data validation and transfer:

```typescript
// create-user.dto.ts
export class CreateUserDto {
  id: number;
  name: string;
  email: string;
  password: string;
}
```

## Service Layer with Sequelize

The UserService shows how to interact with the database using Sequelize:

```typescript
// user.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User){}

  findUsers(){
    return this.userModel.findAll();
  }

  addUser(user: CreateUserDto){
    return this.userModel.create({ ...user });
  }

  async validateUsers(username: string, password: string){
    const user = await this.userModel.findOne({where: {name: username}})
    if(user && user.password === password){
      return user;
    }

    return null;
  }
}
```

**Key points:**
- `@InjectModel(User)` injects the User model
- `findAll()` retrieves all records
- `create()` creates new records
- `findOne()` with `where` clause for specific queries
- Simple password validation (Note: In production, use hashed passwords)

## PassportJS Authentication

PassportJS is a flexible authentication middleware for Node.js. The project uses the local strategy for username/password authentication.

### Local Strategy Implementation

```typescript
// local.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "./user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private userService: UserService){
    super();
  }

  async validate(username: string, password: string){
    const user = await this.userService.validateUsers(username,password);

    if(!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

**How it works:**
- Extends `PassportStrategy(Strategy)` for local authentication
- `validate()` method is called by Passport during authentication
- Returns user object if authentication succeeds
- Throws `UnauthorizedException` if authentication fails

### Module Configuration

```typescript
// user.module.ts
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [SequelizeModule.forFeature([User]), PassportModule],
  controllers: [UserController],
  providers: [UserService, LocalStrategy],
})
export class UserModule {}
```

**Configuration details:**
- `SequelizeModule.forFeature([User])` registers the User model
- `PassportModule` enables Passport functionality
- `LocalStrategy` is registered as a provider

## Guards

Guards determine whether a request should be handled by the route handler. They implement the `CanActivate` interface and return a boolean.

### Using AuthGuard in Controllers

```typescript
// user.controller.ts
import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}
  
  @Get()
  async findAll(){
    return await this.userService.findUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto){
    return await this.userService.addUser(user)
  }

  @Post(':id')
  async createUserWithId(@Param('id',ParseIntPipe) id: number, @Body() user: CreateUserDto){
    return await this.userService.addUser(user)
  }
  
  @UseGuards(AuthGuard('local'))
  @Post('auth')
  login(@Req() req){
    return req;
  }
}
```

**Guard Usage:**
- `@UseGuards(AuthGuard('local'))` protects the `/auth` route
- `AuthGuard('local')` uses the local strategy for authentication
- `@Req() req` gives access to the request object containing user info
- The guard automatically calls the `validate()` method from `LocalStrategy`

### How Guards Work

1. **Request arrives** at protected route
2. **Guard executes** before route handler
3. **Strategy validates** credentials
4. **User object** is attached to request if valid
5. **Route handler** receives authenticated request

## Password Security & JWT (Concepts)

While not implemented in the current code, here are important concepts:

### Password Hashing
```typescript
// Example: Using bcrypt for password hashing
import * as bcrypt from 'bcrypt';

// Hash password before saving
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// Validate password
const validatePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
```

### JWT Authentication
```typescript
// Example: JWT implementation
import { JwtService } from '@nestjs/jwt';

// Generate JWT token
const generateToken = (user: User) => {
  const payload = { sub: user.id, username: user.name };
  return jwtService.sign(payload);
};
```

## Google Authentication (OAuth2)

For Google OAuth2 authentication, you would implement:

```typescript
// Example: Google Strategy
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails } = profile;
    const user = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    done(null, user);
  }
}
```

## Authentication Flow

1. **User sends credentials** to `/user/auth`
2. **AuthGuard('local')** intercepts the request
3. **LocalStrategy.validate()** checks credentials
4. **UserService.validateUsers()** queries database
5. **Authentication succeeds/fails** based on validation
6. **User object** attached to request if successful
7. **Controller method** receives authenticated request

## Best Practices

1. **Password Security**
   - Always hash passwords before storing
   - Use strong hashing algorithms like bcrypt
   - Implement password complexity requirements

2. **Database Security**
   - Use environment variables for credentials
   - Enable connection encryption
   - Implement proper access controls

3. **Authentication**
   - Use JWT for stateless authentication
   - Implement refresh token mechanism
   - Add rate limiting for auth endpoints

4. **Guard Implementation**
   - Create custom guards for specific business logic
   - Combine multiple guards when needed
   - Handle guard exceptions gracefully
