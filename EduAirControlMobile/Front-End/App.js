import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Auth screens
import LoginScreen from './src/screens/auth/LoginScreen'
import SignUpScreen from './src/screens/auth/SignUpScreen'

// App screens
import DashboardScreen from './src/screens/app/DashboardScreen'
import EnvironmentDetailScreen from './src/screens/app/EnvironmentDetailScreen'
import FavoritesScreen from './src/screens/app/FavoritesScreen'
import ProfileScreen from './src/screens/app/ProfileScreen'

// Context
import { EnvironmentsProvider } from './src/context/EnvironmentsContext'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <EnvironmentsProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {/* Auth */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />

          {/* App */}
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="EnvironmentDetail" component={EnvironmentDetailScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </EnvironmentsProvider>
  )
}