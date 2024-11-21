import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";
import AutorLivroModel from "./models/AutorLivroModel";
import { Autor, Livro, AutorLivro } from "./models";

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

var autoreslivros: Array<AutorLivroModel> = [];
var autorlivro = new AutorLivroModel("Machado de Assis", "Dom Casmurro");
autoreslivros.push(autorlivro);
var autorlivro = new AutorLivroModel("Machado de Assis", "Memórias Póstumas de Bras Cubas");
autoreslivros.push(autorlivro);
var autorlivro = new AutorLivroModel("Machado de Assis", "O Alienista");
autoreslivros.push(autorlivro);
var autorlivro = new AutorLivroModel("Carlos Drumond de Andrade", "Antologia Poética");
autoreslivros.push(autorlivro);
var autorlivro = new AutorLivroModel("Carlos Drumond de Andrade", "A Rosa do Povo");
autoreslivros.push(autorlivro);
var autorlivro = new AutorLivroModel("Clarice Lispector", "O Lustre");
autoreslivros.push(autorlivro);
var autorlivro = new AutorLivroModel("Clarice Lispector", "Um Sopro de Vida");
autoreslivros.push(autorlivro);

var w = 0;

autoreslivros.forEach(autorlivro => {
    (async () => {
        var doc = await Autor.findOne({ nome: autorlivro.autor }).exec(); // busca o autor específico na coleção Autores através do nome
        var doc1 = await Livro.findOne({ titulo: autorlivro.livro }).exec(); // busca o livro específico na coleção Livros através do título
        if (doc != null && doc1 != null) { // processa apenas caso tenha encontrado os dois documentos
            autorlivro.id = await fetch('http://localhost:3001/autorlivro', {  // cria conexão HTTP com post para salvar o objeto no BD
                method: 'POST', // tipo de requisição
                headers: { // cabeçalho da requisição
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // corpo da requisição convertido para JSON
                    autor: doc._id,
                    livro: doc1._id
                })
            })
                .then(response => response.json()) // resposta do backend
                .then(data => {
                    // console.log(data); // a rotina retorna o ID do objeto cadastrado
                    autoreslivros[w].id = data._id
                    w++;
                    return data._id;
                })
                .catch(error => {
                    console.error(error); // mostra erro casso ocorra
                })
        }
    })();
});
