            //add listener when device ready
            document.addEventListener("deviceready", onDeviceReady, false);
            var db = window.openDatabase("Factura", "1.0", "Just a Dummy DB", 200000); 
            var ident;
            
            function onDeviceReady(){
            db.transaction(crearDB, errorSQL, successClientes);
            db.transaction(muestraProductos,errorSQL);
            db.transaction(actualizarFactura, errorSQL);
            db.transaction(muestraProductosFactura, errorSQL);
            db.transaction(obtenerIDFactura, errorSQL);

            



            }
            
            function crearDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS "Cliente" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "nombre" VARCHAR(50), "rfc" VARCHAR(50), "calle" VARCHAR(50), "numExt" VARCHAR(50), "numInt" VARCHAR(50), "colonia" VARCHAR(50), "cp" VARCHAR(50), "municipio" VARCHAR(50), "estado" VARCHAR(50), "email" VARCHAR(50))');
            tx.executeSql('CREATE TABLE IF NOT EXISTS "Producto" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "descripcion" VARCHAR(40), "unidad" VARCHAR(40), "serviciooproducto" VARCHAR(40), "costo" VARCHAR(40))');
            tx.executeSql('CREATE TABLE IF NOT EXISTS factura (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, fecha DATETIME, regimen TEXT, emisor TEXT, formaPago TEXT, metodoPago TEXT, moneda TEXT, lugarExpedicion TEXT, subtotal DOUBLE, descuento DOUBLE, iva DOUBLE, retencionIva DOUBLE, retencionIsr DOUBLE, total DOUBLE, cbb TEXT)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS facturaDetalle (idFactura INTEGER, idProducto INTEGER, cantidad INTEGER, precioTotal DOUBLE)');
             //   tx.executeSql('INSERT INTO factura (fecha) VALUES ("2012-20-1")');
        // tx.executeSql('INSERT INTO factura (fecha) VALUES ("2015-20-1")');      
            }
            


