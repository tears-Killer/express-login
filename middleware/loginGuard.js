const loginGuard = (req,res,next) => {
    if(req.url != '/login' && !req.app.locals.userInfo){
        res.redirect('/admin/login')
    }else {
        next()
    }
}
module.exports = loginGuard