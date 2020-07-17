'use strict'


var express= require('express');

var projectController= require('../controllers/project')

var router= express.Router();

 var multipart= require('multer') 
 var multipartMiddleware= multipart({uploadDir: './uploads/albums'}) 

 var crypto = require('crypto')

 var multer = require('multer');
 
 const storage = multer.diskStorage({
 
   destination(req, file, cb) {
 
     cb(null, './uploads');
 
   },
 
   filename(req, file = {}, cb) {
 
     const { originalname } = file;
 
    
 
     const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
 
     // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
 
     crypto.pseudoRandomBytes(16, function (err, raw) {
 
       cb(null, raw.toString('hex') + Date.now() + fileExtension);
 
     });
 
   },
 
 });
 
 var mul_upload = multer({dest: './uploads',storage});

router.get('/home', projectController.home);

router.post('/test', projectController.test);

router.post('/save-project', projectController.saveProject)

router.get('/project/:id?',projectController.getProject)

router.get('/projects', projectController.getProjects)



router.put('/project/:id', projectController.updateProject)

router.delete('/project/:id', projectController.deleteProject)

router.post('/upload-image/:id',   mul_upload.single('image'), projectController.uploadImage);

router.get('/get-image/:image', projectController.getImageFile)


module.exports=router