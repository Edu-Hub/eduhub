import User from "../model/User.model";

const {hash} = require("bcryptjs");

module.exports = {
    createUser: async (createUserPayload) => {
        const checkExisting = await User.findOne({email: createUserPayload.email});
        if (checkExisting) throw Error("User already exists");
        const user = new User({
            username: createUserPayload.username,
            email: createUserPayload.email,
            password: await hash(createUserPayload.password, 12),
            isOAuth: false
        });
        await user.save().catch(err => console.log(err));
        return user;
    }, createUserOAuth: async (fullname, email, avatarUrl) => {
        const checkExisting = await User.findOne({email});
        console.log(checkExisting);
        if (checkExisting && !checkExisting.isOAuth) throw Error("User already exists");
        if (!checkExisting) {
            const user = new User({fullname, email, password: null, avatarUrl, isOAuth: true});
            await user.save().catch(err => console.log(err));
            return user;
        }
        return checkExisting;
    }

}
