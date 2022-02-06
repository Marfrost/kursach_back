import db from '../db';
import { INTEGER, STRING } from 'sequelize';

const User = db.define(
  'users',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING },
    password: { type: STRING },
    role: { type: STRING },
    email: { type: STRING, unique: true },
  },
  {
    timestamps: false
  }
);


//1
const Order = db.define(
  'orders',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: INTEGER },
    user: { type: INTEGER, references: { model: "users", key: 'id' } },
    book: { type: INTEGER, references: { model: "books", key: 'id' } },
    status: { type:STRING},

  },
  {
    timestamps: false
  }
)

const Book = db.define(
  'books',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING },
    description: { type: STRING },
    year: { type: INTEGER, },
    price: { type: INTEGER },
    pages: { type: INTEGER },
    author: {
      type: INTEGER, references: {
        model: "authors", key: 'id'
      }
    }

  },
  {
    indexes: [
      {
        fields: ['year', 'name', 'author'],
        'unique': true,
        name: 'books_unique_constraint'
      }
    ],
    timestamps: false
  }
)


const Author = db.define(
  'authors',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING, unique: true },
    description: { type: STRING }
  },
  {
    timestamps: false
  }
)

console.log('models')
export { User, Order, Book, Author };
