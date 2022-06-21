const { Router, json } = require ('express');

const routerProductos = Router ();

let c_id = 1
const addId = () => c_id ++;

let container = [];

routerProductos.use(json());

routerProductos.get ('/', (req, res) =>{
    if (container.length > 0) {
        res.json(container)
    }else{
        res.json({'error': "Productos no encontrados"})
    }
})

routerProductos.post('/',(req, res) =>{
    const producto = req.body;
    console.log(req.body)
    producto.price = parseInt(producto.price)
    producto.id = addId()
    container.push(producto)
    res.send(`<h1> Producto guardado con id: ${producto.id} <h1>`)
})

routerProductos.get('/:id',  (req,res) =>{
    const id = parseInt(req.params.id);
    const product = container.find(product => product.id === id);

    if (product){
        res.json(product)
    }else{
        res.send({'error': "producto no encontrado"})
    }
})

routerProductos.put('/:id',  (req,res) =>{
    const id = parseInt(req.params.id);

    if (container[id]){
        container[id].title = req.body.title;
        container[id].price = req.body.price;
        container[id].thumbnail = req.body.thumbnail;
        res.json(container[id])
    }else{
        res.send({'error': "producto no encontrado"})
    }
    
})

routerProductos.delete('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    if (container[id]){
        container = container.filter(producto => producto.id != id)        
        res.send(`<h1> El producto ha sido eliminado con exito <h1> `)
    }else{
        res.send({'error': "producto no encontrado"})
    }
    
})

exports.routerProductos = routerProductos
