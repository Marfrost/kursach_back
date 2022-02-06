import { ApiError } from '../errors/ApiError';
import { Order } from '../models/models';
import { NextFunction, Request, Response } from 'express';
const PDFDocument = require('pdfkit-table')

class ReportsController {
    async getOrdersReport(req: Request, res: Response, next: NextFunction) {
        const role=req.body['token']['role'];
        let whereQuery=role=== 'Admin' ? '' :'and "user" = '+ req.body['token'].id ;


        const newOrdersResult = await Order.sequelize
            ?.query('Select users.username as user, books.name as book, authors.name as author, quantity, quantity*books.price as price,status from orders left join books on orders.book = books.id left join users on orders."user" = users.id left join authors on books.author = authors.id where status like \'New\''+ whereQuery)
        const finishedOrdersResult = await Order.sequelize
            ?.query('Select users.username as user, books.name as book, authors.name as author, quantity, quantity*books.price as price,status from orders left join books on orders.book = books.id left join users on orders."user" = users.id left join authors on books.author = authors.id where status like \'Finished\''+whereQuery)
        const newOrders = newOrdersResult![0]
        const finishedOrders = finishedOrdersResult![0]

        const headers=[
            { "label": "User", "property": "user" },
            { "label": "Book", "property": "book" },
            { "label": "Author", "property": "author" },
            { "label": "Price", "property": "price" },
            { "label": "Quantity", "property": "quantity" },
            { "label": "Status", "property": "status" },
        ];
        // Create a document
        const doc = new PDFDocument();
        // Saving the pdf file in root directory.
        doc.pipe(res);
        // Adding functionality
        doc
            .fontSize(27)
            .text('Orders report', 100, 100);
        // table
        const table = {
            title: 'Active orders',
            headers: headers,
            datas:newOrders
        }
        // the magic
        await doc.table(table, {
            options: { fontSize: 10, separation: true },
            prepareRow: (row: any, indexColumn: number, indexRow: number, rectRow: any) => {
                doc.font("Helvetica").fontSize(10);
                indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? [220,220,220] : 'white'), 0.5);
            },
        });
        const table2 = {
            title: 'Finished orders',
            headers: headers,
            datas:finishedOrders
        }
        // the magic
        await doc.table(table2, {
            options: { fontSize: 10, separation: true },
            prepareRow: (row: any, indexColumn: number, indexRow: number, rectRow: any) => {
                doc.font("Helvetica").fontSize(10);
                indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? [220,220,220] : 'white'), 0.5);
            },
        });

        // Finalize PDF file
        doc.end();
    }
}


export default new ReportsController();
