const { Notifications } = require('../../models/notifications');

const getMany = () => {
    return Notifications.find();
}

const getJoinMany = () => {


  return Notifications.find().populate([
    {
      path : "videoDetail"
    },
    {
      path : "created"
    },
    {
      path : "receiver"
    },
  ]);
}

const getOne = (id) => {
  return Notifications.findById(id);
}

const create = (data) => {
    return Notifications.create(data);
  }
  
  const update = (id,data) => {
    return Notifications.findById(id).update(data)
  }
  
  const deleteOne = (id) => {
    return Notifications.findByIdAndRemove(id)
  }
  
  const deleteMany = (ids) => {
    return Notifications.deleteMany(
      {
          _id: { $in: ids },
      })
  }

module.exports = {
    getMany,
    getOne,
    create,
    update,
    deleteOne,
    deleteMany,
    getJoinMany
}