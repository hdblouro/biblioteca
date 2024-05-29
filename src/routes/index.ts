import { Router, Request, Response } from "express";
import livro from './livro';
import autor from './autor';
import editora from './editora';
import autorlivro from './autorlivro';

const routes = Router();

routes.use("/livro", livro);
routes.use("/autor", autor);
routes.use("/editora", livro);
routes.use("/autorlivro", autor);

//aceita qualquer método HTTP ou URL
routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;