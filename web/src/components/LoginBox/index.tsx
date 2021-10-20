import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { useAuth } from '../../hooks/useAuth';

import styles from './styles.module.scss'

export function LoginBox() {
  const { singInUrl } = useAuth();

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>

      <a href={singInUrl} className={styles.singInWithGithub}>
        <VscGithubInverted size="24" />
        Entrar com o GitHub
      </a>
    </div>
  )
}