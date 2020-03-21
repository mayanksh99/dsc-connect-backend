const mongoose = require("mongoose");

const DscSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    size: { type: Number, required: true },
    domains: { type: Array, required: true },
    webLink: { type: String },
    fbLink: { type: String },
    instaLink: { type: String },
    twitterLink: { type: String },
    linkedinLink: { type: String },
    mediumLink: { type: String },
    youtubeLink: { type: String },
    githubLink: { type: String },
    isPublished: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = Dsc = mongoose.model("Dsc", DscSchema);
