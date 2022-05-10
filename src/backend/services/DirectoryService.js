const connection = require("../db/connection");
const {Group, User, Subject, Directory, File} = require("../model");
const {v4: uuidv4} = require('uuid');

module.exports = {
    getDirectory: async (groupId, directoryId, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");

        const directory = await Directory.findByPk(directoryId, {include: [{model: Directory, as: "Child"}, File]});
        console.log("DIRECTORY", directory, directoryId)
        return directory;
    }, createDirectory: async (groupId, parentDirectoryId, directoryName, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");
        const parentDirectory = await Directory.findByPk(parentDirectoryId);
        parentDirectory.createChild({name: directoryName});
        await parentDirectory.save();
        return parentDirectory;
    }, deleteDirectory: async (groupId, loggedInUser) => {
    }
}