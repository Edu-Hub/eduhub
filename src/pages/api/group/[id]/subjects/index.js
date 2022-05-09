import nc from "next-connect";
import dbSync from "../../../middleware/dbSync";
import userService from "../../../../../backend/services/UserService";
import subjectService from "../../../../../backend/services/SubjectService";
import {StatusCodes} from "http-status-codes";

const handler = nc().use(dbSync)
    .post(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            console.log(loggedInUser)
            const subject = await subjectService.createSubject(req.query.id, req.body.name, loggedInUser);
            res.status(StatusCodes.CREATED).send(subject);
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot create subject");
        }
    });

export default handler;
