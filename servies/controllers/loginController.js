import { generateToken} from'../middleware/jwt.js'; 
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();
var salt = bcrypt.genSaltSync(10);

export const checkLogin = async (req, res) => {
    const  VALID_PASSWORD  = process.env.VALID_PASSWORD;
    var hash = bcrypt.hashSync(VALID_PASSWORD, salt);
    try {     
        const { password } = req.body;

       
        bcrypt.compare(password, hash, (err, result) => {
         if (result) {
            const token = generateToken(); // 生成 token
             res.json({ token }); // 返回 token
            } else {
                return res.status(401).send('密码错误');
                }
              });
        // console.log(req.body);

        // if (password === VALID_PASSWORD) {
        //     const token = generateToken(); // 生成 token
        //     res.json({ token }); // 返回 token
        // } else {
        //     return res.status(401).send('密码错误');
        // }
        } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}