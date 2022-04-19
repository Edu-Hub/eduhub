import {createStandaloneToast} from '@chakra-ui/react'

const toast = createStandaloneToast()

export default function (title = "", description = "", status = "success") {
    toast({
        title, description, status, duration: 9000, isClosable: true, position:"top-right"
    });
};
