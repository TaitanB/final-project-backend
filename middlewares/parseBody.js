const parseBody = async (req, res, next) => {
  req.body = JSON.parse(req.body);
  next();

  // try {
  //   if (req.body.data && typeof req.body.data === "string") {
  //     req.body = JSON.parse(req.body.data);
  //   } else {
  //     req.body = {};
  //   }
  //   next();
  // } catch (error) {
  //   console.log("parseBody");
  //   res.status(400).json({ error: "Invalid JSON data" });
  // }
};

module.exports = parseBody;
