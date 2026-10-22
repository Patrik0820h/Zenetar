import express from 'express'
import routerEloado from './routes/eloadok.js'
import routerAlbum from './routes/albumok.js'
import routerMufajok from './routes/mufajok.js'
import routerStatisztika from './routes/statisztika.js'
import routerOrszag from './routes/orszagok.js'

const app = express();
const port = 3000
app.use(express.json());

app.use("/eloadok", routerEloado)
app.use("/albumok", routerAlbum)
app.use("/mufajok", routerMufajok)
app.use("/statisztika", routerStatisztika)
app.use("/orszagok", routerOrszag)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})