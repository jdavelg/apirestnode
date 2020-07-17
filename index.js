'use strict'

var mongoose= require('mongoose');
var app= require('./app');
/* const { listen } = require('./app'); */
var port= 3700;

mongoose.Promise=global.Promise;
mongoose.set('useNewUrlParser', true );
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(()=>{

        console.log("connection succesfully");
        
        //Creacion del servidor

app.listen(port, 'localhost',()=>{
    console.log("server running succesfully on localhost:3700");
    
})
    })
    .catch(err=> console.log(err))


    