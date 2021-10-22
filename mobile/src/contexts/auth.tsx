import React, { createContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User = {
  id: string
  name: string
  avatar_url: string
  login: string
}

type AuthContextData = {
  user: User | null
  isSigningIn: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthResponse = {
  token: string
  user: User
}

type AuthorizationResponse = {
  params: {
    code?: string,
    error?: string,
  },
  type?: string
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);


  async function signIn() {
    try {
      setIsSigningIn(true)

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const { code } = authSessionResponse.params

        const { data } = await api.post<AuthResponse>('/authenticate', { code });

        const { token, user } = data;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
        await AsyncStorage.setItem(TOKEN_STORAGE, token)

        setUser(user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSigningIn(false)
    }

  }

  async function signOut() {
    setUser(null);

    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    }

    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isSigningIn }}>
      {children}
    </AuthContext.Provider>
  )
}