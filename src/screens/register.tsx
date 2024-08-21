import {Text, VStack, Image, View, ScrollView, useToast} from 'native-base'
import placeholder from '../assets/placeholder.png'
import Header from '../components/header'
import Button from '../components/button'
import Input from "../components/input";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod'
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import {Category} from "./home";
import {IProductSchema, productSchema} from "../schemas/schemas";



export default  function Register(){
    const {control, handleSubmit, setValue, formState:{errors}} = useForm<IProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            price: 0,
            quantity: 0
        }
    })
    const [categories, setCategories] = React.useState<Category[]>([])

    const toast = useToast()
    async function fetchCategories(){
        const response = await fetch('http://10.0.2.2:3000/categories')
        return await response.json()
    }


    React.useEffect(()=>{
        fetchCategories().then((data)=>{
            setCategories(data)
        })
    }, [])

    async function submit(data: IProductSchema){
        console.log(data)
        try{
            const response = await fetch('http://10.0.2.2:3000/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([data])
            })

            if(response.status === 201){
                toast.show({
                    bg: "green.700",
                    placement: "top",
                    title:"Produto criado com sucesso!"
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
                title:"Erro na criação!"
            })
        }
    }

    return (
        <VStack pt={10} bg={'gray.300'} flex={1}>

            <Header>Cadastramento</Header>

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
                                       value={value.toString()}>Preço</Input>
                            )}/>

                <Controller control={control}
                            name={"quantity"}
                            render={({field: {onChange, onBlur, value}})=> (
                                <Input onChangeText={onChange}
                                       onBlur={onBlur}
                                       value={value.toString()}>Quantidade</Input>
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

                                    data={categories}
                                    defaultButtonText={"Filtro"}
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
                }} onPress={handleSubmit(submit)}>Cadastrar</Button>
            </ScrollView>
        </VStack>
    )
}