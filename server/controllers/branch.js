const sql = require("mssql");
const { DATABASE_CONFIG } = require("../config");

function getBranches(req, res) {
  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `SELECT * FROM Sucursal`,
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
              .send({ code: 200, branches: inventoryStored.recordsets });
          }
        }
      }
    );
  });
}

function getBranchesId(req, res) {
  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `SELECT Id FROM Sucursal`,
      (err, inventoryIdStored) => {
        //handle err
        if (err) {
          res.status(500).send({ code: 500, message: "Error del servidor" });
        } else {
          if (!inventoryIdStored) {
            res.status(404).send({
              code: 404,
              message: "No se ha encontrado ningun ID de inventario",
            });
          } else {
            res
              .status(200)
              .send({ code: 200, branchesId: inventoryIdStored.recordsets });
          }
        }
      }
    );
  });
}

function addBranch(req, res) {
  const { name } = req.body;

  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `INSERT INTO Sucursal (Nombre) VALUES ('${name}')`,
      (err, inventoryStored) => {
        //handle err
        if (err) {
          res.status(500).send({ code: 500, message: "Error del servidor" });
        } else {
          if (!inventoryStored) {
            res.status(404).send({
              code: 404,
              message:
                "No se ha podido agregar la sucursal, intentelo más tarde",
            });
          } else {
            res
              .status(200)
              .send({ code: 200, message: "Sucursal agregada correctamente" });
          }
        }
      }
    );
  });
}

function updateBranch(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `UPDATE Sucursal SET Nombre = '${name}' WHERE Id = ${id} `,
      (err, inventoryStored) => {
        //handle err
        if (err) {
          res.status(500).send({ code: 500, message: "Error del servidor" });
        } else {
          if (!inventoryStored) {
            res.status(404).send({
              code: 404,
              message: "No se pudo editar la sucursal, intentelo más tarde",
            });
          } else {
            res
              .status(200)
              .send({ code: 200, message: "Sucursal editada correctamente" });
          }
        }
      }
    );
  });
}

function deleteBranch(req, res) {
  const { id } = req.params;

  sql.connect(DATABASE_CONFIG, (err) => {
    if (err) {
      throw err;
    }
    new sql.Request().query(
      `DELETE FROM Inventario WHERE Id_Sucursal = ${id};
      DELETE FROM Sucursal WHERE Id = ${id} `,
      (err, inventoryStored) => {
        //handle err
        if (err) {
          res.status(500).send({ code: 500, message: "Error del servidor" });
        } else {
          if (!inventoryStored) {
            res.status(404).send({
              code: 404,
              message:
                "No se ha podido eliminar la sucursal, intentelo más tarde",
            });
          } else {
            res
              .status(200)
              .send({ code: 200, message: "Sucursal eliminada correctamente" });
          }
        }
      }
    );
  });
}

module.exports = {
  getBranches,
  getBranchesId,
  addBranch,
  updateBranch,
  deleteBranch,
};
