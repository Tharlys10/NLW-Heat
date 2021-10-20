import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

import { api } from '../../services/api';

import logoImg from '../../assets/logo.svg';

import styles from './styles.module.scss';

type User = {
  id: string,
  name: string,
  avatar_url: string
}

type Messages = {
  id: string,
  text: string,
  created_at: Date,
  user_id: string
  user: User
}

const messagesQueue: Messages[] = [];

const socket = io('http://localhost:3333');

socket.on('new_message', (newMessage: Messages) => {
  messagesQueue.push(newMessage);
})

export function MessageList() {
  const [messages, setMessages] = useState<Messages[]>([])

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
  }, [])

  useEffect(() => {
    api.get<Messages[]>("/messages/last3")
      .then(({ data }) => {
        setMessages(data)
      })
      .catch(err => {
        toast.error(err.response.data.error)
      })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {
          messages.map((message) => {
            return (
              <li className={styles.message} key={message.id}>
                <p className={styles.messageContent}>
                  {message.text}
                </p>
                <div className={styles.messageUser}>
                  <div className={styles.userImage}>
                    <img src={message.user.avatar_url} alt={message.user.name} />
                  </div>
                  <span>{message.user.name}</span>
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}