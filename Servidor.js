
const fs = require('fs').promises;


class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            const newProduct = { id: products.length + 1, ...product };
            products.push(newProduct);
            await this.writeProductsToFile(products);
            return newProduct;
        } catch (error) {
            console.error(`Error al agregar producto: ${error.message}`);
            throw error;
        }
    }

    async getProducts(limit) {
        try {
            const data = await fs.readFile(this.filePath);
            const productos = JSON.parse(data.toString())
            return limit ? productos.slice(0, limit) : productos;
        } catch (error) {
            console.error(`Error al obtener productos: ${error.message}`);
            throw error;
        }
    }
    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.products.find((product) => product.id === id);
        } catch (error) {
            console.error(`Error al obtener producto por ID: ${error.message}`);
            throw error;
        }
    }


    async updateProduct(id, fieldsToUpdate) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex === -1) {
                throw new Error('Product not found');
            }
            const updatedProduct = { ...products[productIndex], ...fieldsToUpdate };
            products[productIndex] = updatedProduct;
            await this.writeProductsToFile(products);
            return updatedProduct;
        } catch (error) {
            console.error(`Error al actualizar producto: ${error.message}`);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const filteredProducts = products.filter(product => product.id !== id);
            await this.writeProductsToFile(filteredProducts);
        } catch (error) {
            console.error(`Error al eliminar producto: ${error.message}`);
            throw error;
        }
    }

    async writeProductsToFile(products) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(products));
            console.log(`Los productos se han guardado en ${this.filePath}`);
        } catch (error) {
            console.error(`Error al guardar productos: ${error.message}`);
            throw error;
        }
    }
}






const productManager = new ProductManager('./productos.json');
// agregar un archivo json
// agregar un producto
/*
    {
        "id": 1,
        "name": "John Doe",
        "email": ""
    },
*/
//productManager.addProduct({ name: 'John Doe', email: ''
//}).then(product => console.log(product));

productManager.getProducts().then(products => console.log(products));

//exportar productmanager
module.exports = ProductManager;

