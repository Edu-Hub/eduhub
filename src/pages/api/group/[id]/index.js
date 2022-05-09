import {StatusCodes} from "http-status-codes";
import nc from "next-connect";
import dbSync from "../../middleware/dbSync";

const groupService = require("../../../../backend/services/GroupService");
const userService = require("../../../../backend/services/userService");

const handler = nc().use(dbSync)
    .get(async (req, res) => {
        try {
            const users = await groupService.getGroupMembers(req.query.id);
            return res.status(StatusCodes.OK).send(users);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot get group");
        }
    })
    .put(async (req, res) => {
        const loggedInUser = await userService.getLoggedInUser({req});
        try {
            const updatedGroup = await groupService.updateGroup(req.body.groupId, req.body.name, loggedInUser);
            return res.status(StatusCodes.OK).send(updatedGroup);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot update group");
        }
    })
    .delete(async (req, res) => {
        const loggedInUser = await userService.getLoggedInUser({req});
        try {
            const updatedGroup = await groupService.deleteGroup(req.body.groupId, loggedInUser);
            return res.status(StatusCodes.OK).send(updatedGroup);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot delete group");
        }
    });

export default handler;