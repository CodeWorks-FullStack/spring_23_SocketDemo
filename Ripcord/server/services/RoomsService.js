import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class RoomsService{
  async getOne(roomId) {
    let room = await dbContext.Rooms.findById(roomId).populate("creator", 'name picture').populate("channel", 'name description creatorId')
    if(room == null) {
      throw new BadRequest('Sorry, there is no Room with that Id.')
    }
    return room
  }
  async create(roomData) {
    let room = await dbContext.Rooms.create(roomData)
    await room.populate("creator", 'name picture')
    await room.populate('channel', 'name description creatorId')
    return room
  }
  async edit(roomData) {
    let originalRoom = await this.getOne(roomData.id)
    if(originalRoom.creatorId != roomData.creatorId) {
      throw new Forbidden('Sorry, you do not have permission to edit this.')
    }
    originalRoom.title = roomData.title || originalRoom.title
    await originalRoom.save()
    return originalRoom
  }
  async delete(roomId, userId) {
    let room = await this.getOne(roomId)
    if(room.creatorId != userId) {
      throw new Forbidden('Sorry, you do not have permission to delete this.')
    }
    await room.remove()
    return `Successfully removed room ${room.title}.`
  }

}

export const roomsService = new RoomsService()
