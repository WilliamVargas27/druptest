"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//morgan nos muestre por consola todas las peticiones que se esten haciendo en nuestra aplicacion
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Importacion de los archivos de rutas
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
//Creacion de la clase del servidor
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json()); // son nos permite manejar objetos json
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'));
        console.log('server on port 3000');
    }
}
const server = new Server();
server.start();
