import React from 'react'
import { ThemeProvider } from './src/context/ThemeContext'
import { Text, View } from 'react-native'
import ProfileScreen from './src/screens/ProfileScreen'
import RootNavigator from './src/navigation/RootNavigator'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  )
}