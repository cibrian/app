//add listener when device ready
    document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("Factura", "1.0", "Just a Dummy DB", 200000); 
	var ident;
 
    //function will be called when device ready
    function onDeviceReady(){
        db.transaction(crearDB, errorClientes, successClientes);
    }
 
    //create table and insert some record
    function crearDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS "Cliente" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "nombre" VARCHAR(50), "rfc" VARCHAR(50), "calle" VARCHAR(50), "numExt" VARCHAR(50), "numInt" VARCHAR(50), "colonia" VARCHAR(50), "cp" VARCHAR(50), "municipio" VARCHAR(50), "estado" VARCHAR(50), "email" VARCHAR(50))');
	
    }
 

    function errorClientes(err) {
    }
 

    function successClientes() {
        db.transaction(muestraClientes,errorClientes);
    }
 
    //select all from SoccerPlayer
    function muestraClientes(tx){
        tx.executeSql('SELECT * FROM Cliente',[],muestraClientesSql,errorClientes);
    }
 
    function muestraClientesSql(tx,result){
        $('#listaClientes').empty();
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('#listaClientes').append('<li id="'+row['id']+'"><a href="#"><h3 class="ui-li-heading">'+row['nombre']+'</h3><p class="ui-li-desc">'+row['rfc']+'</p></a></li>');
        });
  $( "#listaClientes" ).listview( "refresh" );
  
    }
	
	
 function editarCliente(tx){
        tx.executeSql('SELECT * FROM Cliente WHERE id='+ident+'',[],editarClienteSql,errorClientes);
    }
	
	function editarClienteSql(tx,result){
        
        $.each(result.rows,function(index){
           var row = result.rows.item(index);
			$('#nombreInput').val(row['nombre']);
			$('#rfcInput').val(row['rfc']);
			$('#calleInput').val(row['calle']);
			$('#intInput').val(row['numInt']);
			$('#extInput').val(row['numExt']);
			$('#coloniaInput').val(row['colonia']);
			$('#cpInput').val(row['cp']);
			$('#municipioInput').val(row['municipio']);
			$('#estadoInput').val(row['estado']);
			$('#emailInput').val(row['email']);	
        });
 
      

  
    }