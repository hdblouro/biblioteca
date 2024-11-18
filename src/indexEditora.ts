import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";
import EditoraModel from "./models/EditoraModel";

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

// Incluir Editoras

var editoras: Array<EditoraModel> = [];
var editora = new EditoraModel("Editora Atlas S/A", "45215118000175");
editoras.push(editora);
editora = new EditoraModel("Editora Abril S/A", "02183757000193");
editoras.push(editora);

var y = 0;

editoras.forEach(editora => {
    (async () => {
        editora.id = await fetch('http://localhost:3001/editora', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                razao: editora.razao,
                cnpj: editora.cnpj,
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                // console.log(data); // a rotina retorna o ID do objeto cadastrado
                editoras[y].id = data._id
                y++;
                return data._id;
            })
            .catch(error => {
                console.error(error); // mostra erro casso ocorra
            })
    })();
});
