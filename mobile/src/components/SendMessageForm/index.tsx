import React, { useState } from 'react';
import { Alert, Keyboard, Text, TextInput, View } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleSendMessage() {
    if (!message.trim()) {
      return;
    }

    setSendingMessage(true)

    api.post("/messages", { message })
      .then(() => {
        setMessage('')

        Keyboard.dismiss();
        Alert.alert("Mensagem enviada com sucesso!")
      })
      .catch(err => Alert.alert(`${err.response.data.error}`))
      .finally(() => { setSendingMessage(false) });
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        style={styles.input}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleSendMessage}
      />
    </View>
  );
}