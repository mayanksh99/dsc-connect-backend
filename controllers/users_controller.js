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
        html: `<!DOCTYPE html>
        <html>
          <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
              @media screen {
                @font-face {
                  font-family: "Sen";
                  font-style: normal;
                  font-weight: 400;
                  src: local("Sen Regular"), local("Sen-Regular"),
                    url(https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&display=swap)
                      format("woff");
                }
              }
        
              /* CLIENT-SPECIFIC STYLES */
              body,
              table,
              td,
              a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
        
              table,
              td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }
        
              img {
                -ms-interpolation-mode: bicubic;
              }
        
              /* RESET STYLES */
              img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
              }
        
              table {
                border-collapse: collapse !important;
              }
        
              body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
              }
        
              /* iOS BLUE LINKS */
              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
              }
        
              /* MOBILE STYLES */
              @media screen and (max-width: 600px) {
                h1 {
                  font-size: 32px !important;
                  line-height: 32px !important;
                }
              }
        
              /* ANDROID CENTER FIX */
              div[style*="margin: 16px 0;"] {
                margin: 0 !important;
              }
            </style>
          </head>
        
          <body
            style="
              background-color: #f4f4f4;
              margin: 0 !important;
              padding: 0 !important;
            "
          >
            <!-- HIDDEN PREHEADER TEXT -->
            <div
              style="
                display: none;
                font-size: 1px;
                color: #fefefe;
                line-height: 1px;
                font-family: 'Sen', sans-serif;
        
                max-height: 0px;
                max-width: 0px;
                opacity: 0;
                overflow: hidden;
              "
            >
              We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <!-- LOGO -->
              <tr>
                <td bgcolor="#4285f4" align="center">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 600px;"
                  >
                    <tr>
                      <td
                        align="center"
                        valign="top"
                        style="padding: 40px 10px 40px 10px;"
                      ></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  bgcolor="#4285f4"
                  align="center"
                  style="padding: 0px 10px 0px 10px;"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 600px;"
                  >
                    <tr>
                      <td
                        bgcolor="#ffffff"
                        align="center"
                        valign="top"
                        style="
                          padding: 40px 20px 20px 20px;
                          border-radius: 4px 4px 0px 0px;
                          color: #111111;
                          font-family: 'Sen', sans-serif;
                          font-size: 48px;
                          font-weight: 400;
                          letter-spacing: 4px;
                          line-height: 48px;
                        "
                      >
                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;">
                          Welcome to
                        </h1>
                        <img
                          src="./logo.svg"
                          width="50%"
                          style="display: block; border: 0px;"
                        />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  bgcolor="#f4f4f4"
                  align="center"
                  style="padding: 0px 10px 0px 10px;"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 600px;"
                  >
                    <tr>
                      <td
                        bgcolor="#ffffff"
                        align="left"
                        style="
                          padding: 20px 30px 40px 30px;
                          color: #666666;
                          font-family: 'Sen', sans-serif;
        
                          font-size: 18px;
                          font-weight: 400;
                          line-height: 25px;
                        "
                      >
                        <p style="margin: 0;">
                          We're excited to have you get started. First, you need to
                          confirm your account. Just press the button below.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#ffffff" align="left">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td
                              bgcolor="#ffffff"
                              align="center"
                              style="padding: 20px 30px 60px 30px;"
                            >
                              <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td
                                    align="center"
                                    style="border-radius: 3px;"
                                    bgcolor="#0f9d58"
                                  >
                                    <a
                                      href="Please click on this link to verify your account. https://dsc-connect.netlify.app/verify/${code}"
                                      target="_blank"
                                      style="
                                        font-size: 20px;
                                        font-family: 'Sen', sans-serif;
        
                                        color: #ffffff;
                                        text-decoration: none;
                                        color: #ffffff;
                                        text-decoration: none;
                                        padding: 15px 25px;
                                        border-radius: 2px;
                                        border: 1px solid #0f9d58;
                                        display: inline-block;
                                      "
                                      >Confirm Account</a
                                    >
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- COPY -->
        
                    <tr>
                      <td
                        bgcolor="#ffffff"
                        align="left"
                        style="
                          padding: 0px 30px 40px 30px;
                          border-radius: 0px 0px 4px 4px;
                          color: #666666;
                          font-family: 'Sen', sans-serif;
                          font-size: 18px;
                          font-weight: 400;
                          line-height: 25px;
                        "
                      >
                        <p style="margin: 0;">Cheers,<br />Community Connect Team</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  bgcolor="#f4f4f4"
                  align="center"
                  style="padding: 30px 10px 0px 10px;"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 600px;"
                  >
                    <tr>
                      <td
                        bgcolor="#f0f6ff"
                        align="center"
                        style="
                          padding: 30px 30px 30px 30px;
                          border-radius: 4px 4px 4px 4px;
                          color: #666666;
                          font-family: 'Lato', Helvetica, Arial, sans-serif;
                          font-size: 18px;
                          font-weight: 400;
                          line-height: 25px;
                        "
                      >
                        <h2
                          style="
                            font-size: 20px;
                            font-weight: 400;
                            color: #111111;
                            margin: 0;
                          "
                        >
                          Need more help?
                        </h2>
                        <p style="margin: 0;">
                          <a
                            href="mailto:devsdsckiet@gmail.com"
                            target="_blank"
                            style="color: #f4b400;"
                            >We&rsquo;re here to help you out</a
                          >
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `, // html body
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
