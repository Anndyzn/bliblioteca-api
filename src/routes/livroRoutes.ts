import { Router } from "express"
import {
  criarLivro,
  listarLivros,
  buscarLivroPorIsbn,
  atualizarLivro,
  deletarLivro
} from "../controllers/livroController"

const router = Router()

router.post("/livros", criarLivro)
router.get("/livros", listarLivros)
router.get("/livros/:isbn", buscarLivroPorIsbn)
router.put("/livros/:isbn", atualizarLivro)
router.delete("/livros/:isbn", deletarLivro)

export default router