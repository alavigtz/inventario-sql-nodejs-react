const sql = require("mssql");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, DATABASE_CONFIG } = require("./config");

//--------------
sql.connect(DATABASE_CONFIG, (err) => {
  if (err) {
    throw err;
  }
  console.log("La conexión a la base de datos es correcta");

  app.listen(port, () => {
    console.log("####################");
    console.log("##### API REST #####");
    console.log("####################");
    console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
  });

  /*
    new sql.Request().query('select 1 as number', (err, result) => {
        //handle err
        console.dir(result)
        // This example uses callbacks strategy for getting results.
    })
*/
});

sql.on("error", (err) => {
  // ... error handler
  console.log("Sql database connection error ", err);
});
