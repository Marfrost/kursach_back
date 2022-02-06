import { Anketa} from '../models_v1.2/models';
import { ApiError } from '../errors/ApiError';
import { NextFunction, Request, Response } from 'express';


class AnketaController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { manager, user, responses } = req.body;
        let result = await Anketa.sequelize?.query('Insert into anketas (manager, user, responses) VALUES (:manager, :user, :responses)',
            {
                replacements: { manager, user, responses }
            }
        )

        res.send(result);
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Anketa.sequelize?.query('Delete from anketas where id=:id', {
            replacements: { id }
        })
        res.send(result);
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const { id, manager, user, responses} = req.body;
        let result = await Anketa.sequelize?.query('Update anketas Set manager=:manager, user=:user, responses=:responses where id=:id',
            {
                replacements: { manager, user, responses, id }
            })
        res.send(result);
    }
    async get(req: Request, res: Response, next: NextFunction) {
        let result = await Anketa.sequelize?.query('Select * from anketas')
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }
        res.send(result[0]);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Anketa.sequelize?.query('Select * from anketas where id=:id', {
            replacements: { id }
        })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
    async getFull(req: Request, res: Response, next: NextFunction) {
        let result = await Anketa.sequelize
            ?.query('Select * from anketas left join managers on managers.id = ankets.manager left join users on users.id = anketas.user order by manager')
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0]);
    }
    async getFullById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Anketa.sequelize
            ?.query('Select * from anketas left join managers on managers.id = ankets.manager left join users on users.id = anketas.user order by manager where anketas.id=:id',
                {
                    replacements: { id }
                })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
}


export default new AnketaController();
