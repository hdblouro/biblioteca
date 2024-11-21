import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";
import AutorModel from "./models/AutorModel";
import EditoraModel from "./models/EditoraModel";
import LivroModel from "./models/LivroModel";
import { Autor, Editora, Livro, AutorLivro } from "./models";

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
    var docs = await AutorLivro.find().exec(); // busca os autores/livros coleção AutorLivro através do nome
    if (docs != null) {
        console.log("<< Livros Cadastrados >>");
        docs.forEach(async doc => {
            var autor = await Autor.findById(doc.autor);
            var livro = await Livro.findById(doc.livro);
            if (autor != null && livro != null) {
                var editora = await Editora.findById(livro.editora);
                if (editora != null) {
                    console.log("Livro:", livro.titulo, "- Autor: ", autor.nome, "- Páginas:", livro.paginas, "- Editora:", editora.razao)
                }
            }
        })
    }
})();