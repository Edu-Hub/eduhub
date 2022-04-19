import {
    Flex, Box, Stack, Heading, Text, useColorModeValue, Link, Center,
} from '@chakra-ui/react';
import {useFormik} from "formik";
import {signIn} from "next-auth/react";
import GoogleAuthButton from "./components/GoogleAuthButton";
import InputField from "../app/common/components/InputField";
import PasswordInputField from "./components/PasswordInputField";
import PrimaryButton from "../app/common/components/PrimaryButton";
import useToggle from "../app/common/hooks/useToggle";
import {useEffect} from "react";
import toastHelper from "../app/common/components/ToastHelper";
import useEffectOnce from "../app/common/hooks/useEffectOnce";

export default function SignupCard({loginError}) {
    const [submitLoading, toggleSubmitLoading] = useToggle(false);

    useEffectOnce(() => {
        if (loginError) toastHelper("Email o password errati", "", "error")
    });

    const handleSubmit = async () => {
        const email = formik.values.email;
        const password = formik.values.password;
        toggleSubmitLoading();
        await signIn('credentials', {
            redirect: true, email: email, password: password
        }).catch(err => {
            toggleSubmitLoading()
        });
    };
    const formik = useFormik({
        initialValues: {
            username: '', email: '', password: '',
        }, onSubmit: handleSubmit,
    });

    return (<Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                    Accedi al tuo account
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    Per usufruire degli splendidi vantaggi di EduHub!
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <InputField id={"email"} type={"email"} label={"Indirizzo email"} value={formik.values.email}
                                onChange={formik.handleChange}/>

                    <PasswordInputField value={formik.values.password} onChange={formik.handleChange}/>
                    <PrimaryButton onClick={formik.handleSubmit} label={"Accedi"} isLoading={submitLoading}/>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Non hai un account? <Link color={'blue.400'} href={"./singup"}>Registrati</Link>
                        </Text>
                    </Stack>
                    <Center p={8}>
                        <GoogleAuthButton/>
                    </Center>
                </Stack>
            </Box>
        </Stack>
    </Flex>);
}
SignupCard.getInitialProps = async (ctx) => {
    console.log(ctx.query.error);
    if (ctx.query.error === "CredentialsSignin") return {loginError: true};
    return {};
}
