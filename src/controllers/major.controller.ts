import { Request, Response } from "express"
import {getMajors, createMajor, getMajor, removeMajor, updateMajor} from "../services/major"

const index = async (req: Request, res:Response) => {
  try {
 const majors = await getMajors()
 res.render('major/index', {
   majors,
   mensagem: 'Bem-vindo ao sistema de gerenciamento de cursos',
 })
}catch (error) {
  console.error("Erro ao buscar os cursos:", error);
  res.status(500).send("Erro ao buscar os cursos");
  }
}

const create = async (req: Request, res:Response) => {
  if(req.method === 'GET')
    res.render('major/create')
  else if(req.method === 'POST'){
    try {
    const major = req.body
    console.log(major)
    await createMajor(major) 
    res.redirect("/majors/")
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}

const read = async (req: Request, res:Response) => {
  const {id} = req.params //eu to indicando que req.params eh um objeto e o que eu quero pegar eh o id 
  try {
   const major = await getMajor(id) 
   res.render('major/read',{
     major,
   });
  } catch (error) {
   console.log(error) 
  }
}

const update = async (req: Request, res:Response) => {
  const { id } = req.params
  if(req.method === 'GET') {
    try {
      const major = await getMajor(id)
      res.render('major/update', {
        major
      })
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  } else if(req.method === 'POST') {
    try {
      const major = req.body
      await updateMajor(id, major)
      res.redirect('/majors/')
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}
const remove = async (req: Request, res:Response) => {
  const {id} = req.params
  try {
    const major = await removeMajor(id)
    res.status(200).send(major)
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}

export default {index,create,read,update,remove}
