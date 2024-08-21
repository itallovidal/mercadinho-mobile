import React from 'react';
import {Image, View, VStack, Text, HStack, Button} from "native-base";
import Label from "./label";
import {Product} from "../screens/home";
import {NotePencil, TrashSimple} from "phosphor-react-native";
import {useNavigation} from "@react-navigation/native";
import {TRouteNavigator} from "../routes/routes";

interface CardProps {
    product: Product,
    deleteProducts: (id: string)=> void,
    isLoading: boolean
}
function Card({product, deleteProducts, isLoading} : CardProps) {
    const {navigate} = useNavigation<TRouteNavigator>()

    return (
        <VStack isDisabled={isLoading} m={15}>
            <View maxH={250} bg={"white"} rounded={8} >
                <HStack zIndex={5} right={2} top={2} position={"absolute"} >
                    <Button mr={2}
                            variant={"unstyled"}
                            bg={"red.500"}
                            w={50}
                            onPress={()=> deleteProducts(product.id)} _pressed={{
                        bg: "red.700"
                    }}>
                        <TrashSimple weight={'fill'} size={18} />
                    </Button>

                    <Button
                        onPress={()=> navigate(`editProduct`, {
                            product
                        })}
                        variant={"unstyled"}
                        bg={"gray.200"}
                        w={50}
                        _pressed={{
                        bg: "gray.500"
                    }}>
                        <NotePencil  size={18} />
                    </Button>
                </HStack>

                <Image w={"100%"}
                       alt={"a"}
                       h={"100%"}
                       resizeMode={"contain"}
                       rounded={6}
                       source={{uri: product.imgURL}}/>
            </View>

            <Text bg={"gray.700"}
                  textAlign={"center"}
                  paddingY={4}
                  mt={-2}
                  zIndex={-1}
                  color={"white"}
                  textTransform={"capitalize"}
                  fontSize={18}
            >{product.name}</Text>

            <VStack borderWidth={2} bg={"white"} borderColor={"gray.700"} rounded={6} mt={-2}  p={8}>
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                    <HStack>
                        <Text fontSize={12}
                              mt={2}
                              alignSelf={"flex-start"}
                              fontWeight={"bold"}
                              color={"black"}>R$</Text>

                        <Text alignSelf={"flex-start"}
                              fontSize={24}
                              fontWeight={"bold"}
                              color={"black"}>{product.price}</Text>
                    </HStack>

                    <Label>{product.category.name}</Label>
                </HStack>

                <Text color={"green.700"}
                      fontSize={16}
                      fontWeight={"bold"}
                      textAlign={"center"}
                      mt={4}
                >{product.quantity} em estoque</Text>
            </VStack>
        </VStack>
    );
}

export default Card;