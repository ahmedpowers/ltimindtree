
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
   'track_db',
   'root',
   'The@power11',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

  export default sequelize;
