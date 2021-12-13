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
 * Funcion que trae la informacion de los productos 
 */

 function traerInformacionProductos(){
    console.log("testP");
        $.ajax({
        url:"http://168.138.249.154:8080/api/cosmetics/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
$(document).ready(function (){
    traerInformacionProductos();
});
/**
 * Funcion que pinta en una tabla la informacion de los productos
 */
function pintarRespuesta(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        myTable+="<td>"+respuesta[i].photography+"</td>";
        myTable+="<td> <button type='button' class='btn btn-primary btn-lg btn-block' data-toggle='modal' data-target='#productModalUpdate'>Editar</button>";
        myTable+="<td> <button type='button' class='btn btn-primary btn-lg btn-block' onclick='deleteProduct("+JSON.stringify(respuesta[i].reference)+" )'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoPro").html(myTable);
}

/**<button type="button" class="btn btn-primary btn-lg btn-block" onclick="saveUser()">Agregar</button>
 * Funcion que Crea la informacion de un producto en la aplicaciòn
 */
 function saveProduct(){
    let referencePro = document.getElementById("ProductRefe").value;
    let brandPro = document.getElementById("ProductBrand").value;
    let categoryPro = document.getElementById("ProductCategory").value;
    let namePro = document.getElementById("productName").value;
    let descriptionPro = document.getElementById("productDescription").value;
    let availabilityPro = document.getElementById("productAvailability").value;
    let pricePro = document.getElementById("productPrice").value;
    let quantityPro = document.getElementById("productQuantity").value;
    let photographyPro = document.getElementById("productPhotography").value;
    
    if (referencePro!= "" && brandPro!= "" && categoryPro!= "" && namePro!= "" && descriptionPro!= ""  && availabilityPro != "" && pricePro != "" && quantityPro != "" && photographyPro!= "") {
        $.ajax({
            type:'GET',
            contentType: "application/json",
            dataType: 'JSON',
            url:"http://168.138.249.154:8080/api/cosmetics/productexist/"+ referencePro ,
            success:function(responseJ) {
                if (responseJ == false) {
                    $.ajax({
                        type:'POST',
                        contentType: "application/json; charset=utf-8",
                        dataType: 'JSON',
                        data: JSON.stringify({
                            "reference":referencePro,
                            "brand": brandPro,
                            "category":categoryPro,
                            "name":namePro,
                            "description": descriptionPro,
                            "availability":availabilityPro,
                            "price":pricePro,
                            "quantity": quantityPro,
                            "photography":photographyPro
                        }),
                        url:"http://localhost:8080/api/cosmetics/new",
                        success:function(response) {
                            console.log(response);
                            console.log("El Producto se Guardo Correctamente");
                            alert("El Producto se Guardo Correctamente");
                            window.location.reload();
                            $("#referencePro").val("");
                            $("#brandPro").val("");
                            $("#categoryPro").val("");
                            $("#namePro").val("");
                            $("#descriptionPro").val("");
                            $("#availabilityPro").val("");
                            $("#pricePro").val("");
                            $("#quantityPro").val("");
                            $("#photographyPro").val("");
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            window.location.reload();
                            alert("El Producto no se Guardo Correctamente");
                        }
                    });  
                    
                }else{
                    alert("El Producto ya existe en la DB");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload();
            }
        });
    }
    return false;
}
// fin validar


/**
 * Funcion que Actualiza la informacion de un Usuario
 */
 function updateProducts(){
    let myDataPE={
        reference:$("#ProductRefeE").val(),
        brand:$("#ProductBrandE").val(),
        category:$("#ProductCategoryE").val(),
        name:$("#productNameE").val(),
        description:$("#productDescriptionE").val(),
        availability:$("#productAvailabilityE").val(),
        price:$("#productPriceE").val(),
        quantity:$("#productQuantityE").val(),
        photography:$("#productPhotographyE").val()
    };
    console.log(myDataPE);
    let dataToSend=JSON.stringify(myDataPE);
    $.ajax({
        url:"http://168.138.249.154:8080/api/cosmetics/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaP){
            console.log(respuestaP);
            console.log("El Producto se Actualizo Correctamente");
            window.location.reload();
            $("#ProductRefeE").val("");
            $("#ProductBrandE").val("");
            $("#ProductCategoryE").val("");
            $("#productNameE").val("");
            $("#productDescriptionE").val("");
            $("#productAvailabilityE").val("");
            $("#productPriceE").val("");
            $("#productQuantityE").val("");
            $("#productPhotographyE").val("");
            alert("Usuario Actualizado con Exito");            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("El Producto no se Actualizo Correctamente");
        }
    });
}
// fin Actualizar User

/**
 * Funcion que Crea la informacion de un producto en la aplicaciòn
 */
 function updateProduct(){
    let referenceProE = document.getElementById("ProductRefeE").value;
    let brandProE = document.getElementById("ProductBrandE").value;
    let categoryProE = document.getElementById("ProductCategoryE").value;
    let nameProE = document.getElementById("productNameE").value;
    let descriptionProE = document.getElementById("productDescriptionE").value;
    let availabilityProE = document.getElementById("productAvailabilityE").value;
    let priceProE = document.getElementById("productPriceE").value;
    let quantityProE = document.getElementById("productQuantityE").value;
    let photographyProE = document.getElementById("productPhotographyE").value;
    
    if (referenceProE!= "" && brandProE!= "" && categoryProE!= "" && nameProE!= "" && descriptionProE!= ""  && availabilityProE != "" && priceProE != "" && quantityProE != "" && photographyProE!= "") {
        $.ajax({
            type:'GET',
            contentType: "application/json",
            dataType: 'JSON',
            url:"http://168.138.249.154:8080/api/cosmetics/productexist/"+ referenceProE,
            success:function(responsePE) {
                if (responsePE == false) {
                    $.ajax({
                        type:'PUT',
                        contentType: "application/json; charset=utf-8",
                        dataType: 'JSON',
                        data: JSON.stringify({
                            "reference":referenceProE,
                            "brand": brandProE,
                            "category":categoryProE,
                            "name":nameProE,
                            "description": descriptionProE,
                            "availability":availabilityProE,
                            "price":priceProE,
                            "quantity": quantityProE,
                            "photography":photographyProE
                        }),
                        url:"http://localhost:8080/api/cosmetics/update",
                        success:function(responseP) {
                            console.log("El Producto se Actualizo Correctamente");
                            alert("El Producto se Actualizo Correctamente");
                            console.log("aca estoy "+responseP);
                            window.location.reload();
                            $("#referenceProE").val("");
                            $("#brandProE").val("");
                            $("#categoryProE").val("");
                            $("#nameProE").val("");
                            $("#descriptionProE").val("");
                            $("#availabilityProE").val("");
                            $("#priceProE").val("");
                            $("#quantityProE").val("");
                            $("#photographyProE").val("");
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            window.location.reload();
                            alert("El Producto no se Actualizo Correctamente");
                        }
                    });  
                    
                }else{
                    alert("El Producto ya existe en la DB");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload();
            }
        });
    }
    return false;
}
// fin validar
/**
 * Funcion que pinta en una tabla la informacion de los productos
 */
function deleteProduct(referencePro){
    console.log(referencePro);
    let myData={
        reference:referencePro
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://168.138.249.154:8080/api/cosmetics/"+referencePro,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionProductos();
        Swal.fire({
            title: "Prducto"+ referencePro,
            text: "¿Eliminar?",
            icon: 'warning',
            confirmButtonText: "Sí, eliminar",
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
