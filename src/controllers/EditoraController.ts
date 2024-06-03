import { Request, Response } from "express";
import { Editora } from "../models";

class EditoraController {

    // create

    public async create(req: Request, res: Response): Promise<Response> {
        const { razao, cnpj } = req.body;
        try {
            //a instância de um modelo é chamada de documento
            const document = new Editora({ razao, cnpj });
            // ao salvar serão aplicadas as validações do esquema
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                // código 11000 e 11001 indica violação de restrição única (índice duplicado)
                return res.json({ message: "Este CNPJ já está em uso!" });
            } else if (error && error.errors["razao"]) {
                return res.json({ message: error.errors["razao"].message });
            } else if (error && error.errors["cnpj"]) {
                return res.json({ message: error.errors["cnpj"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // list

    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const objects = await Editora.find().sort({ razao: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // delete

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body; // _id do registro a ser excluído
        try {
            const object = await Editora.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Registro excluído com sucesso!" });
            } else {
                return res.json({ message: "Registro inexistente!" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // update

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, razao, cnpj } = req.body;
        try {
            // busca a editora existente na coleção antes de fazer o update
            const document = await Editora.findById(id);
            if (!document) {
                return res.json({ message: "Editora inexistente!" });
            }
            // atualiza os campos
            document.razao = razao;
            document.cnpj = cnpj;
            // ao salvar serão aplicadas as validações do esquema
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                // código 11000 e 11001 indica violação de restrição única (índice duplicado)
                return res.json({ message: "Este cnpj já está em uso!" });
            } else if (error && error.errors["razao"]) {
                return res.json({ message: error.errors["razao"].message });
            } else if (error && error.errors["cnpj"]) {
                return res.json({ message: error.errors["cnpj"].message });
            }
            return res.json({ message: error.message });
        }
    }
}

export default new EditoraController();
