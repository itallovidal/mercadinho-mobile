import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import { updateProductSchema} from "../schemas/schemas";

export type TRoute = {
    home: undefined,
    register: undefined,
    editProduct: {
        product: updateProductSchema
    }
}

export type TRouteNavigator = BottomTabNavigationProp<TRoute>

