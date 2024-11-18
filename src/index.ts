import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";
import AutorModel from "./models/AutorModel";
import EditoraModel from "./models/EditoraModel";
import LivroModel from "./models/LivroModel";
import { Autor, Editora, Livro } from "./models";

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

fetch('http://localhost:3001/autor', {  // cria conexão HTTP com post para salvar o objeto no BD
    method: 'GET', // tipo de requisição
    headers: { // cabeçalho da requisição
        'Content-Type': 'application/json'
    },
}).then(response => response.json()) // resposta do backend
    .then(data => {
        console.log(data); // a rotina retorna o ID do objeto cadastrado
    })
    .catch(error => {
        console.error(error); // mostra erro casso ocorra
    })

fetch('http://localhost:3001/editora', {  // cria conexão HTTP com post para salvar o objeto no BD
    method: 'GET', // tipo de requisição
    headers: { // cabeçalho da requisição
        'Content-Type': 'application/json'
    },
}).then(response => response.json()) // resposta do backend
    .then(data => {
        console.log(data); // a rotina retorna o ID do objeto cadastrado
    })
    .catch(error => {
        console.error(error); // mostra erro casso ocorra
    })

fetch('http://localhost:3001/livro', {  // cria conexão HTTP com post para salvar o objeto no BD
    method: 'GET', // tipo de requisição
    headers: { // cabeçalho da requisição
        'Content-Type': 'application/json'
    },
}).then(response => response.json()) // resposta do backend
    .then(data => {
        console.log(data); // a rotina retorna o ID do objeto cadastrado
    })
    .catch(error => {
        console.error(error); // mostra erro casso ocorra
    })