/**
 * Establece el aspecto inicial de la interfaz
 */
function estadoInicial(){
    let user = sessionStorage.getItem("user");

    if (user== null)
        location.href="index.html";
    else{
        let userJS = JSON.parse(user);
        let typeUser;

        if (userJS.type=='ASE')
            typeUser="ASESOR";
        else if (userJS.type=='ADM')
            typeUser="ADMINISTRADOR";
        else if (userJS.type=='COORD')
            typeUser="COORDINADOR";

        $("#nameUser").html(userJS.name);
        $("#emailUser").html(userJS.email);
        $("#typeUser").html(typeUser);
    }   
}


/**
 * Funcion que trae la informacion de los Usuarios 
 */

 function traerInformacionUsers(){
    console.log("testU");
        $.ajax({
        url:"http://168.138.249.154:8080/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaU){
            console.log(respuestaU);
            pintarRespuestaUsers(respuestaU);
        }
    });
}
$(document).ready(function (){
    traerInformacionUsers();
});
/**
 * Funcion que pinta en una tabla la informacion de los Usuarios
 */
 function pintarRespuestaUsers(respuestaU){
    let myTableU="<table>";
    for(i=0;i<respuestaU.length;i++){
        myTableU+="<tr>";
        myTableU+="<td>"+respuestaU[i].identification+"</td>";
        myTableU+="<td>"+respuestaU[i].name+"</td>";
        myTableU+="<td>"+respuestaU[i].address+"</td>";
        myTableU+="<td>"+respuestaU[i].cellPhone+"</td>";
        myTableU+="<td>"+respuestaU[i].email+"</td>";
        myTableU+="<td>"+respuestaU[i].zone+"</td>";
        myTableU+="<td>"+respuestaU[i].type+"</td>";
        myTableU+="<td> <button type='button' class='btn btn-primary btn-lg btn-block' data-toggle='modal' data-target='#updateModal'>Editar</button>";
        myTableU+="<td> <button type='button' class='btn btn-primary btn-lg btn-block' onclick='deleteUser("+JSON.stringify(respuestaU[i].id)+")'>Eliminar</button>";
        myTableU+="</tr>";
    }
    myTableU+="</table>";
    $("#resultadoUsers").html(myTableU);
}
/**
 * 
 * Crear un usuario en la aplicaciòn
 */
function saveUser(){
    let identification = document.getElementById("userIdentification").value;
    let name = document.getElementById("userName").value;
    let birthtDay = document.getElementById("userBirthtDay").value;
    let monthBirthtDay = document.getElementById("userMonthBirthtDay").value;
    let address = document.getElementById("userAddress").value;
    let cellphone = document.getElementById("UserCellphone").value;
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("userPassword").value;
    let passwordC = document.getElementById("userPasswordC").value;
    let zone = document.getElementById("userZone").value;
    let type = document.getElementById("userType").value;
    
    if (identification!= "" && name!= "" && birthtDay!= "" && monthBirthtDay!= "" && address!= "" && cellphone!= ""  && email != "" && password != "" && passwordC != "" && zone != "" && type!= "") {
        $.ajax({
            type:'GET',
            contentType: "application/json",
            dataType: 'JSON',
            url:"http://168.138.249.154:8080/api/user/emailexist/"+ email,
            success:function(responseJ) {
                if (responseJ == false) {
                    if (password == passwordC ) {
                        $.ajax({
                            type:'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: 'JSON',
                            data: JSON.stringify({
                                "identification": identification,
                                "name": name,
                                "birthtDay": birthtDay,
                                "monthBirthtDay": monthBirthtDay,
                                "address": address,
                                "cellPhone": cellphone,
                                "email":email,
                                "password":password,
                                "zone": zone,
                                "type": type,
                            }),
                            url:"http://localhost:8080/api/user/new",
                            success:function(response) {
                                console.log(response);
                                console.log("El Usuario se Guardo Correctamente");
                                alert("El Usuario se Guardo Correctamente");
                                window.location.reload();
                                $("#userIdentification").val("");
                                $("#userName").val("");
                                $("#userBirthtDay").val("");
                                $("#userMonthBirthtDay").val("");
                                $("#userAddress").val("");
                                $("#UserCellphone").val("");
                                $("#userEmail").val("");
                                $("#userPassword").val("");
                                $("#userPasswordC").val("");
                                $("#userZone").val("");
                                $("#userType").val("");
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                window.location.reload();
                                alert("El Usuario no se Guardo Correctamente");
                            }
                        });  
                    } 
                    else{
                        alert("claves no coinciden");
                        $("#passwordC").focus();
                    }
                }else{
                    alert("El Correo ya existe en la DB");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload();
            }
        });
    }
    return false;
}
// fin Agregar Usuario

/**
 * Funcion que Actualiza la informacion de un Usuario
 */
function updateUser(){
    let myDataE={
        identification:$("#userIdentificationE").val(),
        name:$("#userNameE").val(),
        birthtDay:$("#userBirthtDayE").val(),
        monthBirthtDay:$("#userMonthBirthtDayE").val(),
        address:$("#userAddressE").val(),
        cellPhone:$("#UserCellphoneE").val(),
        email:$("#userEmailE").val(),
        password:$("#userPasswordE").val(),
        zone:$("#userZoneE").val(),
        type:$("#userTypeE").val()
    };
    console.log(myDataE);
    let dataToSend=JSON.stringify(myDataE);
    $.ajax({
        url:"http://168.138.249.154:8080/api/user/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            console.log("El Usuario se Actualizo Correctamente");
            window.location.reload();
            $("#userIdentificationE").val("");
            $("#userNameE").val("");
            $("#userBirthtDayE").val(),
            $("#userMonthBirthtDayE").val(),
            $("#userAddressE").val("");
            $("#UserCellphoneE").val("");
            $("#userEmailE").val("");
            $("#userPasswordE").val("");
            $("#userZoneE").val("");
            $("#userTypeE").val("");
            alert("Usuario Actualizado con Exito");            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("El Usuario no se Actualizo Correctamente");
        }
    });
}
// fin Actualizar User

/**
 * Funcion que Borra la informacion de un Usuario
 */
 function deleteUser(idUser){
    let myData={
        id:idUser
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://168.138.249.154:8080/api/user/"+ idUser,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoUsers").empty();
            traerInformacionUsers();
        Swal.fire({
            title: "Usuario: "+ idUser,
            text: "¿Eliminar?",
            icon: 'warning',
            confirmButtonText: "Sí, Eliminar",
        })
        .then(resultado => {
            if (resultado.value) {
                // Hicieron click en "Sí"
                console.log("*se elimina la venta*");
            } else {
                // Dijeron que no
                console.log("*NO se elimina la venta*");
            }
        });
        }
    });
}
// fin Borrar User

//cuando carga la página html se ejecuta la función: listar()
$(document).ready(function () {
    //configura el aspecto inicial de la pagina
    estadoInicial();
    //ejecuta función para enviar petición al ws

    //si hizo clic en el enlace de cerrar sesion
    $("#cerrarSession").click(function (){
        sessionStorage.removeItem("user");
        location.href="index.html"
    });
});