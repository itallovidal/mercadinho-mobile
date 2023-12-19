import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, View, Text } from 'native-base';
import Form from './src/screens/form';


export default function App() {
  return (
      <NativeBaseProvider>
        <StatusBar style='auto'/>
        <Form/>
      </NativeBaseProvider>
  );
}

