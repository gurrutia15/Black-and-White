import {v4 as uuidv4} from 'uuid'

import fs from 'fs'
import Jimp from 'jimp'
import express from 'express'
import path from 'path'  

var __dirname = path.resolve();
const app = express()
app.listen(3000, console.log("server on"))
app.use(express.json())
//app.use(express.static("assets"));


//1. ruta raíz
app.use(express.static('../assets'))
app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../index.html"))
})


//2. estilos css
app.get('/miestilo', async(req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/css'});
     fs.readFile('estilo.css', (err, css) => {
         res.end(css);
     })
 })


//3 y 4. jimp y nombre uuid.jpg

app.get('/imagen', async (req, res) => {
    res.setHeader('Content-Type', 'image/jpg')
    const imageName = uuidv4().slice(0,6) + '.jpg'
const {archivo} = req.query
    const imagen = await Jimp.read(archivo)
    await imagen
        .resize(350,Jimp.AUTO)
        .greyscale()
        .quality(60)
        .writeAsync(imageName)
    const imagenData = fs.readFileSync(imageName)
    res.send(imagenData)
})



