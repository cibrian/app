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

$("#descuento").val(0);
$("#retencionIva").val(0);
$("#retencionIsr").val(0);
$("#total").val(0);

}

function obtenerTotalFactura(tx) {
    tx.executeSql('SELECT SUM(precioTotal) as total from facturaDetalle where idFactura = ' + folioActual, [], obtenerTotalFacturaSql, errorSQL);
}


function obtenerTotalFacturaSql(tx, results) {
    
var subt= results.rows.item(0).total;

var i = subt * 0.16;

var d = $("#descuento").val() * 0.01;



d = subt * d;

var rIva = $("#retencionIva").val() * 0.01; ;


rIva = subt * rIva;

var rIsr = $("#retencionIsr").val()* 0.01; ;



rIsr = subt * rIsr;
    
$("#subtotal").val(subt);
$("#iva").val(i);

console.log(subt);
    console.log(i);
    console.log(rIsr);
    console.log(rIva);
    console.log(d);

$("#total").val(subt-i-rIsr-rIva-d);



}



function limpiarTablaProductos(tx) {
    
     console.log("El folio a borrar es: " + folioActual);
    
    tx.executeSql('Delete from facturaDetalle where idFactura='+folioActual);
}

$(document).ready(function(){
$('#metodoPago').change(function() {

  var d = document.getElementById('numCuenta');
  var mp = $('#metodoPago').val();


    if ( mp == "No Aplica" || mp == "Efectivo") {

      d.disabled = "disabled";
      d.value = "";

    }

    else{

   d.disabled = "";
                    

    }


});   
});   




