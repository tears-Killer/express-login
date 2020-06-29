//引入express框架
const express = require('express')

const admin = express.Router()

const login = require('./admin/login')

const { User } = require('../model/user')

admin.get('/login', (req, res) => {
    res.render('admin/login')
})

admin.get('/user', async (req, res) => {
    let page = req.query.page || 1
    //每一页显示的条数
    let pagesize = 5
    //用户数据总数
    let count = await User.countDocuments({})
    //总页数
    let total = Math.ceil(count / pagesize)

    let start = (page - 1) * pagesize
    let users = await User.find().limit(pagesize).skip(start)
    res.render('admin/user', {
        users,
        page,
        total,
    })
})

admin.get('/exit', (req, res) => {
    req.app.locals.userInfo = null
    res.redirect('/admin/login')
})

admin.get('/add', (req, res) => {
    res.render('admin/user-edit', {
        button: '添加',
        url: '/admin/add'
    })
})

admin.get('/edit', async (req, res) => {
    let { uid } = req.query
    let user = await User.findOne({ _id: uid })

    res.render('admin/user-edit', {
        user,
        button: '修改',
        uid,
        url: '/admin/edit?id=' + req.query.uid
    })
})

admin.post('/login', login)

admin.post('/add', async (req, res) => {
    await User.create(req.body)
    res.redirect('/admin/user')
})

admin.post('/edit', async (req, res) => {
    let id = req.query.id
    await User.updateOne({ _id: id },req.body)
    res.redirect('/admin/user')
})

admin.post('/delete',async (req,res) => {
    await User.findOneAndDelete(req.body)
    res.redirect('/admin/user')
})
module.exports = admin