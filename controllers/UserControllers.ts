import { User } from '../models/models';
import { ApiError } from '../errors/ApiError';
import { NextFunction, Request, Response } from 'express';

class UserController {
  async create(req: Request, res: Response) {
    const machineType = await User.create(req.body);
    return res.json(machineType);
  }

  async auth(req: Request, res: Response,next: NextFunction) {
    return next(ApiError.notImplemented());
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    return next(ApiError.notImplemented());
  }
}

export default new UserController();
