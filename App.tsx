import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import AppRoutes from "./src/routes/AppRoutes";
import {NavigationContainer} from "@react-navigation/native";
import {THEME} from "./src/style/theme";


export default function App() {
  return (
      <NativeBaseProvider theme={THEME}>
        <StatusBar style='light'/>
          <NavigationContainer>
            <AppRoutes/>
          </NavigationContainer>
      </NativeBaseProvider>
  );
}

