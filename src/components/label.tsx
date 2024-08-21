import React from 'react';
import {VStack, Text, HStack} from "native-base";
import {Tag} from "phosphor-react-native";

interface labelProps{
    children: string
}
function Label({children} : labelProps) {
    return (
        <HStack rounded={4} p={2} alignItems={"center"} bg={"white"}>
            <Tag size={16} weight={"fill"} />
            <Text textTransform={"capitalize"} ml={2}>{children}</Text>
        </HStack>
    );
}

export default Label;