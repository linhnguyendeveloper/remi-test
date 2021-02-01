const { User } = require('../../models/users');

const { jwtToken, pareJwtToken } = require("../../utils/func");
const constants = require('../../utils/constants')
const bcrypt = require('bcryptjs');


const login = async (body, res) => {

    const { email, password } = body;

    let user = await User.findOne({ email, status: 'active' }).exec();

    if (!user || !user.checkPassword(password)) {
        return res.status(constants.CODE.BAD_REQUEST).json({ 'errors ': "wrong email or password" });
    }

    return jwtToken({ _id: user._id, password });

}

const createAndLogin = async (req, res) => {

    const data = { email, password } = req.body;

    let user = await User.findOne({ email, status: 'active' }).exec();

    if (user && !user.checkPassword(data.password)) {
        return res.status(constants.CODE.BAD_REQUEST).json({ 'errors ': "wrong email or password" });
    }

    if (!user) {
        data.password = bcrypt.hashSync(data.password, 10);
        await User.create(data)
        user = await User.findOne({ email, status: 'active' })
    }

    return jwtToken({ _id: user._id, password });

}



module.exports = {
    login,
    createAndLogin
}