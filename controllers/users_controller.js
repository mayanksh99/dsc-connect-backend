const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.generateCode = (length) => {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return code;
};

module.exports.register = async (req, res) => {
  let { name, email, password } = req.body;
  let user = await User.findOne({
    email: { $regex: `^${email}$`, $options: "i" },
  });
  if (user) {
    res.status(400).json({
      message: "Email already in use.",
      error: true,
      data: null,
    });
  } else {
    try {
      let code = this.generateCode(20);
      let Email = String(email).trim();
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASS, // generated ethereal password
        },
      });

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"DSC CONNECT" <devsdsckiet@gmail.com>', // sender address
        to: Email, // list of receivers
        subject: "Verification Email", // Subject line
        html: `Please click on this link to verify your account. https://dsc-connect.netlify.app/verify/${code}`, // html body
      });
      let newUser = {
        name: String(name).trim(),
        email: String(email).trim(),
        verifyToken: String(code),
      };
      const salt = await bcrypt.genSalt(10);
      newUser["password"] = await bcrypt.hash(password, salt);
      user = await User.create(newUser);
      let token = user.generateAuthToken();
      res.status(200).header("x-auth-token", token).json({
        message: "Successfully Registered",
        error: false,
        data: user,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Something went wrong", error: true, data: null });
    }
  }
};

module.exports.login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({
    email: { $regex: `^${email}$`, $options: "i" },
  });
  if (user) {
    let validPassword = await bcrypt.compare(
      String(password),
      String(user.password)
    );
    if (!validPassword) {
      return res.status(403).json({
        message: "Invalid password",
        error: true,
        data: null,
      });
    } else {
      let token = user.generateAuthToken();
      res.status(200).header("x-auth-token", token).json({
        message: "Login Successful",
        error: null,
        data: user,
      });
    }
  } else {
    res.status(401).json({
      message: "Invalid User",
      error: true,
      data: null,
    });
  }
};

module.exports.profile = async (req, res) => {
  let user = await User.findById(req.user.id);
  if (user) {
    res.status(200).json({ message: "success", error: false, data: user });
  } else {
    res.status(400).json({
      message: "No User found",
      error: true,
      data: null,
    });
  }
};
