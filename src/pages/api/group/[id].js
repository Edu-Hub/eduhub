import {StatusCodes} from "http-status-codes";
import nc from "next-connect";
import dbSync from "../middleware/dbSync";

const groupService = require("../../../backend/services/GroupService");
const userService = require("../../../backend/services/userService");

const handler = nc().use(dbSync)
    .put(async (req, res) => {
        const loggedInUser = await userService.getLoggedInUser({req});
        try {
            const updatedGroup = await groupService.updateGroup(req.query.id, req.body.name, loggedInUser);
            return res.status(StatusCodes.OK).send(updatedGroup);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot update group");
        }
    }).delete(async (req, res) => {
        const loggedInUser = await userService.getLoggedInUser({req});
        try {
            const updatedGroup = await groupService.deleteGroup(req.query.id, loggedInUser);
            return res.status(StatusCodes.OK).send(updatedGroup);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot delete group");
        }
    });

export default handler;
