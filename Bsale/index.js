const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 3000;

var conexion = mysql.createConnection({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  database: "bsale_test",
  user: "bsale_test",
  password: "bsale_test",
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("conexión exitosa");
    getProducts();
  }
  conexion.end();
});

let category1 = [];

const cat = [1, 2, 3, 4, 5, 6, 7];

function getProducts() {
  cat.forEach((id) => {
    consult =
      " SELECT * FROM category c  LEFT JOIN product p ON (p.category = c.id) WHERE p.category = " +
      id +
      " GROUP BY p.name";

    conexion.query(consult, function (error, response, body) {
      if (error) throw error;

      response.forEach((result) => {
        category1.push(result);

        app.get("/api/products", (req, res) => {
          res.send(category1);
        });

        app.post("/api/pay", (req, res) => {
          const ids = req.body;
          const procutsCopy = category1.map((p) => ({ ...p }));
          ids.forEach((id) => {
            const product = procutsCopy.find((p) => p.id === id);
            if (product.discount > 0) {
              product.discount--;
            } else {
              throw "Sin stock";
            }
          });
          products = procutsCopy;
          res.send(category1);
        });
      });
    });
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", express.static("view-controller"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
