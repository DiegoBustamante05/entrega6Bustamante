const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const Container = require('./container');
const container = new Container();
const ContainerChat = require('./containerChat');
const containerChat = new ContainerChat();



const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(PORT, () =>
  console.log("SERVER ON http://localhost:" + PORT)
);
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


io.on("connection", async (socket) => {
  console.log(`Usuario ${socket.id} conectado`)
  socket.emit("productList", await container.getAll())
  socket.on("product", async (data) => {
  await container.save(data);
  io.emit("productList", await contenedor.getAll());
  });

  socket.on("msg", async (data) => {
    await containerChat.save({ socketid: socket.id, ...data});
    console.log("se recibio un msg nuevo", "mensaje: ", data);
    io.emit("msgList", await containerChat.getAll());
  });
});


