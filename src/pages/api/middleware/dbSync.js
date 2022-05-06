const connection = require("../../../backend/db/connection");
module.exports = async function (req, res, next) {
    connection.sync().then(() => {
        console.log("DB SYNC SUCCESSFUL");
        next();
    }).catch((err) => console.log(err));
}
