const getQueryParameters = (options = {}, owner) => {
  const { category, query } = options;
  const queryParameters = {};

  if (owner) {
    queryParameters.owner = owner;
  }

  if (category) {
    queryParameters.category = category;
  }

  if (query) {
    queryParameters.$or = [
      { title: { $regex: query, $options: "i" } },
      { comments: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { type: { $regex: query, $options: "i" } },
    ];
  }

  return queryParameters;
};

module.exports = getQueryParameters;
