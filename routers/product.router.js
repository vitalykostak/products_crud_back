import express from 'express';
import { body } from 'express-validator';
import productController from '../controllers/product.controller.js';

const router = express.Router();

router.post(
  '',
  body('product_name').exists(),
  body('unit_price').exists().isDecimal(),
  body('unit_description').exists(),
  productController.create
);

router.get('', productController.findAll);
router.get('/find_by_name/:product_name', productController.findByName);
router.put('', body('unit_price').isDecimal(), productController.update);
router.delete('', body('product_id').exists(), productController.delete);

export default router;
