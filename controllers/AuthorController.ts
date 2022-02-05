import { Author } from '../models/models';
import { ApiError } from '../errors/ApiError';
import { NextFunction, Request, Response } from 'express';


class AuthorController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name, description } = req.body;
        let result = await Author.sequelize?.query('Insert into authors (name, description) VALUES (:name, :description)',
            {
                replacements: { name, description }
            }
        )
        res.send(result);
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result =await Author.sequelize?.query('Delete from authors where id=:id', {
            replacements: { id }
        })
        res.send(result);
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const { id, name, description, } = req.body;
        let result = await Author.sequelize?.query('Update authors set name=:name, description=:description  where id=:id', {
            replacements: { id, name, description }
        })
        res.send(result);
    }
    async get(req: Request, res: Response, next: NextFunction) {
        let result = await Author.sequelize?.query('Select * from authors')
        if(!result){
            return next(ApiError.notFound("Not found"))
        }
        res.send(result[0]);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Author.sequelize?.query('Select * from authors where id=:id', {
            replacements: { id }
        })
        if(!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }
        
        res.send(result[0][0]);
    }
}


export default new AuthorController();
