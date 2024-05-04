import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Dashboard from './dashboard'
import SignInWithOAuth from '@/components/SignInWithOAuth'
import * as SecureStore from "expo-secure-store";
import SignInScreen from '@/components/SignInScreen'
import SignUpScreen from '@/components/SignUpScreen'

const Index = () => {

  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={'pk_test_dG91Z2gtYnVmZmFsby04Mi5jbGVyay5hY2NvdW50cy5kZXYk'}>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <SafeAreaView style={styles.container}>
<SignInWithOAuth/>
        </SafeAreaView>
      </SignedOut>
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Index