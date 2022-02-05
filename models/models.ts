import db from '../db';
import {  INTEGER, STRING } from 'sequelize';

const User = db.define(
  'users',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING},
    password: { type: STRING },
    role: { type: STRING },
    email: { type: STRING , unique:true },
  },
  {
    timestamps: false
  }
);

console.log('models')
export {  User};
