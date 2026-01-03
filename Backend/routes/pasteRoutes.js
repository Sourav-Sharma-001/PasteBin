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
      uniqueId,
      expiresAt: new Date(Date.now() + ttl * 60 * 1000)
    });    

    res.json({ message: "Paste created", url: `/pastes/${uniqueId}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to create paste" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const paste = await Paste.findOne({ uniqueId: req.params.id });

    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }

    const now = Date.now();
    const expiresAt = paste.createdAt.getTime() + paste.ttl * 60 * 1000;

    if (now > expiresAt) {
      return res.status(410).json({ error: "Paste expired" });
    }

    if (paste.views >= paste.maxViews) {
      return res.status(410).json({ error: "Max views reached" });
    }

    paste.views += 1;
    await paste.save();

    res.json({ text: paste.text });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch paste" });
  }
});


module.exports = router;
