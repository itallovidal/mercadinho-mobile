import React from 'react';
import {Text, Input as NativeBaseInput, VStack, IInputProps} from "native-base";

interface IInput extends IInputProps{
    children: string
}
function Input({children, ...props}: IInput) {
    return (
        <VStack w={'full'} mb={4} >
            <Text alignSelf={'flex-start'}
                  mb={-1}
                  p={2}
                  roundedTop={3}
                  color={'white'}
                  bg={'gray.700'}>{children}</Text>
            <NativeBaseInput
                             borderWidth={3}
                             bg={"white"}
                             borderColor={'gray.700'}
                             {...props}
                             _focus={{
                                bg: 'gray.100',
                                borderColor: 'gray.700'
            }}/>
        </VStack>
    );
}

export default Input

