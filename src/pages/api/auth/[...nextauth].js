import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import {MongoClient} from "mongodb";
import {verifyPassword} from "../../../backend/services/passwordEncrypter";
import {createUserOAuth} from "../../../backend/services/UserService";

export default NextAuth({
    pages: {
        signIn: "/auth/singin", newUser: "/app"
    }, session: {
        strategy: "jwt"
    }, jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    }, secret: process.env.NEXTAUTH_SECRET, providers: [CredentialsProvider({
        async authorize(credentials) {
            const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
                useNewUrlParser: true, useUnifiedTopology: true
            });

            const db = client.db();
            const checkExisting = await db
                .collection('users')
                .findOne({email: credentials.email});


            if (!checkExisting) {
                client.close();
                return;
            }
            const isValid = await verifyPassword(credentials.password, checkExisting.password,);

            if (!isValid) {
                client.close();
            }

            client.close();
            console.log("LOGGED INN :))))")
            return {email: checkExisting.email};
        }
    }), GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
                prompt: "consent", access_type: "offline", response_type: "code"
            }
        },
        authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    })], callbacks: {
        async redirect({url, baseUrl}) {
            return baseUrl + "/app";
        }, async signIn({account, profile}) {
            if (profile) {
                try {
                    await createUserOAuth(profile.name, profile.email, profile.picture);
                } catch (err) {
                    console.log("error", err)
                    return true;
                }
            }
            return true;
        }
    },
});
