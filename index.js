import express from 'express';
import cors from 'cors';
import corsOptions from './cors_option.js';
import productRouter from './routers/product.router.js';
import exceptionMiddleware from './middlewares/exception.middleware.js';

const app = express();
app.use(cors(corsOptions));
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
