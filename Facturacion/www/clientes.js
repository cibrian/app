			function agregarCliente(){
			db.transaction(agregarClienteSql, errorClientes, successClientes);
			}
			
			function agregarClienteSql(tx) {
			name      = $("#Nombre").attr('value');
			rfc       = $("#RFC").attr('value');
			calle     = $("#calle").attr('value');
			numInt    = $("#numInterior").attr('value');
			numExt    = $("#numExterior").attr('value');
			colonia   = $("#colonia").attr('value');
			cp        = $("#cp").attr('value');
			municipio = $("#municipio").attr('value');
			estado    = $("#estado").attr('value');
			email     = $("#email").attr('value');
			
			tx.executeSql('INSERT INTO Cliente(nombre,rfc,calle,numExt,numInt,colonia,cp,municipio,estado,email) VALUES ("'+name+'", "'+rfc+'", "'+calle+'", "'+numExt+'", "'+numInt+'", "'+colonia+'", "'+cp+'", "'+municipio+'", "'+estado+'", "'+email+'")');
			
			
			$("#Nombre").val('');
			$("#RFC").val('');
			$("#calle").val('');
			$("#numInterior").val('');
			$("#numExterior").val('');
			$("#colonia").val('');
			$("#cp").val('');
			$("#municipio").val('');
			$("#estado").val('');
			$("#email").val('');
			}
			
			function actualizarCliente(){
			db.transaction(actualizarClienteSql, errorClientes, successClientes);
			$.mobile.changePage("#page", {transition : "slide"});
			}
			
			function actualizarClienteSql(tx) {
			nameNew = $("#nombreInput").attr('value');
			rfcNew = $("#rfcInput").attr('value');
			calleNew = $("#calleInput").attr('value');
			intNew = $("#intInput").attr('value');
			extNew = $("#extInput").attr('value');
			coloniaNew = $("#coloniaInput").attr('value');
			cpNew = $("#cpInput").attr('value');
			municipioNew = $("#municipioInput").attr('value');
			estadoNew = $("#estadoInput").attr('value');
			emailNew = $("#emailInput").attr('value');
			
			
			tx.executeSql('UPDATE Cliente SET nombre="'+nameNew+'", rfc="'+rfcNew+'", calle="'+calleNew+'", numExt="'+extNew+'", numInt="'+intNew+'", colonia="'+coloniaNew+'", cp="'+cpNew+'", municipio="'+municipioNew+'", estado="'+estadoNew+'", email="'+emailNew+'" WHERE id='+ident+'');
			}
			
			
			function eliminarCliente(){
			db.transaction(eliminarClienteSql, errorClientes, successClientes);
			$.mobile.changePage("#page", {transition : "slide"});	
			}
			
			
			function eliminarClienteSql(tx) {
			tx.executeSql('DELETE FROM Cliente WHERE id='+ident+'');
			}
			
			
			
			
			$('#listaClientes li').live('click', function() {
			ident=$(this).attr("id");
			db.transaction(editarCliente,errorClientes);
			$.mobile.changePage("#page3", {transition : "slide"});
			});

