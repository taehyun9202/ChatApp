const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  }
}
, {timestamps: true});


module.exports = mongoose.model("Message", MessageSchema);