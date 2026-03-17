import express from "express"
import livroRoutes from "./routes/livroRoutes"
import { pool } from "./database/connection"

const app = express()

app.use(express.json())
app.use(livroRoutes)

const PORT = 3000

pool.connect()
  .then(() => {
    console.log("Banco conectado com sucesso")

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
  })
  .catch(err => console.log("Erro ao conectar:", err))