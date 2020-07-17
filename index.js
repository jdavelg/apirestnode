'use strict'

var mongoose= require('mongoose');
var app= require('./app');
/* const { listen } = require('./app'); */
var port= 3700;

mongoose.Promise=global.Promise;
mongoose.set('useNewUrlParser', true );
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/portafolio')
    .then(()=>{

        console.log("connection succesfully");
        
        //Creacion del servidor

        app.listen(process.env.PORT || 8080, function () {
            var port = server.address().port;
    
})
    })
    .catch(err=> console.log(err))


    