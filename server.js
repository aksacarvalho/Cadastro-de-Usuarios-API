import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

const prisma = new PrismaClient();

const app = express()
app.use(express.json())
app.use(cors())

const users = []


app.get('/usuarios', async (request, response) => {
  const users = await prisma.user.findMany();

  response.status(200).json(users);
});

app.post('/usuarios', async (request, response) => {
  const user = await prisma.user.create({
    data: {
      name: request.body.name,
      email: request.body.email,
      age: request.body.age,
    },
  });
  response.status(201).json(user);
});

app.put('/usuarios/:id', async (request, response) => {
  const user = await prisma.user.update({
    where: {
      id: request.params.id,
    },
    data: {
      name: request.body.name,
      email: request.body.email,
      age: request.body.age,
    },
  });

  response.status(200).json(user);
});


app.delete('/usuarios/:id', async (request, response) => {
  const user = await prisma.user.delete({
    where: {
      id: request.params.id,
    },
  });
  response.status(200).json(user);
});

app.listen(3005);
// req - requisição
// res - resposta
// http://localhost:3005

/*

ok - Criar
ok - Ler
- Deletar
ok - Editar

   
   Crud
   Create
   Read
   Update
   Delete
*/
