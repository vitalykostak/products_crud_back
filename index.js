import express from 'express';
import productRouter from './routers/product.router.js';
import exceptionMiddleware from './middlewares/exception.middleware.js';

const app = express();
app.use(express.json());
app.use('/api/product/', productRouter);
app.use(exceptionMiddleware);

try {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server was started...`)
  );
} catch (e) {
  console.log(e);
}
