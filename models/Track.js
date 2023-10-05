// models/Track.js
import { DataTypes } from 'sequelize';
import  sequelize  from '../db.js';

const Track = sequelize.define('Track', {
  isrc: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  spotifyImageUri: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  artistNameList: {
    type: DataTypes.JSON, // Store artist names as an array
  },
});

// Uncomment this code to create the tracks table

// (async () => {
//   try {
//     await sequelize.sync({ force: true }); // Use { force: true } to drop and recreate the table
//     console.log('MySQL table created successfully.');
//   } catch (error) {
//     console.error('Error creating MySQL table:', error);
//   } finally {
//     sequelize.close(); // Close the database connection
//   }
// })();
 export default Track;
