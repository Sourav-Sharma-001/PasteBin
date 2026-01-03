const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  ttl: { type: Number, required: true },
  maxViews: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  views: { type: Number, default: 0 },
  uniqueId: { type: String, required: true, unique: true }
});

pasteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Paste", pasteSchema);
