import express, { Application } from 'express';
//morgan nos muestre por consola todas las peticiones que se esten haciendo en nuestra aplicacion
import morgan from 'morgan';
import cors from 'cors';

// Importacion de los archivos de rutas
import  gamesRoutes  from './routes/gamesRoutes';
import indexRoutes from './routes/indexRoutes';

//Creacion de la clase del servidor
class Server { 
  public app: Application;
  constructor() { 
    this.app = express();
    this.config();
    this.routes();
  }
  config(): void { 
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json()); // son nos permite manejar objetos json
    this.app.use(express.urlencoded({extended: false}))
  }
  routes(): void { 
    this.app.use(indexRoutes);
    this.app.use('/api/games',gamesRoutes);
  }
  start() { 
    this.app.listen(this.app.get('port'))
    console.log('server on port 3000')
  }
}

const server = new Server();
server.start();