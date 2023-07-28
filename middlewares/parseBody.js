const parseBody = async (req, res, next) => {
  try {
    if (req.body && typeof req.body === "string") {
      req.body = JSON.parse(req.body);
    }
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON data" });
  }
};

module.exports = parseBody;
