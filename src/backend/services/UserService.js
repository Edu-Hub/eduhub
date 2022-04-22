import User from "../model/User";
import {hashPassword} from "./passwordEncrypter";

module.exports = {
    createUser: async (createUserPayload) => {
        await User.sync();
        const checkExisting = await User.findOne({where: {email: createUserPayload.email}});
        if (checkExisting) throw Error("User already exists");
        return await User.create({
            name: createUserPayload.username,
            email: createUserPayload.email,
            password: hashPassword(createUserPayload.password),
            isOAuth: false
        }).catch(err => console.log(err));
    },
    createUserOAuth: async (name, email, picture) => {
        const checkExisting = await User.findOne({where: {email: email}});
        if (checkExisting && !checkExisting.isOAuth) throw Error("User already exists");
        if (!checkExisting) {
            return await User.create({
                name: name, email: email, picture: picture, isOAuth: true
            }).catch(err => console.log(err));
        }
        return checkExisting;
    }
}
