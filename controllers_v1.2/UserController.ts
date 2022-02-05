import { User } from '../models_v1.2/models';
import { ApiError } from '../errors/ApiError';
import { NextFunction, Request, Response } from 'express';
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'


class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { username, email, password, role } = req.body;
    let result;
    result = await User.create({
      username: username,
      email: email,
      password: await hash(password, 5),
      role: role
    });

    res.send(result);
  }

  async auth(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string') {
      return next(ApiError.badRequest('Incorrect data'));
    }

    const user = await User.findOne({
      where: { email: email }
    });
    if (!user) {
      return next(ApiError.notFound('Cannot find user'));
    }
    const match = await compare(password, user.getDataValue('password'));
    if (!match) {
      return next(ApiError.unauthorized('Wrong password'));
    }

    const id = user.getDataValue('id');
    const role = user.getDataValue('role');

    res.send({
      user: {
        id,
        username: user.getDataValue('username'),
        email: user.getDataValue('email'),
        role
      },
      token: generateJwt(id, role)
    });
  }
}

function generateJwt(id: string, role: string) {
  const secret = process.env.JWT_KEY;
  if (!secret) {
    throw new Error('Cannot generate JWT!');
  }
  return jwt.sign({ id, role }, secret, { expiresIn: '28d' });
}

export default new UserController();
