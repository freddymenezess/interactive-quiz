import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { errorMessages } from '@lib/utils';
import { toast } from 'react-toastify';
import { Input } from '@ui/Input';
import { AuthButton } from '@ui/AuthButton';

export default function Login() {
  const navigate = useNavigate();
  const { login, isSubmitting, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(errorMessages[error] ?? error);
    }
  }, [error]);

  const handleLogin = async () => {
    if (!email) {
      toast.error(errorMessages['EMAIL_REQUIRED']);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(errorMessages['INVALID_EMAIL_FORMAT']);
      return;
    }

    if (!password) {
      toast.error(errorMessages['PASSWORD_REQUIRED']);
      return;
    }

    if (password.length < 8) {
      toast.error(errorMessages['PASSWORD_TOO_SHORT']);
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
    <section className="grow-0 basis-sm p-5 lg:basis-md">
      <h1 className="text-titulo mb-6 text-xl leading-tight font-extrabold sm:text-2xl md:text-3xl lg:text-4xl">
        Bem-vindo de volta! <br /> Insira os seus dados para continuar!
      </h1>
      <Input
        placeholder="email@exemplo.com"
        label="Email"
        value={email}
        onChange={setEmail}
      />
      <Input
        placeholder="********"
        label="Palavra-passe"
        hasEye
        value={password}
        onChange={setPassword}
      />
      <div className="mb-4 text-right">
        <button
          onClick={() => navigate('/forgot-password')}
          className="text-par text-xs font-bold hover:cursor-pointer hover:underline"
        >
          Esqueceu a sua palavra-passe?
        </button>
      </div>
      <AuthButton
        label={isSubmitting ? 'A entrar...' : 'Entrar'}
        onClick={handleLogin}
        disabled={isSubmitting}
      />
      <p className="mt-6 text-center text-xs text-black">
        Não tem uma conta?{' '}
        <button
          onClick={() => navigate('/register')}
          className="text-blue-btn font-extrabold hover:cursor-pointer hover:underline"
        >
          Registe-se agora
        </button>
      </p>
    </section>
  );
}
