import { Request, Response } from "express";
import { AutorLivro } from "../models";

class AutorLivroController {

    // create

    public async create(req: Request, res: Response): Promise<Response> {
        const { livro, autor } = req.body;
        try {
            const document = new AutorLivro({ livro, autor });
            // ao salvar serão aplicadas as validações do esquema
            const response = await document.save();
            return res.json(response);
        } catch (error: any) {
            if (error && error.errors["autor"]) {
                return res.json({ message: error.errors["autor"].message });
            } else if (error && error.errors["livro"]) {
                return res.json({ message: error.errors["livro"].message });
            }
            return res.json({ message: error });
        }
    }

    // list

    public async list(req: Request, res: Response): Promise<Response> {
        const { _id } = req.body; // _id do autor da chave estrangeira
        console.log(_id);
        try {
            // o método populate('autor') diz ao Mongoose para substituir o ID
            // da chave estrangeira pelos documentos da coleção autores
            const objects = await AutorLivro.find({"autor":_id})
                .populate("autor")
                .populate("livro")
                .select("livro")
                .sort({ titulo: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // delete

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body; // _id do registro a ser excluído
        try {
            const object = await AutorLivro.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Registro excluído com sucesso" });
            } else {
                return res.json({ message: "Registro inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // update

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, livro, autor } = req.body;
        try {
            // busca o registro existente na coleção antes de fazer o update
            const document = await AutorLivro.findById(id);
            if (!document) {
                return res.json({ message: "Registro inexistente!" });
            }
            // atualiza os campos
            document.livro = livro;
            document.autor = autor;
            // ao salvar serão aplicadas as validações do esquema
            const response = await document.save();
            return res.json(response);
        } catch (error: any) {
            if (error && error.errors["livro"]) {
                return res.json({ message: error.errors["livro"].message });
            } else if (error && error.errors["autor"]) {
                return res.json({ message: error.errors["autor"].message });
            }
            return res.json({ message: error });
        }
    }
}

export default new AutorLivroController();