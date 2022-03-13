const express = require ('express')
const {routerProductos} = require('./Router/Productos')

const app = express ()

app.use (express.urlencoded({extended: true}))
app.use (express.static('public'))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.use('/api/productos',routerProductos)


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server run on port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))