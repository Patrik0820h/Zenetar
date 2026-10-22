import express from 'express'
import pool from '../db.js'

const router = express.Router();

router.get('/', async (req, res) => {
    const { mufaj, tol, ig } = req.query;

    let sql = 'SELECT * FROM albumok';
    const feltetelek = [];
    const parameterek = [];

    if (mufaj) {
        feltetelek.push('mufaj = ?');
        parameterek.push(mufaj);
    }

    if (tol !== undefined) {
        feltetelek.push('ev >= ?');
        parameterek.push(Number(tol));
    }

    if (ig !== undefined) {
        feltetelek.push('ev <= ?');
        parameterek.push(Number(ig));
    }

    if (feltetelek.length > 0) {
        sql += ' WHERE ' + feltetelek.join(' AND ');
    }

    sql += ' ORDER BY ev ASC, cim ASC';

    const [rows] = await pool.query(sql, parameterek);

    return res.json(rows);
});

router.get('/kereses', async (req,res) => {
    let q = req.query.q

    if (q.length < 2) {
        return res.status(400).send("Legalább 2 karakter hosszú keresést használj.")
    }

    let nev = "SELECT * FROM eloadok WHERE nev LIKE ?"
    let cim = "SELECT * FROM albumok WHERE cim LIKE ?"

    let [nevek] = await pool.query(nev, [`%${q}%`])
    let [cimek] = await pool.query(cim, [`%${q}%`])

    if (nevek.length == 0) {
        return res.json(cimek)
    }
    if (cimek.length == 0) {
        return res.json(nevek)
    }

    const lista = {nevek, cimek}

    return res.json(lista)
})

export default router;