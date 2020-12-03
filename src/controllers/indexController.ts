import { Request, Response} from 'express';

class IndexController { 
public index(req: Request, res: Response) { 
    res.json({text: 'La fokin api esta en'})
  }
}

export const indexController = new IndexController();