const connection = require("../db/connection");
const {Group} = require("../model");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createGroup: async (groupName, user) => {
        await connection.sync();
        return await user.createGroup({name: groupName, code: uuidv4()});
    }, updateGroup: async (groupId, newGroupName, loggedInUser) => {
        await connection.sync();
        const group = await Group.findByPk(groupId);
        if (!group) throw Error("Group not found");
        if ((await group.getUser()).id !== loggedInUser.id) throw Error("Cannot change a group not yours.");
        group.set({name: newGroupName});
        return await group.save();
    }, deleteGroup: async (groupId, loggedInUser) => {
        await connection.sync();
        const group = await Group.findByPk(groupId);
        if (!group) throw Error("Group not found");
        if ((await group.getUser()).id !== loggedInUser.id) throw Error("Cannot delete a group not yours.");
        return await group.destroy();
    },
}
