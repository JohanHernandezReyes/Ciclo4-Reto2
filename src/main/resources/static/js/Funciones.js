function validarvacio(campo, msj_vacio) {
    if (campo == "") {
        alert(msj_vacio);
        throw 'exit';
    }
}

function validarconfirm(password, confirm) {
    if (password != confirm) {
        alert("La confirmación no coincide con la contraseña ingresada");
        throw 'exit';
    }
}

function ValidarDuplicado(email, callbackFunction) {
    $.ajax({
        url: "http://129.151.117.220:9001/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            callbackFunction(email, respuesta);
        }
    });   
}    

function ListaUsuarios(email, respuesta){

    listusers=[];       
    for (i = 0; i < respuesta.length; i++) {
        listusers.push(respuesta[i].email);
    }
    console.log(listusers);
    u = email;
    console.log(u);
    if (listusers.includes(u) && u!=null) {
        alert("El email ya se encuentra registrado");
        throw exit;
    }else{
        NuevoUsuario();
    }
}


function NuevoUsuario() {
    validarvacio($("#name").val(), "Debe ingresar un nombre");
    validarvacio($("#email").val(), "Debe ingresar un e-mail");
    validarvacio($("#password").val(), "Debe ingresar una contraseña");
    validarvacio($("#confirm").val(), "Por favor confirme su contraseña");
    validarconfirm($("#password").val(), $("#confirm").val());
    document.getElementById("iduser").removeAttribute("hidden");
    let myData = {
        id: $("#iduser").val(),
        identification: $("#identif").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        cellPhone: $("#cel").val(),
        email: $("#email").val().toLowerCase(),
        password: $("#password").val(),
        zone: $("#zona").val(),
        type: $("#tipo").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://129.151.117.220:9001/api/user/new",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            $("#confirm").val("");
            $("#address").val("");
            $("#zona").val("");
            $("#identif").val("");
            alert("se ha guardado el dato");
            document.getElementById("iduser").setAttribute("hidden", "true");
        }
    });
    
}

function guardarUsuario(){
    ValidarDuplicado($("#email").val().toLowerCase(), ListaUsuarios);
}
     

function ValidarUsuario(email){
    let myData = email;
    validarvacio($("#uemail").val(), "Debe ingresar un e-mail");
    $.ajax({
        url: "http://129.151.117.220:9001/api/user/emailexist/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            if (respuesta == false) {
                alert("Usuario no existe en la base de datos");
            } 
        }
    });
}



function Autenticacion(email, password) {
    ValidarUsuario(email);
    let myData = (email + "/" + password); console.log(myData);
    validarvacio($("#uemail").val(), "Debe ingresar un e-mail");
    validarvacio($("#upassword").val(), "Debe ingresar una contraseña valida");
    $.ajax({
        url: "http://129.151.117.220:9001/api/user/" + email + "/" + password,
        type: "GET",
        data: email + "/" + password,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#uemail").val("");
            $("#upassword").val("");
            if (respuesta.name == null) {
                alert("Usuario o clave incorrectos");
            } else {
                document.getElementById("formlogin").setAttribute("hidden", "true");
                document.getElementById("btnlog").setAttribute("hidden", "true");
                document.getElementById("ingreso").removeAttribute("hidden");
                $("#welcome").html("Bienvenido "+respuesta.name+"<br>Ha ingresado con un rol de: "+respuesta.type);
            }

        }
    });
}


function nuevoid() {
    $.ajax({
        url: "http://129.151.117.220:9001/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            listusers = [];
            for (i = 0; i < respuesta.length; i++) {
                listusers.push(respuesta[i].id);
            }
            if(respuesta.length=0){
                $("#iduser").val(1);
            }else{
                $("#iduser").val(Math.max.apply(null, listusers)+1);
            }
        }
    });
}    

