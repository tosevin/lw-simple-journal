import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import diaryRouter from './routes/diary.js';
import loginRouter from './routes/login.js';
import cors from 'cors';
import { authenticateToken} from'./middleware/jwt.js'; 

dotenv.config();
const port = process.env.PORT ;
const app = express();
app.use(express.json());//解析json请求体的中间件
app.use(cors());//跨域中间件
app.use('/api/login',loginRouter);
app.use(authenticateToken);
app.use('/api/diary', diaryRouter);




const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);//严格模式

        mongoose.connect(process.env.MONGODB_URI, {

        });

        console.log('数据库已连接');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
}).catch(error => console.error(error.message));


