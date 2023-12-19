import {Text, View,} from 'native-base'

export default function Header({children} : {children: string}) {
    return (
        <View pt={6} bg={'purple.700'} mb={16}>
            <Text fontSize={24} color={'white'} alignSelf={'flex-start'} p={4} bg={'purple.600'} rounded={4} ml={6} mb={-4}>{children}</Text>
        </View>
    );
  }
  