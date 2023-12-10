import express from 'express';
import authController from '../controllers/auth.controller';
import { z } from 'zod';
import { validate } from '../utils/zodValidate';
import protect from '../middlewares/auth.middleware';

const registerSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Fullname is required',
      })
      .min(3, 'Name must be at least 3 characters long'),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters long'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const authRouter = express.Router();

authRouter
  .route('/register')
  .post(validate(registerSchema), authController.signup);

authRouter.route('/login').post(validate(loginSchema), authController.login);
authRouter.get('/logout', authController.logout);
authRouter.get('/me', authController.getCurrentUser);

export default authRouter;
