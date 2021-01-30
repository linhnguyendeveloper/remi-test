const { VideoDetails } = require('../../models/videoDetails');

const getMany = (query={}) => {
    return VideoDetails.find(query);
}

const getOne = (id) => {
  return VideoDetails.findById(id);
}

const create = (data) => {
    return VideoDetails.create(data);
  }
  
  const update = (id,data) => {
    return VideoDetails.findById(id).update(data)
  }
  
  const deleteOne = (id) => {
    return VideoDetails.findByIdAndRemove(id)
  }
  
  const deleteMany = (ids) => {
    return VideoDetails.deleteMany(
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
    deleteMany
}