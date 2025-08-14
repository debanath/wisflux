import * as fs from "fs";
import * as path from "path";
import { User } from "../types/User";

const DATA_FILE_PATH = path.join(__dirname, '../../data/users.json');
const DATA_DIR = path.dirname(DATA_FILE_PATH);

if (!fs.existsSync(DATA_DIR)){
  fs.mkdirSync(DATA_DIR,{recursive: true});
}

if (!fs.existsSync(DATA_FILE_PATH)){
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([], null, 2));
}

export const readUsersFromFile = (): User[] => {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH,'utf8');
    return JSON.parse(data) as User[];
  }catch (error){
    console.error(error);
    return [];
  }
};

export const writeUsersToFile = (users: User[]): void => {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(users, null, 2));
  }catch (error){
    console.error(error);
    throw new Error('Failed to save users data');
  }
}