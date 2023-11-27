import express from "express";
import router from "./api/info";
import bodyParser from "body-parser";

const app = express();
var corsOptions = {
  origin: ["http://localhost:3306", "http://127.0.0.1:3306"],
};
const cors = require("cors");
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

app.listen("3307", function () {
  console.log("backend funciona");
});

const mysql = require("mysql");
export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Contraseña123",
  database: "my_db",
  port: 3306,
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", (err: Error) => {
  if (err) throw err;

  console.log("Base de datos conectada en puerto ", connection.config.port);
});

//connection.end();
