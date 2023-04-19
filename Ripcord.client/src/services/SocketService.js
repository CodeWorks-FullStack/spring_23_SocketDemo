import { applyStyles } from "@popperjs/core";
import { AppState } from "../AppState";
import { Channel } from "../models/Channel";
import { Message } from "../models/Message";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { SocketHandler } from "../utils/SocketHandler";

class SocketService extends SocketHandler {
  constructor() {
    super();
    this.on("error", this.onError)
      .on("s:created:channel", this.createdChannel)
      .on("s:created:message", this.createdMessage)
      .on("s:joined:room", this.joiningRoom)
      .on("s:leaving:room", this.leavingRoom)
      .on("s:created:messageUser", this.messageUser);
  }

  onError(e) {
    Pop.toast(e.message, "error");
  }

  createdChannel(payload) {
    let newChannel = new Channel(payload);
    if (!payload) {
      throw new Error("Sorry, something went wrong with the payload.");
    } else {
      if (AppState.account.id != newChannel.creatorId) {
        Pop.toast(`
      ${newChannel.name} was just created, go check it out!
      `);
      }
    }
    AppState.channels.push(newChannel);
  }

  createdMessage(payload) {
    const message = new Message(payload);
    AppState.messages.push(message);
  }

  joiningRoom(payload) {
    if (payload && AppState.account.id != payload.id) {
      Pop.toast(
        `
      <h5>${payload.nickname} has joined the room.</h5>
      `,
        null
      );
    }
  }

  leavingRoom(payload) {
    if (payload && AppState.account.id != payload.id) {
      Pop.toast(
        `
        <h5 class="text-danger bg-warning">${payload.nickname} has left the room</h5>
        `
      );
    }
  }

  messageUser(payload) {
    Pop.toast(
      `
    ${payload.creator.name} just posted in ${payload.channel.name}
    `,
      "info"
    );
  }
}

export const socketService = new SocketService();
