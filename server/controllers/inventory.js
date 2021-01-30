const sql = require("mssql");
const { DATABASE_CONFIG } = require("../config");

function getInventory(req, res) {
  const {id} = req.params;
  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `SELECT I.Id, P.Nombre,  P.CodBarras, I.Cantidad, P.PrecioUnitario 
      FROM Sucursal AS S 
      INNER JOIN Inventario AS I on S.Id = I.Id_Sucursal 
      INNER JOIN Producto AS P on P.Id = I.Id_Producto 
      WHERE S.Id = ${id}`,
      (err, inventoryStored) => {
        //handle err
        if (err) {
          res.status(500).send({ code: 500, message: "Error del servidor" });
        } else {
          if (!inventoryStored) {
            res.status(404).send({
              code: 404,
              message: "No se ha encontrado ningun inventario",
            });
          } else {
            res
              .status(200)
              .send({ code: 200, inventory: inventoryStored.recordsets });
          }
        }
      }
    );
  });
}

function addInventory(req, res){
  const {branchId, productId, quantity} = req.body;
  
  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `INSERT INTO Inventario (Id_Sucursal, Id_Producto, Cantidad) 
      VALUES ('${branchId}', ${productId}, ${quantity})`,
      (err, inventoryStored) => {
        //handle err
        if (err) {
          res.status(500).send({ code: 500, message: "Error en el servidor" });
        } else {
          if (!inventoryStored) {
            res.status(404).send({
              code: 404,
              message: "No se ha podido agregar el elemento al inventario, intentelo más tarde",
            });
          } else {
            res
              .status(200)
              .send({ code: 200, message: "Elemento agregado al inventario correctamente" });  
          }
        }
      }
    );
  }); 
}

function updateInventory(req, res){
  const {id} = req.params;
  const {quantity} = req.body; 

  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `UPDATE Inventario SET Cantidad = '${quantity}' WHERE Id = ${id} `,
      (err, inventoryStored) => {
        //handle err
        if (err) {
          res.status(500).send({ code: 500, message: "Error del servidor" });
        } else {
          if (!inventoryStored) {
            res.status(404).send({
              code: 404,
              message: "No se pudo editar el inventario, intentelo más tarde",
            });
          } else {
            res
              .status(200)
              .send({ code: 200, message: "Inventario editado correctamente" });
          }
        }
      }
    );
  });
}

module.exports = {
  getInventory,
  addInventory,
  updateInventory
};
