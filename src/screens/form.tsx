import {Text, VStack, Input, Image, View, ScrollView} from 'native-base'
import placeholder from '../assets/placeholder.png'
import Header from '../components/header'
import Button from '../components/button'

export default  function Form(){
    return (
        <VStack pt={10} bg={'black'} flex={1}>

            <Header>Cadastramento</Header>

            <ScrollView px={6}>

                <VStack w={'full'} mb={4} >
                    <Text alignSelf={'flex-start'} mb={-1} p={2} roundedTop={3} color={'white'} bg={'purple.600'} >Nome</Text>
                    <Input color={'white'} _focus={{
                        bg: 'gray.700',
                        borderColor: 'purple.600'
                    }} borderWidth={3} borderColor={'purple.600'}/>
                </VStack>

                <VStack w={'full'} mb={4}>
                    <Text alignSelf={'flex-start'} mb={-1} p={2} roundedTop={3} color={'white'} bg={'purple.600'} >Preço</Text>
                    <Input color={'white'} _focus={{
                        bg: 'gray.700',
                        borderColor: 'purple.600'
                    }} borderWidth={3} borderColor={'purple.600'}/>
                </VStack>

                <VStack w={'full'} mb={4}>
                    <Text alignSelf={'flex-start'} mb={-1} p={2} roundedTop={3} color={'white'} bg={'purple.600'} >Quantidade</Text>
                    <Input color={'white'} _focus={{
                        bg: 'gray.700',
                        borderColor: 'purple.600'
                    }} borderWidth={3} borderColor={'purple.600'}/>
                </VStack>

                <VStack w={'full'} mb={4}>
                    <Text alignSelf={'flex-start'} mb={-1} p={2} roundedTop={3} color={'white'} bg={'purple.600'} >Categoria</Text>
                    <Input color={'white'} _focus={{
                        bg: 'gray.700',
                        borderColor: 'purple.600'
                    }} borderWidth={3} borderColor={'purple.600'}/>
                </VStack>

                <VStack w={'full'}>
                    <Text  mb={-1} p={2} roundedTop={3} color={'white'} bg={'purple.600'} >Imagem</Text>
                    {/* <Input color={'white'} _focus={{
                        bg: 'gray.700',
                        borderColor: 'purple.600'
                    }} borderWidth={3} borderColor={'purple.600'}/> */}
                    <View borderWidth={3} borderColor={'purple.600'} maxH={200} >
                        <Image maxH={200} w={'full'} alt='s' source={placeholder}/>
                    </View>
                </VStack>
                
                <Button>Cadastrar</Button>
            </ScrollView>
        </VStack>
    )
}