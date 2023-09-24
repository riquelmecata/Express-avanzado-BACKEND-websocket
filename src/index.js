import express from "express"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"

import ViewRouter from "./routes/view.routes.js"
import ProductRouter from "./routes/product.routes.js"
import CartRouter from "./routes/carts.routes.js"

import ProductManager from "./controllers/ProductManager.js"

const app =express()
const PORT=8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
//handlebars
app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars")

//rutas
app.use("/api",ProductRouter)
app.use("/api",CartRouter)
app.use("/",ViewRouter)


const httpServer=app.listen(PORT,()=>{
    console.log("server up ")
})

const pmanager=new ProductManager(__dirname+"/database/products.json")
 const socketServer = new  Server(httpServer)

socketServer.on("connection",async (socket)=>{
    console.log("cliente conectado con id:" ,socket.id)
    const products = await pmanager.getProducts({});
    socket.emit('productos', products);

    socket.on('addProduct', async data => {
        await pmanager.addProduct(data);
        const updatedProducts = await pmanager.getProducts({}); // Obtener la lista actualizada de productos
    socket.emit('productosupdated', updatedProducts);
      });

      socket.on("deleteProduct", async (id) => {
        console.log("ID del producto a eliminar:", id);
        const deletedProduct = await pmanager.deleteProduct(id);
        const updatedProducts = await pmanager.getProducts({});
        socketServer.emit("productosupdated", updatedProducts);
      });
     

     

})