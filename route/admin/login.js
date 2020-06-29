const { User } = require('../../model/user')

module.exports = async (req, res) => {
    const { email, password } = req.body
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件或密码错误' })
    } else {
        let user = await User.findOne({ email})
        if (user) {
            req.app.locals.userInfo = user
            res.redirect('/admin/user')
        } else {
            res.status(400).render('admin/error', { msg: '邮件或密码错误' })
        }
    }
}
 