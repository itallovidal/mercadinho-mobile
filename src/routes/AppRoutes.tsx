import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Register from "../screens/register";
import Home from "../screens/home";
import {TRoute} from "./routes";
import {House, PencilSimpleLine} from "phosphor-react-native";
import EditProduct from "../screens/editproduct";

const {Navigator, Screen} = createBottomTabNavigator<TRoute>()

function AppRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false
        }}>
            <Screen name={'home'}
                    component={Home}
                    options={{
                        tabBarIcon: ()=> <House/>
                    }}
            />
            <Screen name={'register'}
                    component={Register}
                    options={{
                        tabBarIcon: ()=> <PencilSimpleLine />
                    }}
            />

            <Screen name={'editProduct'}
                    component={EditProduct}
                    options={{
                        tabBarButton: ()=> null
                    }}
            />
        </Navigator>
    );
}

export default AppRoutes;