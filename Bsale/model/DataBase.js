export default function DataBase() {
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
    }
  });
  conexion.end();
}
