import mongoose from "mongoose";
const { Schema } = mongoose;

const AutorSchema = new Schema({
    nome: { type: String, maxlength: [50, "O nome pode ter no máximo 50 caracteres"], required: true },
    cpf: { type: String, maxlenght: 11, minLenght: 11, required: true, unique: true },
    data_nasc: { type: Date },
    email: {
        type: String,
        maxlength: [60, "O e-mail pode ter no máximo 60 caracteres"],
        unique: true,
        required: [true, "O e-mail é obrigatório"],
        validate: {
            validator: function (value: string) {
                // expressão regular para validar o formato do e-mail
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: (props: any) =>
                `${props.value} não é um formato de e-mail válido`,
        },
    },
}, { timestamps: true },
);

const EditoraSchema = new Schema({
    razao: { type: String, maxlength: 50, required: true },
    cnpj: { type: String, minlength: 14, maxlength: 14 }
});

const LivroSchema = new Schema({
    editora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Editora',
        required: true,
        validate: {
            validator: async function (id: string) {
                const editora = await Editora.findById(id); // verifica se id existe na coleção editoras
                return !!editora; // true se a editora existir
            },
            message: 'A Editora fornecida não existe!',
        }
    },
    titulo: { type: String, maxlength: 100, required: true },
    paginas: { type: Number, required: true }
});

const AutorLivroSchema = new Schema({
    livro: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Livro', required: true,
        validate: {
            validator: async function (id: string) {
                const livro = await Livro.findById(id); // verifica se id existe na coleção livros
                return !!livro; // true se o livro existir
            },
            message: 'O Livro fornecido não existe!',
        }
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true,
        validate: {
            validator: async function (id: string) {
                const autor = await Autor.findById(id); // verifica se id existe na coleção autores
                return !!autor; // true se o autor existir
            },
            message: 'O Autor fornecido não existe!',
        }
    }
});

const Autor = mongoose.model("Autor", AutorSchema, "autores");
const Editora = mongoose.model("Editora", EditoraSchema);
const Livro = mongoose.model("Livro", LivroSchema);
const AutorLivro = mongoose.model("AutorLivro", AutorLivroSchema);

export { Autor, Editora, Livro, AutorLivro };