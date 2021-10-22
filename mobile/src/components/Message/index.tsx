import React from "react";
import { Text, View } from "react-native";
import { MotiView } from 'moti';

import { UserPhoto } from "../UserPhoto";

import { styles } from "./styles";

type User = {
  id: string
  name: string
  avatar_url: string
}

type MessageProps = {
  text: string
  user: User
}

export function Message({ text, user }: MessageProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>
        {text}
      </Text>

      <View style={styles.footer}>
        <UserPhoto
          imageUri={user.avatar_url}
          sizes="SMALL"
        />

        <Text style={styles.userName}>
          {user.name}
        </Text>
      </View>
    </MotiView>
  );
}