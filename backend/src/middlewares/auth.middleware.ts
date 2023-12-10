import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../db';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

interface RequestWithUserObject extends Request {
  user?: any;
}

const protect = async (
  req: RequestWithUserObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = (await req.cookies.jwt) || req.headers?.authorization;

    if (!token) return res.status(401).json({ status: 'unauthorized' });

    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as User;

    const currentUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!currentUser)
      return res
        .status(401)
        .json({ status: 'user with this token no longer exists' });

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
