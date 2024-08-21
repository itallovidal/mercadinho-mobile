import {VStack, ScrollView, useToast} from 'native-base'
import Header from '../components/header'
import Button from '../components/button'
import {Controller, useForm} from "react-hook-form";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import {IProductSchema, productSchema, updateProductSchema} from "../schemas/schemas";
import {Category} from "./home";
import Input from "../components/input";



interface TRouteParams {
    product: updateProductSchema & {
        id: string
    }
}

export default  function EditProduct(){
    const route = useRoute()
    const {product} = route.params as TRouteParams

    const {control, handleSubmit, setValue, formState:{errors}} = useForm<IProductSchema>({
        resolver: zodResolver(productSchema),
    })
    const [categories, setCategories] = React.useState<Category[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()

    useFocusEffect(React.useCallback(()=>{
        setValue('categoryID', product.category.categoryID)
        setValue('imgURL', product.imgURL)
        setValue('name', product.name)
        setValue('price', product.price)
        setValue('quantity', product.quantity)
    }, [product]))

    async function fetchCategories(){
        const response = await fetch('http://10.0.2.2:3000/categories')
        return await response.json()
    }

    async function update(data: IProductSchema){
        setIsLoading(true)
        try{
            console.log("enviado.")
            const response = await fetch(`http://10.0.2.2:3000/products/update/${product.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if(response.status === 200){
                toast.show({
                    bg: "green.700",
                    placement: "top",
                    title:"Produto atualizado com sucesso!"
                })
            }else{
                const body = await response.json()
                console.log(body.error)
                throw new Error('a')
            }
        }catch (e){

            toast.show({
                bg: "red.700",
                placement: "top",
                title:"Erro!"
            })
        }finally {
            setIsLoading(false)
        }
    }

    React.useEffect(()=>{
        fetchCategories().then((data)=>{
            setCategories(data)
        })
    }, [])

    return (
        <VStack pt={10} bg={'gray.300'} flex={1}>

            <Header>Edicão de Produto</Header>
            <ScrollView px={6}>
                <Controller control={control}
                            name={"name"}
                            render={({field: {onChange, onBlur, value}})=> (
                                <Input onChangeText={onChange}
                                       onBlur={onBlur}
                                       value={value}>Nome</Input>
                            )}/>

                <Controller control={control}
                            name={"price"}
                            render={({field: {onChange, onBlur, value}})=> (
                                <Input onChangeText={onChange}
                                       onBlur={onBlur}
                                       value={value ? value.toString() : ''}>Preço</Input>
                            )}/>

                <Controller control={control}
                            name={"quantity"}
                            render={({field: {onChange, onBlur, value}})=> (
                                <Input onChangeText={onChange}
                                       onBlur={onBlur}
                                       value={value ? value.toString() : ''}>Quantidade</Input>
                            )}/>

                <Controller control={control}
                            name={"categoryID"}
                            render={({field: {onBlur, value}})=> (
                                <SelectDropdown
                                    onBlur={onBlur}
                                    buttonStyle={{
                                        width: "100%",
                                        marginBottom: 16,
                                        borderRadius: 4,
                                        backgroundColor: `white`,
                                        borderWidth: 3
                                    }}

                                    dropdownStyle={{
                                        borderRadius: 4,
                                    }}
                                    defaultValueByIndex={product.category.categoryID}

                                    data={categories}
                                    defaultButtonText={product.category.name}
                                    onSelect={(selectedItem) => {
                                        setValue('categoryID', selectedItem.id)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.name
                                    }}
                                    rowTextForSelection={(index) => {
                                        return index.name
                                    }}
                                />
                            )}/>

                <Controller control={control}
                            name={"imgURL"}
                            render={({field: {onChange, onBlur, value}})=> (
                                <Input onChangeText={onChange}
                                       onBlur={onBlur}
                                       value={value}>URL da Imagem</Input>
                            )}/>

                <Button _pressed={{
                    bg: "gray.900",
                }}
                        isLoading={isLoading}
                        onPress={handleSubmit(update)}>Cadastrar</Button>
            </ScrollView>
        </VStack>
    )
}