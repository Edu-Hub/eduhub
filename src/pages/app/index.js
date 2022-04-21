import {useSession} from "next-auth/react";
import {getToken} from "next-auth/jwt";

export default function Home({token}) {
    const {data} = useSession();

    return (
        <div>
            <p>session:</p>
            {JSON.stringify(data)}
            <p>token:</p>
            {JSON.stringify(token)}
        </div>
    )
}

export async function getServerSideProps (context) {
    const token = await getToken({ req:context.req , secre:process.env.NEXTAUTH_JWT_SECRET});
    return {
        props: {token: token}
    }
}
