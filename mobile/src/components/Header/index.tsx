import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { UserPhoto } from '../UserPhoto'

import { styles } from './styles';

import LogoImage from '../../assets/logo.svg';

import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <LogoImage />

      <View style={styles.logoutButton}>
        {
          user && <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>
              Sair
            </Text>
          </TouchableOpacity>
        }

        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}