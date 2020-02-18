module.exports.getData = async (req, res) => {
  let filter = {};
  // if (req.query.location) {
  //   filter = {
  //     city: req.query.location,
  //     state: req.query.location,
  //     country: req.query.location
  //   };
  //   console.log(filter);
  // }
  if (req.query.name) {
    filter = { name: req.query.name, ...filter };
  }
  if (req.query.domain) {
    filter = { domains: req.query.domain, ...filter };
  }
  let data;
  let id = req.query.id;
  if (id) {
    data = await Dsc.findOne({ user: id });
    res.status(200).json({ message: "success", error: false, data });
  } else if (req.query.location) {
    let city = { city: req.query.location };
    let state = { state: req.query.location };
    let country = { country: req.query.location };
    data = await Dsc.find(state || city || country).sort({
      createdAt: "desc"
    });
    res.status(200).json({ message: "success", error: false, data });
  } else {
    data = await Dsc.find(filter).sort({ createdAt: "desc" });
    res.status(200).json({ message: "success", error: false, data });
  }
};

module.exports.addData = async (req, res) => {
  let prevData = await Dsc.findOne({ user: req.user.id });
  if (!prevData) {
    let newUser = { user: req.user.id, ...req.body };
    let data = await Dsc.create(newUser);
    res
      .status(200)
      .json({ message: "Request success. Status pending", error: false, data });
  } else {
    res
      .status(200)
      .json({ message: "DSC is already registered", error: false });
  }
};

module.exports.updateData = async (req, res) => {
  let {
    size,
    domains,
    webLink,
    fbLink,
    instaLink,
    twitterLink,
    linkedinLink,
    mediumLink,
    youtubeLink,
    githubLink,
    dribbleLink,
    pinterestLink
  } = req.body;
  let data = await Dsc.findOne({ user: req.params.id });
  if (data) {
    data.size = size;
    data.domains = domains;
    data.webLink = webLink;
    data.fbLink = fbLink;
    data.instaLink = instaLink;
    data.twitterLink = twitterLink;
    data.linkedinLink = linkedinLink;
    data.mediumLink = mediumLink;
    data.youtubeLink = youtubeLink;
    data.githubLink = githubLink;
    data.dribbleLink = dribbleLink;
    data.pinterestLink = pinterestLink;
    await data.save();
    data = await Dsc.findOne({ user: req.params.id });
    res
      .status(200)
      .json({ message: "Request success. Status pending", error: false, data });
  } else {
    res.status(400).json({
      message: "Invalid Data",
      error: true,
      data: null
    });
  }
};

module.exports.deleteData = async (req, res) => {
  let data = await Dsc.findOne({ user: req.params.id });
  if (data) {
    await data.delete();
    res.status(200).json({ message: "success", error: false, data: null });
  } else {
    res.status(400).json({
      message: "Invalid Dsc",
      error: true,
      data: null
    });
  }
};
