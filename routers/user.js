import mysql from "mysql2";
import dotenv from "dotenv";
import { Router } from "express";
dotenv.config();
const appUser = Router();
const con = mysql.createPool(JSON.parse(process.env.MY_DB));
/**
 * Buscar datos
 * @var {/:id}
 * * Parametro opcional si no lo envias por defecto buscara todos los datos
 */
appUser.get('/:id?', async (req, res) => {
    let sql = (req.params.id)
        ? [`SELECT * FROM tb_information WHERE ?`, req.params]
        : [`SELECT * FROM tb_information`];
    con.query(...sql,
        (err, data, fill) => {
            res.send(data);
        }
    );
})
/**
 * Insertar datos
 * @var {req.body}
 * * {
 * *    "id": 1,
 * *    "nom_com": "Camper",
 * *    "edad": 2023
 * * }
 */
appUser.post("/", async (req, res) => {
    con.query(
        /*sql */`INSERT INTO tb_information SET ?`,
        req.body,
        (err, data, fill) => {
            res.send(data);
        }
    )
})
/**
 * Actualizar datos
 * @var {req.body}
 * * {
 * *    "nom_com": "CAMPER",
 * *    "edad": 2023
 * * }
 * @var {req.params}
 * * {
 * *    "id": 1 
 * * }
 */
appUser.put("/:id", async (req, res) => {
    con.query(
        /*sql */`UPDATE tb_information SET ? WHERE id = ?`,
        [req.body, req.params.id],
        (err, data, fill) => {
            res.send(data);
        }
    )
})
/**
 * Eliminar datos
 * @var {req.params}
 * * {
 * *    "id": 1
 * * }
 */
appUser.delete("/:id", async (req, res) => {
    con.query(
        /*sql */`DELETE FROM tb_information WHERE ?`,
        req.params,
        (err, data, fill) => {
            res.send(data);
        }
    )
})
export default appUser;