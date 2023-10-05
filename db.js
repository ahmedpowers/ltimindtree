
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
   'DB_NAME',
   'USER',
   'PASSWORD',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

  export default sequelize;
