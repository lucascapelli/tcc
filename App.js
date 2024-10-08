import{NavigationContainer}from'@react-navigation/native';
import{createStackNavigator}from'@react-navigation/stack';
import login from './views/login'; // Sem chaves {} porque é um default export
import ForgotPasswordScreen from './views/Esqueceu_Senha'; 
import SignUpScreen from './views/Criar_Conta'; // Importa o componente de criação de conta
import ResetPasswordScreen from './views/Esqueceu_Senha'; // Importe a nova tela de redefinição
import HomeScreen from './views/Home'; // Importa a tela inicial




export default function App(){
    const Stack = createStackNavigator();
    return(

    <NavigationContainer>
         <Stack.Navigator>
          <Stack.Screen name="login" component ={login} options={{headerShow:false}}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Criar Conta' }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />        
        </Stack.Navigator>
    </NavigationContainer>


);

}