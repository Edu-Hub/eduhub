const {DataTypes} = require('sequelize');
const connection = require("../db/connection");

const Group = connection.define('User', {
    name: {
        type: DataTypes.STRING, allowNull: false
    }
}, {});
export default Group;
