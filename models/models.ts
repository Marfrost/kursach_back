import db from '../db';
import {  INTEGER, STRING } from 'sequelize';

const User = db.define(
  'users',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING, unique:true },
    password: { type: STRING },
    role: { type: STRING }
  },
  {
    timestamps: false
  }
);

export {  User};
