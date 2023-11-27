import express, { Request, Response } from "express";
import mysql, { Connection } from "mysql";
import { Funcionario } from "../modelos/funcionario";
import { connection } from "../app";
import bodyParser from "body-parser";
import { Login } from "../modelos/login";

const router = express.Router();

// Endpoint para agregar un nuevo funcionario
router.post("/funcionarios", (req: Request, res: Response) => {
  const nuevoFuncionario: Funcionario = req.body;
  console.log(req.body);
  console.log(nuevoFuncionario);
  try {
    // Insertar el nuevo funcionario en la base de datos
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


// Endpoint para obtener todos los funcionarios
router.get("/funcionarios", (req: Request, res: Response) => {
  try {
    // Ejecuta la consulta para obtener todos los funcionarios
    connection.query("SELECT * FROM Funcionarios", (err: Error, result: any) => {
      if (err) {
        console.error("Error al obtener funcionarios:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (result.length > 0) {
          console.log("Funcionarios obtenidos correctamente");
          res.status(200).json({ funcionarios: result });
        } else {
          res.status(404).json({ message: "No se encontraron funcionarios" });
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para actualizar un funcionario existente
router.put("/funcionarios/:ci", (req: Request, res: Response) => {
  const ciFuncionario: string = req.params.ci;
  const datosActualizados: Funcionario = req.body;
  try {
    connection.query(
      "UPDATE Funcionarios SET ? WHERE ci = ?",
      [datosActualizados, ciFuncionario],
      (err: Error, result: any) => {
        if (err) {
          console.error("Error al actualizar funcionario:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          if (result.affectedRows > 0) {
            console.log("Funcionario actualizado correctamente");
            res.status(200).json({ message: "Funcionario actualizado exitosamente" });
          } else {
            res.status(404).json({ error: "Funcionario no encontrado" });
          }
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para eliminar un funcionario existente
router.delete("/funcionarios/:ci", (req: Request, res: Response) => {
  const ciFuncionario: string = req.params.ci;
  try {
    // Ejecuta la consulta para eliminar el funcionario
    connection.query(
      "DELETE FROM Funcionarios WHERE ci = ?",
      [ciFuncionario],
      (err: Error, result: any) => {
        if (err) {
          console.error("Error al eliminar funcionario:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          // Verifica si se eliminó algún registro
          if (result.affectedRows > 0) {
            console.log("Funcionario eliminado correctamente");
            res.status(200).json({ message: "Funcionario eliminado exitosamente" });
          } else {
            // Si no se encontró el funcionario con el CI proporcionado
            res.status(404).json({ error: "Funcionario no encontrado" });
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

router.post("/logout", (req: Request, res: Response) => {
  res.status(200).json({ message: "Sesión cerrada exitosamente" });
});


// Endpoint para agregar una nueva entrada en la agenda
router.post("/agendas", (req: Request, res: Response) => {
  const nuevaEntrada: Agenda = req.body;
  console.log(req.body);
  console.log(nuevaEntrada);
  try {
    // Inserta la nueva entrada en la base de datos
    connection.query(
      "INSERT INTO Agendas SET ?",
      nuevaEntrada,
      (err: Error) => {
        if (err) {
          console.error("Error al insertar entrada en la agenda:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          console.log("Entrada en la agenda insertada correctamente");
          res.status(201).json({ message: "Entrada en la agenda creada exitosamente" });
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener todas las entradas de la agenda
router.get("/agendas", (req: Request, res: Response) => {
  try {
    connection.query("SELECT * FROM Agendas", (err: Error, result: any) => {
      if (err) {
        console.error("Error al obtener entradas de la agenda:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (result.length > 0) {
          console.log("Entradas de la agenda obtenidas correctamente");
          res.status(200).json({ agendas: result });
        } else {
          res.status(404).json({ message: "No se encontraron entradas en la agenda" });
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint para agregar un nuevo periodo
router.post("/periodos", (req: Request, res: Response) => {
  const nuevoPeriodo: Periodo = req.body;
  console.log(req.body);
  console.log(nuevoPeriodo);
  try {
    // Insertar el nuevo periodo en la base de datos
    connection.query(
      "INSERT INTO Periodos SET ?",
      nuevoPeriodo,
      (err: Error) => {
        if (err) {
          console.error("Error al insertar periodo:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          console.log("Periodo insertado correctamente");
          res.status(201).json({ message: "Periodo creado exitosamente" });
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener todos los periodos
router.get("/periodos", (req: Request, res: Response) => {
  try {
    connection.query("SELECT * FROM Periodos", (err: Error, result: any) => {
      if (err) {
        console.error("Error al obtener periodos:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (result.length > 0) {
          console.log("Periodos obtenidos correctamente");
          res.status(200).json({ periodos: result });
        } else {
          res.status(404).json({ message: "No se encontraron periodos" });
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint para agregar un nuevo carnet
router.post("/carnets", (req: Request, res: Response) => {
  const nuevoCarnet: Carnet = req.body;
  try {
    connection.query(
      "INSERT INTO Carnets SET ?",
      nuevoCarnet,
      (err: Error) => {
        if (err) {
          console.error("Error al insertar carnet:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          console.log("Carnet insertado correctamente");
          res.status(201).json({ message: "Carnet creado exitosamente" });
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint para obtener todos los carnets
router.get("/carnets", (req: Request, res: Response) => {
  try {
    connection.query("SELECT * FROM Carnets", (err: Error, result: any) => {
      if (err) {
        console.error("Error al obtener carnets:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (result.length > 0) {
          console.log("Carnets obtenidos correctamente");
          res.status(200).json({ carnets: result });
        } else {
          res.status(404).json({ message: "No se encontraron carnets" });
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
