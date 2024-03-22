import fs from "fs"
import crypto from "crypto"

export default class ProductManagerFs {
    constructor() {
        this.products = []
        this.path = "./src/products.json"
        this.init()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            fs.writeFileSync(this.path, JSON.stringify([]))
            console.log("El archivo fue creado")
        } else {
            console.log("El archivo ya existe")
        }
        this.products = fs.readFileSync(this.path, "utf-8") 
        this.products = JSON.parse(this.products)
    }
    addProduct(data) {
        if (!data.title || !data.price || !data.photo || !data.category || !data.stock) {
            throw Error("Falta completar algunos campos");
        }
        const product = {
            id: crypto.randomBytes(12).toString("hex"),
            title: data.title,
            price: data.price,
            photo: data.photo,
            category: data.category,
            stock: data.stock,
        };
        this.products.push(product)
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
    }
    getProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit)
        } else {
            return this.products
        }
    }
    getProductsById(id) {
        const product = this.products.find(product => {
            return product.id === id
        })
        if (!product) {
            throw Error("ID not found")
        } else {
            return product
        }
    }
    removeProductsById(id) {
        try {
            const deleteProduct = this.getProductsById(id)
            const products = this.products.filter(product => {
                return product.id !== deleteProduct.id
            })
            this.products = products
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
            return deleteProduct
        } catch (error) {
            throw Error("Failed to remove product: " + error.message)
        }
    }
}