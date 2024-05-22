import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('myapp', 'elephantdb://prkhg-user', 'prkhg-pass', {
  host: 'postgresql', // Docker container name for PostgreSQL
  dialect: 'postgres',
});

export default sequelize;