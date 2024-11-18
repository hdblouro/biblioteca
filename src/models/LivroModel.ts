class LivroModel {
    id:string = ""
    titulo:string;
    paginas: number;
    editora:string;

    constructor(titulo: string, paginas: number, editora:string){
        this.titulo = titulo;
        this.paginas = paginas;
        this.editora = editora;
    }
}

export default LivroModel;