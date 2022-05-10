const connection = require("../db/connection");
const {Group, User, Subject} = require("../model");
const {v4: uuidv4} = require('uuid');

module.exports = {
    createGroup: async (groupName, user) => {
        await connection.sync();
        const group = await user.createAdministratedGroup({name: groupName, code: uuidv4()});
        return await group.addUser(user);
    }, updateGroup: async (groupId, newGroupName, loggedInUser) => {
        await connection.sync();
        const group = await Group.findByPk(groupId);
        if (!group) throw Error("Group not found");
        if ((await group.getAdmin()).id !== loggedInUser.id) throw Error("Cannot change a group not yours.");
        group.set({name: newGroupName});
        return await group.save();
    }, deleteGroup: async (groupId, loggedInUser) => {
        await connection.sync();
        const group = await Group.findByPk(groupId);
        if (!group) throw Error("Group not found");
        if ((await group.getAdmin()).id !== loggedInUser.id) throw Error("Cannot delete a group not yours.");
        return await group.destroy();
    }, addUserToGroup: async (groupId, loggedInUser, groupCode) => {
        await connection.sync();
        const group = await Group.findByPk(groupId);
        if (!group) throw Error("Group not found");
        if (group.code !== groupCode) throw Error("Wrong code");
        group.addUser(loggedInUser);
        return await group.save();
    }, removeUserFromGroup: async (groupId, loggedInUser, userId) => {
        await connection.sync();
        const group = await Group.findByPk(groupId);
        if (!group) throw Error("Group not found");
        if (userId && group.getAdmin().id !== loggedInUser.id) throw Error("Cannot kick user");
        if (userId) {
            group.removeUser(await User.findOne({where: {userId: userId}, include: Group}));
        }
        group.removeUser(loggedInUser);
        return await group.save();
    }, getGroup: async (groupId) => {
        await connection.sync();
        const group = await Group.findByPk(groupId, {include: [Subject, User]});
        if (!group) throw Error("Group not found");
        return group;
    }

}
