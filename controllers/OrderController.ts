import { Order } from '../models/models';
import { ApiError } from '../errors/ApiError';
import { NextFunction, Request, Response } from 'express';


class OrderController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { user, book, quantity } = req.body;
        let result = await Order.sequelize?.query('Insert into orders (user, book, quantity) VALUES (:user, :book, :quantity)',
            {
                replacements: { user, book, quantity }
            }
        )

        res.send(result);
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Order.sequelize?.query('Delete from orders where id=:id', {
            replacements: { id }
        })
        res.send(result);
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const { id, user, book, quantity} = req.body;
        let result = await Order.sequelize?.query('Update authors Set user=:user, book=:book, quantity=:quantity where id=:id',
            {
                replacements: { user, book, quantity, id }
            })
        res.send(result);
    }
    async get(req: Request, res: Response, next: NextFunction) {
        let result = await Order.sequelize?.query('Select * from orders')
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }
        res.send(result);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Order.sequelize?.query('Select * from orders where id=:id', {
            replacements: { id }
        })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
    async getFull(req: Request, res: Response, next: NextFunction) {
        let result = await Order.sequelize
            ?.query('Select users.username as user, books.name as book, books.author as author, quantity, quantity*books.price as price from orders left join books on orders.book = books.id left join users on orders.id = users.id ')
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0]);
    }
    async getFullById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Order.sequelize
            ?.query('Select users.username as user, books.name as book, books.author as author, quantity, quantity*books.price as price from orders left join books on orders.book = books.id left join users on orders.id = users.id where Orders.id=:id',
                {
                    replacements: { id }
                })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
}


export default new OrderController();
