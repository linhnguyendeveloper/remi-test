const { User } = require('../../models/users');

const { jwtToken, pareJwtToken } = require("../../utils/func");
const constants = require('../../utils/constants')


const config = require('../../../config/index');


const login = async (body) => {
    
    const { email, password } = body;

    let user = await User.findOne({ email, status: 'active' }).exec();

    if (!user || !user.checkPassword(password)){
        return res.status(constants.CODE.BAD_REQUEST).json({'errors ':"wrong email or password"});
    }

    return jwtToken({ _id: user._id ,password});

}

const updateRoles = (id, data) => {
    return new Promise(async (rs, rj) => {
        try {
            console.log(id, data);
            const updated = await Role.findOneAndUpdate(
                { _id: id },
                { $set: {
                        "menu.$[element]": data
                    }
                },
                { arrayFilters: [
                        {
                            'element.name': {
                                $eq: data.name
                            }
                        }
                    ]
                })

            rs({
                updated
            })
        } catch (error) {
            rj({ error })
        }
    });

}
  

module.exports = {
    login,
    updateRoles
}