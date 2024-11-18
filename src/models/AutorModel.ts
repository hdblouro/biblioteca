class AutorModel {
    id:string = ""
    nome:string;
    cpf: string;
    data_nasc: string;
    email:string;

    constructor(nome:string, cpf: string, data_nasc: string, email:string){
        this.nome = nome;
        this.cpf = cpf;
        this.data_nasc = data_nasc;
        this.email = email;
    }
}

export default AutorModel;