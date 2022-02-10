import { Manager } from '../models_v1.2/models';
import { ApiError } from '../errors/ApiError';
import { NextFunction, Request, Response } from 'express';


class ManagerController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name, gender, photo } = req.body;
        let result = await Manager.sequelize?.query('Insert into managers (name, gender,photo ) VALUES (:name, :gender,:photo )',
            {
                replacements: { name, gender, photo }
            }
        )

        res.send(result);
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Manager.sequelize?.query('Delete from managers where id=:id', {
            replacements: { id }
        })
        res.send(result);
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const { id, name, gender, photo } = req.body;
        let result = await Manager.sequelize?.query('Update managers Set name=:name, gender=:name,photo=:photo  where id=:id',
            {
                replacements: { name, gender, photo, id }
            })
        res.send(result);
    }
    async get(req: Request, res: Response, next: NextFunction) {
        let result = await Manager.sequelize?.query('Select * from managers')
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }
        res.send(result[0]);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Manager.sequelize?.query('Select * from managers where id=:id', {
            replacements: { id }
        })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
}


export default new ManagerController();
