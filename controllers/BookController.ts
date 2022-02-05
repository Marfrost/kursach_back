import { Book } from '../models/models';
import { ApiError } from '../errors/ApiError';
import { NextFunction, Request, Response } from 'express';


class BookController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name, description, year, pages, author, price } = req.body;
        let result = await Book.sequelize?.query('Insert into books (name, description, year, pages, author, price) VALUES (:name, :description, :year, :pages, :author, :price)',
            {
                replacements: { name, description, year, pages, author, price }
            }
        )

        res.send(result);
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Book.sequelize?.query('Delete from books where id=:id', {
            replacements: { id }
        })
        res.send(result);
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const { id, name, description, year, pages, author, price } = req.body;
        let result = await Book.sequelize?.query('Update authors Set name=:name, description=:description, year=:year, pages=:pages, author=:author, price=:price where id=:id',
            {
                replacements: { name, description, year, pages, author, price, id }
            })
        res.send(result);
    }
    async get(req: Request, res: Response, next: NextFunction) {
        let result = await Book.sequelize?.query('Select * from books')
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }
        res.send(result);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Book.sequelize?.query('Select * from books where id=:id', {
            replacements: { id }
        })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
    async getFull(req: Request, res: Response, next: NextFunction) {
        let result = await Book.sequelize
            ?.query('Select books.name, books.description, books.year, books.pages, books.price, author.name as author_name from books left join authors on books.author = authors.id')
        if (!result) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0]);
    }
    async getFullById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        let result = await Book.sequelize
            ?.query('Select books.id, books.name, books.description, books.year, books.pages, books.price, author.name as author_name from books left join authors on books.author = authors.id where books.id=:id',
                {
                    replacements: { id }
                })
        if (!result || !result[0][0]) {
            return next(ApiError.notFound("Not found"))
        }

        res.send(result[0][0]);
    }
}


export default new BookController();
