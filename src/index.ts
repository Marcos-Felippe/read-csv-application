import express from 'express';
import { routes } from './routes';
import "./db";

const app = express();

app.use(routes);

app.listen(3000, () => console.log("server is running in 3000"));