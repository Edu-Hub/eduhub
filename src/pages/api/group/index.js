import {StatusCodes} from "http-status-codes";
import nc from "next-connect";
import dbSync from "../middleware/dbSync";

const groupService = require("../../../backend/services/GroupService");
const userService = require("../../../backend/services/userService");


const handler = nc().use(dbSync)
    .get(async (req, res) => {
        try {
            const groups = await groupService.getAllGroups();
            res.status(StatusCodes.CREATED).send(groups);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot create group");
        }
    })
    .post(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            const group = await groupService.createGroup(req.body.name, loggedInUser);
            res.status(StatusCodes.CREATED).send(group);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot create group");
        }
    });

export default handler;
