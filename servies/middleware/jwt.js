import jwt from 'jsonwebtoken';

const SECRET_KEY = 'lw_simple_journal_youNeverAlone'; 

// 生成 JWT
export function generateToken() {
    return jwt.sign({ valid: true }, SECRET_KEY, { expiresIn: '30m' }); 
}

// 认证中间件
export function authenticateToken(req, res, next) {
    const token = req.headers['authorization']; 

    if (!token) {
        // return res.redirect('/login?message=登录失效'); 

        return res.status(401).send('登录失效');
    }

    jwt.verify(token, SECRET_KEY, (err) => {
        if (err) {
            // return res.redirect('/login?message=登录失效'); 
            return res.status(401).send('登录失效');
        }
        next(); 
    });
}

