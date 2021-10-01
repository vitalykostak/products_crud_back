class DatabaseHelper {
  static getColumnsAndValuesFromFields(fields) {
    return {
      columns: Object.keys(fields),
      values: Object.values(fields),
    };
  }

  static stringifyData(arr) {
    return arr.join(', ');
  }

  static prepareStatementsValues(startWith, count) {
    return new Array(count).fill(null).map((e, i) => `$${i + startWith}`);
  }

  static prepareStatementsFilters(startWith, filterColumns) {
    return new Array(filterColumns.length)
      .fill(null)
      .map((e, i) => `${filterColumns[i]}=${i + startWith}`);
  }

  static prepareForSet(columns) {
    return columns.map((el, i) => `${el} = $${++i}`).join(',');
  }
}

export default DatabaseHelper;