function ConsultarUsuarios() {
    $.ajax({
        url: "http://129.151.117.220:9001/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultClient").empty();
            $("#detalleClient").empty();
            rta_users = respuesta;
            globalThis;
            console.log(respuesta);
            MostrarUsuarios(respuesta.items);
            document.getElementById("viewusers").setAttribute("hidden", "true");
            document.getElementById("titnew").setAttribute("hidden", "true");
            document.getElementById("formregistro").setAttribute("hidden", "true");
            document.getElementById("ResultUsers").removeAttribute("hidden");
            document.getElementById("newusers").removeAttribute("hidden");
            //Verificarlogin();
        }
    });
}

function MostrarUsuarios() {
if(rta_users.length==0){
    var nodata=document.createTextNode("No existen datos en la tabla seleccionada");
    $("#ResultUsers").append(nodata);
}
else{     
    let myTable = "<table border:'2'>";
    let thead = "<thead>";
        thead += "<tr>";
        thead += "<th>" + "Id" + "</th>"
        thead += "<th>" + "Nombre" + "</th>"
        thead += "<th>" + "Identificación" + "</th>"
        thead += "<th>" + "Email" + "</th>"
        thead += "<th>" + "Dirección" + "</th>"
        thead += "<th>" + "Celular" + "</th>"
        thead += "<th>" + "Zona" + "</th>"
        thead += "<th>" + "Tipo_Usuario" + "</th>"
        thead += "<th>" + "Acciones" + "</th>"
        thead += "</tr>";
    thead += "<thead>";
    myTable += thead;
    for (i = 0; i < rta_users.length; i++) {
        myTable += "<tr>";
        myTable += "<td align=center>" + rta_users[i].id + "</td>";
        myTable += "<td align=center>" + rta_users[i].name + "</td>";
        myTable += "<td align=center>" + rta_users[i].identification + "</td>";
        myTable += "<td align=center>" + rta_users[i].email + "</td>";
        myTable += "<td align=center>" + rta_users[i].address + "</td>";
        myTable += "<td align=center>" + rta_users[i].cellPhone + "</td>";
        myTable += "<td align=center>" + rta_users[i].zone + "</td>";
        myTable += "<td align=center>" + rta_users[i].type + "</td>";
        myTable += "<td> <button onclick='ModificarUsuario(" + rta_users[i].id +")'>Actualizar</button>"+
                    "<button onclick='BorrarUsuario("+rta_users[i].id+")'>Eliminar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#ResultUsers").append(myTable);
}
}

function BorrarUsuario(idElemento){
    let myData = idElemento;
    $.ajax({
        url:"http://129.151.117.220:9001/api/user/"+myData,
        type:"DELETE",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#ResultUsers").empty();
            ConsultarUsuarios();
            alert("Se ha Eliminado el usuario con id: " + idElemento);
            $("#bodyusers").load(location.href + " #bodyusers>*", "");
        }
        
    });
}

function MostrarFormNuevoUsuario(){
    document.getElementById("titnew").removeAttribute("hidden");
    document.getElementById("formregistro").removeAttribute("hidden");
    document.getElementById("viewusers").removeAttribute("hidden");
    $("#ResultUsers").empty();
    document.getElementById("newusers").setAttribute("hidden", "true");
}

function ModificarUsuario(idElement){
    $("#ResultUsers").empty();
    MostrarFormNuevoUsuario();
    $("#titnew").html("Actualizar Datos del Usuario");
    $("#BGUser").html("Actualizar Datos");
    let myData = idElement;
    $.ajax({
        url: "http://129.151.117.220:9001/api/user/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            User1 = respuesta;
            console.log(User1);
            $("#iduser").val(User1.id);
            document.getElementById("iduser").removeAttribute("hidden");
            $("#identif").val(User1.identification);
            $("#email").val(User1.email);
            $("#name").val(User1.name);
            $("#password").val(User1.password);
            $("#confirm").val(User1.password);
            $("#address").val(User1.address);
            $("#cel").val(User1.cellPhone);
            $("#zona").val(User1.zone);
            $("#tipo").val(User1.type).selected;
        }
    });

}