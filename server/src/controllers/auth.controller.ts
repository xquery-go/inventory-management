import { Request, Response } from "express";
import { User } from "../models/user.model";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
  } catch (error) {
    console.log(error);
  }
};
