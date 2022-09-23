const Photo = require("../model/photo")



function getPhoto(request,response){
    console.log("Metodo GET");
    usuario = request.query.usuario

    Photo.find({usuario: request.query.usuario})
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

function postPhoto(request, response){
    console.log("Metodo POST");
    console.log(request.body);
    let photo = new Photo({
        usuario: request.body.usuario,
        url: request.body.url,
        titulo: request.body.titulo,
        descripcion: request.body.descripcion
    })
    photo.save()
    .then((data)=>
    {
        console.log("Foto guardada correctamente");
        console.log(data);
        response.send(data)
    })
    .catch((error)=>
    {
        console.log(error);
    })
}

function putPhoto(request,response){
    console.log("Metodo PUT");
    Photo.updateOne(
        { _id: request.body._id}, 
        {descripcion : request.body.descripcion, titulo : request.body.titulo}
      
    )
    .then((data)=>
    {
        console.log("Modificación realizada.");
        console.log(data);
        response.send(data)
    })
    .catch(function()
    {
        console.log("Error");
    })

}

function deletePhoto(request,response){

    console.log("Metodo DELETE");
    let usuario = request.body.usuario;
    let titulo = request.body.titulo;
    if(usuario !== "" && titulo !== ""){

        Photo.updateOne(
                            {usuario : usuario, 
                            titulo : titulo},
        )
        .then((data)=>
        {
            console.log("Modificación realizada.");
            console.log(data);
            response.send(data)
        })
        .catch(function()
        {
            console.log("Error");
        })
    }if(usuario !== "" && titulo == ""){
        Photo.updateMany(
                            {usuario : usuario},
        )
        .then((data)=>
        {
            console.log("Modificación realizada.");
            console.log(data);
            response.send(data)
        })
        .catch(function()
        {
            console.log("Error");
        })
    }

}
module.exports = {getPhoto,postPhoto,putPhoto,deletePhoto}