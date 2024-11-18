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

// Incluir Livros

var livros: Array<LivroModel> = [];
var livro = new LivroModel("Dom Casmurro", 208, "45215118000175");
livros.push(livro);
var livro = new LivroModel("Memórias Póstumas de Bras Cubas", 192, "45215118000175");
livros.push(livro);
var livro = new LivroModel("O Alienista", 104, "45215118000175");
livros.push(livro);
var livro = new LivroModel("O Lustre", 104, "02183757000193");
livros.push(livro);
var livro = new LivroModel("Um Sopro de Vida", 159, "02183757000193");
livros.push(livro);
var livro = new LivroModel("Antologia Poética", 368, "02183757000193");
livros.push(livro);
var livro = new LivroModel("A Rosa do Povo", 238, "02183757000193");
livros.push(livro);

var w = 0;

livros.forEach(livro => {
    (async () => {
        var doc = await Editora.findOne({ cnpj: livro.editora }).exec(); // busca o grupo específico na coleção Grupo através do ID original
//        console.log(doc);
        if (doc != null) { // processa apenas caso tenha encontrado o documento
            livro.id = await fetch('http://localhost:3001/livro', {  // cria conexão HTTP com post para salvar o objeto no BD
                method: 'POST', // tipo de requisição
                headers: { // cabeçalho da requisição
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // corpo da requisição convertido para JSON
                    editora: doc._id,
                    titulo: livro.titulo,
                    paginas: livro.paginas
                })
            })
                .then(response => response.json()) // resposta do backend
                .then(data => {
                    // console.log(data); // a rotina retorna o ID do objeto cadastrado
                    livros[w].id = data._id
                    w++;
                    return data._id;
                })
                .catch(error => {
                    console.error(error); // mostra erro casso ocorra
                })
        }
    })();
});