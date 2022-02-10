import db from '../db';
import { INTEGER, STRING, JSONB, TEXT } from 'sequelize';

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
const Manager = db.define(
  'managers',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:STRING, unique:true },
    gender: { type:STRING },
    photo: { type:TEXT }
  },
  {
    timestamps: false
  }
)

const Feedback = db.define(
  'feedbacks',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    mark: { type:INTEGER  },
    text: { type:STRING },
    manager: { type:INTEGER, references:{
      model:'managers',
      key:'id'
    } },
    anketa: { type:INTEGER, references:{
      model:'anketas',
      key:'id'
    } },
  },
  {
    timestamps: false
  }
)

const Anketa=db.define(
  'anketas',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    manager: { type:INTEGER, references:{
      model:'managers',
      key:'id'
    } },
    user: { type:INTEGER, references:{
      model:'users',
      key:'id'
    } },
    responses:{
      type:JSONB
    }

  }
)



export { User, Feedback, Manager, Anketa };
