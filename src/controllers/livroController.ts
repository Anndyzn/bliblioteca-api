import { pool } from "../database/connection"
import { Request, Response } from "express"


export async function criarLivro(req: Request, res: Response) {
  const { titulo, autor, isbn, ano } = req.body

  try {
    const result = await pool.query(
      `INSERT INTO livros (titulo, autor, isbn, ano)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [titulo, autor, isbn, ano]
    )

    return res.status(201).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar livro" })
  }
}

export async function listarLivros(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM livros")
    return res.json(result.rows)
  } catch {
    return res.status(500).json({ erro: "Erro ao buscar livros" })
  }
}

export async function buscarLivroPorIsbn(req: Request, res: Response) {
  const { isbn } = req.params

  try {
    const result = await pool.query(
      "SELECT * FROM livros WHERE isbn = $1",
      [isbn]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: "Livro não encontrado" })
    }

    return res.json(result.rows[0])
  } catch {
    return res.status(500).json({ erro: "Erro ao buscar livro" })
  }
}

export async function atualizarLivro(req: Request, res: Response) {
  const { isbn } = req.params
  const { titulo, autor, ano } = req.body

  try {
    const result = await pool.query(
      `UPDATE livros 
       SET titulo = $1, autor = $2, ano = $3
       WHERE isbn = $4
       RETURNING *`,
      [titulo, autor, ano, isbn]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: "Livro não encontrado" })
    }

    return res.json(result.rows[0])
  } catch {
    return res.status(500).json({ erro: "Erro ao atualizar livro" })
  }
}

export async function deletarLivro(req: Request, res: Response) {
  const { isbn } = req.params

  try {
    const result = await pool.query(
      "DELETE FROM livros WHERE isbn = $1 RETURNING *",
      [isbn]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: "Livro não encontrado" })
    }

    return res.json({ mensagem: "Livro removido com sucesso" })
  } catch {
    return res.status(500).json({ erro: "Erro ao deletar livro" })
  }
}