export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other"
}

export interface User {
  name: string;
  age: number;
  email: string;
  gender: Gender;
}

export interface CreateUserRequest {
  name: string;
  age: number;
  email: string;
  gender: Gender;
}

export interface UpdateUserRequest {
  name?: string;
  age?: number;
  gender?: Gender;
}