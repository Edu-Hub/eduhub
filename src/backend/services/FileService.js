const connection = require("../db/connection");
const {Group, User, Subject, Directory, File} = require("../model");
const {v4: uuidv4} = require('uuid');

module.exports = {
    createFile: async (groupId, parentDirectoryId, fileName, fileUrl, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");
        const parentDirectory = await Directory.findByPk(parentDirectoryId);
        parentDirectory.createFile({name: fileName, url: fileUrl});
        await parentDirectory.save();

        return parentDirectory;
    }, deleteFile: async (groupId, parentDirectoryId, fileId, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");
        const file = await File.findByPk(fileId);
        await file.destroy()
        return file;
    }
}
