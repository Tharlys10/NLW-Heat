import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { Home } from './src/screens/Home';
import { AuthProvider } from './src/contexts/auth';

export default function App() {
  const [fontsLoader] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoader) {
    return <AppLoading />
  }

  return (
    <>
      <AuthProvider>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Home />
      </AuthProvider>
    </>
  );
}