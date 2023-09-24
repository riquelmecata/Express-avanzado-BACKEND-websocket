const socket =io()

socket.on("actualizacion",(obj)=>{
    console.log(obj)
})