import { Channel } from "./Channel";
import { Profile } from "./Profile";

export class Room {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.Creator = new Profile(data.creator);
    this.Channel = new Channel(data.channel);
  }
}
