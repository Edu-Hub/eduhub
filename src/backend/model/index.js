const User = require("./User");
const Group = require("./Group");
User.hasMany(Group, {foreignKey: "adminId"});
Group.belongsTo(User, {foreignKey: "adminId"});
module.exports = {User, Group};
