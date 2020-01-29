const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/url");

exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json({ success: false, error: "Invalid base url" });
  }

  // Create url code
  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.status(200).json({ success: true, url });
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.status(200).json({ success: true, url });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  } else {
    res.status(400).json({ success: false, error: "Invalid long url" });
  }
};
