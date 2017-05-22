DROP DATABASE coinData;

CREATE TABLE coinData (id SERIAL UNIQUE PRIMARY KEY,
                       price_date DATE,
                       price DECIMAL);

INSERT INTO coinData (price_date, price)
values ('1990-10-22', 1000);
