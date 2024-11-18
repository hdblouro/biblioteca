import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";
import AutorLivroModel from "./models/AutorLivroModel";
import { Autor, Livro } from "./models";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// conecta ao MongoDB no início da aplicação
connect();

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

// define a rota para o pacote /routes
app.use(routes);
(async () => {
    var doc = await Livro.find(); // busca todos os livros cadastrados específico na coleção Grupo através do ID original
    doc.forEach(livro => {
        console.log(livro.titulo);
    });
})();

