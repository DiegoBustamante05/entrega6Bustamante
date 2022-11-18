const socket = io();
const today = new Date();
const fyh = today.toLocaleString();

function sendProduct() {
  const nombre = document.getElementById("title").value;
  const precio = document.getElementById("price").value;
  const foto = document.getElementById("thumbnail").value;
  socket.emit("product", { title: nombre, price: precio, thumbnail: foto });
};



socket.on("productList", (data) => {
  let productos = "";
  data.forEach(element => {
      productos += `
      <div class="container">
          <table class="table table-dark text-center">
            <thead>
              <tr>
                <th class="col-3">Id</th>
                <th class="col-3">Title</th>
                <th class="col-3">Price</th>
                <th class="col-3">Img</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${element.id}</th>
                <td>${element.title}</td>
                <td>${element.price}</td>
                <td><img src="${element.thumbnail}" class="product-img" alt=""></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
  })
  document.getElementById("div-list-products").innerHTML = productos
});

function enviarMsg() {
  const msgParaEnvio = document.getElementById("input-msg").value;
  const email = document.getElementById("input-email").value;
  socket.emit("msg", { email: email, fyh: fyh , mensaje: msgParaEnvio });
}

socket.on("msgList", (data) => {
  let html = "";
  data.forEach(element => {
      html += `
          <div class="d-flex flex-direction-row justify-content-around">
              <div class="textoAzul">${element.email}</div> <div class="textoMarron">${fyh}</div> <div class="textoVerde">dijo: ${element.mensaje}</div>  
          </div>
      `
  });
  document.getElementById("div-list-msgs").innerHTML = html;
});