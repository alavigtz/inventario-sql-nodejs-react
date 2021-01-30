const sql = require("mssql");
const { DATABASE_CONFIG } = require("../config");

function getProducts(req, res) {
  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(`SELECT * FROM Producto`, (err, productStored) => {
      //handle err
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor" });
      } else {
        if (!productStored) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ningun producto",
          });
        } else {
          res
            .status(200)
            .send({ code: 200, branches: productStored.recordsets });
        }
      }
    });
  });
}

function addProduct(req, res) {
  const { name, barcode, price } = req.body;

  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `INSERT INTO Producto (Nombre, CodBarras, PrecioUnitario) 
        VALUES ('${name}', ${barcode}, ${price})
        SELECT SCOPE_IDENTITY() AS Id
        `,
      (err, productStored) => {
        //handle err
        if (err) {
          res.status(500).send({ code: 500, message: "Error en el servidor" });
        } else {
          if (!productStored) {
            res.status(404).send({
              code: 404,
              message:
                "No se ha podido agregar el producto, intentelo más tarde",
            });
          } else {
            res
              .status(200)
              .send({
                code: 200,
                message: "Producto agregado correctamente",
                product: productStored.recordsets[0][0],
              });
          }
        }
      }
    );
  });
}

function updateProduct(req, res) {
  const { id } = req.params;
  const { name, barcode, price } = req.body;

  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `UPDATE Producto SET Nombre = '${name}', CodBarras = ${barcode}, PrecioUnitario = ${price} 
        WHERE Id = ${id} `,
      (err, inventoryStored) => {
        //handle err
        if (err) {
          res
            .status(500)
            .send({
              code: 500,
              message: "Codigo de barras duplicado, agregue uno diferente",
            });
        } else {
          if (!inventoryStored) {
            res.status(404).send({
              code: 404,
              message: "No se pudo editar el producto, intentelo más tarde",
            });
          } else {
            res
              .status(200)
              .send({ code: 200, message: "Producto editado correctamente" });
          }
        }
      }
    );
  });
}

function deleteProduct(req, res) {
  const { id } = req.params;

  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `DELETE FROM Inventario WHERE Id_Producto = ${id};
       DELETE FROM Producto WHERE Id = ${id} `,
      (err, inventoryStored) => {
        //handle err
        if (err) {
          res.status(500).send({ code: 500, message: "Error del servidor" });
        } else {
          if (!inventoryStored) {
            res.status(404).send({
              code: 404,
              message:
                "No se ha podido eliminar el producto, intentelo más tarde",
            });
          } else {
            res
              .status(200)
              .send({ code: 200, message: "Producto eliminado correctamente" });
          }
        }
      }
    );
  });
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
