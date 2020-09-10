import express, { json } from 'express';
import morgan from 'morgan';

//swagger
const swaggerUi = require('swagger-ui-express');

//impoeting routes
import groupRoutes from './routes/groups';
import userRoutes from './routes/users';
import rolRoutes from './routes/roles';

//initalization
const app = express();
app.use(function(req, res, next) {
    // Website you wish to allow to connect
   let allowedOrigins = ["http://10.72.5.47:3000", "http://localhost:8081"];
   let origin = req.headers.origin;
   if (allowedOrigins.indexOf(origin) > -1) {
     // console.log(`Access from ${origin}`);
     res.setHeader("Access-Control-Allow-Origin", origin);
   } else {
     console.log("Access ip denied");
   }
   res.setHeader(
     "Access-Control-Allow-Methods",
     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
   );
   res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type");
   res.setHeader("Access-Control-Allow-Credentials", true);
   next();
 });
const swaggerDoc = require('../swagger.json');
//middlewares
app.use(morgan('dev')); //Va mostrando las peticiones por consola
app.use(json()); //Poder ntender los archivos JSON
//routes
app.use('/api/groups', groupRoutes);
//users
app.use('/api/users', userRoutes);
//roles
app.use('/api/roles', rolRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
export default app;