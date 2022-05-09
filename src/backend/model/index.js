const User = require("./User");
const Group = require("./Group");
const Subject = require("./Subject");
const Directory = require("./Directory");
const File = require("./File");

User.hasMany(Group, {as: "AdministratedGroup", foreignKey: "adminId"});
Group.belongsTo(User, {as: "Admin", foreignKey: "adminId"});

User.belongsToMany(Group, {through: "UserGroups"});
Group.belongsToMany(User, {through: "UserGroups"});

Group.hasMany(Subject);
Subject.belongsTo(Group);

Subject.hasOne(Directory, {foreignKey: "RootDirectoryId"});
Directory.belongsTo(Subject);

Directory.hasMany(Directory, {as: "Child"});
Directory.hasOne(Directory, {as: "Parent"})

Directory.hasMany(File);
File.belongsTo(Directory);

module.exports = {User, Group, Subject, Directory, File};