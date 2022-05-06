import {StatusCodes} from "http-status-codes";
import nc from "next-connect";
import dbSync from "../middleware/dbSync";

const groupService = require("../../../backend/services/GroupService");
const userService = require("../../../backend/services/userService");


const handler = nc().use(dbSync)
    .post(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            console.log(loggedInUser)
            const group = await groupService.createGroup(req.body.name, loggedInUser);
            res.status(StatusCodes.CREATED).send(group);
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot create group");
        }
    });

export default handler;
