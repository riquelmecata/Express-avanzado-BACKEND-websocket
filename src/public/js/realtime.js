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
    <div class="card">
        <div class="imgBx">
          <img src="${product.thumbnail}" width="150" />
        </div>
        <div class="contentBx">
          <h2>Nombre: ${product.title}</h2>
            <h3>Descripción: ${product.description}</h3>
                <td>Código: ${product.code}</td>
                <td>Precio: ${product.price}</td>
                <td>Stock: ${product.stock}</td>
                <td>Categoría: ${product.category}</td>
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
    const deleteid = parseInt(deleteidinput.value);
    socket.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  });
socket.on("productosupdated", (obj) => {
  updateProductList(obj);
});