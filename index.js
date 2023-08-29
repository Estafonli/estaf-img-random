const path = require('path');
const express = require('express');
const fs = require('fs');
var http = require('http');
const { fileLoader } = require('ejs');

const imgPath = path.join(__dirname, "/public/imagenes");
const app = express();
const server = http.createServer(app);

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

let imagenes = [];

app.get('/', function(req, res){
    fs.readdir(imgPath, { withFileTypes: true}, (error, files) => {
        files.filter(dirent => !dirent.isDirectory())
			.map(dirent => imagenes.push(dirent.name));

        res.render(__dirname + '/index.html', { imagenes: imagenes });
        imagenes = [];
    })
})

app.get('/:dir', function(req, res){
    //let imagenes = [];

    fs.readdir(imgPath + "/" + req.params.dir, { withFileTypes: true}, (error, files) => {
        if(error) console.log(error);

        try {
            files.filter(dirent => !dirent.isDirectory())
				.map(dirent => imagenes.push(req.params.dir + "/" + dirent.name));

            res.render(__dirname + '/index.html', { imagenes: imagenes });
        } catch (error) {
            res.send('Nada');
        }

        imagenes = [];
    })
})

server.listen(3000, '0.0.0.0');
server.on('listening', function() {
    console.log('Server Run in %s:%s', server.address().address, server.address().port)
})