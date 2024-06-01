import mongoose from "mongoose";
const { Schema } = mongoose;

const AutorSchema = new Schema({
    nome: { type: String, maxLength: 45, required: true },
    data_nasc: { type: Date },
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    },
});

const EditoraSchema = new Schema({
    razao: { type: String, maxLength: 50, required: true },
    cnpj: { type: String, minlength: 14, maxlength: 14 }
});

const LivroSchema = new Schema({
    editora: { type: mongoose.Schema.Types.ObjectId, ref: 'Editora', required: true },
    titulo: { type: String, maxlength: 100, required: true },
    paginas: { type: Number, required: true }
});

const AutorLivroSchema = new Schema({
    livro: { type: mongoose.Schema.Types.ObjectId, ref: 'Livro', required: true },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true }
});

const Autor = mongoose.model("Autor", AutorSchema);
const Editora = mongoose.model("Editora", EditoraSchema);
const Livro = mongoose.model("Livro", LivroSchema);
const AutorLivro = mongoose.model("AutorLivro", AutorLivroSchema);
