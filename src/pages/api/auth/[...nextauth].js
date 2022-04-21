import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import {verifyPassword} from "../../../backend/services/passwordEncrypter";
import {createUserOAuth} from "../../../backend/services/UserService";
import User from "../../../backend/model/User.model";
import dbConnect from "../../../backend/db/dbConnect";

export default async function auth(req, res) {
    return await NextAuth(req, res, {
        pages: {
            signIn: "/auth/singin", newUser: "/app"
        }, jwt: {
            secret: process.env.NEXTAUTH_SECRET,
        }, secret: process.env.NEXTAUTH_SECRET, providers: [CredentialsProvider({
            async authorize(credentials) {
                await dbConnect();
                const checkExisting = await User.findOne({email: credentials.email});
                if (!checkExisting) {
                    return;
                }
                const isValid = await verifyPassword(credentials.password, checkExisting.password,);

                if (!isValid) return;

                return {id: checkExisting._id, name: checkExisting.username, email: checkExisting.email};
            },
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
            async redirect({ baseUrl}) {
                return baseUrl + "/app";
            }, async signIn({profile}) {
                if (profile) {
                    try {
                        await dbConnect();
                        await createUserOAuth(profile.name, profile.email, profile.picture);
                        return true;
                    } catch (err) {
                        res.redirect("/auth/singin");
                        return false;
                    }
                }
                return true;
            }, async jwt({token, user}) {
                user && (token.id = user.id);
                return token;
            }, session: async ({session, token}) => {
                session.user.id = token.id;
                return session;
            }
        },
    })
};
