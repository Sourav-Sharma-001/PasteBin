const express = require("express");
const { nanoid } = require("nanoid");
const Paste = require("../models/Paste");

const router = express.Router();

router.post("/", async (req, res) => {
  const { text, ttl, maxViews } = req.body;

  if (!text || !ttl || !maxViews) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const uniqueId = nanoid(8);

  try {
    await Paste.create({
      text,
      ttl,
      maxViews,
      uniqueId
    });

    res.json({ message: "Paste created", url: `/pastes/${uniqueId}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to create paste" });
  }
});

module.exports = router;
