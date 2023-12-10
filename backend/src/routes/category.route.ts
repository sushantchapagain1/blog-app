import express from 'express';

import categoryContoller from '../controllers/category.controller';

const categoryRouter = express.Router();

categoryRouter.route('/').get(categoryContoller.getCategory);

export default categoryRouter;
