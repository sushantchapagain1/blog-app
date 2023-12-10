import express from 'express';
import dotenv from 'dotenv';
import authRouter from './src/routes/auth.route';
import globalErrorHandler from './src/middlewares/globalErrHandler.middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import blogRouter from './src/routes/blog.route';
import { rateLimit } from 'express-rate-limit';
import { xssFilter } from 'helmet';
import helmet from 'helmet';
import categoryRouter from './src/routes/category.route';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());

app.use(helmet());

const oneHour = 60 * 60 * 1000;

const limiter = rateLimit({
  max: 300,
  windowMs: oneHour, //100 request in 1 hour for specific ip
  message: 'Too many requests from this ip ! Please try again later',
});

// Apply the rate limiting middleware to API calls only
app.use('/api', limiter);

app.use(
  cors({
    origin: (origin, cb) => {
      const ORIGINS =
        process.env.NODE_ENV !== 'production' ? [origin ?? /localhost.*/] : [];
      cb(null, [...ORIGINS, process.env.FRONTEND_URI ?? '']);
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(xssFilter());

app.use('/auth', authRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/category', categoryRouter);

app.use(globalErrorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
