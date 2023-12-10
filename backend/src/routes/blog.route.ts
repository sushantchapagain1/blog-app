import express from 'express';
import { z } from 'zod';
import { validate } from '../utils/zodValidate';
import blogController from '../controllers/blog.controller';
import protect from '../middlewares/auth.middleware';

const blogSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3, 'Title must be at least 3 characters long'),

    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(20, 'Content must be at least 20 characters long'),

    image: z.string({
      required_error: 'Image is required',
    }),
    authorId: z.string({
      required_error: 'Author is required',
    }),

    categoryId: z.string({
      required_error: 'Category is required',
    }),
  }),
});

const blogRouter = express.Router();

blogRouter
  .route('/')
  .post(protect, validate(blogSchema), blogController.createBlog)
  .get(blogController.getBlogs);

blogRouter.route('/my').get(protect, blogController.getBlogsOfCurrentUser);

blogRouter
  .route('/:id')
  .get(blogController.getBlogById)
  .patch(protect, blogController.updateBlog)
  .delete(protect, blogController.deleteBlog);

export default blogRouter;
