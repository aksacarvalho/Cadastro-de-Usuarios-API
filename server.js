import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/usuarios', async (req, res) => {
  const users = await prisma.user.findMany()

  res.status(200).json(users)
})

app.post('/usuarios', async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      age: req.body.age,
      name: req.body.name
    }
  })

  res.status(201).json(user)
})


app.put('/usuarios/:id', async (req, res) => {
  
   const user =  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  })

  res.status(200).json(user)
})

app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({ message: ' Usuário deletado com Sucesso!' })
})

app.listen(3005)


// req - requisição
// res - resposta
// http://localhost:3005

/*

ok - Criar
ok - Ler
ok - Deletar
ok - Editar

   
   Crud
   Create
   Read
   Update
   Delete
*/
