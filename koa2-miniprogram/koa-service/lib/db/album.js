const { Album } = require('./model')
module.exports = {
  async add(userId, name) {
    return Album.create({
      userId,
      name
    })
  },
  async findById(id, name) {
    return Album.findById(id)
  },
  async update(id, name) {
    //  Model.update(conditions, doc, [options], [callback])
    return Album.update(
      {
        _id: id
      },
      {
        name: name
      }
    )
  },
  async delete(id) {
    return Album.remove(id)
  },
  async getAlbums(userId, pageIndex, pageSize) {
    let result
    if (pageSize) {
      result = await Album.find({
        userId
      })
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize)
    } else {
      result = await Album.find(userId).sort({
        updated: -1
      })
    }
    return result
  },
  async getPhotosByAlbumId(albumId,pageIndex,pageSize){
    return await Phopto.find({
      albumId,
      isApproved:true,
      isDelete:false
    }).sort({
      'updated':-1
    })
  }
}
