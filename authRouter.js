const Router = require('express')
const router = new Router()
const controller = require('./authController.js')
const {check} = require('express-validator')
const roleMiddleware = require('./middlewaree/roleMiddleware')


router.post('/registration', [
    check('username', 'Имя пользователя не можжет быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и короче 12 символов ').isLength({min:4, max:12})
],controller.registration)
router.post('/login', controller.login)
router.get('/users',roleMiddleware(['USER', 'ADMIN']) , controller.getUsers)

module.exports = router

// export default router