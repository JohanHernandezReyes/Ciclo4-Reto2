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

    let myData = {
        id: $("#iduser").val(),
        name: $("#name").val(),
        email: $("#email").val().toLowerCase(),
        password: $("#password").val(),
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
            alert("se ha guardado el dato");
            document.getElementById("formregistro").setAttribute("hidden", "true");
            document.getElementById("bt").setAttribute("hidden", "true");
            $("#msj").html("Se ha registrado con éxito. Ahora puede ingresar");
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
            $("#iduser").val(respuesta.length+1);
        }
    });
   
}    
