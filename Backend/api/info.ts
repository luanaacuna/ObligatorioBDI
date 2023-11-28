import express, { Request, Response } from "express";
import mysql, { Connection } from "mysql";
import { Funcionario } from "../modelos/funcionario";
import { connection } from "../app";
import bodyParser, { text } from "body-parser";
import { Login } from "../modelos/login";

const router = express.Router();

const toDate = (dateStr: string) => {
  console.log(dateStr)
  const [day, month, year] = dateStr.split("-")
  return new Date(parseInt(year), (parseInt(month) - 1), parseInt(day))
}

// Endpoint para agregar un nuevo funcionario
router.post("/funcionarios", (req: Request, res: Response) => {
  //console.log(req.body);
  //console.log(req.body.datosUsuario);
  //console.log(req.body.datosLogin);
  console.log("checkpoint 5");
  const nuevoFuncionario: Funcionario = req.body.datosUsuario;
  const nuevoLogin: Login = req.body.datosLogin;
  console.log("el body: ", req.body)
  console.log("datos de nuevoFuncionario funcionario: ", nuevoFuncionario.logId)
  console.log("logId de nuevoFuncionario funcionario", nuevoFuncionario.logId)
  console.log("datos de nuevoLogin: ", nuevoLogin)
  console.log("Y ESTO ES: ", nuevoLogin);
  try {
    // Insertar el nuevo funcionario en la base de datos
    connection.query("INSERT INTO logins (LogId, Password) VALUES (?,?)", [nuevoLogin.logId, nuevoLogin.password], (err: Error) => {
      console.log(err)
      if (err) {
        console.error("Error al insertar login:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        console.log("login insertado correctamente");
        console.log(nuevoFuncionario)
        const birthdate = toDate(nuevoFuncionario.fecha_nac)
        connection.query(
          "INSERT INTO funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Direccion, Telefono, Email, LogId) VALUES (?,?,?,?,?,?,?,?)", [nuevoFuncionario.ci, nuevoFuncionario.nombre, nuevoFuncionario.apellido, birthdate, nuevoFuncionario.direccion, nuevoFuncionario.telefono, nuevoFuncionario.email, nuevoFuncionario.logId],
          (err: Error) => {
            console.log(err)
            if (err) {
              console.error("Error al insertar funcionario:", err);
              res.status(500).json({ error: "Error interno del servidor" });
            } else {
              console.log("Funcionario insertado correctamente");
              res.status(201).json({ message: "Funcionario creado exitosamente" });
            }
          }
        );
      }
    });
    //const birthdate = new Date(nuevoFuncionario.fch_nacimiento)
    //console.log(birthdate)
    
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
      "DELETE FROM funcionarios WHERE LogId = ?",
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
      "SELECT * FROM funcionarios",
      (err: Error, result: any) => {
        if (err) {
          console.error("Error al obtener funcionarios:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          // Verifica si se obtuvieron resultados
          if (result.length > 0) {
            console.log("Funcionarios obtenidos correctamente");
            // Devuelve un objeto JSON que contiene el array de logins
            res.status(200).json({ funcionarios: result });
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
    connection.query("INSERT INTO logins SET ?", nuevoLogin, (err: Error) => {
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
      "DELETE FROM logins WHERE LogId = ?",
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
    connection.query("SELECT * FROM logins", (err: Error, result: any) => {
      if (err) {
        console.error("Error al obtener logins:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
          console.log("logins obtenidos correctamente");
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
