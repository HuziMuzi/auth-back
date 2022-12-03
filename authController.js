const User = require('./model/User')
const Role = require('./model/Role')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')

class authController {
    async registration(req, res) {
        try {
            // проверка на наличие ошибок валидации
            const errors =validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({message: 'Ошибка регистрации', errors})
            const {username, password} = req.body
            // получение с базы даннных
            const candidate = await User.findOne({username})
            // проверка на наличие пользователя в бд с таким именем
            if (candidate) return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            const userRole = await Role.findOne({value: 'USER'})

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            // сохраняем в базу данных роль
            await user.save()
            return res.json({message: 'Пользователь успешно добавлен'})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: 'registration error'})
        }
    }
    async login(req, res) {
        try {
            
        }
        catch (e) {
            console.log(e)
            res.statusCode(400).json({message: 'login error'})

        }
    }
    async getUsers(req, res) {
            try {

                res.json('server work, get users')
            }
            catch (e) {

            }
    }
}

module.exports = new authController()