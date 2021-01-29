const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const _Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    like: { type: Number, default:0 },
    disLike: { type: Number, default:0 },
    status: {type: Boolean, default:true},
    created_by: { type: Schema.Types.ObjectId, require: true },
});


function validateCreate(data) {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        url: Joi.string().required(),
        like: Joi.number(),
        disLike: Joi.number(),
        status: Joi.boolean(),
        created_by: Joi.string().required(),
 
    };
    return Joi.validate(data, schema);
}

function validateEdit(data) {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        url: Joi.string().required(),
        like: Joi.number(),
        disLike: Joi.number(),
        status: Joi.boolean(),
        created_by: Joi.string().required(),
    };
    return Joi.validate(data, schema);
}


/**
 * Statics
 */


const VideoDetails = mongoose.model("VideoDetails", _Schema);
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.VideoDetails = VideoDetails;
// exports.validateLogin = validateLogin;