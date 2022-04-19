import '../../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react';
import {SessionProvider} from 'next-auth/react'

function MyApp({Component, pageProps}) {
    return (<ChakraProvider>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Component {...pageProps} />
        </SessionProvider>
    </ChakraProvider>);
}

export default MyApp
