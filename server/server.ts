import express from 'express';
import {initTRPC} from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import cors from "cors";
import z from "zod";
const app = express();
const PORT = 5000;

app.use(cors());
// app.get("/", (req, res) => res.send("Hello World"));

interface Todo {
  id:string;
  title:string;
  description:string;
}


const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const todoList:Todo[] =[
  {
    id:"1",
    title:"title1",
    description:"description1"
  },
  {
    id:"2",
    title:"title2",
    description:"description2"
  }
]


const appRouter = router({
  test:publicProcedure.query(()=> {
    return "Hello World";
  }),
  getTodos:publicProcedure.query(()=> {
    return todoList;
  }),
  addTodo:publicProcedure.input(z.string()).mutation((req)=>{
    const id = `${Math.random()}`;
    const todo:Todo = {
      id,
      title:req.input,
      description:req.input
    }
    todoList.push(todo);
    return todoList;
  }),
  deleteTodo:publicProcedure.input(z.string()).mutation((req)=>{
    const idTodoDelete = req.input;
    const indexToDelete = todoList.findIndex((todo)=>todo.id === idTodoDelete);
    todoList.splice(indexToDelete,1);
    return todoList;
  })
});

app.use("/trpc", trpcExpress.createExpressMiddleware({router:appRouter}));

app.listen(PORT);

export type AppRouter = typeof appRouter;
