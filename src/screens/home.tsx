import React from 'react';
import {Button, FlatList, HStack, IInputProps, Input, useToast, View, VStack} from "native-base";
import Card from "../components/card";
import Header from "../components/header";
import { MagnifyingGlass} from "phosphor-react-native";
import SelectDropdown from 'react-native-select-dropdown'
import {useFocusEffect} from "@react-navigation/native";

export interface Category {
    name: string,
    categoryID: number
}

export interface Product{
    id: string
    name: string
    quantity: number
    category: Category
    imgURL: string
    price: number
    createdAt: Date
    updatedAt: Date
}

function Home() {
    const [loading, setLoading] = React.useState(false)
    const [products, setProducts] = React.useState<Product[]>([])
    const [categories, setCategories] = React.useState<Category[]>([])
    const [filter, setFilter] = React.useState(1)
    const [query, setQuery] = React.useState('')

    const toast = useToast()

    async function fetchProducts(filter: number){
        const response = await fetch(`http://10.0.2.2:3000/products/category/${filter}`)
        const products = await response.json()
        return products
    }

    async function deleteProduct(id: string){
        const response = await fetch(`http://10.0.2.2:3000/products/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json'
            },
        })
        await response.json()

        setProducts((prev)=>{
            return prev.filter((item)=>{
                return item.id !== id
            })
        })

        toast.show({
            title: 'Produto Deletado!',
            placement:"top",
            bgColor: 'green.700'
        })
    }

    async function fetchCategories(){
        const response = await fetch('http://10.0.2.2:3000/categories')
        return await response.json()
    }

    async function search(input: string){
        if(input.length > 3){
            const response = await fetch(`http://10.0.2.2:3000/products/search?q=${input}`)
            return await response.json()
        }
    }

    React.useEffect(()=>{
        fetchCategories().then((data)=>{
            setCategories([
                {
                    id: 0,
                    name: 'Filtro'
                },
                ...data
            ])
        })
    }, [])

    useFocusEffect( React.useCallback(()=>{
        if(filter !== 0){
            fetchProducts(filter)
                .then((products)=>{
                    setProducts(products)
                }).catch((e)=>{
                console.log(e)
            })
        }
    }, [filter]))


    return (
        <VStack bg={'gray.200'} flex={1}>
            <Header>
                <HStack w={"full"}
                        roundedLeft={4}
                        mb={-4}
                        alignItems={"center"}
                        px={4}>

                    <HStack bg={"gray.700"} h={"full"} w={'60%'} borderLeftRadius={4}>
                        <Input w={'80%'}
                               borderWidth={0}
                               placeholderTextColor={"white"}
                               placeholder={"Pesquise aqui."}
                               onChangeText={(text)=> setQuery(text)}
                               color={"white"}
                               _focus={{
                                   bg: "gray.500"
                               }}
                        />
                        <Button variant={"unstyled"}
                                bg={"gray.700"}
                                roundedLeft={0}
                                h={"100%"}
                                onPress={async ()=>{
                                    const data = await search(query.toLowerCase())
                                    setProducts(data)
                                    setFilter(0)
                                }}
                                _pressed={{
                                    bgColor: "gray.900"
                                }}
                        >
                            <MagnifyingGlass size={18} color={"white"}/>
                        </Button>
                    </HStack>


                    <SelectDropdown
                        buttonStyle={{
                            width: "40%",
                            borderRadius: 4,
                        }}
                        buttonTextStyle={{
                            fontSize: 14
                        }}

                        rowTextStyle={{
                            fontSize: 14
                        }}
                        dropdownStyle={{
                            borderRadius: 4,
                        }}

                        defaultValueByIndex={0}

                        data={categories}
                        defaultButtonText={"Filtro"}
                        onSelect={(selectedItem, index) => {
                                setFilter(selectedItem.id)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            if(filter === 0 ){
                                return 'Filtro'
                            }

                            return selectedItem.name
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.name
                        }}
                    />
                </HStack>

            </Header>


            <FlatList data={products}
                      keyExtractor={({id})=> id }
                      renderItem={({item})=> <Card isLoading={loading} deleteProducts={deleteProduct} product={item}/>}/>
        </VStack>
    );
}

export default Home;