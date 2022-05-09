import nc from "next-connect";
import dbSync from "../../../middleware/dbSync";
import userService from "../../../../../backend/services/UserService";
import groupService from "../../../../../backend/services/GroupService";
import {StatusCodes} from "http-status-codes";

const handler = nc().use(dbSync)
    .get(async (req, res) => {
        try {
            const users = await groupService.getGroupMembers(req.query.id);
            return res.status(StatusCodes.OK).send(users);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot get group members");
        }
    })
    .post(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            console.log(loggedInUser)
            const group = await groupService.addUserToGroup(req.query.id, loggedInUser, req.body.code);
            res.status(StatusCodes.CREATED).send(group);
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot join group");
        }
    });

export default handler;
