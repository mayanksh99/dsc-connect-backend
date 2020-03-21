let emailRegex = /^\S+@\S+\.\S+/,
  passwordRegex = /^[\S]{8,}/,
  urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

module.exports.userValidation = (req, res, next) => {
  let { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({
      message: "All fields are mandatory",
      error: true,
      data: req.body
    });
  }
  if (emailRegex.test(String(email))) {
    if (passwordRegex.test(String(password))) {
      return next();
    } else {
      res.status(400).json({
        message: "Password must be atleast 8 characters long",
        error: true,
        data: req.body
      });
    }
  } else {
    res.status(400).json({
      message: "EmailID is not valid",
      error: true,
      data: req.body
    });
  }
};

module.exports.dataValidation = (req, res, next) => {
  let {
    name,
    city,
    state,
    country,
    domain,
    size,
    webLink,
    fbLink,
    instaLink,
    twitterLink,
    linkedinLink,
    mediumLink,
    githubLink,
    youtubeLink
  } = req.body;
  if (
    !name ||
    !city ||
    !state ||
    !country ||
    !domain ||
    !size ||
    !webLink ||
    !fbLink ||
    !instaLink ||
    !twitterLink ||
    !linkedinLink ||
    !mediumLink ||
    !githubLink ||
    !youtubeLink
  ) {
    res.status(400).json({
      message: "All fields are required.",
      error: true,
      data: req.body
    });
  }
  if (urlRegex.test(String(webLink))) {
    return next();
  } else {
    res.status(400).json({
      message: "Website Link is not valid",
      error: true,
      data: req.body
    });
  }
  if (urlRegex.test(String(fbLink))) {
    return next();
  } else {
    res.status(400).json({
      message: "Facebook Link is not valid",
      error: true,
      data: req.body
    });
  }
  if (urlRegex.test(String(instaLink))) {
    return next();
  } else {
    res.status(400).json({
      message: "Instagram Link is not valid",
      error: true,
      data: req.body
    });
  }
  if (urlRegex.test(String(twitterLink))) {
    return next();
  } else {
    res.status(400).json({
      message: "Twitter Link is not valid",
      error: true,
      data: req.body
    });
  }
  if (urlRegex.test(String(mediumLink))) {
    return next();
  } else {
    res.status(400).json({
      message: "Medium Link is not valid",
      error: true,
      data: req.body
    });
  }
  if (urlRegex.test(String(linkedinLink))) {
    return next();
  } else {
    res.status(400).json({
      message: "LinkedIn Link is not valid",
      error: true,
      data: req.body
    });
  }
  if (urlRegex.test(String(youtubeLink))) {
    return next();
  } else {
    res.status(400).json({
      message: "Youtube Link is not valid",
      error: true,
      data: req.body
    });
  }
  if (urlRegex.test(String(githubLink))) {
    return next();
  } else {
    res.status(400).json({
      message: "Github Link is not valid",
      error: true,
      data: req.body
    });
  }
};
