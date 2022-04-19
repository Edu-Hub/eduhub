import withDb from "../utils/withDb";
import {CONFLICT, CREATED, StatusCodes} from "http-status-codes";

const userService = require("../../../backend/services/UserService");

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await userService.createUser(req.body);
            res.status(StatusCodes.CREATED).send(user);
        } catch (err) {
            res.status(StatusCodes.CONFLICT).send("User already exists");
        }
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Route not valid'});
    }
}

export default withDb(handler);
