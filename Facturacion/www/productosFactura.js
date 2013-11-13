var itemEliminar;


$('.remove').live("click", function() {
                  itemEliminar =  $(this).attr('id');
                  $('#tablaProductos').empty();
                  //$(this).parents("tr").remove();
                  
                  
                  db.transaction(eliminarProductoTabla, errorSQL);
                  db.transaction(actualizarFactura, errorSQL);
                   db.transaction(obtenerTotalFactura, errorSQL);

                  
                  
                  
                  
                  });

function eliminarProductoTabla(tx) {
    
    
    tx.executeSql('Delete from facturaDetalle where idProducto='+itemEliminar);
}










function actualizarFactura(tx) {
    tx.executeSql('SELECT facturaDetalle.cantidad, producto.id, producto.descripcion, facturaDetalle.precioTotal from facturaDetalle INNER JOIN producto ON facturaDetalle.idProducto=producto.id where facturaDetalle.idFactura = 1', [], actualizarFacturaSql, errorSQL);
}

// Query the success callback
//
function actualizarFacturaSql(tx, results) {
    var len = results.rows.length;
    $( "#tablaProductos" ).empty();
    
    
    for (var i=0; i<len; i++){
        
        $('#tablaProductos').append('<tr><td>'+ results.rows.item(i).cantidad +'</td><td>'+ results.rows.item(i).descripcion +'</td><td>'+ results.rows.item(i).precioTotal +'</td> <td><a id="'+results.rows.item(i).id +'" class="remove ui-btn ui-btn-up-c ui-btn-icon-notext ui-btn-corner-all ui-shadow" data-role="button" data-icon="delete" data-iconpos="notext" title="" data-theme="c"><span class="ui-btn-inner ui-btn-corner-all" aria-hidden="true"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-delete ui-icon-shadow"></span></span></a></td></tr>');
        
        
        
    }
    
    $( "#tablaProductos" ).table("refresh" );
}

function errorSQL(err) {
    console.log("Error processing SQL: "+err.code);
}



function muestraProductosFactura(tx){
            tx.executeSql('SELECT * FROM producto',[],muestraProductosFacturaSql,errorSQL);
            }
            
            function muestraProductosFacturaSql(tx,result){
            $('#listaProductos2').empty();
            $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('#listaProductos2').append('<li id="'+row['id']+'"><a href="#"><h3 class="ui-li-heading">'+row['descripcion']+'</h3><p class="ui-li-desc">$'+row['costo']+'</p></a></li>');
            });
            $( "#listaProductos2" ).listview( "refresh" );
            
            }

$('#listaProductos2 li').live('click', function() {
                  ident=$(this).attr("id");
                              
                              console.log(ident);
                  
                  db.transaction(prepararProducto,errorProductos);
                  $.mobile.changePage("#formAgregarProducto", {transition : "slide"});
                  });

$('#agregarProductoFactura').live("click",function(){


adicionProducto();


});

$('#agregarItem').live("click",function(){
                       
db.transaction(muestraProductosFactura, errorSQL);

  $.mobile.changePage("#inventario", {transition : "slide"});




});




function adicionProducto(){
                  db.transaction(adicionProductoSql, errorSQL);
                  db.transaction(actualizarFactura, errorSQL);
                  db.transaction(obtenerTotalFactura, errorSQL);

                  $.mobile.changePage("#page7", {transition : "slide"});
                  }
                  
                  function adicionProductoSql(tx) {
                  var precioVal      = $("#precioHidden").attr('value');
                  var cantidadVal           = $("#cantidadProducto").attr('value');

                  var total = precioVal * cantidadVal;
                
       
            
        tx.executeSql('INSERT INTO facturaDetalle (idFactura, idProducto, cantidad, precioTotal) VALUES ('+folioActual+','+ident+','+ cantidadVal+','+ total +')');
                  
                      $("#cantidadProducto").val('');


                  
                  }

function prepararProducto(tx){
            tx.executeSql('SELECT * FROM producto WHERE id='+ident+'',[],prepararProductoSql,errorProductos);
            }
            
            function prepararProductoSql(tx,result){
            
            $.each(result.rows,function(index){
            var row = result.rows.item(index);
                   
                
            $('#nombreProducto').val(row['descripcion']);
            $('#precioHidden').val(row['costo']);
           
            });
       
            
            }


