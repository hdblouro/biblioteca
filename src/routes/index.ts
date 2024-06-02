import { Router, Request, Response } from "express";
import autor from './Autor';
import editora from './Editora';
import livro from './Livro';
import autorlivro from './AutorLivro';

const routes = Router();
routes.use("/autor", autor);
routes.use("/editora", editora);
routes.use("/livro", livro);
routes.use("/autorlivro", autorlivro);

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;