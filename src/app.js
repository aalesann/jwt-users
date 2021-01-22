import express from 'express';
import morgan from 'morgan'
import pkg from '../package.json'

import { createRoles } from "./libs/initialSetup";

// Importacion de rutas
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/users.routes'

// Initializations
const app = express();
createRoles();

// Settings
app.set('pkg', pkg)
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        description: app.get('pkg').version,
    });
});

app.use('/api/products',productsRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/users',usersRoutes);

export default app;