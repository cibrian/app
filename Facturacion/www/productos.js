
		    function agregarProducto(){
			db.transaction(agregarProductoSql, errorProductos, successProductos);
			}
			
			function agregarProductoSql(tx) {
			descripcion       = $("#descripcion").attr('value');
			unidad            = $("#unidad").attr('value');
			serviciooproducto = $("#slider").attr('value');
			costo             = $("#costo").attr('value');

		
		
			
			tx.executeSql('INSERT INTO Producto(descripcion,unidad,serviciooproducto,costo) VALUES ("'+descripcion+'", "'+unidad+'", "'+serviciooproducto+'", "'+costo+'")');
			
			

			
			$("#descripcion").val('');
			$("#unidad").val('');
			$("#costo").val('');
			$("#slider").val('producto').slider('refresh');

			}


			function actualizarProducto(){
			db.transaction(actualizarProductoSql, errorProductos, successProductos);
			$.mobile.changePage("#page4", {transition : "slide"});
			}
			
			function actualizarProductoSql(tx) {
			descripcionNew       = $("#descripcionInput").attr('value');
			unidadNew            = $("#unidadInput").attr('value');
			serviciooproductoNew = $("#sliderInput").attr('value');
			costoNew             = $("#costoInput").attr('value');

			
			
			tx.executeSql('UPDATE Producto SET descripcion="'+descripcionNew+'", unidad="'+unidadNew+'", serviciooproducto="'+serviciooproductoNew+'", costo="'+costoNew+'" WHERE id='+ident+'');
			}
			
			
			function eliminarProducto(){
			db.transaction(eliminarProductoSql, errorProductos, successProductos);
			$.mobile.changePage("#page4", {transition : "slide"});	
			}
			
			
			function eliminarProductoSql(tx) {
			tx.executeSql('DELETE FROM Producto WHERE id='+ident+'');
			}
			
			
			
			
			$('#listaProductos li').live('click', function() {
			ident=$(this).attr("id");
			db.transaction(editarProducto,errorProductos);
			$.mobile.changePage("#page6", {transition : "slide"});
			});

			            
            
            
           
            function muestraProductos(tx){
            tx.executeSql('SELECT * FROM Producto',[],muestraProductosSql,errorProductos);
            }
            
            function muestraProductosSql(tx,result){
            $('#listaProductos').empty();
            $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('#listaProductos').append('<li id="'+row['id']+'"><a href="#"><h3 class="ui-li-heading">'+row['descripcion']+'</h3><p class="ui-li-desc">$'+row['serviciooproducto']+'</p></a></li>');
            });
            $( "#listaProductos" ).listview( "refresh" );
            
            }
            
            
            function editarProducto(tx){
            tx.executeSql('SELECT * FROM Producto WHERE id='+ident+'',[],editarProductoSql,errorProductos);
            }
            
            function editarProductoSql(tx,result){
            
            $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('#descripcionInput').val(row['descripcion']);
            $('#unidadInput').val(row['unidad']);
            $('#sliderInput').val(row['serviciooproducto']).slider('refresh');
            $('#costoInput').val(row['costo']);
            });
       
            
            }


			function errorProductos(err) {
					
			
			}
					
			function successProductos() {
					db.transaction(muestraProductos,errorProductos);
			}

