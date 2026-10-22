import express from 'express'
import pool from '../db.js'

const router = express.Router();

router.get('/', async (req,res) => {
    let sql = "SELECT e.orszag, COUNT(DISTINCT e.id) AS EloadoDB, COUNT(a.id) AS AlbumDB FROM eloadok e LEFT JOIN albumok a ON e.id = a.eloado_id GROUP BY e.orszag;"
    let [rows] = await pool.query(sql)
    return res.json(rows)
})

export default router;