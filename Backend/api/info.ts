import express, { Request, Response } from "express";
import mysql, { Connection } from "mysql";
import { Funcionario } from "../modelos/funcionario";
import { connection } from "../app";
import bodyParser from "body-parser";
import { Login } from "../modelos/login";

const router = express.Router();

// Endpoint para agregar un nuevo funcionario
router.post("/funcionarios", (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.body.usuario);
  console.log(req.body.login);
  console.log("checkpoint 5");
  const nuevoFuncionario: Funcionario = req.body.usuario;
  const nuevoLogin: Login = req.body.login;
  try {
    // Insertar el nuevo funcionario en la base de datos
    connection.query("INSERT INTO Logins SET ?", nuevoLogin, (err: Error) => {
      if (err) {
        console.error("Error al insertar login:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        console.log("login insertado correctamente");
      }
    });
    connection.query(
      "INSERT INTO Funcionarios SET ?",
      nuevoFuncionario,
      (err: Error) => {
        if (err) {
          console.error("Error al insertar funcionario:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          console.log("Funcionario insertado correctamente");
          res.status(201).json({ message: "Funcionario creado exitosamente" });
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/funcionarios", (req: Request, res: Response) => {
  const funcionarioIdToDelete: number = req.body.LogId;

  try {
    if (!funcionarioIdToDelete) {
      // Si el LogId no se proporciona en el cuerpo de la solicitud
      res
        .status(400)
        .json({ error: "LogId no proporcionado en el cuerpo de la solicitud" });
      return;
    }

    // Ejecuta la consulta para eliminar el login
    connection.query(
      "DELETE FROM Funcionarios WHERE LogId = ?",
      [funcionarioIdToDelete],
      (err: Error, result: any) => {
        if (err) {
          console.error("Error al eliminar funcionario:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          // Verifica si se eliminó algún registro
          if (result.affectedRows > 0) {
            console.log("funcionario eliminado correctamente");
            res
              .status(200)
              .json({ message: "funcionario eliminado exitosamente" });
          } else {
            // Si no se encontró el login con el LogId proporcionado
            res.status(404).json({ error: "funcionario no encontrado" });
          }
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/funcionarios", (req: Request, res: Response) => {
  try {
    // Ejecuta la consulta para obtener todos los funcionarios
    connection.query(
      "SELECT * FROM Funcionarios",
      (err: Error, result: any) => {
        if (err) {
          console.error("Error al obtener funcionarios:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          // Verifica si se obtuvieron resultados
          if (result.length > 0) {
            console.log("Funcionarios obtenidos correctamente");
            // Devuelve un objeto JSON que contiene el array de logins
            res.status(200).json({ logins: result });
          } else {
            // Si no se encontraron logins en la tabla
            res.status(404).json({ message: "No se encontraron funcionarios" });
          }
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/logins", (req: Request, res: Response) => {
  const nuevoLogin: Login = req.body;
  console.log(req.body);
  console.log(nuevoLogin);
  try {
    // Insertar el nuevo login en la base de datos
    connection.query("INSERT INTO Logins SET ?", nuevoLogin, (err: Error) => {
      if (err) {
        console.error("Error al insertar login:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        console.log("login insertado correctamente");
        res.status(201).json({ message: "Login creado exitosamente" });
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/logins", (req: Request, res: Response) => {
  const loginIdToDelete: number = req.body.LogId;

  try {
    if (!loginIdToDelete) {
      // Si el LogId no se proporciona en el cuerpo de la solicitud
      res
        .status(400)
        .json({ error: "LogId no proporcionado en el cuerpo de la solicitud" });
      return;
    }

    // Ejecuta la consulta para eliminar el login
    connection.query(
      "DELETE FROM Logins WHERE LogId = ?",
      [loginIdToDelete],
      (err: Error, result: any) => {
        if (err) {
          console.error("Error al eliminar login:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          // Verifica si se eliminó algún registro
          if (result.affectedRows > 0) {
            console.log("Login eliminado correctamente");
            res.status(200).json({ message: "Login eliminado exitosamente" });
          } else {
            // Si no se encontró el login con el LogId proporcionado
            res.status(404).json({ error: "Login no encontrado" });
          }
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/logins", (req: Request, res: Response) => {
  try {
    // Ejecuta la consulta para obtener todos los logins
    connection.query("SELECT * FROM Logins", (err: Error, result: any) => {
      if (err) {
        console.error("Error al obtener logins:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
          console.log("Logins obtenidos correctamente");
          // Devuelve un objeto JSON que contiene el array de logins
          res.status(200).json({ logins: result });
        } else {
          // Si no se encontraron logins en la tabla
          res.status(404).json({ message: "No se encontraron logins" });
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/f", (req, res) => {
  res.send("todo bien");
});

export default router;
