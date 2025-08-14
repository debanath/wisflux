import { User,CreateUserRequest,UpdateUserRequest } from "../types/User";
import { readUsersFromFile,writeUsersToFile } from "../utils/fileOperations";

export class UserService {
  
  getAllUsers(): User[] {
    return readUsersFromFile();
  }

  getUsersByEmail(email: string): User | null {
    const users = readUsersFromFile();
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
  }

  createUser(userData: CreateUserRequest): {success: boolean; message: string; user?: User} {
    const users = readUsersFromFile();
    const existingUser = users.find((user)=> user.email.toLowerCase() === userData.email.toLowerCase());

    if(existingUser){
      return {
        success: false,
        message: `User with ${userData.email} already exists`
      };
    }

    const newUser: User = {
      name: userData.name,
      age: userData.age,
      email: userData.email,
      gender: userData.gender
    };

    users.push(newUser);
    writeUsersToFile(users);

    return {
      success: true,
      message: 'User created Successfully',
      user: newUser
    };
  }

  updateUser(email: string, updateData: UpdateUserRequest): {success: boolean; message: string; user?: User} {
    const users = readUsersFromFile();
    const userIdx = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());

    if(userIdx === -1){
      return {
        success: false,
        message: 'User not found'
      };
    }

    const updateduser = {...users[userIdx], ...updateData};

    users[userIdx] = updateduser;
    writeUsersToFile(users);

    return {
      success: true,
      message: "user updated Successfully",
      user: updateduser
    };
  }

  deleteUser(email: string): {success: boolean; message: string}{
    const users = readUsersFromFile();
    const userIdx = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());

    if(userIdx === -1){
      return {
        success: false,
        message: 'User not found'
      };
    }

    users.splice(userIdx,1);
    writeUsersToFile(users);

    return {
      success: true,
      message: 'User deleted successfully'
    };
  }

}