import { Request,Response } from "express";
import { UserService } from "../services/userService";
import { Gender, CreateUserRequest, UpdateUserRequest } from "../types/User";
import { count } from "console";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = (req: Request, res: Response): void => {
    try {
      const users = this.userService.getAllUsers();
      res.status(200).json({
        success: true,
        message: 'Users retrived successfully',
        data: users,
        count: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server error',
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  getUserByEmail = (req: Request, res:Response): void => {
    try {
      const { email } = req.params;

      if(!email){
        res.status(400).json({
          success: false,
          message: 'Email param is required'
        });
        return;
      }

      const user = this.userService.getUsersByEmail(email);

      if(!user){
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User retreived successfully',
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  createUser = (req: Request, res: Response): void => {
    try {
      const {name, age, email, gender}: CreateUserRequest = req.body;

      if(!name || !age || !email || !gender){
        res.status(400).json({
          success: false,
          message: "All fields are required"
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
        return;
      }

      if(age < 0 || age > 150) {
        res.status(400).json({
          success: false,
          message: 'Age must be between 0 and 150'
        });
        return;
      }
      
      if(!Object.values(Gender).includes(gender)) {
        res.status(400).json({
          success: false,
          message: `Gender must be one of: ${Object.values(Gender).join(', ')}`
        });
        return;
      }

      const result = this.userService.createUser({ name, age, email, gender });

      if(!result.success){
        res.status(409).json({
          success: false,
          message: result.message
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.user
      })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  updateUser = (req: Request, res: Response): void => {
    try {
      const { email } = req.params;
      const updateData: UpdateUserRequest = req.body;

      if (!email) {
        res.status(400).json({
          success: false,
          message: 'Email parameter is required'
        });
        return;
      }

      if (Object.keys(updateData).length === 0) {
        res.status(400).json({
          success: false,
          message: 'At least one field must be provided for update'
        });
        return;
      }

      if (updateData.age !== undefined && (updateData.age < 0 || updateData.age > 150)) {
        res.status(400).json({
          success: false,
          message: 'Age must be between 0 and 150'
        });
        return;
      }

      if (updateData.gender !== undefined && !Object.values(Gender).includes(updateData.gender)) {
        res.status(400).json({
          success: false,
          message: `Gender must be one of: ${Object.values(Gender).join(', ')}`
        });
        return;
      }

      const result = this.userService.updateUser(email, updateData);
      
      if (!result.success) {
        res.status(404).json({
          success: false,
          message: result.message
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  deleteUser = (req: Request, res: Response): void => {
    try {
      const { email } = req.params;

      if (!email) {
        res.status(400).json({
          success: false,
          message: 'Email parameter is required'
        });
        return;
      }

      const result = this.userService.deleteUser(email);
      
      if (!result.success) {
        res.status(404).json({
          success: false,
          message: result.message
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

}