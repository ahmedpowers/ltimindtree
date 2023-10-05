import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import routes from './routes/index.js'; // Create this file for your routes

const app = express();

app.use(session({
  secret: "mindtree",
  saveUninitialized: true,
  resave: true
}));

app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.use('/api', routes); // Define your API routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
