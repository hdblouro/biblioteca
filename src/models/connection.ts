import mongoose from "mongoose";

// A URI indica o IP, a porta e BD a ser conectado
const uri = "mongodb://127.0.0.1:27017/biblioteca";

export default function connect() {
    // Configura manipuladores de eventos para diferentes estados de conexão
    // cada mensagem de log indica um estado específico da conexão.
    // É opcional configurar os manipuladores de estado,
    // mas é interessante para sabermos sobre a conexão
    mongoose.connection.on("connected", () => console.log("connected"));
    mongoose.connection.on("open", () => console.log("open"));
    mongoose.connection.on("disconnected", () => console.log("disconnected"));
    mongoose.connection.on("reconnected", () => console.log("reconnected"));
    mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
    mongoose.connection.on("close", () => console.log("close"));
    // Utiliza o método connect do Mongoose para estabelecer a conexão com o MongoDB, usando a URI
    mongoose
        .connect(uri, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        })
        .then(() => console.log("Conectado ao MongoDB"))
        .catch((e) => {
            console.error("Erro ao conectar ao MongoDB:", e.message);
        });
    // o sinal SIGINT é disparado ao encerrar a aplicação, geralmente, usando Crtl+C
    process.on("SIGINT", async () => {
        try {
            console.log("Conexão com o MongoDB fechada");
            await mongoose.connection.close();
            process.exit(0);
        } catch (error) {
            console.error("Erro ao fechar a conexão com o MongoDB:", error);
            process.exit(1);
        }
    });
}