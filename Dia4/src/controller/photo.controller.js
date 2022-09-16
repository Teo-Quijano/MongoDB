const connection = require("../database")
const PhotoModel = require("../model/photo")



function getPhoto(request,response){
    console.log("lanzada getPhoto");
//• GET /photos. Dado un usuario obtiene todas sus fotos.
    id = request.query.id

    PhotoModel.find({usuario:"usuario"+id})
    .then(function(items){
        let photo=[];
        for (let i = 0; i < items.length; i++) {
            let currentPhoto = "Photo: "+items[i].url
            photo.push(currentPhoto)
               
        }
        console.log(photo);
        response.send(photo) 
    })
    .catch(function(){
        console.log("Error");
    })
}

function postPhoto(request,response){
    console.log("lanzada postPhoto");
//• POST /photos. Dado un usuario, url de foto, titulo y descripción se debe guardar en la colección.
    console.log(request.body);
    let photo = new PhotoModel ({
        usuario : request.body.usuario,
        url : request.body.url,
        titulo : request.body.titulo,
        descripcion : request.body.descripcion
    })
    photo.save()
    .then((data)=>
    {
        console.log("Photo guardada correctamente");
        console.log(data);
        response.send(data)
    })
    .catch((error)=>
    {
        console.log(error);
    })


}

function putPhoto(request,response){
    console.log("lanzada putPhoto");
//• PUT /photos. Dado el titulo de una foto y una descripción modificar su descripción.
    PhotoModel.updateOne(
        {titulo : request.body.titulo},
        {descripcion : request.body.descripcion}
    )
    .then((data)=>
    {
        console.log("Modificación realizada.");
        console.log(data);
        response.send(data)
    })
    .catch(function()
    {
        console.log("Eror");
    })

}

function deletePhoto(request,response){

    console.log("lanzada deletePhoto");

    let usuario1 = request.body.usuario;
    let titulo1 = request.body.titulo;
 //• DEL /photos. Dado un usuario y un titulo de foto eliminar su foto.
    if(usuario1 !== "" && titulo1 !== ""){

        PhotoModel.updateOne(
                            {usuario :  usuario1, 
                            titulo : titulo1},
                            {url:""}
                            )
        .then((data)=>
        {
            console.log("Modificación realizada.");
            console.log(data);
            response.send(data)
        })
        .catch(function()
        {
            console.log("Eror");
        })
    }if(usuario1 !== "" && titulo1 == ""){
//• DEL /photos. Dado un usuario eliminar todas sus fotos.
        PhotoModel.updateMany(
                            {usuario : usuario1},
                            {url:""}
                            )
        .then((data)=>
        {
            console.log("Modificación realizada.");
            console.log(data);
            response.send(data)
        })
        .catch(function()
        {
            console.log("Eror");
        })
    }

}
module.exports = {getPhoto,postPhoto,putPhoto,deletePhoto}