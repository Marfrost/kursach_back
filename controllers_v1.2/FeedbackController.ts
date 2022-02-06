import { Feedback} from '../models_v1.2/models';
import { ApiError } from '../errors/ApiError';
import { NextFunction, Request, Response } from 'express';


class FeedbackController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { mark, text, manager, anketa } = req.body;
        let result = await Feedback.sequelize?.query('Insert into feedbacks (mark, text, manager, anketa) VALUES (:mark, :text, :manager, :anketa)',
            {
                replacements: { mark, text, manager, anketa }
            }
        )

        res.send(result);
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Feedback.sequelize?.query('Delete from feedbacks where id=:id', {
            replacements: { id }
        })
        res.send(result);
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const { id, mark, text, manager, anketa} = req.body;
        let result = await Feedback.sequelize?.query('Update feedbacks Set mark=:mark, text=:text, manager=:manager, anketa=:anketa where id=:id',
            {
                replacements: { mark, text, manager, anketa, id }
            })
        res.send(result);
    }
    async get(req: Request, res: Response, next: NextFunction) {
        let result = await Feedback.sequelize?.query('Select * from feedbacks')
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }
        res.send(result[0]);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Feedback.sequelize?.query('Select * from feedbacks where id=:id', {
            replacements: { id }
        })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
    async getFull(req: Request, res: Response, next: NextFunction) {
        let result = await Feedback.sequelize
            ?.query('Select mark, text, manager, anketa from feedbacks left join anketas on anketas.id = feedbacks.id left join managers on managers.id=feedbacks.manager')
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0]);
    }
    async getFullById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Feedback.sequelize
            ?.query('Select mark, text, manager, anketa from feedbacks left join anketas on anketas.id = feedbacks.id left join managers on managers.id=feedbacks.manager where feedbacks.id=:id',
                {
                    replacements: { id }
                })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
}


export default new FeedbackController();
