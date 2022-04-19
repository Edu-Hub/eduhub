import {useSession} from "next-auth/react";

export default function Home() {
    const {data} = useSession()

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}
