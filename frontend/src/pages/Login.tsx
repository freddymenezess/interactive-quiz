import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { ERROR_MESSAGES } from '../lib/utils';
import { toast } from 'react-toastify';
import { Input } from '@components/ui/Input';
import { AuthButton } from '@components/ui/AuthButton';

export default function Login() {
  const navigate = useNavigate();
  const { login, isSubmitting, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(ERROR_MESSAGES[error] ?? error);
    }
  }, [error]);

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error(ERROR_MESSAGES['EMAIL_REQUIRED']);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(ERROR_MESSAGES['INVALID_EMAIL_FORMAT']);
      return;
    }

    if (!password) {
      toast.error(ERROR_MESSAGES['PASSWORD_REQUIRED']);
      return;
    }

    if (password.length < 8) {
      toast.error(ERROR_MESSAGES['PASSWORD_TOO_SHORT']);
      return;
    }

    try {
      await login(email, password);
      navigate('/home');
    } catch {
      // erro tratado pelo useEffect acima
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      autoComplete="on"
      className="grow-0 basis-sm p-5 lg:basis-md"
    >
      <h1 className="text-titulo mb-6 text-xl leading-tight font-extrabold sm:text-2xl md:text-3xl lg:text-4xl">
        Bem-vindo de volta! <br /> Insira os seus dados para continuar!
      </h1>
      <Input
        placeholder="email@exemplo.com"
        label="Email"
        value={email}
        onChange={setEmail}
        autocomplete="email"
      />
      <Input
        placeholder="********"
        label="Palavra-passe"
        hasEye
        value={password}
        onChange={setPassword}
        autocomplete="current-password"
      />
      <div className="mb-4 text-right">
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-par text-xs font-bold hover:cursor-pointer hover:underline"
        >
          Esqueceu a sua palavra-passe?
        </button>
      </div>
      <AuthButton
        type="submit"
        label={isSubmitting ? 'A entrar...' : 'Entrar'}
        disabled={isSubmitting}
      />
      <p className="mt-6 text-center text-xs text-black">
        Não tem uma conta?{' '}
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="text-blue-btn font-extrabold hover:cursor-pointer hover:underline"
        >
          Registe-se agora
        </button>
      </p>
    </form>
  );
}
