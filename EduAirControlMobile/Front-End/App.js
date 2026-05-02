import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Auth screens
import LoginScreen from './src/screens/auth/LoginScreen'
import SignUpScreen from './src/screens/auth/SignUpScreen'

// App navigator (bottom tabs + stacks)
import AppNavigator from './src/navigation/AppNavigator'

// Context
import { EnvironmentsProvider } from './src/context/EnvironmentsContext'
import { ThemeProvider } from './src/context/ThemeContext'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ThemeProvider>
      <EnvironmentsProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            {/* Auth */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />

            {/* App (bottom tabs) */}
            <Stack.Screen name="App" component={AppNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </EnvironmentsProvider>
    </ThemeProvider>
  )
}