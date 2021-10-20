import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null,
  singInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode
}

type SingInResponse = {
  token: string,
  user: User,
}

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const singInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT}`;

  async function singIn(githubCode: string) {
    const { data } = await api.post<SingInResponse>("/authenticate", { code: githubCode });

    const { token, user } = data;

    localStorage.setItem('@NLWHeat:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@NLWHeat:token');
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutGithubCode, githubCode] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutGithubCode);

      singIn(githubCode)
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@NLWHeat:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("/users/profile")
        .then(({ data }) => {
          setUser(data)
        })
        .catch(err => {
          alert(err)
        })
    }
  }, []);

  return (
    <AuthContext.Provider value={{ singInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}