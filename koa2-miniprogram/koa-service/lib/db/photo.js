const { Photo } = require('./model')

module.exports = {
  async getPhotosByAlbumIdCount(albumId) {
    return Photo.count({
      albumId,
      isApproved: true,
      isDelete: false
    })
  },
  async add(userId,url,albumId) {
    return Photo.create({
      userId,
      url,
      albumId
    })
  },
  async getPhotosByAlbumId (albumId,pageIndex, pageSize){
    console.log('albumId:',albumId)
    let result = ''
    if (pageSize) {
      result = await Photo.find({
        albumId
      })
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize)
    } else {
      result = await Photo.find({albumId}).sort({
        updated: -1
      })
    }
    return result
  }
}
