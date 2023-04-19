import { AppState } from "../AppState";
import { Channel } from "../models/Channel";
import { Message } from "../models/Message";
import { NewUser } from "../models/NewUser";
import { User } from "../models/User";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { SocketHandler } from "../utils/SocketHandler";

class SocketService extends SocketHandler {
  constructor() {
    super();
    this.on("error", this.onError)
      .on("s:created:channel", this.createdChannel)
      .on("s:created:message", this.createdMessage)
      .on("s:created:messageCreator", this.messageCreator)
      .on("s:joined:room", this.joinRoom)
      .on("s:left:room", this.leftRoom);
  }

  onError(e) {
    Pop.toast(e.message, "error");
  }

  createdChannel(payload) {
    logger.log("CREATED CHANNEL", payload);
    if (!payload) {
      throw new Error("Sorry, something went wrong with the payload.");
    }
    const newChannel = new Channel(payload);
    if (AppState.account.id != newChannel.creatorId) {
      Pop.toast(`${newChannel.name}, was just created. Check it out!`);
    }
    AppState.channels.push(newChannel);
  }

  createdMessage(payload) {
    const newMessage = new Message(payload);
    AppState.messages.push(newMessage);
  }

  messageCreator(payload) {
    logger.log(payload, "Message Creator");
    if (!AppState.channel || AppState.channel.id != payload.roomId) {
      Pop.toast(
        `${payload.creator.name} just posted in ${payload.channel.name}.`,
        "info"
      );
    }
  }

  joinRoom(payload) {
    if (payload && AppState.account.id != payload.id) {
      Pop.toast(
        `
        <p>${payload.nickname} has entered chat.</p>
        `
      );
    }
  }

  leftRoom(payload) {
    logger.log("LEAVING ROOM", payload);
    if (payload && AppState.account.id != payload.id) {
      Pop.toast(
        `
        <p>${payload.nickname} has left chat.</p>
        `
      );
    }
  }
}

export const socketService = new SocketService();
