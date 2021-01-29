const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const STATUS = ["blocked", "active", "pending"];

const _Schema = new Schema({
    video_id : { type: Schema.Types.ObjectId, require: true },
    status: {type: Boolean, default:true},
    receiver_by: { type: Schema.Types.ObjectId, require: true },
    created_by: { type: Schema.Types.ObjectId, require: true }
});


function validateCreate(data) {
    const schema = {
        video_id: Joi.string().required(),
        status: Joi.boolean(),
        receiver_by: Joi.string().required(),
        created_by: Joi.string().required(),
 
    };
    return Joi.validate(data, schema);
}

function validateEdit(data) {
    const schema = {
        video_id: Joi.string().required(),
        status: Joi.boolean(),
        receiver_by: Joi.string().required(),
        created_by: Joi.string().required()
    };
    return Joi.validate(data, schema);
}


/**
 * Statics
 */


const Notifications = mongoose.model("Notifications", _Schema);
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Notifications = Notifications;
// exports.validateLogin = validateLogin;