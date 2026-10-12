import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './src/context/AuthContext'
import { ClassSessionProvider } from './src/context/ClassSessionContext'
import RootNavigator from './src/navigation/RootNavigator'

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthProvider>
        <ClassSessionProvider>
          <RootNavigator />
        </ClassSessionProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
