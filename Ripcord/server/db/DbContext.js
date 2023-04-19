import mongoose, { mongo } from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ChannelSchema } from "../models/Channel";
import { UserSchema } from "../models/User";
import { MessageSchema } from "../models/Message";
import { RoomsSchema } from "../models/Room";
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Channels = mongoose.model("Channel", ChannelSchema);
  Users = mongoose.model("User", UserSchema);
  Messages = mongoose.model("Message", MessageSchema);
  Rooms = mongoose.model("Room", RoomsSchema);
}

export const dbContext = new DbContext()
