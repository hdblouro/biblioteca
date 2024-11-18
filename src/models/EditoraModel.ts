class EditoraModel {
    id:string = ""
    razao:string;
    cnpj: string;

    constructor(razao:string, cnpj: string){
        this.razao = razao;
        this.cnpj = cnpj;
    }
}

export default EditoraModel;