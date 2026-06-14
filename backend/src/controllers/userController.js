const profile = async (req, res) => {
  res.status(200).json({
    success: true,
    userId: req.user.id,
  });
};

module.exports = {
  profile,
};
