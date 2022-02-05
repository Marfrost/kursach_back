import { Sequelize } from 'sequelize';

if (!process.env.DB_NAME) {
  throw new Error('Wrong DB_NAME');
}
if (!process.env.DB_USER) {
  throw new Error('Wrong DB_USER');
}
if (!process.env.DB_PORT) {
  throw new Error('Wrong DB_PORT');
}
export default new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT)
  }
);
