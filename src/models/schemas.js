const mongoose = require("mongoose");

const Test = new mongoose.Schema({
  userId: { type: Number, default: 0 },
  guildId: { type: Number, default: 0 },
});

const User = new mongoose.Schema({
  id: { type: String, unique: true, required: true },

  ticketOpen: { type: Boolean, default: false },
  tickets: { type: Number, default: 0 },

  wallet: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  cooldowns: {
    daily: { type: Date },
    channels: { type: Number, default: 0 },
    beg: { type: Date }
  },

  perks: { type: Object, default: {} },

  playlists: { type: Array, default: [] },
  favorites: { type: Array, default: [] },
  playHistory: { type: Array, default: [] },

});

const Playlists = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  listening: { type: Array, default: [] }
})

const Transactions = new mongoose.Schema({
  id: { type: Number, unique: true, required: true, default: 007 },
  total: { type: Number, unique: true, default: 0 }
})

const Guild = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  owner: { type: String, unique: true },

  openTicketSource: { type: Object, default: {} },
  ticketChannel: { type: Object, default: {} },
  openTickets: { type: Array, default: [] },

  channels: { type: Object, default: {} },
  admins: { type: Object, default: {} },

  musicChannel: { type: String, default: null },
  tempMessage: { type: String, default: null },
  isPlaying: { type: Boolean, default: false },
  voiceChannel: { type: String, default:null},
  isPaused: { type: Boolean, default: false },
  paused: { type: String, default: null },
});

class Channel {
  constructor(
    channel,
    childName = String,
    userLimit = Number,
    type = Number,
    name = String,
    channelType = 2
  ) {
    this.channelId = channel.id;
    this.rooms = [];
    this.type = type;
    this.name = name;
    this.channelType = channelType;
    this.position = channel.rawPosition + 1;
    this.parent = channel.parentId;
    this.userLimit = userLimit;
    this.childName = childName;
  }

  build() {
    const obj = {
      [`${this.channelId}`]: {
        name: this.name,
        type: this.type,
        rooms: this.rooms,
        id: this.channelId,
        configs: {
          name: this.childName,
          type: this.channelType,
          position: this.position,
          parent: this.parent,
          userLimit: this.userLimit,
        }
      },
    };
    return obj;
  }
}

module.exports = {
  User: mongoose.model("User", User),
  Guild: mongoose.model("Guild", Guild),
  Channel: Channel,
  Test: mongoose.model("Test", Test),
  Transactions: mongoose.model("Transactions", Transactions),
  Playlists: mongoose.model("Playlists", Playlists)
};