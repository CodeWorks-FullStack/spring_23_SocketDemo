import { SocketHandler } from '../utils/SocketHandler'

export class RoomHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('SOCKET_TEST', this.testEvent)
      .on('c:joining:room', this.joinRoom)
      .on('c:leaving:room', this.leavingRoom)
  }

  async testEvent(payload) {
    this.socket.emit('IS_TESTED', payload)
  }

  joinRoom(payload) {
    if(!payload.roomName) {
      this.socket.emit('error', {error: 'Please provide a room name.'})
      return
    }
    this.socket.join(payload.roomName)
    this.io.to(payload.roomName).emit('s:joined:room', this.user)
  }

  leavingRoom(payload) {
    if(!payload.roomName) {
      this.socket.emit('error', {error: 'Please provide a room name.'})
      return
    }
    this.socket.leave(payload.roomName)
    this.io.to(payload.roomName).emit('s:left:room', this.user)
  }

}
