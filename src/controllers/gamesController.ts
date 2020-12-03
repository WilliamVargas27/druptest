import { Request, Response} from 'express';

//importacion de la base de datos
import pool from '../database';

class GamesController { 
  public async list(req: Request, res: Response) { 
   const games = await pool.query('SELECT * FROM game')
   res.json(games)
  }
  public async traerUno(req: Request, res: Response) { 
    const { id } = req.params;
    const games = await pool.query('SELECT * FROM game WHERE id = ?', [id])
    if (games.length > 0) {
      return res.json(games)
      
    }
    res.status(404).json({text: 'Game does´n exist'})
  }
  public async create(req: Request, res: Response) { 
    await pool.query('INSERT INTO game set ?', [req.body]);
    res.json({ text: 'Game create' });
  }
  public async delete(req: Request, res: Response) { 
    const { id } = req.params;
    const games = await pool.query('DELETE FROM game WHERE id = ?', [id]);
    
    res.json({text: ' Game deleted'})
  }
  public async update(req: Request, res: Response) { 
    const { id } = req.params;
    await pool.query('UPDATE game set ? WHERE id = ?', [req.body, id]);
    res.json({text: ' Game updated'})
  }

}

const gamesController = new GamesController();
export default gamesController;