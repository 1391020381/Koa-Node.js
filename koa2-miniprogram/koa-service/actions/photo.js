const album = require('../lib/db/album')
const photo = require('../lib/db/photo')
module.exports = {
  async addAlbum(userId,name){
    return album.add(userId,name) 
  },
  async updateAlbum(id,name,user){
    const _album = await album.findById(id)
    if(!_album){
      throw new Error('修改的相册不存在')
    }
    if(!user.isAdmin && user.id!==_album.userId){
      throw new Error('你没有权限修改次相册')
    }
    return album.update(id,name)
  },
  async deleteAlbum(id){
    const photos = await photo.getPhotosByAlbumIdCount(id)
  },
  async getAlbum(userId,pageIndex,pageSize){ // 根据 userId 查询 所有 相册 
    const albums = await album.getAlbums(userId)
    return Promise.all(albums.map(async function(item){
      const id = item._id
      let ps = await photo.getPhotosByAlbumId(id)
     return Object.assign({
       photoCount:ps.length,
       fm:ps[0]?ps[0].url:null
     },item.toObject())
    }))
  },
  async getPhotosByAlbumId(albumId) {
    return  await photo.getPhotosByAlbumId(albumId)
  },
  async add(userId,url,albumId){
    return photo.add(userId,url,albumId)
  }
}