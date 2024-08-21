import {Text, View,} from 'native-base'
import {ReactNode} from "react";

export default function Header({children} : {children: string | ReactNode}) {
    return (
        <View pt={10} bg={'gray.600'} mb={8}>
            {
                typeof children == "string" ?
                    <Text fontSize={24}
                          color={'white'}
                          alignSelf={'flex-start'}
                          p={4}
                          bg={'gray.800'}
                          rounded={4}
                          ml={6}
                          mb={-4}>{children}</Text> :
                    children
            }
        </View>
    );
  }
  