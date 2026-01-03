const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  ttl: { type: Number, required: true },
  maxViews: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  uniqueId: { type: String, required: true, unique: true }
});

const Paste = mongoose.model("Paste", pasteSchema);

module.exports = Paste;
