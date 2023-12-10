import { prisma } from '../../db';
import { Request, Response, NextFunction } from 'express';

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.findMany();
    res.status(200).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export default { getCategory };
