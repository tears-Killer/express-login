const Joi = require('joi')

const schema = {
    username: Joi.string().min(2).max(5).error(new Error('username属性没有通过验证'))
}

async function run() {
    try {
        await Joi.validate({ username: 'a' }, schema)
    } catch (error) {
        console.log(error.message);
        return
    }
    console.log('验证通过');

}

run()