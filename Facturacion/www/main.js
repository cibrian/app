            //add listener when device ready
            document.addEventListener("deviceready", onDeviceReady, false);
            var db = window.openDatabase("Factura", "1.0", "Just a Dummy DB", 200000); 
            var ident;
            
            function onDeviceReady(){
            db.transaction(crearDB, errorClientes, successClientes);
            }
            
            function crearDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS "Cliente" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "nombre" VARCHAR(50), "rfc" VARCHAR(50), "calle" VARCHAR(50), "numExt" VARCHAR(50), "numInt" VARCHAR(50), "colonia" VARCHAR(50), "cp" VARCHAR(50), "municipio" VARCHAR(50), "estado" VARCHAR(50), "email" VARCHAR(50))');
            
            }
            