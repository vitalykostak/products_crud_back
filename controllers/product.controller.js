import RequestHelper from '../helpers/RequestHelper.js';
import ProductService from '../services/product.service.js';
import ApiException from '../exceptions/api.exception.js';

class ProductController {
  async create(req, res, next) {
    try {
      RequestHelper.checkValidFields(req);
      const fields = req.body;
      if (
        await ProductService.isExistsProductWithTheName(fields.product_name)
      ) {
        throw ApiException.ResourceExists();
      }
      const createdProduct = await ProductService.create(fields);
      return res.status(201).json({ createdProduct });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      RequestHelper.checkValidFields(req);
      const { product_id, ...fields } = req.body;
      const updatedProduct = await ProductService.update(product_id, fields);
      return res.status(200).json({ updatedProduct });
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      RequestHelper.checkValidFields(req);
      const { product_id } = req.body;
      const deletedCount = await ProductService.delete(product_id);
      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  }

  async findAll(req, res, next) {
    try {
      const products = await ProductService.findAll();
      return res.json({ products });
    } catch (e) {
      next(e);
    }
  }

  async findByName(req, res, next) {
    try {
      const { product_name } = req.params;
      const product = await ProductService.findByName(product_name);
      return res.json({ product });
    } catch (e) {
      next(e);
    }
  }
}

export default new ProductController();
