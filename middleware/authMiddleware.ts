import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';

export default function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({message: 'Not signed in'});
    }
    const secret = process.env.JWT_KEY;
    if(typeof secret !== 'string') {
      throw ApiError.unauthorized('Authorization failed');
    }
    const decoded = jwt.verify(token, secret);
    req.body['token'] = decoded;
    next();
  } catch(e) {
    console.error(e);
    return res.status(401).json({message: 'Authorization failed'});
  }
}
