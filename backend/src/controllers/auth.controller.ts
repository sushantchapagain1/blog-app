import { prisma } from '../../db';
import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface RequestWithUserObject extends Request {
  user?: any;
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser)
      return res
        .status(400)
        .json({ message: 'User already exists', statusCode: 400 });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: { ...req.body, password: hashedPassword },
    });

    const resData = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return res
      .status(200)
      .json({ status: 'success', statusCode: '200', resData });
  } catch (error: any) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Email or password donot match', statusCode: 404 });
    }
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(404).json({ message: 'Email or password donot match' });

    const resData = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(resData, process.env.JWT_SECRET_KEY as string);
    const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
    res.cookie('jwt', token, {
      httpOnly: true,
      path: '/',
      maxAge: ONE_WEEK_IN_MS,
      sameSite: 'none',
      secure: true,
    });

    return res.status(200).json({ message: 'Cookie Set', token, resData });
  } catch (error) {}
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    const expireTime = new Date(Date.now() + 5 * 1000);
    res.clearCookie('jwt', {
      expires: expireTime,
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });
    res.status(200).json({ message: 'Logout successfull' });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (
  req: RequestWithUserObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = (await req.cookies.jwt) || req.headers?.authorization;

    if (!token) return res.status(401).json({ status: 'unauthorized' });

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as any;

    const currentUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!currentUser)
      return res
        .status(401)
        .json({ status: 'user with this token no longer exists' });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default { signup, login, logout, getCurrentUser };
