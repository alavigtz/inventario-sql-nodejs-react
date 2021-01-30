--Crear base de datos
CREATE DATABASE EmpresaX

USE EmpresaX

--Creando tabla Sucursal
CREATE TABLE Sucursal(
Id int not null IDENTITY(1,1) PRIMARY KEY,
Nombre VARCHAR(50) not null
)

--Creando tabla Producto
CREATE TABLE Producto(
Id int not null IDENTITY(1000,1) PRIMARY KEY,
Nombre VARCHAR(50) not null,
CodBarras int not null UNIQUE,
PrecioUnitario decimal(18,2) not null,
)

--Creando tabla Inventario
CREATE TABLE Inventario(
Id int not null IDENTITY(100000,1) PRIMARY KEY,
Id_Sucursal INT,
Id_Producto INT,
Cantidad int not null, 
--Estableciendo llaves foraneas
CONSTRAINT FK_Inventario_Id_Sucursal FOREIGN KEY (Id_Sucursal) REFERENCES Sucursal(Id),
CONSTRAINT FK_Inventario_Id_Producto FOREIGN KEY (Id_Producto) REFERENCES Producto(Id)
)

--Insertar primeras dos sucursales
INSERT INTO Sucursal (Nombre) 
VALUES('Sucursal A'), ('Sucursal B');

--Insertar productos
INSERT INTO Producto (Nombre, CodBarras, PrecioUnitario)
VALUES
('Café Legal', 100010, 7), 
('Chocolate Abuelita', 100011,	15), 
('Bonafina', 100012, 12);


--Insertar Inventarios
INSERT INTO Inventario(Id_Sucursal, Id_Producto, Cantidad)
VALUES
(1, 1000, 5),
(1, 1001, 6),
(1, 1002, 1),
(2, 1000, 8),
(2, 1001, 4),
(2, 1002, 2);

--Consulta para mostrar Inventario de Sucursal A
SELECT P.Nombre,  P.CodBarras, I.Cantidad, P.PrecioUnitario FROM Sucursal AS S INNER JOIN Inventario AS I on S.Id = I.Id_Sucursal INNER JOIN Producto AS P on P.Id = I.Id_Producto WHERE S.Id = 1


		

