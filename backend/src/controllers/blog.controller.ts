import { prisma } from '../../db';
import { Request, Response, NextFunction } from 'express';
import cloud from '../utils/cloudinary.config';

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, image, authorId, categoryId } = req.body;
    const cloudinaryResponse = await cloud.uploader.upload(image, {
      folder: 'blogs',
    });

    const imageUrl = cloudinaryResponse.secure_url;

    const blog = await prisma.blog.create({
      data: {
        title: title,
        content: content,
        image: imageUrl,
        authorId,
        categoryId,
      },
    });

    res.status(200).json({
      status: 'success',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.status(200).json({
      status: 'success',
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: req.params.id },
      include: { author: true },
    });
    if (!blog)
      return res.status(404).json({ status: 'fail', message: 'Invalid Id' });

    res.status(200).json({
      status: 'success',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await prisma.blog.findUnique({ where: { id: req.params.id } });
    if (!blog)
      return res.status(404).json({ status: 'fail', message: 'Invalid Id' });

    const updatedBlog = await prisma.blog.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
      include: { category: true },
    });

    res.status(200).json({
      status: 'success',
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await prisma.blog.findUnique({ where: { id: req.params.id } });
    if (!blog)
      return res.status(404).json({ status: 'fail', message: 'Invalid Id' });

    await prisma.blog.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};

//get blog of a specific user

const getBlogsOfCurrentUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await prisma.blog.findMany({
      where: {
        authorId: req.user.id,
      },
    });

    res.status(200).json({
      status: 'success',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlogById,
  getBlogsOfCurrentUser,
};
