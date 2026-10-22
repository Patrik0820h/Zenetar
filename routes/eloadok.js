import express from 'express'
import pool from '../db.js'

const router = express.Router();

router.get('/', async (req, res) => {

    let orszag = req.query.orszag
    if(orszag){
        let sql = ("SELECT * FROM eloadok WHERE orszag = ?")
        
        let [rows] = await pool.query(sql, [orszag])
        
        return res.json(rows)
    }
    if (!orszag){
        let sql = "SELECT * FROM eloadok ORDER BY nev ASC"

        let [rows] = await pool.query(sql)
        return res.json(rows)
    }
})

router.get('/:id', async (req,res) => {
    let id = req.params.id
    let sql = "SELECT * FROM eloadok WHERE id = ?"
    let sql2 = "SELECT * FROM albumok WHERE eloado_id = ? ORDER BY ev ASC"

    if  (eloado.length == 0) {
        return res.status(404).send("Nincs ilyen előadó.")
    }
    if (eloado.length > 1 || Number.isInteger(id)) {
        return res.status(400).send("Hibás adat.")
    }
    
    let [eloado] = await pool.query(sql, [id])
    let [albumok] = await pool.query(sql2, [id])

    const json = {...eloado[0], albumok}

    return res.json(json)
})

export default router;