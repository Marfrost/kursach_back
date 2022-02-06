import { ApiError } from '../errors/ApiError';
import { Order } from '../models/models';
import { NextFunction, Request, Response } from 'express';

const PDFDocument = require('pdfkit-table')
import fs from 'fs'
import blobStream from 'blob-stream'

class ReportsController {
    async getOrdersReport(req: Request, res: Response, next: NextFunction) {

        const newOrdersResult = await Order.sequelize
            ?.query('Select users.username as user, books.name as book, authors.name as author, quantity, quantity*books.price as price,status from orders left join books on orders.book = books.id left join users on orders.id = users.id left join authors on books.author = authors.id where status like \'New\'')
        const finishedOrdersResult = await Order.sequelize
            ?.query('Select users.username as user, books.name as book, authors.name as author, quantity, quantity*books.price as price,status from orders left join books on orders.book = books.id left join users on orders.id = users.id left join authors on books.author = authors.id where status like \'Finished\'')
        const newOrders = newOrdersResult![0]
        
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
            title: '',
            headers: [{ "label": "Field 1", "property": "Field1" }, { "label": "Field2", "property": "Field2" }],
            datas: [{ Field1: 1, Field2: 2 }]
        }
        // the magic
        await doc.table(table, {
            options: { fontSize: 10, separation: true },
            prepareRow: (row: any, indexColumn: number, indexRow: number, rectRow: any) => {
                console.log('row')
                console.log(row)
                doc.font("Helvetica").fontSize(10);
                indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? 'red' : 'white'), 0.5);
            },
        });
        // Finalize PDF file
        doc.end();
    }
}


export default new ReportsController();
