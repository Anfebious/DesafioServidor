import express from "express";
import ProductManagerFs from "./ProductsManager.fs.js";

const app = express() 

const productManager = new ProductManagerFs()

app.use(express.urlencoded({extended:true}))

app.listen(8080, ()=> {
    console.log("El servidor esta escuchando el puerto 8080")
})

app.get("/products", (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null
    const products = productManager.getProducts(limit);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(products))
})

app.get("/products/:pid", (req, res) => {
    const products = productManager.getProductsById(req.params.pid);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(products))
})