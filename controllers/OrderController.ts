import { Order } from '../models/models';
import { ApiError } from '../errors/ApiError';
import { NextFunction, Request, Response } from 'express';


class OrderController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { user, book, quantity,status } = req.body;
        let result = await Order.sequelize?.query('Insert into orders ("user", book, quantity,status) VALUES (:user, :book, :quantity,:status)',
            {
                replacements: { user, book, quantity ,status}
            }
        )
            console.log(result)
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
        const { id, user, book, quantity,status} = req.body;
        let result = await Order.sequelize?.query('Update orders Set user=:user, book=:book, quantity=:quantity,status:status where id=:id',
            {
                replacements: { user, book, quantity,status, id }
            })
        res.send(result);
    }
    async get(req: Request, res: Response, next: NextFunction) {
        const role=req.body['token']['role'];
        let whereQuery=role=== 'Admin' ? '' :'where user = :userId' ;

        let result = await Order.sequelize?.query(`Select * from orders ${whereQuery}`)
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }
        res.send(result[0]);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        const role=req.body['token']['role'];
        let whereQuery=role=== 'Admin' ? 'where Orders.id=:id' :'where Orders.id=:id and user = :userId' ;
        let result = await Order.sequelize?.query(`Select * from orders ${whereQuery}`, {
            replacements: { id }
        })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
    async getFull(req: Request, res: Response, next: NextFunction) {

        const role=req.body['token']['role'];
        let whereQuery=role=== 'Admin' ? '' :'where users.id = :userId' ;
        let result = await Order.sequelize
            ?.query(`Select users.username as user, books.name as book, authors.name as author, quantity, quantity*books.price as price,status from orders left join books on orders.book = books.id left join users on orders.id = users.id left join authors on books.author = authors.id ${whereQuery}`,
            {
                replacements:{
                    userId:req.body['token']['id']
                }
            })
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0]);
    }
    async getFullById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        const role=req.body['token']['role'];
        let whereQuery=role=== 'Admin' ? 'where Orders.id=:id' :'where Orders.id=:id and users.id = :userId' ;
        let result = await Order.sequelize
            ?.query(`Select users.username as user, books.name as book, authors.name as author, quantity, quantity*books.price as price,status from orders left join books on orders.book = books.id left join users on orders.id = users.id left join authors on books.author = authors.id ${whereQuery}`,
                {
                    replacements: { id,userId:req.body['token']['id'] },
                })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
}


export default new OrderController();
