import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { useAuth } from './hooks/useAuth';

import styles from './App.module.scss';
import { SendMessageForm } from './components/SendMessageForm';

export function App() {
  const { user } = useAuth();

  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}
