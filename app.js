const express = require('express');
const ProductManager = require('./Servidor.js');

const app = express();
const port = 7000;

const productManager = new ProductManager('./productos.json');

app.use(express.json());

// agregar un producto
app.post('/productos', (req, res) => {
    productManager.addProduct(req.body)
        .then(product => res.json(product))
        .catch(error => res.status(500).json({ error: error.message }));
});

// obtener todos los productos
app.get('/productos', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    productManager.getProducts(limit)
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ error: error.message }));
});

// ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
app.get('/productos/:id', (req, res) => {
    productManager.getProduct(parseInt(req.params.id))
        .then(product => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch(error => res.status(500).json({ error: error.message }));
});


// actualizar un producto por ID
app.patch('/productos/:id', (req, res) => {
    productManager.updateProduct(parseInt(req.params.id), req.body)
        .then(product => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch(error => res.status(500).json({ error: error.message }));
});

// eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
    productManager.deleteProduct(parseInt(req.params.id))
        .then(() => res.sendStatus(204))
        .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});
