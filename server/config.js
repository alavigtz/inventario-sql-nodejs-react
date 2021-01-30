const API_VERSION = "v1";
const IP_SERVER = "localhost";

const DATABASE_CONFIG = {
    user: "sa", //default is sa
    password: "passw0rd",
    server: "localhost", // for local machine
    database: "EmpresaX", // name of database
    options: {
      encrypt: false,
      enableArithAbort: true,
    },
  };

module.exports = {
    API_VERSION,
    IP_SERVER,
    DATABASE_CONFIG
}