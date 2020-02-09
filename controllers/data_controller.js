module.exports.getData = async (req, res) => {
  let filter = {};
  let data;
  data = await Dsc.find(filter).sort({ createdAt: "desc" });
  res.status(200).json({ message: "success", error: false, data });
};

module.exports.addData = async (req, res) => {
  let data = await Dsc.create(req.body);
  res.status(200).json({ message: "success", error: false, data });
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
  let data = await Dsc.findById(req.params.id);
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
    data = await Dsc.findById(req.params.id);
    res.status(200).json({ message: "success", error: false, data });
  } else {
    res.status(400).json({
      message: "Invalid Data",
      error: true,
      data: null
    });
  }
};

module.exports.deleteData = async (req, res) => {
  let data = await Dsc.findById(req.params.id);
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
