import express from 'express'
import pool from '../db.js'

const router = express.Router();

router.get('/eloadok', async (req,res) => {
    // Az sql parancs fele Ai, nem tudtam mindent.

    let sql = "SELECT e.nev AS Eloado, COUNT(a.id) AS AlbumDB, MIN(a.ev) AS Elso, MAX(a.ev) AS Utolso FROM eloadok e LEFT JOIN albumok a ON e.id = a.eloado_id GROUP BY e.id, e.nev ORDER BY albumDb DESC, e.nev ASC;";
    let [rows] = await pool.query(sql)
    return res.json(rows)
})

export default router;