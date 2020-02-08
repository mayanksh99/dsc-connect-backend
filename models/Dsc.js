const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");

//require("dotenv").config();

const DscSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    domains: {
      type: String,
      required: true
    },
    webLink: {
      type: String
    },
    fbLink: {
      type: String
    },
    instaLink: {
      type: String
    },
    twitterLink: {
      type: String
    },
    linkedinLink: {
      type: String
    },
    mediumLink: {
      type: String
    },
    youtubeLink: {
      type: String
    },
    githubLink: {
      type: String
    }
  },
  { timestamps: true }
);

// UserSchema.methods.generateAuthToken = function() {
//     const token = jwt.sign(
//         {
//             id: this._id,
//             name: this.name,
//             email: this.email,
//             isAdmin: this.isAdmin
//         },
//         process.env.JWT_PRIVATE_KEY
//     );
//     return token;
// };

module.exports = Dsc = mongoose.model("Dsc", DscSchema);
