//add listener when device ready
    document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("Dummy_DB", "1.0", "Just a Dummy DB", 200000); //will create database Dummy_DB or open it
	var ident;
 
    //function will be called when device ready
    function onDeviceReady(){
        db.transaction(crearDB, errorClientes, successClientes);
    }
 
    //create table and insert some record
    function crearDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS SoccerPlayer (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');
    }
 

    function errorClientes(err) {
    }
 

    function successClientes() {
        db.transaction(muestraClientes,errorClientes);
    }
 
    //select all from SoccerPlayer
    function muestraClientes(tx){
        tx.executeSql('SELECT * FROM SoccerPlayer',[],muestraClientesSql,errorClientes);
    }
 
    function muestraClientesSql(tx,result){
        $('#listaClientes').empty();
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('#listaClientes').append('<li id="'+row['id']+'"><a href="#"><h3 class="ui-li-heading">'+row['Name']+'</h3><p class="ui-li-desc">'+row['Club']+'</p></a></li>');
			
			
			
        });
 
      
  $( "#listaClientes" ).listview( "refresh" );
  
    }
	
	
 function editarCliente(tx){
        tx.executeSql('SELECT * FROM SoccerPlayer WHERE id='+ident+'',[],editarClienteSql,errorClientes);
    }
	
	function editarClienteSql(tx,result){
        
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
       
			
			$('#nombreInput').val(row['Name']);
			
			$('#rfcInput').val(row['Club']);
			
        });
 
      

  
    }