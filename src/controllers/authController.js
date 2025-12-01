const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

// Simulação de banco de usuários
const users = [
    {
        id: 1,
        username: process.env.DEFAULT_USER || 'admin',
        password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD || 'admin123', 10)
    }
];

async function login(req, res, next) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username e password são obrigatórios" });
        }

        // Busca o usuário no banco
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Validação de senha
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Username ou senha incorretos" });
        }

        // Gera o Token para o usuário com o período de 24h estabelecido no .env
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            token: token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { login };