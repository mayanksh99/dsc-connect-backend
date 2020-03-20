module.exports.verify = async (req, res) => {
  let user = await User.findOne(req.params);
  if (user) {
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "success", error: false, data: user });
  } else {
    res
      .status(400)
      .json({ message: "Not a valid token", error: true, data: null });
  }
};
