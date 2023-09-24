const socket = io();

socket.on("productos", (products) => {
  console.log(products);
  updateProductList(products);
});

// Función para actualizar la lista de productos en la página web
function updateProductList(products) {
  let div = document.getElementById("list-products");
  let productos = "";

  products.forEach((product) => {
    productos += `
    <article class="container">
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4 imgBx">
                <img src="${product.thumbnail}" class="img-fluid rounded-start"/>
            </div>
            <div class="col-md-8">
                <div class="card-body contentBx">
                    <h5 class="card-title">${product.title}</h5>
                    <h4 class="card-title">$${product.price}</h4>                    
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><small class="text-body-secondary">Código: ${product.code}
                    Stock: ${product.stock}
                    Categoría: ${product.category}</small></p>
                </div>
            </div>
        </div>
    </div>
</article>
        `;
  });



  div.innerHTML = productos;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let stock = form.elements.stock.value;
  let thumbnail = form.elements.thumbnail.value;
  let category = form.elements.category.value;
  let price = form.elements.price.value;
  let code = form.elements.code.value;

  socket.emit("addProduct", {
    title,
    description,
    stock,
    thumbnail,
    category,
    price,
    code,
  });

  form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
  const deleteidinput = document.getElementById("id-prod");
  const deleteid = deleteidinput.value; 
  socket.emit("deleteProduct", deleteid);
  deleteidinput.value = "";
});
socket.on("productosupdated", (obj) => {
  updateProductList(obj);
});