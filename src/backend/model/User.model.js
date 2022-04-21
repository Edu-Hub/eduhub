const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: String, email: String, password: String, avatarUrl: String, groupsId: [String], isOAuth: Boolean
});

module.exports = mongoose.models.User || mongoose.model("User", schema);
