import {StatusCodes} from "http-status-codes";
import nc from "next-connect";

const userService = require("../../../backend/services/UserService");

const handler = nc()
    .post(async (req, res) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(StatusCodes.CREATED).send(user);
        } catch (err) {
            console.log(err)
            res.status(StatusCodes.CONFLICT).send("User already exists");
        }
    });

export default handler;
