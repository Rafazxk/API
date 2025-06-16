import express from 'express'
import cors from 'cors'
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())
app.use(cors())

//POST
app.post('/usuarios', async (req, res)=>{
  
   await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })
    

   res.status(201).json(req.body)
})

//GET
app.get('/usuarios', async (req, res)=>{
  
    const users = await prisma.user.findMany()

  res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res)=>{
   await prisma.user.update({
       where: {
           id: req.params.id
       }, 
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })  

   res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res)=>{
   await prisma.user.delete({
    where: {
        id: req.params.id

    }
   })
   res.status(200).json({message: "usuario deletado"})
})

app.listen(3000, ()=>{console.log('funcionou')
  
});

// body params


//npm install @prisma/client
//npx prisma studio --> abre uma interface grafica do banco de dados
//senha: 0TB5aRr4mMoSAXS9