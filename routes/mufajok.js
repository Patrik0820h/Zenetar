import express from 'express'
import pool from '../db.js'

const router = express.Router();

router.get('/', async (req,res) => {
    let sql = "SELECT mufaj, COUNT(mufaj) AS AlbumDB, SUM(hossz) AS ÖsszHossz FROM albumok GROUP BY mufaj"
    let [rows] = await pool.query(sql)
    return res.json(rows)
})

export default router;