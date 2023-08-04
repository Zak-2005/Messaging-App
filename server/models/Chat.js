const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
