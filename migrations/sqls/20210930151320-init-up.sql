CREATE TABLE IF NOT EXISTS products (
  product_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_name VARCHAR(128) NOT NULL CHECK(product_name <> ''),
  unit_price DECIMAL NOT NULL CHECK(unit_price > 0),
  currency char NOT NULL CHECK(currency = '$' ) DEFAULT '$',
  unit_description VARCHAR(128) NOT NULL CHECK(unit_description <> '')
);