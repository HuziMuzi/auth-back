const Router = require('express')
const router = new Router()
const controller = require('./authController.js')
const {check} = require('express-validator')


router.post('/registration', [
    check('username', 'Имя пользователя не можжет быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и короче 12 символов ').isLength({min:4, max:12})
],controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router

// export default router