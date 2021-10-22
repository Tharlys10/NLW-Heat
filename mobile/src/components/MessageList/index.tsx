import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import io from 'socket.io-client';

import { api } from "../../services/api";

import { Message } from "../Message";

import { styles } from "./styles";

type User = {
  id: string
  name: string
  avatar_url: string
}

type MessageProps = {
  id: string
  text: string
  user: User
}

const messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage: MessageProps) => {
  messagesQueue.push(newMessage);
})

export function MessageList() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    api.get<MessageProps[]>("/messages/last3")
      .then(({ data }) => {
        setMessages(data)
      })
      .catch(err => Alert.alert(`${err.response.data.error}`))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean));

        messagesQueue.shift();
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {
        messages.map(message =>
          <Message key={message.id} text={message.text} user={message.user} />
        )
      }
    </ScrollView>
  );
}