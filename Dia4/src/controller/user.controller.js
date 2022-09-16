const fotoSchema = require ("../model/user")



// GET
const getFoto = (req, res) => { 
    console.log(req.query)
    let respuesta;
    console.log("Entro al Get foto")
    if (req.query.usuario != null)
    {
        fotoSchema.find({usuario: req.query.usuario})
        .then((foto) => {
            if (foto.length > 0) {
                respuesta = { error: true, message: `Fotos del usuario con id: ${req.query.id}`, result: foto}
            } else {
                respuesta = { error: false, message: `El usuario con id: ${req.query.id} no tiene fotos`}                
            }
            res.send(respuesta);
        })
        .catch((err) => {
            console.log(err)
        })
    } else{
        res.send({ error: false, message: 'Id de usuario no válido'})
    }
};

// POST                
const postFoto = (req, res) => {
    let respuesta;
    {
        console.log(req.body);
        let foto = new fotoSchema({usuario: req.body.usuario,
                                    url: req.body.url,
                                    titulo: req.body.titulo,
                                    descripcion: req.body.descripcion})
        foto.save()
        .then((foto) => {
            console.log(foto);
            respuesta = { error: true, message: `Foto del usuario agregada`, result: foto};
            res.send(respuesta);
        })
        .catch((error) => {
            console.log(error);
        })
    }
};

// PUT
const putFoto = (req, res) => {
    let respuesta;
    let descripcion = req.body.descripcion
    let id = req.body.id ? req.body.id : -1;
    if (id != -1) {
        fotoSchema.findOneAndUpdate({ _id: id }, 
        {
            descripcion: descripcion, 
        }
        )
        .then((foto) => {
            respuesta = { error: false, message: "Descripcion Modificada", result: foto}
        res.send(respuesta);
    });
    } else { 
        respuesta = { error: true, message: "Buscando ID", result: req.body,};
        res.send(respuesta);
    }
}


// DELETE
const deleteFoto = (req, res) => {
    const { usuario, titulo } = req.body;
    let respuesta;
        if (titulo && usuario){
        fotoSchema.findOneAndDelete({ $and: [{ usuario: usuario }, { titulo: titulo }] })
        .then((resp) => {
            if (!resp) {
                console.log('No se ha encontrado ningún registro con los datos especificados')
                res.send(respuesta);
            } else {
                console.log('Operación correcta:');
                console.log(`Foto con título ${resp.titulo} del usuario ${resp.usuario} eliminada`)
            }
        })
    } else if (usuario){
        fotoSchema.deleteMany({ usuario: usuario })
        .then((result) => {
            if (result.deletedCount == 0) {
                respuesta = { error: false, message: 'Foto/s no encontrada/s'}
                res.send(respuesta);
            } else {
                respuesta = { error: false, message: 'Foto/s eliminada/s'}
            }
            return res.status(200).json(respuesta)
        })
        .catch((err) => {
            console.log(err)
        })
    } else{
        return res.status(200).json({ ok: false, message: 'Id de usuario no válido'})
    }
};

// Exportar controladores
module.exports = { getFoto, postFoto, putFoto ,deleteFoto}