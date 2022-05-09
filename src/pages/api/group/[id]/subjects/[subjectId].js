import nc from "next-connect";
import dbSync from "../../../middleware/dbSync";
import userService from "../../../../../backend/services/UserService";
import subjectService from "../../../../../backend/services/SubjectService";
import {StatusCodes} from "http-status-codes";

const handler = nc().use(dbSync)
    .delete(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            const group = await subjectService.removeSubject(req.query.id, req.query.subjectId, loggedInUser);
            res.status(StatusCodes.CREATED).send(group);
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot remove user from group");
        }
    });

export default handler;