class AutorLivroModel {
    id:string = ""
    autor:string;
    livro: string;

    constructor(autor:string, livro: string){
        this.autor = autor;
        this.livro = livro;
    }
}

export default AutorLivroModel;