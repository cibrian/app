var folioActual;
var totalFactura;


function obtenerIDFactura(tx) {
    tx.executeSql('SELECT MAX(id) as max from factura ', [], obtenerIDFacturaSql, errorSQL);
}


function obtenerIDFacturaSql(tx, results) {
    var len = results.rows.length;
    

if (results.rows.item(0).max == null) {
    folioActual = 1;
    
$("#folio").val(folioActual);

}

else{

    folioActual = results.rows.item(0).max + 1;
    
$("#folio").val(folioActual);

}

}

function obtenerTotalFactura(tx) {
    tx.executeSql('SELECT SUM(precioTotal) as total from facturaDetalle where idFactura = ' + folioActual, [], obtenerTotalFacturaSql, errorSQL);
}


function obtenerTotalFacturaSql(tx, results) {
    

    
$("#subtotal").val(results.rows.item(0).total);


}




