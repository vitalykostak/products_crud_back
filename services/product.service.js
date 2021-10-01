import db from '../db/index.js';
import DbHelper from '../helpers/DatabaseHelper.js';
import ApiException from '../exceptions/api.exception.js';

class ProductService {
  constructor() {
    this._databaseTable = 'products';
  }

  async create(fields) {
    const { columns, values } = DbHelper.getColumnsAndValuesFromFields(fields);
    const queryColumns = DbHelper.stringifyData(columns);
    const valuesPrepareStatement = DbHelper.prepareStatementsValues(
      1,
      values.length
    );
    const query = `INSERT INTO ${this._databaseTable}(${queryColumns}) VALUES(${valuesPrepareStatement}) RETURNING *`;
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async isExistsProductWithTheName(productName) {
    const query = `SELECT COUNT(*) FROM ${this._databaseTable} WHERE product_name = $1`;
    const result = await db.query(query, [productName]);
    const isExists = Boolean(+result.rows[0].count);
    return isExists;
  }

  async findAll() {
    const query = `SELECT * FROM ${this._databaseTable} ORDER BY product_id DESC`;
    const result = await db.query(query);
    return result.rows;
  }

  async findByName(product_name) {
    const query = `SELECT * FROM ${this._databaseTable} WHERE product_name = $1`;
    const result = await db.query(query, [product_name]);
    if (result.rows.length === 0) {
      throw ApiException.ResourceNotFound();
    }
    return result.rows;
  }

  async update(product_id, fields) {
    const { columns, values } = DbHelper.getColumnsAndValuesFromFields(fields);
    const preparedForSet = DbHelper.prepareForSet(columns);
    const query = `UPDATE ${this._databaseTable} SET ${preparedForSet} WHERE product_id = ${product_id} RETURNING *`;
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      throw ApiException.ResourceNotFound();
    }
    return result.rows;
  }

  async delete(product_id) {
    const query = `DELETE FROM ${this._databaseTable} WHERE product_id = $1`;
    const result = await db.query(query, [product_id]);
    if (!result.rowCount) {
      throw ApiException.ResourceNotFound();
    }
    return result.rowCount;
  }
}

export default new ProductService();
