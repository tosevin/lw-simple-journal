import express from 'express';
import { 
  checkLogin, 
 } from '../controllers/loginController.js';

const router = express.Router();

router.post('/', checkLogin);

export default router;