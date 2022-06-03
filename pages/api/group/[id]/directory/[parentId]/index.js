import nc from "next-connect";
import dbSync from "../../../../middleware/dbSync";
import userService from "../../../../../../src/backend/services/UserService";
import directoryService from "../../../../../../src/backend/services/DirectoryService";
import {StatusCodes} from "http-status-codes";

const handler = nc().use(dbSync)
    .get(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            const directory = await directoryService.getDirectory(req.query.id, req.query.parentId, loggedInUser);
            res.status(StatusCodes.CREATED).send(directory);
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot get directory");
        }
    });
export default handler;
