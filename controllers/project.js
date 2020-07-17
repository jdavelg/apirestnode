'use strict'

var Project=require('../models/project')
//const project = require('../models/project')
var fs= require('fs');
var path= require('path')
var controller={

    home:function(req,res){
        return res.status(200).send({
            message: "soy el method home"
        })

},

test: function(req, res){
return res.status(200).send({
    message: "soy el metodo test del controller"
})
},

saveProject: function(req, res){
var project= new Project();

var params= req.body;
project.name= params.name;
project.description= params.description;
project.category= params.category;
project.year= params.year;
project.langs= params.langs;
project.image=null;

project.save((err, projectStored)=>{

    if(err) return res.status(500).send({message:"error al guardar"});


    if(!projectStored) return res.status(404).send({message: "no se ha podido guardar el project"});
       
    
   // return res.status(200).send({ projectm: projectStored});
 // return res.status(201).json({message:"Exito  al guardar"});
 return res.status(200).send({
    project: project,
    message: "metodo saveProject workingon"
});

})



/*return res.status(200).send({
    project: project,
    message: "metodo saveProject workingon"
})*/
},


getProject: function(req, res){




var projectId=req.params.id;

if(projectId==null || projectId==''){
    return res.status(404).send({ message: "el projecto no existe"})
}

Project.findById(projectId, function(err, project) {

if(err) return res.status(500).send({message: "error al devolver los datos"});
if(!project) return res.status(404).send({ message: "el projecto no existe"})

return res.status(200).send({
    project
})

});

},

getProjects:function(req, res){
Project.find({}).sort('+year').exec((err, projects)=>{

    if(err) return res.status(500).send({ message: "error al devlver los datos"});

    if(!projects) return res.status(404).send({ message: "No hay projectos que mostrar"})

    return res.status(200).send({projects});
})
},

updateProject: function(req, res){
var projectId= req.params.id;
var update= req.body;

Project.findByIdAndUpdate(projectId, update, {new:true} ,(err, projectUpdated)=>{
    if(err) return res.status(500).send({ message: "error al actualizar"})
    if(!projectUpdated) return status(404).send({ message: "no existe el projecto a actualizar"})

    return res.status(200).send({

        project:projectUpdated
    })
})


},


deleteProject: function(req, res){

var idProject= req.params.id;
Project.findByIdAndRemove(idProject, (err, projectRemoved)=>{

    if(err) return res.ststus(500).send({message: " no se ha podido borrar el proyecto"})

    if(!projectRemoved) res.status(404).send({ message: " no se encontro el projecto a borrar"})

    return res.status(200).send({ 
        project: projectRemoved
    })
})
},


uploadImage:function(req, res){
var idProject=req.params.id;

var image= req.params.image

 if(req.file){


  
    // console.log(req.file);

    var file_path = req.file.path;

    var file_split = file_path.split('\\');

    var file_name = file_split[1];

    var ext_split = req.file.originalname.split('\.');

    var file_ext = ext_split[1]

    console.log(file_ext);

   if(file_ext== 'png' || file_ext== 'gif' || file_ext== 'jpg' || file_ext== 'jpeg'){
   
      Project.findByIdAndUpdate( idProject, {image:file_name},{new:true}, (err, albumUpdated) => {

        if(!albumUpdated){

         return res.status(500).send({message: 'No se ha podido actualizar el album',
         name: file_name});

        }else{

         return res.status(200).send({project: albumUpdated,
        name: file_name});

        }

      })

    }else{

     return  res.status(500).send({message: 'Extension del archivo no valida',
     name: file_name});

    }

    console.log(file_path);

  }else{

    return res.status(404).send({message: 'No has subido ninguna imagen..'});

  } 


},

  
getImageFile: function(req, res){
    var file = req.params.image;
    var path_file = './uploads/'+file;

    fs.exists(path_file, (exists) => {
        if(exists){
            return res.sendFile(path.resolve(path_file));
        }else{
            return res.status(200).send({
                message: "No existe la imagen..."
            });
        }
    });
}



}
module.exports=controller;