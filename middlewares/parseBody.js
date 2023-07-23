const parseBody = async (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  next();
};

module.exports = parseBody;
