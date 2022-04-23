import { Router } from 'express';
import multer from 'multer';
import { ReadCSVController } from './controllers/ReadCSVController';

const multerConfig = multer();
const routes = Router();

routes.post("/products", multerConfig.single('file'), new ReadCSVController().handle);

export { routes };