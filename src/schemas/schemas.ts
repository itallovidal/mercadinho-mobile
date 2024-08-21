import {z} from "zod";
import {Category} from "../screens/home";

export const productSchema = z.object({
    name: z.string(),
    quantity: z.coerce.number(),
    imgURL: z.string().url(),
    price: z.coerce.number(),
    categoryID: z.number()
})

export interface IProductSchema extends z.infer<typeof productSchema>{}

export interface updateProductSchema extends Omit<IProductSchema, "categoryID">{
    category: Category
}