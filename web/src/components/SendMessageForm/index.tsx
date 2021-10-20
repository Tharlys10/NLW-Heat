import { FormEvent, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import styles from './styles.module.scss';


export function SendMessageForm() {
  const { user, signOut } = useAuth();

  const [message, setMessage] = useState('');

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    api.post("/messages", { message })
      .then(() => {
        setMessage('')

        toast.success('Mensagem enviada com sucesso');
      })
      .catch(err => {
        toast.error(err.response.data.error)
      })
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>

        <textarea
          value={message}
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={(event) => setMessage(event.target.value)}
        />

        <button type="submit">
          Enviar mensagem
        </button>
      </form>
    </div>
  );
}