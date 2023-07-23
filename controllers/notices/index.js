const { add } = require("./add");
const { deleteById } = require("./deleteById");
const { getAll } = require("./getAll");
const { getAllOwner } = require("./getAllOwner");
const { getById } = require("./getById");
const { addFavorite } = require("./addFavorite");
const { deleteFavorite } = require("./deleteFavorite");

module.exports = {
  add,
  deleteById,
  getAll,
  getAllOwner,
  getById,
  deleteFavorite,
  addFavorite,
};
